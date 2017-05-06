import 'reflect-metadata';
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormSubmissionPreviewModule } from './materials/forms/form-submission/form-submission.preview';

const platform = platformBrowserDynamic();

platform.bootstrapModule(FormSubmissionPreviewModule);
