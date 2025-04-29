import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild, inject, input, InjectionToken, } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MapService } from './map.service';
import * as i0 from "@angular/core";
/**
 * InjectionToken used for injecting default options to the MapComponent before it initializes.
 */
export const MAP_COMPONENT_INITIALIZATION_OPTIONS = new InjectionToken('MapComponentInitializationOptions');
export class MapComponent {
    mapService = inject(MapService);
    initialMapOptions = inject(MAP_COMPONENT_INITIALIZATION_OPTIONS, { optional: true });
    /* Init inputs */
    accessToken = input(this.initialMapOptions?.accessToken);
    collectResourceTiming = input(this.initialMapOptions?.collectResourceTiming);
    crossSourceCollisions = input(this.initialMapOptions?.crossSourceCollisions);
    fadeDuration = input(this.initialMapOptions?.fadeDuration);
    hash = input(this.initialMapOptions?.hash);
    refreshExpiredTiles = input(this.initialMapOptions?.refreshExpiredTiles);
    failIfMajorPerformanceCaveat = input(this.initialMapOptions?.failIfMajorPerformanceCaveat);
    bearingSnap = input(this.initialMapOptions?.bearingSnap);
    interactive = input(this.initialMapOptions?.interactive);
    pitchWithRotate = input(this.initialMapOptions?.pitchWithRotate);
    clickTolerance = input(this.initialMapOptions?.clickTolerance);
    attributionControl = input(this.initialMapOptions?.attributionControl);
    logoPosition = input(this.initialMapOptions?.logoPosition);
    maxTileCacheSize = input(this.initialMapOptions?.maxTileCacheSize);
    localIdeographFontFamily = input(this.initialMapOptions?.localIdeographFontFamily);
    preserveDrawingBuffer = input(this.initialMapOptions?.preserveDrawingBuffer);
    trackResize = input(this.initialMapOptions?.trackResize);
    transformRequest = input(this.initialMapOptions?.transformRequest);
    bounds = input(this.initialMapOptions?.bounds); // Use fitBounds for dynamic input
    antialias = input(this.initialMapOptions?.antialias);
    locale = input(this.initialMapOptions?.locale);
    cooperativeGestures = input(this.initialMapOptions?.cooperativeGestures);
    /* Dynamic inputs */
    minZoom = input(this.initialMapOptions?.minZoom);
    maxZoom = input(this.initialMapOptions?.maxZoom);
    minPitch = input(this.initialMapOptions?.minPitch);
    maxPitch = input(this.initialMapOptions?.maxPitch);
    scrollZoom = input(this.initialMapOptions?.scrollZoom);
    dragRotate = input(this.initialMapOptions?.dragRotate);
    touchPitch = input(this.initialMapOptions?.touchPitch);
    touchZoomRotate = input(this.initialMapOptions?.touchZoomRotate);
    doubleClickZoom = input(this.initialMapOptions?.doubleClickZoom);
    keyboard = input(this.initialMapOptions?.keyboard);
    dragPan = input(this.initialMapOptions?.dragPan);
    boxZoom = input(this.initialMapOptions?.boxZoom);
    style = input(this.initialMapOptions?.style);
    center = input(this.initialMapOptions?.center);
    maxBounds = input(this.initialMapOptions?.maxBounds);
    zoom = input(this.initialMapOptions?.zoom != null ? [this.initialMapOptions.zoom] : undefined);
    bearing = input(this.initialMapOptions?.bearing != null ? [this.initialMapOptions.bearing] : undefined);
    pitch = input(this.initialMapOptions?.pitch != null ? [this.initialMapOptions.pitch] : undefined);
    // First value goes to options.fitBoundsOptions. Subsequents changes are passed to fitBounds
    fitBoundsOptions = input(this.initialMapOptions?.fitBoundsOptions);
    renderWorldCopies = input(this.initialMapOptions?.renderWorldCopies);
    projection = input(this.initialMapOptions?.projection);
    /* Added by ngx-mapbox-gl */
    movingMethod = input('flyTo');
    movingOptions = input();
    // => First value is a alias to bounds input (since mapbox 0.53.0). Subsequents changes are passed to fitBounds
    fitBounds = input();
    fitScreenCoordinates = input();
    centerWithPanTo = input();
    panToOptions = input();
    cursorStyle = input();
    // resizeEmitter = new Subject<MapEvent>();
    // mapResize = outputFromObservable(this.mapResizeEmitter);
    mapResize = new EventEmitter();
    mapRemove = new EventEmitter();
    mapMouseDown = new EventEmitter();
    mapMouseUp = new EventEmitter();
    mapMouseMove = new EventEmitter();
    mapClick = new EventEmitter();
    mapDblClick = new EventEmitter();
    mapMouseOver = new EventEmitter();
    mapMouseOut = new EventEmitter();
    mapContextMenu = new EventEmitter();
    mapTouchStart = new EventEmitter();
    mapTouchEnd = new EventEmitter();
    mapTouchMove = new EventEmitter();
    mapTouchCancel = new EventEmitter();
    mapWheel = new EventEmitter();
    moveStart = new EventEmitter();
    move = new EventEmitter();
    moveEnd = new EventEmitter();
    mapDragStart = new EventEmitter();
    mapDrag = new EventEmitter();
    mapDragEnd = new EventEmitter();
    zoomStart = new EventEmitter();
    zoomEvt = new EventEmitter();
    zoomEnd = new EventEmitter();
    rotateStart = new EventEmitter();
    rotate = new EventEmitter();
    rotateEnd = new EventEmitter();
    pitchStart = new EventEmitter();
    pitchEvt = new EventEmitter();
    pitchEnd = new EventEmitter();
    boxZoomStart = new EventEmitter();
    boxZoomEnd = new EventEmitter();
    boxZoomCancel = new EventEmitter();
    webGlContextLost = new EventEmitter();
    webGlContextRestored = new EventEmitter();
    mapLoad = new EventEmitter();
    mapCreate = new EventEmitter();
    idle = new EventEmitter();
    render = new EventEmitter();
    mapError = new EventEmitter();
    data = new EventEmitter();
    styleData = new EventEmitter();
    sourceData = new EventEmitter();
    dataLoading = new EventEmitter();
    styleDataLoading = new EventEmitter();
    sourceDataLoading = new EventEmitter();
    styleImageMissing = new EventEmitter();
    get mapInstance() {
        return this.mapService.mapInstance;
    }
    mapContainer;
    constructor() {
        afterNextRender(() => {
            this.mapService.setup({
                accessToken: this.accessToken(),
                mapOptions: {
                    collectResourceTiming: this.collectResourceTiming(),
                    container: this.mapContainer.nativeElement,
                    crossSourceCollisions: this.crossSourceCollisions(),
                    fadeDuration: this.fadeDuration(),
                    minZoom: this.minZoom(),
                    maxZoom: this.maxZoom(),
                    minPitch: this.minPitch(),
                    maxPitch: this.maxPitch(),
                    style: this.style(),
                    hash: this.hash(),
                    interactive: this.interactive(),
                    bearingSnap: this.bearingSnap(),
                    pitchWithRotate: this.pitchWithRotate(),
                    clickTolerance: this.clickTolerance(),
                    attributionControl: this.attributionControl(),
                    logoPosition: this.logoPosition(),
                    failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat(),
                    preserveDrawingBuffer: this.preserveDrawingBuffer(),
                    refreshExpiredTiles: this.refreshExpiredTiles(),
                    maxBounds: this.maxBounds(),
                    scrollZoom: this.scrollZoom(),
                    boxZoom: this.boxZoom(),
                    dragRotate: this.dragRotate(),
                    dragPan: this.dragPan(),
                    keyboard: this.keyboard(),
                    doubleClickZoom: this.doubleClickZoom(),
                    touchPitch: this.touchPitch(),
                    touchZoomRotate: this.touchZoomRotate(),
                    trackResize: this.trackResize(),
                    center: this.center(),
                    zoom: this.zoom(),
                    bearing: this.bearing(),
                    pitch: this.pitch(),
                    renderWorldCopies: this.renderWorldCopies(),
                    maxTileCacheSize: this.maxTileCacheSize(),
                    localIdeographFontFamily: this.localIdeographFontFamily(),
                    transformRequest: this.transformRequest(),
                    bounds: this.bounds() ? this.bounds() : this.fitBounds(),
                    fitBoundsOptions: this.fitBoundsOptions(),
                    antialias: this.antialias(),
                    locale: this.locale(),
                    cooperativeGestures: this.cooperativeGestures(),
                    projection: this.projection(),
                },
                mapEvents: this,
            });
            if (this.cursorStyle()) {
                this.mapService.changeCanvasCursor(this.cursorStyle());
            }
        });
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
            this.mapService.fitBounds(changes['fitBounds'].currentValue, this.fitBoundsOptions());
        }
        if (changes['fitScreenCoordinates'] &&
            changes['fitScreenCoordinates'].currentValue) {
            if ((this.center() || this.zoom() || this.pitch() || this.fitBounds()) &&
                changes['fitScreenCoordinates'].isFirstChange()) {
                console.warn('[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input');
            }
            this.mapService.fitScreenCoordinates(changes['fitScreenCoordinates'].currentValue, this.bearing() ? this.bearing()[0] : 0, this.movingOptions());
        }
        if (this.centerWithPanTo() &&
            changes['center'] &&
            !changes['center'].isFirstChange() &&
            !changes['zoom'] &&
            !changes['bearing'] &&
            !changes['pitch']) {
            this.mapService.panTo(this.center(), this.panToOptions());
        }
        else if ((changes['center'] && !changes['center'].isFirstChange()) ||
            (changes['zoom'] && !changes['zoom'].isFirstChange()) ||
            (changes['bearing'] &&
                !changes['bearing'].isFirstChange() &&
                !changes['fitScreenCoordinates']) ||
            (changes['pitch'] && !changes['pitch'].isFirstChange())) {
            this.mapService.move(this.movingMethod(), this.movingOptions(), changes['zoom'] && this.zoom() ? this.zoom()[0] : undefined, changes['center'] ? this.center() : undefined, changes['bearing'] && this.bearing() ? this.bearing()[0] : undefined, changes['pitch'] && this.pitch() ? this.pitch()[0] : undefined);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MapComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: MapComponent, isStandalone: true, selector: "mgl-map", inputs: { accessToken: { classPropertyName: "accessToken", publicName: "accessToken", isSignal: true, isRequired: false, transformFunction: null }, collectResourceTiming: { classPropertyName: "collectResourceTiming", publicName: "collectResourceTiming", isSignal: true, isRequired: false, transformFunction: null }, crossSourceCollisions: { classPropertyName: "crossSourceCollisions", publicName: "crossSourceCollisions", isSignal: true, isRequired: false, transformFunction: null }, fadeDuration: { classPropertyName: "fadeDuration", publicName: "fadeDuration", isSignal: true, isRequired: false, transformFunction: null }, hash: { classPropertyName: "hash", publicName: "hash", isSignal: true, isRequired: false, transformFunction: null }, refreshExpiredTiles: { classPropertyName: "refreshExpiredTiles", publicName: "refreshExpiredTiles", isSignal: true, isRequired: false, transformFunction: null }, failIfMajorPerformanceCaveat: { classPropertyName: "failIfMajorPerformanceCaveat", publicName: "failIfMajorPerformanceCaveat", isSignal: true, isRequired: false, transformFunction: null }, bearingSnap: { classPropertyName: "bearingSnap", publicName: "bearingSnap", isSignal: true, isRequired: false, transformFunction: null }, interactive: { classPropertyName: "interactive", publicName: "interactive", isSignal: true, isRequired: false, transformFunction: null }, pitchWithRotate: { classPropertyName: "pitchWithRotate", publicName: "pitchWithRotate", isSignal: true, isRequired: false, transformFunction: null }, clickTolerance: { classPropertyName: "clickTolerance", publicName: "clickTolerance", isSignal: true, isRequired: false, transformFunction: null }, attributionControl: { classPropertyName: "attributionControl", publicName: "attributionControl", isSignal: true, isRequired: false, transformFunction: null }, logoPosition: { classPropertyName: "logoPosition", publicName: "logoPosition", isSignal: true, isRequired: false, transformFunction: null }, maxTileCacheSize: { classPropertyName: "maxTileCacheSize", publicName: "maxTileCacheSize", isSignal: true, isRequired: false, transformFunction: null }, localIdeographFontFamily: { classPropertyName: "localIdeographFontFamily", publicName: "localIdeographFontFamily", isSignal: true, isRequired: false, transformFunction: null }, preserveDrawingBuffer: { classPropertyName: "preserveDrawingBuffer", publicName: "preserveDrawingBuffer", isSignal: true, isRequired: false, transformFunction: null }, trackResize: { classPropertyName: "trackResize", publicName: "trackResize", isSignal: true, isRequired: false, transformFunction: null }, transformRequest: { classPropertyName: "transformRequest", publicName: "transformRequest", isSignal: true, isRequired: false, transformFunction: null }, bounds: { classPropertyName: "bounds", publicName: "bounds", isSignal: true, isRequired: false, transformFunction: null }, antialias: { classPropertyName: "antialias", publicName: "antialias", isSignal: true, isRequired: false, transformFunction: null }, locale: { classPropertyName: "locale", publicName: "locale", isSignal: true, isRequired: false, transformFunction: null }, cooperativeGestures: { classPropertyName: "cooperativeGestures", publicName: "cooperativeGestures", isSignal: true, isRequired: false, transformFunction: null }, minZoom: { classPropertyName: "minZoom", publicName: "minZoom", isSignal: true, isRequired: false, transformFunction: null }, maxZoom: { classPropertyName: "maxZoom", publicName: "maxZoom", isSignal: true, isRequired: false, transformFunction: null }, minPitch: { classPropertyName: "minPitch", publicName: "minPitch", isSignal: true, isRequired: false, transformFunction: null }, maxPitch: { classPropertyName: "maxPitch", publicName: "maxPitch", isSignal: true, isRequired: false, transformFunction: null }, scrollZoom: { classPropertyName: "scrollZoom", publicName: "scrollZoom", isSignal: true, isRequired: false, transformFunction: null }, dragRotate: { classPropertyName: "dragRotate", publicName: "dragRotate", isSignal: true, isRequired: false, transformFunction: null }, touchPitch: { classPropertyName: "touchPitch", publicName: "touchPitch", isSignal: true, isRequired: false, transformFunction: null }, touchZoomRotate: { classPropertyName: "touchZoomRotate", publicName: "touchZoomRotate", isSignal: true, isRequired: false, transformFunction: null }, doubleClickZoom: { classPropertyName: "doubleClickZoom", publicName: "doubleClickZoom", isSignal: true, isRequired: false, transformFunction: null }, keyboard: { classPropertyName: "keyboard", publicName: "keyboard", isSignal: true, isRequired: false, transformFunction: null }, dragPan: { classPropertyName: "dragPan", publicName: "dragPan", isSignal: true, isRequired: false, transformFunction: null }, boxZoom: { classPropertyName: "boxZoom", publicName: "boxZoom", isSignal: true, isRequired: false, transformFunction: null }, style: { classPropertyName: "style", publicName: "style", isSignal: true, isRequired: false, transformFunction: null }, center: { classPropertyName: "center", publicName: "center", isSignal: true, isRequired: false, transformFunction: null }, maxBounds: { classPropertyName: "maxBounds", publicName: "maxBounds", isSignal: true, isRequired: false, transformFunction: null }, zoom: { classPropertyName: "zoom", publicName: "zoom", isSignal: true, isRequired: false, transformFunction: null }, bearing: { classPropertyName: "bearing", publicName: "bearing", isSignal: true, isRequired: false, transformFunction: null }, pitch: { classPropertyName: "pitch", publicName: "pitch", isSignal: true, isRequired: false, transformFunction: null }, fitBoundsOptions: { classPropertyName: "fitBoundsOptions", publicName: "fitBoundsOptions", isSignal: true, isRequired: false, transformFunction: null }, renderWorldCopies: { classPropertyName: "renderWorldCopies", publicName: "renderWorldCopies", isSignal: true, isRequired: false, transformFunction: null }, projection: { classPropertyName: "projection", publicName: "projection", isSignal: true, isRequired: false, transformFunction: null }, movingMethod: { classPropertyName: "movingMethod", publicName: "movingMethod", isSignal: true, isRequired: false, transformFunction: null }, movingOptions: { classPropertyName: "movingOptions", publicName: "movingOptions", isSignal: true, isRequired: false, transformFunction: null }, fitBounds: { classPropertyName: "fitBounds", publicName: "fitBounds", isSignal: true, isRequired: false, transformFunction: null }, fitScreenCoordinates: { classPropertyName: "fitScreenCoordinates", publicName: "fitScreenCoordinates", isSignal: true, isRequired: false, transformFunction: null }, centerWithPanTo: { classPropertyName: "centerWithPanTo", publicName: "centerWithPanTo", isSignal: true, isRequired: false, transformFunction: null }, panToOptions: { classPropertyName: "panToOptions", publicName: "panToOptions", isSignal: true, isRequired: false, transformFunction: null }, cursorStyle: { classPropertyName: "cursorStyle", publicName: "cursorStyle", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { mapResize: "mapResize", mapRemove: "mapRemove", mapMouseDown: "mapMouseDown", mapMouseUp: "mapMouseUp", mapMouseMove: "mapMouseMove", mapClick: "mapClick", mapDblClick: "mapDblClick", mapMouseOver: "mapMouseOver", mapMouseOut: "mapMouseOut", mapContextMenu: "mapContextMenu", mapTouchStart: "mapTouchStart", mapTouchEnd: "mapTouchEnd", mapTouchMove: "mapTouchMove", mapTouchCancel: "mapTouchCancel", mapWheel: "mapWheel", moveStart: "moveStart", move: "move", moveEnd: "moveEnd", mapDragStart: "mapDragStart", mapDrag: "mapDrag", mapDragEnd: "mapDragEnd", zoomStart: "zoomStart", zoomEvt: "zoomEvt", zoomEnd: "zoomEnd", rotateStart: "rotateStart", rotate: "rotate", rotateEnd: "rotateEnd", pitchStart: "pitchStart", pitchEvt: "pitchEvt", pitchEnd: "pitchEnd", boxZoomStart: "boxZoomStart", boxZoomEnd: "boxZoomEnd", boxZoomCancel: "boxZoomCancel", webGlContextLost: "webGlContextLost", webGlContextRestored: "webGlContextRestored", mapLoad: "mapLoad", mapCreate: "mapCreate", idle: "idle", render: "render", mapError: "mapError", data: "data", styleData: "styleData", sourceData: "sourceData", dataLoading: "dataLoading", styleDataLoading: "styleDataLoading", sourceDataLoading: "sourceDataLoading", styleImageMissing: "styleImageMissing" }, providers: [MapService], viewQueries: [{ propertyName: "mapContainer", first: true, predicate: ["container"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #container></div>', isInline: true, styles: [":host{display:block}div{height:100%;width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MapComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, selector: 'mgl-map', template: '<div #container></div>', providers: [MapService], changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}div{height:100%;width:100%}\n"] }]
        }], ctorParameters: () => [], propDecorators: { mapResize: [{
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
            }], mapContainer: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL21hcC9tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxlQUFlLEVBQ2YsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUdaLE1BQU0sRUFFTixTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssRUFDTCxjQUFjLEdBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUF5QjFEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sb0NBQW9DLEdBQUcsSUFBSSxjQUFjLENBQW9DLG1DQUFtQyxDQUFDLENBQUM7QUFvQi9JLE1BQU0sT0FBTyxZQUFZO0lBRU4sVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsb0NBQW9DLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUV0RyxpQkFBaUI7SUFDakIsV0FBVyxHQUFHLEtBQUssQ0FBNEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BGLHFCQUFxQixHQUFHLEtBQUssQ0FBc0MsSUFBSSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDbEgscUJBQXFCLEdBQUcsS0FBSyxDQUFzQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUNsSCxZQUFZLEdBQUcsS0FBSyxDQUE2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdkYsSUFBSSxHQUFHLEtBQUssQ0FBcUIsSUFBSSxD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QUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUNHLG9CQUFvQjtzQkFBN0IsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNO2dCQUNHLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csSUFBSTtzQkFBYixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBQ0csaUJBQWlCO3NCQUExQixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFRbUMsWUFBWTtzQkFBckQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYWZ0ZXJOZXh0UmVuZGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgaW5qZWN0LFxuICBpbnB1dCxcbiAgSW5qZWN0aW9uVG9rZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbGFzdFZhbHVlRnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSwgTW92aW5nT3B0aW9ucyB9IGZyb20gJy4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHR5cGUge1xuICBBbmltYXRpb25PcHRpb25zLFxuICBMbmdMYXRCb3VuZHNMaWtlLFxuICBNYXAsXG4gIE1hcENvbnRleHRFdmVudCxcbiAgTWFwRGF0YUV2ZW50LFxuICBNYXBFdmVudCxcbiAgTWFwRXZlbnRzLFxuICBNYXBNb3VzZUV2ZW50LFxuICBNYXBPcHRpb25zLFxuICBNYXBTb3VyY2VEYXRhRXZlbnQsXG4gIE1hcFN0eWxlRGF0YUV2ZW50LFxuICBNYXBUb3VjaEV2ZW50LFxuICBNYXBXaGVlbEV2ZW50LFxuICBQb2ludExpa2UsXG59IGZyb20gJ21hcGJveC1nbCc7XG5cbi8qKlxuICogRGVmYXVsdCBvcHRpb25zIGZvciB0aGUgTWFwQ29tcG9uZW50LlxuICogXG4gKiBAc2VlIE1BUF9DT01QT05FTlRfSU5JVElBTElaQVRJT05fT1BUSU9OU1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hcENvbXBvbmVudEluaXRpYWxpemF0aW9uT3B0aW9ucyBleHRlbmRzIE1hcE9wdGlvbnMgeyB9XG5cbi8qKlxuICogSW5qZWN0aW9uVG9rZW4gdXNlZCBmb3IgaW5qZWN0aW5nIGRlZmF1bHQgb3B0aW9ucyB0byB0aGUgTWFwQ29tcG9uZW50IGJlZm9yZSBpdCBpbml0aWFsaXplcy5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BUF9DT01QT05FTlRfSU5JVElBTElaQVRJT05fT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXBDb21wb25lbnRJbml0aWFsaXphdGlvbk9wdGlvbnM+KCdNYXBDb21wb25lbnRJbml0aWFsaXphdGlvbk9wdGlvbnMnKTtcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnbWdsLW1hcCcsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGFpbmVyPjwvZGl2PicsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgICBkaXYge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG4gIHByb3ZpZGVyczogW01hcFNlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbWFwU2VydmljZSA9IGluamVjdChNYXBTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbml0aWFsTWFwT3B0aW9ucyA9IGluamVjdChNQVBfQ09NUE9ORU5UX0lOSVRJQUxJWkFUSU9OX09QVElPTlMsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG5cbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgYWNjZXNzVG9rZW4gPSBpbnB1dDxNYXBPcHRpb25zWydhY2Nlc3NUb2tlbiddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5hY2Nlc3NUb2tlbik7XG4gIGNvbGxlY3RSZXNvdXJjZVRpbWluZyA9IGlucHV0PE1hcE9wdGlvbnNbJ2NvbGxlY3RSZXNvdXJjZVRpbWluZyddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5jb2xsZWN0UmVzb3VyY2VUaW1pbmcpO1xuICBjcm9zc1NvdXJjZUNvbGxpc2lvbnMgPSBpbnB1dDxNYXBPcHRpb25zWydjcm9zc1NvdXJjZUNvbGxpc2lvbnMnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uY3Jvc3NTb3VyY2VDb2xsaXNpb25zKTtcbiAgZmFkZUR1cmF0aW9uID0gaW5wdXQ8TWFwT3B0aW9uc1snZmFkZUR1cmF0aW9uJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LmZhZGVEdXJhdGlvbik7XG4gIGhhc2ggPSBpbnB1dDxNYXBPcHRpb25zWydoYXNoJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/Lmhhc2gpO1xuICByZWZyZXNoRXhwaXJlZFRpbGVzID0gaW5wdXQ8TWFwT3B0aW9uc1sncmVmcmVzaEV4cGlyZWRUaWxlcyddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5yZWZyZXNoRXhwaXJlZFRpbGVzKTtcbiAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdCA9XG4gICAgaW5wdXQ8TWFwT3B0aW9uc1snZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdCddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5mYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0KTtcbiAgYmVhcmluZ1NuYXAgPSBpbnB1dDxNYXBPcHRpb25zWydiZWFyaW5nU25hcCddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5iZWFyaW5nU25hcCk7XG4gIGludGVyYWN0aXZlID0gaW5wdXQ8TWFwT3B0aW9uc1snaW50ZXJhY3RpdmUnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uaW50ZXJhY3RpdmUpO1xuICBwaXRjaFdpdGhSb3RhdGUgPSBpbnB1dDxNYXBPcHRpb25zWydwaXRjaFdpdGhSb3RhdGUnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8ucGl0Y2hXaXRoUm90YXRlKTtcbiAgY2xpY2tUb2xlcmFuY2UgPSBpbnB1dDxNYXBPcHRpb25zWydjbGlja1RvbGVyYW5jZSddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5jbGlja1RvbGVyYW5jZSk7XG4gIGF0dHJpYnV0aW9uQ29udHJvbCA9IGlucHV0PE1hcE9wdGlvbnNbJ2F0dHJpYnV0aW9uQ29udHJvbCddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5hdHRyaWJ1dGlvbkNvbnRyb2wpO1xuICBsb2dvUG9zaXRpb24gPSBpbnB1dDxNYXBPcHRpb25zWydsb2dvUG9zaXRpb24nXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8ubG9nb1Bvc2l0aW9uKTtcbiAgbWF4VGlsZUNhY2hlU2l6ZSA9IGlucHV0PE1hcE9wdGlvbnNbJ21heFRpbGVDYWNoZVNpemUnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8ubWF4VGlsZUNhY2hlU2l6ZSk7XG4gIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseSA9IGlucHV0PE1hcE9wdGlvbnNbJ2xvY2FsSWRlb2dyYXBoRm9udEZhbWlseSddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5sb2NhbElkZW9ncmFwaEZvbnRGYW1pbHkpO1xuICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXIgPSBpbnB1dDxNYXBPcHRpb25zWydwcmVzZXJ2ZURyYXdpbmdCdWZmZXInXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8ucHJlc2VydmVEcmF3aW5nQnVmZmVyKTtcbiAgdHJhY2tSZXNpemUgPSBpbnB1dDxNYXBPcHRpb25zWyd0cmFja1Jlc2l6ZSddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy50cmFja1Jlc2l6ZSk7XG4gIHRyYW5zZm9ybVJlcXVlc3QgPSBpbnB1dDxNYXBPcHRpb25zWyd0cmFuc2Zvcm1SZXF1ZXN0J10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LnRyYW5zZm9ybVJlcXVlc3QpO1xuICBib3VuZHMgPSBpbnB1dDxNYXBPcHRpb25zWydib3VuZHMnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uYm91bmRzKTsgLy8gVXNlIGZpdEJvdW5kcyBmb3IgZHluYW1pYyBpbnB1dFxuICBhbnRpYWxpYXMgPSBpbnB1dDxNYXBPcHRpb25zWydhbnRpYWxpYXMnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uYW50aWFsaWFzKTtcbiAgbG9jYWxlID0gaW5wdXQ8TWFwT3B0aW9uc1snbG9jYWxlJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LmxvY2FsZSk7XG4gIGNvb3BlcmF0aXZlR2VzdHVyZXMgPSBpbnB1dDxNYXBPcHRpb25zWydjb29wZXJhdGl2ZUdlc3R1cmVzJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LmNvb3BlcmF0aXZlR2VzdHVyZXMpO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIG1pblpvb20gPSBpbnB1dDxNYXBPcHRpb25zWydtaW5ab29tJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/Lm1pblpvb20pO1xuICBtYXhab29tID0gaW5wdXQ8TWFwT3B0aW9uc1snbWF4Wm9vbSddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5tYXhab29tKTtcbiAgbWluUGl0Y2ggPSBpbnB1dDxNYXBPcHRpb25zWydtaW5QaXRjaCddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5taW5QaXRjaCk7XG4gIG1heFBpdGNoID0gaW5wdXQ8TWFwT3B0aW9uc1snbWF4UGl0Y2gnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8ubWF4UGl0Y2gpO1xuICBzY3JvbGxab29tID0gaW5wdXQ8TWFwT3B0aW9uc1snc2Nyb2xsWm9vbSddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5zY3JvbGxab29tKTtcbiAgZHJhZ1JvdGF0ZSA9IGlucHV0PE1hcE9wdGlvbnNbJ2RyYWdSb3RhdGUnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uZHJhZ1JvdGF0ZSk7XG4gIHRvdWNoUGl0Y2ggPSBpbnB1dDxNYXBPcHRpb25zWyd0b3VjaFBpdGNoJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LnRvdWNoUGl0Y2gpO1xuICB0b3VjaFpvb21Sb3RhdGUgPSBpbnB1dDxNYXBPcHRpb25zWyd0b3VjaFpvb21Sb3RhdGUnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8udG91Y2hab29tUm90YXRlKTtcbiAgZG91YmxlQ2xpY2tab29tID0gaW5wdXQ8TWFwT3B0aW9uc1snZG91YmxlQ2xpY2tab29tJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LmRvdWJsZUNsaWNrWm9vbSk7XG4gIGtleWJvYXJkID0gaW5wdXQ8TWFwT3B0aW9uc1sna2V5Ym9hcmQnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8ua2V5Ym9hcmQpO1xuICBkcmFnUGFuID0gaW5wdXQ8TWFwT3B0aW9uc1snZHJhZ1BhbiddPih0aGlzLmluaXRpYWxNYXBPcHRpb25zPy5kcmFnUGFuKTtcbiAgYm94Wm9vbSA9IGlucHV0PE1hcE9wdGlvbnNbJ2JveFpvb20nXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uYm94Wm9vbSk7XG4gIHN0eWxlID0gaW5wdXQ8TWFwT3B0aW9uc1snc3R5bGUnXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uc3R5bGUpO1xuICBjZW50ZXIgPSBpbnB1dDxNYXBPcHRpb25zWydjZW50ZXInXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uY2VudGVyKTtcbiAgbWF4Qm91bmRzID0gaW5wdXQ8TWFwT3B0aW9uc1snbWF4Qm91bmRzJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/Lm1heEJvdW5kcyk7XG4gIHpvb20gPSBpbnB1dDxbbnVtYmVyXSB8IHVuZGVmaW5lZD4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8uem9vbSAhPSBudWxsID8gW3RoaXMuaW5pdGlhbE1hcE9wdGlvbnMuem9vbV0gOiB1bmRlZmluZWQpO1xuICBiZWFyaW5nID0gaW5wdXQ8W251bWJlcl0gfCB1bmRlZmluZWQ+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LmJlYXJpbmcgIT0gbnVsbCA/IFt0aGlzLmluaXRpYWxNYXBPcHRpb25zLmJlYXJpbmddIDogdW5kZWZpbmVkKTtcbiAgcGl0Y2ggPSBpbnB1dDxbbnVtYmVyXSB8IHVuZGVmaW5lZD4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8ucGl0Y2ggIT0gbnVsbCA/IFt0aGlzLmluaXRpYWxNYXBPcHRpb25zLnBpdGNoXSA6IHVuZGVmaW5lZCk7XG4gIC8vIEZpcnN0IHZhbHVlIGdvZXMgdG8gb3B0aW9ucy5maXRCb3VuZHNPcHRpb25zLiBTdWJzZXF1ZW50cyBjaGFuZ2VzIGFyZSBwYXNzZWQgdG8gZml0Qm91bmRzXG4gIGZpdEJvdW5kc09wdGlvbnMgPSBpbnB1dDxNYXBPcHRpb25zWydmaXRCb3VuZHNPcHRpb25zJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LmZpdEJvdW5kc09wdGlvbnMpO1xuICByZW5kZXJXb3JsZENvcGllcyA9IGlucHV0PE1hcE9wdGlvbnNbJ3JlbmRlcldvcmxkQ29waWVzJ10+KHRoaXMuaW5pdGlhbE1hcE9wdGlvbnM/LnJlbmRlcldvcmxkQ29waWVzKTtcbiAgcHJvamVjdGlvbiA9IGlucHV0PE1hcE9wdGlvbnNbJ3Byb2plY3Rpb24nXT4odGhpcy5pbml0aWFsTWFwT3B0aW9ucz8ucHJvamVjdGlvbik7XG4gIC8qIEFkZGVkIGJ5IG5neC1tYXBib3gtZ2wgKi9cbiAgbW92aW5nTWV0aG9kID0gaW5wdXQ8J2p1bXBUbycgfCAnZWFzZVRvJyB8ICdmbHlUbyc+KCdmbHlUbycpO1xuICBtb3ZpbmdPcHRpb25zID0gaW5wdXQ8TW92aW5nT3B0aW9ucz4oKTtcbiAgLy8gPT4gRmlyc3QgdmFsdWUgaXMgYSBhbGlhcyB0byBib3VuZHMgaW5wdXQgKHNpbmNlIG1hcGJveCAwLjUzLjApLiBTdWJzZXF1ZW50cyBjaGFuZ2VzIGFyZSBwYXNzZWQgdG8gZml0Qm91bmRzXG4gIGZpdEJvdW5kcyA9IGlucHV0PExuZ0xhdEJvdW5kc0xpa2U+KCk7XG4gIGZpdFNjcmVlbkNvb3JkaW5hdGVzID0gaW5wdXQ8W1BvaW50TGlrZSwgUG9pbnRMaWtlXT4oKTtcbiAgY2VudGVyV2l0aFBhblRvID0gaW5wdXQ8Ym9vbGVhbj4oKTtcbiAgcGFuVG9PcHRpb25zID0gaW5wdXQ8QW5pbWF0aW9uT3B0aW9ucz4oKTtcbiAgY3Vyc29yU3R5bGUgPSBpbnB1dDxzdHJpbmc+KCk7XG5cbiAgLy8gcmVzaXplRW1pdHRlciA9IG5ldyBTdWJqZWN0PE1hcEV2ZW50PigpO1xuICAvLyBtYXBSZXNpemUgPSBvdXRwdXRGcm9tT2JzZXJ2YWJsZSh0aGlzLm1hcFJlc2l6ZUVtaXR0ZXIpO1xuICBAT3V0cHV0KCkgbWFwUmVzaXplID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1hcFJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtYXBNb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtYXBNb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbWFwTW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbWFwQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtYXBEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1hcE1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1hcE1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbWFwQ29udGV4dE1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtYXBUb3VjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgbWFwVG91Y2hFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtYXBUb3VjaE1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtYXBUb3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1hcFdoZWVsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBXaGVlbEV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW92ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudHNbJ21vdmVzdGFydCddPigpO1xuICBAT3V0cHV0KCkgbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRzWydtb3ZlJ10+KCk7XG4gIEBPdXRwdXQoKSBtb3ZlRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudHNbJ21vdmVlbmQnXT4oKTtcbiAgQE91dHB1dCgpIG1hcERyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRzWydkcmFnc3RhcnQnXT4oKTtcbiAgQE91dHB1dCgpIG1hcERyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50c1snZHJhZyddPigpO1xuICBAT3V0cHV0KCkgbWFwRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRzWydkcmFnZW5kJ10+KCk7XG4gIEBPdXRwdXQoKSB6b29tU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSB6b29tRXZ0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgem9vbUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBFdmVudHNbJ3JvdGF0ZXN0YXJ0J10+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50c1sncm90YXRlJ10+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50c1sncm90YXRlZW5kJ10+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcGl0Y2hFdnQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRzWydib3h6b29tc3RhcnQnXT4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEV2ZW50c1snYm94em9vbWVuZCddPigpO1xuICBAT3V0cHV0KCkgYm94Wm9vbUNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnRzWydib3h6b29tY2FuY2VsJ10+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRMb3N0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBDb250ZXh0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRSZXN0b3JlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwQ29udGV4dEV2ZW50PigpO1xuICBAT3V0cHV0KCkgbWFwTG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtYXBDcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcD4oKTtcbiAgQE91dHB1dCgpIGlkbGUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBtYXBFcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3I+KCk7XG4gIEBPdXRwdXQoKSBkYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBEYXRhRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBzdHlsZURhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFN0eWxlRGF0YUV2ZW50PigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwU291cmNlRGF0YUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcERhdGFFdmVudD4oKTtcbiAgQE91dHB1dCgpIHN0eWxlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFN0eWxlRGF0YUV2ZW50PigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFNvdXJjZURhdGFFdmVudD4oKTtcbiAgQE91dHB1dCgpIHN0eWxlSW1hZ2VNaXNzaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXBFdmVudHNbJ3N0eWxlaW1hZ2VtaXNzaW5nJ11cbiAgPigpO1xuXG4gIGdldCBtYXBJbnN0YW5jZSgpOiBNYXAge1xuICAgIHJldHVybiB0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2U7XG4gIH1cblxuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBtYXBDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgYWZ0ZXJOZXh0UmVuZGVyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5zZXR1cCh7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuKCksXG4gICAgICAgIG1hcE9wdGlvbnM6IHtcbiAgICAgICAgICBjb2xsZWN0UmVzb3VyY2VUaW1pbmc6IHRoaXMuY29sbGVjdFJlc291cmNlVGltaW5nKCksXG4gICAgICAgICAgY29udGFpbmVyOiB0aGlzLm1hcENvbnRhaW5lci5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgIGNyb3NzU291cmNlQ29sbGlzaW9uczogdGhpcy5jcm9zc1NvdXJjZUNvbGxpc2lvbnMoKSxcbiAgICAgICAgICBmYWRlRHVyYXRpb246IHRoaXMuZmFkZUR1cmF0aW9uKCksXG4gICAgICAgICAgbWluWm9vbTogdGhpcy5taW5ab29tKCksXG4gICAgICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tKCksXG4gICAgICAgICAgbWluUGl0Y2g6IHRoaXMubWluUGl0Y2goKSxcbiAgICAgICAgICBtYXhQaXRjaDogdGhpcy5tYXhQaXRjaCgpLFxuICAgICAgICAgIHN0eWxlOiB0aGlzLnN0eWxlKCksXG4gICAgICAgICAgaGFzaDogdGhpcy5oYXNoKCksXG4gICAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMuaW50ZXJhY3RpdmUoKSxcbiAgICAgICAgICBiZWFyaW5nU25hcDogdGhpcy5iZWFyaW5nU25hcCgpLFxuICAgICAgICAgIHBpdGNoV2l0aFJvdGF0ZTogdGhpcy5waXRjaFdpdGhSb3RhdGUoKSxcbiAgICAgICAgICBjbGlja1RvbGVyYW5jZTogdGhpcy5jbGlja1RvbGVyYW5jZSgpLFxuICAgICAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogdGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2woKSxcbiAgICAgICAgICBsb2dvUG9zaXRpb246IHRoaXMubG9nb1Bvc2l0aW9uKCksXG4gICAgICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdDogdGhpcy5mYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0KCksXG4gICAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0aGlzLnByZXNlcnZlRHJhd2luZ0J1ZmZlcigpLFxuICAgICAgICAgIHJlZnJlc2hFeHBpcmVkVGlsZXM6IHRoaXMucmVmcmVzaEV4cGlyZWRUaWxlcygpLFxuICAgICAgICAgIG1heEJvdW5kczogdGhpcy5tYXhCb3VuZHMoKSxcbiAgICAgICAgICBzY3JvbGxab29tOiB0aGlzLnNjcm9sbFpvb20oKSxcbiAgICAgICAgICBib3hab29tOiB0aGlzLmJveFpvb20oKSxcbiAgICAgICAgICBkcmFnUm90YXRlOiB0aGlzLmRyYWdSb3RhdGUoKSxcbiAgICAgICAgICBkcmFnUGFuOiB0aGlzLmRyYWdQYW4oKSxcbiAgICAgICAgICBrZXlib2FyZDogdGhpcy5rZXlib2FyZCgpLFxuICAgICAgICAgIGRvdWJsZUNsaWNrWm9vbTogdGhpcy5kb3VibGVDbGlja1pvb20oKSxcbiAgICAgICAgICB0b3VjaFBpdGNoOiB0aGlzLnRvdWNoUGl0Y2goKSxcbiAgICAgICAgICB0b3VjaFpvb21Sb3RhdGU6IHRoaXMudG91Y2hab29tUm90YXRlKCksXG4gICAgICAgICAgdHJhY2tSZXNpemU6IHRoaXMudHJhY2tSZXNpemUoKSxcbiAgICAgICAgICBjZW50ZXI6IHRoaXMuY2VudGVyKCksXG4gICAgICAgICAgem9vbTogdGhpcy56b29tKCksXG4gICAgICAgICAgYmVhcmluZzogdGhpcy5iZWFyaW5nKCksXG4gICAgICAgICAgcGl0Y2g6IHRoaXMucGl0Y2goKSxcbiAgICAgICAgICByZW5kZXJXb3JsZENvcGllczogdGhpcy5yZW5kZXJXb3JsZENvcGllcygpLFxuICAgICAgICAgIG1heFRpbGVDYWNoZVNpemU6IHRoaXMubWF4VGlsZUNhY2hlU2l6ZSgpLFxuICAgICAgICAgIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseTogdGhpcy5sb2NhbElkZW9ncmFwaEZvbnRGYW1pbHkoKSxcbiAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiB0aGlzLnRyYW5zZm9ybVJlcXVlc3QoKSxcbiAgICAgICAgICBib3VuZHM6IHRoaXMuYm91bmRzKCkgPyB0aGlzLmJvdW5kcygpISA6IHRoaXMuZml0Qm91bmRzKCksXG4gICAgICAgICAgZml0Qm91bmRzT3B0aW9uczogdGhpcy5maXRCb3VuZHNPcHRpb25zKCksXG4gICAgICAgICAgYW50aWFsaWFzOiB0aGlzLmFudGlhbGlhcygpLFxuICAgICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUoKSxcbiAgICAgICAgICBjb29wZXJhdGl2ZUdlc3R1cmVzOiB0aGlzLmNvb3BlcmF0aXZlR2VzdHVyZXMoKSxcbiAgICAgICAgICBwcm9qZWN0aW9uOiB0aGlzLnByb2plY3Rpb24oKSxcbiAgICAgICAgfSxcbiAgICAgICAgbWFwRXZlbnRzOiB0aGlzLFxuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5jdXJzb3JTdHlsZSgpKSB7XG4gICAgICAgIHRoaXMubWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IodGhpcy5jdXJzb3JTdHlsZSgpISk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UuZGVzdHJveU1hcCgpO1xuICB9XG5cbiAgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGF3YWl0IGxhc3RWYWx1ZUZyb20odGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkKTtcbiAgICBpZiAoY2hhbmdlc1snY3Vyc29yU3R5bGUnXSAmJiAhY2hhbmdlc1snY3Vyc29yU3R5bGUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoY2hhbmdlc1snY3Vyc29yU3R5bGUnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sncHJvamVjdGlvbiddICYmICFjaGFuZ2VzWydwcm9qZWN0aW9uJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlUHJvamVjdGlvbihjaGFuZ2VzWydwcm9qZWN0aW9uJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21pblpvb20nXSAmJiAhY2hhbmdlc1snbWluWm9vbSddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZU1pblpvb20oY2hhbmdlc1snbWluWm9vbSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYXhab29tJ10gJiYgIWNoYW5nZXNbJ21heFpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVNYXhab29tKGNoYW5nZXNbJ21heFpvb20nXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWluUGl0Y2gnXSAmJiAhY2hhbmdlc1snbWluUGl0Y2gnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVNaW5QaXRjaChjaGFuZ2VzWydtaW5QaXRjaCddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYXhQaXRjaCddICYmICFjaGFuZ2VzWydtYXhQaXRjaCddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZU1heFBpdGNoKGNoYW5nZXNbJ21heFBpdGNoJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1sncmVuZGVyV29ybGRDb3BpZXMnXSAmJlxuICAgICAgIWNoYW5nZXNbJ3JlbmRlcldvcmxkQ29waWVzJ10uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlUmVuZGVyV29ybGRDb3BpZXMoXG4gICAgICAgIGNoYW5nZXNbJ3JlbmRlcldvcmxkQ29waWVzJ10uY3VycmVudFZhbHVlLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3Njcm9sbFpvb20nXSAmJiAhY2hhbmdlc1snc2Nyb2xsWm9vbSddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZVNjcm9sbFpvb20oY2hhbmdlc1snc2Nyb2xsWm9vbSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkcmFnUm90YXRlJ10gJiYgIWNoYW5nZXNbJ2RyYWdSb3RhdGUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVEcmFnUm90YXRlKGNoYW5nZXNbJ2RyYWdSb3RhdGUnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sndG91Y2hQaXRjaCddICYmICFjaGFuZ2VzWyd0b3VjaFBpdGNoJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlVG91Y2hQaXRjaChjaGFuZ2VzWyd0b3VjaFBpdGNoJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1sndG91Y2hab29tUm90YXRlJ10gJiZcbiAgICAgICFjaGFuZ2VzWyd0b3VjaFpvb21Sb3RhdGUnXS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVUb3VjaFpvb21Sb3RhdGUoXG4gICAgICAgIGNoYW5nZXNbJ3RvdWNoWm9vbVJvdGF0ZSddLmN1cnJlbnRWYWx1ZSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ2RvdWJsZUNsaWNrWm9vbSddICYmXG4gICAgICAhY2hhbmdlc1snZG91YmxlQ2xpY2tab29tJ10uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlRG91YmxlQ2xpY2tab29tKFxuICAgICAgICBjaGFuZ2VzWydkb3VibGVDbGlja1pvb20nXS5jdXJyZW50VmFsdWUsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sna2V5Ym9hcmQnXSAmJiAhY2hhbmdlc1sna2V5Ym9hcmQnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVLZXlib2FyZChjaGFuZ2VzWydrZXlib2FyZCddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkcmFnUGFuJ10gJiYgIWNoYW5nZXNbJ2RyYWdQYW4nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS51cGRhdGVEcmFnUGFuKGNoYW5nZXNbJ2RyYWdQYW4nXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snYm94Wm9vbSddICYmICFjaGFuZ2VzWydib3hab29tJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlQm94Wm9vbShjaGFuZ2VzWydib3hab29tJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3N0eWxlJ10gJiYgIWNoYW5nZXNbJ3N0eWxlJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UudXBkYXRlU3R5bGUoY2hhbmdlc1snc3R5bGUnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWF4Qm91bmRzJ10gJiYgIWNoYW5nZXNbJ21heEJvdW5kcyddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnVwZGF0ZU1heEJvdW5kcyhjaGFuZ2VzWydtYXhCb3VuZHMnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydmaXRCb3VuZHMnXSAmJlxuICAgICAgY2hhbmdlc1snZml0Qm91bmRzJ10uY3VycmVudFZhbHVlICYmXG4gICAgICAhY2hhbmdlc1snZml0Qm91bmRzJ10uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZml0Qm91bmRzKFxuICAgICAgICBjaGFuZ2VzWydmaXRCb3VuZHMnXS5jdXJyZW50VmFsdWUsXG4gICAgICAgIHRoaXMuZml0Qm91bmRzT3B0aW9ucygpLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1snZml0U2NyZWVuQ29vcmRpbmF0ZXMnXSAmJlxuICAgICAgY2hhbmdlc1snZml0U2NyZWVuQ29vcmRpbmF0ZXMnXS5jdXJyZW50VmFsdWVcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgKHRoaXMuY2VudGVyKCkgfHwgdGhpcy56b29tKCkgfHwgdGhpcy5waXRjaCgpIHx8IHRoaXMuZml0Qm91bmRzKCkpICYmXG4gICAgICAgIGNoYW5nZXNbJ2ZpdFNjcmVlbkNvb3JkaW5hdGVzJ10uaXNGaXJzdENoYW5nZSgpXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdbbmd4LW1hcGJveC1nbF0gY2VudGVyIC8gem9vbSAvIHBpdGNoIC8gZml0Qm91bmRzIGlucHV0cyBhcmUgYmVpbmcgb3ZlcnJpZGRlbiBieSBmaXRTY3JlZW5Db29yZGluYXRlcyBpbnB1dCcsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZml0U2NyZWVuQ29vcmRpbmF0ZXMoXG4gICAgICAgIGNoYW5nZXNbJ2ZpdFNjcmVlbkNvb3JkaW5hdGVzJ10uY3VycmVudFZhbHVlLFxuICAgICAgICB0aGlzLmJlYXJpbmcoKSA/IHRoaXMuYmVhcmluZygpIVswXSA6IDAsXG4gICAgICAgIHRoaXMubW92aW5nT3B0aW9ucygpLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5jZW50ZXJXaXRoUGFuVG8oKSAmJlxuICAgICAgY2hhbmdlc1snY2VudGVyJ10gJiZcbiAgICAgICFjaGFuZ2VzWydjZW50ZXInXS5pc0ZpcnN0Q2hhbmdlKCkgJiZcbiAgICAgICFjaGFuZ2VzWyd6b29tJ10gJiZcbiAgICAgICFjaGFuZ2VzWydiZWFyaW5nJ10gJiZcbiAgICAgICFjaGFuZ2VzWydwaXRjaCddXG4gICAgKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucGFuVG8odGhpcy5jZW50ZXIoKSEsIHRoaXMucGFuVG9PcHRpb25zKCkpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoY2hhbmdlc1snY2VudGVyJ10gJiYgIWNoYW5nZXNbJ2NlbnRlciddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWyd6b29tJ10gJiYgIWNoYW5nZXNbJ3pvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYmVhcmluZyddICYmXG4gICAgICAgICFjaGFuZ2VzWydiZWFyaW5nJ10uaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICAgICFjaGFuZ2VzWydmaXRTY3JlZW5Db29yZGluYXRlcyddKSB8fFxuICAgICAgKGNoYW5nZXNbJ3BpdGNoJ10gJiYgIWNoYW5nZXNbJ3BpdGNoJ10uaXNGaXJzdENoYW5nZSgpKVxuICAgICkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLm1vdmUoXG4gICAgICAgIHRoaXMubW92aW5nTWV0aG9kKCksXG4gICAgICAgIHRoaXMubW92aW5nT3B0aW9ucygpLFxuICAgICAgICBjaGFuZ2VzWyd6b29tJ10gJiYgdGhpcy56b29tKCkgPyB0aGlzLnpvb20oKSFbMF0gOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXNbJ2NlbnRlciddID8gdGhpcy5jZW50ZXIoKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlc1snYmVhcmluZyddICYmIHRoaXMuYmVhcmluZygpISA/IHRoaXMuYmVhcmluZygpIVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlc1sncGl0Y2gnXSAmJiB0aGlzLnBpdGNoKCkgPyB0aGlzLnBpdGNoKCkhWzBdIDogdW5kZWZpbmVkLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==