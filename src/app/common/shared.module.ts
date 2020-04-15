import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from './components/commonComponents.module';
import {
    NkDateDropperModule,
    NkSelectModule,
    NkRibbonModule,
    NkRippleModule,
    NkPseudoCheckboxModule
} from '@nkControls';
import 'src/app/common/extensions/httpParams.extension';
import {
    ResourceTemplatesService,
    PopupsDialogService
} from './services';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FileUploadModule } from 'ng2-file-upload';

const COMMON_MODULES = [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommonComponentsModule,
    NkDateDropperModule,
    NkRibbonModule,
    NkSelectModule,
    NkPseudoCheckboxModule,
    NkRippleModule,
    MatCheckboxModule,
    MatRadioModule,
    FileUploadModule
];

@NgModule({
    imports: [COMMON_MODULES],
    exports: [COMMON_MODULES],
    declarations: [],
    providers: [
        ResourceTemplatesService,
        PopupsDialogService
    ]
})
export class SharedModule {

}
