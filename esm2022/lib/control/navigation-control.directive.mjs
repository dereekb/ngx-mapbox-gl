import { Directive, Host, Input } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
import * as i2 from "./control.component";
class NavigationControlDirective {
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
            if (this.showCompass !== undefined) {
                options.showCompass = this.showCompass;
            }
            if (this.showZoom !== undefined) {
                options.showZoom = this.showZoom;
            }
            this.controlComponent.control = new NavigationControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NavigationControlDirective, deps: [{ token: i1.MapService }, { token: i2.ControlComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.4", type: NavigationControlDirective, selector: "[mglNavigation]", inputs: { showCompass: "showCompass", showZoom: "showZoom" }, ngImport: i0 }); }
}
export { NavigationControlDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: NavigationControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mglNavigation]',
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i2.ControlComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { showCompass: [{
                type: Input
            }], showZoom: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL2NvbnRyb2wvbmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFdkQsTUFHYSwwQkFBMEI7SUFLckMsWUFDVSxVQUFzQixFQUNkLGdCQUFxRDtRQUQ3RCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQztJQUNwRSxDQUFDO0lBRUosa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7YUFDcEU7WUFDRCxNQUFNLE9BQU8sR0FBa0QsRUFBRSxDQUFDO1lBQ2xFLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7Z0JBQ2xDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUN4QztZQUNELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0E1QlUsMEJBQTBCO2tHQUExQiwwQkFBMEI7O1NBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUh0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCOzswQkFRSSxJQUFJOzRDQUxFLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsTmF2aWdhdGlvbl0nLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBzaG93Q29tcGFzcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dab29tPzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIGNvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnQ8TmF2aWdhdGlvbkNvbnRyb2w+XG4gICkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uczogeyBzaG93Q29tcGFzcz86IGJvb2xlYW47IHNob3dab29tPzogYm9vbGVhbiB9ID0ge307XG4gICAgICBpZiAodGhpcy5zaG93Q29tcGFzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMuc2hvd0NvbXBhc3MgPSB0aGlzLnNob3dDb21wYXNzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2hvd1pvb20gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLnNob3dab29tID0gdGhpcy5zaG93Wm9vbTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IE5hdmlnYXRpb25Db250cm9sKG9wdGlvbnMpO1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZENvbnRyb2woXG4gICAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sLFxuICAgICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQucG9zaXRpb25cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==