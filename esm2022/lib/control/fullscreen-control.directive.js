import { Directive, HostListener, inject, input, } from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class FullscreenControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    container = input(...(ngDevMode ? [undefined, { debugName: "container" }] : []));
    onFullscreen(event) {
        this.mapService.mapInstance.resize();
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            this.controlComponent.control = new FullscreenControl({
                container: this.container(),
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: FullscreenControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.1.1", type: FullscreenControlDirective, isStandalone: true, selector: "[mglFullscreen]", inputs: { container: { classPropertyName: "container", publicName: "container", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "window:webkitfullscreenchange": "onFullscreen($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: FullscreenControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglFullscreen]',
                }]
        }], propDecorators: { container: [{ type: i0.Input, args: [{ isSignal: true, alias: "container", required: false }] }], onFullscreen: [{
                type: HostListener,
                args: ['window:webkitfullscreenchange', ['$event']]
            }] } });
//# sourceMappingURL=fullscreen-control.directive.js.map