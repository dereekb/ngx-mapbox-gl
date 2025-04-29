import { Injectable, InjectionToken, Injector, NgZone, afterRender, inject, } from '@angular/core';
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
            bearing: options.mapOptions.bearing?.[0],
            zoom: options.mapOptions.zoom?.[0],
            pitch: options.mapOptions.pitch?.[0],
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
        afterRender({
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MapService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MapService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MapService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9tYXAvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFVBQVUsRUFDVixjQUFjLEVBQ2QsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBQ1gsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxHQUFHLEVBQ0gsTUFBTSxFQUNOLEtBQUssR0FlTixNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQUUsWUFBWSxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHOUQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBc0RqRSxNQUFNLE9BQU8sVUFBVTtJQUNKLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsY0FBYyxHQUFHLE1BQU0sQ0FBZ0IsY0FBYyxFQUFFO1FBQ3RFLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFDO0lBQ2MsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU3QyxXQUFXLENBQU07SUFDakIsV0FBVyxDQUFtQjtJQUM5QixVQUFVLENBQW1CO0lBQzdCLFNBQVMsQ0FBYztJQUVmLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBQ3RDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBQ3JDLGVBQWUsR0FBYSxFQUFFLENBQUM7SUFDL0IsY0FBYyxHQUFZLEVBQUUsQ0FBQztJQUM3QixnQkFBZ0IsR0FBYSxFQUFFLENBQUM7SUFDaEMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFMUM7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFB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QyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ3JELENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQzNDLENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2hELENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2pELENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2xELENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3ZELENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3hELENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3hELENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUN4QyxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7d0dBaDVCVSxVQUFVOzRHQUFWLFVBQVU7OzRGQUFWLFVBQVU7a0JBRHRCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdGFibGUsXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBhZnRlclJlbmRlcixcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hcCxcbiAgTWFya2VyLFxuICBQb3B1cCxcbiAgdHlwZSBBbmltYXRpb25PcHRpb25zLFxuICB0eXBlIENhbnZhc1NvdXJjZSxcbiAgdHlwZSBFYXNpbmdPcHRpb25zLFxuICB0eXBlIEZpbHRlclNwZWNpZmljYXRpb24sXG4gIHR5cGUgTGF5ZXJTcGVjaWZpY2F0aW9uLFxuICB0eXBlIExheW91dFNwZWNpZmljYXRpb24sXG4gIHR5cGUgTG5nTGF0TGlrZSxcbiAgdHlwZSBNYXBPcHRpb25zLFxuICB0eXBlIE1hcmtlck9wdGlvbnMsXG4gIHR5cGUgUGFpbnRTcGVjaWZpY2F0aW9uLFxuICB0eXBlIFBvaW50TGlrZSxcbiAgdHlwZSBQb3B1cE9wdGlvbnMsXG4gIHR5cGUgU291cmNlLFxuICB0eXBlIFNvdXJjZVNwZWNpZmljYXRpb24sXG59IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBBc3luY1N1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGF5ZXJFdmVudHMsIE5neE1hcEV2ZW50IH0gZnJvbSAnLi9tYXAudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTWFwIHtcbiAgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIG1hcE9wdGlvbnM6IE9taXQ8TWFwT3B0aW9ucywgJ2JlYXJpbmcnIHwgJ3BpdGNoJyB8ICd6b29tJz4gJiB7XG4gICAgLyoqXG4gICAgICogTk9URTogVGhvc2VzIGFyZSBhcnJheXMgaW4gb3JkZXIgdG8gYmUgYWJsZSB0byBpbXBlcmF0aXZlbHkgY2hhbmdlIHRoZW0gaWYgdGhlIG1hcCBpcyBtb3ZlZCBtYW51YWxseVxuICAgICAqIFRPRE86IE1vdmUgdGhvc2VzIHRvIG1vZGVsKCkgbWF5YmVcbiAgICAgKi9cbiAgICBiZWFyaW5nPzogW251bWJlcl07XG4gICAgcGl0Y2g/OiBbbnVtYmVyXTtcbiAgICB6b29tPzogW251bWJlcl07XG4gIH07XG4gIG1hcEV2ZW50czogTmd4TWFwRXZlbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBMYXllciB7XG4gIGxheWVyT3B0aW9uczogUGFyYW1ldGVyczxNYXBbJ2FkZExheWVyJ10+WzBdO1xuICBsYXllckV2ZW50czogTGF5ZXJFdmVudHM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBQb3B1cCB7XG4gIHBvcHVwT3B0aW9uczogUG9wdXBPcHRpb25zO1xuICBwb3B1cEV2ZW50czoge1xuICAgIHBvcHVwT3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIHBvcHVwQ2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cE1hcmtlciB7XG4gIG1hcmtlcnNPcHRpb25zOiB7XG4gICAgcGl0Y2hBbGlnbm1lbnQ/OiBNYXJrZXJPcHRpb25zWydwaXRjaEFsaWdubWVudCddO1xuICAgIHJvdGF0aW9uQWxpZ25tZW50PzogTWFya2VyT3B0aW9uc1sncm90YXRpb25BbGlnbm1lbnQnXTtcbiAgICBvZmZzZXQ/OiBNYXJrZXJPcHRpb25zWydvZmZzZXQnXTtcbiAgICBhbmNob3I/OiBNYXJrZXJPcHRpb25zWydhbmNob3InXTtcbiAgICBkcmFnZ2FibGU/OiBNYXJrZXJPcHRpb25zWydkcmFnZ2FibGUnXTtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBmZWF0dXJlPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+O1xuICAgIGxuZ0xhdD86IExuZ0xhdExpa2U7XG4gICAgY2xpY2tUb2xlcmFuY2U/OiBNYXJrZXJPcHRpb25zWydjbGlja1RvbGVyYW5jZSddO1xuICB9O1xuICBtYXJrZXJzRXZlbnRzOiB7XG4gICAgbWFya2VyRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TWFya2VyPjtcbiAgICBtYXJrZXJEcmFnOiBFdmVudEVtaXR0ZXI8TWFya2VyPjtcbiAgICBtYXJrZXJEcmFnRW5kOiBFdmVudEVtaXR0ZXI8TWFya2VyPjtcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTW92aW5nT3B0aW9ucyA9XG4gIHwgUGFyYW1ldGVyczxNYXBbJ2p1bXBUbyddPlswXVxuICB8IFBhcmFtZXRlcnM8TWFwWydlYXNlVG8nXT5bMF1cbiAgfCBQYXJhbWV0ZXJzPE1hcFsnZmx5VG8nXT5bMF07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0FQSV9LRVkgPSBpbmplY3Q8c3RyaW5nIHwgbnVsbD4oTUFQQk9YX0FQSV9LRVksIHtcbiAgICBvcHRpb25hbDogdHJ1ZSxcbiAgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5qZWN0b3IgPSBpbmplY3QoSW5qZWN0b3IpO1xuXG4gIG1hcEluc3RhbmNlOiBNYXA7XG4gIG1hcENyZWF0ZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBtYXBMb2FkZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBtYXBFdmVudHM6IE5neE1hcEV2ZW50O1xuXG4gIHByaXZhdGUgbWFwQ3JlYXRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBtYXBMb2FkZWQgPSBuZXcgQXN5bmNTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgbWFya2Vyc1RvUmVtb3ZlOiBNYXJrZXJbXSA9IFtdO1xuICBwcml2YXRlIHBvcHVwc1RvUmVtb3ZlOiBQb3B1cFtdID0gW107XG4gIHByaXZhdGUgaW1hZ2VJZHNUb1JlbW92ZTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXBDcmVhdGVkJCA9IHRoaXMubWFwQ3JlYXRlZC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLm1hcExvYWRlZCQgPSB0aGlzLm1hcExvYWRlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHNldHVwKG9wdGlvbnM6IFNldHVwTWFwKSB7XG4gICAgY29uc3QgbWFwT3B0aW9ucyA9IHtcbiAgICAgIC4uLm9wdGlvbnMubWFwT3B0aW9ucyxcbiAgICAgIGJlYXJpbmc6IG9wdGlvbnMubWFwT3B0aW9ucy5iZWFyaW5nPy5bMF0sXG4gICAgICB6b29tOiBvcHRpb25zLm1hcE9wdGlvbnMuem9vbT8uWzBdLFxuICAgICAgcGl0Y2g6IG9wdGlvbnMubWFwT3B0aW9ucy5waXRjaD8uWzBdLFxuICAgICAgYWNjZXNzVG9rZW46IG9wdGlvbnMuYWNjZXNzVG9rZW4gfHwgdGhpcy5NQVBCT1hfQVBJX0tFWSB8fCAnJyxcbiAgICB9O1xuICAgIHRoaXMuY3JlYXRlTWFwKG1hcE9wdGlvbnMpO1xuICAgIHRoaXMuaG9va0V2ZW50cyhvcHRpb25zLm1hcEV2ZW50cyk7XG4gICAgdGhpcy5tYXBFdmVudHMgPSBvcHRpb25zLm1hcEV2ZW50cztcbiAgICB0aGlzLm1hcENyZWF0ZWQubmV4dCh1bmRlZmluZWQpO1xuICAgIHRoaXMubWFwQ3JlYXRlZC5jb21wbGV0ZSgpO1xuICAgIC8vIEludGVudGlvbmFsbHkgZW1pdCBtYXBDcmVhdGUgYWZ0ZXIgaW50ZXJuYWwgbWFwQ3JlYXRlZCBldmVudFxuICAgIGlmIChvcHRpb25zLm1hcEV2ZW50cy5tYXBDcmVhdGUub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBvcHRpb25zLm1hcEV2ZW50cy5tYXBDcmVhdGUuZW1pdCh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lNYXAoKSB7XG4gICAgaWYgKHRoaXMubWFwSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVByb2plY3Rpb24ocHJvamVjdGlvbjogTWFwT3B0aW9uc1sncHJvamVjdGlvbiddKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFByb2plY3Rpb24ocHJvamVjdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVNaW5ab29tKG1pblpvb206IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNaW5ab29tKG1pblpvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4Wm9vbShtYXhab29tOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4Wm9vbShtYXhab29tKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1pblBpdGNoKG1pblBpdGNoOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWluUGl0Y2gobWluUGl0Y2gpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4UGl0Y2gobWF4UGl0Y2g6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhQaXRjaChtYXhQaXRjaCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVSZW5kZXJXb3JsZENvcGllcyhzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0UmVuZGVyV29ybGRDb3BpZXMoc3RhdHVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVNjcm9sbFpvb20oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXNcbiAgICAgICAgPyB0aGlzLm1hcEluc3RhbmNlLnNjcm9sbFpvb20uZW5hYmxlKClcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLnNjcm9sbFpvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRHJhZ1JvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1c1xuICAgICAgICA/IHRoaXMubWFwSW5zdGFuY2UuZHJhZ1JvdGF0ZS5lbmFibGUoKVxuICAgICAgICA6IHRoaXMubWFwSW5zdGFuY2UuZHJhZ1JvdGF0ZS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVUb3VjaFBpdGNoKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS50b3VjaFBpdGNoLmVuYWJsZSgpXG4gICAgICAgIDogdGhpcy5tYXBJbnN0YW5jZS50b3VjaFBpdGNoLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1c1xuICAgICAgICA/IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmVuYWJsZSgpXG4gICAgICAgIDogdGhpcy5tYXBJbnN0YW5jZS50b3VjaFpvb21Sb3RhdGUuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRG91YmxlQ2xpY2tab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZW5hYmxlKClcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVLZXlib2FyZChzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1c1xuICAgICAgICA/IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZW5hYmxlKClcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURyYWdQYW4oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXNcbiAgICAgICAgPyB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZW5hYmxlKClcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQm94Wm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1c1xuICAgICAgICA/IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5lbmFibGUoKVxuICAgICAgICA6IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdHlsZShzdHlsZTogUGFyYW1ldGVyczxNYXBbJ3NldFN0eWxlJ10+WzBdKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFN0eWxlKHN0eWxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1heEJvdW5kcyhtYXhCb3VuZHM6IFBhcmFtZXRlcnM8TWFwWydzZXRNYXhCb3VuZHMnXT5bMF0pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4Qm91bmRzKG1heEJvdW5kcyk7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VDYW52YXNDdXJzb3IoY3Vyc29yOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1hcEluc3RhbmNlLmdldENhbnZhc0NvbnRhaW5lcigpO1xuICAgIGNhbnZhcy5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7XG4gIH1cblxuICBxdWVyeVJlbmRlcmVkRmVhdHVyZXMoXG4gICAgcG9pbnRPckJveDogUG9pbnRMaWtlIHwgW1BvaW50TGlrZSwgUG9pbnRMaWtlXSxcbiAgICBwYXJhbWV0ZXJzPzoge1xuICAgICAgbGF5ZXJzPzogc3RyaW5nW107XG4gICAgICBmaWx0ZXI/OiBGaWx0ZXJTcGVjaWZpY2F0aW9uO1xuICAgICAgdmFsaWRhdGU/OiBib29sZWFuO1xuICAgIH0sXG4gICk6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PltdIHtcbiAgICByZXR1cm4gdGhpcy5tYXBJbnN0YW5jZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMocG9pbnRPckJveCwgcGFyYW1ldGVycyk7XG4gIH1cblxuICBwYW5UbyhjZW50ZXI6IExuZ0xhdExpa2UsIG9wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnBhblRvKGNlbnRlciwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlKFxuICAgIG1vdmluZ01ldGhvZDogJ2p1bXBUbycgfCAnZWFzZVRvJyB8ICdmbHlUbycsXG4gICAgbW92aW5nT3B0aW9ucz86IE1vdmluZ09wdGlvbnMsXG4gICAgem9vbT86IG51bWJlcixcbiAgICBjZW50ZXI/OiBMbmdMYXRMaWtlLFxuICAgIGJlYXJpbmc/OiBudW1iZXIsXG4gICAgcGl0Y2g/OiBudW1iZXIsXG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZVttb3ZpbmdNZXRob2RdKHtcbiAgICAgICAgLi4ubW92aW5nT3B0aW9ucyxcbiAgICAgICAgem9vbTogem9vbSAhPSBudWxsID8gem9vbSA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpLFxuICAgICAgICBjZW50ZXI6IGNlbnRlciAhPSBudWxsID8gY2VudGVyIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRDZW50ZXIoKSxcbiAgICAgICAgYmVhcmluZzogYmVhcmluZyAhPSBudWxsID8gYmVhcmluZyA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0QmVhcmluZygpLFxuICAgICAgICBwaXRjaDogcGl0Y2ggIT0gbnVsbCA/IHBpdGNoIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRQaXRjaCgpLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRMYXllcihsYXllcjogU2V0dXBMYXllciwgYmluZEV2ZW50czogYm9vbGVhbiwgYmVmb3JlPzogc3RyaW5nKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGxheWVyLmxheWVyT3B0aW9ucykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IGtleSBhcyBrZXlvZiBQYXJhbWV0ZXJzPE1hcFsnYWRkTGF5ZXInXT5bMF07XG4gICAgICAgIGlmIChsYXllci5sYXllck9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBsYXllci5sYXllck9wdGlvbnNbdGtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRMYXllcihsYXllci5sYXllck9wdGlvbnMsIGJlZm9yZSk7XG4gICAgICBpZiAoYmluZEV2ZW50cykge1xuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJDbGljay5vYnNlcnZlZCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJDbGljay5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJEYmxDbGljay5vYnNlcnZlZCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RibGNsaWNrJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJEYmxDbGljay5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZURvd24ub2JzZXJ2ZWQpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWRvd24nLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlRG93bi5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZVVwLm9ic2VydmVkKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2V1cCcsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VVcC5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZUVudGVyLm9ic2VydmVkKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VlbnRlcicsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VFbnRlci5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZUxlYXZlLm9ic2VydmVkKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VMZWF2ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU1vdmUub2JzZXJ2ZWQpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW1vdmUnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlTW92ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU92ZXIub2JzZXJ2ZWQpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW92ZXInLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlT3Zlci5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU91dC5vYnNlcnZlZCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3V0JywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU91dC5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJDb250ZXh0TWVudS5vYnNlcnZlZCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NvbnRleHRtZW51JywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJDb250ZXh0TWVudS5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJUb3VjaFN0YXJ0Lm9ic2VydmVkKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hzdGFydCcsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyVG91Y2hTdGFydC5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJUb3VjaEVuZC5vYnNlcnZlZCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoZW5kJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJUb3VjaEVuZC5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJUb3VjaENhbmNlbC5vYnNlcnZlZCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoY2FuY2VsJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJUb3VjaENhbmNlbC5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTGF5ZXIobGF5ZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLm1hcEluc3RhbmNlLmdldExheWVyKGxheWVySWQpICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVMYXllcihsYXllcklkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IFNldHVwTWFya2VyKSB7XG4gICAgY29uc3Qgb3B0aW9uczogTWFya2VyT3B0aW9ucyA9IHtcbiAgICAgIG9mZnNldDogbWFya2VyLm1hcmtlcnNPcHRpb25zLm9mZnNldCxcbiAgICAgIGFuY2hvcjogbWFya2VyLm1hcmtlcnNPcHRpb25zLmFuY2hvcixcbiAgICAgIGRyYWdnYWJsZTogbWFya2VyLm1hcmtlcnNPcHRpb25zLmRyYWdnYWJsZSxcbiAgICAgIHJvdGF0aW9uQWxpZ25tZW50OiBtYXJrZXIubWFya2Vyc09wdGlvbnMucm90YXRpb25BbGlnbm1lbnQsXG4gICAgICBwaXRjaEFsaWdubWVudDogbWFya2VyLm1hcmtlcnNPcHRpb25zLnBpdGNoQWxpZ25tZW50LFxuICAgICAgY2xpY2tUb2xlcmFuY2U6IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5jbGlja1RvbGVyYW5jZSxcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB0a2V5ID0ga2V5IGFzIGtleW9mIE1hcmtlck9wdGlvbnM7XG4gICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChtYXJrZXIubWFya2Vyc09wdGlvbnMuZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIG9wdGlvbnMuZWxlbWVudCA9IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5lbGVtZW50O1xuICAgIH1cbiAgICBjb25zdCBtYXJrZXJJbnN0YW5jZSA9IG5ldyBNYXJrZXIob3B0aW9ucyk7XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzRXZlbnRzLm1hcmtlckRyYWdTdGFydC5vYnNlcnZlZCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWdzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQgYXMgeyB0YXJnZXQ6IE1hcmtlciB9O1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgbWFya2VyLm1hcmtlcnNFdmVudHMubWFya2VyRHJhZ1N0YXJ0LmVtaXQodGFyZ2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qXG5cbiAgICAgKi9cbiAgICBpZiAobWFya2VyLm1hcmtlcnNFdmVudHMubWFya2VyRHJhZy5vYnNlcnZlZCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWcnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50IGFzIHsgdGFyZ2V0OiBNYXJrZXIgfTtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIG1hcmtlci5tYXJrZXJzRXZlbnRzLm1hcmtlckRyYWcuZW1pdCh0YXJnZXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzRXZlbnRzLm1hcmtlckRyYWdFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIG1hcmtlckluc3RhbmNlLm9uKCdkcmFnZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudCBhcyB7IHRhcmdldDogTWFya2VyIH07XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBtYXJrZXIubWFya2Vyc0V2ZW50cy5tYXJrZXJEcmFnRW5kLmVtaXQodGFyZ2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGxuZ0xhdDogTG5nTGF0TGlrZSA9IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5mZWF0dXJlXG4gICAgICA/IChtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMgYXMgW1xuICAgICAgICAgIG51bWJlcixcbiAgICAgICAgICBudW1iZXIsXG4gICAgICAgIF0pXG4gICAgICA6IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5sbmdMYXQhO1xuICAgIG1hcmtlckluc3RhbmNlLnNldExuZ0xhdChsbmdMYXQpO1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VySW5zdGFuY2UuYWRkVG8odGhpcy5tYXBJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gbWFya2VySW5zdGFuY2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIobWFya2VyOiBNYXJrZXIpIHtcbiAgICB0aGlzLm1hcmtlcnNUb1JlbW92ZS5wdXNoKG1hcmtlcik7XG4gIH1cblxuICBjcmVhdGVQb3B1cChwb3B1cDogU2V0dXBQb3B1cCwgZWxlbWVudDogTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocG9wdXAucG9wdXBPcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IGtleSBhcyBrZXlvZiBQb3B1cE9wdGlvbnM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgcG9wdXAucG9wdXBPcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBkZWxldGUgcG9wdXAucG9wdXBPcHRpb25zW3RrZXldXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2UgPSBuZXcgUG9wdXAocG9wdXAucG9wdXBPcHRpb25zKTtcbiAgICAgIHBvcHVwSW5zdGFuY2Uuc2V0RE9NQ29udGVudChlbGVtZW50KTtcbiAgICAgIGlmIChwb3B1cC5wb3B1cEV2ZW50cy5wb3B1cENsb3NlLm9ic2VydmVkKSB7XG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMucG9wdXBDbG9zZS5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHBvcHVwLnBvcHVwRXZlbnRzLnBvcHVwT3Blbi5vYnNlcnZlZCkge1xuICAgICAgICBwb3B1cEluc3RhbmNlLm9uKCdvcGVuJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMucG9wdXBPcGVuLmVtaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9wdXBJbnN0YW5jZTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXAocG9wdXA6IFBvcHVwLCBsbmdMYXQ6IExuZ0xhdExpa2UsIHNraXBPcGVuRXZlbnQgPSBmYWxzZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHNraXBPcGVuRXZlbnQgJiYgcG9wdXAuX2xpc3RlbmVycykge1xuICAgICAgICBkZWxldGUgcG9wdXAuX2xpc3RlbmVyc1snb3BlbiddO1xuICAgICAgfVxuICAgICAgcG9wdXAuc2V0TG5nTGF0KGxuZ0xhdCk7XG4gICAgICBwb3B1cC5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXJrZXIobWFya2VyOiBNYXJrZXIsIHBvcHVwOiBQb3B1cCkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHBvcHVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcChwb3B1cDogUG9wdXAsIHNraXBDbG9zZUV2ZW50ID0gZmFsc2UpIHtcbiAgICBpZiAoc2tpcENsb3NlRXZlbnQgJiYgcG9wdXAuX2xpc3RlbmVycykge1xuICAgICAgZGVsZXRlIHBvcHVwLl9saXN0ZW5lcnNbJ2Nsb3NlJ107XG4gICAgfVxuICAgIHRoaXMucG9wdXBzVG9SZW1vdmUucHVzaChwb3B1cCk7XG4gIH1cblxuICByZW1vdmVQb3B1cEZyb21NYXJrZXIobWFya2VyOiBNYXJrZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIG1hcmtlci5zZXRQb3B1cCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkQ29udHJvbChcbiAgICBjb250cm9sOiBQYXJhbWV0ZXJzPE1hcFsnYWRkQ29udHJvbCddPlswXSxcbiAgICBwb3NpdGlvbj86IFBhcmFtZXRlcnM8TWFwWydhZGRDb250cm9sJ10+WzFdLFxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkQ29udHJvbChjb250cm9sLCBwb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb250cm9sKGNvbnRyb2w6IFBhcmFtZXRlcnM8TWFwWydyZW1vdmVDb250cm9sJ10+WzBdKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUNvbnRyb2woY29udHJvbCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsb2FkQW5kQWRkSW1hZ2UoXG4gICAgaW1hZ2VJZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBQYXJhbWV0ZXJzPE1hcFsnYWRkSW1hZ2UnXT5bMl0sXG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAoKSA9PlxuICAgICAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5sb2FkSW1hZ2UodXJsLCAoZXJyb3IsIGltYWdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpbWFnZSkge1xuICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdJbWFnZSBub3QgbG9hZGVkJykpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkZEltYWdlKGltYWdlSWQsIGltYWdlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIGFkZEltYWdlKFxuICAgIGltYWdlSWQ6IFBhcmFtZXRlcnM8TWFwWydhZGRJbWFnZSddPlswXSxcbiAgICBkYXRhOiBQYXJhbWV0ZXJzPE1hcFsnYWRkSW1hZ2UnXT5bMV0sXG4gICAgb3B0aW9ucz86IFBhcmFtZXRlcnM8TWFwWydhZGRJbWFnZSddPlsyXSxcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZEltYWdlKGltYWdlSWQsIGRhdGEsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlSW1hZ2UoaW1hZ2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlLnB1c2goaW1hZ2VJZCk7XG4gIH1cblxuICBhZGRTb3VyY2UoXG4gICAgc291cmNlSWQ6IHN0cmluZyxcbiAgICBzb3VyY2U6IFNvdXJjZVNwZWNpZmljYXRpb24gfCBDYW52YXNTb3VyY2VbJ29wdGlvbnMnXSxcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0ga2V5IGFzIGtleW9mIFNvdXJjZVNwZWNpZmljYXRpb247XG4gICAgICAgIHJldHVybiBzb3VyY2VbdGtleV0gPT09IHVuZGVmaW5lZCAmJiBkZWxldGUgc291cmNlW3RrZXldO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZFNvdXJjZShzb3VyY2VJZCwgc291cmNlIGFzIFNvdXJjZVNwZWNpZmljYXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0U291cmNlPFQgZXh0ZW5kcyBTb3VyY2U+KHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBJbnN0YW5jZS5nZXRTb3VyY2U8VD4oc291cmNlSWQpO1xuICB9XG5cbiAgcmVtb3ZlU291cmNlKHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5maW5kTGF5ZXJzQnlTb3VyY2VJZChzb3VyY2VJZCkuZm9yRWFjaCgobGF5ZXIpID0+XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlTGF5ZXIobGF5ZXIuaWQpLFxuICAgICAgKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlU291cmNlKHNvdXJjZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyQWxsUGFpbnRQcm9wZXJ0eShsYXllcklkOiBzdHJpbmcsIHBhaW50OiBQYWludFNwZWNpZmljYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBhaW50KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgdEtleSA9IGtleSBhcyBrZXlvZiBQYWludFNwZWNpZmljYXRpb247XG4gICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIHBlcmYsIHNldFBhaW50UHJvcGVydHkgb25seSBvbiBjaGFuZ2VkIHBhaW50IHByb3BzIG1heWJlXG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0UGFpbnRQcm9wZXJ0eShsYXllcklkLCB0S2V5LCBwYWludFt0S2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyQWxsTGF5b3V0UHJvcGVydHkobGF5ZXJJZDogc3RyaW5nLCBsYXlvdXQ6IExheW91dFNwZWNpZmljYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGxheW91dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHRLZXkgPSBrZXkgYXMga2V5b2YgTGF5b3V0U3BlY2lmaWNhdGlvbjtcbiAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgcGVyZiwgc2V0TGF5b3V0UHJvcGVydHkgb25seSBvbiBjaGFuZ2VkIGxheW91dCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldExheW91dFByb3BlcnR5KGxheWVySWQsIHRLZXksIGxheW91dFt0S2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyRmlsdGVyKGxheWVySWQ6IHN0cmluZywgZmlsdGVyOiBGaWx0ZXJTcGVjaWZpY2F0aW9uW10pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0RmlsdGVyKGxheWVySWQsIGZpbHRlcik7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckJlZm9yZShsYXllcklkOiBzdHJpbmcsIGJlZm9yZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UubW92ZUxheWVyKGxheWVySWQsIGJlZm9yZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyWm9vbVJhbmdlKGxheWVySWQ6IHN0cmluZywgbWluWm9vbT86IG51bWJlciwgbWF4Wm9vbT86IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRMYXllclpvb21SYW5nZShcbiAgICAgICAgbGF5ZXJJZCxcbiAgICAgICAgbWluWm9vbSA/IG1pblpvb20gOiAwLFxuICAgICAgICBtYXhab29tID8gbWF4Wm9vbSA6IDIwLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpdEJvdW5kcyhcbiAgICBib3VuZHM6IFBhcmFtZXRlcnM8TWFwWydmaXRCb3VuZHMnXT5bMF0sXG4gICAgb3B0aW9ucz86IFBhcmFtZXRlcnM8TWFwWydmaXRCb3VuZHMnXT5bMV0sXG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5maXRCb3VuZHMoYm91bmRzLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpdFNjcmVlbkNvb3JkaW5hdGVzKFxuICAgIHBvaW50czogW1BvaW50TGlrZSwgUG9pbnRMaWtlXSxcbiAgICBiZWFyaW5nOiBudW1iZXIsXG4gICAgb3B0aW9ucz86IEVhc2luZ09wdGlvbnMsXG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5maXRTY3JlZW5Db29yZGluYXRlcyhcbiAgICAgICAgcG9pbnRzWzBdLFxuICAgICAgICBwb2ludHNbMV0sXG4gICAgICAgIGJlYXJpbmcsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXBwbHlDaGFuZ2VzKCkge1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcnMoKTtcbiAgICAgIHRoaXMucmVtb3ZlUG9wdXBzKCk7XG4gICAgICB0aGlzLnJlbW92ZUltYWdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXAob3B0aW9uczogTWFwT3B0aW9ucykge1xuICAgIE5nWm9uZS5hc3NlcnROb3RJbkFuZ3VsYXJab25lKCk7XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHRrZXkgPSBrZXkgYXMga2V5b2YgTWFwT3B0aW9ucztcbiAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZSA9IG5ldyBNYXAob3B0aW9ucyk7XG4gICAgYWZ0ZXJSZW5kZXIoXG4gICAgICB7XG4gICAgICAgIHdyaXRlOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hcHBseUNoYW5nZXMoKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7IGluamVjdG9yOiB0aGlzLmluamVjdG9yIH0sXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTWFya2VycygpIHtcbiAgICBmb3IgKGNvbnN0IG1hcmtlciBvZiB0aGlzLm1hcmtlcnNUb1JlbW92ZSkge1xuICAgICAgbWFya2VyLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLm1hcmtlcnNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVQb3B1cHMoKSB7XG4gICAgZm9yIChjb25zdCBwb3B1cCBvZiB0aGlzLnBvcHVwc1RvUmVtb3ZlKSB7XG4gICAgICBwb3B1cC5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5wb3B1cHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVJbWFnZXMoKSB7XG4gICAgZm9yIChjb25zdCBpbWFnZUlkIG9mIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVJbWFnZShpbWFnZUlkKTtcbiAgICB9XG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIGZpbmRMYXllcnNCeVNvdXJjZUlkKHNvdXJjZUlkOiBzdHJpbmcpOiBMYXllclNwZWNpZmljYXRpb25bXSB7XG4gICAgY29uc3QgbGF5ZXJzID0gdGhpcy5tYXBJbnN0YW5jZS5nZXRTdHlsZSgpLmxheWVycztcbiAgICBpZiAobGF5ZXJzID09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGF5ZXJzLmZpbHRlcigobCkgPT5cbiAgICAgICdzb3VyY2UnIGluIGwgPyBsLnNvdXJjZSA9PT0gc291cmNlSWQgOiBmYWxzZSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGV2ZW50czogTmd4TWFwRXZlbnQpIHtcbiAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgdGhpcy5tYXBMb2FkZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBMb2FkZWQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBldmVudHMubWFwTG9hZC5lbWl0KGV2dCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoZXZlbnRzLm1hcFJlc2l6ZS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVzaXplJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcFJlc2l6ZS5lbWl0KGV2dCk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBSZW1vdmUub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JlbW92ZScsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50cy5tYXBSZW1vdmUuZW1pdChldnQpO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubWFwTW91c2VEb3duLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWRvd24nLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwTW91c2VEb3duLmVtaXQoZXZ0KTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcE1vdXNlVXAub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNldXAnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwTW91c2VVcC5lbWl0KGV2dCk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBNb3VzZU1vdmUub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbW92ZScsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50cy5tYXBNb3VzZU1vdmUuZW1pdChldnQpO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubWFwQ2xpY2sub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcENsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcERibENsaWNrLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYmxjbGljaycsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50cy5tYXBEYmxDbGljay5lbWl0KGV2dCk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBNb3VzZU92ZXIub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3ZlcicsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50cy5tYXBNb3VzZU92ZXIuZW1pdChldnQpO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubWFwTW91c2VPdXQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3V0JywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcE1vdXNlT3V0LmVtaXQoZXZ0KTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcENvbnRleHRNZW51Lm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjb250ZXh0bWVudScsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50cy5tYXBDb250ZXh0TWVudS5lbWl0KGV2dCk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBUb3VjaFN0YXJ0Lm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaHN0YXJ0JywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcFRvdWNoU3RhcnQuZW1pdChldnQpO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubWFwVG91Y2hFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoZW5kJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcFRvdWNoRW5kLmVtaXQoZXZ0KTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcFRvdWNoTW92ZS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2htb3ZlJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcFRvdWNoTW92ZS5lbWl0KGV2dCk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBUb3VjaENhbmNlbC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hjYW5jZWwnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwVG91Y2hDYW5jZWwuZW1pdChldnQpO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubWFwV2hlZWwub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3doZWVsJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcFdoZWVsLmVtaXQoZXZ0KTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmVTdGFydC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZXN0YXJ0JywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZVN0YXJ0LmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmUub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdmUnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmVFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdmVlbmQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlRW5kLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcERyYWdTdGFydC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZHJhZ3N0YXJ0JywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubWFwRHJhZ1N0YXJ0LmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcERyYWcub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWcnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tYXBEcmFnLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcERyYWdFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tYXBEcmFnRW5kLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21TdGFydC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbXN0YXJ0JywgKCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuem9vbVN0YXJ0LmVtaXQoKSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FdnQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb20nLCAoKSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy56b29tRXZ0LmVtaXQoKSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb21lbmQnLCAoKSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy56b29tRW5kLmVtaXQoKSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZVN0YXJ0Lm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGVzdGFydCcsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJvdGF0ZVN0YXJ0LmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucm90YXRlLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZUVuZC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlZW5kJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucm90YXRlRW5kLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoc3RhcnQnLCAoKSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaFN0YXJ0LmVtaXQoKSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoRXZ0Lm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaCcsICgpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoRXZ0LmVtaXQoKSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoRW5kLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaGVuZCcsICgpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoRW5kLmVtaXQoKSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21TdGFydC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbXN0YXJ0JywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbVN0YXJ0LmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21FbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21lbmQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tRW5kLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21DYW5jZWwub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21jYW5jZWwnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tQ2FuY2VsLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dExvc3Qub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3dlYmdsY29udGV4dGxvc3QnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53ZWJHbENvbnRleHRMb3N0LmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRyZXN0b3JlZCcsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlbmRlci5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVuZGVyJywgKCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVuZGVyLmVtaXQoKSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcEVycm9yLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdlcnJvcicsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1hcEVycm9yLmVtaXQoZXZ0LmVycm9yKSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRhdGEub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RhdGEnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYXRhLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVkYXRhJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGEub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGEnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zb3VyY2VEYXRhLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRhdGFMb2FkaW5nLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhbG9hZGluZycsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRhdGFMb2FkaW5nLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YUxvYWRpbmcub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3N0eWxlZGF0YWxvYWRpbmcnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zdHlsZURhdGFMb2FkaW5nLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGFMb2FkaW5nLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzb3VyY2VkYXRhbG9hZGluZycsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnNvdXJjZURhdGFMb2FkaW5nLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlSW1hZ2VNaXNzaW5nLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWltYWdlbWlzc2luZycsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnN0eWxlSW1hZ2VNaXNzaW5nLmVtaXQoZXZ0KSksXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmlkbGUub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2lkbGUnLCAoKSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5pZGxlLmVtaXQoKSksXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19