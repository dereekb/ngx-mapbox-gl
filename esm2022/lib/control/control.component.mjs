import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
export class CustomControl {
    constructor(container) {
        this.container = container;
    }
    onAdd() {
        return this.container;
    }
    onRemove() {
        return this.container.parentNode.removeChild(this.container);
    }
    getDefaultPosition() {
        return 'top-right';
    }
}
class ControlComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.controlAdded = false;
    }
    ngAfterContentInit() {
        if (this.content.nativeElement.childNodes.length) {
            this.control = new CustomControl(this.content.nativeElement);
            this.mapService.mapCreated$.subscribe(() => {
                this.mapService.addControl(this.control, this.position);
                this.controlAdded = true;
            });
        }
    }
    ngOnDestroy() {
        if (this.controlAdded) {
            this.mapService.removeControl(this.control);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ControlComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: ControlComponent, selector: "mgl-control", inputs: { position: "position" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], ngImport: i0, template: '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { ControlComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-control',
                    template: '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { position: [{
                type: Input
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBRWhELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQW9CLFNBQXNCO1FBQXRCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFBRyxDQUFDO0lBRTlDLEtBQUs7UUFDSCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUFFRCxNQU1hLGdCQUFnQjtJQVkzQixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRmxDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBRWdCLENBQUM7SUFFOUMsa0JBQWtCO1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDOzhHQTVCVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQix1TUFIekIscUVBQXFFOztTQUc1RCxnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFONUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUNOLHFFQUFxRTtvQkFDdkUsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO2lHQUtVLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRWtDLE9BQU87c0JBQTlDLFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbnRyb2wgaW1wbGVtZW50cyBJQ29udHJvbCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCkge31cblxuICBvbkFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG4gIH1cblxuICBvblJlbW92ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiAndG9wLXJpZ2h0JztcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtY29udHJvbCcsXG4gIHRlbXBsYXRlOlxuICAgICc8ZGl2IGNsYXNzPVwibWFwYm94Z2wtY3RybFwiICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbENvbXBvbmVudDxUIGV4dGVuZHMgSUNvbnRyb2w+XG4gIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0XG57XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uPzogJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnRyb2w6IFQgfCBDdXN0b21Db250cm9sO1xuXG4gIHByaXZhdGUgY29udHJvbEFkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY29udHJvbCA9IG5ldyBDdXN0b21Db250cm9sKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMubWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLmNvbnRyb2whLCB0aGlzLnBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5jb250cm9sQWRkZWQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbEFkZGVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlQ29udHJvbCh0aGlzLmNvbnRyb2wpO1xuICAgIH1cbiAgfVxufVxuIl19