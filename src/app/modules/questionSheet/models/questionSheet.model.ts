import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { QuestionSheetResourcesService } from '../services';
import { QuestionSheetContract } from '../contracts';

export class QuestionSheetModel {

    private subscriptions: Subscription[] = [];

    private _formId: string;
    public get formId(): string {
        return this._formId;
    }

    private _form: FormGroup;
    public get form(): FormGroup {
        return this._form;
    }

    private _image: any;
    public get image(): any {
        return this._image;
    }

    public set image(value: any) {
        this._image = value;
    }

    private _customerName: string;
    public get customerName(): string {
        return this._customerName;
    }

    public set customerName(value: string) {
        this._customerName = value;
    }

    private _locationName: string;
    public get locationName(): string {
        return this._locationName;
    }

    public set locationName(value: string) {
        this._locationName = value;
    }

    private _siteName: string;
    public get siteName(): string {
        return this._siteName;
    }

    public set siteName(value: string) {
        this._siteName = value;
    }

    private _date: string;
    public get date(): string {
        return this._date;
    }

    public set date(value: string) {
        this._date = value;
    }

    private _locationSourceId: string;
    public get locationSourceId(): string {
        return this._locationSourceId;
    }

    public set locationSourceId(value: string) {
        this._locationSourceId = value;
    }

    private _locationId: string;
    public get locationId(): string {
        return this._locationId;
    }

    public set locationId(value: string) {
        this._locationId = value;
    }

    private _locationCode: string;
    public get locationCode(): string {
        return this._locationCode;
    }

    public set locationCode(value: string) {
        this._locationCode = value;
    }

    private _siteSourceId: string;
    public get siteSourceId(): string {
        return this._siteSourceId;
    }

    public set siteSourceId(value: string) {
        this._siteSourceId = value;
    }

    private _siteCode: string;
    public get siteCode(): string {
        return this._siteCode;
    }

    public set siteCode(value: string) {
        this._siteCode = value;
    }

    private _siteId: string;
    public get siteId(): string {
        return this._siteId;
    }

    public set siteId(value: string) {
        this._siteId = value;
    }

    private _customerSourceId: string;
    public get customerSourceId(): string {
        return this._customerSourceId;
    }

    public set customerSourceId(value: string) {
        this._customerSourceId = value;
    }

    private _customerId: string;
    public get customerId(): string {
        return this._customerId;
    }

    public set customerId(value: string) {
        this._customerId = value;
    }

    private _customerCode: string;
    public get customerCode(): string {
        return this._customerCode;
    }

    public set customerCode(value: string) {
        this._customerCode = value;
    }

    public get firstName(): string {
        return this._form.get('firstName').value;
    }

    public set firstName(value: string) {
        this._form.get('firstName').setValue(value);
    }

    public get lastName(): string {
        return this._form.get('lastName').value;
    }

    public set lastName(value: string) {
        this._form.get('lastName').setValue(value);
    }

    public get servOkcDate(): Date {
        return this._form.get('servOkcDate').value;
    }

    public set servOkcDate(value: Date) {
        this._form.get('servOkcDate').setValue(value);
    }

    public get customer(): number {
        return this._form.get('customer').value;
    }

    public set customer(value: number) {
        this._form.get('customer').setValue(value);
    }

    public get location(): number {
        return this._form.get('location').value;
    }

    public set location(value: number) {
        this._form.get('location').setValue(value);
    }

    public get site(): number {
        return this._form.get('site').value;
    }

    public set site(value: number) {
        this._form.get('site').setValue(value);
    }

    public get equipment(): string {
        return this._form.get('equipment').value;
    }

    public set equipment(value: string) {
        this._form.get('equipment').setValue(value);
    }

    public get routeDriver(): string {
        return this._form.get('routeDriver').value;
    }

    public set routeDriver(value: string) {
        this._form.get('routeDriver').setValue(value);
    }

    public get variety(): string {
        return this._form.get('variety').value;
    }

    public set variety(value: string) {
        this._form.get('variety').setValue(value);
    }

    public get priceIncrease(): boolean {
        return this._form.get('priceIncrease').value;
    }

    public set priceIncrease(value: boolean) {
        this._form.get('priceIncrease').setValue(value);
    }

    public get addingServices(): boolean {
        return this._form.get('addingServices').value;
    }

    public set addingServices(value: boolean) {
        this._form.get('addingServices').setValue(value);
    }

    public get serviceIssues(): boolean {
        return this._form.get('serviceIssues').value;
    }

    public set serviceIssues(value: boolean) {
        this._form.get('serviceIssues').setValue(value);
    }

    public get followUp(): boolean {
        return this._form.get('followUp').value;
    }

    public set followUp(value: boolean) {
        this._form.get('followUp').setValue(value);
    }

    public get marketConversion(): boolean {
        return this._form.get('marketConversion').value;
    }

    public set marketConversion(value: boolean) {
        this._form.get('marketConversion').setValue(value);
    }

    public get other(): boolean {
        return this._form.get('other').value;
    }

    public set other(value: boolean) {
        this._form.get('other').setValue(value);
    }

    public get service(): string {
        return this._form.get('service').value;
    }

    public set service(value: string) {
        this._form.get('service').setValue(value);
    }

