import {
    Component,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services';
import { PopupsDialogService } from '@appServices';
import { AuthenticationRes } from '@appTextResources';
import { QuestionSheetResourceConstants } from 'src/app/modules/questionSheet/constants';

@Component({
    templateUrl: 'login.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

    private _selector: string;

    public loginForm: FormGroup;
    public loading: boolean;
    public submitted: boolean;
    public returnUrl: string;
    public error: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private popups: PopupsDialogService,
        public res: AuthenticationRes
    ) {
        this.loading = false;
        this.submitted = false;
        this.error = '';
        this._selector = 'body';
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            password: ['', Validators.required]
        });

        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || QuestionSheetResourceConstants.HOME_PAGE_ROUTE;
    }

    get f() { return this.loginForm.controls; }

    public onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.popups.startRelativeLoading(this._selector);
        this.loading = true;
        this.error = null;
        this.authenticationService.login(this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigateByUrl(this.returnUrl);
                    this.popups.breackRelativeLoading(this._selector);
                },
                error => {
                    this.error = this.res.accessDenied;
                    this.loading = false;
                    this.popups.breackRelativeLoading(this._selector);
                });
    }
}
