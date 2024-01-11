import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
class VideoSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
                .subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
        this.sub.add(sub1);
    }
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes['urls'] && !changes['urls'].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if (changes['coordinates'] &&
            !changes['coordinates'].isFirstChange()) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            source.setCoordinates(this.coordinates);
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id);
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: 'video',
            urls: this.urls,
            coordinates: this.coordinates,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: VideoSourceComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: VideoSourceComponent, selector: "mgl-video-source", inputs: { id: "id", urls: "urls", coordinates: "coordinates" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { VideoSourceComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: VideoSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-video-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { id: [{
                type: Input
            }], urls: [{
                type: Input
            }], coordinates: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tc291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL3NvdXJjZS92aWRlby1zb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssR0FLTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7QUFFaEQsTUFLYSxvQkFBb0I7SUFhL0IsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUhsQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixRQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVZLENBQUM7SUFFOUMsUUFBUTtRQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztpQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDbkUsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN2RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO2FBQU0sSUFDTCxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ3RCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUN2QztZQUNBLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFjLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3hCLE9BQU87YUFDUjtZQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVksQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRU8sSUFBSTtRQUNWLE1BQU0sTUFBTSxHQUFtQjtZQUM3QixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDOzhHQWhFVSxvQkFBb0I7a0dBQXBCLG9CQUFvQiw2SUFIckIsRUFBRTs7U0FHRCxvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFMaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7aUdBS1UsRUFBRTtzQkFBVixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlkZW9Tb3VyY2UsIFZpZGVvU291cmNlT3B0aW9ucywgVmlkZW9Tb3VyY2VSYXcgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtdmlkZW8tc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVmlkZW9Tb3VyY2VDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBWaWRlb1NvdXJjZU9wdGlvbnNcbntcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1cmxzOiBWaWRlb1NvdXJjZU9wdGlvbnNbJ3VybHMnXTtcbiAgQElucHV0KCkgY29vcmRpbmF0ZXM6IFZpZGVvU291cmNlT3B0aW9uc1snY29vcmRpbmF0ZXMnXTtcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBzdWIxID0gdGhpcy5tYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpXG4gICAgICAgIC5waXBlKGZpbHRlcigoKSA9PiAhdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIxKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1sndXJscyddICYmICFjaGFuZ2VzWyd1cmxzJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGNoYW5nZXNbJ2Nvb3JkaW5hdGVzJ10gJiZcbiAgICAgICFjaGFuZ2VzWydjb29yZGluYXRlcyddLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxWaWRlb1NvdXJjZT4odGhpcy5pZCk7XG4gICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc291cmNlLnNldENvb3JkaW5hdGVzKHRoaXMuY29vcmRpbmF0ZXMhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgICAgdGhpcy5zb3VyY2VBZGRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBzb3VyY2U6IFZpZGVvU291cmNlUmF3ID0ge1xuICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgIHVybHM6IHRoaXMudXJscyxcbiAgICAgIGNvb3JkaW5hdGVzOiB0aGlzLmNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=