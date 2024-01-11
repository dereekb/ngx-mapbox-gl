import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttributionControlDirective } from './control/attribution-control.directive';
import { ControlComponent } from './control/control.component';
import { FullscreenControlDirective } from './control/fullscreen-control.directive';
import { GeolocateControlDirective } from './control/geolocate-control.directive';
import { NavigationControlDirective } from './control/navigation-control.directive';
import { ScaleControlDirective } from './control/scale-control.directive';
import { DraggableDirective } from './draggable/draggable.directive';
import { ImageComponent } from './image/image.component';
import { LayerComponent } from './layer/layer.component';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';
import { MarkerComponent } from './marker/marker.component';
import { ClusterPointDirective, MarkersForClustersComponent, PointDirective, } from './markers-for-clusters/markers-for-clusters.component';
import { PopupComponent } from './popup/popup.component';
import { CanvasSourceComponent } from './source/canvas-source.component';
import { FeatureComponent } from './source/geojson/feature.component';
import { GeoJSONSourceComponent } from './source/geojson/geojson-source.component';
import { ImageSourceComponent } from './source/image-source.component';
import { RasterDemSourceComponent } from './source/raster-dem-source.component';
import { RasterSourceComponent } from './source/raster-source.component';
import { VectorSourceComponent } from './source/vector-source.component';
import { VideoSourceComponent } from './source/video-source.component';
import * as i0 from "@angular/core";
class NgxMapboxGLModule {
    static withConfig(config) {
        return {
            ngModule: NgxMapboxGLModule,
            providers: [
                {
                    provide: MAPBOX_API_KEY,
                    useValue: config.accessToken,
                },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NgxMapboxGLModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.4", ngImport: i0, type: NgxMapboxGLModule, declarations: [MapComponent,
            LayerComponent,
            DraggableDirective,
            ImageComponent,
            VectorSourceComponent,
            GeoJSONSourceComponent,
            RasterDemSourceComponent,
            RasterSourceComponent,
            ImageSourceComponent,
            VideoSourceComponent,
            CanvasSourceComponent,
            FeatureComponent,
            MarkerComponent,
            PopupComponent,
            ControlComponent,
            FullscreenControlDirective,
            NavigationControlDirective,
            GeolocateControlDirective,
            AttributionControlDirective,
            ScaleControlDirective,
            PointDirective,
            ClusterPointDirective,
            MarkersForClustersComponent], imports: [CommonModule], exports: [MapComponent,
            LayerComponent,
            DraggableDirective,
            ImageComponent,
            VectorSourceComponent,
            GeoJSONSourceComponent,
            RasterDemSourceComponent,
            RasterSourceComponent,
            ImageSourceComponent,
            VideoSourceComponent,
            CanvasSourceComponent,
            FeatureComponent,
            MarkerComponent,
            PopupComponent,
            ControlComponent,
            FullscreenControlDirective,
            NavigationControlDirective,
            GeolocateControlDirective,
            AttributionControlDirective,
            ScaleControlDirective,
            PointDirective,
            ClusterPointDirective,
            MarkersForClustersComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NgxMapboxGLModule, imports: [CommonModule] }); }
}
export { NgxMapboxGLModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NgxMapboxGLModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MapComponent,
                        LayerComponent,
                        DraggableDirective,
                        ImageComponent,
                        VectorSourceComponent,
                        GeoJSONSourceComponent,
                        RasterDemSourceComponent,
                        RasterSourceComponent,
                        ImageSourceComponent,
                        VideoSourceComponent,
                        CanvasSourceComponent,
                        FeatureComponent,
                        MarkerComponent,
                        PopupComponent,
                        ControlComponent,
                        FullscreenControlDirective,
                        NavigationControlDirective,
                        GeolocateControlDirective,
                        AttributionControlDirective,
                        ScaleControlDirective,
                        PointDirective,
                        ClusterPointDirective,
                        MarkersForClustersComponent,
                    ],
                    exports: [
                        MapComponent,
                        LayerComponent,
                        DraggableDirective,
                        ImageComponent,
                        VectorSourceComponent,
                        GeoJSONSourceComponent,
                        RasterDemSourceComponent,
                        RasterSourceComponent,
                        ImageSourceComponent,
                        VideoSourceComponent,
                        CanvasSourceComponent,
                        FeatureComponent,
                        MarkerComponent,
                        PopupComponent,
                        ControlComponent,
                        FullscreenControlDirective,
                        NavigationControlDirective,
                        GeolocateControlDirective,
                        AttributionControlDirective,
                        ScaleControlDirective,
                        PointDirective,
                        ClusterPointDirective,
                        MarkersForClustersComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9uZ3gtbWFwYm94LWdsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLDJCQUEyQixFQUMzQixjQUFjLEdBQ2YsTUFBTSx1REFBdUQsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FB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O3dCQUMxQiwwQkFBMEI7d0JBQzFCLHlCQUF5Qjt3QkFDekIsMkJBQTJCO3dCQUMzQixxQkFBcUI7d0JBQ3JCLGNBQWM7d0JBQ2QscUJBQXFCO3dCQUNyQiwyQkFBMkI7cUJBQzVCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvYXR0cmlidXRpb24tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC9jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9mdWxsc2NyZWVuLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL25hdmlnYXRpb24tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2NhbGVDb250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL3NjYWxlLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZ2dhYmxlL2RyYWdnYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSW1hZ2VDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlL2ltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXllckNvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXIvbGF5ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcENvbXBvbmVudCB9IGZyb20gJy4vbWFwL21hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTUFQQk9YX0FQSV9LRVkgfSBmcm9tICcuL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIENsdXN0ZXJQb2ludERpcmVjdGl2ZSxcbiAgTWFya2Vyc0ZvckNsdXN0ZXJzQ29tcG9uZW50LFxuICBQb2ludERpcmVjdGl2ZSxcbn0gZnJvbSAnLi9tYXJrZXJzLWZvci1jbHVzdGVycy9tYXJrZXJzLWZvci1jbHVzdGVycy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL3BvcHVwL3BvcHVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW52YXNTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9jYW52YXMtc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFJhc3RlckRlbVNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3Jhc3Rlci1kZW0tc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYXN0ZXJTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9yYXN0ZXItc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZWN0b3JTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS92ZWN0b3Itc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWRlb1NvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZpZGVvLXNvdXJjZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJEZW1Tb3VyY2VDb21wb25lbnQsXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxuICAgIFZpZGVvU291cmNlQ29tcG9uZW50LFxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBQb3B1cENvbXBvbmVudCxcbiAgICBDb250cm9sQ29tcG9uZW50LFxuICAgIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2Vyc0ZvckNsdXN0ZXJzQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJEZW1Tb3VyY2VDb21wb25lbnQsXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxuICAgIFZpZGVvU291cmNlQ29tcG9uZW50LFxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBQb3B1cENvbXBvbmVudCxcbiAgICBDb250cm9sQ29tcG9uZW50LFxuICAgIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2Vyc0ZvckNsdXN0ZXJzQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXBib3hHTE1vZHVsZSB7XG4gIHN0YXRpYyB3aXRoQ29uZmlnKGNvbmZpZzoge1xuICAgIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG4gIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neE1hcGJveEdMTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hNYXBib3hHTE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUFQQk9YX0FQSV9LRVksXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5hY2Nlc3NUb2tlbixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19