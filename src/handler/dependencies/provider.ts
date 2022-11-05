import type { Container } from 'iti';
import { SernError } from '../structures/errors';
import { BehaviorSubject } from 'rxjs';
import * as assert from 'assert';
import type { Dependencies, MapDeps } from '../../types/handler';
import SernEmitter from '../sernEmitter';
import { constFn } from '../utilities/functions';
import { DefaultErrorHandling, DefaultModuleManager } from '../contracts';
import { ModuleStore } from '../structures/moduleStore';
import { None, Result } from 'ts-results-es';

export const containerSubject = new BehaviorSubject<Container<Dependencies, {}> | null>(null);
export function composeRoot<T extends Dependencies>(root: Container<Partial<T>, {}>, exclusion: Set<keyof Dependencies>) {
    const client = root.get('@sern/client');
    assert.ok(client !== undefined, SernError.MissingRequired);
    const exclude = (key: keyof Dependencies) => exclusion.has(key);
    const getOr = (key: keyof Dependencies, elseVal: unknown) => Result.wrap(() => root.get(key)).unwrapOr(elseVal);
    const xGetOr = (key: keyof Dependencies, or: unknown) => getOr(key, exclude(key) ? or : None );
    xGetOr('@sern/emitter', root.upsert({
            '@sern/emitter' : constFn(new SernEmitter())
        })
    );
    xGetOr('@sern/logger',
        root.upsert({
            '@sern/logger' : constFn(console)
        })
    );
    xGetOr('@sern/store',
        root.upsert({
            '@sern/store' : constFn(new ModuleStore())
        })
    );
    xGetOr('@sern/modules',
        root.upsert((ctx) => ({
            '@sern/modules' : constFn(new DefaultModuleManager(ctx['@sern/store'] as ModuleStore))
        }))
    );
    xGetOr('@sern/errors',
        root.upsert({
            '@sern/errors': constFn(new DefaultErrorHandling())
        })
    );
}


export function useContainer<T extends Dependencies>() {
    const container = containerSubject.getValue()! as unknown as Container<T, {}>;
    assert.ok(container !== null, 'useContainer was called before Sern#init');
    return <V extends (keyof T)[]>(...keys: [...V]) => keys.map(key => container.get(key)) as MapDeps<T, V>;
}