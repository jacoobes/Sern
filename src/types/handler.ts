
import type {
    CommandInteractionOptionResolver,
    MessagePayload,
    MessageOptions,
    ClientEvents,
    Awaitable,
} from 'discord.js';

import type { Modules } from '../handler/structures/structxports';

// Anything that can be sent in a `<TextChannel>#send` or `<CommandInteraction>#reply`
export type possibleOutput<T = string> = T | (MessagePayload & MessageOptions);
export type execute = Modules.Module['execute'];

// Thanks @cursorsdottsx
export type ParseType<T> = {
    [K in keyof T]: T[K] extends unknown ? [k: K, args: T[K]] : never;
}[keyof T];


export type Args = ParseType<{ text: string[]; slash: SlashOptions }>;

export type DiscordEvent = 
    ParseType< { [K in keyof ClientEvents ] : (...args : ClientEvents[K]) => Awaitable<void> }>;

export type SlashOptions = Omit<CommandInteractionOptionResolver, 'getMessage' | 'getFocused'>;

//https://dev.to/vborodulin/ts-how-to-override-properties-with-type-intersection-554l
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

