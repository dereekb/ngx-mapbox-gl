import { Component, EventEmitter, Output, inject, input, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class LayerComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : []));
    source = input(...(ngDevMode ? [undefined, { debugName: "source" }] : []));
    type = input.required(...(ngDevMode ? [{ debugName: "type" }] : []));
    metadata = input(...(ngDevMode ? [undefined, { debugName: "metadata" }] : []));
    sourceLayer = input(...(ngDevMode ? [undefined, { debugName: "sourceLayer" }] : []));
    /* Dynamic inputs */
    filter = input(...(ngDevMode ? [undefined, { debugName: "filter" }] : []));
    layout = input(...(ngDevMode ? [undefined, { debugName: "layout" }] : []));
    paint = input(...(ngDevMode ? [undefined, { debugName: "paint" }] : []));
    before = input(...(ngDevMode ? [undefined, { debugName: "before" }] : []));
    minzoom = input(...(ngDevMode ? [undefined, { debugName: "minzoom" }] : []));
    maxzoom = input(...(ngDevMode ? [undefined, { debugName: "maxzoom" }] : []));
    layerClick = new EventEmitter();
    layerDblClick = new EventEmitter();
    layerMouseDown = new EventEmitter();
    layerMouseUp = new EventEmitter();
    layerMouseEnter = new EventEmitter();
    layerMouseLeave = new EventEmitter();
    layerMouseMove = new EventEmitter();
    layerMouseOver = new EventEmitter();
    layerMouseOut = new EventEmitter();
    layerContextMenu = new EventEmitter();
    layerTouchStart = new EventEmitter();
    layerTouchEnd = new EventEmitter();
    layerTouchCancel = new EventEmitter();
    layerAdded = false;
    sub;
    ngOnInit() {
        this.sub = this.mapService.mapLoaded$
            .pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'styledata').pipe(map(() => false), filter(() => !this.mapService.mapInstance.getLayer(this.id())), startWith(true))))
            .subscribe((bindEvents) => this.init(bindEvents));
    }
    ngOnChanges(changes) {
        if (!this.layerAdded) {
            return;
        }
        if (changes['paint'] && !changes['paint'].isFirstChange()) {
            this.mapService.setLayerAllPaintProperty(this.id(), changes['paint'].currentValue);
        }
        if (changes['layout'] && !changes['layout'].isFirstChange()) {
            this.mapService.setLayerAllLayoutProperty(this.id(), changes['layout'].currentValue);
        }
        if (changes['filter'] && !changes['filter'].isFirstChange()) {
            this.mapService.setLayerFilter(this.id(), changes['filter'].currentValue);
        }
        if (changes['before'] && !changes['before'].isFirstChange()) {
            this.mapService.setLayerBefore(this.id(), changes['before'].currentValue);
        }
        if ((changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange())) {
            this.mapService.setLayerZoomRange(this.id(), this.minzoom(), this.maxzoom());
        }
    }
    ngOnDestroy() {
        if (this.layerAdded) {
            this.mapService.removeLayer(this.id());
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    init(bindEvents) {
        const layer = {
            layerOptions: {
                id: this.id(),
                type: this.type(),
                source: this.source(),
                metadata: this.metadata(),
                'source-layer': this.sourceLayer(),
                minzoom: this.minzoom(),
                maxzoom: this.maxzoom(),
                filter: this.filter(),
                layout: this.layout(),
                paint: this.paint(),
            },
            layerEvents: {
                layerClick: this.layerClick,
                layerDblClick: this.layerDblClick,
                layerMouseDown: this.layerMouseDown,
                layerMouseUp: this.layerMouseUp,
                layerMouseEnter: this.layerMouseEnter,
                layerMouseLeave: this.layerMouseLeave,
                layerMouseMove: this.layerMouseMove,
                layerMouseOver: this.layerMouseOver,
                layerMouseOut: this.layerMouseOut,
                layerContextMenu: this.layerContextMenu,
                layerTouchStart: this.layerTouchStart,
                layerTouchEnd: this.layerTouchEnd,
                layerTouchCancel: this.layerTouchCancel,
            },
        };
        this.mapService.addLayer(layer, bindEvents, this.before());
        this.layerAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: LayerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: LayerComponent, isStandalone: true, selector: "mgl-layer", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, source: { classPropertyName: "source", publicName: "source", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: true, transformFunction: null }, metadata: { classPropertyName: "metadata", publicName: "metadata", isSignal: true, isRequired: false, transformFunction: null }, sourceLayer: { classPropertyName: "sourceLayer", publicName: "sourceLayer", isSignal: true, isRequired: false, transformFunction: null }, filter: { classPropertyName: "filter", publicName: "filter", isSignal: true, isRequired: false, transformFunction: null }, layout: { classPropertyName: "layout", publicName: "layout", isSignal: true, isRequired: false, transformFunction: null }, paint: { classPropertyName: "paint", publicName: "paint", isSignal: true, isRequired: false, transformFunction: null }, before: { classPropertyName: "before", publicName: "before", isSignal: true, isRequired: false, transformFunction: null }, minzoom: { classPropertyName: "minzoom", publicName: "minzoom", isSignal: true, isRequired: false, transformFunction: null }, maxzoom: { classPropertyName: "maxzoom", publicName: "maxzoom", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { layerClick: "layerClick", layerDblClick: "layerDblClick", layerMouseDown: "layerMouseDown", layerMouseUp: "layerMouseUp", layerMouseEnter: "layerMouseEnter", layerMouseLeave: "layerMouseLeave", layerMouseMove: "layerMouseMove", layerMouseOver: "layerMouseOver", layerMouseOut: "layerMouseOut", layerContextMenu: "layerContextMenu", layerTouchStart: "layerTouchStart", layerTouchEnd: "layerTouchEnd", layerTouchCancel: "layerTouchCancel" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: LayerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-layer',
                    template: '',
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], source: [{ type: i0.Input, args: [{ isSignal: true, alias: "source", required: false }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: true }] }], metadata: [{ type: i0.Input, args: [{ isSignal: true, alias: "metadata", required: false }] }], sourceLayer: [{ type: i0.Input, args: [{ isSignal: true, alias: "sourceLayer", required: false }] }], filter: [{ type: i0.Input, args: [{ isSignal: true, alias: "filter", required: false }] }], layout: [{ type: i0.Input, args: [{ isSignal: true, alias: "layout", required: false }] }], paint: [{ type: i0.Input, args: [{ isSignal: true, alias: "paint", required: false }] }], before: [{ type: i0.Input, args: [{ isSignal: true, alias: "before", required: false }] }], minzoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "minzoom", required: false }] }], maxzoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxzoom", required: false }] }], layerClick: [{
                type: Output
            }], layerDblClick: [{
                type: Output
            }], layerMouseDown: [{
                type: Output
            }], layerMouseUp: [{
                type: Output
            }], layerMouseEnter: [{
                type: Output
            }], layerMouseLeave: [{
                type: Output
            }], layerMouseMove: [{
                type: Output
            }], layerMouseOver: [{
                type: Output
            }], layerMouseOut: [{
                type: Output
            }], layerContextMenu: [{
                type: Output
            }], layerTouchStart: [{
                type: Output
            }], layerTouchEnd: [{
                type: Output
            }], layerTouchCancel: [{
                type: Output
            }] } });
//# sourceMappingURL=layer.component.js.map