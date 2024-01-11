import { ChangeDetectionStrategy, Component, Inject, Input, forwardRef, } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
import * as i0 from "@angular/core";
import * as i1 from "./geojson-source.component";
class FeatureComponent {
    constructor(GeoJSONSourceComponent) {
        this.GeoJSONSourceComponent = GeoJSONSourceComponent;
        this.type = 'Feature';
    }
    ngOnInit() {
        if (!this.id) {
            this.id = this.GeoJSONSourceComponent._getNewFeatureId();
        }
        this.feature = {
            type: this.type,
            geometry: this.geometry,
            properties: this.properties ? this.properties : {},
        };
        this.feature.id = this.id;
        this.GeoJSONSourceComponent._addFeature(this.feature);
    }
    ngOnDestroy() {
        this.GeoJSONSourceComponent._removeFeature(this.feature);
    }
    updateCoordinates(coordinates) {
        this.feature.geometry.coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next(null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FeatureComponent, deps: [{ token: forwardRef(() => GeoJSONSourceComponent) }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: FeatureComponent, selector: "mgl-feature", inputs: { id: "id", geometry: "geometry", properties: "properties" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { FeatureComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FeatureComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-feature',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.GeoJSONSourceComponent, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => GeoJSONSourceComponent)]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], geometry: [{
                type: Input
            }], properties: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUdMLFVBQVUsR0FDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBRXBFLE1BS2EsZ0JBQWdCO0lBVzNCLFlBRVUsc0JBQThDO1FBQTlDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFOeEQsU0FBSSxHQUFHLFNBQWtCLENBQUM7SUFPdkIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDMUQ7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ25ELENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGlCQUFpQixDQUFDLFdBQXFCO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBMEIsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25FLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs4R0FwQ1UsZ0JBQWdCLGtCQVlqQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7a0dBWnZDLGdCQUFnQix5SEFIakIsRUFBRTs7U0FHRCxnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFMNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFhSSxNQUFNOzJCQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzs0Q0FSekMsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb0pTT05Tb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL2dlb2pzb24tc291cmNlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1mZWF0dXJlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRmVhdHVyZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD5cbntcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ/OiBudW1iZXI7IC8vIEZJWE1FIG51bWJlciBvbmx5IGZvciBub3cgaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvaXNzdWVzLzI3MTZcbiAgQElucHV0KCkgZ2VvbWV0cnk6IEdlb0pTT04uR2VvbWV0cnlPYmplY3Q7XG4gIEBJbnB1dCgpIHByb3BlcnRpZXM6IGFueTtcbiAgdHlwZSA9ICdGZWF0dXJlJyBhcyBjb25zdDtcblxuICBwcml2YXRlIGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gR2VvSlNPTlNvdXJjZUNvbXBvbmVudCkpXG4gICAgcHJpdmF0ZSBHZW9KU09OU291cmNlQ29tcG9uZW50OiBHZW9KU09OU291cmNlQ29tcG9uZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQuX2dldE5ld0ZlYXR1cmVJZCgpO1xuICAgIH1cbiAgICB0aGlzLmZlYXR1cmUgPSB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBnZW9tZXRyeTogdGhpcy5nZW9tZXRyeSxcbiAgICAgIHByb3BlcnRpZXM6IHRoaXMucHJvcGVydGllcyA/IHRoaXMucHJvcGVydGllcyA6IHt9LFxuICAgIH07XG4gICAgdGhpcy5mZWF0dXJlLmlkID0gdGhpcy5pZDtcbiAgICB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQuX2FkZEZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5fcmVtb3ZlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICB9XG5cbiAgdXBkYXRlQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXM6IG51bWJlcltdKSB7XG4gICAgKHRoaXMuZmVhdHVyZS5nZW9tZXRyeSBhcyBHZW9KU09OLlBvaW50KS5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KG51bGwpO1xuICB9XG59XG4iXX0=