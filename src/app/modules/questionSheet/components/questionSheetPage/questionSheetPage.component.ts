import {
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import {
    Observable,
    Subscription
} from 'rxjs';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { NkSelect } from '@nkControls';
import { QuestionSheetResourcesService } from '../../services/questionSheetResources.service';
import { QuestionSheetModel } from '../../models';
import { PopupsDialogService } from '@appServices';


@Component({
    selector: 'question-sheet-page',
    templateUrl: './questionSheetPage.component.html',
    styleUrls: ['./questionSheetPage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionSheetPageComponent implements OnDestroy {

    private decimalPipe: DatePipe;
    private selector: string;
    private uploadFileSelector: string;
    private subscriptions: Subscription[] = [];

    @ViewChild('customerSelect') customerSelect: NkSelect;
    @ViewChild('locationSelect') locationSelect: NkSelect;
    @ViewChild('siteSelect') siteSelect: NkSelect;
    @ViewChild('uploaderFile') public uploaderFile: ElementRef;

    public model: QuestionSheetModel;
    public imageViewName: string;

    public get isDisabledSave(): boolean {
        const result = !(this.model.form.valid && this.model.form.dirty);
        return result;
    }

    public uploader: FileUploader;

    constructor(
        private questionSheetResourcesService: QuestionSheetResourcesService,
        private router: Router,
        private popupService: PopupsDialogService,
        private resourceService: QuestionSheetResourcesService
    ) {
        this.model = new QuestionSheetModel(questionSheetResourcesService);
        this.uploader = new FileUploader({
            allowedMimeType: ['image/jpg', 'image/jpeg', 'image/svg', 'image/png']
        });
        this.decimalPipe = new DatePipe('en-US');
        this.imageViewName = '';
        this.selector = '.js-form-block';
        this.uploadFileSelector = '.js-upload-file';
    }

    public ngOnDestroy(): void {
        this.model.destroy();
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public getCustomerCollection = (selector: any): Observable<any> => {
        selector.siteSourceId = this.siteSelect?.selectedItem?.siteSourceId;
        return this.questionSheetResourcesService.customerCollection(selector);
    }

    public getSiteCollection = (selector: any): Observable<any> => {
        return this.questionSheetResourcesService.siteCollection(selector);
    }

    public getLocationCollection = (selector: any): Observable<any> => {
        selector.customerSourceId = this.customerSelect?.selectedItem?.customerSourceId;
        return this.questionSheetResourcesService.locationCollection(selector);
    }

    public onCustomerSelect(): void {
        this.resetLocationSelector();
        if (this.customerSelect && this.customerSelect.selectedItem) {
            this.model.customerName = this.customerSelect.selectedItem.customerDescription;
            this.model.customerSourceId = this.customerSelect.selectedItem.customerSourceId;
            this.model.customerId = this.customerSelect.selectedItem.customerId;
            this.model.customerCode = this.customerSelect.selectedItem.customerCode;
        }
    }

    public onLocationSelect(): void {
        if (this.locationSelect && this.locationSelect.selectedItem) {
            this.model.locationName = this.locationSelect.selectedItem.locationDescription;
            this.model.locationSourceId = this.locationSelect.selectedItem.locationSourceId;
            this.model.locationId = this.locationSelect.selectedItem.locationId;
            this.model.locationCode = this.locationSelect.selectedItem.locationCode;
        }
    }

    public onSiteSelect(): void {
        this.resetCustomerSelector();
        this.resetLocationSelector();
        if (this.siteSelect && this.siteSelect.selectedItem) {
            this.model.siteName = this.siteSelect.selectedItem.siteDescription;
            this.model.siteSourceId = this.siteSelect.selectedItem.siteSourceId;
            this.model.siteCode = this.siteSelect.selectedItem.siteCode;
            this.model.siteId = this.siteSelect.selectedItem.siteId;
        }
    }

    public save(): void {
        this.fillField();
        this.popupService.startRelativeLoading(this.selector);
        this.subscriptions.push(this.model.save().subscribe(() => {
                this.router.navigate(['thanks'], {skipLocationChange: true});
                this.popupService.breackRelativeLoading(this.selector);
            },
            (error: any) => {
                this.popupService.breackRelativeLoading(this.selector);
            }
        ));
    }

    public removeImage(): void {
        this.model.image = null;
        this.uploaderFile.nativeElement.value = null;
        this.imageViewName = '';
    }

    public async imageUpload(event: any): Promise<void> {
        if (event.target.files) {
            const [file] = event.target.files;
            const isCurrentType = this.uploader.options.allowedMimeType.some((item: string) => item === file.type);
            const isFileSize = file.size < 4194304;
            this.model.image = null;
            this.imageViewName = null;
            if (isCurrentType && isFileSize) {
                this.upload(file);
                this.model.form.markAsDirty();
            }
            if (!isCurrentType) {
                this.imageViewName = 'Invalid file type';
            }
            if (!isFileSize) {
                this.imageViewName = 'Max size 4 mb';
            }
        }
    }

    private upload(file: File): void {
        this.popupService.startRelativeLoading(this.uploadFileSelector);
        this.subscriptions.push(
            this.resourceService.uploadImage(file).subscribe((response) => {
                    this.model.image = response.webUrl;
                    this.imageViewName = file.name;
                    this.popupService.breackRelativeLoading(this.uploadFileSelector);
                },
                error => {
                    this.popupService.breackRelativeLoading(this.uploadFileSelector);
                }
            )
        );
    }

    private resetCustomerSelector(): void {
        if (this.customerSelect) {
            this.customerSelect.clear();
            this.customerSelect.selectItem(null);
        }
    }

    private resetLocationSelector(): void {
        if (this.locationSelect) {
            this.locationSelect.clear();
            this.locationSelect.selectItem(null);
        }
    }

    private fillField(): void {
        this.model.date = this.decimalPipe.transform(this.model.servOkcDate, 'yyyy-MM-dd hh:mm:ss');
    }
}
