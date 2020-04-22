import { Observable } from 'rxjs';
import { ResourceTemplatesService } from '@appServices';
import { QuestionSheetResourceConstants } from '../constants/index';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class QuestionSheetResourcesService {

    private locations: Array<any>;
    private customers: Array<any>;
    private sites: Array<any>;

    constructor(
        private resourceTemplates: ResourceTemplatesService) {
    }

    public save(contract: any): Observable<any> {
        const data = new Observable((observer: any) => {
            this.resourceTemplates.post(QuestionSheetResourceConstants.SAVE, contract).subscribe(
                (response: any) => {
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
        const data = new Observable((observer: any) => {
            this.resourceTemplates.get(QuestionSheetResourceConstants.SITES, {})
                .subscribe(
                    (response: any) => {
                        this.sites = this.sitesResponseToCollection(response);
                        observer.next(JSON.parse(JSON.stringify(this.sites)));
                    },
                    (error: any) => {
                        observer.error(error);
                    }
                );
        });
        return data;
    }

    public customerCollection(selector: any): Observable<any> {
        const data = new Observable((observer: any) => {
            if (!this.customers) {
                this.resourceTemplates.get(QuestionSheetResourceConstants.CUSTOMERS, {})
                    .subscribe(
                        (response: any) => {
                            this.customers = this.customersResponseToCollection(response);
                            observer.next(this.filterCustomers(selector.siteSourceId));
                        },
                        (error: any) => {
                            observer.error(error);
                        }
                    );
            } else {
                observer.next(this.filterCustomers(selector.siteSourceId));
            }
        });
        return data;
    }

    public locationCollection(selector: any): Observable<any> {
        const data = new Observable((observer: any) => {
            if (!this.locations) {
                this.resourceTemplates.get(QuestionSheetResourceConstants.LOCATIONS, {})
                    .subscribe(
                        (response: any) => {
                            this.locations = this.locationResponseToCollection(response);
                            observer.next(this.filterLocation(selector));
                        },
                        (error: any) => {
                            observer.error(error);
                        }
                    );
            } else {
                observer.next(this.filterLocation(selector));
            }
        });
        return data;
    }

    public uploadImage(data: File): Observable<any> {
        const contract = {
            item: {
                '@odata.type': 'microsoft.graph.driveItemUploadableProperties',
                '@microsoft.graph.conflictBehavior': 'replace',
                name: data.name
            }
        };
        return this.resourceTemplates.post(QuestionSheetResourceConstants.UPLOAD_FILE_BY_SESSION.replace('{fileName}', data.name), contract)
            .pipe(mergeMap(item => this.resourceTemplates.put(item.uploadUrl, data)));
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

    private sitesResponseToCollection(response: any): Array<any> {
        return (response.values as Array<any>)
            .map((t: Array<any>) => {
                return {
                    id: t[3] + t[0],
                    name: t[2] + ' ' + t[1],
                    siteId: t[0],
                    siteDescription: t[1],
                    siteCode: t[2],
                    siteSourceId: t[3]
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

    private filterCustomers(siteSourceId: string): Array<any> {
        let result;
        if (siteSourceId) {
            result = this.customers.filter(t => t.siteSourceId === siteSourceId);
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

}
