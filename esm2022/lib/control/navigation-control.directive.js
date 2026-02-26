import { Directive, inject, input } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class NavigationControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    showCompass = input(...(ngDevMode ? [undefined, { debugName: "showCompass" }] : []));
    showZoom = input(...(ngDevMode ? [undefined, { debugName: "showZoom" }] : []));
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            const showCompass = this.showCompass();
            const showZoom = this.showZoom();
            if (showCompass !== undefined) {
                options.showCompass = showCompass;
            }
            if (showZoom !== undefined) {
                options.showZoom = showZoom;
            }
            this.controlComponent.control = new NavigationControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: NavigationControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.1.1", type: NavigationControlDirective, isStandalone: true, selector: "[mglNavigation]", inputs: { showCompass: { classPropertyName: "showCompass", publicName: "showCompass", isSignal: true, isRequired: false, transformFunction: null }, showZoom: { classPropertyName: "showZoom", publicName: "showZoom", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: NavigationControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglNavigation]',
                }]
        }], propDecorators: { showCompass: [{ type: i0.Input, args: [{ isSignal: true, alias: "showCompass", required: false }] }], showZoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "showZoom", required: false }] }] } });
//# sourceMappingURL=navigation-control.directive.js.map