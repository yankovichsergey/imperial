import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { SpyLocation } from '@angular/common/testing';
import { ComponentFixture } from '@angular/core/testing';
import {
    Location
} from '@angular/common';

export class RoutesHelper {
    public static getRoutesWithEmptyComponent(routeCollection: string[]): Routes {
        const routes: Routes = [];
        routeCollection.forEach((route) => {
            routes.push(
                {
                    path: route,
                    component: EmptyComponent,

                }
            );
        });
        return routes;
    }

    public static expectPathToBe(fixture: ComponentFixture<any>, path: string): any {
        const injector = fixture.debugElement.injector;
        const location = injector.get(Location) as SpyLocation;
        return expect(location.path()).toEqual(path);
    }
}
@Component({
    template: ''
})
export class EmptyComponent {
}
