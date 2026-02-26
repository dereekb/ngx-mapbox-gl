import { Injectable, InjectionToken, Injector, NgZone, afterEveryRender, inject, } from '@angular/core';
import { Map, Marker, Popup, } from 'mapbox-gl';
import { AsyncSubject, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');
export class MapService {
    zone = inject(NgZone);
    MAPBOX_API_KEY = inject(MAPBOX_API_KEY, {
        optional: true,
    });
    injector = inject(Injector);
    mapInstance;
    mapCreated$;
    mapLoaded$;
    mapEvents;
    mapCreated = new AsyncSubject();
    mapLoaded = new AsyncSubject();
    markersToRemove = [];
    popupsToRemove = [];
    imageIdsToRemove = [];
    subscription = new Subscription();
    constructor() {
        this.mapCreated$ = this.mapCreated.asObservable();
        this.mapLoaded$ = this.mapLoaded.asObservable();
    }
    setup(options) {
        const mapOptions = {
            ...options.mapOptions,
            bearing: Array.isArray(options.mapOptions.bearing)
                ? options.mapOptions.bearing[0]
                : options.mapOptions.bearing,
            zoom: Array.isArray(options.mapOptions.zoom)
                ? options.mapOptions.zoom[0]
                : options.mapOptions.zoom,
            pitch: Array.isArray(options.mapOptions.pitch)
                ? options.mapOptions.pitch[0]
                : options.mapOptions.pitch,
            accessToken: options.accessToken || this.MAPBOX_API_KEY || '',
        };
        this.createMap(mapOptions);
        this.hookEvents(options.mapEvents);
        this.mapEvents = options.mapEvents;
        this.mapCreated.next(undefined);
        this.mapCreated.complete();
        // Intentionally emit mapCreate after internal mapCreated event
        if (options.mapEvents.mapCreate.observed) {
            this.zone.run(() => {
                options.mapEvents.mapCreate.emit(this.mapInstance);
            });
        }
    }
    destroyMap() {
        if (this.mapInstance) {
            this.subscription.unsubscribe();
            this.mapInstance.remove();
        }
    }
    updateProjection(projection) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setProjection(projection);
        });
    }
    updateMinZoom(minZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMinZoom(minZoom);
        });
    }
    updateMaxZoom(maxZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxZoom(maxZoom);
        });
    }
    updateMinPitch(minPitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMinPitch(minPitch);
        });
    }
    updateMaxPitch(maxPitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxPitch(maxPitch);
        });
    }
    updateRenderWorldCopies(status) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setRenderWorldCopies(status);
        });
    }
    updateScrollZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.scrollZoom.enable()
                : this.mapInstance.scrollZoom.disable();
        });
    }
    updateDragRotate(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.dragRotate.enable()
                : this.mapInstance.dragRotate.disable();
        });
    }
    updateTouchPitch(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.touchPitch.enable()
                : this.mapInstance.touchPitch.disable();
        });
    }
    updateTouchZoomRotate(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.touchZoomRotate.enable()
                : this.mapInstance.touchZoomRotate.disable();
        });
    }
    updateDoubleClickZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.doubleClickZoom.enable()
                : this.mapInstance.doubleClickZoom.disable();
        });
    }
    updateKeyboard(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.keyboard.enable()
                : this.mapInstance.keyboard.disable();
        });
    }
    updateDragPan(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.dragPan.enable()
                : this.mapInstance.dragPan.disable();
        });
    }
    updateBoxZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status
                ? this.mapInstance.boxZoom.enable()
                : this.mapInstance.boxZoom.disable();
        });
    }
    updateStyle(style) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setStyle(style);
        });
    }
    updateMaxBounds(maxBounds) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxBounds(maxBounds);
        });
    }
    changeCanvasCursor(cursor) {
        const canvas = this.mapInstance.getCanvasContainer();
        canvas.style.cursor = cursor;
    }
    queryRenderedFeatures(pointOrBox, parameters) {
        return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
    }
    panTo(center, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.panTo(center, options);
        });
    }
    move(movingMethod, movingOptions, zoom, center, bearing, pitch) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance[movingMethod]({
                ...movingOptions,
                zoom: zoom != null ? zoom : this.mapInstance.getZoom(),
                center: center != null ? center : this.mapInstance.getCenter(),
                bearing: bearing != null ? bearing : this.mapInstance.getBearing(),
                pitch: pitch != null ? pitch : this.mapInstance.getPitch(),
            });
        });
    }
    addLayer(layer, bindEvents, before) {
        this.zone.runOutsideAngular(() => {
            Object.keys(layer.layerOptions).forEach((key) => {
                const tkey = key;
                if (layer.layerOptions[tkey] === undefined) {
                    delete layer.layerOptions[tkey];
                }
            });
            this.mapInstance.addLayer(layer.layerOptions, before);
            if (bindEvents) {
                if (layer.layerEvents.layerClick.observed) {
                    this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerClick.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerDblClick.observed) {
                    this.mapInstance.on('dblclick', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerDblClick.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseDown.observed) {
                    this.mapInstance.on('mousedown', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseDown.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseUp.observed) {
                    this.mapInstance.on('mouseup', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseUp.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseEnter.observed) {
                    this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseEnter.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseLeave.observed) {
                    this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseLeave.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseMove.observed) {
                    this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseMove.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseOver.observed) {
                    this.mapInstance.on('mouseover', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseOver.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseOut.observed) {
                    this.mapInstance.on('mouseout', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseOut.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerContextMenu.observed) {
                    this.mapInstance.on('contextmenu', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerContextMenu.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchStart.observed) {
                    this.mapInstance.on('touchstart', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchStart.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchEnd.observed) {
                    this.mapInstance.on('touchend', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchEnd.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchCancel.observed) {
                    this.mapInstance.on('touchcancel', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchCancel.emit(evt);
                        });
                    });
                }
            }
        });
    }
    removeLayer(layerId) {
        this.zone.runOutsideAngular(() => {
            if (this.mapInstance.getLayer(layerId) != null) {
                this.mapInstance.removeLayer(layerId);
            }
        });
    }
    addMarker(marker) {
        const options = {
            offset: marker.markersOptions.offset,
            anchor: marker.markersOptions.anchor,
            draggable: marker.markersOptions.draggable,
            rotationAlignment: marker.markersOptions.rotationAlignment,
            pitchAlignment: marker.markersOptions.pitchAlignment,
            clickTolerance: marker.markersOptions.clickTolerance,
        };
        Object.keys(options).forEach((key) => {
            const tkey = key;
            if (options[tkey] === undefined) {
                delete options[tkey];
            }
        });
        if (marker.markersOptions.element.childNodes.length > 0) {
            options.element = marker.markersOptions.element;
        }
        const markerInstance = new Marker(options);
        if (marker.markersEvents.markerDragStart.observed) {
            markerInstance.on('dragstart', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDragStart.emit(target);
                    });
                }
            });
        }
        /*
    
         */
        if (marker.markersEvents.markerDrag.observed) {
            markerInstance.on('drag', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDrag.emit(target);
                    });
                }
            });
        }
        if (marker.markersEvents.markerDragEnd.observed) {
            markerInstance.on('dragend', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDragEnd.emit(target);
                    });
                }
            });
        }
        const lngLat = marker.markersOptions.feature
            ? marker.markersOptions.feature.geometry.coordinates
            : marker.markersOptions.lngLat;
        markerInstance.setLngLat(lngLat);
        return this.zone.runOutsideAngular(() => {
            markerInstance.addTo(this.mapInstance);
            return markerInstance;
        });
    }
    removeMarker(marker) {
        this.markersToRemove.push(marker);
    }
    createPopup(popup, element) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(popup.popupOptions).forEach((key) => {
                const tkey = key;
                return (popup.popupOptions[tkey] === undefined &&
                    delete popup.popupOptions[tkey]);
            });
            const popupInstance = new Popup(popup.popupOptions);
            popupInstance.setDOMContent(element);
            if (popup.popupEvents.popupClose.observed) {
                popupInstance.on('close', () => {
                    this.zone.run(() => {
                        popup.popupEvents.popupClose.emit();
                    });
                });
            }
            if (popup.popupEvents.popupOpen.observed) {
                popupInstance.on('open', () => {
                    this.zone.run(() => {
                        popup.popupEvents.popupOpen.emit();
                    });
                });
            }
            return popupInstance;
        });
    }
    addPopupToMap(popup, lngLat, skipOpenEvent = false) {
        return this.zone.runOutsideAngular(() => {
            if (skipOpenEvent && popup._listeners) {
                delete popup._listeners['open'];
            }
            popup.setLngLat(lngLat);
            popup.addTo(this.mapInstance);
        });
    }
    addPopupToMarker(marker, popup) {
        return this.zone.runOutsideAngular(() => {
            marker.setPopup(popup);
        });
    }
    removePopupFromMap(popup, skipCloseEvent = false) {
        if (skipCloseEvent && popup._listeners) {
            delete popup._listeners['close'];
        }
        this.popupsToRemove.push(popup);
    }
    removePopupFromMarker(marker) {
        return this.zone.runOutsideAngular(() => {
            marker.setPopup(undefined);
        });
    }
    addControl(control, position) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.addControl(control, position);
        });
    }
    removeControl(control) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.removeControl(control);
        });
    }
    async loadAndAddImage(imageId, url, options) {
        return this.zone.runOutsideAngular(() => new Promise((resolve, reject) => {
            this.mapInstance.loadImage(url, (error, image) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!image) {
                    reject(new Error('Image not loaded'));
                    return;
                }
                this.addImage(imageId, image, options);
                resolve();
            });
        }));
    }
    addImage(imageId, data, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.addImage(imageId, data, options);
        });
    }
    removeImage(imageId) {
        this.imageIdsToRemove.push(imageId);
    }
    addSource(sourceId, source) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(source).forEach((key) => {
                const tkey = key;
                return source[tkey] === undefined && delete source[tkey];
            });
            this.mapInstance.addSource(sourceId, source);
        });
    }
    getSource(sourceId) {
        return this.mapInstance.getSource(sourceId);
    }
    removeSource(sourceId) {
        this.zone.runOutsideAngular(() => {
            this.findLayersBySourceId(sourceId).forEach((layer) => this.mapInstance.removeLayer(layer.id));
            this.mapInstance.removeSource(sourceId);
        });
    }
    setLayerAllPaintProperty(layerId, paint) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(paint).forEach((key) => {
                const tKey = key;
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                this.mapInstance.setPaintProperty(layerId, tKey, paint[tKey]);
            });
        });
    }
    setLayerAllLayoutProperty(layerId, layout) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(layout).forEach((key) => {
                const tKey = key;
                // TODO Check for perf, setLayoutProperty only on changed layout props maybe
                this.mapInstance.setLayoutProperty(layerId, tKey, layout[tKey]);
            });
        });
    }
    setLayerFilter(layerId, filter) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setFilter(layerId, filter);
        });
    }
    setLayerBefore(layerId, beforeId) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.moveLayer(layerId, beforeId);
        });
    }
    setLayerZoomRange(layerId, minZoom, maxZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setLayerZoomRange(layerId, minZoom ? minZoom : 0, maxZoom ? maxZoom : 20);
        });
    }
    fitBounds(bounds, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.fitBounds(bounds, options);
        });
    }
    fitScreenCoordinates(points, bearing, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.fitScreenCoordinates(points[0], points[1], bearing, options);
        });
    }
    applyChanges() {
        this.zone.runOutsideAngular(() => {
            this.removeMarkers();
            this.removePopups();
            this.removeImages();
        });
    }
    createMap(options) {
        NgZone.assertNotInAngularZone();
        Object.keys(options).forEach((key) => {
            const tkey = key;
            if (options[tkey] === undefined) {
                delete options[tkey];
            }
        });
        this.mapInstance = new Map(options);
        afterEveryRender({
            write: () => {
                this.applyChanges();
            },
        }, { injector: this.injector });
    }
    removeMarkers() {
        for (const marker of this.markersToRemove) {
            marker.remove();
        }
        this.markersToRemove = [];
    }
    removePopups() {
        for (const popup of this.popupsToRemove) {
            popup.remove();
        }
        this.popupsToRemove = [];
    }
    removeImages() {
        for (const imageId of this.imageIdsToRemove) {
            this.mapInstance.removeImage(imageId);
        }
        this.imageIdsToRemove = [];
    }
    findLayersBySourceId(sourceId) {
        const layers = this.mapInstance.getStyle().layers;
        if (layers == null) {
            return [];
        }
        return layers.filter((l) => 'source' in l ? l.source === sourceId : false);
    }
    hookEvents(events) {
        this.mapInstance.on('load', (evt) => {
            this.mapLoaded.next(undefined);
            this.mapLoaded.complete();
            this.zone.run(() => {
                events.mapLoad.emit(evt);
            });
        });
        if (events.mapResize.observed) {
            this.mapInstance.on('resize', (evt) => this.zone.run(() => {
                events.mapResize.emit(evt);
            }));
        }
        if (events.mapRemove.observed) {
            this.mapInstance.on('remove', (evt) => this.zone.run(() => {
                events.mapRemove.emit(evt);
            }));
        }
        if (events.mapMouseDown.observed) {
            this.mapInstance.on('mousedown', (evt) => this.zone.run(() => {
                events.mapMouseDown.emit(evt);
            }));
        }
        if (events.mapMouseUp.observed) {
            this.mapInstance.on('mouseup', (evt) => this.zone.run(() => {
                events.mapMouseUp.emit(evt);
            }));
        }
        if (events.mapMouseMove.observed) {
            this.mapInstance.on('mousemove', (evt) => this.zone.run(() => {
                events.mapMouseMove.emit(evt);
            }));
        }
        if (events.mapClick.observed) {
            this.mapInstance.on('click', (evt) => this.zone.run(() => {
                events.mapClick.emit(evt);
            }));
        }
        if (events.mapDblClick.observed) {
            this.mapInstance.on('dblclick', (evt) => this.zone.run(() => {
                events.mapDblClick.emit(evt);
            }));
        }
        if (events.mapMouseOver.observed) {
            this.mapInstance.on('mouseover', (evt) => this.zone.run(() => {
                events.mapMouseOver.emit(evt);
            }));
        }
        if (events.mapMouseOut.observed) {
            this.mapInstance.on('mouseout', (evt) => this.zone.run(() => {
                events.mapMouseOut.emit(evt);
            }));
        }
        if (events.mapContextMenu.observed) {
            this.mapInstance.on('contextmenu', (evt) => this.zone.run(() => {
                events.mapContextMenu.emit(evt);
            }));
        }
        if (events.mapTouchStart.observed) {
            this.mapInstance.on('touchstart', (evt) => this.zone.run(() => {
                events.mapTouchStart.emit(evt);
            }));
        }
        if (events.mapTouchEnd.observed) {
            this.mapInstance.on('touchend', (evt) => this.zone.run(() => {
                events.mapTouchEnd.emit(evt);
            }));
        }
        if (events.mapTouchMove.observed) {
            this.mapInstance.on('touchmove', (evt) => this.zone.run(() => {
                events.mapTouchMove.emit(evt);
            }));
        }
        if (events.mapTouchCancel.observed) {
            this.mapInstance.on('touchcancel', (evt) => this.zone.run(() => {
                events.mapTouchCancel.emit(evt);
            }));
        }
        if (events.mapWheel.observed) {
            this.mapInstance.on('wheel', (evt) => this.zone.run(() => {
                events.mapWheel.emit(evt);
            }));
        }
        if (events.moveStart.observed) {
            this.mapInstance.on('movestart', (evt) => this.zone.run(() => events.moveStart.emit(evt)));
        }
        if (events.move.observed) {
            this.mapInstance.on('move', (evt) => this.zone.run(() => events.move.emit(evt)));
        }
        if (events.moveEnd.observed) {
            this.mapInstance.on('moveend', (evt) => this.zone.run(() => events.moveEnd.emit(evt)));
        }
        if (events.mapDragStart.observed) {
            this.mapInstance.on('dragstart', (evt) => this.zone.run(() => events.mapDragStart.emit(evt)));
        }
        if (events.mapDrag.observed) {
            this.mapInstance.on('drag', (evt) => this.zone.run(() => events.mapDrag.emit(evt)));
        }
        if (events.mapDragEnd.observed) {
            this.mapInstance.on('dragend', (evt) => this.zone.run(() => events.mapDragEnd.emit(evt)));
        }
        if (events.zoomStart.observed) {
            this.mapInstance.on('zoomstart', () => this.zone.run(() => events.zoomStart.emit()));
        }
        if (events.zoomEvt.observed) {
            this.mapInstance.on('zoom', () => this.zone.run(() => events.zoomEvt.emit()));
        }
        if (events.zoomEnd.observed) {
            this.mapInstance.on('zoomend', () => this.zone.run(() => events.zoomEnd.emit()));
        }
        if (events.rotateStart.observed) {
            this.mapInstance.on('rotatestart', (evt) => this.zone.run(() => events.rotateStart.emit(evt)));
        }
        if (events.rotate.observed) {
            this.mapInstance.on('rotate', (evt) => this.zone.run(() => events.rotate.emit(evt)));
        }
        if (events.rotateEnd.observed) {
            this.mapInstance.on('rotateend', (evt) => this.zone.run(() => events.rotateEnd.emit(evt)));
        }
        if (events.pitchStart.observed) {
            this.mapInstance.on('pitchstart', () => this.zone.run(() => events.pitchStart.emit()));
        }
        if (events.pitchEvt.observed) {
            this.mapInstance.on('pitch', () => this.zone.run(() => events.pitchEvt.emit()));
        }
        if (events.pitchEnd.observed) {
            this.mapInstance.on('pitchend', () => this.zone.run(() => events.pitchEnd.emit()));
        }
        if (events.boxZoomStart.observed) {
            this.mapInstance.on('boxzoomstart', (evt) => this.zone.run(() => events.boxZoomStart.emit(evt)));
        }
        if (events.boxZoomEnd.observed) {
            this.mapInstance.on('boxzoomend', (evt) => this.zone.run(() => events.boxZoomEnd.emit(evt)));
        }
        if (events.boxZoomCancel.observed) {
            this.mapInstance.on('boxzoomcancel', (evt) => this.zone.run(() => events.boxZoomCancel.emit(evt)));
        }
        if (events.webGlContextLost.observed) {
            this.mapInstance.on('webglcontextlost', (evt) => this.zone.run(() => events.webGlContextLost.emit(evt)));
        }
        if (events.webGlContextRestored.observed) {
            this.mapInstance.on('webglcontextrestored', (evt) => this.zone.run(() => events.webGlContextRestored.emit(evt)));
        }
        if (events.render.observed) {
            this.mapInstance.on('render', () => this.zone.run(() => events.render.emit()));
        }
        if (events.mapError.observed) {
            this.mapInstance.on('error', (evt) => this.zone.run(() => events.mapError.emit(evt.error)));
        }
        if (events.data.observed) {
            this.mapInstance.on('data', (evt) => this.zone.run(() => events.data.emit(evt)));
        }
        if (events.styleData.observed) {
            this.mapInstance.on('styledata', (evt) => this.zone.run(() => events.styleData.emit(evt)));
        }
        if (events.sourceData.observed) {
            this.mapInstance.on('sourcedata', (evt) => this.zone.run(() => events.sourceData.emit(evt)));
        }
        if (events.dataLoading.observed) {
            this.mapInstance.on('dataloading', (evt) => this.zone.run(() => events.dataLoading.emit(evt)));
        }
        if (events.styleDataLoading.observed) {
            this.mapInstance.on('styledataloading', (evt) => this.zone.run(() => events.styleDataLoading.emit(evt)));
        }
        if (events.sourceDataLoading.observed) {
            this.mapInstance.on('sourcedataloading', (evt) => this.zone.run(() => events.sourceDataLoading.emit(evt)));
        }
        if (events.styleImageMissing.observed) {
            this.mapInstance.on('styleimagemissing', (evt) => this.zone.run(() => events.styleImageMissing.emit(evt)));
        }
        if (events.idle.observed) {
            this.mapInstance.on('idle', () => this.zone.run(() => events.idle.emit()));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MapService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MapService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MapService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=map.service.js.map