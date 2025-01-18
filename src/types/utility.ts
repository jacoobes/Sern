import type { InteractionReplyOptions, MessageReplyOptions } from 'discord.js';
import type { Module } from './core-modules';

export type Awaitable<T> = PromiseLike<T> | T;
export type Dictionary = Record<string, unknown>

export type AnyFunction = (...args: any[]) => unknown;

export interface SernEventsMapping {
    'module.register': [Payload];
    'module.activate': [Payload];
    error: [{ type: 'failure'; module?: Module; reason: string | Error }];
    warning: [Payload];
    modulesLoaded: [never?];
}

export type Payload =
    | { type: 'success'; module: Module }
    | { type: 'failure'; module?: Module; reason: string | Error }
    | { type: 'warning'; module: undefined; reason: string };

export type UnpackFunction<T> = T extends (...args: any) => infer U ? U : T
export type UnpackedDependencies = {
    [K in keyof Dependencies]: UnpackFunction<Dependencies[K]>
}
export type ReplyOptions = string | Omit<InteractionReplyOptions, 'fetchReply'> | MessageReplyOptions;


/**
 * @interface Wrapper
 * @description Configuration interface for the sern framework. This interface defines
 * the structure for configuring essential framework features including command handling,
 * event management, and task scheduling.
 */
export interface Wrapper {
    /**
     * @property {string|string[]} commands
     * @description Specifies the directory path where command modules are located.
     * This is a required property that tells sern where to find and load command files.
     * The path should be relative to the project root. If given an array, each directory is loaded in order
     * they were declared. Order of modules in each directory is not guaranteed
     *
     * @example
     * commands: ["./dist/commands"]
     */
    commands: string | string[];
    /**
     * @property {boolean} [handleModuleErrors]
     * @description Optional flag to enable automatic error handling for modules.
     * When enabled, sern will automatically catch and handle errors that occur
     * during module execution, preventing crashes and providing error logging.
     * 
     * @default false
     */
    handleModuleErrors?: boolean;
    /**
     * @property {string} [defaultPrefix]
     * @description Optional prefix for text commands. This prefix will be used
     * to identify text commands in messages. If not specified, text commands {@link CommandType.Text}
     * will be disabled.
     * 
     * @example
     * defaultPrefix: "?"
     */
    defaultPrefix?: string;
    /**
     * @property {string|string[]} [events]
     * @description Optional directory path where event modules are located.
     * If provided, Sern will automatically register and handle events from
     * modules in this directory. The path should be relative to the project root.
     * If given an array, each directory is loaded in order they were declared. 
     * Order of modules in each directory is not guaranteed.
     * 
     * @example
     * events: ["./dist/events"]
     */
    events?: string | string[];
    /**
     * @property {string|string[]} [tasks]
     * @description Optional directory path where scheduled task modules are located.
     * If provided, Sern will automatically register and handle scheduled tasks
     * from modules in this directory. The path should be relative to the project root.
     * If given an array, each directory is loaded in order they were declared. 
     * Order of modules in each directory is not guaranteed.
     * 
     * @example
     * tasks: ["./dist/tasks"]
     */
    tasks?: string | string[];
}
