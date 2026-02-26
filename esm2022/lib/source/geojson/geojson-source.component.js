import { ChangeDetectionStrategy, Component, NgZone, inject, input, model, } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';
import * as i0 from "@angular/core";
export class GeoJSONSourceComponent {
    mapService = inject(MapService);
    zone = inject(NgZone);
    /* Init inputs */
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : []));
    /* Dynamic inputs */
    data = model(...(ngDevMode ? [undefined, { debugName: "data" }] : []));
    minzoom = input(...(ngDevMode ? [undefined, { debugName: "minzoom" }] : []));
    maxzoom = input(...(ngDevMode ? [undefined, { debugName: "maxzoom" }] : []));
    attribution = input(...(ngDevMode ? [undefined, { debugName: "attribution" }] : []));
    buffer = input(...(ngDevMode ? [undefined, { debugName: "buffer" }] : []));
    tolerance = input(...(ngDevMode ? [undefined, { debugName: "tolerance" }] : []));
    cluster = input(...(ngDevMode ? [undefined, { debugName: "cluster" }] : []));
    clusterRadius = input(...(ngDevMode ? [undefined, { debugName: "clusterRadius" }] : []));
    clusterMaxZoom = input(...(ngDevMode ? [undefined, { debugName: "clusterMaxZoom" }] : []));
    clusterMinPoints = input(...(ngDevMode ? [undefined, { debugName: "clusterMinPoints" }] : []));
    clusterProperties = input(...(ngDevMode ? [undefined, { debugName: "clusterProperties" }] : []));
    lineMetrics = input(...(ngDevMode ? [undefined, { debugName: "lineMetrics" }] : []));
    generateId = input(...(ngDevMode ? [undefined, { debugName: "generateId" }] : []));
    promoteId = input(...(ngDevMode ? [undefined, { debugName: "promoteId" }] : []));
    filter = input(...(ngDevMode ? [undefined, { debugName: "filter" }] : []));
    dynamic = input(...(ngDevMode ? [undefined, { debugName: "dynamic" }] : []));
    updateFeatureData = new Subject();
    sub = new Subscription();
    sourceAdded = false;
    featureIdCounter = 0;
    ngOnInit() {
        if (!this.data()) {
            this.data.set({
                type: 'FeatureCollection',
                features: [],
            });
        }
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if ((changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['buffer'] && !changes['buffer'].isFirstChange()) ||
            (changes['tolerance'] && !changes['tolerance'].isFirstChange()) ||
            (changes['cluster'] && !changes['cluster'].isFirstChange()) ||
            (changes['clusterRadius'] && !changes['clusterRadius'].isFirstChange()) ||
            (changes['clusterMaxZoom'] &&
                !changes['clusterMaxZoom'].isFirstChange()) ||
            (changes['clusterMinPoints'] &&
                !changes['clusterMinPoints'].isFirstChange()) ||
            (changes['clusterProperties'] &&
                !changes['clusterProperties'].isFirstChange()) ||
            (changes['lineMetrics'] && !changes['lineMetrics'].isFirstChange()) ||
            (changes['generateId'] && !changes['generateId'].isFirstChange()) ||
            (changes['promoteId'] && !changes['promoteId'].isFirstChange()) ||
            (changes['filter'] && !changes['filter'].isFirstChange()) ||
            (changes['dynamic'] && !changes['dynamic'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        if (changes['data'] && !changes['data'].isFirstChange()) {
            const source = this.mapService.getSource(this.id());
            if (source === undefined) {
                return;
            }
            source.setData(this.data());
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id());
            this.sourceAdded = false;
        }
    }
    /**
     * For clustered sources, fetches the zoom at which the given cluster expands.
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    async getClusterExpansionZoom(clusterId) {
        const source = this.mapService.getSource(this.id());
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterExpansionZoom(clusterId, (error, zoom) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(zoom);
                }
            });
        }));
    }
    /**
     * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    async getClusterChildren(clusterId) {
        const source = this.mapService.getSource(this.id());
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterChildren(clusterId, (error, features) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(features);
                }
            });
        }));
    }
    /**
     * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     * @param limit The maximum number of features to return.
     * @param offset The number of features to skip (e.g. for pagination).
     */
    async getClusterLeaves(clusterId, limit, offset) {
        const source = this.mapService.getSource(this.id());
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterLeaves(clusterId, limit, offset, (error, features) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(features || []);
                }
            });
        }));
    }
    _addFeature(feature) {
        const collection = this.data();
        collection.features.push(feature);
        this.updateFeatureData.next(null);
    }
    _removeFeature(feature) {
        const collection = this.data();
        const index = collection.features.indexOf(feature);
        if (index > -1) {
            collection.features.splice(index, 1);
        }
        this.updateFeatureData.next(null);
    }
    _getNewFeatureId() {
        return ++this.featureIdCounter;
    }
    init() {
        const source = {
            type: 'geojson',
            data: this.data(),
            minzoom: this.minzoom(),
            maxzoom: this.maxzoom(),
            attribution: this.attribution(),
            buffer: this.buffer(),
            tolerance: this.tolerance(),
            cluster: this.cluster(),
            clusterRadius: this.clusterRadius(),
            clusterMaxZoom: this.clusterMaxZoom(),
            clusterMinPoints: this.clusterMinPoints(),
            clusterProperties: this.clusterProperties(),
            lineMetrics: this.lineMetrics(),
            generateId: this.generateId(),
            promoteId: this.promoteId(),
            filter: this.filter(),
            dynamic: this.dynamic(),
        };
        this.mapService.addSource(this.id(), source);
        const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
            const source = this.mapService.getSource(this.id());
            if (source === undefined) {
                return;
            }
            source.setData(this.data());
        });
        this.sub.add(sub);
        this.sourceAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: GeoJSONSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: GeoJSONSourceComponent, isStandalone: true, selector: "mgl-geojson-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, minzoom: { classPropertyName: "minzoom", publicName: "minzoom", isSignal: true, isRequired: false, transformFunction: null }, maxzoom: { classPropertyName: "maxzoom", publicName: "maxzoom", isSignal: true, isRequired: false, transformFunction: null }, attribution: { classPropertyName: "attribution", publicName: "attribution", isSignal: true, isRequired: false, transformFunction: null }, buffer: { classPropertyName: "buffer", publicName: "buffer", isSignal: true, isRequired: false, transformFunction: null }, tolerance: { classPropertyName: "tolerance", publicName: "tolerance", isSignal: true, isRequired: false, transformFunction: null }, cluster: { classPropertyName: "cluster", publicName: "cluster", isSignal: true, isRequired: false, transformFunction: null }, clusterRadius: { classPropertyName: "clusterRadius", publicName: "clusterRadius", isSignal: true, isRequired: false, transformFunction: null }, clusterMaxZoom: { classPropertyName: "clusterMaxZoom", publicName: "clusterMaxZoom", isSignal: true, isRequired: false, transformFunction: null }, clusterMinPoints: { classPropertyName: "clusterMinPoints", publicName: "clusterMinPoints", isSignal: true, isRequired: false, transformFunction: null }, clusterProperties: { classPropertyName: "clusterProperties", publicName: "clusterProperties", isSignal: true, isRequired: false, transformFunction: null }, lineMetrics: { classPropertyName: "lineMetrics", publicName: "lineMetrics", isSignal: true, isRequired: false, transformFunction: null }, generateId: { classPropertyName: "generateId", publicName: "generateId", isSignal: true, isRequired: false, transformFunction: null }, promoteId: { classPropertyName: "promoteId", publicName: "promoteId", isSignal: true, isRequired: false, transformFunction: null }, filter: { classPropertyName: "filter", publicName: "filter", isSignal: true, isRequired: false, transformFunction: null }, dynamic: { classPropertyName: "dynamic", publicName: "dynamic", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { data: "dataChange" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: GeoJSONSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-geojson-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }, { type: i0.Output, args: ["dataChange"] }], minzoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "minzoom", required: false }] }], maxzoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxzoom", required: false }] }], attribution: [{ type: i0.Input, args: [{ isSignal: true, alias: "attribution", required: false }] }], buffer: [{ type: i0.Input, args: [{ isSignal: true, alias: "buffer", required: false }] }], tolerance: [{ type: i0.Input, args: [{ isSignal: true, alias: "tolerance", required: false }] }], cluster: [{ type: i0.Input, args: [{ isSignal: true, alias: "cluster", required: false }] }], clusterRadius: [{ type: i0.Input, args: [{ isSignal: true, alias: "clusterRadius", required: false }] }], clusterMaxZoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "clusterMaxZoom", required: false }] }], clusterMinPoints: [{ type: i0.Input, args: [{ isSignal: true, alias: "clusterMinPoints", required: false }] }], clusterProperties: [{ type: i0.Input, args: [{ isSignal: true, alias: "clusterProperties", required: false }] }], lineMetrics: [{ type: i0.Input, args: [{ isSignal: true, alias: "lineMetrics", required: false }] }], generateId: [{ type: i0.Input, args: [{ isSignal: true, alias: "generateId", required: false }] }], promoteId: [{ type: i0.Input, args: [{ isSignal: true, alias: "promoteId", required: false }] }], filter: [{ type: i0.Input, args: [{ isSignal: true, alias: "filter", required: false }] }], dynamic: [{ type: i0.Input, args: [{ isSignal: true, alias: "dynamic", required: false }] }] } });
//# sourceMappingURL=geojson-source.component.js.map