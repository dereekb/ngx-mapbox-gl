import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class VectorSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required();
    /* Dynamic inputs */
    url = input();
    tiles = input();
    bounds = input();
    scheme = input();
    minzoom = input();
    maxzoom = input();
    attribution = input();
    promoteId = input();
    volatile = input();
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
        if ((changes['bounds'] && !changes['bounds'].isFirstChange()) ||
            (changes['scheme'] && !changes['scheme'].isFirstChange()) ||
            (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['promoteId'] && !changes['promoteId'].isFirstChange()) ||
            (changes['volatile'] && !changes['volatile'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if ((changes['url'] && !changes['url'].isFirstChange()) ||
            (changes['tiles'] && !changes['tiles'].isFirstChange())) {
            const source = this.mapService.getSource(this.id());
            if (source === undefined) {
                return;
            }
            if (changes['url'] && this.url()) {
                source.setUrl(this.url());
            }
            if (changes['tiles'] && this.tiles()) {
                source.setTiles(this.tiles());
            }
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id());
            this.sourceAdded = false;
        }
    }
    reload() {
        this.mapService.getSource(this.id())?.reload();
    }
    init() {
        const source = {
            type: 'vector',
            url: this.url(),
            tiles: this.tiles(),
            bounds: this.bounds(),
            scheme: this.scheme(),
            minzoom: this.minzoom(),
            maxzoom: this.maxzoom(),
            attribution: this.attribution(),
            promoteId: this.promoteId(),
            volatile: this.volatile(),
        };
        this.mapService.addSource(this.id(), source);
        this.sourceAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VectorSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: VectorSourceComponent, isStandalone: true, selector: "mgl-vector-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: false, transformFunction: null }, tiles: { classPropertyName: "tiles", publicName: "tiles", isSignal: true, isRequired: false, transformFunction: null }, bounds: { classPropertyName: "bounds", publicName: "bounds", isSignal: true, isRequired: false, transformFunction: null }, scheme: { classPropertyName: "scheme", publicName: "scheme", isSignal: true, isRequired: false, transformFunction: null }, minzoom: { classPropertyName: "minzoom", publicName: "minzoom", isSignal: true, isRequired: false, transformFunction: null }, maxzoom: { classPropertyName: "maxzoom", publicName: "maxzoom", isSignal: true, isRequired: false, transformFunction: null }, attribution: { classPropertyName: "attribution", publicName: "attribution", isSignal: true, isRequired: false, transformFunction: null }, promoteId: { classPropertyName: "promoteId", publicName: "promoteId", isSignal: true, isRequired: false, transformFunction: null }, volatile: { classPropertyName: "volatile", publicName: "volatile", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VectorSourceComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-vector-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLXNvdXJjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvdmVjdG9yLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBS1QsTUFBTSxFQUNOLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQVFoRCxNQUFNLE9BQU8scUJBQXFCO0lBQ3hCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEMsaUJBQWlCO0lBQ2pCLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFVLENBQUM7SUFFOUIsb0JBQW9CO0lBQ3BCLEdBQUcsR0FBRyxLQUFLLEVBQW9DLENBQUM7SUFDaEQsS0FBSyxHQUFHLEtBQUssRUFBc0MsQ0FBQztJQUNwRCxNQUFNLEdBQUcsS0FBSyxFQUF1QyxDQUFDO0lBQ3RELE1BQU0sR0FBRyxLQUFLLEVBQXVDLENBQUM7SUFDdEQsT0FBTyxHQUFHLEtBQUssRUFBd0MsQ0FBQztJQUN4RCxPQUFPLEdBQUcsS0FBSyxFQUF3QyxDQUFDO0lBQ3hELFdBQVcsR0FBRyxLQUFLLEVBQTRDLENBQUM7SUFDaEUsU0FBUyxHQUFHLEtBQUssRUFBMEMsQ0FBQztJQUM1RCxRQUFRLEdBQUcsS0FBSyxFQUF5QyxDQUFDO0lBRWxELFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFakMsUUFBUTtRQUNOLE1BQU0sSUFBSSxH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QkFOakMsU0FBUzttQkFBQztvQkFDVCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgaW5qZWN0LFxuICBpbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFZlY3RvclNvdXJjZVNwZWNpZmljYXRpb24sIFZlY3RvclRpbGVTb3VyY2UgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6ICdtZ2wtdmVjdG9yLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFZlY3RvclNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBwcml2YXRlIG1hcFNlcnZpY2UgPSBpbmplY3QoTWFwU2VydmljZSk7XG5cbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgaWQgPSBpbnB1dC5yZXF1aXJlZDxzdHJpbmc+KCk7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgdXJsID0gaW5wdXQ8VmVjdG9yU291cmNlU3BlY2lmaWNhdGlvblsndXJsJ10+KCk7XG4gIHRpbGVzID0gaW5wdXQ8VmVjdG9yU291cmNlU3BlY2lmaWNhdGlvblsndGlsZXMnXT4oKTtcbiAgYm91bmRzID0gaW5wdXQ8VmVjdG9yU291cmNlU3BlY2lmaWNhdGlvblsnYm91bmRzJ10+KCk7XG4gIHNjaGVtZSA9IGlucHV0PFZlY3RvclNvdXJjZVNwZWNpZmljYXRpb25bJ3NjaGVtZSddPigpO1xuICBtaW56b29tID0gaW5wdXQ8VmVjdG9yU291cmNlU3BlY2lmaWNhdGlvblsnbWluem9vbSddPigpO1xuICBtYXh6b29tID0gaW5wdXQ8VmVjdG9yU291cmNlU3BlY2lmaWNhdGlvblsnbWF4em9vbSddPigpO1xuICBhdHRyaWJ1dGlvbiA9IGlucHV0PFZlY3RvclNvdXJjZVNwZWNpZmljYXRpb25bJ2F0dHJpYnV0aW9uJ10+KCk7XG4gIHByb21vdGVJZCA9IGlucHV0PFZlY3RvclNvdXJjZVNwZWNpZmljYXRpb25bJ3Byb21vdGVJZCddPigpO1xuICB2b2xhdGlsZSA9IGlucHV0PFZlY3RvclNvdXJjZVNwZWNpZmljYXRpb25bJ3ZvbGF0aWxlJ10+KCk7XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBzdWIxID0gdGhpcy5tYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpXG4gICAgICAgIC5waXBlKGZpbHRlcigoKSA9PiAhdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKCkpKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIuYWRkKHN1YjEpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChjaGFuZ2VzWydib3VuZHMnXSAmJiAhY2hhbmdlc1snYm91bmRzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ3NjaGVtZSddICYmICFjaGFuZ2VzWydzY2hlbWUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snbWluem9vbSddICYmICFjaGFuZ2VzWydtaW56b29tJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ21heHpvb20nXSAmJiAhY2hhbmdlc1snbWF4em9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydhdHRyaWJ1dGlvbiddICYmICFjaGFuZ2VzWydhdHRyaWJ1dGlvbiddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydwcm9tb3RlSWQnXSAmJiAhY2hhbmdlc1sncHJvbW90ZUlkJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ3ZvbGF0aWxlJ10gJiYgIWNoYW5nZXNbJ3ZvbGF0aWxlJ10uaXNGaXJzdENoYW5nZSgpKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoY2hhbmdlc1sndXJsJ10gJiYgIWNoYW5nZXNbJ3VybCddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWyd0aWxlcyddICYmICFjaGFuZ2VzWyd0aWxlcyddLmlzRmlyc3RDaGFuZ2UoKSlcbiAgICApIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8VmVjdG9yVGlsZVNvdXJjZT4odGhpcy5pZCgpKTtcbiAgICAgIGlmIChzb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlc1sndXJsJ10gJiYgdGhpcy51cmwoKSkge1xuICAgICAgICBzb3VyY2Uuc2V0VXJsKHRoaXMudXJsKCkhKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZXNbJ3RpbGVzJ10gJiYgdGhpcy50aWxlcygpKSB7XG4gICAgICAgIHNvdXJjZS5zZXRUaWxlcyh0aGlzLnRpbGVzKCkhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQoKSk7XG4gICAgICB0aGlzLnNvdXJjZUFkZGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmVsb2FkKCkge1xuICAgIHRoaXMubWFwU2VydmljZS5nZXRTb3VyY2U8VmVjdG9yVGlsZVNvdXJjZT4odGhpcy5pZCgpKT8ucmVsb2FkKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgY29uc3Qgc291cmNlOiBWZWN0b3JTb3VyY2VTcGVjaWZpY2F0aW9uID0ge1xuICAgICAgdHlwZTogJ3ZlY3RvcicsXG4gICAgICB1cmw6IHRoaXMudXJsKCksXG4gICAgICB0aWxlczogdGhpcy50aWxlcygpLFxuICAgICAgYm91bmRzOiB0aGlzLmJvdW5kcygpLFxuICAgICAgc2NoZW1lOiB0aGlzLnNjaGVtZSgpLFxuICAgICAgbWluem9vbTogdGhpcy5taW56b29tKCksXG4gICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20oKSxcbiAgICAgIGF0dHJpYnV0aW9uOiB0aGlzLmF0dHJpYnV0aW9uKCksXG4gICAgICBwcm9tb3RlSWQ6IHRoaXMucHJvbW90ZUlkKCksXG4gICAgICB2b2xhdGlsZTogdGhpcy52b2xhdGlsZSgpLFxuICAgIH07XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkKCksIHNvdXJjZSk7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==