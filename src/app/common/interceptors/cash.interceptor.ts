import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent } from '@angular/common/http';

@Injectable()
export class CashInterceptor implements HttpInterceptor {
  constructor() {}

// NOTE K.O fix for updating data in IE. Remove after end of support
intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (request.method === 'GET') {
      const customRequest = request.clone({
        headers: request.headers.set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
      });
      return next.handle(customRequest);
    }
    return next.handle(request);
  }
}
