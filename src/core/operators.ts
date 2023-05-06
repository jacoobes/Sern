/**
 * This file holds sern's rxjs operators used for processing data.
 * Each function should be modular and testable, not bound to discord / sern
 * and independent of each other
 */
import { concatMap, defaultIfEmpty, EMPTY, every, fromEvent, map, Observable, of, OperatorFunction, pipe, share, switchMap } from 'rxjs';
import type { AnyModule } from '../types/module';
import type { PluginResult, VoidResult } from '../types/plugin';
import { Result } from 'ts-results-es';
import { Awaitable } from '../types/handler';
import { ImportPayload, Processed } from '../types/core';
import { EventEmitter } from 'node:events';
/**
 * if {src} is true, mapTo V, else ignore
 * @param item
 */
export function filterMapTo<V>(item: () => V): OperatorFunction<boolean, V> {
    return concatMap(shouldKeep => (shouldKeep ? of(item()) : EMPTY));
}

export function filterMap<In, Out>(cb: (i: In) => Awaitable<Result<Out, unknown>>): OperatorFunction<In, Out> {
    return pipe(
        switchMap(async input => cb(input)),
        concatMap(s => {
            if(s.ok) {
                return of(s.val)
            }
            return EMPTY;
        })
    )
}

/**
 * Calls any plugin with {args}.
 * @param args if an array, its spread and plugin called.
 */
export function callPlugin(args: unknown): OperatorFunction<
    {
        execute: (...args: unknown[]) => PluginResult;
    },
    VoidResult
> {
    return concatMap(async plugin => {
        if (Array.isArray(args)) {
            return plugin.execute(...args);
        }
        return plugin.execute(args);
    });
}

export const arrayifySource = map(src => (Array.isArray(src) ? (src as unknown[]) : [src]));

export const fillDefaults = <T extends AnyModule>({ module, absPath }: ImportPayload<T>) => {
    module.description ??= '...'
    return {
        absPath,
        module 
    } as ImportPayload<Processed<T>>;
};

/**
 * If the current value in Result stream is an error, calls callback.
 * This also extracts the Ok value from Result
 * @param cb
 * @returns Observable<{ module: T; absPath: string }>
 */
export function errTap<Ok, Err>(cb: (err: Err) => void): OperatorFunction<Result<Ok, Err>, Ok> {
    return concatMap(result => {
        if (result.ok) {
            return of(result.val);
        } else {
            cb(result.val as Err);
            return EMPTY;
        }
    });
}

/**
 * Checks if the stream of results is all ok.
 */
export const everyPluginOk: OperatorFunction<VoidResult, boolean> = pipe(
    every(result => result.ok),
    defaultIfEmpty(true),
);

export const sharedObservable = <T>(e: EventEmitter, eventName: string) => {
    return (fromEvent(e, eventName) as Observable<T>).pipe(share())
};

