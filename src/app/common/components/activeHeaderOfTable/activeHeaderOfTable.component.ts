import {
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HeaderSortModel, HeaderItemModel } from '../../models';
import {
  SortingConstants,
  ROTATE_180_INVERSE
} from '../../constants';


@Component({
  selector: 'active-header-of-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './activeHeaderOfTable.component.html',
  styleUrls: ['./activeHeaderOfTable.component.scss'],
  animations: [ROTATE_180_INVERSE]
})
export class ActiveHeaderOfTableComponent {

  public model: HeaderSortModel;

  constructor() {
    this.model = new HeaderSortModel();
  }

  public changeSorting(item: HeaderItemModel): void {
    if (item.isSortable) {
      const activeSorting = this.model.getActiveSorting();
      if (activeSorting.field !== item.field) {
        this.model.setActiveSorting(item.field);
      } else {
        this.model.changeDirectOfSorting(item.field);
      }
      this.model.onChangeSorting.emit();
    }
  }

  public getSortingState(item: HeaderItemModel): string {
    const activeSorting = this.model.getActiveSorting();
    if (activeSorting.field === item.field) {
      return 'selected';
    } else {
      return '';
    }
  }

  public stateSortArrow(item: HeaderItemModel): string {
    const sortItem = this.model.getSortingByField(item.field);
    if (sortItem.rule === SortingConstants.ASC) {
      return 'up';
    } else {
      return 'down';
    }
  }

}
