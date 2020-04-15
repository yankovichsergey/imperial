
import { HeaderHelper } from '.';
import {
  fakeAsync,
  flush
} from '@angular/core/testing';

describe('HeaderHelper', () => {

  it('#keyUpDocumentInit', fakeAsync(() => {
    const hamburger = {
      checked: true
    };
    const event = {
      keyCode: 13
    };
    HeaderHelper.keyUpDocumentInit(hamburger, event);
    expect(hamburger.checked).toBeTruthy();
    event.keyCode = 27;
    HeaderHelper.keyUpDocumentInit(hamburger, event);
    expect(hamburger.checked).toBeFalsy();
  }));

  describe('#mouseDownDocumentInit', () => {
    it('click on any area except hamburger and area of menu must be to close menu', fakeAsync(() => {
      const hamburger = {
        checked: true
      };
      const event = {
        target: {
          closest: (selector: string) => {
            return null;
          }
        }
      };
      HeaderHelper.mouseDownDocumentInit(hamburger, event);
      expect(hamburger.checked).toBeFalsy();
    }));
    it('click on any area except hamburger and item of menu must be to close menu', fakeAsync(() => {

      const hamburger = {
        checked: true
      };
      const event = {
        target: {
          closest: (selector: string) => {
            return selector === '.menu-holder' ? {
              querySelector: () => {
                return null;
              }
            } : null;
          }
        }
      };
      HeaderHelper.mouseDownDocumentInit(hamburger, event);
      expect(hamburger.checked).toBeFalsy();

    }));
    it('click on any area except hamburger and item of menu must be to close menu', fakeAsync(() => {
      const hamburger = {
        checked: true
      };
      const event = {
        target: {
          closest: (selector: string) => {
            return (selector === '.menu-holder' || selector === '.nav') ? {
              querySelector: () => {
                return null;
              }
            } : null;
          }
        }
      };
      HeaderHelper.mouseDownDocumentInit(hamburger, event);
      expect(hamburger.checked).toBeFalsy();

    }));
    it('click on hamburger or item of menu must be dont close menu', fakeAsync(() => {

      const hamburger = {
        checked: true
      };
      const event = {
        target: {
          closest: (selector: string) => {
            return (selector === '.menu-holder' || selector === '.nav') ? {
              querySelector: () => {
                return {};
              }
            } : null;
          }
        }
      };
      HeaderHelper.mouseDownDocumentInit(hamburger, event);
      expect(hamburger.checked).toBeTruthy();

    }));
  });

});
