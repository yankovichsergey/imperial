import { HeaderItemModel } from './headerItem.model';
import { SortingConstants } from '../../constants';
import { EventEmitter } from '@angular/core';


export class HeaderSortModel {

    public items: Array<HeaderItemModel>;
    public onChangeSorting: EventEmitter<any>;

    constructor() {
        this.items = new Array<HeaderItemModel>();
        this.onChangeSorting = new EventEmitter<any>();
    }

    public getActiveSorting(): HeaderItemModel {
        const item = this.items.filter((it: HeaderItemModel) => {
            return it.isSelected;
        })[0];
        return item;
    }

    public getSortingByField(field: string): HeaderItemModel {
        const item = this.items.filter((it: HeaderItemModel) => {
            return it.field === field;
        })[0];
        return item;
    }

    public changeDirectOfSorting(field: string): HeaderItemModel {
        const item = this.items.filter((it: HeaderItemModel) => {
            return it.field === field;
        })[0];
        if (item) {
            if (item.rule === SortingConstants.ASC) {
                item.rule = SortingConstants.DESC;
            } else {
                item.rule = SortingConstants.ASC;
            }
        }
        return item;
    }

    public setActiveSorting(field: string): HeaderItemModel {
        const item = this.items.filter((it: HeaderItemModel) => {
            return it.field === field;
        })[0];
        if (item) {
            this.items.forEach((element: HeaderItemModel) => {
                element.isSelected = false;
            });
            item.isSelected = true;
        }

        return item;
    }
}
