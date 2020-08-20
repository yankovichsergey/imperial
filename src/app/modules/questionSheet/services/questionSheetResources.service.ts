import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { ResourceTemplatesService } from '@appServices';
import {
    QuestionSheetNameConstant,
    QuestionSheetResourceConstants
} from '../constants';

@Injectable()
export class QuestionSheetResourcesService {

    private locations: Array<any>;
    private customers: Array<any>;
    private sites: Array<any>;
    private dropdownSheetId: string;
    private resultSheetId: string;
    private sheetName: string;

    constructor(
        private resourceTemplates: ResourceTemplatesService
    ) {
    }

    public save(contract: any): Observable<any> {
        const data = new Observable((observer: any) => {
            this.resourceTemplates.post(QuestionSheetResourceConstants.SAVE.replace('{sheetId}', this.resultSheetId), contract)
                .subscribe((response: any) => {
                        observer.next(response);
                    },
                    (error: any) => {
                        observer.error(error);
                    }
                );
        });
        return data;
    }

    public siteCollection(selector: any): Observable<any> {
        return new Observable((observer: any) => {
            this.resourceTemplates.get(QuestionSheetResourceConstants.GET_FILE_FROM_FOLDER, {})
                .pipe(
                    mergeMap((item: any) => {
                        this.dropdownSheetId = this.getDropdownSheetId(item.value);
                        this.resultSheetId = this.getResultSheetId(item.value);
                        return this.resourceTemplates.get(QuestionSheetResourceConstants.SITES.replace('{sheetId}', this.dropdownSheetId), {});
                    })
                ).subscribe(
                (response: any) => {
                    this.sites = this.sitesResponseToCollection(response);
                    observer.next(JSON.parse(JSON.stringify(this.sites)));
                },
                (error: any) => {
                    observer.error(error);
                }
            );
        });
    }

    public customerCollection(selector: any): Observable<any> {
        this.sheetName = this.sites.filter(item => item.siteSourceId === selector.siteSourceId)[0].customerSheetName;
        const url = QuestionSheetResourceConstants.CUSTOMERS.replace('{sheetId}', this.dropdownSheetId).replace('{sheetName}', this.sheetName);

        const data = new Observable((observer: any) => {
            this.resourceTemplates.get(url, {})
                .subscribe(
                    (response: any) => {
                        this.customers = this.customersResponseToCollection(response);
                        observer.next(this.filterCustomers(selector.siteSourceId));
                    },
                    (error: any) => {
                        observer.error(error);
                    }
                );
        });
        return data;
    }

    public locationCollection(selector: any): Observable<any> {
        const url = QuestionSheetResourceConstants.LOCATIONS.replace('{sheetId}', this.dropdownSheetId).replace('{sheetName}', this.sheetName);
        const data = new Observable((observer: any) => {
            this.resourceTemplates.get(url, {})
                .subscribe(
                    (response: any) => {
                        this.locations = this.locationResponseToCollection(response);
                        observer.next(this.filterLocation(selector));
                    },
                    (error: any) => {
                        observer.error(error);
                    }
                );
        });
        return data;
    }

    public uploadImage(data: File): Observable<any> {
        const contract = {
            item: {
                '@microsoft.graph.conflictBehavior': 'rename',
                name: data.name
            }
        };
        const headers = new HttpHeaders({'Content-Range': `bytes 0-${data.size - 1}/${data.size}`});

        return this.resourceTemplates.post(QuestionSheetResourceConstants.UPLOAD_FILE_BY_SESSION.replace('{fileName}', data.name), contract)
            .pipe(mergeMap(item => this.resourceTemplates.put(item.uploadUrl, data, {headers})));
    }

    private sitesResponseToCollection(response: any): Array<any> {
        return (response.values as Array<any>)
            .map((t: Array<any>) => {
                return {
                    id: t[3] + t[0],
                    name: t[2] + ' ' + t[1],
                    siteId: t[0],
                    siteDescription: t[1],
                    siteCode: t[2],
                    siteSourceId: t[3],
                    customerSheetName: t[4]
                };
            })
            .filter((item, index, self) => {
                return item.id !== '' && index === self.findIndex(t => (t.id === item.id));
            });
    }

    private customersResponseToCollection(response: any): Array<any> {
        return (response.values as Array<any>)
            .map((t: Array<any>) => {
                return {
                    id: t[1] + t[2],
                    name: t[3] + ' ' + t[4],
                    siteSourceId: t[0],
                    customerSourceId: t[1],
                    customerId: t[2],
                    customerCode: t[3],
                    customerDescription: t[4]
                };
            })
            .filter((item, index, self) => {
                return item.id !== '' && index === self.findIndex(t => (t.id === item.id));
            });
    }

    private locationResponseToCollection(response: any): Array<any> {
        return (response.values as Array<any>)
            .map((t: Array<any>) => {
                return {
                    id: t[4] + t[5],
                    name: t[6] + ' ' + t[7],
                    customerSourceId: t[0],
                    customerId: t[1],
                    locationSourceId: t[4],
                    locationId: t[5],
                    locationCode: t[6],
                    locationDescription: t[7]
                };
            })
            .filter((item, index, self) => {
                return item.id !== '' && index === self.findIndex(t => (t.id === item.id));
            });
    }

    private filterCustomers(siteSourceId: string): Array<any> {
        let result;
        if (siteSourceId) {
            result = this.customers.filter(t => t.siteSourceId === +siteSourceId);
        } else {
            result = this.customers;
        }

        return JSON.parse(JSON.stringify(result));
    }

    private filterLocation(value: any): Array<any> {
        let result;
        if (value) {
            result = this.locations.filter(t => t.customerSourceId === value.customerSourceId && t.customerId === value.customerId);
        } else {
            result = this.locations;
        }

        return JSON.parse(JSON.stringify(result));
    }

    private getDropdownSheetId(value: Array<any>): string {
        return value.find(item => item.name === QuestionSheetNameConstant.DROPDOWN_SHEET).id;
    }

    private getResultSheetId(value: Array<any>): string {
        return value.find(item => item.name === QuestionSheetNameConstant.RESULT_SHEET).id;
    }

}
