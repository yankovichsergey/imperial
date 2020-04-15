
import { createUUID } from '.';
import {
  fakeAsync
} from '@angular/core/testing';

describe('createUUID', () => {

  it('#createUUID', fakeAsync(() => {

    const guid1 = createUUID();
    const guid2 = createUUID();
    expect(guid1).not.toEqual(guid2);
  }));

});
