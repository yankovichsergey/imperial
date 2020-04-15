import {
    Observable,
    of
} from 'rxjs';
import {
    Injectable,
    Injector
} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }
}
