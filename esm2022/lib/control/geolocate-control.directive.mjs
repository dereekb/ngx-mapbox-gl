import { Directive, EventEmitter, Output, inject, input, } from '@angular/core';
import { GeolocateControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class GeolocateControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    positionOptions = input();
    fitBoundsOptions = input();
    trackUserLocation = input();
    showUserLocation = input();
    showUserHeading = input();
    geolocate = new EventEmitter();
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {
                positionOptions: this.positionOptions(),
                fitBoundsOptions: this.fitBoundsOptions(),
                trackUserLocation: this.trackUserLocation(),
                showUserLocation: this.showUserLocation(),
                showUserHeading: this.showUserHeading(),
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
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: GeolocateControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.13", type: GeolocateControlDirective, isStandalone: true, selector: "[mglGeolocate]", inputs: { positionOptions: { classPropertyName: "positionOptions", publicName: "positionOptions", isSignal: true, isRequired: false, transformFunction: null }, fitBoundsOptions: { classPropertyName: "fitBoundsOptions", publicName: "fitBoundsOptions", isSignal: true, isRequired: false, transformFunction: null }, trackUserLocation: { classPropertyName: "trackUserLocation", publicName: "trackUserLocation", isSignal: true, isRequired: false, transformFunction: null }, showUserLocation: { classPropertyName: "showUserLocation", publicName: "showUserLocation", isSignal: true, isRequired: false, transformFunction: null }, showUserHeading: { classPropertyName: "showUserHeading", publicName: "showUserHeading", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { geolocate: "geolocate" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: GeolocateControlDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[mglGeolocate]',
                }]
        }], propDecorators: { geolocate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvY29udHJvbC9nZW9sb2NhdGUtY29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLE1BQU0sRUFDTixLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFtQixNQUFNLFdBQVcsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBTXZELE1BQU0sT0FBTyx5QkFBeUI7SUFDNUIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxnQkFBZ0IsR0FBRyxNQUFNLENBQy9CLENBQUEsZ0JBQWtDLENBQUEsRUFDbEMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLGlCQUFpQjtJQUNqQixlQUFlLEdBQUcsS0FBSyxFQUFtQixDQUFDO0lBQzNDLGdCQUFnQixHQUFHLEtBQUssRUFBa0MsQ0FBQztJQUMzRCxpQkFBaUIsR0FBRyxLQUFLLEVBQVcsQ0FBQztJQUNyQyxnQkFBZ0IsR0FBRyxLQUFLLEVBQVcsQ0FBQztJQUNwQyxlQUFlLEdBQUcsS0FBSyxFQUFXLENBQUM7SUFHbkMsU0FBUyxHQUNQLElBQUksWUFBWSxFQUF1QixDQUFDO0lBRTFDLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUNELE1BQU0sT0FBTyxHQUFHO2dCQUNkLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN2QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDM0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRTthQUN4QyxDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtnQkFDM0MsTUFBTSxJQUFJLEdBQUcsR0FBMkIsQ0FBQztnQkFDekMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLENBQUM7b0JBQ2hDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FDakMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt3R0E5Q1UseUJBQXlCOzRGQUF6Qix5QkFBeUI7OzRGQUF6Qix5QkFBeUI7a0JBSnJDLFNBQVM7bUJBQUM7b0JBQ1QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzhCQWdCQyxTQUFTO3NCQURSLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBpbmplY3QsXG4gIGlucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb2xvY2F0ZUNvbnRyb2wsIHR5cGUgTWFwT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnW21nbEdlb2xvY2F0ZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIHByaXZhdGUgbWFwU2VydmljZSA9IGluamVjdChNYXBTZXJ2aWNlKTtcbiAgcHJpdmF0ZSBjb250cm9sQ29tcG9uZW50ID0gaW5qZWN0PENvbnRyb2xDb21wb25lbnQ8R2VvbG9jYXRlQ29udHJvbD4+KFxuICAgIENvbnRyb2xDb21wb25lbnQ8R2VvbG9jYXRlQ29udHJvbD4sXG4gICAgeyBob3N0OiB0cnVlIH0sXG4gICk7XG5cbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgcG9zaXRpb25PcHRpb25zID0gaW5wdXQ8UG9zaXRpb25PcHRpb25zPigpO1xuICBmaXRCb3VuZHNPcHRpb25zID0gaW5wdXQ8TWFwT3B0aW9uc1snZml0Qm91bmRzT3B0aW9ucyddPigpO1xuICB0cmFja1VzZXJMb2NhdGlvbiA9IGlucHV0PGJvb2xlYW4+KCk7XG4gIHNob3dVc2VyTG9jYXRpb24gPSBpbnB1dDxib29sZWFuPigpO1xuICBzaG93VXNlckhlYWRpbmcgPSBpbnB1dDxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKVxuICBnZW9sb2NhdGU6IEV2ZW50RW1pdHRlcjxHZW9sb2NhdGlvblBvc2l0aW9uPiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxHZW9sb2NhdGlvblBvc2l0aW9uPigpO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwb3NpdGlvbk9wdGlvbnM6IHRoaXMucG9zaXRpb25PcHRpb25zKCksXG4gICAgICAgIGZpdEJvdW5kc09wdGlvbnM6IHRoaXMuZml0Qm91bmRzT3B0aW9ucygpLFxuICAgICAgICB0cmFja1VzZXJMb2NhdGlvbjogdGhpcy50cmFja1VzZXJMb2NhdGlvbigpLFxuICAgICAgICBzaG93VXNlckxvY2F0aW9uOiB0aGlzLnNob3dVc2VyTG9jYXRpb24oKSxcbiAgICAgICAgc2hvd1VzZXJIZWFkaW5nOiB0aGlzLnNob3dVc2VySGVhZGluZygpLFxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IGtleSBhcyBrZXlvZiB0eXBlb2Ygb3B0aW9ucztcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IEdlb2xvY2F0ZUNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbC5vbignZ2VvbG9jYXRlJywgKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5nZW9sb2NhdGUuZW1pdChkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZENvbnRyb2woXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sLFxuICAgICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQucG9zaXRpb24oKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==