import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
class PopupComponent {
    constructor(mapService) {
        this.mapService = mapService;
        this.popupClose = new EventEmitter();
        this.popupOpen = new EventEmitter();
        /**
         * @deprecated Use popupClose instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.close = new EventEmitter();
        /**
         * @deprecated Use popupOpen instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.open = new EventEmitter();
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        if ((this.lngLat && this.marker) ||
            (this.feature && this.lngLat) ||
            (this.feature && this.marker)) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if ((changes['lngLat'] && !changes['lngLat'].isFirstChange()) ||
            (changes['feature'] && !changes['feature'].isFirstChange())) {
            const newlngLat = changes['lngLat']
                ? this.lngLat
                : this.feature.geometry.coordinates;
            this.mapService.removePopupFromMap(this.popupInstance, true);
            const popupInstanceTmp = this.createPopup();
            this.mapService.addPopupToMap(popupInstanceTmp, newlngLat, this.popupInstance.isOpen());
            this.popupInstance = popupInstanceTmp;
        }
        if (changes['marker'] && !changes['marker'].isFirstChange()) {
            const previousMarker = changes['marker'].previousValue;
            if (previousMarker.markerInstance) {
                this.mapService.removePopupFromMarker(previousMarker.markerInstance);
            }
            if (this.marker && this.marker.markerInstance && this.popupInstance) {
                this.mapService.addPopupToMarker(this.marker.markerInstance, this.popupInstance);
            }
        }
        if (changes['offset'] &&
            !changes['offset'].isFirstChange() &&
            this.popupInstance) {
            this.popupInstance.setOffset(this.offset);
        }
    }
    ngAfterViewInit() {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    }
    ngOnDestroy() {
        if (this.popupInstance) {
            if (this.lngLat || this.feature) {
                this.mapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.mapService.removePopupFromMarker(this.marker.markerInstance);
            }
        }
        this.popupInstance = undefined;
    }
    createPopup() {
        return this.mapService.createPopup({
            popupOptions: {
                closeButton: this.closeButton,
                closeOnClick: this.closeOnClick,
                closeOnMove: this.closeOnMove,
                focusAfterOpen: this.focusAfterOpen,
                anchor: this.anchor,
                offset: this.offset,
                className: this.className,
                maxWidth: this.maxWidth,
            },
            popupEvents: {
                open: this.open,
                close: this.close,
                popupOpen: this.popupOpen,
                popupClose: this.popupClose,
            },
        }, this.content.nativeElement);
    }
    addPopup(popup) {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.lngLat || this.feature) {
                this.mapService.addPopupToMap(popup, this.lngLat
                    ? this.lngLat
                    : this.feature.geometry.coordinates);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.mapService.addPopupToMarker(this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, PopupComponent.name);
        if (this.close.observed) {
            dw('close', 'popupClose');
        }
        if (this.open.observed) {
            dw('open', 'popupOpen');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: PopupComponent, deps: [{ token: i1.MapService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: PopupComponent, selector: "mgl-popup", inputs: { closeButton: "closeButton", closeOnClick: "closeOnClick", closeOnMove: "closeOnMove", focusAfterOpen: "focusAfterOpen", anchor: "anchor", className: "className", maxWidth: "maxWidth", feature: "feature", lngLat: "lngLat", marker: "marker", offset: "offset" }, outputs: { popupClose: "popupClose", popupOpen: "popupOpen", close: "close", open: "open" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #content><ng-content></ng-content></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { PopupComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: PopupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-popup',
                    template: '<div #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }]; }, propDecorators: { closeButton: [{
                type: Input
            }], closeOnClick: [{
                type: Input
            }], closeOnMove: [{
                type: Input
            }], focusAfterOpen: [{
                type: Input
            }], anchor: [{
                type: Input
            }], className: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], feature: [{
                type: Input
            }], lngLat: [{
                type: Input
            }], marker: [{
                type: Input
            }], offset: [{
                type: Input
            }], popupClose: [{
                type: Output
            }], popupOpen: [{
                type: Output
            }], close: [{
                type: Output
            }], open: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvcG9wdXAvcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQUU5QyxNQUthLGNBQWM7SUFtQ3pCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFqQmhDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3RDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQy9DOztXQUVHO1FBQ0gsNERBQTREO1FBQ2xELFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzNDOztXQUVHO1FBQ0gsNERBQTREO1FBQ2xELFNBQUksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBTUcsQ0FBQztJQUU5QyxRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFDRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM1QixDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUM3QjtZQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNE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c0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG5nTGF0TGlrZSwgUG9pbnRMaWtlLCBQb3B1cCwgUG9wdXBPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVwcmVjYXRpb25XYXJuaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtcG9wdXAnLFxuICB0ZW1wbGF0ZTogJzxkaXYgI2NvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXRcbntcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSBjbG9zZUJ1dHRvbj86IFBvcHVwT3B0aW9uc1snY2xvc2VCdXR0b24nXTtcbiAgQElucHV0KCkgY2xvc2VPbkNsaWNrPzogUG9wdXBPcHRpb25zWydjbG9zZU9uQ2xpY2snXTtcbiAgQElucHV0KCkgY2xvc2VPbk1vdmU/OiBQb3B1cE9wdGlvbnNbJ2Nsb3NlT25Nb3ZlJ107XG4gIEBJbnB1dCgpIGZvY3VzQWZ0ZXJPcGVuPzogUG9wdXBPcHRpb25zWydmb2N1c0FmdGVyT3BlbiddO1xuICBASW5wdXQoKSBhbmNob3I/OiBQb3B1cE9wdGlvbnNbJ2FuY2hvciddO1xuICBASW5wdXQoKSBjbGFzc05hbWU/OiBQb3B1cE9wdGlvbnNbJ2NsYXNzTmFtZSddO1xuICBASW5wdXQoKSBtYXhXaWR0aD86IFBvcHVwT3B0aW9uc1snbWF4V2lkdGgnXTtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIEBJbnB1dCgpIGZlYXR1cmU/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD47XG4gIEBJbnB1dCgpIGxuZ0xhdD86IExuZ0xhdExpa2U7XG4gIEBJbnB1dCgpIG1hcmtlcj86IE1hcmtlckNvbXBvbmVudDtcbiAgQElucHV0KCkgb2Zmc2V0PzogbnVtYmVyIHwgUG9pbnRMaWtlIHwgeyBbYW5jaG9yOiBzdHJpbmddOiBbbnVtYmVyLCBudW1iZXJdIH07XG5cbiAgQE91dHB1dCgpIHBvcHVwQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBwb3B1cE9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgcG9wdXBDbG9zZSBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHBvcHVwT3BlbiBpbnN0ZWFkXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1uYXRpdmVcbiAgQE91dHB1dCgpIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcG9wdXBJbnN0YW5jZT86IFBvcHVwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhcm5EZXByZWNhdGVkT3V0cHV0cygpO1xuICAgIGlmIChcbiAgICAgICh0aGlzLmxuZ0xhdCAmJiB0aGlzLm1hcmtlcikgfHxcbiAgICAgICh0aGlzLmZlYXR1cmUgJiYgdGhpcy5sbmdMYXQpIHx8XG4gICAgICAodGhpcy5mZWF0dXJlICYmIHRoaXMubWFya2VyKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXJrZXIsIGxuZ0xhdCwgZmVhdHVyZSBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIChjaGFuZ2VzWydsbmdMYXQnXSAmJiAhY2hhbmdlc1snbG5nTGF0J10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2ZlYXR1cmUnXSAmJiAhY2hhbmdlc1snZmVhdHVyZSddLmlzRmlyc3RDaGFuZ2UoKSlcbiAgICApIHtcbiAgICAgIGNvbnN0IG5ld2xuZ0xhdCA9IGNoYW5nZXNbJ2xuZ0xhdCddXG4gICAgICAgID8gdGhpcy5sbmdMYXQhXG4gICAgICAgIDogKHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzISBhcyBbbnVtYmVyLCBudW1iZXJdKTtcbiAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlISwgdHJ1ZSk7XG4gICAgICBjb25zdCBwb3B1cEluc3RhbmNlVG1wID0gdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXAoXG4gICAgICAgIHBvcHVwSW5zdGFuY2VUbXAsXG4gICAgICAgIG5ld2xuZ0xhdCxcbiAgICAgICAgdGhpcy5wb3B1cEluc3RhbmNlIS5pc09wZW4oKVxuICAgICAgKTtcbiAgICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHBvcHVwSW5zdGFuY2VUbXA7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYXJrZXInXSAmJiAhY2hhbmdlc1snbWFya2VyJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjb25zdCBwcmV2aW91c01hcmtlcjogTWFya2VyQ29tcG9uZW50ID0gY2hhbmdlc1snbWFya2VyJ10ucHJldmlvdXNWYWx1ZTtcbiAgICAgIGlmIChwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFya2VyKHByZXZpb3VzTWFya2VyLm1hcmtlckluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSAmJiB0aGlzLnBvcHVwSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXJrZXIoXG4gICAgICAgICAgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UsXG4gICAgICAgICAgdGhpcy5wb3B1cEluc3RhbmNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ29mZnNldCddICYmXG4gICAgICAhY2hhbmdlc1snb2Zmc2V0J10uaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICB0aGlzLnBvcHVwSW5zdGFuY2VcbiAgICApIHtcbiAgICAgIHRoaXMucG9wdXBJbnN0YW5jZS5zZXRPZmZzZXQodGhpcy5vZmZzZXQpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgdGhpcy5hZGRQb3B1cCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucG9wdXBJbnN0YW5jZSkge1xuICAgICAgaWYgKHRoaXMubG5nTGF0IHx8IHRoaXMuZmVhdHVyZSkge1xuICAgICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFwKHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVBvcHVwKCkge1xuICAgIHJldHVybiB0aGlzLm1hcFNlcnZpY2UuY3JlYXRlUG9wdXAoXG4gICAgICB7XG4gICAgICAgIHBvcHVwT3B0aW9uczoge1xuICAgICAgICAgIGNsb3NlQnV0dG9uOiB0aGlzLmNsb3NlQnV0dG9uLFxuICAgICAgICAgIGNsb3NlT25DbGljazogdGhpcy5jbG9zZU9uQ2xpY2ssXG4gICAgICAgICAgY2xvc2VPbk1vdmU6IHRoaXMuY2xvc2VPbk1vdmUsXG4gICAgICAgICAgZm9jdXNBZnRlck9wZW46IHRoaXMuZm9jdXNBZnRlck9wZW4sXG4gICAgICAgICAgYW5jaG9yOiB0aGlzLmFuY2hvcixcbiAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0LFxuICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5jbGFzc05hbWUsXG4gICAgICAgICAgbWF4V2lkdGg6IHRoaXMubWF4V2lkdGgsXG4gICAgICAgIH0sXG4gICAgICAgIHBvcHVwRXZlbnRzOiB7XG4gICAgICAgICAgb3BlbjogdGhpcy5vcGVuLFxuICAgICAgICAgIGNsb3NlOiB0aGlzLmNsb3NlLFxuICAgICAgICAgIHBvcHVwT3BlbjogdGhpcy5wb3B1cE9wZW4sXG4gICAgICAgICAgcG9wdXBDbG9zZTogdGhpcy5wb3B1cENsb3NlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUG9wdXAocG9wdXA6IFBvcHVwKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5sbmdMYXQgfHwgdGhpcy5mZWF0dXJlKSB7XG4gICAgICAgIHRoaXMubWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKFxuICAgICAgICAgIHBvcHVwLFxuICAgICAgICAgIHRoaXMubG5nTGF0XG4gICAgICAgICAgICA/IHRoaXMubG5nTGF0XG4gICAgICAgICAgICA6ICh0aGlzLmZlYXR1cmUhLmdlb21ldHJ5IS5jb29yZGluYXRlcyEgYXMgW251bWJlciwgbnVtYmVyXSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UsIHBvcHVwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnbWdsLXBvcHVwIG5lZWQgZWl0aGVyIGxuZ0xhdC9tYXJrZXIvZmVhdHVyZSB0byBiZSBzZXQnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHdhcm5EZXByZWNhdGVkT3V0cHV0cygpIHtcbiAgICBjb25zdCBkdyA9IGRlcHJlY2F0aW9uV2FybmluZy5iaW5kKHVuZGVmaW5lZCwgUG9wdXBDb21wb25lbnQubmFtZSk7XG4gICAgaWYgKHRoaXMuY2xvc2Uub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdjbG9zZScsICdwb3B1cENsb3NlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wZW4ub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdvcGVuJywgJ3BvcHVwT3BlbicpO1xuICAgIH1cbiAgfVxufVxuIl19