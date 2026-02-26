import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild, inject, input, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class PopupComponent {
    mapService = inject(MapService);
    /* Init input */
    closeButton = input(...(ngDevMode ? [undefined, { debugName: "closeButton" }] : []));
    closeOnClick = input(...(ngDevMode ? [undefined, { debugName: "closeOnClick" }] : []));
    closeOnMove = input(...(ngDevMode ? [undefined, { debugName: "closeOnMove" }] : []));
    focusAfterOpen = input(...(ngDevMode ? [undefined, { debugName: "focusAfterOpen" }] : []));
    anchor = input(...(ngDevMode ? [undefined, { debugName: "anchor" }] : []));
    className = input(...(ngDevMode ? [undefined, { debugName: "className" }] : []));
    maxWidth = input(...(ngDevMode ? [undefined, { debugName: "maxWidth" }] : []));
    /* Dynamic input */
    feature = input(...(ngDevMode ? [undefined, { debugName: "feature" }] : []));
    lngLat = input(...(ngDevMode ? [undefined, { debugName: "lngLat" }] : []));
    marker = input(...(ngDevMode ? [undefined, { debugName: "marker" }] : []));
    offset = input(...(ngDevMode ? [undefined, { debugName: "offset" }] : []));
    popupClose = new EventEmitter();
    popupOpen = new EventEmitter();
    content;
    popupInstance;
    ngOnInit() {
        if ((this.lngLat() && this.marker()) ||
            (this.feature() && this.lngLat()) ||
            (this.feature() && this.marker())) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if ((changes['lngLat'] && !changes['lngLat'].isFirstChange()) ||
            (changes['feature'] && !changes['feature'].isFirstChange())) {
            const newlngLat = changes['lngLat']
                ? this.lngLat()
                : this.feature().geometry.coordinates;
            this.mapService.removePopupFromMap(this.popupInstance, true);
            const popupInstanceTmp = this.createPopup();
            this.mapService.addPopupToMap(popupInstanceTmp, newlngLat, this.popupInstance.isOpen());
            this.popupInstance = popupInstanceTmp;
        }
        if (changes['marker'] && !changes['marker'].isFirstChange()) {
            const previousMarker = changes['marker'].previousValue;
            if (previousMarker.markerInstance) {
                this.mapService.removePopupFromMarker(previousMarker.markerInstance);
            }
            if (this.marker() &&
                this.marker().markerInstance &&
                this.popupInstance) {
                this.mapService.addPopupToMarker(this.marker().markerInstance, this.popupInstance);
            }
        }
        if (changes['offset'] &&
            !changes['offset'].isFirstChange() &&
            this.popupInstance) {
            this.popupInstance.setOffset(this.offset());
        }
    }
    ngAfterViewInit() {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    }
    ngOnDestroy() {
        if (this.popupInstance) {
            if (this.lngLat() || this.feature()) {
                this.mapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker() && this.marker().markerInstance) {
                this.mapService.removePopupFromMarker(this.marker().markerInstance);
            }
        }
        this.popupInstance = undefined;
    }
    createPopup() {
        return this.mapService.createPopup({
            popupOptions: {
                closeButton: this.closeButton(),
                closeOnClick: this.closeOnClick(),
                closeOnMove: this.closeOnMove(),
                focusAfterOpen: this.focusAfterOpen(),
                anchor: this.anchor(),
                offset: this.offset(),
                className: this.className(),
                maxWidth: this.maxWidth(),
            },
            popupEvents: {
                popupOpen: this.popupOpen,
                popupClose: this.popupClose,
            },
        }, this.content.nativeElement);
    }
    addPopup(popup) {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.lngLat() || this.feature()) {
                this.mapService.addPopupToMap(popup, this.lngLat()
                    ? this.lngLat()
                    : this.feature().geometry.coordinates);
            }
            else if (this.marker() && this.marker().markerInstance) {
                this.mapService.addPopupToMarker(this.marker().markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: PopupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: PopupComponent, isStandalone: true, selector: "mgl-popup", inputs: { closeButton: { classPropertyName: "closeButton", publicName: "closeButton", isSignal: true, isRequired: false, transformFunction: null }, closeOnClick: { classPropertyName: "closeOnClick", publicName: "closeOnClick", isSignal: true, isRequired: false, transformFunction: null }, closeOnMove: { classPropertyName: "closeOnMove", publicName: "closeOnMove", isSignal: true, isRequired: false, transformFunction: null }, focusAfterOpen: { classPropertyName: "focusAfterOpen", publicName: "focusAfterOpen", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, className: { classPropertyName: "className", publicName: "className", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null }, feature: { classPropertyName: "feature", publicName: "feature", isSignal: true, isRequired: false, transformFunction: null }, lngLat: { classPropertyName: "lngLat", publicName: "lngLat", isSignal: true, isRequired: false, transformFunction: null }, marker: { classPropertyName: "marker", publicName: "marker", isSignal: true, isRequired: false, transformFunction: null }, offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { popupClose: "popupClose", popupOpen: "popupOpen" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #content><ng-content/></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: PopupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-popup',
                    template: '<div #content><ng-content/></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { closeButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeButton", required: false }] }], closeOnClick: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeOnClick", required: false }] }], closeOnMove: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeOnMove", required: false }] }], focusAfterOpen: [{ type: i0.Input, args: [{ isSignal: true, alias: "focusAfterOpen", required: false }] }], anchor: [{ type: i0.Input, args: [{ isSignal: true, alias: "anchor", required: false }] }], className: [{ type: i0.Input, args: [{ isSignal: true, alias: "className", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], feature: [{ type: i0.Input, args: [{ isSignal: true, alias: "feature", required: false }] }], lngLat: [{ type: i0.Input, args: [{ isSignal: true, alias: "lngLat", required: false }] }], marker: [{ type: i0.Input, args: [{ isSignal: true, alias: "marker", required: false }] }], offset: [{ type: i0.Input, args: [{ isSignal: true, alias: "offset", required: false }] }], popupClose: [{
                type: Output
            }], popupOpen: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=popup.component.js.map