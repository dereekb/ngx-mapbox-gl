import { Directive, inject, input } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class NavigationControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    showCompass = input();
    showZoom = input();
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            const showCompass = this.showCompass();
            const showZoom = this.showZoom();
            if (showCompass !== undefined) {
                options.showCompass = showCompass;
            }
            if (showZoom !== undefined) {
                options.showZoom = showZoom;
            }
            this.controlComponent.control = new NavigationControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: NavigationControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.13", type: NavigationControlDirective, isStandalone: true, selector: "[mglNavigation]", inputs: { showCompass: { classPropertyName: "showCompass", publicName: "showCompass", isSignal: true, isRequired: false, transformFunction: null }, showZoom: { classPropertyName: "showZoom", publicName: "showZoom", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: NavigationControlDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[mglNavigation]',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL2NvbnRyb2wvbmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBTXZELE1BQU0sT0FBTywwQkFBMEI7SUFDN0IsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxnQkFBZ0IsR0FBRyxNQUFNLENBQy9CLENBQUEsZ0JBQW1DLENBQUEsRUFDbkMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLGlCQUFpQjtJQUNqQixXQUFXLEdBQUcsS0FBSyxFQUFXLENBQUM7SUFDL0IsUUFBUSxHQUFHLEtBQUssRUFBVyxDQUFDO0lBRTVCLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUNELE1BQU0sT0FBTyxHQUFrRCxFQUFFLENBQUM7WUFDbEUsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDcEMsQ0FBQztZQUNELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUMzQixPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBL0JVLDBCQUEwQjs0RkFBMUIsMEJBQTBCOzs0RkFBMUIsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsaUJBQWlCO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIERpcmVjdGl2ZSwgaW5qZWN0LCBpbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ1ttZ2xOYXZpZ2F0aW9uXScsXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIHByaXZhdGUgbWFwU2VydmljZSA9IGluamVjdChNYXBTZXJ2aWNlKTtcbiAgcHJpdmF0ZSBjb250cm9sQ29tcG9uZW50ID0gaW5qZWN0PENvbnRyb2xDb21wb25lbnQ8TmF2aWdhdGlvbkNvbnRyb2w+PihcbiAgICBDb250cm9sQ29tcG9uZW50PE5hdmlnYXRpb25Db250cm9sPixcbiAgICB7IGhvc3Q6IHRydWUgfSxcbiAgKTtcblxuICAvKiBJbml0IGlucHV0cyAqL1xuICBzaG93Q29tcGFzcyA9IGlucHV0PGJvb2xlYW4+KCk7XG4gIHNob3dab29tID0gaW5wdXQ8Ym9vbGVhbj4oKTtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uczogeyBzaG93Q29tcGFzcz86IGJvb2xlYW47IHNob3dab29tPzogYm9vbGVhbiB9ID0ge307XG4gICAgICBjb25zdCBzaG93Q29tcGFzcyA9IHRoaXMuc2hvd0NvbXBhc3MoKTtcbiAgICAgIGNvbnN0IHNob3dab29tID0gdGhpcy5zaG93Wm9vbSgpO1xuICAgICAgaWYgKHNob3dDb21wYXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy5zaG93Q29tcGFzcyA9IHNob3dDb21wYXNzO1xuICAgICAgfVxuICAgICAgaWYgKHNob3dab29tICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy5zaG93Wm9vbSA9IHNob3dab29tO1xuICAgICAgfVxuICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgTmF2aWdhdGlvbkNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkQ29udHJvbChcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5wb3NpdGlvbigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19