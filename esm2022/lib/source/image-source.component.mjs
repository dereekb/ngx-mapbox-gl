import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class ImageSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required();
    /* Dynamic inputs */
    url = input();
    coordinates = input.required();
    sub;
    sourceId;
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
            url: this.url(),
            coordinates: changes['coordinates'] === undefined ? undefined : this.coordinates(),
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
            url: this.url(),
            coordinates: this.coordinates(),
        };
        this.mapService.addSource(this.id(), imageSource);
        this.sourceId = this.id();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ImageSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: ImageSourceComponent, isStandalone: true, selector: "mgl-image-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: false, transformFunction: null }, coordinates: { classPropertyName: "coordinates", publicName: "coordinates", isSignal: true, isRequired: true, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ImageSourceComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-image-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Utc291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUtULE1BQU0sRUFDTixLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQWVoRCxNQUFNLE9BQU8sb0JBQW9CO0lBR3ZCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsaUJBQWlCO0lBQ2pCLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFVLENBQUM7SUFFOUIsb0JBQW9CO0lBQ3BCLEdBQUcsR0FBRyxLQUFLLEVBQVUsQ0FBQztJQUN0QixXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBMkMsQ0FBQztJQUVoRSxHQUFHLENBQWU7SUFDbEIsUUFBUSxDQUFVO0lBRTFCLFFBQVE7UUFDTixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNoQyxPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFjLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN6QixPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUc7WUFDaEIsV0FBVyxFQUNULE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtTQUN4RSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDO0lBRU8sSUFBSTtRQUNWLE1BQU0sV0FBVyxHQUE2QjtZQUM1QyxJQUFJLEVBQUUsT0FBTztZQUNiLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUU7U0FDaEMsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM1QixDQUFDO3dHQXBEVSxvQkFBb0I7NEZBQXBCLG9CQUFvQixzZEFIckIsRUFBRTs7NEZBR0Qsb0JBQW9CO2tCQU5oQyxTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBpbmplY3QsXG4gIGlucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgSW1hZ2VTb3VyY2UsIEltYWdlU291cmNlU3BlY2lmaWNhdGlvbiB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHR5cGUgeyBJbnB1dFNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG50eXBlIEltYWdlU291cmNlSW5wdXRzID0ge1xuICBbSyBpbiBrZXlvZiBPbWl0PEltYWdlU291cmNlU3BlY2lmaWNhdGlvbiwgJ3R5cGUnPl06IElucHV0U2lnbmFsPFxuICAgIE9taXQ8SW1hZ2VTb3VyY2VTcGVjaWZpY2F0aW9uLCAndHlwZSc+W0tdXG4gID47XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2Utc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VTb3VyY2VDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBJbWFnZVNvdXJjZUlucHV0c1xue1xuICBwcml2YXRlIG1hcFNlcnZpY2UgPSBpbmplY3QoTWFwU2VydmljZSk7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIGlkID0gaW5wdXQucmVxdWlyZWQ8c3RyaW5nPigpO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIHVybCA9IGlucHV0PHN0cmluZz4oKTtcbiAgY29vcmRpbmF0ZXMgPSBpbnB1dC5yZXF1aXJlZDxJbWFnZVNvdXJjZVNwZWNpZmljYXRpb25bJ2Nvb3JkaW5hdGVzJ10+KCk7XG5cbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzb3VyY2VJZD86IHN0cmluZztcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YiA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmluaXQoKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuc291cmNlSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0U291cmNlPEltYWdlU291cmNlPih0aGlzLnNvdXJjZUlkKTtcbiAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc291cmNlLnVwZGF0ZUltYWdlKHtcbiAgICAgIHVybDogdGhpcy51cmwoKSEsXG4gICAgICBjb29yZGluYXRlczpcbiAgICAgICAgY2hhbmdlc1snY29vcmRpbmF0ZXMnXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogdGhpcy5jb29yZGluYXRlcygpLFxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3ViICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc291cmNlSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLnNvdXJjZUlkKTtcbiAgICAgIHRoaXMuc291cmNlSWQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIGNvbnN0IGltYWdlU291cmNlOiBJbWFnZVNvdXJjZVNwZWNpZmljYXRpb24gPSB7XG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgdXJsOiB0aGlzLnVybCgpLFxuICAgICAgY29vcmRpbmF0ZXM6IHRoaXMuY29vcmRpbmF0ZXMoKSxcbiAgICB9O1xuICAgIHRoaXMubWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCgpLCBpbWFnZVNvdXJjZSk7XG4gICAgdGhpcy5zb3VyY2VJZCA9IHRoaXMuaWQoKTtcbiAgfVxufVxuIl19