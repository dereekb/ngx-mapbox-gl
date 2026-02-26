import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class CanvasSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : []));
    /* Dynamic inputs */
    coordinates = input.required(...(ngDevMode ? [{ debugName: "coordinates" }] : []));
    canvas = input.required(...(ngDevMode ? [{ debugName: "canvas" }] : []));
    animate = input(...(ngDevMode ? [undefined, { debugName: "animate" }] : []));
    sourceAdded = false;
    sub = new Subscription();
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if ((changes['canvas'] && !changes['canvas'].isFirstChange()) ||
            (changes['animate'] && !changes['animate'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if (changes['coordinates'] &&
            !changes['coordinates'].isFirstChange()) {
            const source = this.mapService.getSource(this.id());
            if (source === undefined) {
                return;
            }
            source.setCoordinates(this.coordinates());
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id());
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: 'canvas',
            coordinates: this.coordinates(),
            canvas: this.canvas(),
            animate: this.animate(),
        };
        this.mapService.addSource(this.id(), source);
        this.sourceAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: CanvasSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: CanvasSourceComponent, isStandalone: true, selector: "mgl-canvas-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, coordinates: { classPropertyName: "coordinates", publicName: "coordinates", isSignal: true, isRequired: true, transformFunction: null }, canvas: { classPropertyName: "canvas", publicName: "canvas", isSignal: true, isRequired: true, transformFunction: null }, animate: { classPropertyName: "animate", publicName: "animate", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: CanvasSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-canvas-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], coordinates: [{ type: i0.Input, args: [{ isSignal: true, alias: "coordinates", required: true }] }], canvas: [{ type: i0.Input, args: [{ isSignal: true, alias: "canvas", required: true }] }], animate: [{ type: i0.Input, args: [{ isSignal: true, alias: "animate", required: false }] }] } });
//# sourceMappingURL=canvas-source.component.js.map