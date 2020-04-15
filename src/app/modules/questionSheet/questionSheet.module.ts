import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import {
    QuestionSheetPageComponent,
    ThanksPageComponent
} from './components/index';
import { QuestionSheetRoutingModule } from './questionSheetRouting.module';
import { QuestionSheetResourcesService } from './services';
import { ResponsiveModule } from 'ngx-responsive';
import { RESPONSIVE_CONFIG } from '@appConstants';


const COMPONENTS = [
    QuestionSheetPageComponent,
    ThanksPageComponent
];

@NgModule({
    imports: [
        SharedModule,
        ResponsiveModule.forRoot(RESPONSIVE_CONFIG),
        QuestionSheetRoutingModule
    ],
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: [
        QuestionSheetResourcesService
    ]
})

export class QuestionSheetModule {

}
