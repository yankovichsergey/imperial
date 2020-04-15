import { Observable } from 'rxjs';
import { ResourceTemplatesService } from '@appServices';
import { QuestionSheetResourceConstants } from '../constants/index';
import { Injectable } from '@angular/core';

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
            if (!this.sites) {
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
            } else {
                observer.next(this.sites);
            }
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
                            observer.next(this.filterLocation(selector.customerSourceId));
                        },
                        (error: any) => {
                            observer.error(error);
                        }
                    );
            } else {
                observer.next(this.filterLocation(selector.customerSourceId));
            }
        });
        return data;
    }

    public uploadImage(data: File): Observable<any> {
        return this.resourceTemplates.put(QuestionSheetResourceConstants.UPLOAD_FILE.replace('{fileName}', data.name), data);
    }

    private locationResponseToCollection(response: any): Array<any> {
        return (response.values as Array<any>).map((t: Array<any>) => {
            return {
                customerSourceId: t[0],
                locationSourceId: t[4],
                locationId: t[5],
                locationCode: t[6],
                locationDescription: t[7]
            };
        });
    }

    private sitesResponseToCollection(response: any): Array<any> {
        return (response.values as Array<any>)
            .map((t: Array<any>) => {
                return {
                    siteId: t[3],
                    siteDescription: t[1],
                    siteCode: t[2],
                    siteSourceId: t[3]
                };
            })
            .filter((item, index, self) => {
                return item.siteSourceId !== '' && index === self.findIndex((t) => (t.siteSourceId === item.siteSourceId));
            });
    }

    private customersResponseToCollection(response: any): Array<any> {
        return (response.values as Array<any>).map((t: Array<any>) => {
            return {
                siteSourceId: t[0],
                customerSourceId: t[1],
                customerId: t[2],
                customerCode: t[3],
                customerDescription: t[4]
            };
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

    private filterLocation(customerSourceId: string): Array<any> {
        let result;
        if (customerSourceId) {
            result = this.locations.filter(t => t.customerSourceId === customerSourceId);
        } else {
            result = this.locations;
        }

        return JSON.parse(JSON.stringify(result));
    }

}
