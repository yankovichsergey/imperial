import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { ResponsiveState } from 'ngx-responsive';
import { RESPONSIVE_CONFIG } from '@appConstants';
import { GlobalRes } from '../../../textResources/en/globalRes';
import { HeaderHelper } from '../../helpers';
import { AuthenticatedUserModel } from '../../../modules/authentication/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public currentUser: AuthenticatedUserModel;

  constructor(
    private responsiveState: ResponsiveState,
    private router: Router,
    public globalRes: GlobalRes
  ) {

  }

  public ngOnInit() {
    this.init();
  }

  public isMobile(): boolean {
    return (this.responsiveState.getWidth() <= RESPONSIVE_CONFIG.breakPoints.xs.max);
  }

  public logout(): void {
    this.router.navigate(['/login']);
  }

  private init() {
    const hamburger: any = document.querySelector('#hamburger');
    if (hamburger) {
      document.body.addEventListener('mousedown', (event: any) => {
        HeaderHelper.mouseDownDocumentInit(hamburger, event);
      });
      document.body.addEventListener('touchstart', (event: any) => {
        HeaderHelper.mouseDownDocumentInit(hamburger, event);
      });
      document.addEventListener('keyup', (event: any) => {
        HeaderHelper.keyUpDocumentInit(hamburger, event);
      });
    }
  }
}
