import { Directive, Host, Input, } from '@angular/core';
import { ScaleControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
class ScaleControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    ngOnChanges(changes) {
        if (changes['unit'] && !changes['unit'].isFirstChange()) {
            this.controlComponent.control.setUnit(changes['unit'].currentValue);
        }
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            if (this.maxWidth !== undefined) {
                options.maxWidth = this.maxWidth;
            }
            if (this.unit !== undefined) {
                options.unit = this.unit;
            }
            this.controlComponent.control = new ScaleControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ScaleControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: ScaleControlDirective, selector: "[mglScale]", inputs: { maxWidth: "maxWidth", unit: "unit" }, usesOnChanges: true, ngImport: i0 }); }
}
export { ScaleControlDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ScaleControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglScale]',
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { maxWidth: [{
                type: Input
            }], unit: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9jb250cm9sL3NjYWxlLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsSUFBSSxFQUNKLEtBQUssR0FHTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUV2RCxNQUdhLHFCQUFxQjtJQU9oQyxZQUNVLFVBQXNCLEVBQ2QsZ0JBQWdEO1FBRHhELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWdDO0lBQy9ELENBQUM7SUFFSixXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQWUsQ0FBQyxPQUFPLENBQzVDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQzdCLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQzthQUNwRTtZQUNELE1BQU0sT0FBTyxHQUF5QyxFQUFFLENBQUM7WUFDekQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2xDO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0F0Q1UscUJBQXFCO2tHQUFyQixxQkFBcUI7O1NBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQUhqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7MEJBVUksSUFBSTs0Q0FQRSxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY2FsZUNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xTY2FsZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBTY2FsZUNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1bml0PzogJ2ltcGVyaWFsJyB8ICdtZXRyaWMnIHwgJ25hdXRpY2FsJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIGNvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnQ8U2NhbGVDb250cm9sPlxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWyd1bml0J10gJiYgIWNoYW5nZXNbJ3VuaXQnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICh0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCBhcyBhbnkpLnNldFVuaXQoXG4gICAgICAgIGNoYW5nZXNbJ3VuaXQnXS5jdXJyZW50VmFsdWVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMubWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnM6IHsgbWF4V2lkdGg/OiBudW1iZXI7IHVuaXQ/OiBzdHJpbmcgfSA9IHt9O1xuICAgICAgaWYgKHRoaXMubWF4V2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLm1heFdpZHRoID0gdGhpcy5tYXhXaWR0aDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnVuaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLnVuaXQgPSB0aGlzLnVuaXQ7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBTY2FsZUNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkQ29udHJvbChcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5wb3NpdGlvblxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19