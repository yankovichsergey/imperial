import {
  NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { QuestionSheetResourceConstants } from './modules/questionSheet/constants';

const routes: Routes = [
   { path: '',   redirectTo: QuestionSheetResourceConstants.SERV_OKC_ROUTE, pathMatch: 'full' },
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      ({
          preloadingStrategy: PreloadAllModules,
          enableTracing: false
      }))
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
