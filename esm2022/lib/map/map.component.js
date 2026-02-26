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
    accessToken = input(this.initialMapOptions?.accessToken, ...(ngDevMode ? [{ debugName: "accessToken" }] : []));
    collectResourceTiming = input(this.initialMapOptions?.collectResourceTiming, ...(ngDevMode ? [{ debugName: "collectResourceTiming" }] : []));
    crossSourceCollisions = input(this.initialMapOptions?.crossSourceCollisions, ...(ngDevMode ? [{ debugName: "crossSourceCollisions" }] : []));
    fadeDuration = input(this.initialMapOptions?.fadeDuration, ...(ngDevMode ? [{ debugName: "fadeDuration" }] : []));
    hash = input(this.initialMapOptions?.hash, ...(ngDevMode ? [{ debugName: "hash" }] : []));
    refreshExpiredTiles = input(this.initialMapOptions?.refreshExpiredTiles, ...(ngDevMode ? [{ debugName: "refreshExpiredTiles" }] : []));
    failIfMajorPerformanceCaveat = input(this.initialMapOptions?.failIfMajorPerformanceCaveat, ...(ngDevMode ? [{ debugName: "failIfMajorPerformanceCaveat" }] : []));
    bearingSnap = input(this.initialMapOptions?.bearingSnap, ...(ngDevMode ? [{ debugName: "bearingSnap" }] : []));
    interactive = input(this.initialMapOptions?.interactive, ...(ngDevMode ? [{ debugName: "interactive" }] : []));
    pitchWithRotate = input(this.initialMapOptions?.pitchWithRotate, ...(ngDevMode ? [{ debugName: "pitchWithRotate" }] : []));
    clickTolerance = input(this.initialMapOptions?.clickTolerance, ...(ngDevMode ? [{ debugName: "clickTolerance" }] : []));
    attributionControl = input(this.initialMapOptions?.attributionControl, ...(ngDevMode ? [{ debugName: "attributionControl" }] : []));
    logoPosition = input(this.initialMapOptions?.logoPosition, ...(ngDevMode ? [{ debugName: "logoPosition" }] : []));
    maxTileCacheSize = input(this.initialMapOptions?.maxTileCacheSize, ...(ngDevMode ? [{ debugName: "maxTileCacheSize" }] : []));
    localIdeographFontFamily = input(this.initialMapOptions?.localIdeographFontFamily, ...(ngDevMode ? [{ debugName: "localIdeographFontFamily" }] : []));
    preserveDrawingBuffer = input(this.initialMapOptions?.preserveDrawingBuffer, ...(ngDevMode ? [{ debugName: "preserveDrawingBuffer" }] : []));
    trackResize = input(this.initialMapOptions?.trackResize, ...(ngDevMode ? [{ debugName: "trackResize" }] : []));
    transformRequest = input(this.initialMapOptions?.transformRequest, ...(ngDevMode ? [{ debugName: "transformRequest" }] : []));
    bounds = input(this.initialMapOptions?.bounds, ...(ngDevMode ? [{ debugName: "bounds" }] : [])); // Use fitBounds for dynamic input
    antialias = input(this.initialMapOptions?.antialias, ...(ngDevMode ? [{ debugName: "antialias" }] : []));
    locale = input(this.initialMapOptions?.locale, ...(ngDevMode ? [{ debugName: "locale" }] : []));
    cooperativeGestures = input(this.initialMapOptions?.cooperativeGestures, ...(ngDevMode ? [{ debugName: "cooperativeGestures" }] : []));
    /* Dynamic inputs */
    minZoom = input(this.initialMapOptions?.minZoom, ...(ngDevMode ? [{ debugName: "minZoom" }] : []));
    maxZoom = input(this.initialMapOptions?.maxZoom, ...(ngDevMode ? [{ debugName: "maxZoom" }] : []));
    minPitch = input(this.initialMapOptions?.minPitch, ...(ngDevMode ? [{ debugName: "minPitch" }] : []));
    maxPitch = input(this.initialMapOptions?.maxPitch, ...(ngDevMode ? [{ debugName: "maxPitch" }] : []));
    scrollZoom = input(this.initialMapOptions?.scrollZoom, ...(ngDevMode ? [{ debugName: "scrollZoom" }] : []));
    dragRotate = input(this.initialMapOptions?.dragRotate, ...(ngDevMode ? [{ debugName: "dragRotate" }] : []));
    touchPitch = input(this.initialMapOptions?.touchPitch, ...(ngDevMode ? [{ debugName: "touchPitch" }] : []));
    touchZoomRotate = input(this.initialMapOptions?.touchZoomRotate, ...(ngDevMode ? [{ debugName: "touchZoomRotate" }] : []));
    doubleClickZoom = input(this.initialMapOptions?.doubleClickZoom, ...(ngDevMode ? [{ debugName: "doubleClickZoom" }] : []));
    keyboard = input(this.initialMapOptions?.keyboard, ...(ngDevMode ? [{ debugName: "keyboard" }] : []));
    dragPan = input(this.initialMapOptions?.dragPan, ...(ngDevMode ? [{ debugName: "dragPan" }] : []));
    boxZoom = input(this.initialMapOptions?.boxZoom, ...(ngDevMode ? [{ debugName: "boxZoom" }] : []));
    style = input(this.initialMapOptions?.style, ...(ngDevMode ? [{ debugName: "style" }] : []));
    center = input(this.initialMapOptions?.center, ...(ngDevMode ? [{ debugName: "center" }] : []));
    maxBounds = input(this.initialMapOptions?.maxBounds, ...(ngDevMode ? [{ debugName: "maxBounds" }] : []));
    zoom = input(this.initialMapOptions?.zoom, ...(ngDevMode ? [{ debugName: "zoom" }] : []));
    bearing = input(this.initialMapOptions?.bearing, ...(ngDevMode ? [{ debugName: "bearing" }] : []));
    pitch = input(this.initialMapOptions?.pitch, ...(ngDevMode ? [{ debugName: "pitch" }] : []));
    // First value goes to options.fitBoundsOptions. Subsequents changes are passed to fitBounds
    fitBoundsOptions = input(this.initialMapOptions?.fitBoundsOptions, ...(ngDevMode ? [{ debugName: "fitBoundsOptions" }] : []));
    renderWorldCopies = input(this.initialMapOptions?.renderWorldCopies, ...(ngDevMode ? [{ debugName: "renderWorldCopies" }] : []));
    projection = input(this.initialMapOptions?.projection, ...(ngDevMode ? [{ debugName: "projection" }] : []));
    /* Added by ngx-mapbox-gl */
    movingMethod = input('flyTo', ...(ngDevMode ? [{ debugName: "movingMethod" }] : []));
    movingOptions = input(...(ngDevMode ? [undefined, { debugName: "movingOptions" }] : []));
    // => First value is a alias to bounds input (since mapbox 0.53.0). Subsequents changes are passed to fitBounds
    fitBounds = input(...(ngDevMode ? [undefined, { debugName: "fitBounds" }] : []));
    fitScreenCoordinates = input(...(ngDevMode ? [undefined, { debugName: "fitScreenCoordinates" }] : []));
    centerWithPanTo = input(...(ngDevMode ? [undefined, { debugName: "centerWithPanTo" }] : []));
    panToOptions = input(...(ngDevMode ? [undefined, { debugName: "panToOptions" }] : []));
    cursorStyle = input(...(ngDevMode ? [undefined, { debugName: "cursorStyle" }] : []));
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
            const bearing = this.bearing();
            this.mapService.fitScreenCoordinates(changes['fitScreenCoordinates'].currentValue, Array.isArray(bearing) ? bearing[0] : bearing || 0, this.movingOptions());
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
            const zoom = this.zoom();
            const center = this.center();
            const bearing = this.bearing();
            const pitch = this.pitch();
            this.mapService.move(this.movingMethod(), this.movingOptions(), changes['zoom'] && zoom
                ? Array.isArray(zoom)
                    ? zoom[0]
                    : zoom
                : undefined, changes['center'] ? center : undefined, changes['bearing'] && bearing
                ? Array.isArray(bearing)
                    ? bearing[0]
                    : bearing
                : undefined, changes['pitch'] && pitch
                ? Array.isArray(pitch)
                    ? pitch[0]
                    : pitch
                : undefined);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MapComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: MapComponent, isStandalone: true, selector: "mgl-map", inputs: { accessToken: { classPropertyName: "accessToken", publicName: "accessToken", isSignal: true, isRequired: false, transformFunction: null }, collectResourceTiming: { classPropertyName: "collectResourceTiming", publicName: "collectResourceTiming", isSignal: true, isRequired: false, transformFunction: null }, crossSourceCollisions: { classPropertyName: "crossSourceCollisions", publicName: "crossSourceCollisions", isSignal: true, isRequired: false, transformFunction: null }, fadeDuration: { classPropertyName: "fadeDuration", publicName: "fadeDuration", isSignal: true, isRequired: false, transformFunction: null }, hash: { classPropertyName: "hash", publicName: "hash", isSignal: true, isRequired: false, transformFunction: null }, refreshExpiredTiles: { classPropertyName: "refreshExpiredTiles", publicName: "refreshExpiredTiles", isSignal: true, isRequired: false, transformFunction: null }, failIfMajorPerformanceCaveat: { classPropertyName: "failIfMajorPerformanceCaveat", publicName: "failIfMajorPerformanceCaveat", isSignal: true, isRequired: false, transformFunction: null }, bearingSnap: { classPropertyName: "bearingSnap", publicName: "bearingSnap", isSignal: true, isRequired: false, transformFunction: null }, interactive: { classPropertyName: "interactive", publicName: "interactive", isSignal: true, isRequired: false, transformFunction: null }, pitchWithRotate: { classPropertyName: "pitchWithRotate", publicName: "pitchWithRotate", isSignal: true, isRequired: false, transformFunction: null }, clickTolerance: { classPropertyName: "clickTolerance", publicName: "clickTolerance", isSignal: true, isRequired: false, transformFunction: null }, attributionControl: { classPropertyName: "attributionControl", publicName: "attributionControl", isSignal: true, isRequired: false, transformFunction: null }, logoPosition: { classPropertyName: "logoPosition", publicName: "logoPosition", isSignal: true, isRequired: false, transformFunction: null }, maxTileCacheSize: { classPropertyName: "maxTileCacheSize", publicName: "maxTileCacheSize", isSignal: true, isRequired: false, transformFunction: null }, localIdeographFontFamily: { classPropertyName: "localIdeographFontFamily", publicName: "localIdeographFontFamily", isSignal: true, isRequired: false, transformFunction: null }, preserveDrawingBuffer: { classPropertyName: "preserveDrawingBuffer", publicName: "preserveDrawingBuffer", isSignal: true, isRequired: false, transformFunction: null }, trackResize: { classPropertyName: "trackResize", publicName: "trackResize", isSignal: true, isRequired: false, transformFunction: null }, transformRequest: { classPropertyName: "transformRequest", publicName: "transformRequest", isSignal: true, isRequired: false, transformFunction: null }, bounds: { classPropertyName: "bounds", publicName: "bounds", isSignal: true, isRequired: false, transformFunction: null }, antialias: { classPropertyName: "antialias", publicName: "antialias", isSignal: true, isRequired: false, transformFunction: null }, locale: { classPropertyName: "locale", publicName: "locale", isSignal: true, isRequired: false, transformFunction: null }, cooperativeGestures: { classPropertyName: "cooperativeGestures", publicName: "cooperativeGestures", isSignal: true, isRequired: false, transformFunction: null }, minZoom: { classPropertyName: "minZoom", publicName: "minZoom", isSignal: true, isRequired: false, transformFunction: null }, maxZoom: { classPropertyName: "maxZoom", publicName: "maxZoom", isSignal: true, isRequired: false, transformFunction: null }, minPitch: { classPropertyName: "minPitch", publicName: "minPitch", isSignal: true, isRequired: false, transformFunction: null }, maxPitch: { classPropertyName: "maxPitch", publicName: "maxPitch", isSignal: true, isRequired: false, transformFunction: null }, scrollZoom: { classPropertyName: "scrollZoom", publicName: "scrollZoom", isSignal: true, isRequired: false, transformFunction: null }, dragRotate: { classPropertyName: "dragRotate", publicName: "dragRotate", isSignal: true, isRequired: false, transformFunction: null }, touchPitch: { classPropertyName: "touchPitch", publicName: "touchPitch", isSignal: true, isRequired: false, transformFunction: null }, touchZoomRotate: { classPropertyName: "touchZoomRotate", publicName: "touchZoomRotate", isSignal: true, isRequired: false, transformFunction: null }, doubleClickZoom: { classPropertyName: "doubleClickZoom", publicName: "doubleClickZoom", isSignal: true, isRequired: false, transformFunction: null }, keyboard: { classPropertyName: "keyboard", publicName: "keyboard", isSignal: true, isRequired: false, transformFunction: null }, dragPan: { classPropertyName: "dragPan", publicName: "dragPan", isSignal: true, isRequired: false, transformFunction: null }, boxZoom: { classPropertyName: "boxZoom", publicName: "boxZoom", isSignal: true, isRequired: false, transformFunction: null }, style: { classPropertyName: "style", publicName: "style", isSignal: true, isRequired: false, transformFunction: null }, center: { classPropertyName: "center", publicName: "center", isSignal: true, isRequired: false, transformFunction: null }, maxBounds: { classPropertyName: "maxBounds", publicName: "maxBounds", isSignal: true, isRequired: false, transformFunction: null }, zoom: { classPropertyName: "zoom", publicName: "zoom", isSignal: true, isRequired: false, transformFunction: null }, bearing: { classPropertyName: "bearing", publicName: "bearing", isSignal: true, isRequired: false, transformFunction: null }, pitch: { classPropertyName: "pitch", publicName: "pitch", isSignal: true, isRequired: false, transformFunction: null }, fitBoundsOptions: { classPropertyName: "fitBoundsOptions", publicName: "fitBoundsOptions", isSignal: true, isRequired: false, transformFunction: null }, renderWorldCopies: { classPropertyName: "renderWorldCopies", publicName: "renderWorldCopies", isSignal: true, isRequired: false, transformFunction: null }, projection: { classPropertyName: "projection", publicName: "projection", isSignal: true, isRequired: false, transformFunction: null }, movingMethod: { classPropertyName: "movingMethod", publicName: "movingMethod", isSignal: true, isRequired: false, transformFunction: null }, movingOptions: { classPropertyName: "movingOptions", publicName: "movingOptions", isSignal: true, isRequired: false, transformFunction: null }, fitBounds: { classPropertyName: "fitBounds", publicName: "fitBounds", isSignal: true, isRequired: false, transformFunction: null }, fitScreenCoordinates: { classPropertyName: "fitScreenCoordinates", publicName: "fitScreenCoordinates", isSignal: true, isRequired: false, transformFunction: null }, centerWithPanTo: { classPropertyName: "centerWithPanTo", publicName: "centerWithPanTo", isSignal: true, isRequired: false, transformFunction: null }, panToOptions: { classPropertyName: "panToOptions", publicName: "panToOptions", isSignal: true, isRequired: false, transformFunction: null }, cursorStyle: { classPropertyName: "cursorStyle", publicName: "cursorStyle", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { mapResize: "mapResize", mapRemove: "mapRemove", mapMouseDown: "mapMouseDown", mapMouseUp: "mapMouseUp", mapMouseMove: "mapMouseMove", mapClick: "mapClick", mapDblClick: "mapDblClick", mapMouseOver: "mapMouseOver", mapMouseOut: "mapMouseOut", mapContextMenu: "mapContextMenu", mapTouchStart: "mapTouchStart", mapTouchEnd: "mapTouchEnd", mapTouchMove: "mapTouchMove", mapTouchCancel: "mapTouchCancel", mapWheel: "mapWheel", moveStart: "moveStart", move: "move", moveEnd: "moveEnd", mapDragStart: "mapDragStart", mapDrag: "mapDrag", mapDragEnd: "mapDragEnd", zoomStart: "zoomStart", zoomEvt: "zoomEvt", zoomEnd: "zoomEnd", rotateStart: "rotateStart", rotate: "rotate", rotateEnd: "rotateEnd", pitchStart: "pitchStart", pitchEvt: "pitchEvt", pitchEnd: "pitchEnd", boxZoomStart: "boxZoomStart", boxZoomEnd: "boxZoomEnd", boxZoomCancel: "boxZoomCancel", webGlContextLost: "webGlContextLost", webGlContextRestored: "webGlContextRestored", mapLoad: "mapLoad", mapCreate: "mapCreate", idle: "idle", render: "render", mapError: "mapError", data: "data", styleData: "styleData", sourceData: "sourceData", dataLoading: "dataLoading", styleDataLoading: "styleDataLoading", sourceDataLoading: "sourceDataLoading", styleImageMissing: "styleImageMissing" }, providers: [MapService], viewQueries: [{ propertyName: "mapContainer", first: true, predicate: ["container"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #container></div>', isInline: true, styles: [":host{display:block}div{height:100%;width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MapComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mgl-map', template: '<div #container></div>', providers: [MapService], standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}div{height:100%;width:100%}\n"] }]
        }], ctorParameters: () => [], propDecorators: { accessToken: [{ type: i0.Input, args: [{ isSignal: true, alias: "accessToken", required: false }] }], collectResourceTiming: [{ type: i0.Input, args: [{ isSignal: true, alias: "collectResourceTiming", required: false }] }], crossSourceCollisions: [{ type: i0.Input, args: [{ isSignal: true, alias: "crossSourceCollisions", required: false }] }], fadeDuration: [{ type: i0.Input, args: [{ isSignal: true, alias: "fadeDuration", required: false }] }], hash: [{ type: i0.Input, args: [{ isSignal: true, alias: "hash", required: false }] }], refreshExpiredTiles: [{ type: i0.Input, args: [{ isSignal: true, alias: "refreshExpiredTiles", required: false }] }], failIfMajorPerformanceCaveat: [{ type: i0.Input, args: [{ isSignal: true, alias: "failIfMajorPerformanceCaveat", required: false }] }], bearingSnap: [{ type: i0.Input, args: [{ isSignal: true, alias: "bearingSnap", required: false }] }], interactive: [{ type: i0.Input, args: [{ isSignal: true, alias: "interactive", required: false }] }], pitchWithRotate: [{ type: i0.Input, args: [{ isSignal: true, alias: "pitchWithRotate", required: false }] }], clickTolerance: [{ type: i0.Input, args: [{ isSignal: true, alias: "clickTolerance", required: false }] }], attributionControl: [{ type: i0.Input, args: [{ isSignal: true, alias: "attributionControl", required: false }] }], logoPosition: [{ type: i0.Input, args: [{ isSignal: true, alias: "logoPosition", required: false }] }], maxTileCacheSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxTileCacheSize", required: false }] }], localIdeographFontFamily: [{ type: i0.Input, args: [{ isSignal: true, alias: "localIdeographFontFamily", required: false }] }], preserveDrawingBuffer: [{ type: i0.Input, args: [{ isSignal: true, alias: "preserveDrawingBuffer", required: false }] }], trackResize: [{ type: i0.Input, args: [{ isSignal: true, alias: "trackResize", required: false }] }], transformRequest: [{ type: i0.Input, args: [{ isSignal: true, alias: "transformRequest", required: false }] }], bounds: [{ type: i0.Input, args: [{ isSignal: true, alias: "bounds", required: false }] }], antialias: [{ type: i0.Input, args: [{ isSignal: true, alias: "antialias", required: false }] }], locale: [{ type: i0.Input, args: [{ isSignal: true, alias: "locale", required: false }] }], cooperativeGestures: [{ type: i0.Input, args: [{ isSignal: true, alias: "cooperativeGestures", required: false }] }], minZoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "minZoom", required: false }] }], maxZoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxZoom", required: false }] }], minPitch: [{ type: i0.Input, args: [{ isSignal: true, alias: "minPitch", required: false }] }], maxPitch: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxPitch", required: false }] }], scrollZoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "scrollZoom", required: false }] }], dragRotate: [{ type: i0.Input, args: [{ isSignal: true, alias: "dragRotate", required: false }] }], touchPitch: [{ type: i0.Input, args: [{ isSignal: true, alias: "touchPitch", required: false }] }], touchZoomRotate: [{ type: i0.Input, args: [{ isSignal: true, alias: "touchZoomRotate", required: false }] }], doubleClickZoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "doubleClickZoom", required: false }] }], keyboard: [{ type: i0.Input, args: [{ isSignal: true, alias: "keyboard", required: false }] }], dragPan: [{ type: i0.Input, args: [{ isSignal: true, alias: "dragPan", required: false }] }], boxZoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "boxZoom", required: false }] }], style: [{ type: i0.Input, args: [{ isSignal: true, alias: "style", required: false }] }], center: [{ type: i0.Input, args: [{ isSignal: true, alias: "center", required: false }] }], maxBounds: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxBounds", required: false }] }], zoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "zoom", required: false }] }], bearing: [{ type: i0.Input, args: [{ isSignal: true, alias: "bearing", required: false }] }], pitch: [{ type: i0.Input, args: [{ isSignal: true, alias: "pitch", required: false }] }], fitBoundsOptions: [{ type: i0.Input, args: [{ isSignal: true, alias: "fitBoundsOptions", required: false }] }], renderWorldCopies: [{ type: i0.Input, args: [{ isSignal: true, alias: "renderWorldCopies", required: false }] }], projection: [{ type: i0.Input, args: [{ isSignal: true, alias: "projection", required: false }] }], movingMethod: [{ type: i0.Input, args: [{ isSignal: true, alias: "movingMethod", required: false }] }], movingOptions: [{ type: i0.Input, args: [{ isSignal: true, alias: "movingOptions", required: false }] }], fitBounds: [{ type: i0.Input, args: [{ isSignal: true, alias: "fitBounds", required: false }] }], fitScreenCoordinates: [{ type: i0.Input, args: [{ isSignal: true, alias: "fitScreenCoordinates", required: false }] }], centerWithPanTo: [{ type: i0.Input, args: [{ isSignal: true, alias: "centerWithPanTo", required: false }] }], panToOptions: [{ type: i0.Input, args: [{ isSignal: true, alias: "panToOptions", required: false }] }], cursorStyle: [{ type: i0.Input, args: [{ isSignal: true, alias: "cursorStyle", required: false }] }], mapResize: [{
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
//# sourceMappingURL=map.component.js.map