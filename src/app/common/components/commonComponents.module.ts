import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RibbonNoItemsComponent } from './ribbonNoItems/ribbonNoItems.component';
import { RibbonProgressBarComponent } from './ribbonProgressBar/ribbonProgressBar.component';
import { RibbonErrorComponent } from './ribbonError/ribbonError.component';
import { ActiveHeaderOfTableComponent } from './activeHeaderOfTable/activeHeaderOfTable.component';
import { ValidationMessagesComponent } from './validationMessages';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

const COMMON_COMPONENTS = [
    SearchComponent,
    RibbonNoItemsComponent,
    RibbonErrorComponent,
    RibbonProgressBarComponent,
    ActiveHeaderOfTableComponent,
    ValidationMessagesComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule],
    exports: [COMMON_COMPONENTS],
    declarations: [COMMON_COMPONENTS],
    providers: [],
    entryComponents: []
})
export class CommonComponentsModule {

}
