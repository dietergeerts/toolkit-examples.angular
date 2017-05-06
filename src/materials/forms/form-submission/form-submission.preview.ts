import { Component, Inject, NgModule } from '@angular/core';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { OptionalBootstrapModule } from '../../../toolkit.utils';

@Component({
    selector: 'tk-form-submission-preview',
    templateUrl: './form-submission.preview.html'
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
export class FormSubmissionPreviewModule extends OptionalBootstrapModule {

    constructor(@Inject(DOCUMENT) document: any) {
        super(document, FormSubmissionPreviewComponent);
    }
}
