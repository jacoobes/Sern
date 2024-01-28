import type { Localizer, Init } from '../core/contracts'
import { Localization } from 'shrimple-locales'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path';
import { filename } from '../core/module-loading'
import assert from 'node:assert';

/**
 * @since 3.4.0
 */
export class ShrimpleLocalizer implements Localizer, Init {
    private __localization!: Localization;
    constructor(){}

    translationsFor(path: string): Record<string, any> {
        return this.__localization.localizationFor(path);
    }

    translate(text: string, local: string): string {
        this.__localization.changeLanguage(local);
        return this.__localization.get(text);
    }

    async init() {
        const map = await this.readLocalizationDirectory();
        this.__localization = new Localization({
            defaultLocale: "en",
            fallbackLocale: "en",
            locales: map
        });
    }

    private async readLocalizationDirectory() {
        const translationFiles = [];
        const localPath = resolve('locals');
        assert(existsSync(localPath), "No directory \"locals\" found for the localizer")
        for(const json of await fs.readdir(localPath)) {
           translationFiles.push({ [filename(json)]: 
                                   JSON.parse(await fs.readFile(join(localPath, json), 'utf8')) })
        }
        return translationFiles.reduce((acc, cur ) => ({ ...cur, ...acc }),  {});
    }
}