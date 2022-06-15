import type { Override } from '../../types/handler';
import type { BaseModule } from './module';
import type { CommandPlugin, EventPlugin } from '../plugins/plugin';
import type { CommandType } from './enums';
import type { SernEventsMapping } from '../sernEmitter';
import type { Awaitable, ClientEvents } from 'discord.js';

export type SernEventCommand<T extends keyof SernEventsMapping = keyof SernEventsMapping> =
    Override<
        BaseModule,
        {
            name?: T;
            type: CommandType.Sern;
            onEvent: EventPlugin<CommandType.Sern>[];
            plugins: CommandPlugin[];
            execute(...args: SernEventsMapping[T]): Awaitable<void | unknown>;
        }
    >;
export type DiscordEventCommand<T extends keyof ClientEvents = keyof ClientEvents> = Override<
    BaseModule,
    {
        name?: T;
        type: CommandType.Discord;
        onEvent: EventPlugin<CommandType.Discord>[];
        plugins: CommandPlugin[];
        execute(...args: ClientEvents[T]): Awaitable<void | unknown>;
    }
>;

export type ExternalEventCommand = Override<
    BaseModule,
    {
        type: CommandType.External;
        onEvent: EventPlugin<CommandType.External>[];
        plugins: CommandPlugin[];
        execute(...args: unknown[]): Awaitable<void | unknown>;
    }
>;