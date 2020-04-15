import {
  TestBed,
  fakeAsync,
  flush
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CashInterceptor } from '.';
import { ResourceTemplatesService } from '@appServices';

describe('CashInterceptor', () => {
  let service: ResourceTemplatesService;
  let httpMock: HttpTestingController;
  const url = '/someurl';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule],
      providers: [
        ResourceTemplatesService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CashInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.get(ResourceTemplatesService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should add the access token to header', fakeAsync(() => {
    service.get(url, {}).subscribe(
      fail,
      result => result
    );
    flush();
    const httpRequest = httpMock.expectOne(url);
    const cacheControl = httpRequest.request.headers.get('Cache-Control');
    expect(cacheControl).toEqual('no-cache');
    const pragma = httpRequest.request.headers.get('Pragma');
    expect(pragma).toEqual('no-cache');
    service.post(url, {}).subscribe(
      fail,
      result => result
    );
    flush();
  }));

});
