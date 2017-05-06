import { ApplicationRef } from '@angular/core';
import { DashCase } from 'cerialize';

export abstract class PreviewModule {

    constructor(private _document: any,
                private _component: any) {
    }

    public ngDoBootstrap(app: ApplicationRef) {
        const selector = DashCase(`Tk${this._component.name.slice(0, -9)}`);
        const inDocument = !!this._document.getElementsByTagName(selector).length;

        if (inDocument) {
            app.bootstrap(this._component);
        }
    }
}
