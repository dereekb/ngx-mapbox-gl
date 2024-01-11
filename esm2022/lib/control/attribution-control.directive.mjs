import { Directive, Host, Input } from '@angular/core';
import { AttributionControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
class AttributionControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            if (this.compact !== undefined) {
                options.compact = this.compact;
            }
            if (this.customAttribution !== undefined) {
                options.customAttribution = this.customAttribution;
            }
            this.controlComponent.control = new AttributionControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: AttributionControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: AttributionControlDirective, selector: "[mglAttribution]", inputs: { compact: "compact", customAttribution: "customAttribution" }, ngImport: i0 }); }
}
export { AttributionControlDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: AttributionControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglAttribution]',
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { compact: [{
                type: Input
            }], customAttribution: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9jb250cm9sL2F0dHJpYnV0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUV2RCxNQUdhLDJCQUEyQjtJQUt0QyxZQUNVLFVBQXNCLEVBQ2QsZ0JBQXNEO1FBRDlELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXNDO0lBQ3JFLENBQUM7SUFFSixrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQzthQUNwRTtZQUNELE1BQU0sT0FBTyxHQUdULEVBQUUsQ0FBQztZQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNoQztZQUNELElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLFNBQVMsRUFBRTtnQkFDeEMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzthQUNwRDtZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0EvQlUsMkJBQTJCO2tHQUEzQiwyQkFBMkI7O1NBQTNCLDJCQUEyQjsyRkFBM0IsMkJBQTJCO2tCQUh2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzswQkFRSSxJQUFJOzRDQUxFLE9BQU87c0JBQWYsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBEaXJlY3RpdmUsIEhvc3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xBdHRyaWJ1dGlvbl0nLFxufSlcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgY29tcGFjdD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGN1c3RvbUF0dHJpYnV0aW9uPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBjb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50PEF0dHJpYnV0aW9uQ29udHJvbD5cbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zOiB7XG4gICAgICAgIGNvbXBhY3Q/OiBib29sZWFuO1xuICAgICAgICBjdXN0b21BdHRyaWJ1dGlvbj86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgICAgfSA9IHt9O1xuICAgICAgaWYgKHRoaXMuY29tcGFjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMuY29tcGFjdCA9IHRoaXMuY29tcGFjdDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmN1c3RvbUF0dHJpYnV0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy5jdXN0b21BdHRyaWJ1dGlvbiA9IHRoaXMuY3VzdG9tQXR0cmlidXRpb247XG4gICAgICB9XG4gICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBBdHRyaWJ1dGlvbkNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkQ29udHJvbChcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5wb3NpdGlvblxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19