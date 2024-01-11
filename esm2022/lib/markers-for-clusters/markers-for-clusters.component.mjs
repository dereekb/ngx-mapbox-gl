import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, NgZone, TemplateRef, } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "@angular/common";
import * as i3 from "../layer/layer.component";
import * as i4 from "../marker/marker.component";
class PointDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: PointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: PointDirective, selector: "ng-template[mglPoint]", ngImport: i0 }); }
}
export { PointDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: PointDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[mglPoint]' }]
        }] });
class ClusterPointDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ClusterPointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: ClusterPointDirective, selector: "ng-template[mglClusterPoint]", ngImport: i0 }); }
}
export { ClusterPointDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ClusterPointDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[mglClusterPoint]' }]
        }] });
let uniqId = 0;
class MarkersForClustersComponent {
    constructor(mapService, ChangeDetectorRef, zone) {
        this.mapService = mapService;
        this.ChangeDetectorRef = ChangeDetectorRef;
        this.zone = zone;
        this.layerId = `mgl-markers-for-clusters-${uniqId++}`;
        this.sub = new Subscription();
    }
    ngAfterContentInit() {
        const clusterDataUpdate = () => fromEvent(this.mapService.mapInstance, 'data').pipe(filter((e) => e.sourceId === this.source &&
            e.sourceDataType !== 'metadata' &&
            this.mapService.mapInstance.isSourceLoaded(this.source)));
        const sub = this.mapService.mapCreated$
            .pipe(switchMap(clusterDataUpdate), switchMap(() => merge(fromEvent(this.mapService.mapInstance, 'move'), fromEvent(this.mapService.mapInstance, 'moveend')).pipe(startWith(undefined))))
            .subscribe(() => {
            this.zone.run(() => {
                this.updateCluster();
            });
        });
        this.sub.add(sub);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    trackByClusterPoint(_index, clusterPoint) {
        return clusterPoint.id;
    }
    updateCluster() {
        // Invalid queryRenderedFeatures typing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = { layers: [this.layerId] };
        if (!this.pointTpl) {
            params.filter = ['==', 'cluster', true];
        }
        this.clusterPoints =
            this.mapService.mapInstance.queryRenderedFeatures(params);
        this.ChangeDetectorRef.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MarkersForClustersComponent, deps: [{ token: i1.MapService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: MarkersForClustersComponent, selector: "mgl-markers-for-clusters", inputs: { source: "source" }, queries: [{ propertyName: "pointTpl", first: true, predicate: PointDirective, descendants: true, read: TemplateRef }, { propertyName: "clusterPointTpl", first: true, predicate: ClusterPointDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <mgl-layer
      [id]="layerId"
      [source]="source"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    <ng-container
      *ngFor="let feature of clusterPoints; trackBy: trackByClusterPoint"
    >
      <ng-container *ngIf="feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-container *ngIf="!feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="pointTpl!; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.LayerComponent, selector: "mgl-layer", inputs: ["id", "source", "type", "metadata", "sourceLayer", "filter", "layout", "paint", "before", "minzoom", "maxzoom"], outputs: ["layerClick", "layerDblClick", "layerMouseDown", "layerMouseUp", "layerMouseEnter", "layerMouseLeave", "layerMouseMove", "layerMouseOver", "layerMouseOut", "layerContextMenu", "layerTouchStart", "layerTouchEnd", "layerTouchCancel", "click", "dblClick", "mouseDown", "mouseUp", "mouseEnter", "mouseLeave", "mouseMove", "mouseOver", "mouseOut", "contextMenu", "touchStart", "touchEnd", "touchCancel"] }, { kind: "component", type: i4.MarkerComponent, selector: "mgl-marker", inputs: ["offset", "anchor", "clickTolerance", "feature", "lngLat", "draggable", "popupShown", "className", "pitchAlignment", "rotationAlignment"], outputs: ["markerDragStart", "markerDragEnd", "markerDrag", "dragStart", "dragEnd", "drag"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { MarkersForClustersComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MarkersForClustersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-markers-for-clusters',
                    template: `
    <mgl-layer
      [id]="layerId"
      [source]="source"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    <ng-container
      *ngFor="let feature of clusterPoints; trackBy: trackByClusterPoint"
    >
      <ng-container *ngIf="feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-container *ngIf="!feature.properties!['cluster']">
        <mgl-marker [feature]="$any(feature)">
          <ng-container
            *ngTemplateOutlet="pointTpl!; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
    </ng-container>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { source: [{
                type: Input
            }], pointTpl: [{
                type: ContentChild,
                args: [PointDirective, { read: TemplateRef, static: false }]
            }], clusterPointTpl: [{
                type: ContentChild,
                args: [ClusterPointDirective, { read: TemplateRef, static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Vycy1mb3ItY2x1c3RlcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvbWFya2Vycy1mb3ItY2x1c3RlcnMvbWFya2Vycy1mb3ItY2x1c3RlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBRU4sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUVoRCxNQUNhLGNBQWM7OEdBQWQsY0FBYztrR0FBZCxjQUFjOztTQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTs7QUFHaEQsTUFDYSxxQkFBcUI7OEdBQXJCLHFCQUFxQjtrR0FBckIscUJBQXFCOztTQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSw4QkFBOEIsRUFBRTs7QUFHdkQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsTUErQmEsMkJBQTJCO0lBZ0J0QyxZQUNVLFVBQXNCLEVBQ3RCLGlCQUFvQyxFQUNwQyxJQUFZO1FBRlosZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLFNBQUksR0FBSixJQUFJLENBQVE7UUFQ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QixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcGJveEdlb0pTT05GZWF0dXJlLCBNYXBTb3VyY2VEYXRhRXZlbnQgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbFBvaW50XScgfSlcbmV4cG9ydCBjbGFzcyBQb2ludERpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttZ2xDbHVzdGVyUG9pbnRdJyB9KVxuZXhwb3J0IGNsYXNzIENsdXN0ZXJQb2ludERpcmVjdGl2ZSB7fVxuXG5sZXQgdW5pcUlkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlcnMtZm9yLWNsdXN0ZXJzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bWdsLWxheWVyXG4gICAgICBbaWRdPVwibGF5ZXJJZFwiXG4gICAgICBbc291cmNlXT1cInNvdXJjZVwiXG4gICAgICB0eXBlPVwiY2lyY2xlXCJcbiAgICAgIFtwYWludF09XCJ7ICdjaXJjbGUtcmFkaXVzJzogMCB9XCJcbiAgICA+PC9tZ2wtbGF5ZXI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nRm9yPVwibGV0IGZlYXR1cmUgb2YgY2x1c3RlclBvaW50czsgdHJhY2tCeTogdHJhY2tCeUNsdXN0ZXJQb2ludFwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZlYXR1cmUucHJvcGVydGllcyFbJ2NsdXN0ZXInXVwiPlxuICAgICAgICA8bWdsLW1hcmtlciBbZmVhdHVyZV09XCIkYW55KGZlYXR1cmUpXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbHVzdGVyUG9pbnRUcGw7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBmZWF0dXJlIH1cIlxuICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZ2wtbWFya2VyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWZlYXR1cmUucHJvcGVydGllcyFbJ2NsdXN0ZXInXVwiPlxuICAgICAgICA8bWdsLW1hcmtlciBbZmVhdHVyZV09XCIkYW55KGZlYXR1cmUpXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwb2ludFRwbCE7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBmZWF0dXJlIH1cIlxuICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZ2wtbWFya2VyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Vyc0ZvckNsdXN0ZXJzQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0XG57XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgc291cmNlOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChQb2ludERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiBmYWxzZSB9KVxuICBwb2ludFRwbD86IFRlbXBsYXRlUmVmPHVua25vd24+O1xuICBAQ29udGVudENoaWxkKENsdXN0ZXJQb2ludERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiBmYWxzZSB9KVxuICBjbHVzdGVyUG9pbnRUcGw6IFRlbXBsYXRlUmVmPHVua25vd24+O1xuXG4gIGNsdXN0ZXJQb2ludHMhOiBNYXBib3hHZW9KU09ORmVhdHVyZVtdOyAvLyBJbmNvcnJlY3QgdHlwaW5nc1xuICBsYXllcklkID0gYG1nbC1tYXJrZXJzLWZvci1jbHVzdGVycy0ke3VuaXFJZCsrfWA7XG5cbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgQ2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgY29uc3QgY2x1c3RlckRhdGFVcGRhdGUgPSAoKSA9PlxuICAgICAgZnJvbUV2ZW50PE1hcFNvdXJjZURhdGFFdmVudD4odGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICAoZSkgPT5cbiAgICAgICAgICAgIGUuc291cmNlSWQgPT09IHRoaXMuc291cmNlICYmXG4gICAgICAgICAgICBlLnNvdXJjZURhdGFUeXBlICE9PSAnbWV0YWRhdGEnICYmXG4gICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuaXNTb3VyY2VMb2FkZWQodGhpcy5zb3VyY2UpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgY29uc3Qgc3ViID0gdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGNsdXN0ZXJEYXRhVXBkYXRlKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW92ZScpLFxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdmVlbmQnKVxuICAgICAgICAgICkucGlwZShzdGFydFdpdGgodW5kZWZpbmVkKSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlQ2x1c3RlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHRyYWNrQnlDbHVzdGVyUG9pbnQoX2luZGV4OiBudW1iZXIsIGNsdXN0ZXJQb2ludDogTWFwYm94R2VvSlNPTkZlYXR1cmUpIHtcbiAgICByZXR1cm4gY2x1c3RlclBvaW50LmlkO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDbHVzdGVyKCkge1xuICAgIC8vIEludmFsaWQgcXVlcnlSZW5kZXJlZEZlYXR1cmVzIHR5cGluZ1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7IGxheWVyczogW3RoaXMubGF5ZXJJZF0gfTtcbiAgICBpZiAoIXRoaXMucG9pbnRUcGwpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBbJz09JywgJ2NsdXN0ZXInLCB0cnVlXTtcbiAgICB9XG4gICAgdGhpcy5jbHVzdGVyUG9pbnRzID1cbiAgICAgIHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMocGFyYW1zKTtcbiAgICB0aGlzLkNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=