import { ChangeDetectionStrategy, Component, ContentChild, Directive, NgZone, TemplateRef, inject, input, signal, } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { LayerComponent } from '../layer/layer.component';
import { NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
export class PointDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.13", type: PointDirective, isStandalone: true, selector: "ng-template[mglPoint]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PointDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'ng-template[mglPoint]',
                }]
        }] });
export class ClusterPointDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ClusterPointDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.13", type: ClusterPointDirective, isStandalone: true, selector: "ng-template[mglClusterPoint]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ClusterPointDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'ng-template[mglClusterPoint]',
                }]
        }] });
let uniqId = 0;
export class MarkersForClustersComponent {
    mapService = inject(MapService);
    zone = inject(NgZone);
    /* Init input */
    source = input.required();
    /* Dynamic input */
    customPointIdKey = input();
    pointTpl;
    clusterPointTpl;
    clusterPoints = signal([]);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MarkersForClustersComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.13", type: MarkersForClustersComponent, isStandalone: true, selector: "mgl-markers-for-clusters", inputs: { source: { classPropertyName: "source", publicName: "source", isSignal: true, isRequired: true, transformFunction: null }, customPointIdKey: { classPropertyName: "customPointIdKey", publicName: "customPointIdKey", isSignal: true, isRequired: false, transformFunction: null } }, queries: [{ propertyName: "pointTpl", first: true, predicate: PointDirective, descendants: true, read: TemplateRef }, { propertyName: "clusterPointTpl", first: true, predicate: ClusterPointDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MarkersForClustersComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
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
        }], propDecorators: { pointTpl: [{
                type: ContentChild,
                args: [PointDirective, { read: TemplateRef, static: false }]
            }], clusterPointTpl: [{
                type: ContentChild,
                args: [ClusterPointDirective, { read: TemplateRef, static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Vycy1mb3ItY2x1c3RlcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvbWFya2Vycy1mb3ItY2x1c3RlcnMvbWFya2Vycy1mb3ItY2x1c3RlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsTUFBTSxFQUVOLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQU12QixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBTW5ELE1BQU0sT0FBTyxjQUFjO3dHQUFkLGNBQWM7NEZBQWQsY0FBYzs7NEZBQWQsY0FBYztrQkFKMUIsU0FBUzttQkFBQztvQkFDVCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLHVCQUF1QjtpQkFDbEM7O0FBT0QsTUFBTSxPQUFPLHFCQUFxQjt3R0FBckIscUJBQXFCOzRGQUFyQixxQkFBcUI7OzRGQUFyQixxQkFBcUI7a0JBSmpDLFNBQVM7bUJBQUM7b0JBQ1QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSw4QkFBOEI7aUJBQ3pDOztBQUdELElB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Q0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDO29CQUM1RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBY0MsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFHbEUsZUFBZTtzQkFEZCxZQUFZO3VCQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbiAgaW5qZWN0LFxuICBpbnB1dCxcbiAgc2lnbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHtcbiAgTWFwU291cmNlRGF0YUV2ZW50LFxuICBHZW9KU09ORmVhdHVyZSxcbiAgRmlsdGVyU3BlY2lmaWNhdGlvbixcbn0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuLi9sYXllci9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbFBvaW50XScsXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50RGlyZWN0aXZlIHt9XG5cbkBEaXJlY3RpdmUoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbENsdXN0ZXJQb2ludF0nLFxufSlcbmV4cG9ydCBjbGFzcyBDbHVzdGVyUG9pbnREaXJlY3RpdmUge31cblxubGV0IHVuaXFJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ21nbC1tYXJrZXJzLWZvci1jbHVzdGVycycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1nbC1sYXllclxuICAgICAgW2lkXT1cImxheWVySWRcIlxuICAgICAgW3NvdXJjZV09XCJzb3VyY2UoKVwiXG4gICAgICB0eXBlPVwiY2lyY2xlXCJcbiAgICAgIFtwYWludF09XCJ7ICdjaXJjbGUtcmFkaXVzJzogMCB9XCJcbiAgICAvPlxuICAgIEBmb3IgKGZlYXR1cmUgb2YgY2x1c3RlclBvaW50cygpOyB0cmFjayB0cmFja0J5RmVhdHVyZShmZWF0dXJlKSkge1xuICAgICAgQGlmIChmZWF0dXJlLnByb3BlcnRpZXMhWydjbHVzdGVyJ10pIHtcbiAgICAgICAgPG1nbC1tYXJrZXIgW2ZlYXR1cmVdPVwiJGFueShmZWF0dXJlKVwiPlxuICAgICAgICAgIEBpZiAoY2x1c3RlclBvaW50VHBsKSB7XG4gICAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY2x1c3RlclBvaW50VHBsXCJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBmZWF0dXJlIH1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvbWdsLW1hcmtlcj5cbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICA8bWdsLW1hcmtlciBbZmVhdHVyZV09XCIkYW55KGZlYXR1cmUpXCI+XG4gICAgICAgICAgQGlmIChwb2ludFRwbCkge1xuICAgICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBvaW50VHBsXCJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBmZWF0dXJlIH1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvbWdsLW1hcmtlcj5cbiAgICAgIH1cbiAgICB9XG4gIGAsXG4gIGltcG9ydHM6IFtNYXJrZXJDb21wb25lbnQsIExheWVyQ29tcG9uZW50LCBOZ1RlbXBsYXRlT3V0bGV0XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlcnNGb3JDbHVzdGVyc0NvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdFxue1xuICBwcml2YXRlIG1hcFNlcnZpY2UgPSBpbmplY3QoTWFwU2VydmljZSk7XG4gIHByaXZhdGUgem9uZSA9IGluamVjdChOZ1pvbmUpO1xuXG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgc291cmNlID0gaW5wdXQucmVxdWlyZWQ8c3RyaW5nPigpO1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgY3VzdG9tUG9pbnRJZEtleSA9IGlucHV0PHN0cmluZz4oKTtcblxuICBAQ29udGVudENoaWxkKFBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IGZhbHNlIH0pXG4gIHBvaW50VHBsPzogVGVtcGxhdGVSZWY8dW5rbm93bj47XG4gIEBDb250ZW50Q2hpbGQoQ2x1c3RlclBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IGZhbHNlIH0pXG4gIGNsdXN0ZXJQb2ludFRwbDogVGVtcGxhdGVSZWY8dW5rbm93bj47XG5cbiAgY2x1c3RlclBvaW50cyA9IHNpZ25hbDxHZW9KU09ORmVhdHVyZVtdPihbXSk7XG4gIGxheWVySWQgPSBgbWdsLW1hcmtlcnMtZm9yLWNsdXN0ZXJzLSR7dW5pcUlkKyt9YDtcblxuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgY29uc3QgY2x1c3RlckRhdGFVcGRhdGUgPSAoKSA9PlxuICAgICAgZnJvbUV2ZW50PE1hcFNvdXJjZURhdGFFdmVudD4odGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICAoZSkgPT5cbiAgICAgICAgICAgIGUuc291cmNlSWQgPT09IHRoaXMuc291cmNlKCkgJiZcbiAgICAgICAgICAgIGUuc291cmNlRGF0YVR5cGUgIT09ICdtZXRhZGF0YScgJiZcbiAgICAgICAgICAgIHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5pc1NvdXJjZUxvYWRlZCh0aGlzLnNvdXJjZSgpKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgY29uc3Qgc3ViID0gdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGNsdXN0ZXJEYXRhVXBkYXRlKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW92ZScpLFxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdmVlbmQnKSxcbiAgICAgICAgICApLnBpcGUoc3RhcnRXaXRoKHVuZGVmaW5lZCkpLFxuICAgICAgICApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlQ2x1c3RlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHRyYWNrQnlGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT05GZWF0dXJlKSB7XG4gICAgaWYgKGZlYXR1cmUuaWQpIHtcbiAgICAgIHJldHVybiBmZWF0dXJlLmlkO1xuICAgIH1cbiAgICBjb25zdCBjdXN0b21Qb2ludElkS2V5ID0gdGhpcy5jdXN0b21Qb2ludElkS2V5KCk7XG4gICAgaWYgKCFjdXN0b21Qb2ludElkS2V5KSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbbWdsLW1hcmtlcnMtZm9yLWNsdXN0ZXJzXSBmZWF0dXJlLmlkIGlzIGZhbHN5LCBwbGVhc2UgcHJvdmlkZSBhIGN1c3RvbSBrZXknLFxuICAgICAgKTtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgaWQgPSBmZWF0dXJlLnByb3BlcnRpZXM/LltjdXN0b21Qb2ludElkS2V5XTtcbiAgICBpZiAoIWlkKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBbbWdsLW1hcmtlcnMtZm9yLWNsdXN0ZXJzXSBDdXN0b20ga2V5IFske2N1c3RvbVBvaW50SWRLZXl9XSwgcmVzb2x2ZSB0byBmYWxzeSBmb3JgLFxuICAgICAgICBmZWF0dXJlLFxuICAgICAgKTtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDbHVzdGVyKCkge1xuICAgIGNvbnN0IHBhcmFtczogeyBsYXllcnM/OiBzdHJpbmdbXTsgZmlsdGVyPzogRmlsdGVyU3BlY2lmaWNhdGlvbiB9ID0ge1xuICAgICAgbGF5ZXJzOiBbdGhpcy5sYXllcklkXSxcbiAgICB9O1xuICAgIGlmICghdGhpcy5wb2ludFRwbCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IFsnPT0nLCAnY2x1c3RlcicsIHRydWVdO1xuICAgIH1cbiAgICBjb25zdCBjbHVzdGVyUG9pbnRzID1cbiAgICAgIHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMocGFyYW1zKTtcbiAgICAvLyBSZW1vdmUgZHVwbGljYXRlcywgYmVjYXVzZSBpdCBzZWVtcyB0aGF0IHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyBjYW4gcmV0dXJuIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBzZWVuID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IHVuaXF1ZSA9IFtdO1xuICAgIGZvciAoY29uc3QgZmVhdHVyZSBvZiBjbHVzdGVyUG9pbnRzKSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMudHJhY2tCeUZlYXR1cmUoZmVhdHVyZSk7XG4gICAgICBpZiAoIXNlZW4uaGFzKGlkKSkge1xuICAgICAgICBzZWVuLmFkZChpZCk7XG4gICAgICAgIHVuaXF1ZS5wdXNoKGZlYXR1cmUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsdXN0ZXJQb2ludHMuc2V0KHVuaXF1ZSk7XG4gIH1cbn1cbiJdfQ==