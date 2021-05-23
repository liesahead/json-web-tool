import { FormControl } from '@angular/forms';

export enum ApplicationThemes {
    Dark = 'Dark',
    Light = 'Light',
}

export interface ILanguage {
    name: string;
    displayName: string;
}

export interface IJwtUser {
    theme?: ApplicationThemes | null | undefined;
}

export class JwtUser implements IJwtUser {
    public theme: ApplicationThemes = ApplicationThemes.Light;

    public constructor(data?: IJwtUser | null | undefined) {
        if (data) {
            Object.keys(data).forEach((key: keyof IJwtUser) => {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            });
        }
    }
}
