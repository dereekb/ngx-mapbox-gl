import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
class ImageSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
    }
    ngOnInit() {
        this.sub = this.mapService.mapLoaded$.subscribe(() => this.init());
    }
    ngOnChanges(changes) {
        if (this.sourceId === undefined) {
            return;
        }
        const source = this.mapService.getSource(this.sourceId);
        if (source === undefined) {
            return;
        }
        source.updateImage({
            url: changes['url'] === undefined ? undefined : this.url,
            coordinates: changes['coordinates'] === undefined ? undefined : this.coordinates,
        });
    }
    ngOnDestroy() {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
        if (this.sourceId !== undefined) {
            this.mapService.removeSource(this.sourceId);
            this.sourceId = undefined;
        }
    }
    init() {
        const imageSource = {
            type: 'image',
            url: this.url,
            coordinates: this.coordinates,
        };
        this.mapService.addSource(this.id, imageSource);
        this.sourceId = this.id;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ImageSourceComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: ImageSourceComponent, selector: "mgl-image-source", inputs: { id: "id", url: "url", coordinates: "coordinates" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { ImageSourceComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ImageSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-image-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { id: [{
                type: Input
            }], url: [{
                type: Input
            }], coordinates: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Utc291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssR0FLTixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUVoRCxNQUthLG9CQUFvQjtJQWEvQixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUU5QyxRQUFRO1FBQ04sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFjLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNqQixHQUFHLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUN4RCxXQUFXLEVBQ1QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVztTQUN0RSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN4QjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVPLElBQUk7UUFDVixNQUFNLFdBQVcsR0FBbUI7WUFDbEMsSUFBSSxFQUFFLE9BQU87WUFDYixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUIsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzFCLENBQUM7OEdBdERVLG9CQUFvQjtrR0FBcEIsb0JBQW9CLDJJQUhyQixFQUFFOztTQUdELG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQUxoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDtpR0FLVSxFQUFFO3NCQUFWLEtBQUs7Z0JBR0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZVNvdXJjZSwgSW1hZ2VTb3VyY2VPcHRpb25zLCBJbWFnZVNvdXJjZVJhdyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2Utc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VTb3VyY2VDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBJbWFnZVNvdXJjZU9wdGlvbnNcbntcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1cmw6IEltYWdlU291cmNlT3B0aW9uc1sndXJsJ107XG4gIEBJbnB1dCgpIGNvb3JkaW5hdGVzOiBJbWFnZVNvdXJjZU9wdGlvbnNbJ2Nvb3JkaW5hdGVzJ107XG5cbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzb3VyY2VJZD86IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWIgPSB0aGlzLm1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pbml0KCkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLnNvdXJjZUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0U291cmNlPEltYWdlU291cmNlPih0aGlzLnNvdXJjZUlkKTtcbiAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc291cmNlLnVwZGF0ZUltYWdlKHtcbiAgICAgIHVybDogY2hhbmdlc1sndXJsJ10gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHRoaXMudXJsLFxuICAgICAgY29vcmRpbmF0ZXM6XG4gICAgICAgIGNoYW5nZXNbJ2Nvb3JkaW5hdGVzJ10gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHRoaXMuY29vcmRpbmF0ZXMsXG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zb3VyY2VJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuc291cmNlSWQpO1xuICAgICAgdGhpcy5zb3VyY2VJZCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgY29uc3QgaW1hZ2VTb3VyY2U6IEltYWdlU291cmNlUmF3ID0ge1xuICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHRoaXMubWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwgaW1hZ2VTb3VyY2UpO1xuICAgIHRoaXMuc291cmNlSWQgPSB0aGlzLmlkO1xuICB9XG59XG4iXX0=