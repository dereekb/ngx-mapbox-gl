import { Directive, EventEmitter, Host, Input, Output, } from '@angular/core';
import { GeolocateControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
class GeolocateControlDirective {
    constructor(mapService, controlComponent) {
        this.mapService = mapService;
        this.controlComponent = controlComponent;
        this.geolocate = new EventEmitter();
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {
                positionOptions: this.positionOptions,
                fitBoundsOptions: this.fitBoundsOptions,
                trackUserLocation: this.trackUserLocation,
                showUserLocation: this.showUserLocation,
                showUserHeading: this.showUserHeading,
            };
            Object.keys(options).forEach((key) => {
                const tkey = key;
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            this.controlComponent.control = new GeolocateControl(options);
            this.controlComponent.control.on('geolocate', (data) => {
                this.geolocate.emit(data);
            });
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GeolocateControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: GeolocateControlDirective, selector: "[mglGeolocate]", inputs: { positionOptions: "positionOptions", fitBoundsOptions: "fitBoundsOptions", trackUserLocation: "trackUserLocation", showUserLocation: "showUserLocation", showUserHeading: "showUserHeading" }, outputs: { geolocate: "geolocate" }, ngImport: i0 }); }
}
export { GeolocateControlDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: GeolocateControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglGeolocate]',
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { positionOptions: [{
                type: Input
            }], fitBoundsOptions: [{
                type: Input
            }], trackUserLocation: [{
                type: Input
            }], showUserLocation: [{
                type: Input
            }], showUserHeading: [{
                type: Input
            }], geolocate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvY29udHJvbC9nZW9sb2NhdGUtY29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osSUFBSSxFQUNKLEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFvQixnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFdkQsTUFHYSx5QkFBeUI7SUFXcEMsWUFDVSxVQUFzQixFQUNkLGdCQUFvRDtRQUQ1RCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQztRQUp0RSxjQUFTLEdBQTJCLElBQUksWUFBWSxFQUFZLENBQUM7SUFLOUQsQ0FBQztJQUVKLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO2FBQ3BFO1lBQ0QsTUFBTSxPQUFPLEdBQUc7Z0JBQ2QsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2dCQUN2QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2dCQUN6QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2dCQUN2QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7YUFDdEMsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7Z0JBQzNDLE1BQU0sSUFBSSxHQUFHLEdBQTJCLENBQUM7Z0JBQ3pDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDL0IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQWdCLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUMvQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQTVDVSx5QkFBeUI7a0dBQXpCLHlCQUF5Qjs7U0FBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBSHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7OzBCQWNJLElBQUk7NENBWEUsZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUdOLFNBQVM7c0JBRFIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpdEJvdW5kc09wdGlvbnMsIEdlb2xvY2F0ZUNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gJy4uL21hcC9tYXAudHlwZXMnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsR2VvbG9jYXRlXScsXG59KVxuZXhwb3J0IGNsYXNzIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgcG9zaXRpb25PcHRpb25zPzogUG9zaXRpb25PcHRpb25zO1xuICBASW5wdXQoKSBmaXRCb3VuZHNPcHRpb25zPzogRml0Qm91bmRzT3B0aW9ucztcbiAgQElucHV0KCkgdHJhY2tVc2VyTG9jYXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSBzaG93VXNlckxvY2F0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd1VzZXJIZWFkaW5nPzogYm9vbGVhbjtcblxuICBAT3V0cHV0KClcbiAgZ2VvbG9jYXRlOiBFdmVudEVtaXR0ZXI8UG9zaXRpb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb3NpdGlvbj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIGNvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnQ8R2VvbG9jYXRlQ29udHJvbD5cbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwb3NpdGlvbk9wdGlvbnM6IHRoaXMucG9zaXRpb25PcHRpb25zLFxuICAgICAgICBmaXRCb3VuZHNPcHRpb25zOiB0aGlzLmZpdEJvdW5kc09wdGlvbnMsXG4gICAgICAgIHRyYWNrVXNlckxvY2F0aW9uOiB0aGlzLnRyYWNrVXNlckxvY2F0aW9uLFxuICAgICAgICBzaG93VXNlckxvY2F0aW9uOiB0aGlzLnNob3dVc2VyTG9jYXRpb24sXG4gICAgICAgIHNob3dVc2VySGVhZGluZzogdGhpcy5zaG93VXNlckhlYWRpbmcsXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0ga2V5IGFzIGtleW9mIHR5cGVvZiBvcHRpb25zO1xuICAgICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgR2VvbG9jYXRlQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sLm9uKCdnZW9sb2NhdGUnLCAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmdlb2xvY2F0ZS5lbWl0KGRhdGEgYXMgUG9zaXRpb24pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkQ29udHJvbChcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5wb3NpdGlvblxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19