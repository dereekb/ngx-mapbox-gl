import { Directive, inject, input } from '@angular/core';
import { AttributionControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class AttributionControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    compact = input();
    customAttribution = input();
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            const compact = this.compact();
            const customAttribution = this.customAttribution();
            if (compact !== undefined) {
                options.compact = compact;
            }
            if (customAttribution !== undefined) {
                options.customAttribution = customAttribution;
            }
            this.controlComponent.control = new AttributionControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AttributionControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.13", type: AttributionControlDirective, isStandalone: true, selector: "[mglAttribution]", inputs: { compact: { classPropertyName: "compact", publicName: "compact", isSignal: true, isRequired: false, transformFunction: null }, customAttribution: { classPropertyName: "customAttribution", publicName: "customAttribution", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AttributionControlDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[mglAttribution]',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9jb250cm9sL2F0dHJpYnV0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFNdkQsTUFBTSxPQUFPLDJCQUEyQjtJQUM5QixVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hDLGdCQUFnQixHQUFHLE1BQU0sQ0FDL0IsQ0FBQSxnQkFBb0MsQ0FBQSxFQUNwQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FDZixDQUFDO0lBRUYsaUJBQWlCO0lBQ2pCLE9BQU8sR0FBRyxLQUFLLEVBQVcsQ0FBQztJQUMzQixpQkFBaUIsR0FBRyxLQUFLLEVBQXFCLENBQUM7SUFFL0Msa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztZQUNyRSxDQUFDO1lBQ0QsTUFBTSxPQUFPLEdBR1QsRUFBRSxDQUFDO1lBQ1AsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQy9CLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDbkQsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzVCLENBQUM7WUFDRCxJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUNwQyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7WUFDaEQsQ0FBQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUNqQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3dHQWxDVSwyQkFBMkI7NEZBQTNCLDJCQUEyQjs7NEZBQTNCLDJCQUEyQjtrQkFKdkMsU0FBUzttQkFBQztvQkFDVCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBEaXJlY3RpdmUsIGluamVjdCwgaW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnW21nbEF0dHJpYnV0aW9uXScsXG59KVxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBwcml2YXRlIG1hcFNlcnZpY2UgPSBpbmplY3QoTWFwU2VydmljZSk7XG4gIHByaXZhdGUgY29udHJvbENvbXBvbmVudCA9IGluamVjdDxDb250cm9sQ29tcG9uZW50PEF0dHJpYnV0aW9uQ29udHJvbD4+KFxuICAgIENvbnRyb2xDb21wb25lbnQ8QXR0cmlidXRpb25Db250cm9sPixcbiAgICB7IGhvc3Q6IHRydWUgfSxcbiAgKTtcblxuICAvKiBJbml0IGlucHV0cyAqL1xuICBjb21wYWN0ID0gaW5wdXQ8Ym9vbGVhbj4oKTtcbiAgY3VzdG9tQXR0cmlidXRpb24gPSBpbnB1dDxzdHJpbmcgfCBzdHJpbmdbXT4oKTtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uczoge1xuICAgICAgICBjb21wYWN0PzogYm9vbGVhbjtcbiAgICAgICAgY3VzdG9tQXR0cmlidXRpb24/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICAgIH0gPSB7fTtcbiAgICAgIGNvbnN0IGNvbXBhY3QgPSB0aGlzLmNvbXBhY3QoKTtcbiAgICAgIGNvbnN0IGN1c3RvbUF0dHJpYnV0aW9uID0gdGhpcy5jdXN0b21BdHRyaWJ1dGlvbigpO1xuICAgICAgaWYgKGNvbXBhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLmNvbXBhY3QgPSBjb21wYWN0O1xuICAgICAgfVxuICAgICAgaWYgKGN1c3RvbUF0dHJpYnV0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy5jdXN0b21BdHRyaWJ1dGlvbiA9IGN1c3RvbUF0dHJpYnV0aW9uO1xuICAgICAgfVxuICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgQXR0cmlidXRpb25Db250cm9sKG9wdGlvbnMpO1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZENvbnRyb2woXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sLFxuICAgICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQucG9zaXRpb24oKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==