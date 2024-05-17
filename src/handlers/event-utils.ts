import type { Interaction, Message, BaseInteraction } from 'discord.js';
import {
    EMPTY,
    Observable,
    concatMap,
    filter,
    of,
    throwError,
    fromEvent, map, OperatorFunction,
    catchError,
    finalize,
    pipe
} from 'rxjs';
import * as Id from '../core/id'
import type { Emitter, ErrorHandling, Logging } from '../core/interfaces';
import { PayloadType, SernError } from '../core/structures/enums'
import { Err, Ok, Result } from 'ts-results-es';
import type { Awaitable, UnpackedDependencies, VoidResult } from '../types/utility';
import type { ControlPlugin } from '../types/core-plugin';
import type { CommandModule, Module, Processed } from '../types/core-modules';
import * as assert from 'node:assert';
import { Context } from '../core/structures/context';
import { CommandType } from '../core/structures/enums'
import type { Args } from '../types/utility';
import { inspect } from 'node:util'
import { disposeAll } from '../core/ioc/base';
import { arrayifySource, handleError } from '../core/operators';
import { resultPayload, isAutocomplete, treeSearch } from '../core/functions'

function contextArgs(wrappable: Message | BaseInteraction, messageArgs?: string[]) {
    const ctx = Context.wrap(wrappable);
    const args = ctx.isMessage() ? ['text', messageArgs!] : ['slash', ctx.options];
    return [ctx, args] as [Context, Args];
}

function intoPayload(module: Module) {
    return pipe(map(arrayifySource),
                map(args => ({ module, args })));
}
const createResult = createResultResolver<
    Processed<Module>,
    { module: Processed<Module>; args: unknown[]  },
    unknown[]
>({
    //@ts-ignore fix later
    callPlugins,
    onNext: ({ args }) => args,
});
/**
 * Creates an observable from { source }
 * @param module
 * @param source
 */
export function eventDispatcher(module: Module, source: unknown) {
    assert.ok(source && typeof source === 'object', `${source} cannot be constructed into an event listener`);
    const execute: OperatorFunction<unknown[], unknown> =
        concatMap(async args => module.execute(...args));
    //@ts-ignore
    return fromEvent(source, module.name!)

        //@ts-ignore
        .pipe(intoPayload(module),
              concatMap(createResult),
              execute);
}

export function createDispatcher({ module, event }: { module: Processed<CommandModule>; event: BaseInteraction; }) {
    assert.ok(CommandType.Text !== module.type,
        SernError.MismatchEvent + 'Found text command in interaction stream');
    if(isAutocomplete(event)) {
        assert.ok(module.type === CommandType.Slash 
            || module.type === CommandType.Both);
        const option = treeSearch(event, module.options);
        assert.ok(option, SernError.NotSupportedInteraction + ` There is no autocomplete tag for ` + inspect(module));
        const { command } = option;
        return { module: command as Processed<Module>, //autocomplete is not a true "module" warning cast!
                 args: [event] };
    }
    switch (module.type) {
        case CommandType.Slash:
        case CommandType.Both: {
            return { module, args: contextArgs(event) };
        }
        default: return { module, args: [event] };
    }
}
function createGenericHandler<Source, Narrowed extends Source, Output>(
    source: Observable<Source>,
    makeModule: (event: Narrowed) => Promise<Output>,
) {
    return (pred: (i: Source) => i is Narrowed) => 
        source.pipe(
            filter(pred), // only handle this stream if it passes pred
            concatMap(makeModule)); // create a payload, preparing to execute
}

/**
 * Removes the first character(s) _[depending on prefix length]_ of the message
 * @param msg
 * @param prefix The prefix to remove
 * @returns The message without the prefix
 * @example
 * message.content = '!ping';
 * console.log(fmt(message, '!'));
 * // [ 'ping' ]
 */
export function fmt(msg: string, prefix: string): string[] {
    return msg.slice(prefix.length).trim().split(/\s+/g);
}

/**
 *
 * Creates an RxJS observable that filters and maps incoming interactions to their respective modules.
 * @param i An RxJS observable of interactions.
 * @param mg The module manager instance used to retrieve the module path for each interaction.
 * @returns A handler to create a RxJS observable of dispatchers that take incoming interactions and execute their corresponding modules.
 */
