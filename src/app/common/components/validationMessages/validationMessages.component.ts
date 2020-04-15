import {
    Component,
    Input
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import {
    FADE_IN_CONTENT_BY_HEIGHT_OPACITY } from '@appConstants';

@Component({
    selector: 'validation-messages',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './validationMessages.component.html',
    styleUrls: [
        './validationMessages.component.scss'
    ],
    animations: [
        FADE_IN_CONTENT_BY_HEIGHT_OPACITY ]
})
export class ValidationMessagesComponent {
    @Input() public control: AbstractControl;

    @Input() public required: string;
    @Input() public maxLength: string;
    @Input() public minLength: string;
    @Input() public pattern: string;
    @Input() public equalValues: string;
    @Input() public dateTimeInvalid: string;
    @Input() public max: string;
    @Input() public other: string;
}
