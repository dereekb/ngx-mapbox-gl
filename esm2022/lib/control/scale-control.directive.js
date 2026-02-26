import { Directive, inject, input, } from '@angular/core';
import { ScaleControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class ScaleControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    maxWidth = input(...(ngDevMode ? [undefined, { debugName: "maxWidth" }] : []));
    /* Dynamic inputs */
    unit = input(...(ngDevMode ? [undefined, { debugName: "unit" }] : []));
    ngOnChanges(changes) {
        if (changes['unit'] && !changes['unit'].isFirstChange()) {
            this.controlComponent.control.setUnit(changes['unit'].currentValue);
        }
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            const maxWidth = this.maxWidth();
            const unit = this.unit();
            if (maxWidth !== undefined) {
                options.maxWidth = maxWidth;
            }
            if (unit !== undefined) {
                options.unit = unit;
            }
            this.controlComponent.control = new ScaleControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ScaleControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.1.1", type: ScaleControlDirective, isStandalone: true, selector: "[mglScale]", inputs: { maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null }, unit: { classPropertyName: "unit", publicName: "unit", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ScaleControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglScale]',
                }]
        }], propDecorators: { maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], unit: [{ type: i0.Input, args: [{ isSignal: true, alias: "unit", required: false }] }] } });
//# sourceMappingURL=scale-control.directive.js.map