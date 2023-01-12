/*
 * Plugins can be inserted on all commands and are emitted
 *
 * 1. On ready event, where all commands are loaded.
 * 2. On corresponding observable (when command triggers)
 *
 * The goal of plugins is to organize commands and
 * provide extensions to repetitive patterns
 * examples include refreshing modules,
 * categorizing commands, cool-downs, permissions, etc.
 * Plugins are reminiscent of middleware in express.
 */

import type { Awaitable } from 'discord.js';
import type { Result } from 'ts-results-es';
import type { PluginType } from '../handler/structures/enums';
import type {
    CommandModule, CommandModuleDefs,
    EventModule,
} from './module';

import type { InitArgs } from '../handler/plugins';
import type { Deprecated, Processed } from './handler';
export type PluginResult = Awaitable<VoidResult>;
export type VoidResult = Result<void, void>

export interface Plugin<Args extends any[] = any[]> {
    type: PluginType;
    execute: (...args: Args) => PluginResult;
}

export interface InitPlugin<Args extends any[] = any[]> {
    type: PluginType.Init;
    execute: (...args: Args) => PluginResult;
}
export interface ControlPlugin<Args extends any[] = any[]> {
    type: PluginType.Control;
    execute: (...args: Args) => PluginResult;
}


export type AnyCommandPlugin = ControlPlugin | InitPlugin<[InitArgs<Processed<CommandModule>>]>;
export type AnyEventPlugin = ControlPlugin | InitPlugin<[InitArgs<Processed<EventModule>>]>;


export type CommandPlugin<T extends keyof CommandModuleDefs = keyof CommandModuleDefs> = Deprecated<'Please view alternatives: '>
export type DiscordEmitterPlugin = Deprecated<'Please view alternatives: '>
export type ExternalEmitterPlugin = Deprecated<'Please view alternatives: '>
export type SernEmitterPlugin = Deprecated<'Please view alternatives: '>
export type AutocompletePlugin = Deprecated<'Please view alternatives: '>
export type EventPlugin = Deprecated<'Please view alternatives: '>
export type SernEventPlugin = Deprecated<'Please view alternatives: '>
export type ExternalEventPlugin = Deprecated<'Please view alternatives: '>
export type DiscordEventPlugin = Deprecated<'Please view alternatives: '>
