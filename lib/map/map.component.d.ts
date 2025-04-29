import { ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges, InjectionToken } from '@angular/core';
import { MovingOptions } from './map.service';
import type { AnimationOptions, LngLatBoundsLike, Map, MapDataEvent, MapMouseEvent, MapOptions, MapSourceDataEvent, MapStyleDataEvent, MapTouchEvent, MapWheelEvent, PointLike } from 'mapbox-gl';
import * as i0 from "@angular/core";
/**
 * Default options for the MapComponent.
 *
 * @see MAP_COMPONENT_INITIALIZATION_OPTIONS
 */
export interface MapComponentInitializationOptions extends MapOptions {
}
/**
 * InjectionToken used for injecting default options to the MapComponent before it initializes.
 */
export declare const MAP_COMPONENT_INITIALIZATION_OPTIONS: InjectionToken<MapComponentInitializationOptions>;
export declare class MapComponent implements OnChanges, OnDestroy {
    private readonly mapService;
    private readonly initialMapOptions;
    accessToken: import("@angular/core").InputSignal<string | undefined>;
    collectResourceTiming: import("@angular/core").InputSignal<boolean | undefined>;
    crossSourceCollisions: import("@angular/core").InputSignal<boolean | undefined>;
    fadeDuration: import("@angular/core").InputSignal<number | undefined>;
    hash: import("@angular/core").InputSignal<string | boolean | undefined>;
    refreshExpiredTiles: import("@angular/core").InputSignal<boolean | undefined>;
    failIfMajorPerformanceCaveat: import("@angular/core").InputSignal<boolean | undefined>;
    bearingSnap: import("@angular/core").InputSignal<number | undefined>;
    interactive: import("@angular/core").InputSignal<boolean | undefined>;
    pitchWithRotate: import("@angular/core").InputSignal<boolean | undefined>;
    clickTolerance: import("@angular/core").InputSignal<number | undefined>;
    attributionControl: import("@angular/core").InputSignal<boolean | undefined>;
    logoPosition: import("@angular/core").InputSignal<import("mapbox-gl").ControlPosition | undefined>;
    maxTileCacheSize: import("@angular/core").InputSignal<number | undefined>;
    localIdeographFontFamily: import("@angular/core").InputSignal<string | undefined>;
    preserveDrawingBuffer: import("@angular/core").InputSignal<boolean | undefined>;
    trackResize: import("@angular/core").InputSignal<boolean | undefined>;
    transformRequest: import("@angular/core").InputSignal<import("mapbox-gl").RequestTransformFunction | undefined>;
    bounds: import("@angular/core").InputSignal<LngLatBoundsLike | undefined>;
    antialias: import("@angular/core").InputSignal<boolean | undefined>;
    locale: import("@angular/core").InputSignal<Partial<{
        "AttributionControl.ToggleAttribution": string;
        "FullscreenControl.Enter": string;
        "FullscreenControl.Exit": string;
        "GeolocateControl.FindMyLocation": string;
        "GeolocateControl.LocationNotAvailable": string;
        "LogoControl.Title": string;
        "Map.Title": string;
        "NavigationControl.ResetBearing": string;
        "NavigationControl.ZoomIn": string;
        "NavigationControl.ZoomOut": string;
        "ScrollZoomBlocker.CtrlMessage": string;
        "ScrollZoomBlocker.CmdMessage": string;
        "TouchPanBlocker.Message": string;
    }> | undefined>;
    cooperativeGestures: import("@angular/core").InputSignal<boolean | undefined>;
    minZoom: import("@angular/core").InputSignal<number | undefined>;
    maxZoom: import("@angular/core").InputSignal<number | undefined>;
    minPitch: import("@angular/core").InputSignal<number | undefined>;
    maxPitch: import("@angular/core").InputSignal<number | undefined>;
    scrollZoom: import("@angular/core").InputSignal<boolean | {
        around?: "center";
    } | undefined>;
    dragRotate: import("@angular/core").InputSignal<boolean | undefined>;
    touchPitch: import("@angular/core").InputSignal<boolean | {
        around?: "center";
    } | undefined>;
    touchZoomRotate: import("@angular/core").InputSignal<boolean | {
        around?: "center";
    } | undefined>;
    doubleClickZoom: import("@angular/core").InputSignal<boolean | undefined>;
    keyboard: import("@angular/core").InputSignal<boolean | undefined>;
    dragPan: import("@angular/core").InputSignal<boolean | {
        linearity?: number;
        easing?: (t: number) => number;
        deceleration?: number;
        maxSpeed?: number;
    } | undefined>;
    boxZoom: import("@angular/core").InputSignal<boolean | undefined>;
    style: import("@angular/core").InputSignal<string | import("mapbox-gl").StyleSpecification | undefined>;
    center: import("@angular/core").InputSignal<import("mapbox-gl").LngLatLike | undefined>;
    maxBounds: import("@angular/core").InputSignal<LngLatBoundsLike | undefined>;
    zoom: import("@angular/core").InputSignal<[number] | undefined>;
    bearing: import("@angular/core").InputSignal<[number] | undefined>;
    pitch: import("@angular/core").InputSignal<[number] | undefined>;
    fitBoundsOptions: import("@angular/core").InputSignal<import("mapbox-gl").EasingOptions | undefined>;
    renderWorldCopies: import("@angular/core").InputSignal<boolean | undefined>;
    projection: import("@angular/core").InputSignal<string | import("mapbox-gl").ProjectionSpecification | undefined>;
    movingMethod: import("@angular/core").InputSignal<"jumpTo" | "easeTo" | "flyTo">;
    movingOptions: import("@angular/core").InputSignal<MovingOptions | undefined>;
    fitBounds: import("@angular/core").InputSignal<LngLatBoundsLike | undefined>;
    fitScreenCoordinates: import("@angular/core").InputSignal<[PointLike, PointLike] | undefined>;
    centerWithPanTo: import("@angular/core").InputSignal<boolean | undefined>;
    panToOptions: import("@angular/core").InputSignal<AnimationOptions | undefined>;
    cursorStyle: import("@angular/core").InputSignal<string | undefined>;
    mapResize: EventEmitter<{
        type: import("mapbox-gl").MapEventType;
        target: Map;
    }>;
    mapRemove: EventEmitter<{
        type: import("mapbox-gl").MapEventType;
        target: Map;
    }>;
    mapMouseDown: EventEmitter<MapMouseEvent>;
    mapMouseUp: EventEmitter<MapMouseEvent>;
    mapMouseMove: EventEmitter<MapMouseEvent>;
    mapClick: EventEmitter<MapMouseEvent>;
    mapDblClick: EventEmitter<MapMouseEvent>;
    mapMouseOver: EventEmitter<MapMouseEvent>;
    mapMouseOut: EventEmitter<MapMouseEvent>;
    mapContextMenu: EventEmitter<MapMouseEvent>;
    mapTouchStart: EventEmitter<MapTouchEvent>;
    mapTouchEnd: EventEmitter<MapTouchEvent>;
    mapTouchMove: EventEmitter<MapTouchEvent>;
    mapTouchCancel: EventEmitter<MapTouchEvent>;
    mapWheel: EventEmitter<MapWheelEvent>;
    moveStart: EventEmitter<{
        originalEvent?: MouseEvent | WheelEvent | TouchEvent;
    }>;
    move: EventEmitter<{
        originalEvent?: MouseEvent | WheelEvent | TouchEvent;
    }>;
    moveEnd: EventEmitter<{
        originalEvent?: MouseEvent | WheelEvent | TouchEvent;
    }>;
    mapDragStart: EventEmitter<{
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    mapDrag: EventEmitter<{
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    mapDragEnd: EventEmitter<{
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    zoomStart: EventEmitter<void>;
    zoomEvt: EventEmitter<void>;
    zoomEnd: EventEmitter<void>;
    rotateStart: EventEmitter<{
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    rotate: EventEmitter<{
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    rotateEnd: EventEmitter<{
        originalEvent?: MouseEvent | TouchEvent;
    }>;
    pitchStart: EventEmitter<void>;
    pitchEvt: EventEmitter<void>;
    pitchEnd: EventEmitter<void>;
    boxZoomStart: EventEmitter<{
        originalEvent?: MouseEvent | KeyboardEvent;
    }>;
    boxZoomEnd: EventEmitter<{
        originalEvent?: MouseEvent;
    }>;
    boxZoomCancel: EventEmitter<{
        originalEvent?: MouseEvent | KeyboardEvent;
    }>;
    webGlContextLost: EventEmitter<{
        type: "webglcontextlost" | "webglcontextrestored";
        target: Map;
    } & ({
        originalEvent?: WebGLContextEvent;
    } | {
        originalEvent?: WebGLContextEvent;
    })>;
    webGlContextRestored: EventEmitter<{
        type: "webglcontextlost" | "webglcontextrestored";
        target: Map;
    } & ({
        originalEvent?: WebGLContextEvent;
    } | {
        originalEvent?: WebGLContextEvent;
    })>;
    mapLoad: EventEmitter<{
        type: import("mapbox-gl").MapEventType;
        target: Map;
    }>;
    mapCreate: EventEmitter<Map>;
    idle: EventEmitter<void>;
    render: EventEmitter<void>;
    mapError: EventEmitter<Error>;
    data: EventEmitter<MapDataEvent>;
    styleData: EventEmitter<MapStyleDataEvent>;
    sourceData: EventEmitter<MapSourceDataEvent>;
    dataLoading: EventEmitter<MapDataEvent>;
    styleDataLoading: EventEmitter<MapStyleDataEvent>;
    sourceDataLoading: EventEmitter<MapSourceDataEvent>;
    styleImageMissing: EventEmitter<{
        id: string;
    }>;
    get mapInstance(): Map;
    mapContainer: ElementRef;
    constructor();
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MapComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MapComponent, "mgl-map", never, { "accessToken": { "alias": "accessToken"; "required": false; "isSignal": true; }; "collectResourceTiming": { "alias": "collectResourceTiming"; "required": false; "isSignal": true; }; "crossSourceCollisions": { "alias": "crossSourceCollisions"; "required": false; "isSignal": true; }; "fadeDuration": { "alias": "fadeDuration"; "required": false; "isSignal": true; }; "hash": { "alias": "hash"; "required": false; "isSignal": true; }; "refreshExpiredTiles": { "alias": "refreshExpiredTiles"; "required": false; "isSignal": true; }; "failIfMajorPerformanceCaveat": { "alias": "failIfMajorPerformanceCaveat"; "required": false; "isSignal": true; }; "bearingSnap": { "alias": "bearingSnap"; "required": false; "isSignal": true; }; "interactive": { "alias": "interactive"; "required": false; "isSignal": true; }; "pitchWithRotate": { "alias": "pitchWithRotate"; "required": false; "isSignal": true; }; "clickTolerance": { "alias": "clickTolerance"; "required": false; "isSignal": true; }; "attributionControl": { "alias": "attributionControl"; "required": false; "isSignal": true; }; "logoPosition": { "alias": "logoPosition"; "required": false; "isSignal": true; }; "maxTileCacheSize": { "alias": "maxTileCacheSize"; "required": false; "isSignal": true; }; "localIdeographFontFamily": { "alias": "localIdeographFontFamily"; "required": false; "isSignal": true; }; "preserveDrawingBuffer": { "alias": "preserveDrawingBuffer"; "required": false; "isSignal": true; }; "trackResize": { "alias": "trackResize"; "required": false; "isSignal": true; }; "transformRequest": { "alias": "transformRequest"; "required": false; "isSignal": true; }; "bounds": { "alias": "bounds"; "required": false; "isSignal": true; }; "antialias": { "alias": "antialias"; "required": false; "isSignal": true; }; "locale": { "alias": "locale"; "required": false; "isSignal": true; }; "cooperativeGestures": { "alias": "cooperativeGestures"; "required": false; "isSignal": true; }; "minZoom": { "alias": "minZoom"; "required": false; "isSignal": true; }; "maxZoom": { "alias": "maxZoom"; "required": false; "isSignal": true; }; "minPitch": { "alias": "minPitch"; "required": false; "isSignal": true; }; "maxPitch": { "alias": "maxPitch"; "required": false; "isSignal": true; }; "scrollZoom": { "alias": "scrollZoom"; "required": false; "isSignal": true; }; "dragRotate": { "alias": "dragRotate"; "required": false; "isSignal": true; }; "touchPitch": { "alias": "touchPitch"; "required": false; "isSignal": true; }; "touchZoomRotate": { "alias": "touchZoomRotate"; "required": false; "isSignal": true; }; "doubleClickZoom": { "alias": "doubleClickZoom"; "required": false; "isSignal": true; }; "keyboard": { "alias": "keyboard"; "required": false; "isSignal": true; }; "dragPan": { "alias": "dragPan"; "required": false; "isSignal": true; }; "boxZoom": { "alias": "boxZoom"; "required": false; "isSignal": true; }; "style": { "alias": "style"; "required": false; "isSignal": true; }; "center": { "alias": "center"; "required": false; "isSignal": true; }; "maxBounds": { "alias": "maxBounds"; "required": false; "isSignal": true; }; "zoom": { "alias": "zoom"; "required": false; "isSignal": true; }; "bearing": { "alias": "bearing"; "required": false; "isSignal": true; }; "pitch": { "alias": "pitch"; "required": false; "isSignal": true; }; "fitBoundsOptions": { "alias": "fitBoundsOptions"; "required": false; "isSignal": true; }; "renderWorldCopies": { "alias": "renderWorldCopies"; "required": false; "isSignal": true; }; "projection": { "alias": "projection"; "required": false; "isSignal": true; }; "movingMethod": { "alias": "movingMethod"; "required": false; "isSignal": true; }; "movingOptions": { "alias": "movingOptions"; "required": false; "isSignal": true; }; "fitBounds": { "alias": "fitBounds"; "required": false; "isSignal": true; }; "fitScreenCoordinates": { "alias": "fitScreenCoordinates"; "required": false; "isSignal": true; }; "centerWithPanTo": { "alias": "centerWithPanTo"; "required": false; "isSignal": true; }; "panToOptions": { "alias": "panToOptions"; "required": false; "isSignal": true; }; "cursorStyle": { "alias": "cursorStyle"; "required": false; "isSignal": true; }; }, { "mapResize": "mapResize"; "mapRemove": "mapRemove"; "mapMouseDown": "mapMouseDown"; "mapMouseUp": "mapMouseUp"; "mapMouseMove": "mapMouseMove"; "mapClick": "mapClick"; "mapDblClick": "mapDblClick"; "mapMouseOver": "mapMouseOver"; "mapMouseOut": "mapMouseOut"; "mapContextMenu": "mapContextMenu"; "mapTouchStart": "mapTouchStart"; "mapTouchEnd": "mapTouchEnd"; "mapTouchMove": "mapTouchMove"; "mapTouchCancel": "mapTouchCancel"; "mapWheel": "mapWheel"; "moveStart": "moveStart"; "move": "move"; "moveEnd": "moveEnd"; "mapDragStart": "mapDragStart"; "mapDrag": "mapDrag"; "mapDragEnd": "mapDragEnd"; "zoomStart": "zoomStart"; "zoomEvt": "zoomEvt"; "zoomEnd": "zoomEnd"; "rotateStart": "rotateStart"; "rotate": "rotate"; "rotateEnd": "rotateEnd"; "pitchStart": "pitchStart"; "pitchEvt": "pitchEvt"; "pitchEnd": "pitchEnd"; "boxZoomStart": "boxZoomStart"; "boxZoomEnd": "boxZoomEnd"; "boxZoomCancel": "boxZoomCancel"; "webGlContextLost": "webGlContextLost"; "webGlContextRestored": "webGlContextRestored"; "mapLoad": "mapLoad"; "mapCreate": "mapCreate"; "idle": "idle"; "render": "render"; "mapError": "mapError"; "data": "data"; "styleData": "styleData"; "sourceData": "sourceData"; "dataLoading": "dataLoading"; "styleDataLoading": "styleDataLoading"; "sourceDataLoading": "sourceDataLoading"; "styleImageMissing": "styleImageMissing"; }, never, never, true, never>;
}
