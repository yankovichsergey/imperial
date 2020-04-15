import {
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ribbon-progress-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './ribbonProgressBar.component.html',
  styleUrls: ['./ribbonProgressBar.component.scss'],
})
export class RibbonProgressBarComponent  {

  @Input() message = '';

  constructor() {

  }

}
