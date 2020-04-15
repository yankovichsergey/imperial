import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export class ResourceModel {

    constructor(
        private url: string,
        private http: HttpClient,
    ) { }

    public $get: (params?: any) => Observable<any> = (params: any) => {

        const data = new Observable((observer: any) => {
            const transformResult = this.transformUrlByParams(params);
            this.http.get(transformResult.url, transformResult.params)
                .subscribe(
                    (response: any) => {
                        observer.next(response);
                    },
                    readHttpError => observer.error(readHttpError));
        });
        return data;
    }

    public $save: (dataContract: any) => Observable<any> = (dataContract: any) => {
        const data = new Observable((observer: any) => {
            const transformResult = this.transformUrlByParams(dataContract);
            this.http.post(transformResult.url, transformResult.params)
                .subscribe(
                    (response: any) => {
                        observer.next(response);
                    },
                    readHttpError => observer.error(readHttpError));
        });
        return data;
    }

    public $update: (dataContract: any) => Observable<any> = (dataContract: any) => {
        const data = new Observable((observer: any) => {
            const transformResult = this.transformUrlByParams(dataContract);
            this.http.put(transformResult.url, transformResult.params)
                .subscribe(
                    (response: any) => {
                        observer.next(response);
                    },
                    readHttpError => observer.error(readHttpError));
        });
        return data;
    }

    private transformUrlByParams(params: any): any {
        let url = this.url;
        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                const _url = url;
                url = url.replace('/:' + prop, '/' + params[prop] || '');
                if (_url !== url) {
                    delete params[prop];
                }
            }
        }

        return { url, params };
    }
}
