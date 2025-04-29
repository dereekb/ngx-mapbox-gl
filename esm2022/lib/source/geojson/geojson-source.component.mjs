import { ChangeDetectionStrategy, Component, NgZone, inject, input, model, } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';
import * as i0 from "@angular/core";
export class GeoJSONSourceComponent {
    mapService = inject(MapService);
    zone = inject(NgZone);
    /* Init inputs */
    id = input.required();
    /* Dynamic inputs */
    data = model();
    minzoom = input();
    maxzoom = input();
    attribution = input();
    buffer = input();
    tolerance = input();
    cluster = input();
    clusterRadius = input();
    clusterMaxZoom = input();
    clusterMinPoints = input();
    clusterProperties = input();
    lineMetrics = input();
    generateId = input();
    promoteId = input();
    filter = input();
    dynamic = input();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: GeoJSONSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: GeoJSONSourceComponent, isStandalone: true, selector: "mgl-geojson-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, minzoom: { classPropertyName: "minzoom", publicName: "minzoom", isSignal: true, isRequired: false, transformFunction: null }, maxzoom: { classPropertyName: "maxzoom", publicName: "maxzoom", isSignal: true, isRequired: false, transformFunction: null }, attribution: { classPropertyName: "attribution", publicName: "attribution", isSignal: true, isRequired: false, transformFunction: null }, buffer: { classPropertyName: "buffer", publicName: "buffer", isSignal: true, isRequired: false, transformFunction: null }, tolerance: { classPropertyName: "tolerance", publicName: "tolerance", isSignal: true, isRequired: false, transformFunction: null }, cluster: { classPropertyName: "cluster", publicName: "cluster", isSignal: true, isRequired: false, transformFunction: null }, clusterRadius: { classPropertyName: "clusterRadius", publicName: "clusterRadius", isSignal: true, isRequired: false, transformFunction: null }, clusterMaxZoom: { classPropertyName: "clusterMaxZoom", publicName: "clusterMaxZoom", isSignal: true, isRequired: false, transformFunction: null }, clusterMinPoints: { classPropertyName: "clusterMinPoints", publicName: "clusterMinPoints", isSignal: true, isRequired: false, transformFunction: null }, clusterProperties: { classPropertyName: "clusterProperties", publicName: "clusterProperties", isSignal: true, isRequired: false, transformFunction: null }, lineMetrics: { classPropertyName: "lineMetrics", publicName: "lineMetrics", isSignal: true, isRequired: false, transformFunction: null }, generateId: { classPropertyName: "generateId", publicName: "generateId", isSignal: true, isRequired: false, transformFunction: null }, promoteId: { classPropertyName: "promoteId", publicName: "promoteId", isSignal: true, isRequired: false, transformFunction: null }, filter: { classPropertyName: "filter", publicName: "filter", isSignal: true, isRequired: false, transformFunction: null }, dynamic: { classPropertyName: "dynamic", publicName: "dynamic", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { data: "dataChange" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: GeoJSONSourceComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-geojson-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvc291cmNlL2dlb2pzb24vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULE1BQU0sRUFLTixNQUFNLEVBQ04sS0FBSyxFQUNMLEtBQUssR0FFTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBY25ELE1BQU0sT0FBTyxzQkFBc0I7SUFHekIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLGlCQUFpQjtJQUNqQixFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBVSxDQUFDO0lBRTlCLG9CQUFvQjtJQUNwQixJQUFJLEdBQUcsS0FBSyxFQUFzQyxDQUFDO0lBQ25ELE9BQU8sR0FBRyxLQUFLLEVBQXlDLENBQUM7SUFDekQsT0FBTyxHQUFHLEtBQUssRUFBeUMsQ0FBQztJQUN6RCxXQUFXLEdBQUcsS0FBSyxFQUE2QyxDQUFDO0lBQ2pFLE1BQU0sR0FBRyxLQUFLLEVBQXdDLENBQUM7SUFDdkQsU0FBUyxHQUFHLEtBQUssRUFBMkMsQ0FBQztJQUM3RCxPQUFPLEdBQUcsS0FBSyxFQUF5QyxDQUFDO0lBQ3pELGFBQWEsR0FBRyxLQUFLLEVBQStDLENBQUM7SUFDckUsY0FBYyxHQUFHLEtBQUssRUFBZ0Qs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TTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIG1vZGVsLFxuICB0eXBlIElucHV0U2lnbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgR2VvSlNPTlNvdXJjZSwgR2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb24gfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc2VydmljZSc7XG5cbnR5cGUgR2VvSlNPTlNvdXJjZUlucHV0cyA9IHtcbiAgW0sgaW4ga2V5b2YgT21pdDxHZW9KU09OU291cmNlU3BlY2lmaWNhdGlvbiwgJ3R5cGUnPl06IElucHV0U2lnbmFsPFxuICAgIE9taXQ8R2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb24sICd0eXBlJz5bS11cbiAgPjtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ21nbC1nZW9qc29uLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEdlb0pTT05Tb3VyY2VDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBHZW9KU09OU291cmNlSW5wdXRzXG57XG4gIHByaXZhdGUgbWFwU2VydmljZSA9IGluamVjdChNYXBTZXJ2aWNlKTtcbiAgcHJpdmF0ZSB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIGlkID0gaW5wdXQucmVxdWlyZWQ8c3RyaW5nPigpO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIGRhdGEgPSBtb2RlbDxHZW9KU09OU291cmNlU3BlY2lmaWNhdGlvblsnZGF0YSddPigpO1xuICBtaW56b29tID0gaW5wdXQ8R2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb25bJ21pbnpvb20nXT4oKTtcbiAgbWF4em9vbSA9IGlucHV0PEdlb0pTT05Tb3VyY2VTcGVjaWZpY2F0aW9uWydtYXh6b29tJ10+KCk7XG4gIGF0dHJpYnV0aW9uID0gaW5wdXQ8R2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb25bJ2F0dHJpYnV0aW9uJ10+KCk7XG4gIGJ1ZmZlciA9IGlucHV0PEdlb0pTT05Tb3VyY2VTcGVjaWZpY2F0aW9uWydidWZmZXInXT4oKTtcbiAgdG9sZXJhbmNlID0gaW5wdXQ8R2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb25bJ3RvbGVyYW5jZSddPigpO1xuICBjbHVzdGVyID0gaW5wdXQ8R2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb25bJ2NsdXN0ZXInXT4oKTtcbiAgY2x1c3RlclJhZGl1cyA9IGlucHV0PEdlb0pTT05Tb3VyY2VTcGVjaWZpY2F0aW9uWydjbHVzdGVyUmFkaXVzJ10+KCk7XG4gIGNsdXN0ZXJNYXhab29tID0gaW5wdXQ8R2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb25bJ2NsdXN0ZXJNYXhab29tJ10+KCk7XG4gIGNsdXN0ZXJNaW5Qb2ludHMgPSBpbnB1dDxHZW9KU09OU291cmNlU3BlY2lmaWNhdGlvblsnY2x1c3Rlck1pblBvaW50cyddPigpO1xuICBjbHVzdGVyUHJvcGVydGllcyA9IGlucHV0PEdlb0pTT05Tb3VyY2VTcGVjaWZpY2F0aW9uWydjbHVzdGVyUHJvcGVydGllcyddPigpO1xuICBsaW5lTWV0cmljcyA9IGlucHV0PEdlb0pTT05Tb3VyY2VTcGVjaWZpY2F0aW9uWydsaW5lTWV0cmljcyddPigpO1xuICBnZW5lcmF0ZUlkID0gaW5wdXQ8R2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb25bJ2dlbmVyYXRlSWQnXT4oKTtcbiAgcHJvbW90ZUlkID0gaW5wdXQ8R2VvSlNPTlNvdXJjZVNwZWNpZmljYXRpb25bJ3Byb21vdGVJZCddPigpO1xuICBmaWx0ZXIgPSBpbnB1dDxHZW9KU09OU291cmNlU3BlY2lmaWNhdGlvblsnZmlsdGVyJ10+KCk7XG4gIGR5bmFtaWMgPSBpbnB1dDxHZW9KU09OU291cmNlU3BlY2lmaWNhdGlvblsnZHluYW1pYyddPigpO1xuXG4gIHVwZGF0ZUZlYXR1cmVEYXRhID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGZlYXR1cmVJZENvdW50ZXIgPSAwO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kYXRhKCkpIHtcbiAgICAgIHRoaXMuZGF0YS5zZXQoe1xuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICBmZWF0dXJlczogW10sXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgc3ViMSA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKVxuICAgICAgICAucGlwZShmaWx0ZXIoKCkgPT4gIXRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCgpKSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIxKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGNoYW5nZXNbJ21pbnpvb20nXSAmJiAhY2hhbmdlc1snbWluem9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydtYXh6b29tJ10gJiYgIWNoYW5nZXNbJ21heHpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYXR0cmlidXRpb24nXSAmJiAhY2hhbmdlc1snYXR0cmlidXRpb24nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYnVmZmVyJ10gJiYgIWNoYW5nZXNbJ2J1ZmZlciddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWyd0b2xlcmFuY2UnXSAmJiAhY2hhbmdlc1sndG9sZXJhbmNlJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2NsdXN0ZXInXSAmJiAhY2hhbmdlc1snY2x1c3RlciddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydjbHVzdGVyUmFkaXVzJ10gJiYgIWNoYW5nZXNbJ2NsdXN0ZXJSYWRpdXMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snY2x1c3Rlck1heFpvb20nXSAmJlxuICAgICAgICAhY2hhbmdlc1snY2x1c3Rlck1heFpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snY2x1c3Rlck1pblBvaW50cyddICYmXG4gICAgICAgICFjaGFuZ2VzWydjbHVzdGVyTWluUG9pbnRzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2NsdXN0ZXJQcm9wZXJ0aWVzJ10gJiZcbiAgICAgICAgIWNoYW5nZXNbJ2NsdXN0ZXJQcm9wZXJ0aWVzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2xpbmVNZXRyaWNzJ10gJiYgIWNoYW5nZXNbJ2xpbmVNZXRyaWNzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2dlbmVyYXRlSWQnXSAmJiAhY2hhbmdlc1snZ2VuZXJhdGVJZCddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydwcm9tb3RlSWQnXSAmJiAhY2hhbmdlc1sncHJvbW90ZUlkJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2ZpbHRlciddICYmICFjaGFuZ2VzWydmaWx0ZXInXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snZHluYW1pYyddICYmICFjaGFuZ2VzWydkeW5hbWljJ10uaXNGaXJzdENoYW5nZSgpKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZGF0YSddICYmICFjaGFuZ2VzWydkYXRhJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0U291cmNlPEdlb0pTT05Tb3VyY2U+KHRoaXMuaWQoKSk7XG4gICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc291cmNlLnNldERhdGEodGhpcy5kYXRhKCkhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQoKSk7XG4gICAgICB0aGlzLnNvdXJjZUFkZGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvciBjbHVzdGVyZWQgc291cmNlcywgZmV0Y2hlcyB0aGUgem9vbSBhdCB3aGljaCB0aGUgZ2l2ZW4gY2x1c3RlciBleHBhbmRzLlxuICAgKlxuICAgKiBAcGFyYW0gY2x1c3RlcklkIFRoZSB2YWx1ZSBvZiB0aGUgY2x1c3RlcidzIGNsdXN0ZXJfaWQgcHJvcGVydHkuXG4gICAqL1xuICBhc3luYyBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbShjbHVzdGVySWQ6IG51bWJlcikge1xuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCgpKSE7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW4oXG4gICAgICBhc3luYyAoKSA9PlxuICAgICAgICBuZXcgUHJvbWlzZTxudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgc291cmNlLmdldENsdXN0ZXJFeHBhbnNpb25ab29tKGNsdXN0ZXJJZCwgKGVycm9yLCB6b29tKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoem9vbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGNsdXN0ZXJlZCBzb3VyY2VzLCBmZXRjaGVzIHRoZSBjaGlsZHJlbiBvZiB0aGUgZ2l2ZW4gY2x1c3RlciBvbiB0aGUgbmV4dCB6b29tIGxldmVsIChhcyBhbiBhcnJheSBvZiBHZW9KU09OIGZlYXR1cmVzKS5cbiAgICpcbiAgICogQHBhcmFtIGNsdXN0ZXJJZCBUaGUgdmFsdWUgb2YgdGhlIGNsdXN0ZXIncyBjbHVzdGVyX2lkIHByb3BlcnR5LlxuICAgKi9cbiAgYXN5bmMgZ2V0Q2x1c3RlckNoaWxkcmVuKGNsdXN0ZXJJZDogbnVtYmVyKSB7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKCkpITtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bihcbiAgICAgIGFzeW5jICgpID0+XG4gICAgICAgIG5ldyBQcm9taXNlPEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5PltdIHwgbnVsbCB8IHVuZGVmaW5lZD4oXG4gICAgICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc291cmNlLmdldENsdXN0ZXJDaGlsZHJlbihjbHVzdGVySWQsIChlcnJvciwgZmVhdHVyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZlYXR1cmVzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBjbHVzdGVyZWQgc291cmNlcywgZmV0Y2hlcyB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoYXQgYmVsb25nIHRvIHRoZSBjbHVzdGVyIChhcyBhbiBhcnJheSBvZiBHZW9KU09OIGZlYXR1cmVzKS5cbiAgICpcbiAgICogQHBhcmFtIGNsdXN0ZXJJZCBUaGUgdmFsdWUgb2YgdGhlIGNsdXN0ZXIncyBjbHVzdGVyX2lkIHByb3BlcnR5LlxuICAgKiBAcGFyYW0gbGltaXQgVGhlIG1heGltdW0gbnVtYmVyIG9mIGZlYXR1cmVzIHRvIHJldHVybi5cbiAgICogQHBhcmFtIG9mZnNldCBUaGUgbnVtYmVyIG9mIGZlYXR1cmVzIHRvIHNraXAgKGUuZy4gZm9yIHBhZ2luYXRpb24pLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q2x1c3RlckxlYXZlcyhjbHVzdGVySWQ6IG51bWJlciwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0U291cmNlPEdlb0pTT05Tb3VyY2U+KHRoaXMuaWQoKSkhO1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuKFxuICAgICAgYXN5bmMgKCkgPT5cbiAgICAgICAgbmV3IFByb21pc2U8R2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnk+W10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBzb3VyY2UuZ2V0Q2x1c3RlckxlYXZlcyhcbiAgICAgICAgICAgIGNsdXN0ZXJJZCxcbiAgICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgKGVycm9yLCBmZWF0dXJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZmVhdHVyZXMgfHwgW10pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBfYWRkRmVhdHVyZShmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4pIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID1cbiAgICAgIHRoaXMuZGF0YSgpIGFzIEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD47XG4gICAgY29sbGVjdGlvbi5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgIHRoaXMudXBkYXRlRmVhdHVyZURhdGEubmV4dChudWxsKTtcbiAgfVxuXG4gIF9yZW1vdmVGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPVxuICAgICAgdGhpcy5kYXRhKCkgYXMgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PjtcbiAgICBjb25zdCBpbmRleCA9IGNvbGxlY3Rpb24uZmVhdHVyZXMuaW5kZXhPZihmZWF0dXJlKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29sbGVjdGlvbi5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQobnVsbCk7XG4gIH1cblxuICBfZ2V0TmV3RmVhdHVyZUlkKCkge1xuICAgIHJldHVybiArK3RoaXMuZmVhdHVyZUlkQ291bnRlcjtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBzb3VyY2U6IEdlb0pTT05Tb3VyY2VTcGVjaWZpY2F0aW9uID0ge1xuICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgZGF0YTogdGhpcy5kYXRhKCksXG4gICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20oKSxcbiAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSgpLFxuICAgICAgYXR0cmlidXRpb246IHRoaXMuYXR0cmlidXRpb24oKSxcbiAgICAgIGJ1ZmZlcjogdGhpcy5idWZmZXIoKSxcbiAgICAgIHRvbGVyYW5jZTogdGhpcy50b2xlcmFuY2UoKSxcbiAgICAgIGNsdXN0ZXI6IHRoaXMuY2x1c3RlcigpLFxuICAgICAgY2x1c3RlclJhZGl1czogdGhpcy5jbHVzdGVyUmFkaXVzKCksXG4gICAgICBjbHVzdGVyTWF4Wm9vbTogdGhpcy5jbHVzdGVyTWF4Wm9vbSgpLFxuICAgICAgY2x1c3Rlck1pblBvaW50czogdGhpcy5jbHVzdGVyTWluUG9pbnRzKCksXG4gICAgICBjbHVzdGVyUHJvcGVydGllczogdGhpcy5jbHVzdGVyUHJvcGVydGllcygpLFxuICAgICAgbGluZU1ldHJpY3M6IHRoaXMubGluZU1ldHJpY3MoKSxcbiAgICAgIGdlbmVyYXRlSWQ6IHRoaXMuZ2VuZXJhdGVJZCgpLFxuICAgICAgcHJvbW90ZUlkOiB0aGlzLnByb21vdGVJZCgpLFxuICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcigpLFxuICAgICAgZHluYW1pYzogdGhpcy5keW5hbWljKCksXG4gICAgfTtcbiAgICB0aGlzLm1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQoKSwgc291cmNlKTtcbiAgICBjb25zdCBzdWIgPSB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLnBpcGUoZGVib3VuY2VUaW1lKDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKCkpO1xuICAgICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNvdXJjZS5zZXREYXRhKHRoaXMuZGF0YSgpISk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==