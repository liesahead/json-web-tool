export abstract class JwtUtils {
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
