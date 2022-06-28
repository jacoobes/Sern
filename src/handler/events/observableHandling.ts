import type { Message } from 'discord.js';
import { Observable, throwError } from 'rxjs';
import { SernError } from '../structures/errors';
import type { Module, CommandModuleDefs } from '../structures/module';
import { correctModuleType } from '../utilities/predicates';
import type { Result } from 'ts-results';
export function filterCorrectModule<T extends keyof CommandModuleDefs>(cmdType: T) {
    return (src: Observable<Module | undefined>) =>
        new Observable<CommandModuleDefs[T]>(subscriber => {
            return src.subscribe({
                next(mod) {
                    if (mod === undefined) {
                        return throwError(() => SernError.UndefinedModule);
                    }
                    if (correctModuleType(mod, cmdType)) {
                        subscriber.next(mod!);
                    } else {
                        return throwError(() => SernError.MismatchModule);
                    }
                },
                error: e => subscriber.error(e),
                complete: () => subscriber.complete(),
            });
        });
}

export function ignoreNonBot(prefix: string) {
    return (src: Observable<Message>) =>
        new Observable<Message>(subscriber => {
            return src.subscribe({
                next(m) {
                    const messageFromHumanAndHasPrefix =
                        !m.author.bot &&
                        m.content
                            .slice(0, prefix.length)
                            .localeCompare(prefix, undefined, { sensitivity: 'accent' }) === 0;
                    if (messageFromHumanAndHasPrefix) {
                        subscriber.next(m);
                    }
                },
                error: e => subscriber.error(e),
                complete: () => subscriber.complete(),
            });
        });
}

/**
 * If the current value in Result stream is an error, calls callback.
 * @param cb
 */
export function errTap<T extends Module>(cb: (err: SernError) => void) {
    return (src: Observable<Result<{ mod: T; absPath: string }, SernError>>) =>
        new Observable<{ mod: T; absPath: string }>(subscriber => {
            return src.subscribe({
                next(value) {
                    if (value.err) {
                        cb(value.val);
                    } else {
                        subscriber.next(value.val);
                    }
                },
                error: e => subscriber.error(e),
                complete: () => subscriber.complete(),
            });
        });
}
