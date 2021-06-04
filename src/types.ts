import { JwtConstants } from './constants';

export enum ApplicationThemes {
    Dark = 'Dark',
    Light = 'Light',
}

export interface ILanguage {
    name: string;
    displayName: string;
}

export interface ITranslatableSelectValue {
    value: string;
    displayValue: string;
}

export class JwtUser {
    public theme = ApplicationThemes.Light;
    public language = JwtConstants.defaultLanguage;

    public constructor(data?: Partial<JwtUser>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
