import {
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ribbon-no-items',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './ribbonNoItems.component.html',
  styleUrls: ['./ribbonNoItems.component.scss'],
})
export class RibbonNoItemsComponent  {


  @Input() message = '';


  constructor() {

  }

}
