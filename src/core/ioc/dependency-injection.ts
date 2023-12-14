import type { CoreDependencies, DependencyConfiguration, IntoDependencies } from '../../types/ioc';
import { insertLogger, useContainerRaw } from './base';
import { CoreContainer } from './container';

/**
 * @__PURE__
 * @since 2.0.0.
 * Creates a singleton object.
 * @param cb
 */
export function single<T>(cb: () => T) {
    return cb;
}

/**
 * @__PURE__
 * @since 2.0.0
 * Creates a transient object
 * @param cb
 */
export function transient<T>(cb: () => () => T) {
    return cb;
}
/**
 * The new Service api, a cleaner alternative to useContainer
 * To obtain intellisense, ensure a .d.ts file exists in the root of compilation.
 * Usually our scaffolding tool takes care of this.
 * @since 3.0.0
 * @example
 * ```ts
 * const client = Service('@sern/client');
 * ```
 * @param key a key that corresponds to a dependency registered.
 *
 */
export function Service<const T extends keyof Dependencies>(key: T) {
    return useContainerRaw().get(key)!;
}
/**
 * @since 3.0.0
 * The plural version of {@link Service}
 * @returns array of dependencies, in the same order of keys provided
 */
export function Services<const T extends (keyof Dependencies)[]>(...keys: [...T]) {
    const container = useContainerRaw();
    return keys.map(k => container.get(k)!) as IntoDependencies<T>;
}

/**
 * Given the user's conf, check for any excluded dependency keys.
 * Then, call conf.build to get the rest of the users' dependencies.
 * Finally, update the containerSubject with the new container state
 * @param conf
 */
export function composeRoot(
    container: CoreContainer<Partial<Dependencies>>,
    conf: DependencyConfiguration,
) {
    //container should have no client or logger yet.
    const hasLogger = conf.exclude?.has('@sern/logger');
    if (!hasLogger) {
        insertLogger(container);
    }
    //Build the container based on the callback provided by the user
    conf.build(container as CoreContainer<Omit<CoreDependencies, '@sern/client'>>);
    
    if (!hasLogger) {
        container.get('@sern/logger')?.info({ message: 'All dependencies loaded successfully.' });
    }

    container.ready();
}

export function useContainer<const T extends Dependencies>() {
    return <V extends (keyof T)[]>(...keys: [...V]) =>
        keys.map(key => useContainerRaw().get(key as keyof Dependencies)) as IntoDependencies<V>;
}
