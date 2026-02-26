import { Directive, EventEmitter, Output, inject, input, } from '@angular/core';
import { GeolocateControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class GeolocateControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    positionOptions = input(...(ngDevMode ? [undefined, { debugName: "positionOptions" }] : []));
    fitBoundsOptions = input(...(ngDevMode ? [undefined, { debugName: "fitBoundsOptions" }] : []));
    trackUserLocation = input(...(ngDevMode ? [undefined, { debugName: "trackUserLocation" }] : []));
    showUserLocation = input(...(ngDevMode ? [undefined, { debugName: "showUserLocation" }] : []));
    showUserHeading = input(...(ngDevMode ? [undefined, { debugName: "showUserHeading" }] : []));
    geolocate = new EventEmitter();
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {
                positionOptions: this.positionOptions(),
                fitBoundsOptions: this.fitBoundsOptions(),
                trackUserLocation: this.trackUserLocation(),
                showUserLocation: this.showUserLocation(),
                showUserHeading: this.showUserHeading(),
            };
            Object.keys(options).forEach((key) => {
                const tkey = key;
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            this.controlComponent.control = new GeolocateControl(options);
            this.controlComponent.control.on('geolocate', (data) => {
                this.geolocate.emit(data);
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: GeolocateControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.1.1", type: GeolocateControlDirective, isStandalone: true, selector: "[mglGeolocate]", inputs: { positionOptions: { classPropertyName: "positionOptions", publicName: "positionOptions", isSignal: true, isRequired: false, transformFunction: null }, fitBoundsOptions: { classPropertyName: "fitBoundsOptions", publicName: "fitBoundsOptions", isSignal: true, isRequired: false, transformFunction: null }, trackUserLocation: { classPropertyName: "trackUserLocation", publicName: "trackUserLocation", isSignal: true, isRequired: false, transformFunction: null }, showUserLocation: { classPropertyName: "showUserLocation", publicName: "showUserLocation", isSignal: true, isRequired: false, transformFunction: null }, showUserHeading: { classPropertyName: "showUserHeading", publicName: "showUserHeading", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { geolocate: "geolocate" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: GeolocateControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglGeolocate]',
                }]
        }], propDecorators: { positionOptions: [{ type: i0.Input, args: [{ isSignal: true, alias: "positionOptions", required: false }] }], fitBoundsOptions: [{ type: i0.Input, args: [{ isSignal: true, alias: "fitBoundsOptions", required: false }] }], trackUserLocation: [{ type: i0.Input, args: [{ isSignal: true, alias: "trackUserLocation", required: false }] }], showUserLocation: [{ type: i0.Input, args: [{ isSignal: true, alias: "showUserLocation", required: false }] }], showUserHeading: [{ type: i0.Input, args: [{ isSignal: true, alias: "showUserHeading", required: false }] }], geolocate: [{
                type: Output
            }] } });
//# sourceMappingURL=geolocate-control.directive.js.map