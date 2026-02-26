import { Directive, inject, input } from '@angular/core';
import { AttributionControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class AttributionControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    compact = input(...(ngDevMode ? [undefined, { debugName: "compact" }] : []));
    customAttribution = input(...(ngDevMode ? [undefined, { debugName: "customAttribution" }] : []));
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            const compact = this.compact();
            const customAttribution = this.customAttribution();
            if (compact !== undefined) {
                options.compact = compact;
            }
            if (customAttribution !== undefined) {
                options.customAttribution = customAttribution;
            }
            this.controlComponent.control = new AttributionControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: AttributionControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.1.1", type: AttributionControlDirective, isStandalone: true, selector: "[mglAttribution]", inputs: { compact: { classPropertyName: "compact", publicName: "compact", isSignal: true, isRequired: false, transformFunction: null }, customAttribution: { classPropertyName: "customAttribution", publicName: "customAttribution", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: AttributionControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglAttribution]',
                }]
        }], propDecorators: { compact: [{ type: i0.Input, args: [{ isSignal: true, alias: "compact", required: false }] }], customAttribution: [{ type: i0.Input, args: [{ isSignal: true, alias: "customAttribution", required: false }] }] } });
//# sourceMappingURL=attribution-control.directive.js.map