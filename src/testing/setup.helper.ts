import {
    TestBed,
    TestModuleMetadata,
    ComponentFixture,
    getTestBed
} from '@angular/core/testing';
import { Type } from '@angular/core';

const resetTestingModule = TestBed.resetTestingModule;

const preventAngularFromResetting = () => TestBed.resetTestingModule = () => TestBed;
const allowAngularToReset = () => {
    resetTestingModule();
    TestBed.resetTestingModule = resetTestingModule;
};

export const setUpTestBed = (moduleDef: TestModuleMetadata, ...funcs: (() => void)[]) => {
    configureTestSuite();
    beforeAll(done => (async () => {
        resetTestingModule();
        preventAngularFromResetting();

        TestBed.configureTestingModule(moduleDef);
        funcs.forEach(func => func());

        TestBed.resetTestingModule = () => TestBed;
        return await TestBed.compileComponents();
    })().then(done).catch(done.fail));

    afterAll(() => allowAngularToReset());
};

export const createMockLocalStorage = (store: any): any => {
    const mockLocalStorage = {
        getItem: (key: string): string => {
            return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
            store[key] = `${value}`;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
    spyOn(localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
        .and.callFake(mockLocalStorage.clear);
    return mockLocalStorage;
};

export const checkComparerOptions = (path: string): any => {
    const { join } = require('path');
    return {
        actualFolder: join(process.cwd(), './.tmp/actual/' + path),
        baselineFolder: join(process.cwd(), './baseline/'  + path),
        diffFolder: join(process.cwd(), './.tmp/diff/'  + path),
        fullPageScrollTimeout: 3000
    };
};


export const configureTestSuite = (configureAction?: () => void) => {
    const testBedApi: any = getTestBed();
    const originReset = TestBed.resetTestingModule;

    beforeAll(() => {
        TestBed.resetTestingModule();
        TestBed.resetTestingModule = () => TestBed;
    });

    if (configureAction) {
        beforeAll((done: DoneFn) => (async () => {
            configureAction();
            await TestBed.compileComponents();
        })().then(done).catch(done.fail));
    }

    afterEach(() => {
        testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
        testBedApi._instantiated = false;
        testBedApi._testModuleRef = null;
    });

    afterAll(() => {
        TestBed.resetTestingModule = originReset;
        TestBed.resetTestingModule();
    });
};

export class TestCtx<T> {
    constructor(public fixture: ComponentFixture<T>) { }

    public get component() { return this.fixture.componentInstance; }

    public get element(): HTMLElement { return this.fixture.debugElement.nativeElement; }

    public detectChanges() { this.fixture.detectChanges(); }

    public resolve(component: Type<any>) { return this.fixture.debugElement.injector.get(component); }
}

export const createTestContext = <T>(component: Type<T>) => {
    const fixture = TestBed.createComponent<T>(component);
    const testCtx = new TestCtx<T>(fixture);
    return testCtx;
};

export const createStableTestContext = async <T>(component: Type<T>) => {
    const testCtx = createTestContext(component);
    testCtx.detectChanges();
    await testCtx.fixture.whenStable();
    testCtx.detectChanges();
    return testCtx;
};
