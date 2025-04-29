import { Component, EventEmitter, Output, inject, input, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class LayerComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required();
    source = input();
    type = input.required();
    metadata = input();
    sourceLayer = input();
    /* Dynamic inputs */
    filter = input();
    layout = input();
    paint = input();
    before = input();
    minzoom = input();
    maxzoom = input();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LayerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: LayerComponent, isStandalone: true, selector: "mgl-layer", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, source: { classPropertyName: "source", publicName: "source", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: true, transformFunction: null }, metadata: { classPropertyName: "metadata", publicName: "metadata", isSignal: true, isRequired: false, transformFunction: null }, sourceLayer: { classPropertyName: "sourceLayer", publicName: "sourceLayer", isSignal: true, isRequired: false, transformFunction: null }, filter: { classPropertyName: "filter", publicName: "filter", isSignal: true, isRequired: false, transformFunction: null }, layout: { classPropertyName: "layout", publicName: "layout", isSignal: true, isRequired: false, transformFunction: null }, paint: { classPropertyName: "paint", publicName: "paint", isSignal: true, isRequired: false, transformFunction: null }, before: { classPropertyName: "before", publicName: "before", isSignal: true, isRequired: false, transformFunction: null }, minzoom: { classPropertyName: "minzoom", publicName: "minzoom", isSignal: true, isRequired: false, transformFunction: null }, maxzoom: { classPropertyName: "maxzoom", publicName: "maxzoom", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { layerClick: "layerClick", layerDblClick: "layerDblClick", layerMouseDown: "layerMouseDown", layerMouseUp: "layerMouseUp", layerMouseEnter: "layerMouseEnter", layerMouseLeave: "layerMouseLeave", layerMouseMove: "layerMouseMove", layerMouseOver: "layerMouseOver", layerMouseOut: "layerMouseOut", layerContextMenu: "layerContextMenu", layerTouchStart: "layerTouchStart", layerTouchEnd: "layerTouchEnd", layerTouchCancel: "layerTouchCancel" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LayerComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-layer',
                    template: '',
                }]
        }], propDecorators: { layerClick: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvbGF5ZXIvbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUlaLE1BQU0sRUFFTixNQUFNLEVBQ04sS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sb0JBQW9CLENBQUM7O0FBVTVELE1BQU0sT0FBTyxjQUFjO0lBR2pCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEMsaUJBQWlCO0lBQ2pCLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFlLENBQUM7SUFDbkMsTUFBTSxHQUFHLEtBQUssRUFBa0IsQ0FBQztJQUNqQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBaUIsQ0FBQztJQUN2QyxRQUFRLEdBQUcsS0FBSyxFQUFxQixDQUFDO0lBQ3RDLFdBQVcsR0FBRyxLQUFLLEVBQXlCLENBQUM7SUFFN0Msb0JBQW9CO0lBQ3BCLE1BQU0sR0FBRyxLQUFLLEVBQW1CLENBQUM7SUFDbEMsTUFBTSxHQUFHLEtBQUssRUFBbUIsQ0FBQztJQUNsQyxLQUFLLEdBQUcsS0FBSyxFQUFrQixDQUFDO0lBQ2hDLE1BQU0sR0FBRyxLQUFLLEVBQW1DLENBQUM7SUFDbEQsT0FBTyxHQUFHLEtBQUssRUFBb0IsQ0FBQztJQUNwQyxPQUFPLEdBQUcsS0FBSyxFQUFvQixDQUFDO0lBRTFCLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJ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ZTtzQkFBeEIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csZ0JBQWdCO3NCQUF6QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgaW5qZWN0LFxuICBpbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7XG4gIExheWVyLFxuICBNYXBNb3VzZUV2ZW50LFxuICBNYXBUb3VjaEV2ZW50LFxuICBNYXAsXG4gIFNvdXJjZVNwZWNpZmljYXRpb24sXG4gIExheWVyU3BlY2lmaWNhdGlvbixcbn0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlLCBTZXR1cExheWVyIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IExheWVyRXZlbnRzIH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XG5cbnR5cGUgQW55TGF5ZXJTb3VyY2UgPSBMYXllclNwZWNpZmljYXRpb25bJ3NvdXJjZSddIHwgU291cmNlU3BlY2lmaWNhdGlvbjtcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnbWdsLWxheWVyJyxcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXllckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIExheWVyRXZlbnRzXG57XG4gIHByaXZhdGUgbWFwU2VydmljZSA9IGluamVjdChNYXBTZXJ2aWNlKTtcblxuICAvKiBJbml0IGlucHV0cyAqL1xuICBpZCA9IGlucHV0LnJlcXVpcmVkPExheWVyWydpZCddPigpO1xuICBzb3VyY2UgPSBpbnB1dDxBbnlMYXllclNvdXJjZT4oKTtcbiAgdHlwZSA9IGlucHV0LnJlcXVpcmVkPExheWVyWyd0eXBlJ10+KCk7XG4gIG1ldGFkYXRhID0gaW5wdXQ8TGF5ZXJbJ21ldGFkYXRhJ10+KCk7XG4gIHNvdXJjZUxheWVyID0gaW5wdXQ8TGF5ZXJbJ3NvdXJjZS1sYXllciddPigpO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIGZpbHRlciA9IGlucHV0PExheWVyWydmaWx0ZXInXT4oKTtcbiAgbGF5b3V0ID0gaW5wdXQ8TGF5ZXJbJ2xheW91dCddPigpO1xuICBwYWludCA9IGlucHV0PExheWVyWydwYWludCddPigpO1xuICBiZWZvcmUgPSBpbnB1dDxQYXJhbWV0ZXJzPE1hcFsnbW92ZUxheWVyJ10+WzFdPigpO1xuICBtaW56b29tID0gaW5wdXQ8TGF5ZXJbJ21pbnpvb20nXT4oKTtcbiAgbWF4em9vbSA9IGlucHV0PExheWVyWydtYXh6b29tJ10+KCk7XG5cbiAgQE91dHB1dCgpIGxheWVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBsYXllckRibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbGF5ZXJNb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBsYXllck1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBsYXllck1vdXNlRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBsYXllck1vdXNlTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBsYXllck1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGxheWVyTW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbGF5ZXJNb3VzZU91dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGxheWVyQ29udGV4dE1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBsYXllclRvdWNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBsYXllclRvdWNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgbGF5ZXJUb3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcblxuICBwcml2YXRlIGxheWVyQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YiA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4gZmFsc2UpLFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0TGF5ZXIodGhpcy5pZCgpKSksXG4gICAgICAgICAgICBzdGFydFdpdGgodHJ1ZSksXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGJpbmRFdmVudHM6IGJvb2xlYW4pID0+IHRoaXMuaW5pdChiaW5kRXZlbnRzKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmxheWVyQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3BhaW50J10gJiYgIWNoYW5nZXNbJ3BhaW50J10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2Uuc2V0TGF5ZXJBbGxQYWludFByb3BlcnR5KFxuICAgICAgICB0aGlzLmlkKCksXG4gICAgICAgIGNoYW5nZXNbJ3BhaW50J10uY3VycmVudFZhbHVlISxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydsYXlvdXQnXSAmJiAhY2hhbmdlc1snbGF5b3V0J10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2Uuc2V0TGF5ZXJBbGxMYXlvdXRQcm9wZXJ0eShcbiAgICAgICAgdGhpcy5pZCgpLFxuICAgICAgICBjaGFuZ2VzWydsYXlvdXQnXS5jdXJyZW50VmFsdWUhLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2ZpbHRlciddICYmICFjaGFuZ2VzWydmaWx0ZXInXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5zZXRMYXllckZpbHRlcihcbiAgICAgICAgdGhpcy5pZCgpLFxuICAgICAgICBjaGFuZ2VzWydmaWx0ZXInXS5jdXJyZW50VmFsdWUhLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2JlZm9yZSddICYmICFjaGFuZ2VzWydiZWZvcmUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5zZXRMYXllckJlZm9yZShcbiAgICAgICAgdGhpcy5pZCgpLFxuICAgICAgICBjaGFuZ2VzWydiZWZvcmUnXS5jdXJyZW50VmFsdWUhLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGNoYW5nZXNbJ21pbnpvb20nXSAmJiAhY2hhbmdlc1snbWluem9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydtYXh6b29tJ10gJiYgIWNoYW5nZXNbJ21heHpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2Uuc2V0TGF5ZXJab29tUmFuZ2UoXG4gICAgICAgIHRoaXMuaWQoKSxcbiAgICAgICAgdGhpcy5taW56b29tKCksXG4gICAgICAgIHRoaXMubWF4em9vbSgpLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5sYXllckFkZGVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlTGF5ZXIodGhpcy5pZCgpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3ViKSB7XG4gICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdChiaW5kRXZlbnRzOiBib29sZWFuKSB7XG4gICAgY29uc3QgbGF5ZXI6IFNldHVwTGF5ZXIgPSB7XG4gICAgICBsYXllck9wdGlvbnM6IHtcbiAgICAgICAgaWQ6IHRoaXMuaWQoKSxcbiAgICAgICAgdHlwZTogdGhpcy50eXBlKCksXG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UoKSxcbiAgICAgICAgbWV0YWRhdGE6IHRoaXMubWV0YWRhdGEoKSxcbiAgICAgICAgJ3NvdXJjZS1sYXllcic6IHRoaXMuc291cmNlTGF5ZXIoKSxcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tKCksXG4gICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSgpLFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyKCksXG4gICAgICAgIGxheW91dDogdGhpcy5sYXlvdXQoKSxcbiAgICAgICAgcGFpbnQ6IHRoaXMucGFpbnQoKSxcbiAgICAgIH0sXG4gICAgICBsYXllckV2ZW50czoge1xuICAgICAgICBsYXllckNsaWNrOiB0aGlzLmxheWVyQ2xpY2ssXG4gICAgICAgIGxheWVyRGJsQ2xpY2s6IHRoaXMubGF5ZXJEYmxDbGljayxcbiAgICAgICAgbGF5ZXJNb3VzZURvd246IHRoaXMubGF5ZXJNb3VzZURvd24sXG4gICAgICAgIGxheWVyTW91c2VVcDogdGhpcy5sYXllck1vdXNlVXAsXG4gICAgICAgIGxheWVyTW91c2VFbnRlcjogdGhpcy5sYXllck1vdXNlRW50ZXIsXG4gICAgICAgIGxheWVyTW91c2VMZWF2ZTogdGhpcy5sYXllck1vdXNlTGVhdmUsXG4gICAgICAgIGxheWVyTW91c2VNb3ZlOiB0aGlzLmxheWVyTW91c2VNb3ZlLFxuICAgICAgICBsYXllck1vdXNlT3ZlcjogdGhpcy5sYXllck1vdXNlT3ZlcixcbiAgICAgICAgbGF5ZXJNb3VzZU91dDogdGhpcy5sYXllck1vdXNlT3V0LFxuICAgICAgICBsYXllckNvbnRleHRNZW51OiB0aGlzLmxheWVyQ29udGV4dE1lbnUsXG4gICAgICAgIGxheWVyVG91Y2hTdGFydDogdGhpcy5sYXllclRvdWNoU3RhcnQsXG4gICAgICAgIGxheWVyVG91Y2hFbmQ6IHRoaXMubGF5ZXJUb3VjaEVuZCxcbiAgICAgICAgbGF5ZXJUb3VjaENhbmNlbDogdGhpcy5sYXllclRvdWNoQ2FuY2VsLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMubWFwU2VydmljZS5hZGRMYXllcihsYXllciwgYmluZEV2ZW50cywgdGhpcy5iZWZvcmUoKSk7XG4gICAgdGhpcy5sYXllckFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIl19