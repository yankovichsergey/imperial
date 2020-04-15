import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Type, DebugElement } from '@angular/core';

export function nativeElement(fixture: ComponentFixture<any>, selector: string): any {
    const el = fixture.debugElement.query(By.css(selector));
    return el ? el.nativeElement : console.error('element not find ' + selector);
}
export function nativeElements(fixture: ComponentFixture<any>, selector: string): Array<any> {
    return fixture.debugElement.queryAll(By.css(selector)).map(it => it.nativeElement);
}
export function debugElement(fixture: ComponentFixture<any>, selector: string): any {
    return fixture.debugElement.query(By.css(selector));
}
export function debugElements(fixture: ComponentFixture<any>, selector: string): Array<any> {
    return fixture.debugElement.queryAll(By.css(selector)).map(it => it);
}
export function expectComponentOf(fixture: ComponentFixture<any>, type: Type<any>): DebugElement {
    const el = fixture.debugElement.query(By.directive(type));
    expect(el).toBeTruthy('expected an element for ' + type.name);
    return el;
}
export function getInjection(fixture: ComponentFixture<any>, type: Type<any>): any {
    return fixture.debugElement.injector.get(type);
}
