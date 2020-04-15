import { SortingConstants } from '../../constants';

export class HeaderItemModel {
    public isSelected: boolean;
    public rule: string;
    public field: string;
    public displayName: string;
    public isSortable: boolean;
    public ngClass: string;

    constructor(field: string, displayName: string) {
        this.isSelected = false;
        this.rule = SortingConstants.ASC;
        this.field = field;
        this.displayName = displayName;
        this.isSortable = true;
    }
}
