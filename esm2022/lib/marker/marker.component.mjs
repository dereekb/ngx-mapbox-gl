import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MapService } from '../map/map.service';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
class MarkerComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.markerDragStart = new EventEmitter();
        this.markerDragEnd = new EventEmitter();
        this.markerDrag = new EventEmitter();
        /**
         * @deprecated Use markerDragStart instead
         */
        this.dragStart = new EventEmitter();
        /**
         * @deprecated Use markerDragEnd instead
         */
        this.dragEnd = new EventEmitter();
        /**
         * @deprecated Use markerDrag instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.drag = new EventEmitter();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        if (this.feature && this.lngLat) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if (changes['lngLat'] && !changes['lngLat'].isFirstChange()) {
            this.markerInstance.setLngLat(this.lngLat);
        }
        if (changes['feature'] && !changes['feature'].isFirstChange()) {
            this.markerInstance.setLngLat(this.feature.geometry.coordinates);
        }
        if (changes['draggable'] && !changes['draggable'].isFirstChange()) {
            this.markerInstance.setDraggable(!!this.draggable);
        }
        if (changes['popupShown'] && !changes['popupShown'].isFirstChange()) {
            changes['popupShown'].currentValue
                ? this.markerInstance.getPopup().addTo(this.mapService.mapInstance)
                : this.markerInstance.getPopup().remove();
        }
        if (changes['pitchAlignment'] &&
            !changes['pitchAlignment'].isFirstChange()) {
            this.markerInstance.setPitchAlignment(changes['pitchAlignment'].currentValue);
        }
        if (changes['rotationAlignment'] &&
            !changes['rotationAlignment'].isFirstChange()) {
            this.markerInstance.setRotationAlignment(changes['rotationAlignment'].currentValue);
        }
    }
    ngAfterViewInit() {
        this.mapService.mapCreated$.subscribe(() => {
            this.markerInstance = this.mapService.addMarker({
                markersOptions: {
                    offset: this.offset,
                    anchor: this.anchor,
                    pitchAlignment: this.pitchAlignment,
                    rotationAlignment: this.rotationAlignment,
                    draggable: !!this.draggable,
                    element: this.content.nativeElement,
                    feature: this.feature,
                    lngLat: this.lngLat,
                    clickTolerance: this.clickTolerance,
                },
                markersEvents: {
                    markerDragStart: this.markerDragStart,
                    markerDrag: this.markerDrag,
                    markerDragEnd: this.markerDragEnd,
                    dragStart: this.markerDragStart,
                    drag: this.markerDrag,
                    dragEnd: this.markerDragEnd,
                },
            });
        });
    }
    ngOnDestroy() {
        this.mapService.removeMarker(this.markerInstance);
        this.markerInstance = undefined;
    }
    togglePopup() {
        this.markerInstance.togglePopup();
    }
    updateCoordinates(coordinates) {
        this.markerInstance.setLngLat(coordinates);
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, MarkerComponent.name);
        if (this.markerDragStart.observed) {
            dw('dragStart', 'markerDragStart');
        }
        if (this.markerDragEnd.observed) {
            dw('dragEnd', 'markerDragEnd');
        }
        if (this.markerDrag.observed) {
            dw('drag', 'markerDrag');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MarkerComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: MarkerComponent, selector: "mgl-marker", inputs: { offset: "offset", anchor: "anchor", clickTolerance: "clickTolerance", feature: "feature", lngLat: "lngLat", draggable: "draggable", popupShown: "popupShown", className: "className", pitchAlignment: "pitchAlignment", rotationAlignment: "rotationAlignment" }, outputs: { markerDragStart: "markerDragStart", markerDragEnd: "markerDragEnd", markerDrag: "markerDrag", dragStart: "dragStart", dragEnd: "dragEnd", drag: "drag" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div [class]="className" #content><ng-content></ng-content></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { MarkerComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: MarkerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-marker',
                    template: '<div [class]="className" #content><ng-content></ng-content></div>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { offset: [{
                type: Input
            }], anchor: [{
                type: Input
            }], clickTolerance: [{
                type: Input
            }], feature: [{
                type: Input
            }], lngLat: [{
                type: Input
            }], draggable: [{
                type: Input
            }], popupShown: [{
                type: Input
            }], className: [{
                type: Input
            }], pitchAlignment: [{
                type: Input
            }], rotationAlignment: [{
                type: Input
            }], markerDragStart: [{
                type: Output
            }], markerDragEnd: [{
                type: Output
            }], markerDrag: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], dragEnd: [{
                type: Output
            }], drag: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL21hcmtlci9tYXJrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQUU5QyxNQU1hLGVBQWU7SUFzQzFCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFyQmhDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM3QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDM0MsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbEQ7O1dBRUc7UUFDTyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNqRDs7V0FFRztRQUNPLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQy9DOztXQUVHO1FBQ0gsNERBQTREO1FBQ2xELFNBQUksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBTUMsQ0FBQztJQUU5QyxRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUMzRCxJQUFJLENBQUMsY0FBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsY0FBZSxDQUFDLFNBQVMsQ0FDNUIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxRQUFTLENBQUMsV0FBK0IsQ0FDeEQsQ0FBQztTQUNIO1FBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLGNBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ25FLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZO2dCQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlDO1FBQ0QsSUFDRSxPQUFPLENBQUMsZ0JBQWdCLENBQUM7WUFDekIsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFDMUM7WUFDQSxJQUFJLENBQUMsY0FBZSxDQUFDLGlCQUFpQixDQUNwQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLENBQ3ZDLENBQUM7U0FDSDtRQUNELElBQ0UsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1lBQzVCLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsYUFBYSxFQUFFLEVBQzdDO1lBQ0EsSUFBSSxDQUFDLGNBQWUsQ0FBQyxvQkFBb0IsQ0FDdkMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsWUFBWSxDQUMxQyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDOUMsY0FBYyxFQUFFO29CQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7b0JBQ25DLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7b0JBQ3pDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVM7b0JBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWE7b0JBQ25DLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7aUJBQ3BDO2dCQUNELGFBQWEsRUFBRTtvQkFDYixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7b0JBQ3JDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDM0IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO29CQUNqQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWU7b0JBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhO2lCQUM1QjthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBZSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxXQUFxQjtRQUNyQyxJQUFJLENBQUMsY0FBZSxDQUFDLFNBQVMsQ0FBQyxXQUErQixDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDL0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7OEdBcElVLGVBQWU7a0dBQWYsZUFBZSwwbUJBSmhCLG1FQUFtRTs7U0FJbEUsZUFBZTsyRkFBZixlQUFlO2tCQU4zQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsbUVBQW1FO29CQUM3RSxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO2lHQUtVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFHRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUVJLGVBQWU7c0JBQXhCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQUlHLFNBQVM7c0JBQWxCLE1BQU07Z0JBSUcsT0FBTztzQkFBaEIsTUFBTTtnQkFLRyxJQUFJO3NCQUFiLE1BQU07Z0JBRWlDLE9BQU87c0JBQTlDLFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMbmdMYXRMaWtlLCBNYXJrZXIsIE1hcmtlck9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBkZXByZWNhdGlvbldhcm5pbmcgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1tYXJrZXInLFxuICB0ZW1wbGF0ZTogJzxkaXYgW2NsYXNzXT1cImNsYXNzTmFtZVwiICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdFxue1xuICAvKiBJbml0IGlucHV0ICovXG4gIEBJbnB1dCgpIG9mZnNldD86IE1hcmtlck9wdGlvbnNbJ29mZnNldCddO1xuICBASW5wdXQoKSBhbmNob3I/OiBNYXJrZXJPcHRpb25zWydhbmNob3InXTtcbiAgQElucHV0KCkgY2xpY2tUb2xlcmFuY2U/OiBNYXJrZXJPcHRpb25zWydjbGlja1RvbGVyYW5jZSddO1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcbiAgQElucHV0KCkgbG5nTGF0PzogTG5nTGF0TGlrZTtcbiAgQElucHV0KCkgZHJhZ2dhYmxlPzogTWFya2VyT3B0aW9uc1snZHJhZ2dhYmxlJ107XG4gIEBJbnB1dCgpIHBvcHVwU2hvd24/OiBib29sZWFuO1xuICBASW5wdXQoKSBjbGFzc05hbWU6IHN0cmluZztcbiAgQElucHV0KCkgcGl0Y2hBbGlnbm1lbnQ/OiBNYXJrZXJPcHRpb25zWydwaXRjaEFsaWdubWVudCddO1xuICBASW5wdXQoKSByb3RhdGlvbkFsaWdubWVudD86IE1hcmtlck9wdGlvbnNbJ3JvdGF0aW9uQWxpZ25tZW50J107XG5cbiAgQE91dHB1dCgpIG1hcmtlckRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuICBAT3V0cHV0KCkgbWFya2VyRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuICBAT3V0cHV0KCkgbWFya2VyRHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcmtlckRyYWdTdGFydCBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXJrZXI+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbWFya2VyRHJhZ0VuZCBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIG1hcmtlckRyYWcgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBkcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXJrZXI+KCk7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgbWFya2VySW5zdGFuY2U/OiBNYXJrZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2FybkRlcHJlY2F0ZWRPdXRwdXRzKCk7XG4gICAgaWYgKHRoaXMuZmVhdHVyZSAmJiB0aGlzLmxuZ0xhdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmZWF0dXJlIGFuZCBsbmdMYXQgaW5wdXQgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZScpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snbG5nTGF0J10gJiYgIWNoYW5nZXNbJ2xuZ0xhdCddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KHRoaXMubG5nTGF0ISk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydmZWF0dXJlJ10gJiYgIWNoYW5nZXNbJ2ZlYXR1cmUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdChcbiAgICAgICAgdGhpcy5mZWF0dXJlIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMgYXMgW251bWJlciwgbnVtYmVyXVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2RyYWdnYWJsZSddICYmICFjaGFuZ2VzWydkcmFnZ2FibGUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldERyYWdnYWJsZSghIXRoaXMuZHJhZ2dhYmxlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3BvcHVwU2hvd24nXSAmJiAhY2hhbmdlc1sncG9wdXBTaG93biddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgY2hhbmdlc1sncG9wdXBTaG93biddLmN1cnJlbnRWYWx1ZVxuICAgICAgICA/IHRoaXMubWFya2VySW5zdGFuY2UhLmdldFBvcHVwKCkuYWRkVG8odGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlKVxuICAgICAgICA6IHRoaXMubWFya2VySW5zdGFuY2UhLmdldFBvcHVwKCkucmVtb3ZlKCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ3BpdGNoQWxpZ25tZW50J10gJiZcbiAgICAgICFjaGFuZ2VzWydwaXRjaEFsaWdubWVudCddLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0UGl0Y2hBbGlnbm1lbnQoXG4gICAgICAgIGNoYW5nZXNbJ3BpdGNoQWxpZ25tZW50J10uY3VycmVudFZhbHVlXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydyb3RhdGlvbkFsaWdubWVudCddICYmXG4gICAgICAhY2hhbmdlc1sncm90YXRpb25BbGlnbm1lbnQnXS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldFJvdGF0aW9uQWxpZ25tZW50KFxuICAgICAgICBjaGFuZ2VzWydyb3RhdGlvbkFsaWdubWVudCddLmN1cnJlbnRWYWx1ZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdGhpcy5tYXBTZXJ2aWNlLmFkZE1hcmtlcih7XG4gICAgICAgIG1hcmtlcnNPcHRpb25zOiB7XG4gICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCxcbiAgICAgICAgICBhbmNob3I6IHRoaXMuYW5jaG9yLFxuICAgICAgICAgIHBpdGNoQWxpZ25tZW50OiB0aGlzLnBpdGNoQWxpZ25tZW50LFxuICAgICAgICAgIHJvdGF0aW9uQWxpZ25tZW50OiB0aGlzLnJvdGF0aW9uQWxpZ25tZW50LFxuICAgICAgICAgIGRyYWdnYWJsZTogISF0aGlzLmRyYWdnYWJsZSxcbiAgICAgICAgICBlbGVtZW50OiB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLmZlYXR1cmUsXG4gICAgICAgICAgbG5nTGF0OiB0aGlzLmxuZ0xhdCxcbiAgICAgICAgICBjbGlja1RvbGVyYW5jZTogdGhpcy5jbGlja1RvbGVyYW5jZSxcbiAgICAgICAgfSxcbiAgICAgICAgbWFya2Vyc0V2ZW50czoge1xuICAgICAgICAgIG1hcmtlckRyYWdTdGFydDogdGhpcy5tYXJrZXJEcmFnU3RhcnQsXG4gICAgICAgICAgbWFya2VyRHJhZzogdGhpcy5tYXJrZXJEcmFnLFxuICAgICAgICAgIG1hcmtlckRyYWdFbmQ6IHRoaXMubWFya2VyRHJhZ0VuZCxcbiAgICAgICAgICBkcmFnU3RhcnQ6IHRoaXMubWFya2VyRHJhZ1N0YXJ0LFxuICAgICAgICAgIGRyYWc6IHRoaXMubWFya2VyRHJhZyxcbiAgICAgICAgICBkcmFnRW5kOiB0aGlzLm1hcmtlckRyYWdFbmQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVNYXJrZXIodGhpcy5tYXJrZXJJbnN0YW5jZSEpO1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB0b2dnbGVQb3B1cCgpIHtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlIS50b2dnbGVQb3B1cCgpO1xuICB9XG5cbiAgdXBkYXRlQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXM6IG51bWJlcltdKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KGNvb3JkaW5hdGVzIGFzIFtudW1iZXIsIG51bWJlcl0pO1xuICB9XG5cbiAgcHJpdmF0ZSB3YXJuRGVwcmVjYXRlZE91dHB1dHMoKSB7XG4gICAgY29uc3QgZHcgPSBkZXByZWNhdGlvbldhcm5pbmcuYmluZCh1bmRlZmluZWQsIE1hcmtlckNvbXBvbmVudC5uYW1lKTtcbiAgICBpZiAodGhpcy5tYXJrZXJEcmFnU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdkcmFnU3RhcnQnLCAnbWFya2VyRHJhZ1N0YXJ0Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1hcmtlckRyYWdFbmQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdkcmFnRW5kJywgJ21hcmtlckRyYWdFbmQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFya2VyRHJhZy5vYnNlcnZlZCkge1xuICAgICAgZHcoJ2RyYWcnLCAnbWFya2VyRHJhZycpO1xuICAgIH1cbiAgfVxufVxuIl19