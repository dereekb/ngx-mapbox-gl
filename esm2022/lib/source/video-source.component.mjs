import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class VideoSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required();
    /* Dynamic inputs */
    urls = input.required();
    coordinates = input.required();
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
        if (changes['urls'] && !changes['urls'].isFirstChange()) {
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
    pause() {
        this.mapService.getSource(this.id())?.pause();
    }
    play() {
        this.mapService.getSource(this.id())?.play();
    }
    getVideo() {
        return this.mapService.getSource(this.id())?.getVideo();
    }
    init() {
        const source = {
            type: 'video',
            urls: this.urls(),
            coordinates: this.coordinates(),
        };
        this.mapService.addSource(this.id(), source);
        this.sourceAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VideoSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: VideoSourceComponent, isStandalone: true, selector: "mgl-video-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, urls: { classPropertyName: "urls", publicName: "urls", isSignal: true, isRequired: true, transformFunction: null }, coordinates: { classPropertyName: "coordinates", publicName: "coordinates", isSignal: true, isRequired: true, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VideoSourceComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-video-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tc291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL3NvdXJjZS92aWRlby1zb3VyY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUtULE1BQU0sRUFDTixLQUFLLEdBRU4sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFjaEQsTUFBTSxPQUFPLG9CQUFvQjtJQUd2QixVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhDLGlCQUFpQjtJQUNqQixFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBVSxDQUFDO0lBRTlCLG9CQUFvQjtJQUNwQixJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBb0MsQ0FBQztJQUMxRCxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBMkMsQ0FBQztJQUVoRSxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWpDLFFBQVE7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7aUJBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJ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dCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIHR5cGUgSW5wdXRTaWduYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBWaWRlb1NvdXJjZSwgVmlkZW9Tb3VyY2VTcGVjaWZpY2F0aW9uIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxudHlwZSBWaWRlb1NvdXJjZUlucHV0cyA9IHtcbiAgW0sgaW4ga2V5b2YgT21pdDxWaWRlb1NvdXJjZVNwZWNpZmljYXRpb24sICd0eXBlJz5dOiBJbnB1dFNpZ25hbDxcbiAgICBPbWl0PFZpZGVvU291cmNlU3BlY2lmaWNhdGlvbiwgJ3R5cGUnPltLXVxuICA+O1xufTtcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnbWdsLXZpZGVvLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvU291cmNlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgVmlkZW9Tb3VyY2VJbnB1dHNcbntcbiAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gaW5qZWN0KE1hcFNlcnZpY2UpO1xuXG4gIC8qIEluaXQgaW5wdXRzICovXG4gIGlkID0gaW5wdXQucmVxdWlyZWQ8c3RyaW5nPigpO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIHVybHMgPSBpbnB1dC5yZXF1aXJlZDxWaWRlb1NvdXJjZVNwZWNpZmljYXRpb25bJ3VybHMnXT4oKTtcbiAgY29vcmRpbmF0ZXMgPSBpbnB1dC5yZXF1aXJlZDxWaWRlb1NvdXJjZVNwZWNpZmljYXRpb25bJ2Nvb3JkaW5hdGVzJ10+KCk7XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBzdWIxID0gdGhpcy5tYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpXG4gICAgICAgIC5waXBlKGZpbHRlcigoKSA9PiAhdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKCkpKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIuYWRkKHN1YjEpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWyd1cmxzJ10gJiYgIWNoYW5nZXNbJ3VybHMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgY2hhbmdlc1snY29vcmRpbmF0ZXMnXSAmJlxuICAgICAgIWNoYW5nZXNbJ2Nvb3JkaW5hdGVzJ10uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0U291cmNlPFZpZGVvU291cmNlPih0aGlzLmlkKCkpO1xuICAgICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNvdXJjZS5zZXRDb29yZGluYXRlcyh0aGlzLmNvb3JkaW5hdGVzKCkhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQoKSk7XG4gICAgICB0aGlzLnNvdXJjZUFkZGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxWaWRlb1NvdXJjZT4odGhpcy5pZCgpKT8ucGF1c2UoKTtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmdldFNvdXJjZTxWaWRlb1NvdXJjZT4odGhpcy5pZCgpKT8ucGxheSgpO1xuICB9XG5cbiAgZ2V0VmlkZW8oKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8VmlkZW9Tb3VyY2U+KHRoaXMuaWQoKSk/LmdldFZpZGVvKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgY29uc3Qgc291cmNlOiBWaWRlb1NvdXJjZVNwZWNpZmljYXRpb24gPSB7XG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgdXJsczogdGhpcy51cmxzKCksXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlcygpLFxuICAgIH07XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkKCksIHNvdXJjZSk7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==