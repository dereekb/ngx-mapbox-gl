import { ChangeDetectionStrategy, Component, forwardRef, inject, input, model, } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
import * as i0 from "@angular/core";
export class FeatureComponent {
    GeoJSONSourceComponent = inject(forwardRef(() => GeoJSONSourceComponent));
    /* Init inputs */
    id = model(); // FIXME number only for now https://github.com/mapbox/mapbox-gl-js/issues/2716
    geometry = input.required();
    properties = input();
    type = 'Feature';
    feature;
    ngOnInit() {
        if (!this.id()) {
            this.id.set(this.GeoJSONSourceComponent._getNewFeatureId());
        }
        this.feature = {
            type: this.type,
            geometry: this.geometry(),
            properties: this.properties() ? this.properties() : {},
        };
        this.feature.id = this.id();
        this.GeoJSONSourceComponent._addFeature(this.feature);
    }
    ngOnDestroy() {
        this.GeoJSONSourceComponent._removeFeature(this.feature);
    }
    updateCoordinates(coordinates) {
        this.feature.geometry.coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FeatureComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: FeatureComponent, isStandalone: true, selector: "mgl-feature", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null }, geometry: { classPropertyName: "geometry", publicName: "geometry", isSignal: true, isRequired: true, transformFunction: null }, properties: { classPropertyName: "properties", publicName: "properties", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { id: "idChange" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FeatureComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-feature',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFHVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBUXBFLE1BQU0sT0FBTyxnQkFBZ0I7SUFDbkIsc0JBQXNCLEdBQUcsTUFBTSxDQUNyQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsQ0FDekMsQ0FBQztJQUVGLGlCQUFpQjtJQUNqQixFQUFFLEdBQUcsS0FBSyxFQUFVLENBQUMsQ0FBQywrRUFBK0U7SUFDckcsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQTBCLENBQUM7SUFDcEQsVUFBVSxHQUFHLEtBQUssRUFBNkIsQ0FBQztJQUNoRCxJQUFJLEdBQUcsU0FBa0IsQ0FBQztJQUVsQixPQUFPLENBQTBDO0lBRXpELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ3hELENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsV0FBcUI7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUEwQixDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDbkUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO3dHQWpDVSxnQkFBZ0I7NEZBQWhCLGdCQUFnQixzZUFIakIsRUFBRTs7NEZBR0QsZ0JBQWdCO2tCQU41QixTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIGZvcndhcmRSZWYsXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIG1vZGVsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb0pTT05Tb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL2dlb2pzb24tc291cmNlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ21nbC1mZWF0dXJlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRmVhdHVyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBHZW9KU09OU291cmNlQ29tcG9uZW50ID0gaW5qZWN0PEdlb0pTT05Tb3VyY2VDb21wb25lbnQ+KFxuICAgIGZvcndhcmRSZWYoKCkgPT4gR2VvSlNPTlNvdXJjZUNvbXBvbmVudCksXG4gICk7XG5cbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgaWQgPSBtb2RlbDxudW1iZXI+KCk7IC8vIEZJWE1FIG51bWJlciBvbmx5IGZvciBub3cgaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvaXNzdWVzLzI3MTZcbiAgZ2VvbWV0cnkgPSBpbnB1dC5yZXF1aXJlZDxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PigpO1xuICBwcm9wZXJ0aWVzID0gaW5wdXQ8R2VvSlNPTi5HZW9Kc29uUHJvcGVydGllcz4oKTtcbiAgdHlwZSA9ICdGZWF0dXJlJyBhcyBjb25zdDtcblxuICBwcml2YXRlIGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaWQoKSkge1xuICAgICAgdGhpcy5pZC5zZXQodGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50Ll9nZXROZXdGZWF0dXJlSWQoKSk7XG4gICAgfVxuICAgIHRoaXMuZmVhdHVyZSA9IHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmdlb21ldHJ5KCksXG4gICAgICBwcm9wZXJ0aWVzOiB0aGlzLnByb3BlcnRpZXMoKSA/IHRoaXMucHJvcGVydGllcygpISA6IHt9LFxuICAgIH07XG4gICAgdGhpcy5mZWF0dXJlLmlkID0gdGhpcy5pZCgpO1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5fYWRkRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50Ll9yZW1vdmVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gIH1cblxuICB1cGRhdGVDb29yZGluYXRlcyhjb29yZGluYXRlczogbnVtYmVyW10pIHtcbiAgICAodGhpcy5mZWF0dXJlLmdlb21ldHJ5IGFzIEdlb0pTT04uUG9pbnQpLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQobnVsbCk7XG4gIH1cbn1cbiJdfQ==