import { CommandType, PluginType } from './structures/enums';
import type { Plugin, PluginResult, CommandArgs, InitArgs } from '../types/core-plugin';
import { Err, Ok } from 'ts-results-es';

export function makePlugin<V extends unknown[]>(
    type: PluginType,
    execute: (...args: any[]) => any,
): Plugin<V> {
    return { type, execute } as Plugin<V>;
}
/**
 * @since 2.5.0
 */
export function EventInitPlugin(execute: (args: InitArgs) => PluginResult) {
    return makePlugin(PluginType.Init, execute);
}
/**
 * @since 2.5.0
 */
export function CommandInitPlugin<I extends CommandType>(
    execute: (args: InitArgs) => PluginResult
) {
    return makePlugin(PluginType.Init, execute);
}
/**
 * @since 2.5.0
 */
export function CommandControlPlugin<I extends CommandType>(
    execute: (...args: CommandArgs<I>) => PluginResult,
) {
    return makePlugin(PluginType.Control, execute);
}


/**
 * @since 1.0.0
 * The object passed into every plugin to control a command's behavior
 */
export const controller = {
    next: (val?: Record<string,unknown>) => Ok(val),
    stop: (val?: string) => Err(val),
};


export type Controller = typeof controller;
