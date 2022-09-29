
export default class ApiUtils {
    public static FetcherSWR() {
        return async (url: string) => await fetch(url).then((res) => res.json());
    }
}