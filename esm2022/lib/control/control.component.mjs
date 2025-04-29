import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, input, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class CustomControl {
    container;
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
export class ControlComponent {
    mapService = inject(MapService);
    /* Init inputs */
    position = input();
    content;
    control;
    controlAdded = false;
    ngAfterContentInit() {
        if (this.content.nativeElement.childNodes.length) {
            this.control = new CustomControl(this.content.nativeElement);
            this.mapService.mapCreated$.subscribe(() => {
                this.mapService.addControl(this.control, this.position());
                this.controlAdded = true;
            });
        }
    }
    ngOnDestroy() {
        if (this.controlAdded) {
            this.mapService.removeControl(this.control);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: ControlComponent, isStandalone: true, selector: "mgl-control", inputs: { position: { classPropertyName: "position", publicName: "position", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], ngImport: i0, template: `
    <div class="mapboxgl-ctrl" #content>
      <ng-content />
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ControlComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-control',
                    template: `
    <div class="mapboxgl-ctrl" #content>
      <ng-content />
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRWhELE1BQU0sT0FBTyxhQUFhO0lBQ0o7SUFBcEIsWUFBb0IsU0FBc0I7UUFBdEIsY0FBUyxHQUFULFNBQVMsQ0FBYTtJQUFHLENBQUM7SUFFOUMsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Q0FDRjtBQVlELE1BQU0sT0FBTyxnQkFBZ0I7SUFHbkIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4QyxpQkFBaUI7SUFDakIsUUFBUSxHQUFHLEtBQUssRUFBNkQsQ0FBQztJQUV0QyxPQUFPLENBQWE7SUFFNUQsT0FBTyxDQUFvQjtJQUVuQixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBRTdCLGtCQUFrQjtRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQztJQUNILENBQUM7d0dBNUJVLGdCQUFnQjs0RkFBaEIsZ0JBQWdCLHNVQVBqQjs7OztHQUlUOzs0RkFHVSxnQkFBZ0I7a0JBVjVCLFNBQVM7bUJBQUM7b0JBQ1QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBU3lDLE9BQU87c0JBQTlDLFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxuICBpbmplY3QsXG4gIGlucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElDb250cm9sLCB0eXBlIENvbnRyb2xQb3NpdGlvbiB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbnRyb2wgaW1wbGVtZW50cyBJQ29udHJvbCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCkge31cblxuICBvbkFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG4gIH1cblxuICBvblJlbW92ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdFBvc2l0aW9uKCk6IENvbnRyb2xQb3NpdGlvbiB7XG4gICAgcmV0dXJuICd0b3AtcmlnaHQnO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ21nbC1jb250cm9sJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibWFwYm94Z2wtY3RybFwiICNjb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQgLz5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xDb21wb25lbnQ8VCBleHRlbmRzIElDb250cm9sPlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdFxue1xuICBwcml2YXRlIG1hcFNlcnZpY2UgPSBpbmplY3QoTWFwU2VydmljZSk7XG5cbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgcG9zaXRpb24gPSBpbnB1dDwndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCc+KCk7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29udHJvbDogVCB8IEN1c3RvbUNvbnRyb2w7XG5cbiAgcHJpdmF0ZSBjb250cm9sQWRkZWQgPSBmYWxzZTtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNvbnRyb2wgPSBuZXcgQ3VzdG9tQ29udHJvbCh0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5jb250cm9sISwgdGhpcy5wb3NpdGlvbigpKTtcbiAgICAgICAgdGhpcy5jb250cm9sQWRkZWQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbEFkZGVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlQ29udHJvbCh0aGlzLmNvbnRyb2wpO1xuICAgIH1cbiAgfVxufVxuIl19