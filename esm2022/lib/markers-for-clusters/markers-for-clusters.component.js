import { ChangeDetectionStrategy, Component, ContentChild, Directive, NgZone, TemplateRef, inject, input, signal, } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { LayerComponent } from '../layer/layer.component';
import { NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
export class PointDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: PointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.1.1", type: PointDirective, isStandalone: true, selector: "ng-template[mglPoint]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: PointDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[mglPoint]',
                }]
        }] });
export class ClusterPointDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ClusterPointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.1.1", type: ClusterPointDirective, isStandalone: true, selector: "ng-template[mglClusterPoint]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ClusterPointDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[mglClusterPoint]',
                }]
        }] });
let uniqId = 0;
export class MarkersForClustersComponent {
    mapService = inject(MapService);
    zone = inject(NgZone);
    /* Init input */
    source = input.required(...(ngDevMode ? [{ debugName: "source" }] : []));
    /* Dynamic input */
    customPointIdKey = input(...(ngDevMode ? [undefined, { debugName: "customPointIdKey" }] : []));
    pointTpl;
    clusterPointTpl;
    clusterPoints = signal([], ...(ngDevMode ? [{ debugName: "clusterPoints" }] : []));
    layerId = `mgl-markers-for-clusters-${uniqId++}`;
    sub = new Subscription();
    ngAfterContentInit() {
        const clusterDataUpdate = () => fromEvent(this.mapService.mapInstance, 'data').pipe(filter((e) => e.sourceId === this.source() &&
            e.sourceDataType !== 'metadata' &&
            this.mapService.mapInstance.isSourceLoaded(this.source())));
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
    trackByFeature(feature) {
        if (feature.id) {
            return feature.id;
        }
        const customPointIdKey = this.customPointIdKey();
        if (!customPointIdKey) {
            console.warn('[mgl-markers-for-clusters] feature.id is falsy, please provide a custom key');
            return '';
        }
        const id = feature.properties?.[customPointIdKey];
        if (!id) {
            console.warn(`[mgl-markers-for-clusters] Custom key [${customPointIdKey}], resolve to falsy for`, feature);
            return '';
        }
        return id;
    }
    updateCluster() {
        const params = {
            layers: [this.layerId],
        };
        if (!this.pointTpl) {
            params.filter = ['==', 'cluster', true];
        }
        const clusterPoints = this.mapService.mapInstance.queryRenderedFeatures(params);
        // Remove duplicates, because it seems that queryRenderedFeatures can return duplicates
        const seen = new Set();
        const unique = [];
        for (const feature of clusterPoints) {
            const id = this.trackByFeature(feature);
            if (!seen.has(id)) {
                seen.add(id);
                unique.push(feature);
            }
        }
        this.clusterPoints.set(unique);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MarkersForClustersComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.1.1", type: MarkersForClustersComponent, isStandalone: true, selector: "mgl-markers-for-clusters", inputs: { source: { classPropertyName: "source", publicName: "source", isSignal: true, isRequired: true, transformFunction: null }, customPointIdKey: { classPropertyName: "customPointIdKey", publicName: "customPointIdKey", isSignal: true, isRequired: false, transformFunction: null } }, queries: [{ propertyName: "pointTpl", first: true, predicate: PointDirective, descendants: true, read: TemplateRef }, { propertyName: "clusterPointTpl", first: true, predicate: ClusterPointDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <mgl-layer
      [id]="layerId"
      [source]="source()"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    />
    @for (feature of clusterPoints(); track trackByFeature(feature)) {
      @if (feature.properties!['cluster']) {
        <mgl-marker [feature]="$any(feature)">
          @if (clusterPointTpl) {
            <ng-template
              [ngTemplateOutlet]="clusterPointTpl"
              [ngTemplateOutletContext]="{ $implicit: feature }"
            />
          }
        </mgl-marker>
      } @else {
        <mgl-marker [feature]="$any(feature)">
          @if (pointTpl) {
            <ng-template
              [ngTemplateOutlet]="pointTpl"
              [ngTemplateOutletContext]="{ $implicit: feature }"
            />
          }
        </mgl-marker>
      }
    }
  `, isInline: true, dependencies: [{ kind: "component", type: MarkerComponent, selector: "mgl-marker", inputs: ["offset", "anchor", "clickTolerance", "feature", "lngLat", "draggable", "popupShown", "className", "zIndex", "pitchAlignment", "rotationAlignment"], outputs: ["markerDragStart", "markerDragEnd", "markerDrag"] }, { kind: "component", type: LayerComponent, selector: "mgl-layer", inputs: ["id", "source", "type", "metadata", "sourceLayer", "filter", "layout", "paint", "before", "minzoom", "maxzoom"], outputs: ["layerClick", "layerDblClick", "layerMouseDown", "layerMouseUp", "layerMouseEnter", "layerMouseLeave", "layerMouseMove", "layerMouseOver", "layerMouseOut", "layerContextMenu", "layerTouchStart", "layerTouchEnd", "layerTouchCancel"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: MarkersForClustersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-markers-for-clusters',
                    template: `
    <mgl-layer
      [id]="layerId"
      [source]="source()"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    />
    @for (feature of clusterPoints(); track trackByFeature(feature)) {
      @if (feature.properties!['cluster']) {
        <mgl-marker [feature]="$any(feature)">
          @if (clusterPointTpl) {
            <ng-template
              [ngTemplateOutlet]="clusterPointTpl"
              [ngTemplateOutletContext]="{ $implicit: feature }"
            />
          }
        </mgl-marker>
      } @else {
        <mgl-marker [feature]="$any(feature)">
          @if (pointTpl) {
            <ng-template
              [ngTemplateOutlet]="pointTpl"
              [ngTemplateOutletContext]="{ $implicit: feature }"
            />
          }
        </mgl-marker>
      }
    }
  `,
                    imports: [MarkerComponent, LayerComponent, NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { source: [{ type: i0.Input, args: [{ isSignal: true, alias: "source", required: true }] }], customPointIdKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "customPointIdKey", required: false }] }], pointTpl: [{
                type: ContentChild,
                args: [PointDirective, { read: TemplateRef, static: false }]
            }], clusterPointTpl: [{
                type: ContentChild,
                args: [ClusterPointDirective, { read: TemplateRef, static: false }]
            }] } });
//# sourceMappingURL=markers-for-clusters.component.js.map