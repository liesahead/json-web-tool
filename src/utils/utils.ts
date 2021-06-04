import { JwtConstants } from 'src/constants';
import { ApplicationThemes } from 'src/types';

export abstract class JwtUtils {
    public static setTheme(theme: ApplicationThemes): void {
        this.toogleDarkTheme(theme === ApplicationThemes.Dark);
    }

    public static toogleDarkTheme(force?: boolean): void {
        document.documentElement.classList.toggle(JwtConstants.appDarkThemeClassName, force);
    }

    public static getCurrentTheme(): ApplicationThemes {
        return document.documentElement.classList.contains(JwtConstants.appDarkThemeClassName)
            ? ApplicationThemes.Dark
            : ApplicationThemes.Light;
    }

    public static addQueryParams(url: string, params: Record<string, string>) {
        const urlSearchParams = new URLSearchParams();

        Object.keys(params)
            .filter((key) => params[key] != null)
            .forEach((key) => {
                urlSearchParams.append(key, params[key]);
            });

        const paramsString = urlSearchParams.toString();

        return `${url}${paramsString ? `?${paramsString}` : ''}`;
    }
}
