import 'reflect-metadata';
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormSubmissionPreviewModule } from './materials/forms/form-submission/form-submission.preview';
import { enableProdMode } from '@angular/core';
import { IN_PRODUCTION } from './toolkit.utils';

if (IN_PRODUCTION) {
    enableProdMode();
}

const platform = platformBrowserDynamic();

platform.bootstrapModule(FormSubmissionPreviewModule);
