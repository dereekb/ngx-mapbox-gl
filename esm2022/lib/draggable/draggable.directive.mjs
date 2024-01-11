import { Directive, EventEmitter, Host, Input, NgZone, Optional, Output, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { FeatureComponent } from '../source/geojson/feature.component';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "../source/geojson/feature.component";
class DraggableDirective {
    constructor(mapService, ngZone, featureComponent) {
        this.mapService = mapService;
        this.ngZone = ngZone;
        this.featureComponent = featureComponent;
        this.featureDragStart = new EventEmitter();
        this.featureDragEnd = new EventEmitter();
        this.featureDrag = new EventEmitter();
        /**
         * @deprecated Use featureDragStart instead
         */
        this.dragStart = new EventEmitter();
        /**
         * @deprecated Use featureDragEnd instead
         */
        this.dragEnd = new EventEmitter();
        /**
         * @deprecated Use featureDrag instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.drag = new EventEmitter();
        this.sub = new Subscription();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        let enter$;
        let leave$;
        let updateCoords;
        if (this.featureComponent && this.layer) {
            enter$ = this.layer.layerMouseEnter;
            leave$ = this.layer.layerMouseLeave;
            updateCoords = this.featureComponent.updateCoordinates.bind(this.featureComponent);
            if (this.featureComponent.geometry.type !== 'Point') {
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
                if (this.featureDragStart.observed || this.dragStart.observed) {
                    this.ngZone.run(() => {
                        this.featureDragStart.emit(evt);
                        this.dragStart.emit(evt);
                    });
                }
            }));
            this.sub.add(dragging$.subscribe((evt) => {
                updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
                if (this.featureDrag.observed || this.drag.observed) {
                    this.ngZone.run(() => {
                        this.featureDrag.emit(evt);
                        this.drag.emit(evt);
                    });
                }
            }));
            this.sub.add(dragEnd$.subscribe((evt) => {
                moving = false;
                if (this.featureDragEnd.observed || this.dragEnd.observed) {
                    this.ngZone.run(() => {
                        this.featureDragEnd.emit(evt);
                        this.dragEnd.emit(evt);
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
        if (this.featureComponent && this.layer) {
            const feature = this.mapService.queryRenderedFeatures(evt.point, {
                layers: [this.layer.id],
                filter: [
                    'all',
                    ['==', '$type', 'Point'],
                    ['==', '$id', this.featureComponent.id],
                ],
            })[0];
            if (!feature) {
                return false;
            }
        }
        return true;
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, DraggableDirective.name);
        if (this.dragStart.observed) {
            dw('dragStart', 'featureDragStart');
        }
        if (this.dragEnd.observed) {
            dw('dragEnd', 'featureDragEnd');
        }
        if (this.drag.observed) {
            dw('drag', 'featureDrag');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: DraggableDirective, deps: [{ token: i1.MapService }, { token: i0.NgZone }, { token: i2.FeatureComponent, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: DraggableDirective, selector: "[mglDraggable]", inputs: { layer: ["mglDraggable", "layer"] }, outputs: { featureDragStart: "featureDragStart", featureDragEnd: "featureDragEnd", featureDrag: "featureDrag", dragStart: "dragStart", dragEnd: "dragEnd", drag: "drag" }, ngImport: i0 }); }
}
export { DraggableDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: DraggableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglDraggable]',
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i0.NgZone }, { type: i2.FeatureComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }]; }, propDecorators: { layer: [{
                type: Input,
                args: ['mglDraggable']
            }], featureDragStart: [{
                type: Output
            }], featureDragEnd: [{
                type: Output
            }], featureDrag: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], drag: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQUU5QyxNQUdhLGtCQUFrQjtJQXVCN0IsWUFDVSxVQUFzQixFQUN0QixNQUFjLEVBQ00sZ0JBQW1DO1FBRnZELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNNLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7UUF0QnZELHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ3JELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDbkQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMxRDs7V0FFRztRQUNPLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUN4RDs7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QkFBekIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBSUcsU0FBUztzQkFBbEIsTUFBTTtnQkFJRyxPQUFPO3NCQUFoQixNQUFNO2dCQUtHLElBQUk7c0JBQWIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBNb3VzZUV2ZW50IH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYXllckNvbXBvbmVudCB9IGZyb20gJy4uL2xheWVyL2xheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEZlYXR1cmVDb21wb25lbnQgfSBmcm9tICcuLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZXByZWNhdGlvbldhcm5pbmcgfSBmcm9tICcuLi91dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xEcmFnZ2FibGVdJyxcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ21nbERyYWdnYWJsZScpIGxheWVyPzogTGF5ZXJDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIGZlYXR1cmVEcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBmZWF0dXJlRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGZlYXR1cmVEcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGZlYXR1cmVEcmFnU3RhcnQgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBmZWF0dXJlRHJhZ0VuZCBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBmZWF0dXJlRHJhZyBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGZlYXR1cmVDb21wb25lbnQ/OiBGZWF0dXJlQ29tcG9uZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhcm5EZXByZWNhdGVkT3V0cHV0cygpO1xuICAgIGxldCBlbnRlciQ7XG4gICAgbGV0IGxlYXZlJDtcbiAgICBsZXQgdXBkYXRlQ29vcmRzO1xuICAgIGlmICh0aGlzLmZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgZW50ZXIkID0gdGhpcy5sYXllci5sYXllck1vdXNlRW50ZXI7XG4gICAgICBsZWF2ZSQgPSB0aGlzLmxheWVyLmxheWVyTW91c2VMZWF2ZTtcbiAgICAgIHVwZGF0ZUNvb3JkcyA9IHRoaXMuZmVhdHVyZUNvbXBvbmVudC51cGRhdGVDb29yZGluYXRlcy5iaW5kKFxuICAgICAgICB0aGlzLmZlYXR1cmVDb21wb25lbnRcbiAgICAgICk7XG4gICAgICBpZiAodGhpcy5mZWF0dXJlQ29tcG9uZW50Lmdlb21ldHJ5LnR5cGUgIT09ICdQb2ludCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2xEcmFnZ2FibGUgb25seSBzdXBwb3J0IHBvaW50IGZlYXR1cmUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnbWdsRHJhZ2dhYmxlIGNhbiBvbmx5IGJlIHVzZWQgb24gRmVhdHVyZSAod2l0aCBhIGxheWVyIGFzIGlucHV0KSBvciBNYXJrZXInXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRHJhZ2dhYmxlKGVudGVyJCwgbGVhdmUkLCB1cGRhdGVDb29yZHMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRHJhZ2dhYmxlKFxuICAgIGVudGVyJDogT2JzZXJ2YWJsZTxNYXBNb3VzZUV2ZW50PixcbiAgICBsZWF2ZSQ6IE9ic2VydmFibGU8TWFwTW91c2VFdmVudD4sXG4gICAgdXBkYXRlQ29vcmRzOiAoY29vcmQ6IG51bWJlcltdKSA9PiB2b2lkXG4gICkge1xuICAgIGxldCBtb3ZpbmcgPSBmYWxzZTtcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBtb3VzZVVwJCA9IGZyb21FdmVudDxNYXBNb3VzZUV2ZW50PihcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLFxuICAgICAgICAnbW91c2V1cCdcbiAgICAgICk7XG4gICAgICBjb25zdCBkcmFnU3RhcnQkID0gZW50ZXIkLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhbW92aW5nKSxcbiAgICAgICAgZmlsdGVyKChldnQpID0+IHRoaXMuZmlsdGVyRmVhdHVyZShldnQpKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMubWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJ21vdmUnKTtcbiAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRHJhZ1BhbihmYWxzZSk7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4oXG4gICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UsXG4gICAgICAgICAgICAnbW91c2Vkb3duJ1xuICAgICAgICAgICkucGlwZSh0YWtlVW50aWwobGVhdmUkKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRyYWdnaW5nJCA9IGRyYWdTdGFydCQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KFxuICAgICAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLFxuICAgICAgICAgICAgJ21vdXNlbW92ZSdcbiAgICAgICAgICApLnBpcGUodGFrZVVudGlsKG1vdXNlVXAkKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRyYWdFbmQkID0gZHJhZ1N0YXJ0JC5waXBlKHN3aXRjaE1hcCgoKSA9PiBtb3VzZVVwJC5waXBlKHRha2UoMSkpKSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoXG4gICAgICAgIGRyYWdTdGFydCQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgICBtb3ZpbmcgPSB0cnVlO1xuICAgICAgICAgIGlmICh0aGlzLmZlYXR1cmVEcmFnU3RhcnQub2JzZXJ2ZWQgfHwgdGhpcy5kcmFnU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZmVhdHVyZURyYWdTdGFydC5lbWl0KGV2dCk7XG4gICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0LmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICB0aGlzLnN1Yi5hZGQoXG4gICAgICAgIGRyYWdnaW5nJC5zdWJzY3JpYmUoKGV2dCkgPT4ge1xuICAgICAgICAgIHVwZGF0ZUNvb3JkcyhbZXZ0LmxuZ0xhdC5sbmcsIGV2dC5sbmdMYXQubGF0XSk7XG4gICAgICAgICAgaWYgKHRoaXMuZmVhdHVyZURyYWcub2JzZXJ2ZWQgfHwgdGhpcy5kcmFnLm9ic2VydmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmZlYXR1cmVEcmFnLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgICAgdGhpcy5kcmFnLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICB0aGlzLnN1Yi5hZGQoXG4gICAgICAgIGRyYWdFbmQkLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgICAgbW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHRoaXMuZmVhdHVyZURyYWdFbmQub2JzZXJ2ZWQgfHwgdGhpcy5kcmFnRW5kLm9ic2VydmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmZlYXR1cmVEcmFnRW5kLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgICAgdGhpcy5kcmFnRW5kLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWluc2lkZSkge1xuICAgICAgICAgICAgLy8gSXQncyBwb3NzaWJsZSB0byBkcmFnRW5kIG91dHNpZGUgdGhlIHRhcmdldCAoc21hbGwgaW5wdXQgbGFnKVxuICAgICAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignJyk7XG4gICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRHJhZ1Bhbih0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgdGhpcy5zdWIuYWRkKFxuICAgICAgICBsZWF2ZSRcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiAoaW5zaWRlID0gZmFsc2UpKSxcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiAhbW92aW5nKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4odHJ1ZSk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZpbHRlckZlYXR1cmUoZXZ0OiBNYXBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZmVhdHVyZUNvbXBvbmVudCAmJiB0aGlzLmxheWVyKSB7XG4gICAgICBjb25zdCBmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8YW55PiA9XG4gICAgICAgIHRoaXMubWFwU2VydmljZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMoZXZ0LnBvaW50LCB7XG4gICAgICAgICAgbGF5ZXJzOiBbdGhpcy5sYXllci5pZF0sXG4gICAgICAgICAgZmlsdGVyOiBbXG4gICAgICAgICAgICAnYWxsJyxcbiAgICAgICAgICAgIFsnPT0nLCAnJHR5cGUnLCAnUG9pbnQnXSxcbiAgICAgICAgICAgIFsnPT0nLCAnJGlkJywgdGhpcy5mZWF0dXJlQ29tcG9uZW50LmlkXSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVswXTtcbiAgICAgIGlmICghZmVhdHVyZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSB3YXJuRGVwcmVjYXRlZE91dHB1dHMoKSB7XG4gICAgY29uc3QgZHcgPSBkZXByZWNhdGlvbldhcm5pbmcuYmluZCh1bmRlZmluZWQsIERyYWdnYWJsZURpcmVjdGl2ZS5uYW1lKTtcbiAgICBpZiAodGhpcy5kcmFnU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdkcmFnU3RhcnQnLCAnZmVhdHVyZURyYWdTdGFydCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnRW5kLm9ic2VydmVkKSB7XG4gICAgICBkdygnZHJhZ0VuZCcsICdmZWF0dXJlRHJhZ0VuZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnLm9ic2VydmVkKSB7XG4gICAgICBkdygnZHJhZycsICdmZWF0dXJlRHJhZycpO1xuICAgIH1cbiAgfVxufVxuIl19