    public get opsNotes(): string {
        return this._form.get('opsNotes').value;
    }

    public set opsNotes(value: string) {
        this._form.get('opsNotes').setValue(value);
    }

    public get vendMaxComments(): string {
        return this._form.get('vendMaxComments').value;
    }

    public set vendMaxComments(value: string) {
        this._form.get('vendMaxComments').setValue(value);
    }

    public get serviceRequired(): boolean {
        return this._form.get('serviceRequired').value;
    }

    public set serviceRequired(value: boolean) {
        this._form.get('serviceRequired').setValue(value);
    }

    constructor(
        private questionSheetResourcesService: QuestionSheetResourcesService
    ) {
        this.initForm();
        this.disabledDropdown();
        this._formId = this.generateUUID();
    }

    public destroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public save(): Observable<any> {
        const collection = [];
        collection.push(this.toContract());
        const requestContract = {
            index: null,
            values: collection
        };

        const contract = JSON.stringify(requestContract);
        return new Observable((observer: any) => {
            this.subscriptions.push(this.questionSheetResourcesService.save(contract).subscribe(
                (response) => {
                    observer.next(response);
                },
                error => observer.error(error)
            ));
        });

    }

    private generateUUID(): string {
        let date = new Date().getTime();
        let performanceDate = (performance && performance.now && (performance.now() * 1000)) || 0;
        const result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (item: string) => {
            let randomNumber = Math.random() * 16;
            if (date > 0) {
                randomNumber = (date + randomNumber) % 16 | 0;
                date = Math.floor(date / 16);
            } else {
                randomNumber = (performanceDate + randomNumber) % 16 | 0;
                performanceDate = Math.floor(performanceDate / 16);
            }
            return (item === 'x' ? randomNumber : (randomNumber & 0x7 | 0x8)).toString(16);
        });
        return result;
    }

    private toggleService(value: boolean): void {
        if (value) {
            this._form.get('service').setValidators([Validators.required]);
        } else {
            this._form.get('service').clearValidators();
            this.service = null;
        }
        this._form.get('service').updateValueAndValidity();
    }

    private toggleDropdown(value: string, control: string): void {
        if (value) {
            this._form.get(control).enable();
        } else {
            this._form.get(control).setValue(null);
            this._form.get(control).disable();
        }
    }

    private disabledDropdown(): void {
        this._form.get('customer').disable();
        this._form.get('location').disable();
    }

    private initForm(): void {
        this._form = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            servOkcDate: new FormControl(new Date(), Validators.required),
            customer: new FormControl(),
            location: new FormControl(),
            site: new FormControl(null, [Validators.required]),
            equipment: new FormControl(),
            routeDriver: new FormControl(),
            variety: new FormControl(),

            priceIncrease: new FormControl(false),
            addingServices: new FormControl(false),
            serviceIssues: new FormControl(false),
            followUp: new FormControl(false),
            marketConversion: new FormControl(false),
            other: new FormControl(false),

            service: new FormControl(null),
            opsNotes: new FormControl(),
            vendMaxComments: new FormControl(),
            serviceRequired: new FormControl(false)
        });
        this._form.get('serviceRequired').valueChanges.subscribe(t => {
            this.toggleService(t);
        });
        this._form.get('site').valueChanges.subscribe(value => {
            this.toggleDropdown(value, 'customer');
        });
        this._form.get('customer').valueChanges.subscribe(value => {
            this.toggleDropdown(value, 'location');
        });
    }

    private getPurposeForVisit(): string {
        const priceIncrease = this.priceIncrease ? 'Price Increase' : null;
        const addingServices = this.addingServices ? 'Adding Services' : null;
        const serviceIssues = this.serviceIssues ? 'Service Issues' : null;
        const followUp = this.followUp ? 'QC Follow Up' : null;
        const marketConversion = this.marketConversion ? 'Market Conversion' : null;
        const other = this.other ? 'Other' : null;
        const result = [priceIncrease, addingServices, serviceIssues, followUp, marketConversion, other].filter(item => item !== null).join('\n');
        return result;
    }

    private toContract(): Array<QuestionSheetContract> {
        const item = new QuestionSheetContract();
        return [
            item.firstName = this.firstName,
            item.lastName = this.lastName,
            item.servOkcDate = this.date,
            item.siteSourceId = this.siteSourceId,
            item.siteId = this.siteId,
            item.siteCode = this.siteCode,
            item.site = this.siteName,

            item.customerSourceId = this.customerSourceId,
            item.customerId = this.customerId,
            item.customerCode = this.customerCode,
            item.customer = this.customerName,

            item.locationSourceId = this.locationSourceId,
            item.locationId = this.locationId,
            item.locationCode = this.locationCode,
            item.location = this.locationName,

            item.image = this.image,
            item.serviceRequired = this.serviceRequired ? 'Yes' : 'No',
            item.service = this.service,
            item.equipment = this.equipment,
            item.routeDriver = this.routeDriver,
            item.variety = this.variety,
            item.purposeForVisit = this.getPurposeForVisit(),
            item.opsNotes = this.opsNotes,
            item.vendMaxComments = this.vendMaxComments,
            item.formId = this._formId
        ];
    }

}
