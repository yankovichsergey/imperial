import {
    NgModule
} from '@angular/core';
import {
    Routes,
    RouterModule,
    PreloadAllModules
} from '@angular/router';
import { QuestionSheetResourceConstants } from './modules/questionSheet/constants';

const routes: Routes = [
    {path: '', redirectTo: QuestionSheetResourceConstants.HOME_PAGE_ROUTE, pathMatch: 'full'},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            ({
                useHash: false,
                preloadingStrategy: PreloadAllModules,
                enableTracing: false
            }))
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
