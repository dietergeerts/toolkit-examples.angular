import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";

@Component({
    selector: 'tk-form-submission-preview',
    template: `<h4>FORM SUBMISSION PREVIEW</h4>`
})
export class FormSubmissionPreviewComponent {

}

@NgModule({
    bootstrap: [
        FormSubmissionPreviewComponent
    ],
    declarations: [
        FormSubmissionPreviewComponent
    ],
    imports: [
        BrowserModule
    ]
})
export class FormSubmissionPreviewModule {

}

platformBrowserDynamic().bootstrapModule(FormSubmissionPreviewModule);
