import { Directive, Host, HostListener, Input, } from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
class FullscreenControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
    }
    onFullscreen() {
        this.mapService.mapInstance.resize();
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            this.controlComponent.control = new FullscreenControl({
                container: this.container,
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FullscreenControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: FullscreenControlDirective, selector: "[mglFullscreen]", inputs: { container: "container" }, host: { listeners: { "window:webkitfullscreenchange": "onFullscreen($event.target)" } }, ngImport: i0 }); }
}
export { FullscreenControlDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: FullscreenControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglFullscreen]',
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { container: [{
                type: Input
            }], onFullscreen: [{
                type: HostListener,
                args: ['window:webkitfullscreenchange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHNjcmVlbi1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL2NvbnRyb2wvZnVsbHNjcmVlbi1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULElBQUksRUFDSixZQUFZLEVBQ1osS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFdkQsTUFHYSwwQkFBMEI7SUFJckMsWUFDVSxVQUFzQixFQUNkLGdCQUFxRDtRQUQ3RCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQztJQUNwRSxDQUFDO0lBR0osWUFBWTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQzthQUNwRTtZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQztnQkFDcEQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzFCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUMvQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQTNCVSwwQkFBMEI7a0dBQTFCLDBCQUEwQjs7U0FBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBSHRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7OzBCQU9JLElBQUk7NENBSkUsU0FBUztzQkFBakIsS0FBSztnQkFRTixZQUFZO3NCQURYLFlBQVk7dUJBQUMsK0JBQStCLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBEaXJlY3RpdmUsXG4gIEhvc3QsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnVsbHNjcmVlbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xGdWxsc2NyZWVuXScsXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcj86IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgY29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudDxGdWxsc2NyZWVuQ29udHJvbD5cbiAgKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzp3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uRnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UucmVzaXplKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgRnVsbHNjcmVlbkNvbnRyb2woe1xuICAgICAgICBjb250YWluZXI6IHRoaXMuY29udGFpbmVyLFxuICAgICAgfSk7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkQ29udHJvbChcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5wb3NpdGlvblxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19