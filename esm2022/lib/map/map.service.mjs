import { Inject, Injectable, InjectionToken, NgZone, Optional, } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { AsyncSubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import * as i0 from "@angular/core";
export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');
class MapService {
    constructor(zone, MAPBOX_API_KEY) {
        this.zone = zone;
        this.MAPBOX_API_KEY = MAPBOX_API_KEY;
        this.mapCreated = new AsyncSubject();
        this.mapLoaded = new AsyncSubject();
        this.markersToRemove = [];
        this.popupsToRemove = [];
        this.imageIdsToRemove = [];
        this.subscription = new Subscription();
        this.mapCreated$ = this.mapCreated.asObservable();
        this.mapLoaded$ = this.mapLoaded.asObservable();
    }
    setup(options) {
        // Need onStable to wait for a potential @angular/route transition to end
        this.zone.onStable.pipe(first()).subscribe(() => {
            // Workaround rollup issue
            // this.assign(
            //   MapboxGl,
            //   'accessToken',
            //   options.accessToken || this.MAPBOX_API_KEY
            // );
            if (options.customMapboxApiUrl) {
                MapboxGl.baseApiUrl = options.customMapboxApiUrl;
            }
            this.createMap({
                ...options.mapOptions,
                accessToken: options.accessToken || this.MAPBOX_API_KEY || '',
            });
            this.hookEvents(options.mapEvents);
            this.mapEvents = options.mapEvents;
            this.mapCreated.next(undefined);
            this.mapCreated.complete();
            // Intentionnaly emit mapCreate after internal mapCreated event
            if (options.mapEvents.mapCreate.observed) {
                this.zone.run(() => {
                    options.mapEvents.mapCreate.emit(this.mapInstance);
                });
            }
        });
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
                if (layer.layerEvents.layerClick.observed ||
                    layer.layerEvents.click.observed) {
                    this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerClick.emit(evt);
                            layer.layerEvents.click.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerDblClick.observed ||
                    layer.layerEvents.dblClick.observed) {
                    this.mapInstance.on('dblclick', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerDblClick.emit(evt);
                            layer.layerEvents.dblClick.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseDown.observed ||
                    layer.layerEvents.mouseDown.observed) {
                    this.mapInstance.on('mousedown', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseDown.emit(evt);
                            layer.layerEvents.mouseDown.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseUp.observed ||
                    layer.layerEvents.mouseUp.observed) {
                    this.mapInstance.on('mouseup', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseUp.emit(evt);
                            layer.layerEvents.mouseUp.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseEnter.observed ||
                    layer.layerEvents.mouseEnter.observed) {
                    this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseEnter.emit(evt);
                            layer.layerEvents.mouseEnter.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseLeave.observed ||
                    layer.layerEvents.mouseLeave.observed) {
                    this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseLeave.emit(evt);
                            layer.layerEvents.mouseLeave.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseMove.observed ||
                    layer.layerEvents.mouseMove.observed) {
                    this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseMove.emit(evt);
                            layer.layerEvents.mouseMove.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseOver.observed ||
                    layer.layerEvents.mouseOver.observed) {
                    this.mapInstance.on('mouseover', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseOver.emit(evt);
                            layer.layerEvents.mouseOver.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerMouseOut.observed ||
                    layer.layerEvents.mouseOut.observed) {
                    this.mapInstance.on('mouseout', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerMouseOut.emit(evt);
                            layer.layerEvents.mouseOut.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerContextMenu.observed ||
                    layer.layerEvents.contextMenu.observed) {
                    this.mapInstance.on('contextmenu', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerContextMenu.emit(evt);
                            layer.layerEvents.contextMenu.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchStart.observed ||
                    layer.layerEvents.touchStart.observed) {
                    this.mapInstance.on('touchstart', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchStart.emit(evt);
                            layer.layerEvents.touchStart.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchEnd.observed ||
                    layer.layerEvents.touchEnd.observed) {
                    this.mapInstance.on('touchend', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchEnd.emit(evt);
                            layer.layerEvents.touchEnd.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.layerTouchCancel.observed ||
                    layer.layerEvents.touchCancel.observed) {
                    this.mapInstance.on('touchcancel', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.layerTouchCancel.emit(evt);
                            layer.layerEvents.touchCancel.emit(evt);
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
            draggable: !!marker.markersOptions.draggable,
            rotationAlignment: marker.markersOptions.rotationAlignment,
            pitchAlignment: marker.markersOptions.pitchAlignment,
            clickTolerance: marker.markersOptions.clickTolerance,
        };
        if (marker.markersOptions.element.childNodes.length > 0) {
            options.element = marker.markersOptions.element;
        }
        const markerInstance = new MapboxGl.Marker(options);
        if (marker.markersEvents.markerDragStart.observed ||
            marker.markersEvents.dragStart.observed) {
            markerInstance.on('dragstart', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDragStart.emit(target);
                        marker.markersEvents.dragStart.emit(target);
                    });
                }
            });
        }
        /*
    
         */
        if (marker.markersEvents.markerDrag.observed ||
            marker.markersEvents.drag.observed) {
            markerInstance.on('drag', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDrag.emit(target);
                        marker.markersEvents.drag.emit(target);
                    });
                }
            });
        }
        if (marker.markersEvents.markerDragEnd.observed ||
            marker.markersEvents.dragEnd.observed) {
            markerInstance.on('dragend', (event) => {
                if (event) {
                    const { target } = event;
                    this.zone.run(() => {
                        marker.markersEvents.markerDragEnd.emit(target);
                        marker.markersEvents.dragEnd.emit(target);
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
            Object.keys(popup.popupOptions).forEach((key) => popup.popupOptions[key] === undefined &&
                delete popup.popupOptions[key]);
            const popupInstance = new MapboxGl.Popup(popup.popupOptions);
            popupInstance.setDOMContent(element);
            if (popup.popupEvents.popupClose.observed ||
                popup.popupEvents.close.observed) {
                popupInstance.on('close', () => {
                    this.zone.run(() => {
                        popup.popupEvents.popupClose.emit();
                        popup.popupEvents.close.emit();
                    });
                });
            }
            if (popup.popupEvents.popupOpen.observed ||
                popup.popupEvents.open.observed) {
                popupInstance.on('open', () => {
                    this.zone.run(() => {
                        popup.popupEvents.popupOpen.emit();
                        popup.popupEvents.open.emit();
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
            Object.keys(source).forEach((key) => source[key] === undefined && delete source[key]);
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
    setAllLayerPaintProperty(layerId, paint) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(paint).forEach((key) => {
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                this.mapInstance.setPaintProperty(layerId, key, paint[key]);
            });
        });
    }
    setAllLayerLayoutProperty(layerId, layout) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(layout).forEach((key) => {
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                this.mapInstance.setLayoutProperty(layerId, key, layout[key]);
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
    createMap(optionsWithAccessToken) {
        NgZone.assertNotInAngularZone();
        Object.keys(optionsWithAccessToken).forEach((key) => {
            const tkey = key;
            if (optionsWithAccessToken[tkey] === undefined) {
                delete optionsWithAccessToken[tkey];
            }
        });
        this.mapInstance = new MapboxGl.Map(optionsWithAccessToken);
        const isIEorEdge = window && /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        if (isIEorEdge) {
            this.mapInstance.setStyle(optionsWithAccessToken.style);
        }
        this.subscription.add(this.zone.onMicrotaskEmpty.subscribe(() => this.applyChanges()));
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
                events.load.emit(evt.target);
            });
        });
        if (events.mapResize.observed || events.resize.observed) {
            this.mapInstance.on('resize', (evt) => this.zone.run(() => {
                events.mapResize.emit(evt);
                events.resize.emit(evt);
            }));
        }
        if (events.mapRemove.observed || events.remove.observed) {
            this.mapInstance.on('remove', (evt) => this.zone.run(() => {
                events.mapRemove.emit(evt);
                events.remove.emit(evt);
            }));
        }
        if (events.mapMouseDown.observed || events.mouseDown.observed) {
            this.mapInstance.on('mousedown', (evt) => this.zone.run(() => {
                events.mapMouseDown.emit(evt);
                events.mouseDown.emit(evt);
            }));
        }
        if (events.mapMouseUp.observed || events.mouseUp.observed) {
            this.mapInstance.on('mouseup', (evt) => this.zone.run(() => {
                events.mapMouseUp.emit(evt);
                events.mouseUp.emit(evt);
            }));
        }
        if (events.mapMouseMove.observed || events.mouseMove.observed) {
            this.mapInstance.on('mousemove', (evt) => this.zone.run(() => {
                events.mapMouseMove.emit(evt);
                events.mouseMove.emit(evt);
            }));
        }
        if (events.mapClick.observed || events.click.observed) {
            this.mapInstance.on('click', (evt) => this.zone.run(() => {
                events.mapClick.emit(evt);
                events.click.emit(evt);
            }));
        }
        if (events.mapDblClick.observed || events.dblClick.observed) {
            this.mapInstance.on('dblclick', (evt) => this.zone.run(() => {
                events.mapDblClick.emit(evt);
                events.dblClick.emit(evt);
            }));
        }
        if (events.mapMouseOver.observed || events.mouseOver.observed) {
            this.mapInstance.on('mouseover', (evt) => this.zone.run(() => {
                events.mapMouseOver.emit(evt);
                events.mouseOver.emit(evt);
            }));
        }
        if (events.mapMouseOut.observed || events.mouseOut.observed) {
            this.mapInstance.on('mouseout', (evt) => this.zone.run(() => {
                events.mapMouseOut.emit(evt);
                events.mouseOut.emit(evt);
            }));
        }
        if (events.mapContextMenu.observed || events.contextMenu.observed) {
            this.mapInstance.on('contextmenu', (evt) => this.zone.run(() => {
                events.mapContextMenu.emit(evt);
                events.contextMenu.emit(evt);
            }));
        }
        if (events.mapTouchStart.observed || events.touchStart.observed) {
            this.mapInstance.on('touchstart', (evt) => this.zone.run(() => {
                events.mapTouchStart.emit(evt);
                events.touchStart.emit(evt);
            }));
        }
        if (events.mapTouchEnd.observed || events.touchEnd.observed) {
            this.mapInstance.on('touchend', (evt) => this.zone.run(() => {
                events.mapTouchEnd.emit(evt);
                events.touchEnd.emit(evt);
            }));
        }
        if (events.mapTouchMove.observed || events.touchMove.observed) {
            this.mapInstance.on('touchmove', (evt) => this.zone.run(() => {
                events.mapTouchMove.emit(evt);
                events.touchMove.emit(evt);
            }));
        }
        if (events.mapTouchCancel.observed || events.touchCancel.observed) {
            this.mapInstance.on('touchcancel', (evt) => this.zone.run(() => {
                events.mapTouchCancel.emit(evt);
                events.touchCancel.emit(evt);
            }));
        }
        if (events.mapWheel.observed || events.wheel.observed) {
            this.mapInstance.on('wheel', (evt) => this.zone.run(() => {
                events.mapWheel.emit(evt);
                events.wheel.emit(evt);
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
        if (events.mapDragStart.observed || events.dragStart.observed) {
            this.mapInstance.on('dragstart', (evt) => this.zone.run(() => {
                events.mapDragStart.emit(evt);
                events.dragStart.emit(evt);
            }));
        }
        if (events.mapDrag.observed || events.drag.observed) {
            this.mapInstance.on('drag', (evt) => this.zone.run(() => {
                events.mapDrag.emit(evt);
                events.drag.emit(evt);
            }));
        }
        if (events.mapDragEnd.observed || events.dragEnd.observed) {
            this.mapInstance.on('dragend', (evt) => this.zone.run(() => {
                events.mapDragEnd.emit(evt);
                events.dragEnd.emit(evt);
            }));
        }
        if (events.zoomStart.observed) {
            this.mapInstance.on('zoomstart', (evt) => this.zone.run(() => events.zoomStart.emit(evt)));
        }
        if (events.zoomEvt.observed) {
            this.mapInstance.on('zoom', (evt) => this.zone.run(() => events.zoomEvt.emit(evt)));
        }
        if (events.zoomEnd.observed) {
            this.mapInstance.on('zoomend', (evt) => this.zone.run(() => events.zoomEnd.emit(evt)));
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
            this.mapInstance.on('pitchstart', (evt) => this.zone.run(() => events.pitchStart.emit(evt)));
        }
        if (events.pitchEvt.observed) {
            this.mapInstance.on('pitch', (evt) => this.zone.run(() => events.pitchEvt.emit(evt)));
        }
        if (events.pitchEnd.observed) {
            this.mapInstance.on('pitchend', (evt) => this.zone.run(() => events.pitchEnd.emit(evt)));
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
            this.mapInstance.on('render', (evt) => this.zone.run(() => events.render.emit(evt)));
        }
        if (events.mapError.observed || events.error.observed) {
            this.mapInstance.on('error', (evt) => this.zone.run(() => {
                events.mapError.emit(evt);
                events.error.emit(evt);
            }));
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
            this.mapInstance.on('idle', (evt) => this.zone.run(() => events.idle.emit(evt)));
        }
    }
    // TODO move this elsewhere
    assign(obj, prop, value) {
        if (typeof prop === 'string') {
            // eslint-disable-next-line no-param-reassign
            prop = prop.split('.');
        }
        if (prop.length > 1) {
            const e = prop.shift();
            this.assign((obj[e] =
                Object.prototype.toString.call(obj[e]) === '[object Object]'
                    ? obj[e]
                    : {}), prop, value);
        }
        else {
            obj[prop[0]] = value;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapService, deps: [{ token: i0.NgZone }, { token: MAPBOX_API_KEY, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapService }); }
}
export { MapService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MapService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAPBOX_API_KEY]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9tYXAvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLE1BQU0sRUFDTixVQUFVLEVBQ1YsY0FBYyxFQUNkLE1BQU0sRUFDTixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFlBQVksRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQVF2QyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7QUEyRGpFLE1BQ2EsVUFBVTtJQWFyQixZQUNVLElBQVksRUFHSCxjQUE2QjtRQUh0QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBR0gsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFYeEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDdEMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDckMsb0JBQWUsR0FBc0IsRUFBRSxDQUFDO1FBQ3hDLG1CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUN0QyxxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFDaEMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUXhDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFpQjtRQUNyQix5RUFBeUU7UUFDekUsSUFBSSxDQUFDLElB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QUFDLENBQUMsQ0FDM0MsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELDJCQUEyQjtJQUNuQixNQUFNLENBQUMsR0FBUSxFQUFFLElBQVMsRUFBRSxLQUFVO1FBQzVDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVCLDZDQUE2QztZQUM3QyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQ1QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxpQkFBaUI7b0JBQzFELENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNSLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUNOLENBQUM7U0FDSDthQUFNO1lBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN0QjtJQUNILENBQUM7OEdBcGhDVSxVQUFVLHdDQWdCWCxjQUFjO2tIQWhCYixVQUFVOztTQUFWLFVBQVU7MkZBQVYsVUFBVTtrQkFEdEIsVUFBVTs7MEJBZ0JOLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBNYXBib3hHbCBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgQXN5bmNTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgTGF5ZXJFdmVudHMsXG4gIE1hcEV2ZW50LFxuICBNYXBJbWFnZURhdGEsXG4gIE1hcEltYWdlT3B0aW9ucyxcbn0gZnJvbSAnLi9tYXAudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTWFwIHtcbiAgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIGN1c3RvbU1hcGJveEFwaVVybD86IHN0cmluZztcbiAgbWFwT3B0aW9uczogT21pdDxNYXBib3hHbC5NYXBib3hPcHRpb25zLCAnYmVhcmluZycgfCAncGl0Y2gnIHwgJ3pvb20nPiAmIHtcbiAgICBiZWFyaW5nPzogW251bWJlcl07XG4gICAgcGl0Y2g/OiBbbnVtYmVyXTtcbiAgICB6b29tPzogW251bWJlcl07XG4gIH07XG4gIG1hcEV2ZW50czogTWFwRXZlbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBMYXllciB7XG4gIGxheWVyT3B0aW9uczogTWFwYm94R2wuTGF5ZXI7XG4gIGxheWVyRXZlbnRzOiBMYXllckV2ZW50cztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cFBvcHVwIHtcbiAgcG9wdXBPcHRpb25zOiBNYXBib3hHbC5Qb3B1cE9wdGlvbnM7XG4gIHBvcHVwRXZlbnRzOiB7XG4gICAgb3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIGNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgcG9wdXBPcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgcG9wdXBDbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTWFya2VyIHtcbiAgbWFya2Vyc09wdGlvbnM6IHtcbiAgICBwaXRjaEFsaWdubWVudD86IE1hcGJveEdsLk1hcmtlck9wdGlvbnNbJ3BpdGNoQWxpZ25tZW50J107XG4gICAgcm90YXRpb25BbGlnbm1lbnQ/OiBNYXBib3hHbC5NYXJrZXJPcHRpb25zWydyb3RhdGlvbkFsaWdubWVudCddO1xuICAgIG9mZnNldD86IE1hcGJveEdsLk1hcmtlck9wdGlvbnNbJ29mZnNldCddO1xuICAgIGFuY2hvcj86IE1hcGJveEdsLk1hcmtlck9wdGlvbnNbJ2FuY2hvciddO1xuICAgIGRyYWdnYWJsZT86IE1hcGJveEdsLk1hcmtlck9wdGlvbnNbJ2RyYWdnYWJsZSddO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIGZlYXR1cmU/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD47XG4gICAgbG5nTGF0PzogTWFwYm94R2wuTG5nTGF0TGlrZTtcbiAgICBjbGlja1RvbGVyYW5jZT86IE1hcGJveEdsLk1hcmtlck9wdGlvbnNbJ2NsaWNrVG9sZXJhbmNlJ107XG4gIH07XG4gIG1hcmtlcnNFdmVudHM6IHtcbiAgICBtYXJrZXJEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXJrZXI+O1xuICAgIG1hcmtlckRyYWc6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXJrZXI+O1xuICAgIG1hcmtlckRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXJrZXI+O1xuICAgIGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcmtlcj47XG4gICAgZHJhZzogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcmtlcj47XG4gICAgZHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcmtlcj47XG4gIH07XG59XG5cbmludGVyZmFjZSBNYXBib3hPcHRpb25zV2l0aEFjY2Vzc1Rva2VuIGV4dGVuZHMgTWFwYm94R2wuTWFwYm94T3B0aW9ucyB7XG4gIGFjY2Vzc1Rva2VuOiB0eXBlb2YgTWFwYm94R2wuYWNjZXNzVG9rZW47XG59XG5cbmV4cG9ydCB0eXBlIE1vdmluZ09wdGlvbnMgPVxuICB8IE1hcGJveEdsLkZseVRvT3B0aW9uc1xuICB8IChNYXBib3hHbC5BbmltYXRpb25PcHRpb25zICYgTWFwYm94R2wuQ2FtZXJhT3B0aW9ucylcbiAgfCBNYXBib3hHbC5DYW1lcmFPcHRpb25zO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwU2VydmljZSB7XG4gIG1hcEluc3RhbmNlOiBNYXBib3hHbC5NYXA7XG4gIG1hcENyZWF0ZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBtYXBMb2FkZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBtYXBFdmVudHM6IE1hcEV2ZW50O1xuXG4gIHByaXZhdGUgbWFwQ3JlYXRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBtYXBMb2FkZWQgPSBuZXcgQXN5bmNTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgbWFya2Vyc1RvUmVtb3ZlOiBNYXBib3hHbC5NYXJrZXJbXSA9IFtdO1xuICBwcml2YXRlIHBvcHVwc1RvUmVtb3ZlOiBNYXBib3hHbC5Qb3B1cFtdID0gW107XG4gIHByaXZhdGUgaW1hZ2VJZHNUb1JlbW92ZTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1BUEJPWF9BUElfS0VZKVxuICAgIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0FQSV9LRVk6IHN0cmluZyB8IG51bGxcbiAgKSB7XG4gICAgdGhpcy5tYXBDcmVhdGVkJCA9IHRoaXMubWFwQ3JlYXRlZC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLm1hcExvYWRlZCQgPSB0aGlzLm1hcExvYWRlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHNldHVwKG9wdGlvbnM6IFNldHVwTWFwKSB7XG4gICAgLy8gTmVlZCBvblN0YWJsZSB0byB3YWl0IGZvciBhIHBvdGVudGlhbCBAYW5ndWxhci9yb3V0ZSB0cmFuc2l0aW9uIHRvIGVuZFxuICAgIHRoaXMuem9uZS5vblN0YWJsZS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBXb3JrYXJvdW5kIHJvbGx1cCBpc3N1ZVxuICAgICAgLy8gdGhpcy5hc3NpZ24oXG4gICAgICAvLyAgIE1hcGJveEdsLFxuICAgICAgLy8gICAnYWNjZXNzVG9rZW4nLFxuICAgICAgLy8gICBvcHRpb25zLmFjY2Vzc1Rva2VuIHx8IHRoaXMuTUFQQk9YX0FQSV9LRVlcbiAgICAgIC8vICk7XG4gICAgICBpZiAob3B0aW9ucy5jdXN0b21NYXBib3hBcGlVcmwpIHtcbiAgICAgICAgKE1hcGJveEdsLmJhc2VBcGlVcmwgYXMgc3RyaW5nKSA9IG9wdGlvbnMuY3VzdG9tTWFwYm94QXBpVXJsO1xuICAgICAgfVxuICAgICAgdGhpcy5jcmVhdGVNYXAoe1xuICAgICAgICAuLi4ob3B0aW9ucy5tYXBPcHRpb25zIGFzIE1hcGJveEdsLk1hcGJveE9wdGlvbnMpLFxuICAgICAgICBhY2Nlc3NUb2tlbjogb3B0aW9ucy5hY2Nlc3NUb2tlbiB8fCB0aGlzLk1BUEJPWF9BUElfS0VZIHx8ICcnLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmhvb2tFdmVudHMob3B0aW9ucy5tYXBFdmVudHMpO1xuICAgICAgdGhpcy5tYXBFdmVudHMgPSBvcHRpb25zLm1hcEV2ZW50cztcbiAgICAgIHRoaXMubWFwQ3JlYXRlZC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICB0aGlzLm1hcENyZWF0ZWQuY29tcGxldGUoKTtcbiAgICAgIC8vIEludGVudGlvbm5hbHkgZW1pdCBtYXBDcmVhdGUgYWZ0ZXIgaW50ZXJuYWwgbWFwQ3JlYXRlZCBldmVudFxuICAgICAgaWYgKG9wdGlvbnMubWFwRXZlbnRzLm1hcENyZWF0ZS5vYnNlcnZlZCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBvcHRpb25zLm1hcEV2ZW50cy5tYXBDcmVhdGUuZW1pdCh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95TWFwKCkge1xuICAgIGlmICh0aGlzLm1hcEluc3RhbmNlKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVQcm9qZWN0aW9uKHByb2plY3Rpb246IE1hcGJveEdsLk1hcGJveE9wdGlvbnNbJ3Byb2plY3Rpb24nXSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgKHRoaXMubWFwSW5zdGFuY2UgYXMgYW55KS5zZXRQcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWluWm9vbShtaW5ab29tOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWluWm9vbShtaW5ab29tKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1heFpvb20obWF4Wm9vbTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1heFpvb20obWF4Wm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVNaW5QaXRjaChtaW5QaXRjaDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1pblBpdGNoKG1pblBpdGNoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1heFBpdGNoKG1heFBpdGNoOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4UGl0Y2gobWF4UGl0Y2gpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUmVuZGVyV29ybGRDb3BpZXMoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFJlbmRlcldvcmxkQ29waWVzKHN0YXR1cyk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTY3JvbGxab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS5zY3JvbGxab29tLmVuYWJsZSgpXG4gICAgICAgIDogdGhpcy5tYXBJbnN0YW5jZS5zY3JvbGxab29tLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURyYWdSb3RhdGUoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXNcbiAgICAgICAgPyB0aGlzLm1hcEluc3RhbmNlLmRyYWdSb3RhdGUuZW5hYmxlKClcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdSb3RhdGUuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVG91Y2hQaXRjaChzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1c1xuICAgICAgICA/IHRoaXMubWFwSW5zdGFuY2UudG91Y2hQaXRjaC5lbmFibGUoKVxuICAgICAgICA6IHRoaXMubWFwSW5zdGFuY2UudG91Y2hQaXRjaC5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVUb3VjaFpvb21Sb3RhdGUoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXNcbiAgICAgICAgPyB0aGlzLm1hcEluc3RhbmNlLnRvdWNoWm9vbVJvdGF0ZS5lbmFibGUoKVxuICAgICAgICA6IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURvdWJsZUNsaWNrWm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1c1xuICAgICAgICA/IHRoaXMubWFwSW5zdGFuY2UuZG91YmxlQ2xpY2tab29tLmVuYWJsZSgpXG4gICAgICAgIDogdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlS2V5Ym9hcmQoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXNcbiAgICAgICAgPyB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmVuYWJsZSgpXG4gICAgICAgIDogdGhpcy5tYXBJbnN0YW5jZS5rZXlib2FyZC5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEcmFnUGFuKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzXG4gICAgICAgID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUGFuLmVuYWJsZSgpXG4gICAgICAgIDogdGhpcy5tYXBJbnN0YW5jZS5kcmFnUGFuLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUJveFpvb20oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXNcbiAgICAgICAgPyB0aGlzLm1hcEluc3RhbmNlLmJveFpvb20uZW5hYmxlKClcbiAgICAgICAgOiB0aGlzLm1hcEluc3RhbmNlLmJveFpvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3R5bGUoc3R5bGU6IE1hcGJveEdsLlN0eWxlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFN0eWxlKHN0eWxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1heEJvdW5kcyhtYXhCb3VuZHM6IE1hcGJveEdsLkxuZ0xhdEJvdW5kc0xpa2UpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4Qm91bmRzKG1heEJvdW5kcyk7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VDYW52YXNDdXJzb3IoY3Vyc29yOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1hcEluc3RhbmNlLmdldENhbnZhc0NvbnRhaW5lcigpO1xuICAgIGNhbnZhcy5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7XG4gIH1cblxuICBxdWVyeVJlbmRlcmVkRmVhdHVyZXMoXG4gICAgcG9pbnRPckJveD86IE1hcGJveEdsLlBvaW50TGlrZSB8IFtNYXBib3hHbC5Qb2ludExpa2UsIE1hcGJveEdsLlBvaW50TGlrZV0sXG4gICAgcGFyYW1ldGVycz86IHsgbGF5ZXJzPzogc3RyaW5nW107IGZpbHRlcj86IGFueVtdIH1cbiAgKTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+W10ge1xuICAgIHJldHVybiB0aGlzLm1hcEluc3RhbmNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhwb2ludE9yQm94LCBwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHBhblRvKGNlbnRlcjogTWFwYm94R2wuTG5nTGF0TGlrZSwgb3B0aW9ucz86IE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucGFuVG8oY2VudGVyLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmUoXG4gICAgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyxcbiAgICBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucyxcbiAgICB6b29tPzogbnVtYmVyLFxuICAgIGNlbnRlcj86IE1hcGJveEdsLkxuZ0xhdExpa2UsXG4gICAgYmVhcmluZz86IG51bWJlcixcbiAgICBwaXRjaD86IG51bWJlclxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICh0aGlzLm1hcEluc3RhbmNlW21vdmluZ01ldGhvZF0gYXMgYW55KSh7XG4gICAgICAgIC4uLm1vdmluZ09wdGlvbnMsXG4gICAgICAgIHpvb206IHpvb20gIT0gbnVsbCA/IHpvb20gOiB0aGlzLm1hcEluc3RhbmNlLmdldFpvb20oKSxcbiAgICAgICAgY2VudGVyOiBjZW50ZXIgIT0gbnVsbCA/IGNlbnRlciA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2VudGVyKCksXG4gICAgICAgIGJlYXJpbmc6IGJlYXJpbmcgIT0gbnVsbCA/IGJlYXJpbmcgOiB0aGlzLm1hcEluc3RhbmNlLmdldEJlYXJpbmcoKSxcbiAgICAgICAgcGl0Y2g6IHBpdGNoICE9IG51bGwgPyBwaXRjaCA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0UGl0Y2goKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkTGF5ZXIobGF5ZXI6IFNldHVwTGF5ZXIsIGJpbmRFdmVudHM6IGJvb2xlYW4sIGJlZm9yZT86IHN0cmluZykge1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhsYXllci5sYXllck9wdGlvbnMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRrZXkgPSBrZXkgYXMga2V5b2YgTWFwYm94R2wuQW55TGF5ZXI7XG4gICAgICAgIGlmIChsYXllci5sYXllck9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBsYXllci5sYXllck9wdGlvbnNbdGtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRMYXllcihcbiAgICAgICAgbGF5ZXIubGF5ZXJPcHRpb25zIGFzIE1hcGJveEdsLkFueUxheWVyLFxuICAgICAgICBiZWZvcmVcbiAgICAgICk7XG4gICAgICBpZiAoYmluZEV2ZW50cykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJDbGljay5vYnNlcnZlZCB8fFxuICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLm9ic2VydmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJDbGljay5lbWl0KGV2dCk7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllckRibENsaWNrLm9ic2VydmVkIHx8XG4gICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMuZGJsQ2xpY2sub2JzZXJ2ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGJsY2xpY2snLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllckRibENsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMuZGJsQ2xpY2suZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VEb3duLm9ic2VydmVkIHx8XG4gICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VEb3duLm9ic2VydmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZG93bicsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VEb3duLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VEb3duLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlVXAub2JzZXJ2ZWQgfHxcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZVVwLm9ic2VydmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNldXAnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlVXAuZW1pdChldnQpO1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZVVwLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlRW50ZXIub2JzZXJ2ZWQgfHxcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZUVudGVyLm9ic2VydmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZW50ZXInLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlRW50ZXIuZW1pdChldnQpO1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZUVudGVyLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlTGVhdmUub2JzZXJ2ZWQgfHxcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZUxlYXZlLm9ic2VydmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbGVhdmUnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlTGVhdmUuZW1pdChldnQpO1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZUxlYXZlLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlTW92ZS5vYnNlcnZlZCB8fFxuICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlZFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW1vdmUnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllck1vdXNlTW92ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU92ZXIub2JzZXJ2ZWQgfHxcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZU92ZXIub2JzZXJ2ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VvdmVyJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJNb3VzZU92ZXIuZW1pdChldnQpO1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZU92ZXIuZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VPdXQub2JzZXJ2ZWQgfHxcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZU91dC5vYnNlcnZlZFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW91dCcsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyTW91c2VPdXQuZW1pdChldnQpO1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZU91dC5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJDb250ZXh0TWVudS5vYnNlcnZlZCB8fFxuICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNvbnRleHRNZW51Lm9ic2VydmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NvbnRleHRtZW51JywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubGF5ZXJDb250ZXh0TWVudS5lbWl0KGV2dCk7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNvbnRleHRNZW51LmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllclRvdWNoU3RhcnQub2JzZXJ2ZWQgfHxcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy50b3VjaFN0YXJ0Lm9ic2VydmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoc3RhcnQnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllclRvdWNoU3RhcnQuZW1pdChldnQpO1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy50b3VjaFN0YXJ0LmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllclRvdWNoRW5kLm9ic2VydmVkIHx8XG4gICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMudG91Y2hFbmQub2JzZXJ2ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hlbmQnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5sYXllclRvdWNoRW5kLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMudG91Y2hFbmQuZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyVG91Y2hDYW5jZWwub2JzZXJ2ZWQgfHxcbiAgICAgICAgICBsYXllci5sYXllckV2ZW50cy50b3VjaENhbmNlbC5vYnNlcnZlZFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGNhbmNlbCcsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmxheWVyVG91Y2hDYW5jZWwuZW1pdChldnQpO1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy50b3VjaENhbmNlbC5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTGF5ZXIobGF5ZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLm1hcEluc3RhbmNlLmdldExheWVyKGxheWVySWQpICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVMYXllcihsYXllcklkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IFNldHVwTWFya2VyKSB7XG4gICAgY29uc3Qgb3B0aW9uczogTWFwYm94R2wuTWFya2VyT3B0aW9ucyA9IHtcbiAgICAgIG9mZnNldDogbWFya2VyLm1hcmtlcnNPcHRpb25zLm9mZnNldCxcbiAgICAgIGFuY2hvcjogbWFya2VyLm1hcmtlcnNPcHRpb25zLmFuY2hvcixcbiAgICAgIGRyYWdnYWJsZTogISFtYXJrZXIubWFya2Vyc09wdGlvbnMuZHJhZ2dhYmxlLFxuICAgICAgcm90YXRpb25BbGlnbm1lbnQ6IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5yb3RhdGlvbkFsaWdubWVudCxcbiAgICAgIHBpdGNoQWxpZ25tZW50OiBtYXJrZXIubWFya2Vyc09wdGlvbnMucGl0Y2hBbGlnbm1lbnQsXG4gICAgICBjbGlja1RvbGVyYW5jZTogbWFya2VyLm1hcmtlcnNPcHRpb25zLmNsaWNrVG9sZXJhbmNlLFxuICAgIH07XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzT3B0aW9ucy5lbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9ucy5lbGVtZW50ID0gbWFya2VyLm1hcmtlcnNPcHRpb25zLmVsZW1lbnQ7XG4gICAgfVxuICAgIGNvbnN0IG1hcmtlckluc3RhbmNlID0gbmV3IE1hcGJveEdsLk1hcmtlcihvcHRpb25zKTtcbiAgICBpZiAoXG4gICAgICBtYXJrZXIubWFya2Vyc0V2ZW50cy5tYXJrZXJEcmFnU3RhcnQub2JzZXJ2ZWQgfHxcbiAgICAgIG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdTdGFydC5vYnNlcnZlZFxuICAgICkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWdzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQgYXMgeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9O1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgbWFya2VyLm1hcmtlcnNFdmVudHMubWFya2VyRHJhZ1N0YXJ0LmVtaXQodGFyZ2V0KTtcbiAgICAgICAgICAgIG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdTdGFydC5lbWl0KHRhcmdldCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKlxuXG4gICAgICovXG4gICAgaWYgKFxuICAgICAgbWFya2VyLm1hcmtlcnNFdmVudHMubWFya2VyRHJhZy5vYnNlcnZlZCB8fFxuICAgICAgbWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZy5vYnNlcnZlZFxuICAgICkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWcnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50IGFzIHsgdGFyZ2V0OiBNYXBib3hHbC5NYXJrZXIgfTtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIG1hcmtlci5tYXJrZXJzRXZlbnRzLm1hcmtlckRyYWcuZW1pdCh0YXJnZXQpO1xuICAgICAgICAgICAgbWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZy5lbWl0KHRhcmdldCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBtYXJrZXIubWFya2Vyc0V2ZW50cy5tYXJrZXJEcmFnRW5kLm9ic2VydmVkIHx8XG4gICAgICBtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnRW5kLm9ic2VydmVkXG4gICAgKSB7XG4gICAgICBtYXJrZXJJbnN0YW5jZS5vbignZHJhZ2VuZCcsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQgYXMgeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9O1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgbWFya2VyLm1hcmtlcnNFdmVudHMubWFya2VyRHJhZ0VuZC5lbWl0KHRhcmdldCk7XG4gICAgICAgICAgICBtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnRW5kLmVtaXQodGFyZ2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGxuZ0xhdDogTWFwYm94R2wuTG5nTGF0TGlrZSA9IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5mZWF0dXJlXG4gICAgICA/IChtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMgYXMgW1xuICAgICAgICAgIG51bWJlcixcbiAgICAgICAgICBudW1iZXJcbiAgICAgICAgXSlcbiAgICAgIDogbWFya2VyLm1hcmtlcnNPcHRpb25zLmxuZ0xhdCE7XG4gICAgbWFya2VySW5zdGFuY2Uuc2V0TG5nTGF0KGxuZ0xhdCk7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBtYXJrZXJJbnN0YW5jZS5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICAgIHJldHVybiBtYXJrZXJJbnN0YW5jZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHRoaXMubWFya2Vyc1RvUmVtb3ZlLnB1c2gobWFya2VyKTtcbiAgfVxuXG4gIGNyZWF0ZVBvcHVwKHBvcHVwOiBTZXR1cFBvcHVwLCBlbGVtZW50OiBOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwb3B1cC5wb3B1cE9wdGlvbnMpLmZvckVhY2goXG4gICAgICAgIChrZXkpID0+XG4gICAgICAgICAgKHBvcHVwLnBvcHVwT3B0aW9ucyBhcyBhbnkpW2tleV0gPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIGRlbGV0ZSAocG9wdXAucG9wdXBPcHRpb25zIGFzIGFueSlba2V5XVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2UgPSBuZXcgTWFwYm94R2wuUG9wdXAocG9wdXAucG9wdXBPcHRpb25zKTtcbiAgICAgIHBvcHVwSW5zdGFuY2Uuc2V0RE9NQ29udGVudChlbGVtZW50KTtcbiAgICAgIGlmIChcbiAgICAgICAgcG9wdXAucG9wdXBFdmVudHMucG9wdXBDbG9zZS5vYnNlcnZlZCB8fFxuICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5vYnNlcnZlZFxuICAgICAgKSB7XG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMucG9wdXBDbG9zZS5lbWl0KCk7XG4gICAgICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5wb3B1cE9wZW4ub2JzZXJ2ZWQgfHxcbiAgICAgICAgcG9wdXAucG9wdXBFdmVudHMub3Blbi5vYnNlcnZlZFxuICAgICAgKSB7XG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ29wZW4nLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5wb3B1cE9wZW4uZW1pdCgpO1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMub3Blbi5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcHVwSW5zdGFuY2U7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQb3B1cFRvTWFwKFxuICAgIHBvcHVwOiBNYXBib3hHbC5Qb3B1cCxcbiAgICBsbmdMYXQ6IE1hcGJveEdsLkxuZ0xhdExpa2UsXG4gICAgc2tpcE9wZW5FdmVudCA9IGZhbHNlXG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHNraXBPcGVuRXZlbnQgJiYgKHBvcHVwIGFzIGFueSkuX2xpc3RlbmVycykge1xuICAgICAgICBkZWxldGUgKHBvcHVwIGFzIGFueSkuX2xpc3RlbmVyc1snb3BlbiddO1xuICAgICAgfVxuICAgICAgcG9wdXAuc2V0TG5nTGF0KGxuZ0xhdCk7XG4gICAgICBwb3B1cC5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIsIHBvcHVwOiBNYXBib3hHbC5Qb3B1cCkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHBvcHVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcChwb3B1cDogTWFwYm94R2wuUG9wdXAsIHNraXBDbG9zZUV2ZW50ID0gZmFsc2UpIHtcbiAgICBpZiAoc2tpcENsb3NlRXZlbnQgJiYgKHBvcHVwIGFzIGFueSkuX2xpc3RlbmVycykge1xuICAgICAgZGVsZXRlIChwb3B1cCBhcyBhbnkpLl9saXN0ZW5lcnNbJ2Nsb3NlJ107XG4gICAgfVxuICAgIHRoaXMucG9wdXBzVG9SZW1vdmUucHVzaChwb3B1cCk7XG4gIH1cblxuICByZW1vdmVQb3B1cEZyb21NYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIG1hcmtlci5zZXRQb3B1cCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkQ29udHJvbChcbiAgICBjb250cm9sOiBNYXBib3hHbC5Db250cm9sIHwgTWFwYm94R2wuSUNvbnRyb2wsXG4gICAgcG9zaXRpb24/OiAndG9wLXJpZ2h0JyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tbGVmdCdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZENvbnRyb2woY29udHJvbCBhcyBhbnksIHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUNvbnRyb2woY29udHJvbDogTWFwYm94R2wuQ29udHJvbCB8IE1hcGJveEdsLklDb250cm9sKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUNvbnRyb2woY29udHJvbCBhcyBhbnkpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZEFkZEltYWdlKFxuICAgIGltYWdlSWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zXG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAoKSA9PlxuICAgICAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5sb2FkSW1hZ2UodXJsLCAoZXJyb3IsIGltYWdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hZGRJbWFnZShpbWFnZUlkLCBpbWFnZSBhcyBJbWFnZUJpdG1hcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGFkZEltYWdlKGltYWdlSWQ6IHN0cmluZywgZGF0YTogTWFwSW1hZ2VEYXRhLCBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZEltYWdlKGltYWdlSWQsIGRhdGEgYXMgYW55LCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUltYWdlKGltYWdlSWQ6IHN0cmluZykge1xuICAgIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZS5wdXNoKGltYWdlSWQpO1xuICB9XG5cbiAgYWRkU291cmNlKHNvdXJjZUlkOiBzdHJpbmcsIHNvdXJjZTogTWFwYm94R2wuQW55U291cmNlRGF0YSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKFxuICAgICAgICAoa2V5KSA9PlxuICAgICAgICAgIChzb3VyY2UgYXMgYW55KVtrZXldID09PSB1bmRlZmluZWQgJiYgZGVsZXRlIChzb3VyY2UgYXMgYW55KVtrZXldXG4gICAgICApO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRTb3VyY2Uoc291cmNlSWQsIHNvdXJjZSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRTb3VyY2U8VCBleHRlbmRzIE1hcGJveEdsLkFueVNvdXJjZUltcGw+KHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBJbnN0YW5jZS5nZXRTb3VyY2Uoc291cmNlSWQpIGFzIFQ7XG4gIH1cblxuICByZW1vdmVTb3VyY2Uoc291cmNlSWQ6IHN0cmluZykge1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmZpbmRMYXllcnNCeVNvdXJjZUlkKHNvdXJjZUlkKS5mb3JFYWNoKChsYXllcikgPT5cbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVMYXllcihsYXllci5pZClcbiAgICAgICk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZVNvdXJjZShzb3VyY2VJZCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRBbGxMYXllclBhaW50UHJvcGVydHkoXG4gICAgbGF5ZXJJZDogc3RyaW5nLFxuICAgIHBhaW50OlxuICAgICAgfCBNYXBib3hHbC5CYWNrZ3JvdW5kUGFpbnRcbiAgICAgIHwgTWFwYm94R2wuRmlsbFBhaW50XG4gICAgICB8IE1hcGJveEdsLkZpbGxFeHRydXNpb25QYWludFxuICAgICAgfCBNYXBib3hHbC5MaW5lUGFpbnRcbiAgICAgIHwgTWFwYm94R2wuU3ltYm9sUGFpbnRcbiAgICAgIHwgTWFwYm94R2wuUmFzdGVyUGFpbnRcbiAgICAgIHwgTWFwYm94R2wuQ2lyY2xlUGFpbnRcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwYWludCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIHBlcmYsIHNldFBhaW50UHJvcGVydHkgb25seSBvbiBjaGFuZ2VkIHBhaW50IHByb3BzIG1heWJlXG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0UGFpbnRQcm9wZXJ0eShsYXllcklkLCBrZXksIChwYWludCBhcyBhbnkpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRBbGxMYXllckxheW91dFByb3BlcnR5KFxuICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICBsYXlvdXQ6XG4gICAgICB8IE1hcGJveEdsLkJhY2tncm91bmRMYXlvdXRcbiAgICAgIHwgTWFwYm94R2wuRmlsbExheW91dFxuICAgICAgfCBNYXBib3hHbC5GaWxsRXh0cnVzaW9uTGF5b3V0XG4gICAgICB8IE1hcGJveEdsLkxpbmVMYXlvdXRcbiAgICAgIHwgTWFwYm94R2wuU3ltYm9sTGF5b3V0XG4gICAgICB8IE1hcGJveEdsLlJhc3RlckxheW91dFxuICAgICAgfCBNYXBib3hHbC5DaXJjbGVMYXlvdXRcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhsYXlvdXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldExheW91dFByb3BlcnR5KGxheWVySWQsIGtleSwgKGxheW91dCBhcyBhbnkpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckZpbHRlcihsYXllcklkOiBzdHJpbmcsIGZpbHRlcjogYW55W10pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0RmlsdGVyKGxheWVySWQsIGZpbHRlcik7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckJlZm9yZShsYXllcklkOiBzdHJpbmcsIGJlZm9yZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UubW92ZUxheWVyKGxheWVySWQsIGJlZm9yZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyWm9vbVJhbmdlKGxheWVySWQ6IHN0cmluZywgbWluWm9vbT86IG51bWJlciwgbWF4Wm9vbT86IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRMYXllclpvb21SYW5nZShcbiAgICAgICAgbGF5ZXJJZCxcbiAgICAgICAgbWluWm9vbSA/IG1pblpvb20gOiAwLFxuICAgICAgICBtYXhab29tID8gbWF4Wm9vbSA6IDIwXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZml0Qm91bmRzKFxuICAgIGJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSxcbiAgICBvcHRpb25zPzogTWFwYm94R2wuRml0Qm91bmRzT3B0aW9uc1xuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuZml0Qm91bmRzKGJvdW5kcywgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBmaXRTY3JlZW5Db29yZGluYXRlcyhcbiAgICBwb2ludHM6IFtNYXBib3hHbC5Qb2ludExpa2UsIE1hcGJveEdsLlBvaW50TGlrZV0sXG4gICAgYmVhcmluZzogbnVtYmVyLFxuICAgIG9wdGlvbnM/OiBNYXBib3hHbC5BbmltYXRpb25PcHRpb25zICYgTWFwYm94R2wuQ2FtZXJhT3B0aW9uc1xuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuZml0U2NyZWVuQ29vcmRpbmF0ZXMoXG4gICAgICAgIHBvaW50c1swXSxcbiAgICAgICAgcG9pbnRzWzFdLFxuICAgICAgICBiZWFyaW5nLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXBwbHlDaGFuZ2VzKCkge1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcnMoKTtcbiAgICAgIHRoaXMucmVtb3ZlUG9wdXBzKCk7XG4gICAgICB0aGlzLnJlbW92ZUltYWdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXAob3B0aW9uc1dpdGhBY2Nlc3NUb2tlbjogTWFwYm94T3B0aW9uc1dpdGhBY2Nlc3NUb2tlbikge1xuICAgIE5nWm9uZS5hc3NlcnROb3RJbkFuZ3VsYXJab25lKCk7XG4gICAgT2JqZWN0LmtleXMob3B0aW9uc1dpdGhBY2Nlc3NUb2tlbikuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHRrZXkgPSBrZXkgYXMga2V5b2YgTWFwYm94R2wuTWFwYm94T3B0aW9ucztcbiAgICAgIGlmIChvcHRpb25zV2l0aEFjY2Vzc1Rva2VuW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnNXaXRoQWNjZXNzVG9rZW5bdGtleV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5NYXAob3B0aW9uc1dpdGhBY2Nlc3NUb2tlbik7XG5cbiAgICBjb25zdCBpc0lFb3JFZGdlID1cbiAgICAgIHdpbmRvdyAmJiAvbXNpZVxcc3x0cmlkZW50XFwvfGVkZ2VcXC8vaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBpZiAoaXNJRW9yRWRnZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRTdHlsZShvcHRpb25zV2l0aEFjY2Vzc1Rva2VuLnN0eWxlISk7XG4gICAgfVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy56b25lLm9uTWljcm90YXNrRW1wdHkuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXBwbHlDaGFuZ2VzKCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTWFya2VycygpIHtcbiAgICBmb3IgKGNvbnN0IG1hcmtlciBvZiB0aGlzLm1hcmtlcnNUb1JlbW92ZSkge1xuICAgICAgbWFya2VyLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLm1hcmtlcnNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVQb3B1cHMoKSB7XG4gICAgZm9yIChjb25zdCBwb3B1cCBvZiB0aGlzLnBvcHVwc1RvUmVtb3ZlKSB7XG4gICAgICBwb3B1cC5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5wb3B1cHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVJbWFnZXMoKSB7XG4gICAgZm9yIChjb25zdCBpbWFnZUlkIG9mIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVJbWFnZShpbWFnZUlkKTtcbiAgICB9XG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIGZpbmRMYXllcnNCeVNvdXJjZUlkKHNvdXJjZUlkOiBzdHJpbmcpOiBNYXBib3hHbC5MYXllcltdIHtcbiAgICBjb25zdCBsYXllcnMgPSB0aGlzLm1hcEluc3RhbmNlLmdldFN0eWxlKCkubGF5ZXJzO1xuICAgIGlmIChsYXllcnMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBsYXllcnMuZmlsdGVyKChsKSA9PlxuICAgICAgJ3NvdXJjZScgaW4gbCA/IGwuc291cmNlID09PSBzb3VyY2VJZCA6IGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaG9va0V2ZW50cyhldmVudHM6IE1hcEV2ZW50KSB7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbG9hZCcsIChldnQpID0+IHtcbiAgICAgIHRoaXMubWFwTG9hZGVkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMubWFwTG9hZGVkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgZXZlbnRzLm1hcExvYWQuZW1pdChldnQpO1xuICAgICAgICBldmVudHMubG9hZC5lbWl0KGV2dC50YXJnZXQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGV2ZW50cy5tYXBSZXNpemUub2JzZXJ2ZWQgfHwgZXZlbnRzLnJlc2l6ZS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVzaXplJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcFJlc2l6ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgZXZlbnRzLnJlc2l6ZS5lbWl0KGV2dCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcFJlbW92ZS5vYnNlcnZlZCB8fCBldmVudHMucmVtb3ZlLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW1vdmUnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwUmVtb3ZlLmVtaXQoZXZ0KTtcbiAgICAgICAgICBldmVudHMucmVtb3ZlLmVtaXQoZXZ0KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubWFwTW91c2VEb3duLm9ic2VydmVkIHx8IGV2ZW50cy5tb3VzZURvd24ub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZG93bicsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50cy5tYXBNb3VzZURvd24uZW1pdChldnQpO1xuICAgICAgICAgIGV2ZW50cy5tb3VzZURvd24uZW1pdChldnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBNb3VzZVVwLm9ic2VydmVkIHx8IGV2ZW50cy5tb3VzZVVwLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZXVwJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcE1vdXNlVXAuZW1pdChldnQpO1xuICAgICAgICAgIGV2ZW50cy5tb3VzZVVwLmVtaXQoZXZ0KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubWFwTW91c2VNb3ZlLm9ic2VydmVkIHx8IGV2ZW50cy5tb3VzZU1vdmUub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbW92ZScsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50cy5tYXBNb3VzZU1vdmUuZW1pdChldnQpO1xuICAgICAgICAgIGV2ZW50cy5tb3VzZU1vdmUuZW1pdChldnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBDbGljay5vYnNlcnZlZCB8fCBldmVudHMuY2xpY2sub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcENsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICBldmVudHMuY2xpY2suZW1pdChldnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBEYmxDbGljay5vYnNlcnZlZCB8fCBldmVudHMuZGJsQ2xpY2sub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RibGNsaWNrJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcERibENsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICBldmVudHMuZGJsQ2xpY2suZW1pdChldnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBNb3VzZU92ZXIub2JzZXJ2ZWQgfHwgZXZlbnRzLm1vdXNlT3Zlci5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VvdmVyJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcE1vdXNlT3Zlci5lbWl0KGV2dCk7XG4gICAgICAgICAgZXZlbnRzLm1vdXNlT3Zlci5lbWl0KGV2dCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcE1vdXNlT3V0Lm9ic2VydmVkIHx8IGV2ZW50cy5tb3VzZU91dC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VvdXQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwTW91c2VPdXQuZW1pdChldnQpO1xuICAgICAgICAgIGV2ZW50cy5tb3VzZU91dC5lbWl0KGV2dCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcENvbnRleHRNZW51Lm9ic2VydmVkIHx8IGV2ZW50cy5jb250ZXh0TWVudS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY29udGV4dG1lbnUnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwQ29udGV4dE1lbnUuZW1pdChldnQpO1xuICAgICAgICAgIGV2ZW50cy5jb250ZXh0TWVudS5lbWl0KGV2dCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcFRvdWNoU3RhcnQub2JzZXJ2ZWQgfHwgZXZlbnRzLnRvdWNoU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoc3RhcnQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwVG91Y2hTdGFydC5lbWl0KGV2dCk7XG4gICAgICAgICAgZXZlbnRzLnRvdWNoU3RhcnQuZW1pdChldnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBUb3VjaEVuZC5vYnNlcnZlZCB8fCBldmVudHMudG91Y2hFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoZW5kJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcFRvdWNoRW5kLmVtaXQoZXZ0KTtcbiAgICAgICAgICBldmVudHMudG91Y2hFbmQuZW1pdChldnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBUb3VjaE1vdmUub2JzZXJ2ZWQgfHwgZXZlbnRzLnRvdWNoTW92ZS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2htb3ZlJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcFRvdWNoTW92ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgZXZlbnRzLnRvdWNoTW92ZS5lbWl0KGV2dCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcFRvdWNoQ2FuY2VsLm9ic2VydmVkIHx8IGV2ZW50cy50b3VjaENhbmNlbC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hjYW5jZWwnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwVG91Y2hDYW5jZWwuZW1pdChldnQpO1xuICAgICAgICAgIGV2ZW50cy50b3VjaENhbmNlbC5lbWl0KGV2dCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcFdoZWVsLm9ic2VydmVkIHx8IGV2ZW50cy53aGVlbC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2hlZWwnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwV2hlZWwuZW1pdChldnQpO1xuICAgICAgICAgIGV2ZW50cy53aGVlbC5lbWl0KGV2dCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmVTdGFydC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZXN0YXJ0JywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZVN0YXJ0LmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZScsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdmUuZW1pdChldnQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3ZlRW5kLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3ZlZW5kJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZUVuZC5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcERyYWdTdGFydC5vYnNlcnZlZCB8fCBldmVudHMuZHJhZ1N0YXJ0Lm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnc3RhcnQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwRHJhZ1N0YXJ0LmVtaXQoZXZ0KTtcbiAgICAgICAgICBldmVudHMuZHJhZ1N0YXJ0LmVtaXQoZXZ0KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMubWFwRHJhZy5vYnNlcnZlZCB8fCBldmVudHMuZHJhZy5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZHJhZycsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50cy5tYXBEcmFnLmVtaXQoZXZ0KTtcbiAgICAgICAgICBldmVudHMuZHJhZy5lbWl0KGV2dCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1hcERyYWdFbmQub2JzZXJ2ZWQgfHwgZXZlbnRzLmRyYWdFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBldmVudHMubWFwRHJhZ0VuZC5lbWl0KGV2dCk7XG4gICAgICAgICAgZXZlbnRzLmRyYWdFbmQuZW1pdChldnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy56b29tU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb21zdGFydCcsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnpvb21TdGFydC5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FdnQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb20nLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy56b29tRXZ0LmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbUVuZC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbWVuZCcsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnpvb21FbmQuZW1pdChldnQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yb3RhdGVTdGFydC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlc3RhcnQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yb3RhdGVTdGFydC5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucm90YXRlLmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlRW5kLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGVlbmQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yb3RhdGVFbmQuZW1pdChldnQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaFN0YXJ0Lm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaHN0YXJ0JywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hTdGFydC5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoRXZ0Lm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaCcsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoRXZ0LmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoZW5kJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hFbmQuZW1pdChldnQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21zdGFydCcsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21TdGFydC5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21FbmQub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21lbmQnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tRW5kLmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbUNhbmNlbC5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbWNhbmNlbCcsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21DYW5jZWwuZW1pdChldnQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53ZWJHbENvbnRleHRMb3N0Lm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRsb3N0JywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2ViR2xDb250ZXh0TG9zdC5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRyZXN0b3JlZCcsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMucmVuZGVyLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW5kZXInLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZW5kZXIuZW1pdChldnQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tYXBFcnJvci5vYnNlcnZlZCB8fCBldmVudHMuZXJyb3Iub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2Vycm9yJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZXZlbnRzLm1hcEVycm9yLmVtaXQoZXZ0KTtcbiAgICAgICAgICBldmVudHMuZXJyb3IuZW1pdChldnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYXRhLm9ic2VydmVkKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZGF0YS5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVkYXRhJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhLmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc291cmNlRGF0YS5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc291cmNlZGF0YScsIChldnQpID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnNvdXJjZURhdGEuZW1pdChldnQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYXRhTG9hZGluZy5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGF0YWxvYWRpbmcnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYXRhTG9hZGluZy5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YUxvYWRpbmcub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3N0eWxlZGF0YWxvYWRpbmcnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zdHlsZURhdGFMb2FkaW5nLmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc291cmNlRGF0YUxvYWRpbmcub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGFsb2FkaW5nJywgKGV2dCkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YUxvYWRpbmcuZW1pdChldnQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zdHlsZUltYWdlTWlzc2luZy5vYnNlcnZlZCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVpbWFnZW1pc3NpbmcnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zdHlsZUltYWdlTWlzc2luZy5lbWl0KGV2dCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmlkbGUub2JzZXJ2ZWQpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2lkbGUnLCAoZXZ0KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5pZGxlLmVtaXQoZXZ0KSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBtb3ZlIHRoaXMgZWxzZXdoZXJlXG4gIHByaXZhdGUgYXNzaWduKG9iajogYW55LCBwcm9wOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIHByb3AgPSBwcm9wLnNwbGl0KCcuJyk7XG4gICAgfVxuICAgIGlmIChwcm9wLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGUgPSBwcm9wLnNoaWZ0KCk7XG4gICAgICB0aGlzLmFzc2lnbihcbiAgICAgICAgKG9ialtlXSA9XG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtlXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgICAgICAgICA/IG9ialtlXVxuICAgICAgICAgICAgOiB7fSksXG4gICAgICAgIHByb3AsXG4gICAgICAgIHZhbHVlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbcHJvcFswXV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==