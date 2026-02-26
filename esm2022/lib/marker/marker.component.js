import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewEncapsulation, inject, input, viewChild, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class MarkerComponent {
    mapService = inject(MapService);
    /* Init input */
    offset = input(...(ngDevMode ? [undefined, { debugName: "offset" }] : []));
    anchor = input(...(ngDevMode ? [undefined, { debugName: "anchor" }] : []));
    clickTolerance = input(...(ngDevMode ? [undefined, { debugName: "clickTolerance" }] : []));
    /* Dynamic input */
    feature = input(...(ngDevMode ? [undefined, { debugName: "feature" }] : []));
    lngLat = input(...(ngDevMode ? [undefined, { debugName: "lngLat" }] : []));
    draggable = input(...(ngDevMode ? [undefined, { debugName: "draggable" }] : []));
    popupShown = input(...(ngDevMode ? [undefined, { debugName: "popupShown" }] : []));
    className = input(...(ngDevMode ? [undefined, { debugName: "className" }] : []));
    zIndex = input(...(ngDevMode ? [undefined, { debugName: "zIndex" }] : []));
    pitchAlignment = input(...(ngDevMode ? [undefined, { debugName: "pitchAlignment" }] : []));
    rotationAlignment = input(...(ngDevMode ? [undefined, { debugName: "rotationAlignment" }] : []));
    markerDragStart = new EventEmitter();
    markerDragEnd = new EventEmitter();
    markerDrag = new EventEmitter();
    content = viewChild('content', { ...(ngDevMode ? { debugName: "content" } : {}), read: ElementRef });
    markerInstance;
    ngOnInit() {
        if (this.feature() && this.lngLat()) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if (changes['lngLat'] && !changes['lngLat'].isFirstChange()) {
            this.markerInstance.setLngLat(this.lngLat());
        }
        if (changes['feature'] && !changes['feature'].isFirstChange()) {
            this.markerInstance.setLngLat(this.feature().geometry.coordinates);
        }
        if (changes['draggable'] && !changes['draggable'].isFirstChange()) {
            this.markerInstance.setDraggable(!!this.draggable());
        }
        if (changes['popupShown'] && !changes['popupShown'].isFirstChange()) {
            changes['popupShown'].currentValue
                ? this.markerInstance.getPopup()?.addTo(this.mapService.mapInstance)
                : this.markerInstance.getPopup()?.remove();
        }
        if (changes['pitchAlignment'] &&
            !changes['pitchAlignment'].isFirstChange()) {
            this.markerInstance.setPitchAlignment(changes['pitchAlignment'].currentValue);
        }
        if (changes['rotationAlignment'] &&
            !changes['rotationAlignment'].isFirstChange()) {
            this.markerInstance.setRotationAlignment(changes['rotationAlignment'].currentValue);
        }
    }
    ngAfterViewInit() {
        this.mapService.mapCreated$.subscribe(() => {
            this.markerInstance = this.mapService.addMarker({
                markersOptions: {
                    offset: this.offset(),
                    anchor: this.anchor(),
                    pitchAlignment: this.pitchAlignment(),
                    rotationAlignment: this.rotationAlignment(),
                    draggable: this.draggable(),
                    element: this.content()?.nativeElement,
                    feature: this.feature(),
                    lngLat: this.lngLat(),
                    clickTolerance: this.clickTolerance(),
                },
                markersEvents: {
                    markerDragStart: this.markerDragStart,
                    markerDrag: this.markerDrag,
                    markerDragEnd: this.markerDragEnd,
                },
            });
        });
    }
    ngOnDestroy() {
        this.mapService.removeMarker(this.markerInstance);
        this.markerInstance = undefined;
    }
    togglePopup() {
        this.markerInstance.togglePopup();
    }
    updateCoordinates(coordinates) {
        this.markerInstance.setLngLat(coordinates);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MarkerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "21.1.1", type: MarkerComponent, isStandalone: true, selector: "mgl-marker", inputs: { offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, clickTolerance: { classPropertyName: "clickTolerance", publicName: "clickTolerance", isSignal: true, isRequired: false, transformFunction: null }, feature: { classPropertyName: "feature", publicName: "feature", isSignal: true, isRequired: false, transformFunction: null }, lngLat: { classPropertyName: "lngLat", publicName: "lngLat", isSignal: true, isRequired: false, transformFunction: null }, draggable: { classPropertyName: "draggable", publicName: "draggable", isSignal: true, isRequired: false, transformFunction: null }, popupShown: { classPropertyName: "popupShown", publicName: "popupShown", isSignal: true, isRequired: false, transformFunction: null }, className: { classPropertyName: "className", publicName: "className", isSignal: true, isRequired: false, transformFunction: null }, zIndex: { classPropertyName: "zIndex", publicName: "zIndex", isSignal: true, isRequired: false, transformFunction: null }, pitchAlignment: { classPropertyName: "pitchAlignment", publicName: "pitchAlignment", isSignal: true, isRequired: false, transformFunction: null }, rotationAlignment: { classPropertyName: "rotationAlignment", publicName: "rotationAlignment", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { markerDragStart: "markerDragStart", markerDragEnd: "markerDragEnd", markerDrag: "markerDrag" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, read: ElementRef, isSignal: true }], usesOnChanges: true, ngImport: i0, template: `
    <div [class]="className()" [style.z-index]="zIndex()" #content>
      <ng-content />
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MarkerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-marker',
                    template: `
    <div [class]="className()" [style.z-index]="zIndex()" #content>
      <ng-content />
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { offset: [{ type: i0.Input, args: [{ isSignal: true, alias: "offset", required: false }] }], anchor: [{ type: i0.Input, args: [{ isSignal: true, alias: "anchor", required: false }] }], clickTolerance: [{ type: i0.Input, args: [{ isSignal: true, alias: "clickTolerance", required: false }] }], feature: [{ type: i0.Input, args: [{ isSignal: true, alias: "feature", required: false }] }], lngLat: [{ type: i0.Input, args: [{ isSignal: true, alias: "lngLat", required: false }] }], draggable: [{ type: i0.Input, args: [{ isSignal: true, alias: "draggable", required: false }] }], popupShown: [{ type: i0.Input, args: [{ isSignal: true, alias: "popupShown", required: false }] }], className: [{ type: i0.Input, args: [{ isSignal: true, alias: "className", required: false }] }], zIndex: [{ type: i0.Input, args: [{ isSignal: true, alias: "zIndex", required: false }] }], pitchAlignment: [{ type: i0.Input, args: [{ isSignal: true, alias: "pitchAlignment", required: false }] }], rotationAlignment: [{ type: i0.Input, args: [{ isSignal: true, alias: "rotationAlignment", required: false }] }], markerDragStart: [{
                type: Output
            }], markerDragEnd: [{
                type: Output
            }], markerDrag: [{
                type: Output
            }], content: [{ type: i0.ViewChild, args: ['content', { ...{ read: ElementRef }, isSignal: true }] }] } });
//# sourceMappingURL=marker.component.js.map