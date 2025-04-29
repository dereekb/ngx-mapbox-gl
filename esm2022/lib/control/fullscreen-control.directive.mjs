import { Directive, HostListener, inject, input, } from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class FullscreenControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    container = input();
    onFullscreen() {
        this.mapService.mapInstance.resize();
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            this.controlComponent.control = new FullscreenControl({
                container: this.container(),
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FullscreenControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.13", type: FullscreenControlDirective, isStandalone: true, selector: "[mglFullscreen]", inputs: { container: { classPropertyName: "container", publicName: "container", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "window:webkitfullscreenchange": "onFullscreen($event.target)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FullscreenControlDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[mglFullscreen]',
                }]
        }], propDecorators: { onFullscreen: [{
                type: HostListener,
                args: ['window:webkitfullscreenchange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHNjcmVlbi1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL2NvbnRyb2wvZnVsbHNjcmVlbi1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBTXZELE1BQU0sT0FBTywwQkFBMEI7SUFDN0IsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxnQkFBZ0IsR0FBRyxNQUFNLENBQy9CLENBQUEsZ0JBQW1DLENBQUEsRUFDbkMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLGlCQUFpQjtJQUNqQixTQUFTLEdBQUcsS0FBSyxFQUFlLENBQUM7SUFHakMsWUFBWTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1lBQ3JFLENBQUM7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUM7Z0JBQ3BELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFO2FBQzVCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBNUJVLDBCQUEwQjs0RkFBMUIsMEJBQTBCOzs0RkFBMUIsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsaUJBQWlCO2lCQUM1Qjs4QkFZQyxZQUFZO3NCQURYLFlBQVk7dUJBQUMsK0JBQStCLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBEaXJlY3RpdmUsXG4gIEhvc3RMaXN0ZW5lcixcbiAgaW5qZWN0LFxuICBpbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnW21nbEZ1bGxzY3JlZW5dJyxcbn0pXG5leHBvcnQgY2xhc3MgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gaW5qZWN0KE1hcFNlcnZpY2UpO1xuICBwcml2YXRlIGNvbnRyb2xDb21wb25lbnQgPSBpbmplY3Q8Q29udHJvbENvbXBvbmVudDxGdWxsc2NyZWVuQ29udHJvbD4+KFxuICAgIENvbnRyb2xDb21wb25lbnQ8RnVsbHNjcmVlbkNvbnRyb2w+LFxuICAgIHsgaG9zdDogdHJ1ZSB9LFxuICApO1xuXG4gIC8qIEluaXQgaW5wdXRzICovXG4gIGNvbnRhaW5lciA9IGlucHV0PEhUTUxFbGVtZW50PigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzp3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uRnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UucmVzaXplKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgRnVsbHNjcmVlbkNvbnRyb2woe1xuICAgICAgICBjb250YWluZXI6IHRoaXMuY29udGFpbmVyKCksXG4gICAgICB9KTtcbiAgICAgIHRoaXMubWFwU2VydmljZS5hZGRDb250cm9sKFxuICAgICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCxcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LnBvc2l0aW9uKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=