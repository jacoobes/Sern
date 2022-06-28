import type Wrapper from './structures/wrapper';
import { onReady } from './events/readyEvent';
import { onMessageCreate } from './events/messageEvent';
import { onInteractionCreate } from './events/interactionCreate';
import { Err, Ok } from 'ts-results';
import { ExternalEventEmitters } from './utilities/readFile';
import type { EventEmitter } from 'events';
import { processEvents } from './events/userDefinedEventsHandling';
import type { CommandModule, EventModule } from './structures/module';
import { EventType, PluginType } from './structures/enums';
import type {
    CommandPlugin,
    EventModuleCommandPluginDefs,
    EventModuleEventPluginDefs,
    EventPlugin,
    InputCommandModule,
    InputEventModule,
} from './plugins/plugin';

/**
 *
 * @param wrapper options to pass into sern.
 *  Function to start the handler up.
 */
export function init(wrapper: Wrapper) {
    const { events } = wrapper;
    if (events !== undefined) {
        processEvents(wrapper, events);
    }
    onReady(wrapper);
    onMessageCreate(wrapper);
    onInteractionCreate(wrapper);
}

/**
 *
 * @param emitter Any external event emitter.
 * The object will be stored in a map, and then fetched by the name of the emitter provided.
 * As there are infinite possibilities to adding external event emitters,
 * Most types aren't provided and are as narrow as possibly can.
 */
export function addExternal<T extends EventEmitter>(emitter: T) {
    if (ExternalEventEmitters.has(emitter.constructor.name)) {
        throw Error(`${emitter.constructor.name} already exists!`);
    }
    ExternalEventEmitters.set(emitter.constructor.name, emitter);
}

export const controller = {
    next: () => Ok.EMPTY,
    stop: () => Err.EMPTY,
};

export function commandModule(mod: InputCommandModule): CommandModule {
    const onEvent: EventPlugin[] = [];
    const plugins: CommandPlugin[] = [];
    for (const pl of mod.plugins ?? []) {
        if (pl.type === PluginType.Event) {
            onEvent.push(pl);
        } else {
            plugins.push(pl as CommandPlugin);
        }
    }

    return {
        ...mod,
        onEvent,
        plugins,
    } as CommandModule;
}
export function eventModule(mod: InputEventModule): EventModule {
    const onEvent: EventModuleEventPluginDefs[EventType][] = [];
    const plugins: EventModuleCommandPluginDefs[EventType][] = [];
    for (const pl of mod.plugins ?? []) {
        if (pl.type === PluginType.Event) {
            onEvent.push(pl);
        } else {
            plugins.push(pl);
        }
    }

    return {
        ...mod,
        onEvent,
        plugins,
    } as EventModule;
}
