import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication/authentication.module';
import { QuestionSheetModule } from './questionSheet/questionSheet.module';

const modules = [
    AuthenticationModule,
    QuestionSheetModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class ApplicationModule { }
