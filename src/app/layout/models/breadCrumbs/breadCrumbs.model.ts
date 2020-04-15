import { BreadCrumbsItemModel } from '.';

export class BreadCrumbsModel {

    private _items: Array<BreadCrumbsItemModel>;
    public get items(): Array<BreadCrumbsItemModel> {
        return this._items;
    }

    constructor() {
        this._items = new Array<BreadCrumbsItemModel>();
    }

    public clear(): void {
        this.items.length = 0;
    }

    public add(item: BreadCrumbsItemModel): void {
        this.items.push(item);
    }
}
