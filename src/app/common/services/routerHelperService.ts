import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
    DefaultUrlSerializer,
} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouterHelperService {

    constructor(
        private location: Location) {

    }

    public getQueryString(): string {
        return this.location.path().split('?')[1] || '';
    }

    public getSearch(): any {
        const pathString = this.location.path();
        const routeParams = new DefaultUrlSerializer().parse(pathString).queryParams;
        return routeParams;
    }
}
