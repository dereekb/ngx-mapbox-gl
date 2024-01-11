import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
class VectorSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.type = 'vector';
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
        if ((changes['bounds'] && !changes['bounds'].isFirstChange()) ||
            (changes['scheme'] && !changes['scheme'].isFirstChange()) ||
            (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['promoteId'] && !changes['promoteId'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if ((changes['url'] && !changes['url'].isFirstChange()) ||
            (changes['tiles'] && !changes['tiles'].isFirstChange())) {
            const source = this.mapService.getSource(this.id);
            if (source === undefined) {
                return;
            }
            if (changes['url'] && this.url) {
                source.setUrl(this.url);
            }
            if (changes['tiles'] && this.tiles) {
                source.setTiles(this.tiles);
            }
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
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            bounds: this.bounds,
            scheme: this.scheme,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
            attribution: this.attribution,
            promoteId: this.promoteId,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: VectorSourceComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: VectorSourceComponent, selector: "mgl-vector-source", inputs: { id: "id", url: "url", tiles: "tiles", bounds: "bounds", scheme: "scheme", minzoom: "minzoom", maxzoom: "maxzoom", attribution: "attribution", promoteId: "promoteId" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { VectorSourceComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: VectorSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-vector-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { id: [{
                type: Input
            }], url: [{
                type: Input
            }], tiles: [{
                type: Input
            }], bounds: [{
                type: Input
            }], scheme: [{
                type: Input
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], attribution: [{
                type: Input
            }], promoteId: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLXNvdXJjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvdmVjdG9yLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxHQUtOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUVoRCxNQUthLHFCQUFxQjtJQXFCaEMsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUwxQyxTQUFJLEdBQXlCLFFBQVEsQ0FBQztRQUU5QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixRQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVZLENBQUM7SUFFOUMsUUFBUTtRQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztpQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDbkUsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENB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QUM3QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs4R0EzRlUscUJBQXFCO2tHQUFyQixxQkFBcUIsZ1FBSHRCLEVBQUU7O1NBR0QscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBTGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO2lHQUtVLEVBQUU7c0JBQVYsS0FBSztnQkFHRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZWN0b3JTb3VyY2UsIFZlY3RvclNvdXJjZUltcGwgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtdmVjdG9yLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFZlY3RvclNvdXJjZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFZlY3RvclNvdXJjZVxue1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybD86IFZlY3RvclNvdXJjZVsndXJsJ107XG4gIEBJbnB1dCgpIHRpbGVzPzogVmVjdG9yU291cmNlWyd0aWxlcyddO1xuICBASW5wdXQoKSBib3VuZHM/OiBWZWN0b3JTb3VyY2VbJ2JvdW5kcyddO1xuICBASW5wdXQoKSBzY2hlbWU/OiBWZWN0b3JTb3VyY2VbJ3NjaGVtZSddO1xuICBASW5wdXQoKSBtaW56b29tPzogVmVjdG9yU291cmNlWydtaW56b29tJ107XG4gIEBJbnB1dCgpIG1heHpvb20/OiBWZWN0b3JTb3VyY2VbJ21heHpvb20nXTtcbiAgQElucHV0KCkgYXR0cmlidXRpb24/OiBWZWN0b3JTb3VyY2VbJ2F0dHJpYnV0aW9uJ107XG4gIEBJbnB1dCgpIHByb21vdGVJZD86IFZlY3RvclNvdXJjZVsncHJvbW90ZUlkJ107XG5cbiAgdHlwZTogVmVjdG9yU291cmNlWyd0eXBlJ10gPSAndmVjdG9yJztcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBzdWIxID0gdGhpcy5tYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpXG4gICAgICAgIC5waXBlKGZpbHRlcigoKSA9PiAhdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIxKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoY2hhbmdlc1snYm91bmRzJ10gJiYgIWNoYW5nZXNbJ2JvdW5kcyddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydzY2hlbWUnXSAmJiAhY2hhbmdlc1snc2NoZW1lJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ21pbnpvb20nXSAmJiAhY2hhbmdlc1snbWluem9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydtYXh6b29tJ10gJiYgIWNoYW5nZXNbJ21heHpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYXR0cmlidXRpb24nXSAmJiAhY2hhbmdlc1snYXR0cmlidXRpb24nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1sncHJvbW90ZUlkJ10gJiYgIWNoYW5nZXNbJ3Byb21vdGVJZCddLmlzRmlyc3RDaGFuZ2UoKSlcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKGNoYW5nZXNbJ3VybCddICYmICFjaGFuZ2VzWyd1cmwnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1sndGlsZXMnXSAmJiAhY2hhbmdlc1sndGlsZXMnXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0U291cmNlPFZlY3RvclNvdXJjZUltcGw+KHRoaXMuaWQpO1xuICAgICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzWyd1cmwnXSAmJiB0aGlzLnVybCkge1xuICAgICAgICBzb3VyY2Uuc2V0VXJsKHRoaXMudXJsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZXNbJ3RpbGVzJ10gJiYgdGhpcy50aWxlcykge1xuICAgICAgICBzb3VyY2Uuc2V0VGlsZXModGhpcy50aWxlcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgY29uc3Qgc291cmNlOiBWZWN0b3JTb3VyY2UgPSB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgdGlsZXM6IHRoaXMudGlsZXMsXG4gICAgICBib3VuZHM6IHRoaXMuYm91bmRzLFxuICAgICAgc2NoZW1lOiB0aGlzLnNjaGVtZSxcbiAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgIGF0dHJpYnV0aW9uOiB0aGlzLmF0dHJpYnV0aW9uLFxuICAgICAgcHJvbW90ZUlkOiB0aGlzLnByb21vdGVJZCxcbiAgICB9O1xuICAgIHRoaXMubWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwgc291cmNlKTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIl19