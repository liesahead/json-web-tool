import { ILanguage } from './types';
import packageJson from 'package.json';

export abstract class JwtConstants {
    public static appVersion = packageJson.version;

    // TODO: try to make SASS export work and export classname from there.
    public static appDarkThemeClassName = 'jwt-dark-theme';

    public static availableLanguages: ILanguage[] = [
        {
            name: 'en',
            displayName: 'English',
        },
        {
            name: 'ru',
            displayName: 'Русский',
        },
    ];
    public static defaultLanguage: string = JwtConstants.availableLanguages[0].name;
}
