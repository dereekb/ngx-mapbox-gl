import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
class RasterDemSourceComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.type = 'raster-dem';
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
        if ((changes['url'] && !changes['url'].isFirstChange()) ||
            (changes['tiles'] && !changes['tiles'].isFirstChange()) ||
            (changes['bounds'] && !changes['bounds'].isFirstChange()) ||
            (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
            (changes['tileSize'] && !changes['tileSize'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['encoding'] && !changes['encoding'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
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
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
            tileSize: this.tileSize,
            attribution: this.attribution,
            encoding: this.encoding,
        };
        this.mapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: RasterDemSourceComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: RasterDemSourceComponent, selector: "mgl-raster-dem-source", inputs: { id: "id", url: "url", tiles: "tiles", bounds: "bounds", minzoom: "minzoom", maxzoom: "maxzoom", tileSize: "tileSize", attribution: "attribution", encoding: "encoding" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { RasterDemSourceComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: RasterDemSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-raster-dem-source',
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
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], tileSize: [{
                type: Input
            }], attribution: [{
                type: Input
            }], encoding: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFzdGVyLWRlbS1zb3VyY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvc291cmNlL3Jhc3Rlci1kZW0tc291cmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEdBS04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBRWhELE1BS2Esd0JBQXdCO0lBcUJuQyxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTDFDLFNBQUksR0FBNEIsWUFBWSxDQUFDO1FBRXJDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFFBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRVksQ0FBQztJQUU5QyxRQUFRO1FBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO2lCQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNuRSxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxJQUFJ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QUFHO3NCQUFYLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFzdGVyRGVtU291cmNlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXJhc3Rlci1kZW0tc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmFzdGVyRGVtU291cmNlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgUmFzdGVyRGVtU291cmNlXG57XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsPzogUmFzdGVyRGVtU291cmNlWyd1cmwnXTtcbiAgQElucHV0KCkgdGlsZXM/OiBSYXN0ZXJEZW1Tb3VyY2VbJ3RpbGVzJ107XG4gIEBJbnB1dCgpIGJvdW5kcz86IFJhc3RlckRlbVNvdXJjZVsnYm91bmRzJ107XG4gIEBJbnB1dCgpIG1pbnpvb20/OiBSYXN0ZXJEZW1Tb3VyY2VbJ21pbnpvb20nXTtcbiAgQElucHV0KCkgbWF4em9vbT86IFJhc3RlckRlbVNvdXJjZVsnbWF4em9vbSddO1xuICBASW5wdXQoKSB0aWxlU2l6ZT86IFJhc3RlckRlbVNvdXJjZVsndGlsZVNpemUnXTtcbiAgQElucHV0KCkgYXR0cmlidXRpb24/OiBSYXN0ZXJEZW1Tb3VyY2VbJ2F0dHJpYnV0aW9uJ107XG4gIEBJbnB1dCgpIGVuY29kaW5nPzogUmFzdGVyRGVtU291cmNlWydlbmNvZGluZyddO1xuXG4gIHR5cGU6IFJhc3RlckRlbVNvdXJjZVsndHlwZSddID0gJ3Jhc3Rlci1kZW0nO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHN1YjEgPSB0aGlzLm1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICBjb25zdCBzdWIgPSBmcm9tRXZlbnQodGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnc3R5bGVkYXRhJylcbiAgICAgICAgLnBpcGUoZmlsdGVyKCgpID0+ICF0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0U291cmNlKHRoaXMuaWQpKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIuYWRkKHN1YjEpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAoY2hhbmdlc1sndXJsJ10gJiYgIWNoYW5nZXNbJ3VybCddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWyd0aWxlcyddICYmICFjaGFuZ2VzWyd0aWxlcyddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydib3VuZHMnXSAmJiAhY2hhbmdlc1snYm91bmRzJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ21pbnpvb20nXSAmJiAhY2hhbmdlc1snbWluem9vbSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydtYXh6b29tJ10gJiYgIWNoYW5nZXNbJ21heHpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1sndGlsZVNpemUnXSAmJiAhY2hhbmdlc1sndGlsZVNpemUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYXR0cmlidXRpb24nXSAmJiAhY2hhbmdlc1snYXR0cmlidXRpb24nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snZW5jb2RpbmcnXSAmJiAhY2hhbmdlc1snZW5jb2RpbmcnXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgY29uc3Qgc291cmNlOiBSYXN0ZXJEZW1Tb3VyY2UgPSB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgdGlsZXM6IHRoaXMudGlsZXMsXG4gICAgICBib3VuZHM6IHRoaXMuYm91bmRzLFxuICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgdGlsZVNpemU6IHRoaXMudGlsZVNpemUsXG4gICAgICBhdHRyaWJ1dGlvbjogdGhpcy5hdHRyaWJ1dGlvbixcbiAgICAgIGVuY29kaW5nOiB0aGlzLmVuY29kaW5nLFxuICAgIH07XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=