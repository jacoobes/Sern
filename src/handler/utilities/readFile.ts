import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { type Observable, from, concatAll } from 'rxjs';
import { SernError } from '../structures/errors';
import { type Result, Err, Ok } from 'ts-results-es';

// Courtesy @Townsy45
function readPath(dir: string, arrayOfFiles: string[] = []): string[] {
    try {
        const files = readdirSync(dir);
        for (const file of files) {
            if (statSync(dir + '/' + file).isDirectory()) readPath(dir + '/' + file, arrayOfFiles);
            else arrayOfFiles.push(join(dir, '/', file));
        }
    } catch (err) {
        throw err;
    }

    return arrayOfFiles;
}

export const fmtFileName = (n: string) => n.substring(0, n.length - 3);

/**
 *
 * @returns {Observable<{ mod: Module; absPath: string; }[]>} data from command files
 * @param commandDir
 */

export function buildData<T>(commandDir: string): Observable<
    Result<
        {
            module: T;
            absPath: string;
        },
        SernError
    >
> {
    const commands = getCommands(commandDir);
    return from(
        Promise.all(
            commands.map(async absPath => {
                let module: T | undefined;
                try {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    module = require(absPath).default;
                } catch {
                    module = (await import(`file:///` + absPath)).default;
                }
                if (module === undefined) {
                    return Err(SernError.UndefinedModule);
                }
                try {
                    module = new (module as unknown as new () => T)();
                } catch {}
                return Ok({ module, absPath });
            }),
        ),
    ).pipe(concatAll());
}

export function getCommands(dir: string): string[] {
    return readPath(join(process.cwd(), dir));
}
