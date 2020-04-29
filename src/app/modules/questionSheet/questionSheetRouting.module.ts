import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { MainLayoutComponent } from '../../layout/components/mainLayout/mainLayout.component';
import { ThanksPageComponent } from './components/thanksPage';
import { QuestionSheetPageComponent } from './components/questionSheetPage';
import { AuthGuard } from '../authentication/guards';

const routes: Routes = [
    {
        path: 'serv-okc',
        canActivate: [AuthGuard],
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: QuestionSheetPageComponent,
                data: {animation: 'QuestionSheetPage'}
            },
            {
                path: 'thanks',
                children: [
                    {
                        path: '',
                        component: ThanksPageComponent,
                        data: {animation: 'ThanksPage'}
                    }
                ]
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
