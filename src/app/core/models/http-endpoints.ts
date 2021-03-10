import { HttpParams, HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment";

export class HttpEndpoints {

    private readonly _endpoints: { [key: string]: string } = {
        products: "products/{id}",
        productCategories: "products/categories",
        productCategory: "products/category/{category}",
    };

    getRequestOption({
        endpoint = "",
        pathVars = {},
        params = {},
        headers = {}
    }): { url: string, params: HttpParams, headers: HttpHeaders } {
        return {
            url: this.getUrl(endpoint, pathVars),
            params: this.getParams(params),
            headers: this.getHeaders(headers)
        };
    }

    getUrl(endpoint: string, pathVars: object = {}): string {
        const urls = [
            environment.apiUrl,
            this._endpoints[endpoint],
        ];
        let url = urls.join("/");

        Object.entries(pathVars).forEach((entry) => {
            const [key, value] = entry;
            url = url.replace(`{${key}}`, value);
        });

        return this._cleanUrl(url);
    }

    getParams(p: any = {}): HttpParams {
        let params = new HttpParams();

        Object.entries(p).forEach((entry: any) => {
            const [key, value] = entry;
            params = params.set(key, value);
        });
        return params;
    }

    getHeaders(rHeaders: object = {}): HttpHeaders {
        let headers = new HttpHeaders();

        Object.entries(rHeaders).forEach((header) => {
            const [key, value] = header;
            headers = headers.append(key, value);
        });

        return headers;
    }

    private _cleanUrl(url: string): string {
        const spl = url.split("/");
        const cleanUrl = spl.filter((value) => {
            return value.indexOf("{") !== 0;
        });
        return cleanUrl.join("/");
    }
}
