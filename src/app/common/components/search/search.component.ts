import {
    Component,
    Input,
    ViewChild,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    PopupsDialogService
} from '@appServices';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { alertifyError } from '../../helpers';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchComponent),
    multi: true
};

@Component({
    selector: 'ng-search',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SearchComponent implements ControlValueAccessor {

    private searchValue: any = '';
    private searchSelector = '.js-search-input';
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private lazyTimer: any;

    @Input() placeholder = '';
    @Input() onLoadSearchData: () => Observable<any>;
    @ViewChild('inputSearch', { static: true }) inputSearch: any;

    private _enabled = false;
    get enabled(): boolean {
        return this._enabled;
    }

    constructor(
        private popups: PopupsDialogService) {

    }

    get value(): any {
        return this.searchValue;
    }

    set value(v: any) {
        if (v !== this.searchValue) {
            this.searchValue = v;
            this._enabled = this.searchValue !== '';
            this.onChangeCallback(v);
            this.loadSearchData();
        }
    }

    onBlur(): void {
        this.onTouchedCallback();
    }

    reset(): void {
        this.searchValue = '';
        this._enabled = false;
        this.onChangeCallback(this.searchValue);
        this.loadSearchData();
    }
    
    onKey(event: any): void {
        this.value = event.target.value;
    }

    writeValue(value: any): void {
        if (value !== this.searchValue) {
            this.searchValue = value;
            this._enabled = this.searchValue !== '' && this.searchValue !== undefined;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    private loadSearchData(): void {
        if (this.onLoadSearchData) {
            clearTimeout(this.lazyTimer);
            this.lazyTimer = null;
            this.lazyTimer = setTimeout(() => {
                const activeElement = document.activeElement as HTMLElement;
                activeElement.blur();
                this.popups.blockDisable(this.searchSelector);
                this.onLoadSearchData().subscribe(
                    () => {
                        setTimeout(() => {
                            activeElement.focus();
                        }, 500);
                        this.popups.blockEnable(this.searchSelector);
                    },
                    (response: any) => {
                        activeElement.focus();
                        this.popups.blockEnable(this.searchSelector);
                        alertifyError(response);
                    });
            }, 500);
        }
    }

}
