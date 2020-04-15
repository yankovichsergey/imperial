import { By } from '@angular/platform-browser';
import {
    ComponentFixture,
    tick,
    flush
} from '@angular/core/testing';
export function clickWithTick(fixture: ComponentFixture<any>, nativeElementParam: any | string) {
    if (typeof nativeElementParam === 'string') {
        const element = fixture.debugElement.query(By.css(nativeElementParam));
        element.nativeElement.dispatchEvent(new MouseEvent('click'));
    } else {
        nativeElementParam.dispatchEvent(new MouseEvent('click'));
    }
    tick();
    fixture.detectChanges();
}
export function clickWithFlush(fixture: ComponentFixture<any>, nativeElementParam: any | string) {
    if (typeof nativeElementParam === 'string') {
        const element = fixture.debugElement.query(By.css(nativeElementParam));
        element.nativeElement.dispatchEvent(new MouseEvent('click'));
    } else {
        nativeElementParam.dispatchEvent(new MouseEvent('click'));
    }
    flush();
    fixture.detectChanges();
}
export function click(fixture: ComponentFixture<any>, nativeElementParam: any): any {
    let nElement: any;
    if (typeof nativeElementParam === 'string') {
        const element = fixture.debugElement.query(By.css(nativeElementParam));
        nElement = element.nativeElement;
    } else {
        nElement = nativeElementParam;
    }
    nElement.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    nElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    return nElement;
}
export function clickWithoutDetect(fixture: ComponentFixture<any>, nativeElementParam: any): any {
    let nElement: any;
    if (typeof nativeElementParam === 'string') {
        const element = fixture.debugElement.query(By.css(nativeElementParam));
        nElement = element.nativeElement;
    } else {
        nElement = nativeElementParam;
    }
    nElement.dispatchEvent(new MouseEvent('click'));
    return nElement;
}
export function focus(fixture: ComponentFixture<any>, nativeElementParam: any): any {
    let nElement: any;
    if (typeof nativeElementParam === 'string') {
        const element = fixture.debugElement.query(By.css(nativeElementParam));
        nElement = element.nativeElement;
    } else {
        nElement = nativeElementParam;
    }
    nElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    return nElement;
}
export function input(fixture: ComponentFixture<any>, nativeElementParam: any, value: string) {
    let nElement: any;
    if (typeof nativeElementParam === 'string') {
        const element = fixture.debugElement.query(By.css(nativeElementParam));
        nElement = element.nativeElement;
    } else {
        nElement = nativeElementParam;
    }
    nElement.dispatchEvent(new MouseEvent('click'));
    tick();
    fixture.detectChanges();
    nElement.value = value;
    nElement.dispatchEvent(new Event('input'));
    nElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    nElement.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();
}

export function touchWithTick(fixture: ComponentFixture<any>, nativeElementParam: any | string) {
    let nElement: any;
    if (typeof nativeElementParam === 'string') {
        const element = fixture.debugElement.query(By.css(nativeElementParam));
        nElement = element.nativeElement;
    } else {
        nElement = nativeElementParam;
    }
    nElement.dispatchEvent(new MouseEvent('click'));
    tick();
    fixture.detectChanges();
    nElement.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();
}
export function mouseDown(fixture: ComponentFixture<any>, selector: string, numberElement: number = 0) {
    const element = numberElement === 0 ? fixture.debugElement.query(By.css(selector)) : fixture.debugElement.queryAll(By.css(selector))[numberElement];
    element.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
    fixture.detectChanges();
}
export function blur(fixture: ComponentFixture<any>, nativeElementParam: any | string) {
    let nElement: any;
    if (typeof nativeElementParam === 'string') {
        const element = fixture.debugElement.query(By.css(nativeElementParam));
        nElement = element.nativeElement;
    } else {
        nElement = nativeElementParam;
    }
    nElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
}
