import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { BreadCrumbsService } from '../../services/breadCrumbs.service';
import { BreadCrumbsModel } from '../../models/breadCrumbs';

@Component({
  selector: 'bread-crumbs',
  templateUrl: './breadCrumbs.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./breadCrumbs.component.scss'],
})
export class BreadCrumbsComponent {

  public breadCrumbs: BreadCrumbsModel;

  constructor(
    service: BreadCrumbsService,
  ) {
    this.breadCrumbs = service.getBreadCrums();
  }

}
