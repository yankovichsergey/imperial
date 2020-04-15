import { Injectable } from '@angular/core';
import { BreadCrumbsModel } from '../models/breadCrumbs';


@Injectable({
    providedIn: 'root'
})

export class BreadCrumbsService {

    private model: BreadCrumbsModel;

    constructor() {

    }

    public getBreadCrums() {
        if (!this.model) {
            this.model = new BreadCrumbsModel();
        }
        return this.model;
    }

}
