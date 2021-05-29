import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtConstants } from 'src/constants';
import { JwtUtils } from './utils';

interface ITranslationResource {
    prefix: string;
    suffix: string;
}

export function translationsLoaderFactory(http: HttpClient) {
    return new JwtTranslateHttpLoader(http, { prefix: './assets/i18n/', suffix: '.json' });
}

class JwtTranslateHttpLoader implements TranslateLoader {
    constructor(private readonly _http: HttpClient, private readonly _resources: ITranslationResource) {}

    public getTranslation(lang: string): Observable<any> {
        const { prefix, suffix } = this._resources;

        const path = JwtUtils.addQueryParams(`${prefix}${lang}${suffix}`, { v: JwtConstants.appVersion });

        return this._http.get(path).pipe(
            catchError(() => {
                console.error(`Could not load translation file: ${path}`);
                return EMPTY;
            })
        );
    }
}
