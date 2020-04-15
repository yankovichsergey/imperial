import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ResourceTemplatesService } from '@appServices';

import {
  asyncError,
  asyncData,
  HttpResponseHelper
} from '../../../testing';

describe('SharedModule ResourceTemplatesService (with spies)', () => {
  let service: ResourceTemplatesService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };
  const url = '/anyAction/:globalKey';
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new ResourceTemplatesService(httpClientSpy as any);
  });
  describe('#get', () => {
    const expectedResults = createResponseExpectedContract();
    it('should return expected contract (HttpClient called once)', () => {
      httpClientSpy.get.and.returnValue(asyncData(expectedResults));
      service.get(url, {}).subscribe(
        result => expect(result).withContext('expected contract').toEqual(expectedResults),
        fail
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
    it('should return an error when the server returns a 404', (done) => {
      const errorResponse = HttpResponseHelper.errorResponse();
      httpClientSpy.get.and.returnValue(asyncError(errorResponse));
      service.get(url, {}).subscribe(
        (response) => {
          fail('expected an error, not data');
        },
        (response) => {
          expect(response.error).toContain(HttpResponseHelper.errorResponseMessage);
          done();
        }
      );
    });
  });
  describe('#post', () => {
    const expectedResults = createResponseExpectedContract();
    it('should return expected contract (HttpClient called once)', () => {
      httpClientSpy.post.and.returnValue(asyncData(expectedResults));
      service.post(url, createRequestExpectedContract()).subscribe(
        result => expect(result).withContext('expected contract').toEqual(expectedResults),
        fail
      );
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
    it('should return an error when the server returns a 404', (done) => {
      const errorResponse = HttpResponseHelper.errorResponse();
      httpClientSpy.post.and.returnValue(asyncError(errorResponse));
      service.post(url, createRequestExpectedContract()).subscribe(
        (response) => {
          fail('expected an error, not data');
        },
        (response) => {
          expect(response.error).toContain(HttpResponseHelper.errorResponseMessage);
          done();
        }
      );
    });
  });
  describe('#rest', () => {
    const expectedResults = createResponseExpectedContract();
    it('should return expected results (HttpClient called once)', () => {
      httpClientSpy.get.and.returnValue(asyncData(expectedResults));
      httpClientSpy.put.and.returnValue(asyncData('success'));
      httpClientSpy.post.and.returnValue(asyncData('success'));
      const resourceModel = service.rest(url);
      resourceModel.$get().subscribe(
        result => expect(result).withContext('expected contract').toEqual(expectedResults),
        fail
      );
      resourceModel.$update({}).subscribe(
        result => expect(result).withContext('expected success').toEqual('success'),
        fail
      );
      resourceModel.$save({}).subscribe(
        result => expect(result).withContext('expected success').toEqual('success'),
        fail
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
      expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
    it('should return an error when the server returns a 404', (done) => {
      const errorResponse = HttpResponseHelper.errorResponse();
      httpClientSpy.get.and.returnValue(asyncError(errorResponse));
      httpClientSpy.put.and.returnValue(asyncError(errorResponse));
      httpClientSpy.post.and.returnValue(asyncError(errorResponse));
      const resourceModel = service.rest(url);
      resourceModel.$get().subscribe(
        (response) => {
          fail('expected an error, not data');
        },
        (response) => {
          expect(response.error).toContain(HttpResponseHelper.errorResponseMessage);
          done();
        }
      );
      resourceModel.$update({}).subscribe(
        (response) => {
          fail('expected an error, not data');
        },
        (response) => {
          expect(response.error).toContain(HttpResponseHelper.errorResponseMessage);
          done();
        }
      );
      resourceModel.$save({}).subscribe(
        (response) => {
          fail('expected an error, not data');
        },
        (response) => {
          expect(response.error).toContain(HttpResponseHelper.errorResponseMessage);
          done();
        }
      );
    });
  });
});

describe('SharedModule ResourceTemplatesService (with mocks)', () => {

  const url = '/anyAction/:globalKey';
  let httpTestingController: HttpTestingController;
  let service: ResourceTemplatesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ResourceTemplatesService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ResourceTemplatesService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  describe('#get', () => {
    let expectedResults: any;
    beforeEach(() => {
      service = TestBed.get(ResourceTemplatesService);
      expectedResults = createResponseExpectedContract();
    });
    it('should return expected contract (called once)', () => {
      service.get(url, {}).subscribe(
        (result) => {
          expect(result).withContext('should return expected contract').toEqual(expectedResults);
        },
        fail
      );
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).withContext('should be GET request').toEqual('GET');
      req.flush(expectedResults);
    });
    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      service.get(url, {}).subscribe(
        result => fail('expected to fail'),
        responseError => expect(responseError.error).toContain(msg)
      );
      const req = httpTestingController.expectOne(url);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
    it('should return expected contract (called multiple times)', () => {
      service.get(url, {}).subscribe();
      service.get(url, {}).subscribe();
      service.get(url, {}).subscribe(
        result => expect(result).withContext('should return expected contract').toEqual(expectedResults),
        fail
      );
      const requests = httpTestingController.match(url);
      expect(requests.length).withContext('calls to get()').toEqual(3);
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: 'bob' }]);
      requests[2].flush(expectedResults);
    });
  });
  describe('#post', () => {
    let expectedResults: any;
    let expectedRequestResult: any;
    beforeEach(() => {
      service = TestBed.get(ResourceTemplatesService);
      expectedResults = createResponseExpectedContract();
      expectedRequestResult = createRequestExpectedContract();
    });
    it('should return expected contract (called once)', () => {
      service.post(url, expectedRequestResult).subscribe(
        (result) => {
          expect(result).withContext('should return expected contract').toEqual(expectedResults);
        },
        fail
      );
      const req = httpTestingController.expectOne(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      expect(req.request.method).withContext('should be POST request').toEqual('POST');
      expect(req.request.body).toEqual(expectedRequestResult);
      req.flush(expectedResults);
    });
    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      service.post(url, expectedRequestResult).subscribe(
        result => fail('expected to fail'),
        responseError => expect(responseError.error).toContain(msg)
      );
      const req = httpTestingController.expectOne(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
    it('should return expected contract (called multiple times)', () => {
      service.post(url, createRequestExpectedContract()).subscribe();
      service.post(url, createRequestExpectedContract()).subscribe();
      service.post(url, createRequestExpectedContract()).subscribe(
        result => expect(result).withContext('should return expected contract').toEqual(expectedResults),
        fail
      );
      const requests = httpTestingController.match(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      expect(requests.length).withContext('calls to post()').toEqual(3);
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: 'bob' }]);
      requests[2].flush(expectedResults);
    });
  });
  describe('#rest.#get', () => {
    let expectedResults: any;
    beforeEach(() => {
      service = TestBed.get(ResourceTemplatesService);
      expectedResults = createResponseExpectedContract();
    });
    it('should return expected contract (called once)', () => {
      const rest = service.rest(url);
      rest.$get().subscribe(
        (result) => {
          expect(result).withContext('should return expected contract').toEqual(expectedResults);
        },
        fail
      );
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).withContext('should be GET request').toEqual('GET');
      req.flush(expectedResults);
    });
    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      const rest = service.rest(url);
      rest.$get().subscribe(
        result => fail('expected to fail'),
        responseError => expect(responseError.error).toContain(msg)
      );
      const req = httpTestingController.expectOne(url);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
    it('should return expected contract (called multiple times)', () => {
      const rest = service.rest(url);
      rest.$get().subscribe();
      rest.$get().subscribe();
      rest.$get().subscribe(
        result => expect(result).withContext('should return expected contract').toEqual(expectedResults),
        fail
      );
      const requests = httpTestingController.match(url);
      expect(requests.length).withContext('calls to rest.get').toEqual(3);
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: 'bob' }]);
      requests[2].flush(expectedResults);
    });
  });
  describe('#rest.#save', () => {
    let expectedResults: any;
    let expectedRequestResult: any;
    beforeEach(() => {
      service = TestBed.get(ResourceTemplatesService);
      expectedResults = createResponseExpectedContract();
      expectedRequestResult = createRequestExpectedContract();
    });
    it('should return expected contract (called once)', () => {
      const rest = service.rest(url);
      rest.$save(expectedRequestResult).subscribe(
        (result) => {
          expect(result).withContext('should return expected contract').toEqual(expectedResults);
        },
        fail
      );
      const req = httpTestingController.expectOne(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      expect(req.request.method).withContext('should be POST request').toEqual('POST');
      req.flush(expectedResults);
    });
    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      const rest = service.rest(url);
      rest.$save(expectedRequestResult).subscribe(
        result => fail('expected to fail'),
        responseError => expect(responseError.error).toContain(msg)
      );
      const req = httpTestingController.expectOne(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
    it('should return expected contract (called multiple times)', () => {
      const rest = service.rest(url);
      rest.$save(expectedRequestResult).subscribe();
      rest.$save(createRequestExpectedContract()).subscribe();
      rest.$save(createRequestExpectedContract()).subscribe(
        result => expect(result).withContext('should return expected contract').toEqual(expectedResults),
        fail
      );
      const requests = httpTestingController.match(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      expect(requests.length).withContext('calls to rest.save').toEqual(3);
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: 'bob' }]);
      requests[2].flush(expectedResults);
    });
  });
  describe('#rest.#update', () => {
    let expectedResults: any;
    let expectedRequestResult: any;
    beforeEach(() => {
      service = TestBed.get(ResourceTemplatesService);
      expectedResults = createResponseExpectedContract();
      expectedRequestResult = createRequestExpectedContract();
    });
    it('should return expected contract (called once)', () => {
      const rest = service.rest(url);
      rest.$update(expectedRequestResult).subscribe(
        (result) => {
          expect(result).withContext('should return expected contract').toEqual(expectedResults);
        },
        fail
      );
      const req = httpTestingController.expectOne(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      expect(req.request.method).withContext('should be PUT request').toEqual('PUT');
      req.flush(expectedResults);
    });
    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      const rest = service.rest(url);
      rest.$update(expectedRequestResult).subscribe(
        result => fail('expected to fail'),
        responseError => expect(responseError.error).toContain(msg)
      );
      const req = httpTestingController.expectOne(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
    it('should return expected contract (called multiple times)', () => {
      const rest = service.rest(url);
      rest.$update(expectedRequestResult).subscribe();
      rest.$update(createRequestExpectedContract()).subscribe();
      rest.$update(createRequestExpectedContract()).subscribe(
        result => expect(result).withContext('should return expected contract').toEqual(expectedResults),
        fail
      );
      const requests = httpTestingController.match(url.replace(':globalKey', createRequestExpectedContract().globalKey));
      expect(requests.length).withContext('calls to rest.update').toEqual(3);
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: 'bob' }]);
      requests[2].flush(expectedResults);
    });
  });
});

function createResponseExpectedContract(): any {
  return {
    field1: 'field1',
    field2: 'field2'
  };
}

function createRequestExpectedContract(): any {
  return {
    globalKey: '2',
    field3: 'field3',
    field4: 'field4'
  };
}
