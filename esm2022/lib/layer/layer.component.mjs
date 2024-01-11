import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, mapTo, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
class LayerComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.layerClick = new EventEmitter();
        this.layerDblClick = new EventEmitter();
        this.layerMouseDown = new EventEmitter();
        this.layerMouseUp = new EventEmitter();
        this.layerMouseEnter = new EventEmitter();
        this.layerMouseLeave = new EventEmitter();
        this.layerMouseMove = new EventEmitter();
        this.layerMouseOver = new EventEmitter();
        this.layerMouseOut = new EventEmitter();
        this.layerContextMenu = new EventEmitter();
        this.layerTouchStart = new EventEmitter();
        this.layerTouchEnd = new EventEmitter();
        this.layerTouchCancel = new EventEmitter();
        /**
         * @deprecated Use layerClick instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.click = new EventEmitter();
        /**
         * @deprecated Use layerDblClick instead
         */
        this.dblClick = new EventEmitter();
        /**
         * @deprecated Use layerMouseDown instead
         */
        this.mouseDown = new EventEmitter();
        /**
         * @deprecated Use layerMouseUp instead
         */
        this.mouseUp = new EventEmitter();
        /**
         * @deprecated Use layerMouseEnter instead
         */
        this.mouseEnter = new EventEmitter();
        /**
         * @deprecated Use layerMouseLeave instead
         */
        this.mouseLeave = new EventEmitter();
        /**
         * @deprecated Use layerMouseMove instead
         */
        this.mouseMove = new EventEmitter();
        /**
         * @deprecated Use layerMouseOver instead
         */
        this.mouseOver = new EventEmitter();
        /**
         * @deprecated Use layerMouseOut instead
         */
        this.mouseOut = new EventEmitter();
        /**
         * @deprecated Use layerContextMenu instead
         */
        this.contextMenu = new EventEmitter();
        /**
         * @deprecated Use layerTouchStart instead
         */
        this.touchStart = new EventEmitter();
        /**
         * @deprecated Use layerTouchEnd instead
         */
        this.touchEnd = new EventEmitter();
        /**
         * @deprecated Use layerTouchCancel instead
         */
        this.touchCancel = new EventEmitter();
        this.layerAdded = false;
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        this.sub = this.mapService.mapLoaded$
            .pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'styledata').pipe(mapTo(false), filter(() => !this.mapService.mapInstance.getLayer(this.id)), startWith(true))))
            .subscribe((bindEvents) => this.init(bindEvents));
    }
    ngOnChanges(changes) {
        if (!this.layerAdded) {
            return;
        }
        if (changes['paint'] && !changes['paint'].isFirstChange()) {
            this.mapService.setAllLayerPaintProperty(this.id, changes['paint'].currentValue);
        }
        if (changes['layout'] && !changes['layout'].isFirstChange()) {
            this.mapService.setAllLayerLayoutProperty(this.id, changes['layout'].currentValue);
        }
        if (changes['filter'] && !changes['filter'].isFirstChange()) {
            this.mapService.setLayerFilter(this.id, changes['filter'].currentValue);
        }
        if (changes['before'] && !changes['before'].isFirstChange()) {
            this.mapService.setLayerBefore(this.id, changes['before'].currentValue);
        }
        if ((changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
            (changes['maxzoom'] && !changes['maxzoom'].isFirstChange())) {
            this.mapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
        }
    }
    ngOnDestroy() {
        if (this.layerAdded) {
            this.mapService.removeLayer(this.id);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    init(bindEvents) {
        const layer = {
            layerOptions: {
                id: this.id,
                type: this.type,
                source: this.source,
                metadata: this.metadata,
                'source-layer': this.sourceLayer,
                minzoom: this.minzoom,
                maxzoom: this.maxzoom,
                filter: this.filter,
                layout: this.layout,
                paint: this.paint,
            },
            layerEvents: {
                layerClick: this.layerClick,
                layerDblClick: this.layerDblClick,
                layerMouseDown: this.layerMouseDown,
                layerMouseUp: this.layerMouseUp,
                layerMouseEnter: this.layerMouseEnter,
                layerMouseLeave: this.layerMouseLeave,
                layerMouseMove: this.layerMouseMove,
                layerMouseOver: this.layerMouseOver,
                layerMouseOut: this.layerMouseOut,
                layerContextMenu: this.layerContextMenu,
                layerTouchStart: this.layerTouchStart,
                layerTouchEnd: this.layerTouchEnd,
                layerTouchCancel: this.layerTouchCancel,
                click: this.click,
                dblClick: this.dblClick,
                mouseDown: this.mouseDown,
                mouseUp: this.mouseUp,
                mouseEnter: this.mouseEnter,
                mouseLeave: this.mouseLeave,
                mouseMove: this.mouseMove,
                mouseOver: this.mouseOver,
                mouseOut: this.mouseOut,
                contextMenu: this.contextMenu,
                touchStart: this.touchStart,
                touchEnd: this.touchEnd,
                touchCancel: this.touchCancel,
            },
        };
        this.mapService.addLayer(layer, bindEvents, this.before);
        this.layerAdded = true;
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, LayerComponent.name);
        if (this.click.observed) {
            dw('click', 'layerClick');
        }
        if (this.dblClick.observed) {
            dw('dblClick', 'layerDblClick');
        }
        if (this.mouseDown.observed) {
            dw('mouseDown', 'layerMouseDown');
        }
        if (this.mouseUp.observed) {
            dw('mouseUp', 'layerMouseUp');
        }
        if (this.mouseEnter.observed) {
            dw('mouseEnter', 'layerMouseEnter');
        }
        if (this.mouseLeave.observed) {
            dw('mouseLeave', 'layerMouseLeave');
        }
        if (this.mouseMove.observed) {
            dw('mouseMove', 'layerMouseMove');
        }
        if (this.mouseOver.observed) {
            dw('mouseOver', 'layerMouseOver');
        }
        if (this.mouseOut.observed) {
            dw('mouseOut', 'layerMouseOut');
        }
        if (this.contextMenu.observed) {
            dw('contextMenu', 'layerContextMenu');
        }
        if (this.touchStart.observed) {
            dw('touchStart', 'layerTouchStart');
        }
        if (this.touchEnd.observed) {
            dw('touchEnd', 'layerTouchEnd');
        }
        if (this.touchCancel.observed) {
            dw('touchCancel', 'layerTouchCancel');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: LayerComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: LayerComponent, selector: "mgl-layer", inputs: { id: "id", source: "source", type: "type", metadata: "metadata", sourceLayer: "sourceLayer", filter: "filter", layout: "layout", paint: "paint", before: "before", minzoom: "minzoom", maxzoom: "maxzoom" }, outputs: { layerClick: "layerClick", layerDblClick: "layerDblClick", layerMouseDown: "layerMouseDown", layerMouseUp: "layerMouseUp", layerMouseEnter: "layerMouseEnter", layerMouseLeave: "layerMouseLeave", layerMouseMove: "layerMouseMove", layerMouseOver: "layerMouseOver", layerMouseOut: "layerMouseOut", layerContextMenu: "layerContextMenu", layerTouchStart: "layerTouchStart", layerTouchEnd: "layerTouchEnd", layerTouchCancel: "layerTouchCancel", click: "click", dblClick: "dblClick", mouseDown: "mouseDown", mouseUp: "mouseUp", mouseEnter: "mouseEnter", mouseLeave: "mouseLeave", mouseMove: "mouseMove", mouseOver: "mouseOver", mouseOut: "mouseOut", contextMenu: "contextMenu", touchStart: "touchStart", touchEnd: "touchEnd", touchCancel: "touchCancel" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true }); }
}
export { LayerComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: LayerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-layer',
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { id: [{
                type: Input
            }], source: [{
                type: Input
            }], type: [{
                type: Input
            }], metadata: [{
                type: Input
            }], sourceLayer: [{
                type: Input
            }], filter: [{
                type: Input
            }], layout: [{
                type: Input
            }], paint: [{
                type: Input
            }], before: [{
                type: Input
            }], minzoom: [{
                type: Input
            }], maxzoom: [{
                type: Input
            }], layerClick: [{
                type: Output
            }], layerDblClick: [{
                type: Output
            }], layerMouseDown: [{
                type: Output
            }], layerMouseUp: [{
                type: Output
            }], layerMouseEnter: [{
                type: Output
            }], layerMouseLeave: [{
                type: Output
            }], layerMouseMove: [{
                type: Output
            }], layerMouseOver: [{
                type: Output
            }], layerMouseOut: [{
                type: Output
            }], layerContextMenu: [{
                type: Output
            }], layerTouchStart: [{
                type: Output
            }], layerTouchEnd: [{
                type: Output
            }], layerTouchCancel: [{
                type: Output
            }], click: [{
                type: Output
            }], dblClick: [{
                type: Output
            }], mouseDown: [{
                type: Output
            }], mouseUp: [{
                type: Output
            }], mouseEnter: [{
                type: Output
            }], mouseLeave: [{
                type: Output
            }], mouseMove: [{
                type: Output
            }], mouseOver: [{
                type: Output
            }], mouseOut: [{
                type: Output
            }], contextMenu: [{
                type: Output
            }], touchStart: [{
                type: Output
            }], touchEnd: [{
                type: Output
            }], touchCancel: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvbGF5ZXIvbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQUU5QyxNQUlhLGNBQWM7SUFrR3pCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFoRmhDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUNoRSxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFrQyxDQUFDO1FBQ25FLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDcEUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUNsRSxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUV6QyxDQUFDO1FBQ00sb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFFekMsQ0FBQztRQUNNLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDcEUsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUNwRSxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFrQyxDQUFDO1FBQ25FLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUUxQyxDQUFDO1FBQ00sb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFFekMsQ0FBQztRQUNNLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDbkUscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBRTFDLENBQUM7UUFDSjs7V0FFRztRQUNILDREQUE0RDtRQUNsRCxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDckU7O1dBRUc7UUFDTyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDeEU7O1dBRUc7UUFDTyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDekU7O1dBRUc7UUFDTyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDdkU7O1dBRUc7UUFDTyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDMUU7O1dBRUc7UUFDTyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDMUU7O1dBRUc7UUFDTyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDekU7O1dBRUc7UUFDTyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDekU7O1dBRUc7UUFDTyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWtDLENBQUM7UUFDeEU7O1dBRUc7UUFDTyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFrQyxDQUFDO1FBQzNFOztXQUVHO1FBQ08sZUFBVSxHQUFHLElBQUksWUFBWSxFQUFrQyxDQUFDO1FBQzFFOztXQUVHO1FBQ08sYUFBUSxHQUFHLElBQUksWUFBWSxFQUFrQyxDQUFDO1FBQ3hFOztXQUVHO1FBQ08sZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUVuRSxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBR2tCLENBQUM7SUFFOUMsUUFBUTtRQUNOLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVO2FBQ2xDLElBQUksQ0FDSCxTQUFTLENBQUMsR0FBRyxFQUFFLENBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDdEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUNaLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDNUQsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUNoQixDQUNGLENBQ0Y7YUFDQSxTQUFTLENBQUMsQ0FBQyxVQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUN0QyxJQUFJLENBQUMsRUFBRSxFQUNQLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFhLENBQy9CLENBQUM7U0FDSDtRQUNELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQ3ZDLElBQUksQ0FBQyxFQUFFLEVBQ1AsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQWEsQ0FDaEMsQ0FBQztTQUNIO1FBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBYSxDQUFDLENBQUM7U0FDMUU7UUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUMzRCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFhLENBQUMsQ0FBQztTQUMxRTtRQUNELElBQ0UsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDM0QsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsRUFDM0Q7WUFDQSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVPLElBQUksQ0FBQyxVQUFtQjtRQUM5QixNQUFNLEtBQUssR0FBZTtZQUN4QixZQUFZLEVBQUU7Z0JBQ1osRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBVztnQkFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDaEMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDbEI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7Z0JBQ2pDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDbkMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMvQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQ3JDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtnQkFDckMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNuQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ25DLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDakMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtnQkFDdkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7Z0JBQ2pDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ3ZDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzthQUM5QjtTQUNGLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU8scUJBQXFCO1FBQzNCLE1BQU0sRUFBRSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25FLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDdkIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMzQjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsRUFBRSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixFQUFFLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUM1QixFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsRUFBRSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUMzQixFQUFFLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzFCLEVBQUUsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUMxQixFQUFFLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUM3QixFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDOzhHQWxQVSxjQUFjO2tHQUFkLGNBQWMsbWhDQUZmLEVBQUU7O1NBRUQsY0FBYzsyRkFBZCxjQUFjO2tCQUoxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsRUFBRTtpQkFDYjtpR0FLVSxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUksVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUdHLGVBQWU7c0JBQXhCLE1BQU07Z0JBR0csY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUdHLGVBQWU7c0JBQXhCLE1BQU07Z0JBR0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBT0csS0FBSztzQkFBZCxNQUFNO2dCQUlHLFFBQVE7c0JBQWpCLE1BQU07Z0JBSUcsU0FBUztzQkFBbEIsTUFBTTtnQkFJRyxPQUFPO3NCQUFoQixNQUFNO2dCQUlHLFVBQVU7c0JBQW5CLE1BQU07Z0JBSUcsVUFBVTtzQkFBbkIsTUFBTTtnQkFJRyxTQUFTO3NCQUFsQixNQUFNO2dCQUlHLFNBQVM7c0JBQWxCLE1BQU07Z0JBSUcsUUFBUTtzQkFBakIsTUFBTTtnQkFJRyxXQUFXO3NCQUFwQixNQUFNO2dCQUlHLFVBQVU7c0JBQW5CLE1BQU07Z0JBSUcsUUFBUTtzQkFBakIsTUFBTTtnQkFJRyxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQW55TGF5ZXIsXG4gIEV2ZW50RGF0YSxcbiAgTGF5ZXIsXG4gIE1hcExheWVyTW91c2VFdmVudCxcbiAgTWFwTGF5ZXJUb3VjaEV2ZW50LFxufSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwVG8sIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSwgU2V0dXBMYXllciB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBMYXllckV2ZW50cyB9IGZyb20gJy4uL21hcC9tYXAudHlwZXMnO1xuaW1wb3J0IHsgZGVwcmVjYXRpb25XYXJuaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbGF5ZXInLFxuICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIExheWVyQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgTGF5ZXIsIExheWVyRXZlbnRzXG57XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBBbnlMYXllclsnaWQnXTtcbiAgQElucHV0KCkgc291cmNlPzogTGF5ZXJbJ3NvdXJjZSddO1xuICBASW5wdXQoKSB0eXBlOiBBbnlMYXllclsndHlwZSddO1xuICBASW5wdXQoKSBtZXRhZGF0YT86IExheWVyWydtZXRhZGF0YSddO1xuICBASW5wdXQoKSBzb3VyY2VMYXllcj86IExheWVyWydzb3VyY2UtbGF5ZXInXTtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBmaWx0ZXI/OiBMYXllclsnZmlsdGVyJ107XG4gIEBJbnB1dCgpIGxheW91dD86IExheWVyWydsYXlvdXQnXTtcbiAgQElucHV0KCkgcGFpbnQ/OiBMYXllclsncGFpbnQnXTtcbiAgQElucHV0KCkgYmVmb3JlPzogc3RyaW5nO1xuICBASW5wdXQoKSBtaW56b29tPzogTGF5ZXJbJ21pbnpvb20nXTtcbiAgQElucHV0KCkgbWF4em9vbT86IExheWVyWydtYXh6b29tJ107XG5cbiAgQE91dHB1dCgpIGxheWVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcExheWVyTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIGxheWVyRGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcExheWVyTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIGxheWVyTW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllck1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBsYXllck1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcExheWVyTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIGxheWVyTW91c2VFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwTGF5ZXJNb3VzZUV2ZW50ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIGxheWVyTW91c2VMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwTGF5ZXJNb3VzZUV2ZW50ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIGxheWVyTW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllck1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBsYXllck1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTGF5ZXJNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbGF5ZXJNb3VzZU91dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTGF5ZXJNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgbGF5ZXJDb250ZXh0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwTGF5ZXJNb3VzZUV2ZW50ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIGxheWVyVG91Y2hTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgTWFwTGF5ZXJUb3VjaEV2ZW50ICYgRXZlbnREYXRhXG4gID4oKTtcbiAgQE91dHB1dCgpIGxheWVyVG91Y2hFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcExheWVyVG91Y2hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIGxheWVyVG91Y2hDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1hcExheWVyVG91Y2hFdmVudCAmIEV2ZW50RGF0YVxuICA+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbGF5ZXJDbGljayBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllck1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbGF5ZXJEYmxDbGljayBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgZGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcExheWVyTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBsYXllck1vdXNlRG93biBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgbW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllck1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbGF5ZXJNb3VzZVVwIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllck1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbGF5ZXJNb3VzZUVudGVyIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllck1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbGF5ZXJNb3VzZUxlYXZlIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZUxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllck1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbGF5ZXJNb3VzZU1vdmUgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTGF5ZXJNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGxheWVyTW91c2VPdmVyIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZU92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcExheWVyTW91c2VFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBsYXllck1vdXNlT3V0IGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZU91dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTGF5ZXJNb3VzZUV2ZW50ICYgRXZlbnREYXRhPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGxheWVyQ29udGV4dE1lbnUgaW5zdGVhZFxuICAgKi9cbiAgQE91dHB1dCgpIGNvbnRleHRNZW51ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllck1vdXNlRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbGF5ZXJUb3VjaFN0YXJ0IGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSB0b3VjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBMYXllclRvdWNoRXZlbnQgJiBFdmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgbGF5ZXJUb3VjaEVuZCBpbnN0ZWFkXG4gICAqL1xuICBAT3V0cHV0KCkgdG91Y2hFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcExheWVyVG91Y2hFdmVudCAmIEV2ZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBsYXllclRvdWNoQ2FuY2VsIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSB0b3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTGF5ZXJUb3VjaEV2ZW50ICYgRXZlbnREYXRhPigpO1xuXG4gIHByaXZhdGUgbGF5ZXJBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhcm5EZXByZWNhdGVkT3V0cHV0cygpO1xuICAgIHRoaXMuc3ViID0gdGhpcy5tYXBTZXJ2aWNlLm1hcExvYWRlZCRcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICBmcm9tRXZlbnQodGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnc3R5bGVkYXRhJykucGlwZShcbiAgICAgICAgICAgIG1hcFRvKGZhbHNlKSxcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldExheWVyKHRoaXMuaWQpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aCh0cnVlKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoYmluZEV2ZW50czogYm9vbGVhbikgPT4gdGhpcy5pbml0KGJpbmRFdmVudHMpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sncGFpbnQnXSAmJiAhY2hhbmdlc1sncGFpbnQnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5zZXRBbGxMYXllclBhaW50UHJvcGVydHkoXG4gICAgICAgIHRoaXMuaWQsXG4gICAgICAgIGNoYW5nZXNbJ3BhaW50J10uY3VycmVudFZhbHVlIVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2xheW91dCddICYmICFjaGFuZ2VzWydsYXlvdXQnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5zZXRBbGxMYXllckxheW91dFByb3BlcnR5KFxuICAgICAgICB0aGlzLmlkLFxuICAgICAgICBjaGFuZ2VzWydsYXlvdXQnXS5jdXJyZW50VmFsdWUhXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZmlsdGVyJ10gJiYgIWNoYW5nZXNbJ2ZpbHRlciddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnNldExheWVyRmlsdGVyKHRoaXMuaWQsIGNoYW5nZXNbJ2ZpbHRlciddLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snYmVmb3JlJ10gJiYgIWNoYW5nZXNbJ2JlZm9yZSddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnNldExheWVyQmVmb3JlKHRoaXMuaWQsIGNoYW5nZXNbJ2JlZm9yZSddLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAoY2hhbmdlc1snbWluem9vbSddICYmICFjaGFuZ2VzWydtaW56b29tJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ21heHpvb20nXSAmJiAhY2hhbmdlc1snbWF4em9vbSddLmlzRmlyc3RDaGFuZ2UoKSlcbiAgICApIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5zZXRMYXllclpvb21SYW5nZSh0aGlzLmlkLCB0aGlzLm1pbnpvb20sIHRoaXMubWF4em9vbSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZUxheWVyKHRoaXMuaWQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdWIpIHtcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KGJpbmRFdmVudHM6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBsYXllcjogU2V0dXBMYXllciA9IHtcbiAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgdHlwZTogdGhpcy50eXBlIGFzIGFueSxcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWV0YWRhdGE6IHRoaXMubWV0YWRhdGEsXG4gICAgICAgICdzb3VyY2UtbGF5ZXInOiB0aGlzLnNvdXJjZUxheWVyLFxuICAgICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20sXG4gICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgbGF5b3V0OiB0aGlzLmxheW91dCxcbiAgICAgICAgcGFpbnQ6IHRoaXMucGFpbnQsXG4gICAgICB9LFxuICAgICAgbGF5ZXJFdmVudHM6IHtcbiAgICAgICAgbGF5ZXJDbGljazogdGhpcy5sYXllckNsaWNrLFxuICAgICAgICBsYXllckRibENsaWNrOiB0aGlzLmxheWVyRGJsQ2xpY2ssXG4gICAgICAgIGxheWVyTW91c2VEb3duOiB0aGlzLmxheWVyTW91c2VEb3duLFxuICAgICAgICBsYXllck1vdXNlVXA6IHRoaXMubGF5ZXJNb3VzZVVwLFxuICAgICAgICBsYXllck1vdXNlRW50ZXI6IHRoaXMubGF5ZXJNb3VzZUVudGVyLFxuICAgICAgICBsYXllck1vdXNlTGVhdmU6IHRoaXMubGF5ZXJNb3VzZUxlYXZlLFxuICAgICAgICBsYXllck1vdXNlTW92ZTogdGhpcy5sYXllck1vdXNlTW92ZSxcbiAgICAgICAgbGF5ZXJNb3VzZU92ZXI6IHRoaXMubGF5ZXJNb3VzZU92ZXIsXG4gICAgICAgIGxheWVyTW91c2VPdXQ6IHRoaXMubGF5ZXJNb3VzZU91dCxcbiAgICAgICAgbGF5ZXJDb250ZXh0TWVudTogdGhpcy5sYXllckNvbnRleHRNZW51LFxuICAgICAgICBsYXllclRvdWNoU3RhcnQ6IHRoaXMubGF5ZXJUb3VjaFN0YXJ0LFxuICAgICAgICBsYXllclRvdWNoRW5kOiB0aGlzLmxheWVyVG91Y2hFbmQsXG4gICAgICAgIGxheWVyVG91Y2hDYW5jZWw6IHRoaXMubGF5ZXJUb3VjaENhbmNlbCxcbiAgICAgICAgY2xpY2s6IHRoaXMuY2xpY2ssXG4gICAgICAgIGRibENsaWNrOiB0aGlzLmRibENsaWNrLFxuICAgICAgICBtb3VzZURvd246IHRoaXMubW91c2VEb3duLFxuICAgICAgICBtb3VzZVVwOiB0aGlzLm1vdXNlVXAsXG4gICAgICAgIG1vdXNlRW50ZXI6IHRoaXMubW91c2VFbnRlcixcbiAgICAgICAgbW91c2VMZWF2ZTogdGhpcy5tb3VzZUxlYXZlLFxuICAgICAgICBtb3VzZU1vdmU6IHRoaXMubW91c2VNb3ZlLFxuICAgICAgICBtb3VzZU92ZXI6IHRoaXMubW91c2VPdmVyLFxuICAgICAgICBtb3VzZU91dDogdGhpcy5tb3VzZU91dCxcbiAgICAgICAgY29udGV4dE1lbnU6IHRoaXMuY29udGV4dE1lbnUsXG4gICAgICAgIHRvdWNoU3RhcnQ6IHRoaXMudG91Y2hTdGFydCxcbiAgICAgICAgdG91Y2hFbmQ6IHRoaXMudG91Y2hFbmQsXG4gICAgICAgIHRvdWNoQ2FuY2VsOiB0aGlzLnRvdWNoQ2FuY2VsLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMubWFwU2VydmljZS5hZGRMYXllcihsYXllciwgYmluZEV2ZW50cywgdGhpcy5iZWZvcmUpO1xuICAgIHRoaXMubGF5ZXJBZGRlZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHdhcm5EZXByZWNhdGVkT3V0cHV0cygpIHtcbiAgICBjb25zdCBkdyA9IGRlcHJlY2F0aW9uV2FybmluZy5iaW5kKHVuZGVmaW5lZCwgTGF5ZXJDb21wb25lbnQubmFtZSk7XG4gICAgaWYgKHRoaXMuY2xpY2sub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdjbGljaycsICdsYXllckNsaWNrJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRibENsaWNrLm9ic2VydmVkKSB7XG4gICAgICBkdygnZGJsQ2xpY2snLCAnbGF5ZXJEYmxDbGljaycpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb3VzZURvd24ub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdtb3VzZURvd24nLCAnbGF5ZXJNb3VzZURvd24nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW91c2VVcC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ21vdXNlVXAnLCAnbGF5ZXJNb3VzZVVwJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vdXNlRW50ZXIub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdtb3VzZUVudGVyJywgJ2xheWVyTW91c2VFbnRlcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb3VzZUxlYXZlLm9ic2VydmVkKSB7XG4gICAgICBkdygnbW91c2VMZWF2ZScsICdsYXllck1vdXNlTGVhdmUnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW91c2VNb3ZlLm9ic2VydmVkKSB7XG4gICAgICBkdygnbW91c2VNb3ZlJywgJ2xheWVyTW91c2VNb3ZlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vdXNlT3Zlci5vYnNlcnZlZCkge1xuICAgICAgZHcoJ21vdXNlT3ZlcicsICdsYXllck1vdXNlT3ZlcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb3VzZU91dC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ21vdXNlT3V0JywgJ2xheWVyTW91c2VPdXQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29udGV4dE1lbnUub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdjb250ZXh0TWVudScsICdsYXllckNvbnRleHRNZW51Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvdWNoU3RhcnQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCd0b3VjaFN0YXJ0JywgJ2xheWVyVG91Y2hTdGFydCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy50b3VjaEVuZC5vYnNlcnZlZCkge1xuICAgICAgZHcoJ3RvdWNoRW5kJywgJ2xheWVyVG91Y2hFbmQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudG91Y2hDYW5jZWwub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCd0b3VjaENhbmNlbCcsICdsYXllclRvdWNoQ2FuY2VsJyk7XG4gICAgfVxuICB9XG59XG4iXX0=