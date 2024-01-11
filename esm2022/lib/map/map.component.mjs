import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { deprecationWarning } from '../utils';
import { MapService } from './map.service';
import * as i0 from "@angular/core";
import * as i1 from "./map.service";
class MapComponent {
    get mapInstance() {
        return this.mapService.mapInstance;
    }
    constructor(mapService) {
        this.mapService = mapService;
        /* Added by ngx-mapbox-gl */
        this.movingMethod = 'flyTo';
        this.mapResize = new EventEmitter();
        this.mapRemove = new EventEmitter();
        this.mapMouseDown = new EventEmitter();
        this.mapMouseUp = new EventEmitter();
        this.mapMouseMove = new EventEmitter();
        this.mapClick = new EventEmitter();
        this.mapDblClick = new EventEmitter();
        this.mapMouseOver = new EventEmitter();
        this.mapMouseOut = new EventEmitter();
        this.mapContextMenu = new EventEmitter();
        this.mapTouchStart = new EventEmitter();
        this.mapTouchEnd = new EventEmitter();
        this.mapTouchMove = new EventEmitter();
        this.mapTouchCancel = new EventEmitter();
        this.mapWheel = new EventEmitter();
        this.moveStart = new EventEmitter();
        this.move = new EventEmitter();
        this.moveEnd = new EventEmitter();
        this.mapDragStart = new EventEmitter();
        this.mapDrag = new EventEmitter();
        this.mapDragEnd = new EventEmitter();
        this.zoomStart = new EventEmitter();
        this.zoomEvt = new EventEmitter();
        this.zoomEnd = new EventEmitter();
        this.rotateStart = new EventEmitter();
        this.rotate = new EventEmitter();
        this.rotateEnd = new EventEmitter();
        this.pitchStart = new EventEmitter();
        this.pitchEvt = new EventEmitter();
        this.pitchEnd = new EventEmitter();
        this.boxZoomStart = new EventEmitter();
        this.boxZoomEnd = new EventEmitter();
        this.boxZoomCancel = new EventEmitter();
        this.webGlContextLost = new EventEmitter();
        this.webGlContextRestored = new EventEmitter();
        this.mapLoad = new EventEmitter();
        this.mapCreate = new EventEmitter();
        this.idle = new EventEmitter();
        this.render = new EventEmitter();
        this.mapError = new EventEmitter();
        this.data = new EventEmitter();
        this.styleData = new EventEmitter();
        this.sourceData = new EventEmitter();
        this.dataLoading = new EventEmitter();
        this.styleDataLoading = new EventEmitter();
        this.sourceDataLoading = new EventEmitter();
        this.styleImageMissing = new EventEmitter();
        /**
         * @deprecated Use mapResize instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.resize = new EventEmitter();
        /**
         * @deprecated Use mapRemove instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.remove = new EventEmitter();
        /**
         * @deprecated Use mapMouseDown instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseDown = new EventEmitter();
        /**
         * @deprecated Use mapMouseUp instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseUp = new EventEmitter();
        /**
         * @deprecated Use mapMouseMove instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseMove = new EventEmitter();
        /**
         * @deprecated Use mapClick instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.click = new EventEmitter();
        /**
         * @deprecated Use mapDblClick instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.dblClick = new EventEmitter();
        /**
         * @deprecated Use mapMouseOver instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseOver = new EventEmitter();
        /**
         * @deprecated Use mapMouseOut instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.mouseOut = new EventEmitter();
        /**
         * @deprecated Use mapContextMenu instead
         */
        this.contextMenu = new EventEmitter();
        /**
         * @deprecated Use mapTouchStart instead
         */
        this.touchStart = new EventEmitter();
        /**
         * @deprecated Use mapTouchEnd instead
         */
        this.touchEnd = new EventEmitter();
        /**
         * @deprecated Use mapTouchMove instead
         */
        this.touchMove = new EventEmitter();
        /**
         * @deprecated Use mapTouchCancel instead
         */
        this.touchCancel = new EventEmitter();
        /**
         * @deprecated Use mapWheel instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.wheel = new EventEmitter();
        /**
         * @deprecated Use mapDragStart instead
         */
        this.dragStart = new EventEmitter();
        /**
         * @deprecated Use mapDrag instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.drag = new EventEmitter();
        /**
         * @deprecated Use mapDragEnd instead
         */
        this.dragEnd = new EventEmitter();
        /**
         * @deprecated Use mapLoad instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.load = new EventEmitter();
        /**
         * @deprecated Use mapError instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.error = new EventEmitter();
    }
    ngAfterViewInit() {
        this.warnDeprecatedOutputs();
        this.mapService.setup({
            accessToken: this.accessToken,
            customMapboxApiUrl: this.customMapboxApiUrl,
            mapOptions: {
                collectResourceTiming: this.collectResourceTiming,
                container: this.mapContainer.nativeElement,
                crossSourceCollisions: this.crossSourceCollisions,
                fadeDuration: this.fadeDuration,
                minZoom: this.minZoom,
                maxZoom: this.maxZoom,
                minPitch: this.minPitch,
                maxPitch: this.maxPitch,
                style: this.style,
                hash: this.hash,
                interactive: this.interactive,
                bearingSnap: this.bearingSnap,
                pitchWithRotate: this.pitchWithRotate,
                clickTolerance: this.clickTolerance,
                attributionControl: this.attributionControl,
                logoPosition: this.logoPosition,
                failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
                preserveDrawingBuffer: this.preserveDrawingBuffer,
                refreshExpiredTiles: this.refreshExpiredTiles,
                maxBounds: this.maxBounds,
                scrollZoom: this.scrollZoom,
                boxZoom: this.boxZoom,
                dragRotate: this.dragRotate,
                dragPan: this.dragPan,
                keyboard: this.keyboard,
                doubleClickZoom: this.doubleClickZoom,
                touchPitch: this.touchPitch,
                touchZoomRotate: this.touchZoomRotate,
                trackResize: this.trackResize,
                center: this.center,
                zoom: this.zoom,
                bearing: this.bearing,
                pitch: this.pitch,
                renderWorldCopies: this.renderWorldCopies,
                maxTileCacheSize: this.maxTileCacheSize,
                localIdeographFontFamily: this.localIdeographFontFamily,
                transformRequest: this.transformRequest,
                bounds: this.bounds ? this.bounds : this.fitBounds,
                fitBoundsOptions: this.fitBoundsOptions,
                antialias: this.antialias,
                locale: this.locale,
                cooperativeGestures: this.cooperativeGestures,
                projection: this.projection,
            },
            mapEvents: this,
        });
        if (this.cursorStyle) {
            this.mapService.changeCanvasCursor(this.cursorStyle);
        }
    }
    ngOnDestroy() {
        this.mapService.destroyMap();
    }
    async ngOnChanges(changes) {
        await lastValueFrom(this.mapService.mapCreated$);
        if (changes['cursorStyle'] && !changes['cursorStyle'].isFirstChange()) {
            this.mapService.changeCanvasCursor(changes['cursorStyle'].currentValue);
        }
        if (changes['projection'] && !changes['projection'].isFirstChange()) {
            this.mapService.updateProjection(changes['projection'].currentValue);
        }
        if (changes['minZoom'] && !changes['minZoom'].isFirstChange()) {
            this.mapService.updateMinZoom(changes['minZoom'].currentValue);
        }
        if (changes['maxZoom'] && !changes['maxZoom'].isFirstChange()) {
            this.mapService.updateMaxZoom(changes['maxZoom'].currentValue);
        }
        if (changes['minPitch'] && !changes['minPitch'].isFirstChange()) {
            this.mapService.updateMinPitch(changes['minPitch'].currentValue);
        }
        if (changes['maxPitch'] && !changes['maxPitch'].isFirstChange()) {
            this.mapService.updateMaxPitch(changes['maxPitch'].currentValue);
        }
        if (changes['renderWorldCopies'] &&
            !changes['renderWorldCopies'].isFirstChange()) {
            this.mapService.updateRenderWorldCopies(changes['renderWorldCopies'].currentValue);
        }
        if (changes['scrollZoom'] && !changes['scrollZoom'].isFirstChange()) {
            this.mapService.updateScrollZoom(changes['scrollZoom'].currentValue);
        }
        if (changes['dragRotate'] && !changes['dragRotate'].isFirstChange()) {
            this.mapService.updateDragRotate(changes['dragRotate'].currentValue);
        }
        if (changes['touchPitch'] && !changes['touchPitch'].isFirstChange()) {
            this.mapService.updateTouchPitch(changes['touchPitch'].currentValue);
        }
        if (changes['touchZoomRotate'] &&
            !changes['touchZoomRotate'].isFirstChange()) {
            this.mapService.updateTouchZoomRotate(changes['touchZoomRotate'].currentValue);
        }
        if (changes['doubleClickZoom'] &&
            !changes['doubleClickZoom'].isFirstChange()) {
            this.mapService.updateDoubleClickZoom(changes['doubleClickZoom'].currentValue);
        }
        if (changes['keyboard'] && !changes['keyboard'].isFirstChange()) {
            this.mapService.updateKeyboard(changes['keyboard'].currentValue);
        }
        if (changes['dragPan'] && !changes['dragPan'].isFirstChange()) {
            this.mapService.updateDragPan(changes['dragPan'].currentValue);
        }
        if (changes['boxZoom'] && !changes['boxZoom'].isFirstChange()) {
            this.mapService.updateBoxZoom(changes['boxZoom'].currentValue);
        }
        if (changes['style'] && !changes['style'].isFirstChange()) {
            this.mapService.updateStyle(changes['style'].currentValue);
        }
        if (changes['maxBounds'] && !changes['maxBounds'].isFirstChange()) {
            this.mapService.updateMaxBounds(changes['maxBounds'].currentValue);
        }
        if (changes['fitBounds'] &&
            changes['fitBounds'].currentValue &&
            !changes['fitBounds'].isFirstChange()) {
            this.mapService.fitBounds(changes['fitBounds'].currentValue, this.fitBoundsOptions);
        }
        if (changes['fitScreenCoordinates'] &&
            changes['fitScreenCoordinates'].currentValue) {
            if ((this.center || this.zoom || this.pitch || this.fitBounds) &&
                changes['fitScreenCoordinates'].isFirstChange()) {
                console.warn('[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input');
            }
            this.mapService.fitScreenCoordinates(changes['fitScreenCoordinates'].currentValue, this.bearing ? this.bearing[0] : 0, this.movingOptions);
        }
        if (this.centerWithPanTo &&
            changes['center'] &&
            !changes['center'].isFirstChange() &&
            !changes['zoom'] &&
            !changes['bearing'] &&
            !changes['pitch']) {
            this.mapService.panTo(this.center, this.panToOptions);
        }
        else if ((changes['center'] && !changes['center'].isFirstChange()) ||
            (changes['zoom'] && !changes['zoom'].isFirstChange()) ||
            (changes['bearing'] &&
                !changes['bearing'].isFirstChange() &&
                !changes['fitScreenCoordinates']) ||
            (changes['pitch'] && !changes['pitch'].isFirstChange())) {
            this.mapService.move(this.movingMethod, this.movingOptions, changes['zoom'] && this.zoom ? this.zoom[0] : undefined, changes['center'] ? this.center : undefined, changes['bearing'] && this.bearing ? this.bearing[0] : undefined, changes['pitch'] && this.pitch ? this.pitch[0] : undefined);
        }
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, MapComponent.name);
        if (this.resize.observed) {
            dw('resize', 'mapResize');
        }
        if (this.remove.observed) {
            dw('remove', 'mapRemove');
        }
        if (this.mouseDown.observed) {
            dw('mouseDown', 'mapMouseDown');
        }
        if (this.mouseUp.observed) {
            dw('mouseUp', 'mapMouseUp');
        }
        if (this.mouseMove.observed) {
            dw('mouseMove', 'mapMouseMove');
        }
        if (this.click.observed) {
            dw('click', 'mapClick');
        }
        if (this.dblClick.observed) {
            dw('dblClick', 'mapDblClick');
        }
        if (this.mouseOver.observed) {
            dw('mouseOver', 'mapMouseOver');
        }
        if (this.mouseOut.observed) {
            dw('mouseOut', 'mapMouseOut');
        }
        if (this.contextMenu.observed) {
            dw('contextMenu', 'mapContextMenu');
        }
        if (this.touchStart.observed) {
            dw('touchStart', 'mapTouchStart');
        }
        if (this.touchEnd.observed) {
            dw('touchEnd', 'mapTouchEnd');
        }
        if (this.touchMove.observed) {
            dw('touchMove', 'mapTouchMove');
        }
        if (this.touchCancel.observed) {
            dw('touchCancel', 'mapTouchCancel');
        }
        if (this.wheel.observed) {
            dw('wheel', 'mapWheel');
        }
        if (this.dragStart.observed) {
            dw('dragStart', 'mapDragStart');
        }
        if (this.drag.observed) {
            dw('drag', 'mapDrag');
        }
        if (this.dragEnd.observed) {
            dw('dragEnd', 'mapDragEnd');
        }
        if (this.load.observed) {
            dw('load', 'mapLoad');
        }
        if (this.error.observed) {
            dw('error', 'mapError');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: MapComponent, selector: "mgl-map", inputs: { accessToken: "accessToken", collectResourceTiming: "collectResourceTiming", crossSourceCollisions: "crossSourceCollisions", customMapboxApiUrl: "customMapboxApiUrl", fadeDuration: "fadeDuration", hash: "hash", refreshExpiredTiles: "refreshExpiredTiles", failIfMajorPerformanceCaveat: "failIfMajorPerformanceCaveat", bearingSnap: "bearingSnap", interactive: "interactive", pitchWithRotate: "pitchWithRotate", clickTolerance: "clickTolerance", attributionControl: "attributionControl", logoPosition: "logoPosition", maxTileCacheSize: "maxTileCacheSize", localIdeographFontFamily: "localIdeographFontFamily", preserveDrawingBuffer: "preserveDrawingBuffer", trackResize: "trackResize", transformRequest: "transformRequest", bounds: "bounds", antialias: "antialias", locale: "locale", cooperativeGestures: "cooperativeGestures", minZoom: "minZoom", maxZoom: "maxZoom", minPitch: "minPitch", maxPitch: "maxPitch", scrollZoom: "scrollZoom", dragRotate: "dragRotate", touchPitch: "touchPitch", touchZoomRotate: "touchZoomRotate", doubleClickZoom: "doubleClickZoom", keyboard: "keyboard", dragPan: "dragPan", boxZoom: "boxZoom", style: "style", center: "center", maxBounds: "maxBounds", zoom: "zoom", bearing: "bearing", pitch: "pitch", fitBoundsOptions: "fitBoundsOptions", renderWorldCopies: "renderWorldCopies", projection: "projection", movingMethod: "movingMethod", movingOptions: "movingOptions", fitBounds: "fitBounds", fitScreenCoordinates: "fitScreenCoordinates", centerWithPanTo: "centerWithPanTo", panToOptions: "panToOptions", cursorStyle: "cursorStyle" }, outputs: { mapResize: "mapResize", mapRemove: "mapRemove", mapMouseDown: "mapMouseDown", mapMouseUp: "mapMouseUp", mapMouseMove: "mapMouseMove", mapClick: "mapClick", mapDblClick: "mapDblClick", mapMouseOver: "mapMouseOver", mapMouseOut: "mapMouseOut", mapContextMenu: "mapContextMenu", mapTouchStart: "mapTouchStart", mapTouchEnd: "mapTouchEnd", mapTouchMove: "mapTouchMove", mapTouchCancel: "mapTouchCancel", mapWheel: "mapWheel", moveStart: "moveStart", move: "move", moveEnd: "moveEnd", mapDragStart: "mapDragStart", mapDrag: "mapDrag", mapDragEnd: "mapDragEnd", zoomStart: "zoomStart", zoomEvt: "zoomEvt", zoomEnd: "zoomEnd", rotateStart: "rotateStart", rotate: "rotate", rotateEnd: "rotateEnd", pitchStart: "pitchStart", pitchEvt: "pitchEvt", pitchEnd: "pitchEnd", boxZoomStart: "boxZoomStart", boxZoomEnd: "boxZoomEnd", boxZoomCancel: "boxZoomCancel", webGlContextLost: "webGlContextLost", webGlContextRestored: "webGlContextRestored", mapLoad: "mapLoad", mapCreate: "mapCreate", idle: "idle", render: "render", mapError: "mapError", data: "data", styleData: "styleData", sourceData: "sourceData", dataLoading: "dataLoading", styleDataLoading: "styleDataLoading", sourceDataLoading: "sourceDataLoading", styleImageMissing: "styleImageMissing", resize: "resize", remove: "remove", mouseDown: "mouseDown", mouseUp: "mouseUp", mouseMove: "mouseMove", click: "click", dblClick: "dblClick", mouseOver: "mouseOver", mouseOut: "mouseOut", contextMenu: "contextMenu", touchStart: "touchStart", touchEnd: "touchEnd", touchMove: "touchMove", touchCancel: "touchCancel", wheel: "wheel", dragStart: "dragStart", drag: "drag", dragEnd: "dragEnd", load: "load", error: "error" }, providers: [MapService], viewQueries: [{ propertyName: "mapContainer", first: true, predicate: ["container"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #container></div>', isInline: true, styles: [":host{display:block}div{height:100%;width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { MapComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mgl-map', template: '<div #container></div>', providers: [MapService], changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}div{height:100%;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { accessToken: [{
                type: Input
            }], collectResourceTiming: [{
                type: Input
            }], crossSourceCollisions: [{
                type: Input
            }], customMapboxApiUrl: [{
                type: Input
            }], fadeDuration: [{
                type: Input
            }], hash: [{
                type: Input
            }], refreshExpiredTiles: [{
                type: Input
            }], failIfMajorPerformanceCaveat: [{
                type: Input
            }], bearingSnap: [{
                type: Input
            }], interactive: [{
                type: Input
            }], pitchWithRotate: [{
                type: Input
            }], clickTolerance: [{
                type: Input
            }], attributionControl: [{
                type: Input
            }], logoPosition: [{
                type: Input
            }], maxTileCacheSize: [{
                type: Input
            }], localIdeographFontFamily: [{
                type: Input
            }], preserveDrawingBuffer: [{
                type: Input
            }], trackResize: [{
                type: Input
            }], transformRequest: [{
                type: Input
            }], bounds: [{
                type: Input
            }], antialias: [{
                type: Input
            }], locale: [{
                type: Input
            }], cooperativeGestures: [{
                type: Input
            }], minZoom: [{
                type: Input
            }], maxZoom: [{
                type: Input
            }], minPitch: [{
                type: Input
            }], maxPitch: [{
                type: Input
            }], scrollZoom: [{
                type: Input
            }], dragRotate: [{
                type: Input
            }], touchPitch: [{
                type: Input
            }], touchZoomRotate: [{
                type: Input
            }], doubleClickZoom: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], dragPan: [{
                type: Input
            }], boxZoom: [{
                type: Input
            }], style: [{
                type: Input
            }], center: [{
                type: Input
            }], maxBounds: [{
                type: Input
            }], zoom: [{
                type: Input
            }], bearing: [{
                type: Input
            }], pitch: [{
                type: Input
            }], fitBoundsOptions: [{
                type: Input
            }], renderWorldCopies: [{
                type: Input
            }], projection: [{
                type: Input
            }], movingMethod: [{
                type: Input
            }], movingOptions: [{
                type: Input
            }], fitBounds: [{
                type: Input
            }], fitScreenCoordinates: [{
                type: Input
            }], centerWithPanTo: [{
                type: Input
            }], panToOptions: [{
                type: Input
            }], cursorStyle: [{
                type: Input
            }], mapResize: [{
                type: Output
            }], mapRemove: [{
                type: Output
            }], mapMouseDown: [{
                type: Output
            }], mapMouseUp: [{
                type: Output
            }], mapMouseMove: [{
                type: Output
            }], mapClick: [{
                type: Output
            }], mapDblClick: [{
                type: Output
            }], mapMouseOver: [{
                type: Output
            }], mapMouseOut: [{
                type: Output
            }], mapContextMenu: [{
                type: Output
            }], mapTouchStart: [{
                type: Output
            }], mapTouchEnd: [{
                type: Output
            }], mapTouchMove: [{
                type: Output
            }], mapTouchCancel: [{
                type: Output
            }], mapWheel: [{
                type: Output
            }], moveStart: [{
                type: Output
            }], move: [{
                type: Output
            }], moveEnd: [{
                type: Output
            }], mapDragStart: [{
                type: Output
            }], mapDrag: [{
                type: Output
            }], mapDragEnd: [{
                type: Output
            }], zoomStart: [{
                type: Output
            }], zoomEvt: [{
                type: Output
            }], zoomEnd: [{
                type: Output
            }], rotateStart: [{
                type: Output
            }], rotate: [{
                type: Output
            }], rotateEnd: [{
                type: Output
            }], pitchStart: [{
                type: Output
            }], pitchEvt: [{
                type: Output
            }], pitchEnd: [{
                type: Output
            }], boxZoomStart: [{
                type: Output
            }], boxZoomEnd: [{
                type: Output
            }], boxZoomCancel: [{
                type: Output
            }], webGlContextLost: [{
                type: Output
            }], webGlContextRestored: [{
                type: Output
            }], mapLoad: [{
                type: Output
            }], mapCreate: [{
                type: Output
            }], idle: [{
                type: Output
            }], render: [{
                type: Output
            }], mapError: [{
                type: Output
            }], data: [{
                type: Output
            }], styleData: [{
                type: Output
            }], sourceData: [{
                type: Output
            }], dataLoading: [{
                type: Output
            }], styleDataLoading: [{
                type: Output
            }], sourceDataLoading: [{
                type: Output
            }], styleImageMissing: [{
                type: Output
            }], resize: [{
                type: Output
            }], remove: [{
                type: Output
            }], mouseDown: [{
                type: Output
            }], mouseUp: [{
                type: Output
            }], mouseMove: [{
                type: Output
            }], click: [{
                type: Output
            }], dblClick: [{
                type: Output
            }], mouseOver: [{
                type: Output
            }], mouseOut: [{
                type: Output
            }], contextMenu: [{
                type: Output
            }], touchStart: [{
                type: Output
            }], touchEnd: [{
                type: Output
            }], touchMove: [{
                type: Output
            }], touchCancel: [{
                type: Output
            }], wheel: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], drag: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], load: [{
                type: Output
            }], error: [{
                type: Output
            }], mapContainer: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL21hcC9tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFtQnZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFHMUQsTUFpQmEsWUFBWTtJQTRQdkIsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUNyQyxDQUFDO0lBSUQsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXhNMUMsNEJBQTRCO1FBQ25CLGlCQUFZLEdBQWtDLE9BQU8sQ0FBQztRQVNyRCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQTJCLENBQUM7UUFDeEQsY0FBUyxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQ3hELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFDN0QsZUFBVSxHQUFHLElBQUksWUFBWSxFQUE2QixDQUFDO1FBQzNELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFDN0QsYUFBUSxHQUFHLElBQUksWUFBWSxFQUE2QixDQUFDO1FBQ3pELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFDNUQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBNkIsQ0FBQztRQUM3RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUE2QixDQUFDO1FB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LE1BQU07Z0JBS0csU0FBUztzQkFBbEIsTUFBTTtnQkFLRyxLQUFLO3NCQUFkLE1BQU07Z0JBS0csUUFBUTtzQkFBakIsTUFBTTtnQkFLRyxTQUFTO3NCQUFsQixNQUFNO2dCQUtHLFFBQVE7c0JBQWpCLE1BQU07Z0JBSUcsV0FBVztzQkFBcEIsTUFBTTtnQkFJRyxVQUFVO3NCQUFuQixNQUFNO2dCQUlHLFFBQVE7c0JBQWpCLE1BQU07Z0JBSUcsU0FBUztzQkFBbEIsTUFBTTtnQkFJRyxXQUFXO3NCQUFwQixNQUFNO2dCQUtHLEtBQUs7c0JBQWQsTUFBTTtnQkFJRyxTQUFTO3NCQUFsQixNQUFNO2dCQU9HLElBQUk7c0JBQWIsTUFBTTtnQkFNRyxPQUFPO3NCQUFoQixNQUFNO2dCQU9HLElBQUk7c0JBQWIsTUFBTTtnQkFLRyxLQUFLO3NCQUFkLE1BQU07Z0JBTW1DLFlBQVk7c0JBQXJELFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBbmltYXRpb25PcHRpb25zLFxuICBFcnJvckV2ZW50LFxuICBFdmVudERhdGEsXG4gIExuZ0xhdEJvdW5kc0xpa2UsXG4gIE1hcCxcbiAgTWFwQm94Wm9vbUV2ZW50LFxuICBNYXBDb250ZXh0RXZlbnQsXG4gIE1hcERhdGFFdmVudCxcbiAgTWFwTW91c2VFdmVudCxcbiAgTWFwU291cmNlRGF0YUV2ZW50LFxuICBNYXBTdHlsZURhdGFFdmVudCxcbiAgTWFwVG91Y2hFdmVudCxcbiAgTWFwV2hlZWxFdmVudCxcbiAgTWFwYm94RXZlbnQsXG4gIE1hcGJveE9wdGlvbnMsXG4gIFBvaW50TGlrZSxcbn0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGxhc3RWYWx1ZUZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlcHJlY2F0aW9uV2FybmluZyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UsIE1vdmluZ09wdGlvbnMgfSBmcm9tICcuL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEV2ZW50IH0gZnJvbSAnLi9tYXAudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFwJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250YWluZXI+PC9kaXY+JyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICAgIGRpdiB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbTWFwU2VydmljZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXBDb21wb25lbnRcbiAgaW1wbGVtZW50c1xuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBPbWl0PE1hcGJveE9wdGlvbnMsICdiZWFyaW5nJyB8ICdjb250YWluZXInIHwgJ3BpdGNoJyB8ICd6b29tJz4sXG4gICAgTWFwRXZlbnRcbntcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgYWNjZXNzVG9rZW4/OiBNYXBib3hPcHRpb25zWydhY2Nlc3NUb2tlbiddO1xuICBASW5wdXQoKSBjb2xsZWN0UmVzb3VyY2VUaW1pbmc/OiBNYXBib3hPcHRpb25zWydjb2xsZWN0UmVzb3VyY2VUaW1pbmcnXTtcbiAgQElucHV0KCkgY3Jvc3NTb3VyY2VDb2xsaXNpb25zPzogTWFwYm94T3B0aW9uc1snY3Jvc3NTb3VyY2VDb2xsaXNpb25zJ107XG4gIEBJbnB1dCgpIGN1c3RvbU1hcGJveEFwaVVybD86IHN0cmluZztcbiAgQElucHV0KCkgZmFkZUR1cmF0aW9uPzogTWFwYm94T3B0aW9uc1snZmFkZUR1cmF0aW9uJ107XG4gIEBJbnB1dCgpIGhhc2g/OiBNYXBib3hPcHRpb25zWydoYXNoJ107XG4gIEBJbnB1dCgpIHJlZnJlc2hFeHBpcmVkVGlsZXM/OiBNYXBib3hPcHRpb25zWydyZWZyZXNoRXhwaXJlZFRpbGVzJ107XG4gIEBJbnB1dCgpXG4gIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ/OiBNYXBib3hPcHRpb25zWydmYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0J107XG4gIEBJbnB1dCgpIGJlYXJpbmdTbmFwPzogTWFwYm94T3B0aW9uc1snYmVhcmluZ1NuYXAnXTtcbiAgQElucHV0KCkgaW50ZXJhY3RpdmU/OiBNYXBib3hPcHRpb25zWydpbnRlcmFjdGl2ZSddO1xuICBASW5wdXQoKSBwaXRjaFdpdGhSb3RhdGU/OiBNYXBib3hPcHRpb25zWydwaXRjaFdpdGhSb3RhdGUnXTtcbiAgQElucHV0KCkgY2xpY2tUb2xlcmFuY2U/OiBNYXBib3hPcHRpb25zWydjbGlja1RvbGVyYW5jZSddO1xuICBASW5wdXQoKSBhdHRyaWJ1dGlvbkNvbnRyb2w/OiBNYXBib3hPcHRpb25zWydhdHRyaWJ1dGlvbkNvbnRyb2wnXTtcbiAgQElucHV0KCkgbG9nb1Bvc2l0aW9uPzogTWFwYm94T3B0aW9uc1snbG9nb1Bvc2l0aW9uJ107XG4gIEBJbnB1dCgpIG1heFRpbGVDYWNoZVNpemU/OiBNYXBib3hPcHRpb25zWydtYXhUaWxlQ2FjaGVTaXplJ107XG4gIEBJbnB1dCgpIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseT86IE1hcGJveE9wdGlvbnNbJ2xvY2FsSWRlb2dyYXBoRm9udEZhbWlseSddO1xuICBASW5wdXQoKSBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI/OiBNYXBib3hPcHRpb25zWydwcmVzZXJ2ZURyYXdpbmdCdWZmZXInXTtcbiAgQElucHV0KCkgdHJhY2tSZXNpemU/OiBNYXBib3hPcHRpb25zWyd0cmFja1Jlc2l6ZSddO1xuICBASW5wdXQoKSB0cmFuc2Zvcm1SZXF1ZXN0PzogTWFwYm94T3B0aW9uc1sndHJhbnNmb3JtUmVxdWVzdCddO1xuICBASW5wdXQoKSBib3VuZHM/OiBNYXBib3hPcHRpb25zWydib3VuZHMnXTsgLy8gVXNlIGZpdEJvdW5kcyBmb3IgZHluYW1pYyBpbnB1dFxuICBASW5wdXQoKSBhbnRpYWxpYXM/OiBNYXBib3hPcHRpb25zWydhbnRpYWxpYXMnXTtcbiAgQElucHV0KCkgbG9jYWxlPzogTWFwYm94T3B0aW9uc1snbG9jYWxlJ107XG4gIEBJbnB1dCgpIGNvb3BlcmF0aXZlR2VzdHVyZXM/OiBNYXBib3hPcHRpb25zWydjb29wZXJhdGl2ZUdlc3R1cmVzJ107XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgbWluWm9vbT86IE1hcGJveE9wdGlvbnNbJ21pblpvb20nXTtcbiAgQElucHV0KCkgbWF4Wm9vbT86IE1hcGJveE9wdGlvbnNbJ21heFpvb20nXTtcbiAgQElucHV0KCkgbWluUGl0Y2g/OiBNYXBib3hPcHRpb25zWydtaW5QaXRjaCddO1xuICBASW5wdXQoKSBtYXhQaXRjaD86IE1hcGJveE9wdGlvbnNbJ21heFBpdGNoJ107XG4gIEBJbnB1dCgpIHNjcm9sbFpvb20/OiBNYXBib3hPcHRpb25zWydzY3JvbGxab29tJ107XG4gIEBJbnB1dCgpIGRyYWdSb3RhdGU/OiBNYXBib3hPcHRpb25zWydkcmFnUm90YXRlJ107XG4gIEBJbnB1dCgpIHRvdWNoUGl0Y2g/OiBNYXBib3hPcHRpb25zWyd0b3VjaFBpdGNoJ107XG4gIEBJbnB1dCgpIHRvdWNoWm9vbVJvdGF0ZT86IE1hcGJveE9wdGlvbnNbJ3RvdWNoWm9vbVJvdGF0ZSddO1xuICBASW5wdXQoKSBkb3VibGVDbGlja1pvb20/OiBNYXBib3hPcHRpb25zWydkb3VibGVDbGlja1pvb20nXTtcbiAgQElucHV0KCkga2V5Ym9hcmQ/OiBNYXBib3hPcHRpb25zWydrZXlib2FyZCddO1xuICBASW5wdXQoKSBkcmFnUGFuPzogTWFwYm94T3B0aW9uc1snZHJhZ1BhbiddO1xuICBASW5wdXQoKSBib3hab29tPzogTWFwYm94T3B0aW9uc1snYm94Wm9vbSddO1xuICBASW5wdXQoKSBzdHlsZTogTWFwYm94T3B0aW9uc1snc3R5bGUnXTtcbiAgQElucHV0KCkgY2VudGVyPzogTWFwYm94T3B0aW9uc1snY2VudGVyJ107XG4gIEBJbnB1dCgpIG1heEJvdW5kcz86IE1hcGJveE9wdGlvbnNbJ21heEJvdW5kcyddO1xuICBASW5wdXQoKSB6b29tPzogW251bWJlcl07XG4gIEBJbnB1dCgpIGJlYXJpbmc/OiBbbnVtYmVyXTtcbiAgQElucHV0KCkgcGl0Y2g/OiBbbnVtYmVyXTtcbiAgLy8gRmlyc3QgdmFsdWUgZ29lcyB0byBvcHRpb25zLmZpdEJvdW5kc09wdGlvbnMuIFN1YnNlcXVlbnRzIGNoYW5nZXMgYXJlIHBhc3NlZCB0byBmaXRCb3VuZHNcbiAgQElucHV0KCkgZml0Qm91bmRzT3B0aW9ucz86IE1hcGJveE9wdGlvbnNbJ2ZpdEJvdW5kc09wdGlvbnMnXTtcbiAgQElucHV0KCkgcmVuZGVyV29ybGRDb3BpZXM/OiBNYXBib3hPcHRpb25zWydyZW5kZXJXb3JsZENvcGllcyddO1xuICBASW5wdXQoKSBwcm9qZWN0aW9uPzogTWFwYm94T3B0aW9uc1sncHJvamVjdGlvbiddO1xuXG4gIC8qIEFkZGVkIGJ5IG5neC1tYXBib3gtZ2wgKi9cbiAgQElucHV0KCkgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyA9ICdmbHlUbyc7XG4gIEBJbnB1dCgpIG1vdmluZ09wdGlvbnM/OiBNb3ZpbmdPcHRpb25zO1xuICAvLyA9PiBGaXJzdCB2YWx1ZSBpcyBhIGFsaWFzIHRvIGJvdW5kcyBpbnB1dCAoc2luY2UgbWFwYm94IDAuNTMuMCkuIFN1YnNlcXVlbnRzIGNoYW5nZXMgYXJlIHBhc3NlZCB0byBmaXRCb3VuZHNcbiAgQElucHV0KCkgZml0Qm91bmRzPzogTG5nTGF0Qm91bmRzTGlrZTtcbiAgQElucHV0KCkgZml0U2NyZWVuQ29vcmRpbmF0ZXM/OiBbUG9pbnRMaWtlLCBQb2ludExpa2VdO1xuICBASW5wdXQoKSBjZW50ZXJXaXRoUGFuVG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBwYW5Ub09wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zO1xuICBASW5wdXQoKSBjdXJzb3JTdHlsZT86IHN0cmluZztcblxuICBAT3V0cHV0KCkgbWFwUmVzaXplID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBib3hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcFJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwYm94RXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBNb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBNb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwTW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcE1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcE1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwQ29udGV4dE1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBUb3VjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwVG91Y2hFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBUb3VjaE1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBtYXBUb3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcFdoZWVsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBXaGVlbEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbW92ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IFdoZWVsRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIG1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgV2hlZWxFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgbW92ZUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCBXaGVlbEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBtYXBEcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBtYXBEcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgbWFwRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIHpvb21TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCBXaGVlbEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSB6b29tRXZ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IFdoZWVsRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIHpvb21FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgV2hlZWxFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgcm90YXRlU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgcGl0Y2hFdnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcGJveEV2ZW50PE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgdW5kZWZpbmVkPiAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwQm94Wm9vbUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgYm94Wm9vbUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwQm94Wm9vbUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgYm94Wm9vbUNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwQm94Wm9vbUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgd2ViR2xDb250ZXh0TG9zdCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwQ29udGV4dEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgd2ViR2xDb250ZXh0UmVzdG9yZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcENvbnRleHRFdmVudCAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIEBPdXRwdXQoKSBtYXBMb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBib3hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIG1hcENyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwPigpO1xuICBAT3V0cHV0KCkgaWRsZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwYm94RXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSByZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcGJveEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbWFwRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEVycm9yRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBkYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBEYXRhRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBzdHlsZURhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFN0eWxlRGF0YUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwU291cmNlRGF0YUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgZGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcERhdGFFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHN0eWxlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcFN0eWxlRGF0YUV2ZW50ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIHNvdXJjZURhdGFMb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBTb3VyY2VEYXRhRXZlbnQgJiBFdmVudERhdGFcbiAgPigpO1xuICBAT3V0cHV0KCkgc3R5bGVJbWFnZU1pc3NpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHsgaWQ6IHN0cmluZyB9ICYgRXZlbnREYXRhPigpO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwUmVzaXplIGluc3RlYWRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgcmVzaXplID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBib3hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBSZW1vdmUgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSByZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcGJveEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcE1vdXNlRG93biBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIG1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBNb3VzZVVwIGluc3RlYWRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgbW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBNb3VzZU1vdmUgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBtb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwQ2xpY2sgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBEYmxDbGljayBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIGRibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcE1vdXNlT3ZlciBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIG1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBNb3VzZU91dCBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIG1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcENvbnRleHRNZW51IGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSBjb250ZXh0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBUb3VjaFN0YXJ0IGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSB0b3VjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcFRvdWNoRW5kIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSB0b3VjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBUb3VjaE1vdmUgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIHRvdWNoTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBUb3VjaENhbmNlbCBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgdG91Y2hDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwV2hlZWwgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSB3aGVlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwV2hlZWxFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBEcmFnU3RhcnQgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBEcmFnIGluc3RlYWRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwYm94RXZlbnQ8TW91c2VFdmVudCB8IFRvdWNoRXZlbnQgfCB1bmRlZmluZWQ+ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBtYXBEcmFnRW5kIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBib3hFdmVudDxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IHVuZGVmaW5lZD4gJiBFdmVudERhdGFcbiAgPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcExvYWQgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxNYXA+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFwRXJyb3IgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3JFdmVudCAmIEV2ZW50RGF0YT4oKTtcblxuICBnZXQgbWFwSW5zdGFuY2UoKTogTWFwIHtcbiAgICByZXR1cm4gdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgbWFwQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy53YXJuRGVwcmVjYXRlZE91dHB1dHMoKTtcbiAgICB0aGlzLm1hcFNlcnZpY2Uuc2V0dXAoe1xuICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXG4gICAgICBjdXN0b21NYXBib3hBcGlVcmw6IHRoaXMuY3VzdG9tTWFwYm94QXBpVXJsLFxuICAgICAgbWFwT3B0aW9uczoge1xuICAgICAgICBjb2xsZWN0UmVzb3VyY2VUaW1pbmc6IHRoaXMuY29sbGVjdFJlc291cmNlVGltaW5nLFxuICAgICAgICBjb250YWluZXI6IHRoaXMubWFwQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIGNyb3NzU291cmNlQ29sbGlzaW9uczogdGhpcy5jcm9zc1NvdXJjZUNvbGxpc2lvbnMsXG4gICAgICAgIGZhZGVEdXJhdGlvbjogdGhpcy5mYWRlRHVyYXRpb24sXG4gICAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgICBtaW5QaXRjaDogdGhpcy5taW5QaXRjaCxcbiAgICAgICAgbWF4UGl0Y2g6IHRoaXMubWF4UGl0Y2gsXG4gICAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgICBoYXNoOiB0aGlzLmhhc2gsXG4gICAgICAgIGludGVyYWN0aXZlOiB0aGlzLmludGVyYWN0aXZlLFxuICAgICAgICBiZWFyaW5nU25hcDogdGhpcy5iZWFyaW5nU25hcCxcbiAgICAgICAgcGl0Y2hXaXRoUm90YXRlOiB0aGlzLnBpdGNoV2l0aFJvdGF0ZSxcbiAgICAgICAgY2xpY2tUb2xlcmFuY2U6IHRoaXMuY2xpY2tUb2xlcmFuY2UsXG4gICAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogdGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wsXG4gICAgICAgIGxvZ29Qb3NpdGlvbjogdGhpcy5sb2dvUG9zaXRpb24sXG4gICAgICAgIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ6IHRoaXMuZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdCxcbiAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0aGlzLnByZXNlcnZlRHJhd2luZ0J1ZmZlcixcbiAgICAgICAgcmVmcmVzaEV4cGlyZWRUaWxlczogdGhpcy5yZWZyZXNoRXhwaXJlZFRpbGVzLFxuICAgICAgICBtYXhCb3VuZHM6IHRoaXMubWF4Qm91bmRzLFxuICAgICAgICBzY3JvbGxab29tOiB0aGlzLnNjcm9sbFpvb20sXG4gICAgICAgIGJveFpvb206IHRoaXMuYm94Wm9vbSxcbiAgICAgICAgZHJhZ1JvdGF0ZTogdGhpcy5kcmFnUm90YXRlLFxuICAgICAgICBkcmFnUGFuOiB0aGlzLmRyYWdQYW4sXG4gICAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkLFxuICAgICAgICBkb3VibGVDbGlja1pvb206IHRoaXMuZG91YmxlQ2xpY2tab29tLFxuICAgICAgICB0b3VjaFBpdGNoOiB0aGlzLnRvdWNoUGl0Y2gsXG4gICAgICAgIHRvdWNoWm9vbVJvdGF0ZTogdGhpcy50b3VjaFpvb21Sb3RhdGUsXG4gICAgICAgIHRyYWNrUmVzaXplOiB0aGlzLnRyYWNrUmVzaXplLFxuICAgICAgICBjZW50ZXI6IHRoaXMuY2VudGVyLFxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgIGJlYXJpbmc6IHRoaXMuYmVhcmluZyxcbiAgICAgICAgcGl0Y2g6IHRoaXMucGl0Y2gsXG4gICAgICAgIHJlbmRlcldvcmxkQ29waWVzOiB0aGlzLnJlbmRlcldvcmxkQ29waWVzLFxuICAgICAgICBtYXhUaWxlQ2FjaGVTaXplOiB0aGlzLm1heFRpbGVDYWNoZVNpemUsXG4gICAgICAgIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseTogdGhpcy5sb2NhbElkZW9ncmFwaEZvbnRGYW1pbHksXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IHRoaXMudHJhbnNmb3JtUmVxdWVzdCxcbiAgICAgICAgYm91bmRzOiB0aGlzLmJvdW5kcyA/IHRoaXMuYm91bmRzIDogdGhpcy5maXRCb3VuZHMsXG4gICAgICAgIGZpdEJvdW5kc09wdGlvbnM6IHRoaXMuZml0Qm91bmRzT3B0aW9ucyxcbiAgICAgICAgYW50aWFsaWFzOiB0aGlzLmFudGlhbGlhcyxcbiAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgY29vcGVyYXRpdmVHZXN0dXJlczogdGhpcy5jb29wZXJhdGl2ZUdlc3R1cmVzLFxuICAgICAgICBwcm9qZWN0aW9uOiB0aGlzLnByb2plY3Rpb24sXG4gICAgICB9LFxuICAgICAgbWFwRXZlbnRzOiB0aGlzLFxuICAgIH0pO1xuICAgIGlmICh0aGlzLmN1cnNvclN0eWxlKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKHRoaXMuY3Vyc29yU3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubWFwU2VydmljZS5kZXN0cm95TWFwKCk7XG4gIH1cblxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgYXdhaXQgbGFzdFZhbHVlRnJvbSh0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQpO1xuICAgIGlmIChjaGFuZ2VzWydjdXJzb3JTdHlsZSddICYmICFjaGFuZ2VzWydjdXJzb3JTdHlsZSddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcihjaGFuZ2VzWydjdXJzb3JTdHlsZSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydwcm9qZWN0aW9uJ10gJiYgIWNoYW5nZXNbJ3Byb2plY3Rpb24nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVQcm9qZWN0aW9uKGNoYW5nZXNbJ3Byb2plY3Rpb24nXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWluWm9vbSddICYmICFjaGFuZ2VzWydtaW5ab29tJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlTWluWm9vbShjaGFuZ2VzWydtaW5ab29tJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21heFpvb20nXSAmJiAhY2hhbmdlc1snbWF4Wm9vbSddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZU1heFpvb20oY2hhbmdlc1snbWF4Wm9vbSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtaW5QaXRjaCddICYmICFjaGFuZ2VzWydtaW5QaXRjaCddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZU1pblBpdGNoKGNoYW5nZXNbJ21pblBpdGNoJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21heFBpdGNoJ10gJiYgIWNoYW5nZXNbJ21heFBpdGNoJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlTWF4UGl0Y2goY2hhbmdlc1snbWF4UGl0Y2gnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydyZW5kZXJXb3JsZENvcGllcyddICYmXG4gICAgICAhY2hhbmdlc1sncmVuZGVyV29ybGRDb3BpZXMnXS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVSZW5kZXJXb3JsZENvcGllcyhcbiAgICAgICAgY2hhbmdlc1sncmVuZGVyV29ybGRDb3BpZXMnXS5jdXJyZW50VmFsdWVcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydzY3JvbGxab29tJ10gJiYgIWNoYW5nZXNbJ3Njcm9sbFpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVTY3JvbGxab29tKGNoYW5nZXNbJ3Njcm9sbFpvb20nXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZHJhZ1JvdGF0ZSddICYmICFjaGFuZ2VzWydkcmFnUm90YXRlJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRHJhZ1JvdGF0ZShjaGFuZ2VzWydkcmFnUm90YXRlJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3RvdWNoUGl0Y2gnXSAmJiAhY2hhbmdlc1sndG91Y2hQaXRjaCddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVRvdWNoUGl0Y2goY2hhbmdlc1sndG91Y2hQaXRjaCddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ3RvdWNoWm9vbVJvdGF0ZSddICYmXG4gICAgICAhY2hhbmdlc1sndG91Y2hab29tUm90YXRlJ10uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlVG91Y2hab29tUm90YXRlKFxuICAgICAgICBjaGFuZ2VzWyd0b3VjaFpvb21Sb3RhdGUnXS5jdXJyZW50VmFsdWVcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ2RvdWJsZUNsaWNrWm9vbSddICYmXG4gICAgICAhY2hhbmdlc1snZG91YmxlQ2xpY2tab29tJ10uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRG91YmxlQ2xpY2tab29tKFxuICAgICAgICBjaGFuZ2VzWydkb3VibGVDbGlja1pvb20nXS5jdXJyZW50VmFsdWVcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydrZXlib2FyZCddICYmICFjaGFuZ2VzWydrZXlib2FyZCddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZUtleWJvYXJkKGNoYW5nZXNbJ2tleWJvYXJkJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2RyYWdQYW4nXSAmJiAhY2hhbmdlc1snZHJhZ1BhbiddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4oY2hhbmdlc1snZHJhZ1BhbiddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydib3hab29tJ10gJiYgIWNoYW5nZXNbJ2JveFpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVCb3hab29tKGNoYW5nZXNbJ2JveFpvb20nXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snc3R5bGUnXSAmJiAhY2hhbmdlc1snc3R5bGUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVTdHlsZShjaGFuZ2VzWydzdHlsZSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYXhCb3VuZHMnXSAmJiAhY2hhbmdlc1snbWF4Qm91bmRzJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlTWF4Qm91bmRzKGNoYW5nZXNbJ21heEJvdW5kcyddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ2ZpdEJvdW5kcyddICYmXG4gICAgICBjaGFuZ2VzWydmaXRCb3VuZHMnXS5jdXJyZW50VmFsdWUgJiZcbiAgICAgICFjaGFuZ2VzWydmaXRCb3VuZHMnXS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5maXRCb3VuZHMoXG4gICAgICAgIGNoYW5nZXNbJ2ZpdEJvdW5kcyddLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgdGhpcy5maXRCb3VuZHNPcHRpb25zXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydmaXRTY3JlZW5Db29yZGluYXRlcyddICYmXG4gICAgICBjaGFuZ2VzWydmaXRTY3JlZW5Db29yZGluYXRlcyddLmN1cnJlbnRWYWx1ZVxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICAodGhpcy5jZW50ZXIgfHwgdGhpcy56b29tIHx8IHRoaXMucGl0Y2ggfHwgdGhpcy5maXRCb3VuZHMpICYmXG4gICAgICAgIGNoYW5nZXNbJ2ZpdFNjcmVlbkNvb3JkaW5hdGVzJ10uaXNGaXJzdENoYW5nZSgpXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdbbmd4LW1hcGJveC1nbF0gY2VudGVyIC8gem9vbSAvIHBpdGNoIC8gZml0Qm91bmRzIGlucHV0cyBhcmUgYmVpbmcgb3ZlcnJpZGRlbiBieSBmaXRTY3JlZW5Db29yZGluYXRlcyBpbnB1dCdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWFwU2VydmljZS5maXRTY3JlZW5Db29yZGluYXRlcyhcbiAgICAgICAgY2hhbmdlc1snZml0U2NyZWVuQ29vcmRpbmF0ZXMnXS5jdXJyZW50VmFsdWUsXG4gICAgICAgIHRoaXMuYmVhcmluZyA/IHRoaXMuYmVhcmluZ1swXSA6IDAsXG4gICAgICAgIHRoaXMubW92aW5nT3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5jZW50ZXJXaXRoUGFuVG8gJiZcbiAgICAgIGNoYW5nZXNbJ2NlbnRlciddICYmXG4gICAgICAhY2hhbmdlc1snY2VudGVyJ10uaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICAhY2hhbmdlc1snem9vbSddICYmXG4gICAgICAhY2hhbmdlc1snYmVhcmluZyddICYmXG4gICAgICAhY2hhbmdlc1sncGl0Y2gnXVxuICAgICkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnBhblRvKHRoaXMuY2VudGVyISwgdGhpcy5wYW5Ub09wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoY2hhbmdlc1snY2VudGVyJ10gJiYgIWNoYW5nZXNbJ2NlbnRlciddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWyd6b29tJ10gJiYgIWNoYW5nZXNbJ3pvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYmVhcmluZyddICYmXG4gICAgICAgICFjaGFuZ2VzWydiZWFyaW5nJ10uaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICAgICFjaGFuZ2VzWydmaXRTY3JlZW5Db29yZGluYXRlcyddKSB8fFxuICAgICAgKGNoYW5nZXNbJ3BpdGNoJ10gJiYgIWNoYW5nZXNbJ3BpdGNoJ10uaXNGaXJzdENoYW5nZSgpKVxuICAgICkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLm1vdmUoXG4gICAgICAgIHRoaXMubW92aW5nTWV0aG9kLFxuICAgICAgICB0aGlzLm1vdmluZ09wdGlvbnMsXG4gICAgICAgIGNoYW5nZXNbJ3pvb20nXSAmJiB0aGlzLnpvb20gPyB0aGlzLnpvb21bMF0gOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXNbJ2NlbnRlciddID8gdGhpcy5jZW50ZXIgOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXNbJ2JlYXJpbmcnXSAmJiB0aGlzLmJlYXJpbmcgPyB0aGlzLmJlYXJpbmdbMF0gOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXNbJ3BpdGNoJ10gJiYgdGhpcy5waXRjaCA/IHRoaXMucGl0Y2hbMF0gOiB1bmRlZmluZWRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB3YXJuRGVwcmVjYXRlZE91dHB1dHMoKSB7XG4gICAgY29uc3QgZHcgPSBkZXByZWNhdGlvbldhcm5pbmcuYmluZCh1bmRlZmluZWQsIE1hcENvbXBvbmVudC5uYW1lKTtcbiAgICBpZiAodGhpcy5yZXNpemUub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdyZXNpemUnLCAnbWFwUmVzaXplJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnJlbW92ZS5vYnNlcnZlZCkge1xuICAgICAgZHcoJ3JlbW92ZScsICdtYXBSZW1vdmUnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW91c2VEb3duLm9ic2VydmVkKSB7XG4gICAgICBkdygnbW91c2VEb3duJywgJ21hcE1vdXNlRG93bicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb3VzZVVwLm9ic2VydmVkKSB7XG4gICAgICBkdygnbW91c2VVcCcsICdtYXBNb3VzZVVwJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vdXNlTW92ZS5vYnNlcnZlZCkge1xuICAgICAgZHcoJ21vdXNlTW92ZScsICdtYXBNb3VzZU1vdmUnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2xpY2sub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdjbGljaycsICdtYXBDbGljaycpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYmxDbGljay5vYnNlcnZlZCkge1xuICAgICAgZHcoJ2RibENsaWNrJywgJ21hcERibENsaWNrJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vdXNlT3Zlci5vYnNlcnZlZCkge1xuICAgICAgZHcoJ21vdXNlT3ZlcicsICdtYXBNb3VzZU92ZXInKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW91c2VPdXQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdtb3VzZU91dCcsICdtYXBNb3VzZU91dCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb250ZXh0TWVudS5vYnNlcnZlZCkge1xuICAgICAgZHcoJ2NvbnRleHRNZW51JywgJ21hcENvbnRleHRNZW51Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvdWNoU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCd0b3VjaFN0YXJ0JywgJ21hcFRvdWNoU3RhcnQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudG91Y2hFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCd0b3VjaEVuZCcsICdtYXBUb3VjaEVuZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy50b3VjaE1vdmUub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCd0b3VjaE1vdmUnLCAnbWFwVG91Y2hNb3ZlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvdWNoQ2FuY2VsLm9ic2VydmVkKSB7XG4gICAgICBkdygndG91Y2hDYW5jZWwnLCAnbWFwVG91Y2hDYW5jZWwnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMud2hlZWwub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCd3aGVlbCcsICdtYXBXaGVlbCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdkcmFnU3RhcnQnLCAnbWFwRHJhZ1N0YXJ0Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWcub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdkcmFnJywgJ21hcERyYWcnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZ0VuZC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ2RyYWdFbmQnLCAnbWFwRHJhZ0VuZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb2FkLm9ic2VydmVkKSB7XG4gICAgICBkdygnbG9hZCcsICdtYXBMb2FkJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmVycm9yLm9ic2VydmVkKSB7XG4gICAgICBkdygnZXJyb3InLCAnbWFwRXJyb3InKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==