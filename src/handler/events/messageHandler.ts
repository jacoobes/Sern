import { EventsHandler } from './eventsHandler';
import { catchError, concatMap, from, fromEvent, map, Observable, of, switchMap } from 'rxjs';
import type Wrapper from '../structures/wrapper';
import type { Message } from 'discord.js';
import { executeModule, ignoreNonBot, isOneOfCorrectModules } from './observableHandling';
import { fmt } from '../utilities/messageHelpers';
import Context from '../structures/context';
import { CommandType, PayloadType } from '../structures/enums';
import { arrAsync } from '../utilities/arrAsync';
import { controller } from '../sern';
import type { CommandModule, TextCommand } from '../../types/module';
import { handleError } from '../contracts/errorHandling';
import type { ModuleStore } from '../structures/moduleStore';

export default class MessageHandler extends EventsHandler<{
    ctx: Context;
    args: ['text', string[]];
    mod: TextCommand;
}> {
    protected discordEvent: Observable<Message>;
    public constructor(protected wrapper: Wrapper) {
        super(wrapper);
        this.discordEvent = <Observable<Message>>fromEvent(this.client, 'messageCreate');
        this.init();
        this.payloadSubject
            .pipe(
                switchMap(({ mod, ctx, args }) => {
                    const res = arrAsync(
                            mod.onEvent.map(ep => ep.execute([ctx, args], controller)),
                    );
                    const execute = () => mod.execute(ctx, args);
                    //resolves the promise and re-emits it back into source
                    return from(res).pipe(map(res => ({ mod, execute, res })));
                }),
                concatMap(payload => executeModule(wrapper, payload)),
                catchError(handleError(this.crashHandler, this.logger)),
            )
            .subscribe();
    }

    protected init(): void {
        if (this.wrapper.defaultPrefix === undefined) return; //for now, just ignore if prefix doesn't exist
        const { defaultPrefix } = this.wrapper;
        const get = (cb: (ms: ModuleStore) => CommandModule | undefined) => {
              return this.modules.get(cb);
        };
        this.discordEvent
            .pipe(
                ignoreNonBot(this.wrapper.defaultPrefix),
                map(message => {
                    const [prefix, ...rest] = fmt(message, defaultPrefix);
                    return {
                        ctx: Context.wrap(message),
                        args: <['text', string[]]>['text', rest],
                        mod: get(ms =>
                            ms.TextCommands.get(prefix) ??
                            ms.BothCommands.get(prefix)
                        ),
                    };
                }),
                concatMap(element =>
                    of(element.mod).pipe(
                        isOneOfCorrectModules(CommandType.Text),
                        map(mod => ({ ...element, mod })),
                    ),
                ),
            )
            .subscribe({
                next: value => this.setState(value),
                error: reason =>
                    this.emitter.emit('error', { type: PayloadType.Failure, reason }),
            });
    }

    protected setState(state: { ctx: Context; args: ['text', string[]]; mod: TextCommand }) {
        this.payloadSubject.next(state);
    }
}