export function createInteractionHandler<T extends Interaction>(
    source: Observable<Interaction>,
    mg: Map<string, Module>,
) {
    return createGenericHandler<Interaction, T, Result<ReturnType<typeof createDispatcher>, void>>(
        source,
        async event => {
            const possibleIds = Id.reconstruct(event);
            let fullPaths= possibleIds
                .map(id => mg.get(id))
                .filter((id): id is Module => id !== undefined);

            if(fullPaths.length == 0) {
                return Err.EMPTY;
            }
            const [ path ] = fullPaths;
            return Ok(createDispatcher({ module: path as Processed<CommandModule>, event }));
    });
}

export function createMessageHandler(
    source: Observable<Message>,
    defaultPrefix: string,
    mg: any,
) {
    return createGenericHandler(source, async event => {
        const [prefix, ...rest] = fmt(event.content, defaultPrefix);
        let fullPath = mg.get(`${prefix}_T`) ?? mg.get(`${prefix}_B`);
        if(!fullPath) {
            return Err('Possibly undefined behavior: could not find a static id to resolve');
        }
        return Ok({ args: contextArgs(event, rest), module: fullPath as Processed<CommandModule>  })
    });
}



interface ExecutePayload {
    module: Processed<Module>;
    task: () => Awaitable<unknown>;
    args: unknown[]
}
/**
 * Wraps the task in a Result as a try / catch.
 * if the task is ok, an event is emitted and the stream becomes empty
 * if the task is an error, throw an error down the stream which will be handled by catchError
 * thank u kingomes
 * @param emitter reference to SernEmitter that will emit a successful execution of module
 * @param module the module that will be executed with task
 * @param task the deferred execution which will be called
 */
export function executeModule(
    emitter: Emitter,
    logger: Logging|undefined,
    errHandler: ErrorHandling,
    { module, task, args }: ExecutePayload,
) {
    return of(module).pipe(
        //converting the task into a promise so rxjs can resolve the Awaitable properly
        concatMap(() => Result.wrapAsync(async () => task())),
        concatMap(result => {
            if (result.isOk()) {
                emitter.emit('module.activate', resultPayload(PayloadType.Success, module));
                return EMPTY;
            } 
            return throwError(() => resultPayload(PayloadType.Failure, module, result.error));
        }));
};

/**
 * A higher order function that
 * - creates a stream of {@link VoidResult} { config.createStream }
 * - any failures results to { config.onFailure } being called
 * - if all results are ok, the stream is converted to { config.onNext }
 * emit config.onSuccess Observable
 * @param config
 * @returns receiver function for flattening a stream of data
 */
export function createResultResolver<
    T extends { execute: (...args: any[]) => any; onEvent: ControlPlugin[] },
    Args extends { module: T; [key: string]: unknown },
    Output,
>(config: {
    onStop?: (module: T) => unknown;
    onNext: (args: Args) => Output;
}) {
    return async (args: Args) => {
        //@ts-ignore fix later
        const task = await callPlugins(args);
        if(task.isOk()) {
            return config.onNext(args) as ExecutePayload;
        } else {
            config.onStop?.(args.module);
        }
    };
};

async function callPlugins({ args, module }: { args: unknown[], module: Module }) {
    let state = {};
    for(const plugin of module.onEvent) {
        const result = await plugin.execute.apply(null, !Array.isArray(args) ? args : args);
        if(result.isErr()) {
            return result
        }
        if(typeof result.value  === 'object') {
            //@ts-ignore TODO
            state = { ...result.value, ...state };
        }
    }
    return Ok(state);
}
/**
 * Creates an executable task ( execute the command ) if all control plugins are successful
 * @param onStop emits a failure response to the SernEmitter
 */
export function makeModuleExecutor< M extends Processed<Module>, Args extends { module: M; args: unknown[]; }>
(onStop: (m: M) => unknown) {
    const onNext = ({ args, module }: Args) => ({
        task: () => module.execute(...args),
        module,
        args
    });
    return createResultResolver({ onStop, onNext })
}

export const handleCrash = ({ "@sern/errors": err,
                              '@sern/emitter': sem,
                              '@sern/logger': log } : UnpackedDependencies) =>
    pipe(catchError(handleError(err, sem, log)),
        finalize(() => {
            log?.info({
                message: 'A stream closed or reached end of lifetime',
            });
            disposeAll(log);
        }))
