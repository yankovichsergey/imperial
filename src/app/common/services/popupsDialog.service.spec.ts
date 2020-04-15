
import { PopupsDialogService } from '.';
import {
    fakeAsync,
    flush,
    tick
} from '@angular/core/testing';

describe('PopupsDialogService', () => {
    let service: PopupsDialogService;
    const blockDisableSelector = '.block-disable';
    const blockLoading = '.relative-loading';
    beforeEach(() => {
        service = new PopupsDialogService();
    });
    describe('#blockDisable', () => {
        it('the block must be created for disabled child content by the selector', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            spyOn(document, 'querySelector').and.returnValue(expectedBlock);
            service.blockDisable('.test');
            const result = expectedBlock.querySelector(blockDisableSelector);
            expect(result).not.toBeNull();
        }));
        it('only one block must be created for disabled child content by the selector', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            spyOn(document, 'querySelector').and.returnValue(expectedBlock);
            service.blockDisable('.test');
            service.blockDisable('.test');
            const result = expectedBlock.querySelectorAll(blockDisableSelector);
            expect(result.length).toEqual(1);
        }));
        it('wrong selector do not throw error', fakeAsync(() => {
            spyOn(document, 'querySelector').and.returnValue(null);
            expect(() => {
                service.blockDisable('.test');
            }).not.toThrow();
        }));
    });

    describe('#blockEnable', () => {
        it('the block must be removed from content by the selector', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            spyOn(document, 'querySelector').and.returnValue(expectedBlock);
            service.blockDisable('.test');
            service.blockEnable('.test');
            const result = expectedBlock.querySelector(blockDisableSelector);
            expect(result).toBeNull();
        }));
        it('the method do not throw error after second call', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            spyOn(document, 'querySelector').and.returnValue(expectedBlock);
            service.blockDisable('.test');
            service.blockEnable('.test');
            expect(() => {
                service.blockEnable('.test');
            }).not.toThrow();
        }));
        it('the method do not throw error after second call', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            const spy = spyOn(document, 'querySelector');
            spy.and.returnValue(expectedBlock);
            service.blockDisable('.test');
            spy.and.returnValue(null);
            service.blockEnable('.test');
            expect(() => {
                service.blockEnable('.test');
            }).not.toThrow();
        }));
    });
    describe('#startRelativeLoading', () => {
        it('the progress block must be created in child content', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            spyOn(document, 'querySelector').and.callFake((selector: string) => {
                if (selector === '.test') {
                    return expectedBlock;
                }
                return null;
            });
            service.startRelativeLoading('.test');
            flush();
            const relativeLoading = expectedBlock.querySelector(blockLoading);
            expect(relativeLoading).not.toBeNull();
            expect(relativeLoading.classList.contains('relative-loading-hide')).toBeFalsy();
        }));
        it('the progress block must be created in child content with delay = 0', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            spyOn(document, 'querySelector').and.callFake((selector: string) => {
                if (selector === '.test') {
                    return expectedBlock;
                }
                return null;
            });
            service.startRelativeLoading('.test', 0);
            flush();
            const relativeLoading = expectedBlock.querySelector(blockLoading);
            expect(relativeLoading).not.toBeNull();
            expect(relativeLoading.classList.contains('relative-loading-hide')).toBeFalsy();
        }));
        it('the progress block must be created in child content with any css level', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            spyOn(document, 'querySelector').and.callFake((selector: string) => {
                if (selector === '.test') {
                    return expectedBlock;
                }
                return null;
            });
            service.startRelativeLoading('.test', 0, 'top');
            flush();
            const relativeLoading = expectedBlock.querySelector(blockLoading);
            expect(relativeLoading).not.toBeNull();
            expect(relativeLoading.classList.contains('relative-loading-hide')).toBeFalsy();
            expect(relativeLoading.classList.contains('top')).toBeTruthy();
        }));
        it('only one progress block must be created', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            const spy = spyOn(document, 'querySelector');
            spy.and.callFake((selector: string) => {
                if (selector === '.test') {
                    return expectedBlock;
                }
                return null;
            });
            service.startRelativeLoading('.test');
            flush();
            spy.and.callFake((selector: string) => {
                if (selector === '.test') {
                    return expectedBlock;
                }
                return {};
            });
            service.startRelativeLoading('.test');
            flush();
            const relativeLoadingCollection = expectedBlock.querySelectorAll(blockLoading);
            expect(relativeLoadingCollection.length).toEqual(1);
        }));
        it('for successive calls, the behavior of the method must be correct', fakeAsync(() => {
            const expectedBlock1 = createFakeBlock();
            const expectedBlock2 = createFakeBlock();
            spyOn(expectedBlock1.parentNode, 'removeChild');
            spyOn(expectedBlock2.parentNode, 'removeChild');
            const spy = spyOn(document, 'querySelector');
            spy.and.callFake((selector: string) => {
                if (selector === '.test1') {
                    return expectedBlock1;
                }
                if (selector === '.test2') {
                    return expectedBlock2;
                }
                return null;
            });
            service.startRelativeLoading('.test1');
            service.startRelativeLoading('.test2');
            service.breackRelativeLoading('.test1');
            flush();
            const relativeLoading1 = expectedBlock1.querySelector(blockLoading);
            expect(relativeLoading1).toBeNull();
            const relativeLoading2 = expectedBlock2.querySelector(blockLoading);
            expect(relativeLoading2).not.toBeNull();
        }));
    });
    describe('#breackRelativeLoading', () => {
        it('the progress block must be deleted in child content', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            const spy = spyOn(document, 'querySelector');
            spy.and.callFake((selector: string) => {
                if (selector === '.test') {
                    return expectedBlock;
                }
                return null;
            });
            service.startRelativeLoading('.test');
            flush();

            spy.and.callFake((selector: string) => {
                return expectedBlock;
            });
            service.breackRelativeLoading('.test');
            expect(expectedBlock.classList.contains('relative-loading-hide')).toBeTruthy();
            spyOn(expectedBlock.parentNode, 'removeChild');
            flush();
            expect(expectedBlock.parentNode.removeChild).toHaveBeenCalledWith(expectedBlock);
        }));
        it('the method do not throw error after second call', fakeAsync(() => {
            const expectedBlock = createFakeBlock();
            const spy = spyOn(document, 'querySelector');
            spy.and.callFake((selector: string) => {
                if (selector === '.test') {
                    return expectedBlock;
                }
                return null;
            });
            service.startRelativeLoading('.test');
            flush();

            service.breackRelativeLoading('.test');
            flush();
            spy.and.returnValue(createFakeBlock(false));
            expect(() => {
                service.breackRelativeLoading('.test');
            }).not.toThrow();
            flush();
        }));
    });

    function createFakeBlock(withParent: boolean = true): HTMLElement {
        const block = document.createElement('div');
        if (withParent) {
            spyOnProperty(block, 'parentNode').and.returnValue(document.createElement('div'));
        }
        return block;
    }
});
