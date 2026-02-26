import { Directive, EventEmitter, NgZone, Output, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { FeatureComponent } from '../source/geojson/feature.component';
import * as i0 from "@angular/core";
export class DraggableDirective {
    mapService = inject(MapService);
    ngZone = inject(NgZone);
    featureComponent = inject(FeatureComponent, {
        optional: true,
        host: true,
    });
    layer = input(undefined, { ...(ngDevMode ? { debugName: "layer" } : {}), alias: 'mglDraggable' });
    featureDragStart = new EventEmitter();
    featureDragEnd = new EventEmitter();
    featureDrag = new EventEmitter();
    sub = new Subscription();
    ngOnInit() {
        let enter$;
        let leave$;
        let updateCoords;
        const layer = this.layer();
        if (this.featureComponent && layer) {
            enter$ = layer.layerMouseEnter;
            leave$ = layer.layerMouseLeave;
            updateCoords = this.featureComponent.updateCoordinates.bind(this.featureComponent);
            if (this.featureComponent.geometry().type !== 'Point') {
                throw new Error('mglDraggable only support point feature');
            }
        }
        else {
            throw new Error('mglDraggable can only be used on Feature (with a layer as input) or Marker');
        }
        this.handleDraggable(enter$, leave$, updateCoords);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    handleDraggable(enter$, leave$, updateCoords) {
        let moving = false;
        let inside = false;
        this.mapService.mapCreated$.subscribe(() => {
            const mouseUp$ = fromEvent(this.mapService.mapInstance, 'mouseup');
            const dragStart$ = enter$.pipe(filter(() => !moving), filter((evt) => this.filterFeature(evt)), tap(() => {
                inside = true;
                this.mapService.changeCanvasCursor('move');
                this.mapService.updateDragPan(false);
            }), switchMap(() => fromEvent(this.mapService.mapInstance, 'mousedown').pipe(takeUntil(leave$))));
            const dragging$ = dragStart$.pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'mousemove').pipe(takeUntil(mouseUp$))));
            const dragEnd$ = dragStart$.pipe(switchMap(() => mouseUp$.pipe(take(1))));
            this.sub.add(dragStart$.subscribe((evt) => {
                moving = true;
                if (this.featureDragStart.observed) {
                    this.ngZone.run(() => {
                        this.featureDragStart.emit(evt);
                    });
                }
            }));
            this.sub.add(dragging$.subscribe((evt) => {
                updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
                if (this.featureDrag.observed) {
                    this.ngZone.run(() => {
                        this.featureDrag.emit(evt);
                    });
                }
            }));
            this.sub.add(dragEnd$.subscribe((evt) => {
                moving = false;
                if (this.featureDragEnd.observed) {
                    this.ngZone.run(() => {
                        this.featureDragEnd.emit(evt);
                    });
                }
                if (!inside) {
                    // It's possible to dragEnd outside the target (small input lag)
                    this.mapService.changeCanvasCursor('');
                    this.mapService.updateDragPan(true);
                }
            }));
            this.sub.add(leave$
                .pipe(tap(() => (inside = false)), filter(() => !moving))
                .subscribe(() => {
                this.mapService.changeCanvasCursor('');
                this.mapService.updateDragPan(true);
            }));
        });
    }
    filterFeature(evt) {
        const layer = this.layer();
        if (this.featureComponent && layer) {
            const feature = this.mapService.queryRenderedFeatures(evt.point, {
                layers: [layer.id()],
                filter: [
                    'all',
                    ['==', '$type', 'Point'],
                    ['==', '$id', this.featureComponent.id()],
                ],
            })[0];
            if (!feature) {
                return false;
            }
        }
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: DraggableDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.1.1", type: DraggableDirective, isStandalone: true, selector: "[mglDraggable]", inputs: { layer: { classPropertyName: "layer", publicName: "mglDraggable", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { featureDragStart: "featureDragStart", featureDragEnd: "featureDragEnd", featureDrag: "featureDrag" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: DraggableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglDraggable]',
                }]
        }], propDecorators: { layer: [{ type: i0.Input, args: [{ isSignal: true, alias: "mglDraggable", required: false }] }], featureDragStart: [{
                type: Output
            }], featureDragEnd: [{
                type: Output
            }], featureDrag: [{
                type: Output
            }] } });
//# sourceMappingURL=draggable.directive.js.map