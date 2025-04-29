import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class CanvasSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required();
    /* Dynamic inputs */
    coordinates = input.required();
    canvas = input.required();
    animate = input();
    sourceAdded = false;
    sub = new Subscription();
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
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
        if ((changes['canvas'] && !changes['canvas'].isFirstChange()) ||
            (changes['animate'] && !changes['animate'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if (changes['coordinates'] &&
            !changes['coordinates'].isFirstChange()) {
            const source = this.mapService.getSource(this.id());
            if (source === undefined) {
                return;
            }
            source.setCoordinates(this.coordinates());
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id());
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: 'canvas',
            coordinates: this.coordinates(),
            canvas: this.canvas(),
            animate: this.animate(),
        };
        this.mapService.addSource(this.id(), source);
        this.sourceAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: CanvasSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: CanvasSourceComponent, isStandalone: true, selector: "mgl-canvas-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, coordinates: { classPropertyName: "coordinates", publicName: "coordinates", isSignal: true, isRequired: true, transformFunction: null }, canvas: { classPropertyName: "canvas", publicName: "canvas", isSignal: true, isRequired: true, transformFunction: null }, animate: { classPropertyName: "animate", publicName: "animate", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: CanvasSourceComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-canvas-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXNvdXJjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvY2FudmFzLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBS1QsTUFBTSxFQUNOLEtBQUssR0FFTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQWdCaEQsTUFBTSxPQUFPLHFCQUFxQjtJQUd4QixVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhDLGlCQUFpQjtJQUNqQixFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBVSxDQUFDO0lBRTlCLG9CQUFvQjtJQUNwQixXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBMEMsQ0FBQztJQUN2RSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBcUMsQ0FBQztJQUM3RCxPQUFPLEdBQUcsS0FBSyxFQUFzQyxDQUFDO0lBRTlDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFakMsUUFBUTtRQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztpQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNyRSxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEIsT0FBTztRQUNULENBQUM7UUFDRCxJQUNFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3pELENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQzNELENBQUM7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUM7YUFBTSxJQUNMLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDdEIsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQ3ZDLENBQUM7WUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBZSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDekIsT0FBTztZQUNULENBQUM7WUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFTyxJQUFJO1FBQ1YsTUFBTSxNQUFNLEdBQTRCO1lBQ3RDLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7U0FDeEIsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO3dHQXBFVSxxQkFBcUI7NEZBQXJCLHFCQUFxQiw2bEJBSHRCLEVBQUU7OzRGQUdELHFCQUFxQjtrQkFOakMsU0FBUzttQkFBQztvQkFDVCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgaW5qZWN0LFxuICBpbnB1dCxcbiAgdHlwZSBJbnB1dFNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgdHlwZSB7IENhbnZhc1NvdXJjZSB9IGZyb20gJ21hcGJveC1nbCc7XG5cbnR5cGUgQ2FudmFzU291cmNlU3BlY2lmaWNhdGlvbiA9IENhbnZhc1NvdXJjZVsnb3B0aW9ucyddO1xudHlwZSBDYW52YXNTb3VyY2VJbnB1dHMgPSB7XG4gIFtLIGluIGtleW9mIE9taXQ8Q2FudmFzU291cmNlU3BlY2lmaWNhdGlvbiwgJ3R5cGUnPl06IElucHV0U2lnbmFsPFxuICAgIE9taXQ8Q2FudmFzU291cmNlU3BlY2lmaWNhdGlvbiwgJ3R5cGUnPltLXVxuICA+O1xufTtcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnbWdsLWNhbnZhcy1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDYW52YXNTb3VyY2VDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBDYW52YXNTb3VyY2VJbnB1dHNcbntcbiAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gaW5qZWN0KE1hcFNlcnZpY2UpO1xuXG4gIC8qIEluaXQgaW5wdXRzICovXG4gIGlkID0gaW5wdXQucmVxdWlyZWQ8c3RyaW5nPigpO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIGNvb3JkaW5hdGVzID0gaW5wdXQucmVxdWlyZWQ8Q2FudmFzU291cmNlWydvcHRpb25zJ11bJ2Nvb3JkaW5hdGVzJ10+KCk7XG4gIGNhbnZhcyA9IGlucHV0LnJlcXVpcmVkPENhbnZhc1NvdXJjZVsnb3B0aW9ucyddWydjYW52YXMnXT4oKTtcbiAgYW5pbWF0ZSA9IGlucHV0PENhbnZhc1NvdXJjZVsnb3B0aW9ucyddWydhbmltYXRlJ10+KCk7XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBzdWIxID0gdGhpcy5tYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpXG4gICAgICAgIC5waXBlKGZpbHRlcigoKSA9PiAhdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKCkpKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIuYWRkKHN1YjEpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAoY2hhbmdlc1snY2FudmFzJ10gJiYgIWNoYW5nZXNbJ2NhbnZhcyddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydhbmltYXRlJ10gJiYgIWNoYW5nZXNbJ2FuaW1hdGUnXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGNoYW5nZXNbJ2Nvb3JkaW5hdGVzJ10gJiZcbiAgICAgICFjaGFuZ2VzWydjb29yZGluYXRlcyddLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxDYW52YXNTb3VyY2U+KHRoaXMuaWQoKSk7XG4gICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc291cmNlLnNldENvb3JkaW5hdGVzKHRoaXMuY29vcmRpbmF0ZXMoKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKCkpO1xuICAgICAgdGhpcy5zb3VyY2VBZGRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBzb3VyY2U6IENhbnZhc1NvdXJjZVsnb3B0aW9ucyddID0ge1xuICAgICAgdHlwZTogJ2NhbnZhcycsXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlcygpLFxuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcygpLFxuICAgICAgYW5pbWF0ZTogdGhpcy5hbmltYXRlKCksXG4gICAgfTtcbiAgICB0aGlzLm1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQoKSwgc291cmNlKTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIl19