import { Component, Inject, NgModule } from '@angular/core';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { PreviewModule } from '../../../toolkit.utils';

@Component({
    selector: 'tk-form-submission-preview',
    template: `<h4>FORM SUBMISSION 2 PREVIEW</h4>`
})
export class FormSubmissionPreviewComponent {

}

@NgModule({
    entryComponents: [
        FormSubmissionPreviewComponent
    ],
    declarations: [
        FormSubmissionPreviewComponent
    ],
    imports: [
        BrowserModule
    ]
})
export class FormSubmissionPreviewModule extends PreviewModule {

    constructor(@Inject(DOCUMENT) document: any) {
        super(document, FormSubmissionPreviewComponent);
    }
}
