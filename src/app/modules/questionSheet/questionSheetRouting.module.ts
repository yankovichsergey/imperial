import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { MainLayoutComponent } from '../../layout/components/mainLayout/mainLayout.component';
import { ThanksPageComponent } from './components/thanksPage';
import { QuestionSheetPageComponent } from './components/questionSheetPage';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
    {
        path: 'serv-okc',
        canActivate: [MsalGuard],
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: QuestionSheetPageComponent,
                data: {animation: 'QuestionSheetPage'}
            }
        ]
    },
    {
        path: 'thanks',
        canActivate: [MsalGuard],
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: ThanksPageComponent,
                data: {animation: 'ThanksPage'}
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class QuestionSheetRoutingModule {
}
