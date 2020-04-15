import {
    NgModule
} from '@angular/core';
import {
    RouterModule
} from '@angular/router';
import {
    BreadCrumbsComponent,
    HeaderComponent,
    BodyComponent,
    MainLayoutComponent} from './components';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
    BreadCrumbsComponent,
    HeaderComponent,
    BodyComponent,
    MainLayoutComponent
];

@NgModule({
    imports: [
        RouterModule,
        CommonModule],
    exports: [COMPONENTS],
    declarations: [COMPONENTS]
})
export class LayoutModule {

}
