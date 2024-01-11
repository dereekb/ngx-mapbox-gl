import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AnimationOptions, ErrorEvent, EventData, LngLatBoundsLike, Map, MapBoxZoomEvent, MapContextEvent, MapDataEvent, MapMouseEvent, MapSourceDataEvent, MapStyleDataEvent, MapTouchEvent, MapWheelEvent, MapboxEvent, MapboxOptions, PointLike } from 'mapbox-gl';
import { MapService, MovingOptions } from './map.service';
import { MapEvent } from './map.types';
import * as i0 from "@angular/core";
export declare class MapComponent implements OnChanges, OnDestroy, AfterViewInit, Omit<MapboxOptions, 'bearing' | 'container' | 'pitch' | 'zoom'>, MapEvent {
    private mapService;
    accessToken?: MapboxOptions['accessToken'];
    collectResourceTiming?: MapboxOptions['collectResourceTiming'];
    crossSourceCollisions?: MapboxOptions['crossSourceCollisions'];
    customMapboxApiUrl?: string;
    fadeDuration?: MapboxOptions['fadeDuration'];
    hash?: MapboxOptions['hash'];
    refreshExpiredTiles?: MapboxOptions['refreshExpiredTiles'];
    failIfMajorPerformanceCaveat?: MapboxOptions['failIfMajorPerformanceCaveat'];
    bearingSnap?: MapboxOptions['bearingSnap'];
    interactive?: MapboxOptions['interactive'];
    pitchWithRotate?: MapboxOptions['pitchWithRotate'];
    clickTolerance?: MapboxOptions['clickTolerance'];
    attributionControl?: MapboxOptions['attributionControl'];
    logoPosition?: MapboxOptions['logoPosition'];
    maxTileCacheSize?: MapboxOptions['maxTileCacheSize'];
    localIdeographFontFamily?: MapboxOptions['localIdeographFontFamily'];
    preserveDrawingBuffer?: MapboxOptions['preserveDrawingBuffer'];
    trackResize?: MapboxOptions['trackResize'];
    transformRequest?: MapboxOptions['transformRequest'];
    bounds?: MapboxOptions['bounds'];
    antialias?: MapboxOptions['antialias'];
    locale?: MapboxOptions['locale'];
    cooperativeGestures?: MapboxOptions['cooperativeGestures'];
    minZoom?: MapboxOptions['minZoom'];
    maxZoom?: MapboxOptions['maxZoom'];
    minPitch?: MapboxOptions['minPitch'];
    maxPitch?: MapboxOptions['maxPitch'];
    scrollZoom?: MapboxOptions['scrollZoom'];
    dragRotate?: MapboxOptions['dragRotate'];
    touchPitch?: MapboxOptions['touchPitch'];
    touchZoomRotate?: MapboxOptions['touchZoomRotate'];
    doubleClickZoom?: MapboxOptions['doubleClickZoom'];
    keyboard?: MapboxOptions['keyboard'];
    dragPan?: MapboxOptions['dragPan'];
    boxZoom?: MapboxOptions['boxZoom'];
    style: MapboxOptions['style'];
    center?: MapboxOptions['center'];
    maxBounds?: MapboxOptions['maxBounds'];
    zoom?: [number];
    bearing?: [number];
    pitch?: [number];
    fitBoundsOptions?: MapboxOptions['fitBoundsOptions'];
    renderWorldCopies?: MapboxOptions['renderWorldCopies'];
    projection?: MapboxOptions['projection'];
    movingMethod: 'jumpTo' | 'easeTo' | 'flyTo';
    movingOptions?: MovingOptions;
    fitBounds?: LngLatBoundsLike;
    fitScreenCoordinates?: [PointLike, PointLike];
    centerWithPanTo?: boolean;
    panToOptions?: AnimationOptions;
    cursorStyle?: string;
    mapResize: EventEmitter<MapboxEvent<undefined> & EventData>;
    mapRemove: EventEmitter<MapboxEvent<undefined> & EventData>;
    mapMouseDown: EventEmitter<MapMouseEvent & EventData>;
    mapMouseUp: EventEmitter<MapMouseEvent & EventData>;
    mapMouseMove: EventEmitter<MapMouseEvent & EventData>;
    mapClick: EventEmitter<MapMouseEvent & EventData>;
    mapDblClick: EventEmitter<MapMouseEvent & EventData>;
    mapMouseOver: EventEmitter<MapMouseEvent & EventData>;
    mapMouseOut: EventEmitter<MapMouseEvent & EventData>;
    mapContextMenu: EventEmitter<MapMouseEvent & EventData>;
    mapTouchStart: EventEmitter<MapTouchEvent & EventData>;
    mapTouchEnd: EventEmitter<MapTouchEvent & EventData>;
    mapTouchMove: EventEmitter<MapTouchEvent & EventData>;
    mapTouchCancel: EventEmitter<MapTouchEvent & EventData>;
    mapWheel: EventEmitter<MapWheelEvent & EventData>;
    moveStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
    move: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
    moveEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
    mapDragStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    mapDrag: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    mapDragEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    zoomStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
    zoomEvt: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
    zoomEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
    rotateStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    rotate: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    rotateEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    pitchStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    pitchEvt: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    pitchEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    boxZoomStart: EventEmitter<MapBoxZoomEvent & EventData>;
    boxZoomEnd: EventEmitter<MapBoxZoomEvent & EventData>;
    boxZoomCancel: EventEmitter<MapBoxZoomEvent & EventData>;
    webGlContextLost: EventEmitter<MapContextEvent & EventData>;
    webGlContextRestored: EventEmitter<MapContextEvent & EventData>;
    mapLoad: EventEmitter<MapboxEvent<undefined> & EventData>;
    mapCreate: EventEmitter<Map>;
    idle: EventEmitter<MapboxEvent<undefined> & EventData>;
    render: EventEmitter<MapboxEvent<undefined> & EventData>;
    mapError: EventEmitter<ErrorEvent & EventData>;
    data: EventEmitter<MapDataEvent & EventData>;
    styleData: EventEmitter<MapStyleDataEvent & EventData>;
    sourceData: EventEmitter<MapSourceDataEvent & EventData>;
    dataLoading: EventEmitter<MapDataEvent & EventData>;
    styleDataLoading: EventEmitter<MapStyleDataEvent & EventData>;
    sourceDataLoading: EventEmitter<MapSourceDataEvent & EventData>;
    styleImageMissing: EventEmitter<{
        id: string;
    } & EventData>;
    /**
     * @deprecated Use mapResize instead
     */
    resize: EventEmitter<MapboxEvent<undefined> & EventData>;
    /**
     * @deprecated Use mapRemove instead
     */
    remove: EventEmitter<MapboxEvent<undefined> & EventData>;
    /**
     * @deprecated Use mapMouseDown instead
     */
    mouseDown: EventEmitter<MapMouseEvent & EventData>;
    /**
     * @deprecated Use mapMouseUp instead
     */
    mouseUp: EventEmitter<MapMouseEvent & EventData>;
    /**
     * @deprecated Use mapMouseMove instead
     */
    mouseMove: EventEmitter<MapMouseEvent & EventData>;
    /**
     * @deprecated Use mapClick instead
     */
    click: EventEmitter<MapMouseEvent & EventData>;
    /**
     * @deprecated Use mapDblClick instead
     */
    dblClick: EventEmitter<MapMouseEvent & EventData>;
    /**
     * @deprecated Use mapMouseOver instead
     */
    mouseOver: EventEmitter<MapMouseEvent & EventData>;
    /**
     * @deprecated Use mapMouseOut instead
     */
    mouseOut: EventEmitter<MapMouseEvent & EventData>;
    /**
     * @deprecated Use mapContextMenu instead
     */
    contextMenu: EventEmitter<MapMouseEvent & EventData>;
    /**
     * @deprecated Use mapTouchStart instead
     */
    touchStart: EventEmitter<MapTouchEvent & EventData>;
    /**
     * @deprecated Use mapTouchEnd instead
     */
    touchEnd: EventEmitter<MapTouchEvent & EventData>;
    /**
     * @deprecated Use mapTouchMove instead
     */
    touchMove: EventEmitter<MapTouchEvent & EventData>;
    /**
     * @deprecated Use mapTouchCancel instead
     */
    touchCancel: EventEmitter<MapTouchEvent & EventData>;
    /**
     * @deprecated Use mapWheel instead
     */
    wheel: EventEmitter<MapWheelEvent & EventData>;
    /**
     * @deprecated Use mapDragStart instead
     */
    dragStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    /**
     * @deprecated Use mapDrag instead
     */
    drag: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    /**
     * @deprecated Use mapDragEnd instead
     */
    dragEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
    /**
     * @deprecated Use mapLoad instead
     */
    load: EventEmitter<Map>;
    /**
     * @deprecated Use mapError instead
     */
    error: EventEmitter<ErrorEvent & EventData>;
    get mapInstance(): Map;
    mapContainer: ElementRef;
    constructor(mapService: MapService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    private warnDeprecatedOutputs;
    static ɵfac: i0.ɵɵFactoryDeclaration<MapComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MapComponent, "mgl-map", never, { "accessToken": { "alias": "accessToken"; "required": false; }; "collectResourceTiming": { "alias": "collectResourceTiming"; "required": false; }; "crossSourceCollisions": { "alias": "crossSourceCollisions"; "required": false; }; "customMapboxApiUrl": { "alias": "customMapboxApiUrl"; "required": false; }; "fadeDuration": { "alias": "fadeDuration"; "required": false; }; "hash": { "alias": "hash"; "required": false; }; "refreshExpiredTiles": { "alias": "refreshExpiredTiles"; "required": false; }; "failIfMajorPerformanceCaveat": { "alias": "failIfMajorPerformanceCaveat"; "required": false; }; "bearingSnap": { "alias": "bearingSnap"; "required": false; }; "interactive": { "alias": "interactive"; "required": false; }; "pitchWithRotate": { "alias": "pitchWithRotate"; "required": false; }; "clickTolerance": { "alias": "clickTolerance"; "required": false; }; "attributionControl": { "alias": "attributionControl"; "required": false; }; "logoPosition": { "alias": "logoPosition"; "required": false; }; "maxTileCacheSize": { "alias": "maxTileCacheSize"; "required": false; }; "localIdeographFontFamily": { "alias": "localIdeographFontFamily"; "required": false; }; "preserveDrawingBuffer": { "alias": "preserveDrawingBuffer"; "required": false; }; "trackResize": { "alias": "trackResize"; "required": false; }; "transformRequest": { "alias": "transformRequest"; "required": false; }; "bounds": { "alias": "bounds"; "required": false; }; "antialias": { "alias": "antialias"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "cooperativeGestures": { "alias": "cooperativeGestures"; "required": false; }; "minZoom": { "alias": "minZoom"; "required": false; }; "maxZoom": { "alias": "maxZoom"; "required": false; }; "minPitch": { "alias": "minPitch"; "required": false; }; "maxPitch": { "alias": "maxPitch"; "required": false; }; "scrollZoom": { "alias": "scrollZoom"; "required": false; }; "dragRotate": { "alias": "dragRotate"; "required": false; }; "touchPitch": { "alias": "touchPitch"; "required": false; }; "touchZoomRotate": { "alias": "touchZoomRotate"; "required": false; }; "doubleClickZoom": { "alias": "doubleClickZoom"; "required": false; }; "keyboard": { "alias": "keyboard"; "required": false; }; "dragPan": { "alias": "dragPan"; "required": false; }; "boxZoom": { "alias": "boxZoom"; "required": false; }; "style": { "alias": "style"; "required": false; }; "center": { "alias": "center"; "required": false; }; "maxBounds": { "alias": "maxBounds"; "required": false; }; "zoom": { "alias": "zoom"; "required": false; }; "bearing": { "alias": "bearing"; "required": false; }; "pitch": { "alias": "pitch"; "required": false; }; "fitBoundsOptions": { "alias": "fitBoundsOptions"; "required": false; }; "renderWorldCopies": { "alias": "renderWorldCopies"; "required": false; }; "projection": { "alias": "projection"; "required": false; }; "movingMethod": { "alias": "movingMethod"; "required": false; }; "movingOptions": { "alias": "movingOptions"; "required": false; }; "fitBounds": { "alias": "fitBounds"; "required": false; }; "fitScreenCoordinates": { "alias": "fitScreenCoordinates"; "required": false; }; "centerWithPanTo": { "alias": "centerWithPanTo"; "required": false; }; "panToOptions": { "alias": "panToOptions"; "required": false; }; "cursorStyle": { "alias": "cursorStyle"; "required": false; }; }, { "mapResize": "mapResize"; "mapRemove": "mapRemove"; "mapMouseDown": "mapMouseDown"; "mapMouseUp": "mapMouseUp"; "mapMouseMove": "mapMouseMove"; "mapClick": "mapClick"; "mapDblClick": "mapDblClick"; "mapMouseOver": "mapMouseOver"; "mapMouseOut": "mapMouseOut"; "mapContextMenu": "mapContextMenu"; "mapTouchStart": "mapTouchStart"; "mapTouchEnd": "mapTouchEnd"; "mapTouchMove": "mapTouchMove"; "mapTouchCancel": "mapTouchCancel"; "mapWheel": "mapWheel"; "moveStart": "moveStart"; "move": "move"; "moveEnd": "moveEnd"; "mapDragStart": "mapDragStart"; "mapDrag": "mapDrag"; "mapDragEnd": "mapDragEnd"; "zoomStart": "zoomStart"; "zoomEvt": "zoomEvt"; "zoomEnd": "zoomEnd"; "rotateStart": "rotateStart"; "rotate": "rotate"; "rotateEnd": "rotateEnd"; "pitchStart": "pitchStart"; "pitchEvt": "pitchEvt"; "pitchEnd": "pitchEnd"; "boxZoomStart": "boxZoomStart"; "boxZoomEnd": "boxZoomEnd"; "boxZoomCancel": "boxZoomCancel"; "webGlContextLost": "webGlContextLost"; "webGlContextRestored": "webGlContextRestored"; "mapLoad": "mapLoad"; "mapCreate": "mapCreate"; "idle": "idle"; "render": "render"; "mapError": "mapError"; "data": "data"; "styleData": "styleData"; "sourceData": "sourceData"; "dataLoading": "dataLoading"; "styleDataLoading": "styleDataLoading"; "sourceDataLoading": "sourceDataLoading"; "styleImageMissing": "styleImageMissing"; "resize": "resize"; "remove": "remove"; "mouseDown": "mouseDown"; "mouseUp": "mouseUp"; "mouseMove": "mouseMove"; "click": "click"; "dblClick": "dblClick"; "mouseOver": "mouseOver"; "mouseOut": "mouseOut"; "contextMenu": "contextMenu"; "touchStart": "touchStart"; "touchEnd": "touchEnd"; "touchMove": "touchMove"; "touchCancel": "touchCancel"; "wheel": "wheel"; "dragStart": "dragStart"; "drag": "drag"; "dragEnd": "dragEnd"; "load": "load"; "error": "error"; }, never, never, false, never>;
}
