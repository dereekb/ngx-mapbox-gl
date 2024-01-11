import { ChangeDetectionStrategy, Component, Input, NgZone, } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../../map/map.service";
class GeoJSONSourceComponent {
    constructor(mapService, zone) {
        this.mapService = mapService;
        this.zone = zone;
        this.updateFeatureData = new Subject();
        this.sub = new Subscription();
        this.sourceAdded = false;
        this.featureIdCounter = 0;
    }
    ngOnInit() {
        if (!this.data) {
            this.data = {
                type: 'FeatureCollection',
                features: [],
            };
        }
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
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
        if ((changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
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
            (changes['filter'] && !changes['filter'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        if (changes['data'] && !changes['data'].isFirstChange()) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setData(this.data);
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    /**
     * For clustered sources, fetches the zoom at which the given cluster expands.
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    async getClusterExpansionZoom(clusterId) {
        const source = this.mapService.getSource(this.id);
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
        const source = this.mapService.getSource(this.id);
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
        const source = this.mapService.getSource(this.id);
        return this.zone.run(async () => new Promise((resolve, reject) => {
            source.getClusterLeaves(clusterId, limit, offset, (error, features) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(features);
                }
            });
        }));
    }
    _addFeature(feature) {
        const collection = this
            .data;
        collection.features.push(feature);
        this.updateFeatureData.next(null);
    }
    _removeFeature(feature) {
        const collection = this
            .data;
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
            data: this.data,
            maxzoom: this.maxzoom,
            attribution: this.attribution,
            buffer: this.buffer,
            tolerance: this.tolerance,
            cluster: this.cluster,
            clusterRadius: this.clusterRadius,
            clusterMaxZoom: this.clusterMaxZoom,
            clusterMinPoints: this.clusterMinPoints,
            clusterProperties: this.clusterProperties,
            lineMetrics: this.lineMetrics,
            generateId: this.generateId,
            promoteId: this.promoteId,
            filter: this.filter,
        };
        this.mapService.addSource(this.id, source);
        const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setData(this.data);
        });
        this.sub.add(sub);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GeoJSONSourceComponent, deps: [{ token: i1.MapService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: GeoJSONSourceComponent, selector: "mgl-geojson-source", inputs: { id: "id", data: "data", maxzoom: "maxzoom", attribution: "attribution", buffer: "buffer", tolerance: "tolerance", cluster: "cluster", clusterRadius: "clusterRadius", clusterMaxZoom: "clusterMaxZoom", clusterMinPoints: "clusterMinPoints", clusterProperties: "clusterProperties", lineMetrics: "lineMetrics", generateId: "generateId", promoteId: "promoteId", filter: "filter" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { GeoJSONSourceComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GeoJSONSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-geojson-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i0.NgZone }]; }, propDecorators: { id: [{
                type: Input
            }], data: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], attribution: [{
                type: Input
            }], buffer: [{
                type: Input
            }], tolerance: [{
                type: Input
            }], cluster: [{
                type: Input
            }], clusterRadius: [{
                type: Input
            }], clusterMaxZoom: [{
                type: Input
            }], clusterMinPoints: [{
                type: Input
            }], clusterProperties: [{
                type: Input
            }], lineMetrics: [{
                type: Input
            }], generateId: [{
                type: Input
            }], promoteId: [{
                type: Input
            }], filter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvc291cmNlL2dlb2pzb24vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEdBS1AsTUFBTSxlQUFlLENBQUM7QUFNdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFFbkQsTUFLYSxzQkFBc0I7SUE0QmpDLFlBQW9CLFVBQXNCLEVBQVUsSUFBWTtRQUE1QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQU5oRSxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRTFCLFFBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztJQUVzQyxDQUFDO0lBRXBFLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFDO1NBQ0g7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNa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QWlCO3NCQUF6QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgR2VvSlNPTlNvdXJjZSxcbiAgR2VvSlNPTlNvdXJjZU9wdGlvbnMsXG4gIEdlb0pTT05Tb3VyY2VSYXcsXG59IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWdlb2pzb24tc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgR2VvSlNPTlNvdXJjZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEdlb0pTT05Tb3VyY2VPcHRpb25zXG57XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgZGF0YT86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydkYXRhJ107XG4gIEBJbnB1dCgpIG1heHpvb20/OiBHZW9KU09OU291cmNlT3B0aW9uc1snbWF4em9vbSddO1xuICBASW5wdXQoKSBhdHRyaWJ1dGlvbj86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydhdHRyaWJ1dGlvbiddO1xuICBASW5wdXQoKSBidWZmZXI/OiBHZW9KU09OU291cmNlT3B0aW9uc1snYnVmZmVyJ107XG4gIEBJbnB1dCgpIHRvbGVyYW5jZT86IEdlb0pTT05Tb3VyY2VPcHRpb25zWyd0b2xlcmFuY2UnXTtcbiAgQElucHV0KCkgY2x1c3Rlcj86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydjbHVzdGVyJ107XG4gIEBJbnB1dCgpIGNsdXN0ZXJSYWRpdXM/OiBHZW9KU09OU291cmNlT3B0aW9uc1snY2x1c3RlclJhZGl1cyddO1xuICBASW5wdXQoKSBjbHVzdGVyTWF4Wm9vbT86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydjbHVzdGVyTWF4Wm9vbSddO1xuICBASW5wdXQoKSBjbHVzdGVyTWluUG9pbnRzPzogR2VvSlNPTlNvdXJjZU9wdGlvbnNbJ2NsdXN0ZXJNaW5Qb2ludHMnXTtcbiAgQElucHV0KCkgY2x1c3RlclByb3BlcnRpZXM/OiBHZW9KU09OU291cmNlT3B0aW9uc1snY2x1c3RlclByb3BlcnRpZXMnXTtcbiAgQElucHV0KCkgbGluZU1ldHJpY3M/OiBHZW9KU09OU291cmNlT3B0aW9uc1snbGluZU1ldHJpY3MnXTtcbiAgQElucHV0KCkgZ2VuZXJhdGVJZD86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydnZW5lcmF0ZUlkJ107XG4gIEBJbnB1dCgpIHByb21vdGVJZD86IEdlb0pTT05Tb3VyY2VPcHRpb25zWydwcm9tb3RlSWQnXTtcbiAgQElucHV0KCkgZmlsdGVyPzogR2VvSlNPTlNvdXJjZU9wdGlvbnNbJ2ZpbHRlciddO1xuXG4gIHVwZGF0ZUZlYXR1cmVEYXRhID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGZlYXR1cmVJZENvdW50ZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmRhdGEpIHtcbiAgICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3Qgc3ViMSA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKVxuICAgICAgICAucGlwZShmaWx0ZXIoKCkgPT4gIXRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1Yi5hZGQoc3ViMSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChjaGFuZ2VzWydtYXh6b29tJ10gJiYgIWNoYW5nZXNbJ21heHpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYXR0cmlidXRpb24nXSAmJiAhY2hhbmdlc1snYXR0cmlidXRpb24nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYnVmZmVyJ10gJiYgIWNoYW5nZXNbJ2J1ZmZlciddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWyd0b2xlcmFuY2UnXSAmJiAhY2hhbmdlc1sndG9sZXJhbmNlJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2NsdXN0ZXInXSAmJiAhY2hhbmdlc1snY2x1c3RlciddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydjbHVzdGVyUmFkaXVzJ10gJiYgIWNoYW5nZXNbJ2NsdXN0ZXJSYWRpdXMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snY2x1c3Rlck1heFpvb20nXSAmJlxuICAgICAgICAhY2hhbmdlc1snY2x1c3Rlck1heFpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snY2x1c3Rlck1pblBvaW50cyddICYmXG4gICAgICAgICFjaGFuZ2VzWydjbHVzdGVyTWluUG9pbnRzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2NsdXN0ZXJQcm9wZXJ0aWVzJ10gJiZcbiAgICAgICAgIWNoYW5nZXNbJ2NsdXN0ZXJQcm9wZXJ0aWVzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2xpbmVNZXRyaWNzJ10gJiYgIWNoYW5nZXNbJ2xpbmVNZXRyaWNzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2dlbmVyYXRlSWQnXSAmJiAhY2hhbmdlc1snZ2VuZXJhdGVJZCddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydwcm9tb3RlSWQnXSAmJiAhY2hhbmdlc1sncHJvbW90ZUlkJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2ZpbHRlciddICYmICFjaGFuZ2VzWydmaWx0ZXInXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkYXRhJ10gJiYgIWNoYW5nZXNbJ2RhdGEnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc291cmNlLnNldERhdGEodGhpcy5kYXRhISk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yIGNsdXN0ZXJlZCBzb3VyY2VzLCBmZXRjaGVzIHRoZSB6b29tIGF0IHdoaWNoIHRoZSBnaXZlbiBjbHVzdGVyIGV4cGFuZHMuXG4gICAqXG4gICAqIEBwYXJhbSBjbHVzdGVySWQgVGhlIHZhbHVlIG9mIHRoZSBjbHVzdGVyJ3MgY2x1c3Rlcl9pZCBwcm9wZXJ0eS5cbiAgICovXG4gIGFzeW5jIGdldENsdXN0ZXJFeHBhbnNpb25ab29tKGNsdXN0ZXJJZDogbnVtYmVyKSB7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bihcbiAgICAgIGFzeW5jICgpID0+XG4gICAgICAgIG5ldyBQcm9taXNlPG51bWJlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIHNvdXJjZS5nZXRDbHVzdGVyRXhwYW5zaW9uWm9vbShjbHVzdGVySWQsIChlcnJvciwgem9vbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXNvbHZlKHpvb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGNsdXN0ZXJlZCBzb3VyY2VzLCBmZXRjaGVzIHRoZSBjaGlsZHJlbiBvZiB0aGUgZ2l2ZW4gY2x1c3RlciBvbiB0aGUgbmV4dCB6b29tIGxldmVsIChhcyBhbiBhcnJheSBvZiBHZW9KU09OIGZlYXR1cmVzKS5cbiAgICpcbiAgICogQHBhcmFtIGNsdXN0ZXJJZCBUaGUgdmFsdWUgb2YgdGhlIGNsdXN0ZXIncyBjbHVzdGVyX2lkIHByb3BlcnR5LlxuICAgKi9cbiAgYXN5bmMgZ2V0Q2x1c3RlckNoaWxkcmVuKGNsdXN0ZXJJZDogbnVtYmVyKSB7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bihcbiAgICAgIGFzeW5jICgpID0+XG4gICAgICAgIG5ldyBQcm9taXNlPEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5PltdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgc291cmNlLmdldENsdXN0ZXJDaGlsZHJlbihjbHVzdGVySWQsIChlcnJvciwgZmVhdHVyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShmZWF0dXJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgY2x1c3RlcmVkIHNvdXJjZXMsIGZldGNoZXMgdGhlIG9yaWdpbmFsIHBvaW50cyB0aGF0IGJlbG9uZyB0byB0aGUgY2x1c3RlciAoYXMgYW4gYXJyYXkgb2YgR2VvSlNPTiBmZWF0dXJlcykuXG4gICAqXG4gICAqIEBwYXJhbSBjbHVzdGVySWQgVGhlIHZhbHVlIG9mIHRoZSBjbHVzdGVyJ3MgY2x1c3Rlcl9pZCBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIGxpbWl0IFRoZSBtYXhpbXVtIG51bWJlciBvZiBmZWF0dXJlcyB0byByZXR1cm4uXG4gICAqIEBwYXJhbSBvZmZzZXQgVGhlIG51bWJlciBvZiBmZWF0dXJlcyB0byBza2lwIChlLmcuIGZvciBwYWdpbmF0aW9uKS5cbiAgICovXG4gIGFzeW5jIGdldENsdXN0ZXJMZWF2ZXMoY2x1c3RlcklkOiBudW1iZXIsIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bihcbiAgICAgIGFzeW5jICgpID0+XG4gICAgICAgIG5ldyBQcm9taXNlPEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5PltdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgc291cmNlLmdldENsdXN0ZXJMZWF2ZXMoXG4gICAgICAgICAgICBjbHVzdGVySWQsXG4gICAgICAgICAgICBsaW1pdCxcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIChlcnJvciwgZmVhdHVyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZlYXR1cmVzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIF9hZGRGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzXG4gICAgICAuZGF0YSBhcyBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+O1xuICAgIGNvbGxlY3Rpb24uZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQobnVsbCk7XG4gIH1cblxuICBfcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4pIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpc1xuICAgICAgLmRhdGEgYXMgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PjtcbiAgICBjb25zdCBpbmRleCA9IGNvbGxlY3Rpb24uZmVhdHVyZXMuaW5kZXhPZihmZWF0dXJlKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29sbGVjdGlvbi5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQobnVsbCk7XG4gIH1cblxuICBfZ2V0TmV3RmVhdHVyZUlkKCkge1xuICAgIHJldHVybiArK3RoaXMuZmVhdHVyZUlkQ291bnRlcjtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBzb3VyY2U6IEdlb0pTT05Tb3VyY2VSYXcgPSB7XG4gICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICBhdHRyaWJ1dGlvbjogdGhpcy5hdHRyaWJ1dGlvbixcbiAgICAgIGJ1ZmZlcjogdGhpcy5idWZmZXIsXG4gICAgICB0b2xlcmFuY2U6IHRoaXMudG9sZXJhbmNlLFxuICAgICAgY2x1c3RlcjogdGhpcy5jbHVzdGVyLFxuICAgICAgY2x1c3RlclJhZGl1czogdGhpcy5jbHVzdGVyUmFkaXVzLFxuICAgICAgY2x1c3Rlck1heFpvb206IHRoaXMuY2x1c3Rlck1heFpvb20sXG4gICAgICBjbHVzdGVyTWluUG9pbnRzOiB0aGlzLmNsdXN0ZXJNaW5Qb2ludHMsXG4gICAgICBjbHVzdGVyUHJvcGVydGllczogdGhpcy5jbHVzdGVyUHJvcGVydGllcyxcbiAgICAgIGxpbmVNZXRyaWNzOiB0aGlzLmxpbmVNZXRyaWNzLFxuICAgICAgZ2VuZXJhdGVJZDogdGhpcy5nZW5lcmF0ZUlkLFxuICAgICAgcHJvbW90ZUlkOiB0aGlzLnByb21vdGVJZCxcbiAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgfTtcbiAgICB0aGlzLm1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHNvdXJjZSk7XG4gICAgY29uc3Qgc3ViID0gdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5waXBlKGRlYm91bmNlVGltZSgwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc291cmNlLnNldERhdGEodGhpcy5kYXRhISk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==