import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ResourceModel } from '@appModels';

@Injectable()
export class ResourceTemplatesService {

    constructor(private http: HttpClient) {
    }

    public post: (url: string, dataContract: any) => Observable<any> = (url: string, dataContract: any) => {
        const data = new Observable((observer: any) => {
            const transformResult = this.transformUrlByParams(url, dataContract);
            this.http.post(transformResult.url, transformResult.params)
                .subscribe(
                    (response: any) => {
                        if (response) {
                            observer.next(response);
                        } else {
                            observer.next(null);
                        }
                    },
                    readHttpError => observer.error(readHttpError)
                );
        });
        return data;
    }

    public put: (url: string, dataContract: any) => Observable<any> = (url: string, dataContract: any) => {
        const data = new Observable((observer: any) => {
            const transformResult = this.transformUrlByParams(url, dataContract);
            this.http.put(transformResult.url, transformResult.params)
                .subscribe(
                    (response: any) => {
                        if (response) {
                            observer.next(response);
                        } else {
                            observer.next(null);
                        }
                    },
                    readHttpError => observer.error(readHttpError)
                );
        });
        return data;
    }

    public get: (url: string, params: any) => Observable<any> = (url: string, params: any) => {
        const data = new Observable((observer: any) => {
            this.http.get(url, {params})
                .subscribe(
                    (response: any) => {
                        if (response) {
                            observer.next(response);
                        } else {
                            observer.next(null);
                        }
                    },
                    (readHttpError: any) => {
                        observer.error(readHttpError);
                    }
                    // catchError((error: HttpErrorResponse) => {})
                );
        });
        return data;
    }

    public rest(url: string): ResourceModel {
        return new ResourceModel(url, this.http);
    }

    private transformUrlByParams(url: string, params: any): any {

        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                const _url = url;
                url = url.replace(':' + prop, params[prop]);
                if (_url !== url) {
                    delete params[prop];
                }
            }
        }

        return {url, params};
    }

}
