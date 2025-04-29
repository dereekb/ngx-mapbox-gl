import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
  input,
  InjectionToken,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MapService, MovingOptions } from './map.service';
import type {
  AnimationOptions,
  LngLatBoundsLike,
  Map,
  MapContextEvent,
  MapDataEvent,
  MapEvent,
  MapEvents,
  MapMouseEvent,
  MapOptions,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
  PointLike,
} from 'mapbox-gl';

/**
 * Default options for the MapComponent.
 * 
 * @see MAP_COMPONENT_INITIALIZATION_OPTIONS
 */
export interface MapComponentInitializationOptions extends MapOptions { }

/**
 * InjectionToken used for injecting default options to the MapComponent before it initializes.
 */
export const MAP_COMPONENT_INITIALIZATION_OPTIONS = new InjectionToken<MapComponentInitializationOptions>('MapComponentInitializationOptions');

@Component({
  standalone: true,
  selector: 'mgl-map',
  template: '<div #container></div>',
  styles: [
    `
      :host {
        display: block;
      }
      div {
        height: 100%;
        width: 100%;
      }
    `,
  ],
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges, OnDestroy {

  private readonly mapService = inject(MapService);
  private readonly initialMapOptions = inject(MAP_COMPONENT_INITIALIZATION_OPTIONS, { optional: true });

  /* Init inputs */
  accessToken = input<MapOptions['accessToken']>(this.initialMapOptions?.accessToken);
  collectResourceTiming = input<MapOptions['collectResourceTiming']>(this.initialMapOptions?.collectResourceTiming);
  crossSourceCollisions = input<MapOptions['crossSourceCollisions']>(this.initialMapOptions?.crossSourceCollisions);
  fadeDuration = input<MapOptions['fadeDuration']>(this.initialMapOptions?.fadeDuration);
  hash = input<MapOptions['hash']>(this.initialMapOptions?.hash);
  refreshExpiredTiles = input<MapOptions['refreshExpiredTiles']>(this.initialMapOptions?.refreshExpiredTiles);
  failIfMajorPerformanceCaveat =
    input<MapOptions['failIfMajorPerformanceCaveat']>(this.initialMapOptions?.failIfMajorPerformanceCaveat);
  bearingSnap = input<MapOptions['bearingSnap']>(this.initialMapOptions?.bearingSnap);
  interactive = input<MapOptions['interactive']>(this.initialMapOptions?.interactive);
  pitchWithRotate = input<MapOptions['pitchWithRotate']>(this.initialMapOptions?.pitchWithRotate);
  clickTolerance = input<MapOptions['clickTolerance']>(this.initialMapOptions?.clickTolerance);
  attributionControl = input<MapOptions['attributionControl']>(this.initialMapOptions?.attributionControl);
  logoPosition = input<MapOptions['logoPosition']>(this.initialMapOptions?.logoPosition);
  maxTileCacheSize = input<MapOptions['maxTileCacheSize']>(this.initialMapOptions?.maxTileCacheSize);
  localIdeographFontFamily = input<MapOptions['localIdeographFontFamily']>(this.initialMapOptions?.localIdeographFontFamily);
  preserveDrawingBuffer = input<MapOptions['preserveDrawingBuffer']>(this.initialMapOptions?.preserveDrawingBuffer);
  trackResize = input<MapOptions['trackResize']>(this.initialMapOptions?.trackResize);
  transformRequest = input<MapOptions['transformRequest']>(this.initialMapOptions?.transformRequest);
  bounds = input<MapOptions['bounds']>(this.initialMapOptions?.bounds); // Use fitBounds for dynamic input
  antialias = input<MapOptions['antialias']>(this.initialMapOptions?.antialias);
  locale = input<MapOptions['locale']>(this.initialMapOptions?.locale);
  cooperativeGestures = input<MapOptions['cooperativeGestures']>(this.initialMapOptions?.cooperativeGestures);

  /* Dynamic inputs */
  minZoom = input<MapOptions['minZoom']>(this.initialMapOptions?.minZoom);
  maxZoom = input<MapOptions['maxZoom']>(this.initialMapOptions?.maxZoom);
  minPitch = input<MapOptions['minPitch']>(this.initialMapOptions?.minPitch);
  maxPitch = input<MapOptions['maxPitch']>(this.initialMapOptions?.maxPitch);
  scrollZoom = input<MapOptions['scrollZoom']>(this.initialMapOptions?.scrollZoom);
  dragRotate = input<MapOptions['dragRotate']>(this.initialMapOptions?.dragRotate);
  touchPitch = input<MapOptions['touchPitch']>(this.initialMapOptions?.touchPitch);
  touchZoomRotate = input<MapOptions['touchZoomRotate']>(this.initialMapOptions?.touchZoomRotate);
  doubleClickZoom = input<MapOptions['doubleClickZoom']>(this.initialMapOptions?.doubleClickZoom);
  keyboard = input<MapOptions['keyboard']>(this.initialMapOptions?.keyboard);
  dragPan = input<MapOptions['dragPan']>(this.initialMapOptions?.dragPan);
  boxZoom = input<MapOptions['boxZoom']>(this.initialMapOptions?.boxZoom);
  style = input<MapOptions['style']>(this.initialMapOptions?.style);
  center = input<MapOptions['center']>(this.initialMapOptions?.center);
  maxBounds = input<MapOptions['maxBounds']>(this.initialMapOptions?.maxBounds);
  zoom = input<[number] | undefined>(this.initialMapOptions?.zoom != null ? [this.initialMapOptions.zoom] : undefined);
  bearing = input<[number] | undefined>(this.initialMapOptions?.bearing != null ? [this.initialMapOptions.bearing] : undefined);
  pitch = input<[number] | undefined>(this.initialMapOptions?.pitch != null ? [this.initialMapOptions.pitch] : undefined);
  // First value goes to options.fitBoundsOptions. Subsequents changes are passed to fitBounds
  fitBoundsOptions = input<MapOptions['fitBoundsOptions']>(this.initialMapOptions?.fitBoundsOptions);
  renderWorldCopies = input<MapOptions['renderWorldCopies']>(this.initialMapOptions?.renderWorldCopies);
  projection = input<MapOptions['projection']>(this.initialMapOptions?.projection);
  /* Added by ngx-mapbox-gl */
  movingMethod = input<'jumpTo' | 'easeTo' | 'flyTo'>('flyTo');
  movingOptions = input<MovingOptions>();
  // => First value is a alias to bounds input (since mapbox 0.53.0). Subsequents changes are passed to fitBounds
  fitBounds = input<LngLatBoundsLike>();
  fitScreenCoordinates = input<[PointLike, PointLike]>();
  centerWithPanTo = input<boolean>();
  panToOptions = input<AnimationOptions>();
  cursorStyle = input<string>();

  // resizeEmitter = new Subject<MapEvent>();
  // mapResize = outputFromObservable(this.mapResizeEmitter);
  @Output() mapResize = new EventEmitter<MapEvent>();
  @Output() mapRemove = new EventEmitter<MapEvent>();
  @Output() mapMouseDown = new EventEmitter<MapMouseEvent>();
  @Output() mapMouseUp = new EventEmitter<MapMouseEvent>();
  @Output() mapMouseMove = new EventEmitter<MapMouseEvent>();
  @Output() mapClick = new EventEmitter<MapMouseEvent>();
  @Output() mapDblClick = new EventEmitter<MapMouseEvent>();
  @Output() mapMouseOver = new EventEmitter<MapMouseEvent>();
  @Output() mapMouseOut = new EventEmitter<MapMouseEvent>();
  @Output() mapContextMenu = new EventEmitter<MapMouseEvent>();
  @Output() mapTouchStart = new EventEmitter<MapTouchEvent>();
  @Output() mapTouchEnd = new EventEmitter<MapTouchEvent>();
  @Output() mapTouchMove = new EventEmitter<MapTouchEvent>();
  @Output() mapTouchCancel = new EventEmitter<MapTouchEvent>();
  @Output() mapWheel = new EventEmitter<MapWheelEvent>();
  @Output() moveStart = new EventEmitter<MapEvents['movestart']>();
  @Output() move = new EventEmitter<MapEvents['move']>();
  @Output() moveEnd = new EventEmitter<MapEvents['moveend']>();
  @Output() mapDragStart = new EventEmitter<MapEvents['dragstart']>();
  @Output() mapDrag = new EventEmitter<MapEvents['drag']>();
  @Output() mapDragEnd = new EventEmitter<MapEvents['dragend']>();
  @Output() zoomStart = new EventEmitter<void>();
  @Output() zoomEvt = new EventEmitter<void>();
  @Output() zoomEnd = new EventEmitter<void>();
  @Output() rotateStart = new EventEmitter<MapEvents['rotatestart']>();
  @Output() rotate = new EventEmitter<MapEvents['rotate']>();
  @Output() rotateEnd = new EventEmitter<MapEvents['rotateend']>();
  @Output() pitchStart = new EventEmitter<void>();
  @Output() pitchEvt = new EventEmitter<void>();
  @Output() pitchEnd = new EventEmitter<void>();
  @Output() boxZoomStart = new EventEmitter<MapEvents['boxzoomstart']>();
  @Output() boxZoomEnd = new EventEmitter<MapEvents['boxzoomend']>();
  @Output() boxZoomCancel = new EventEmitter<MapEvents['boxzoomcancel']>();
  @Output() webGlContextLost = new EventEmitter<MapContextEvent>();
  @Output() webGlContextRestored = new EventEmitter<MapContextEvent>();
  @Output() mapLoad = new EventEmitter<MapEvent>();
  @Output() mapCreate = new EventEmitter<Map>();
  @Output() idle = new EventEmitter<void>();
  @Output() render = new EventEmitter<void>();
  @Output() mapError = new EventEmitter<Error>();
  @Output() data = new EventEmitter<MapDataEvent>();
  @Output() styleData = new EventEmitter<MapStyleDataEvent>();
  @Output() sourceData = new EventEmitter<MapSourceDataEvent>();
  @Output() dataLoading = new EventEmitter<MapDataEvent>();
  @Output() styleDataLoading = new EventEmitter<MapStyleDataEvent>();
  @Output() sourceDataLoading = new EventEmitter<MapSourceDataEvent>();
  @Output() styleImageMissing = new EventEmitter<
    MapEvents['styleimagemissing']
  >();

  get mapInstance(): Map {
    return this.mapService.mapInstance;
  }

  @ViewChild('container', { static: true }) mapContainer: ElementRef;

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
          bounds: this.bounds() ? this.bounds()! : this.fitBounds(),
          fitBoundsOptions: this.fitBoundsOptions(),
          antialias: this.antialias(),
          locale: this.locale(),
          cooperativeGestures: this.cooperativeGestures(),
          projection: this.projection(),
        },
        mapEvents: this,
      });
      if (this.cursorStyle()) {
        this.mapService.changeCanvasCursor(this.cursorStyle()!);
      }
    });
  }

  ngOnDestroy() {
    this.mapService.destroyMap();
  }

  async ngOnChanges(changes: SimpleChanges) {
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
    if (
      changes['renderWorldCopies'] &&
      !changes['renderWorldCopies'].isFirstChange()
    ) {
      this.mapService.updateRenderWorldCopies(
        changes['renderWorldCopies'].currentValue,
      );
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
    if (
      changes['touchZoomRotate'] &&
      !changes['touchZoomRotate'].isFirstChange()
    ) {
      this.mapService.updateTouchZoomRotate(
        changes['touchZoomRotate'].currentValue,
      );
    }
    if (
      changes['doubleClickZoom'] &&
      !changes['doubleClickZoom'].isFirstChange()
    ) {
      this.mapService.updateDoubleClickZoom(
        changes['doubleClickZoom'].currentValue,
      );
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
    if (
      changes['fitBounds'] &&
      changes['fitBounds'].currentValue &&
      !changes['fitBounds'].isFirstChange()
    ) {
      this.mapService.fitBounds(
        changes['fitBounds'].currentValue,
        this.fitBoundsOptions(),
      );
    }
    if (
      changes['fitScreenCoordinates'] &&
      changes['fitScreenCoordinates'].currentValue
    ) {
      if (
        (this.center() || this.zoom() || this.pitch() || this.fitBounds()) &&
        changes['fitScreenCoordinates'].isFirstChange()
      ) {
        console.warn(
          '[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input',
        );
      }
      this.mapService.fitScreenCoordinates(
        changes['fitScreenCoordinates'].currentValue,
        this.bearing() ? this.bearing()![0] : 0,
        this.movingOptions(),
      );
    }
    if (
      this.centerWithPanTo() &&
      changes['center'] &&
      !changes['center'].isFirstChange() &&
      !changes['zoom'] &&
      !changes['bearing'] &&
      !changes['pitch']
    ) {
      this.mapService.panTo(this.center()!, this.panToOptions());
    } else if (
      (changes['center'] && !changes['center'].isFirstChange()) ||
      (changes['zoom'] && !changes['zoom'].isFirstChange()) ||
      (changes['bearing'] &&
        !changes['bearing'].isFirstChange() &&
        !changes['fitScreenCoordinates']) ||
      (changes['pitch'] && !changes['pitch'].isFirstChange())
    ) {
      this.mapService.move(
        this.movingMethod(),
        this.movingOptions(),
        changes['zoom'] && this.zoom() ? this.zoom()![0] : undefined,
        changes['center'] ? this.center() : undefined,
        changes['bearing'] && this.bearing()! ? this.bearing()![0] : undefined,
        changes['pitch'] && this.pitch() ? this.pitch()![0] : undefined,
      );
    }
  }
}
