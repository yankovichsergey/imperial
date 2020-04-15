import {
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ribbon-error',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './ribbonError.component.html',
  styleUrls: ['./ribbonError.component.scss'],
})
export class RibbonErrorComponent  {


  @Input() message = '';


  constructor() {

  }

}
