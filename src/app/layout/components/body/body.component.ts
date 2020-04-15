import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { ROUTER_TRANSITION } from '@appConstants';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-body',
  animations: [ROUTER_TRANSITION],
  styleUrls: ['./body.component.scss'],
  templateUrl: './body.component.html',
})
export class BodyComponent {

  constructor() {

  }
  public getState(outlet: any) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
