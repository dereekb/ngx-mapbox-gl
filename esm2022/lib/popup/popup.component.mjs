import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild, inject, input, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class PopupComponent {
    mapService = inject(MapService);
    /* Init input */
    closeButton = input();
    closeOnClick = input();
    closeOnMove = input();
    focusAfterOpen = input();
    anchor = input();
    className = input();
    maxWidth = input();
    /* Dynamic input */
    feature = input();
    lngLat = input();
    marker = input();
    offset = input();
    popupClose = new EventEmitter();
    popupOpen = new EventEmitter();
    content;
    popupInstance;
    ngOnInit() {
        if ((this.lngLat() && this.marker()) ||
            (this.feature() && this.lngLat()) ||
            (this.feature() && this.marker())) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if ((changes['lngLat'] && !changes['lngLat'].isFirstChange()) ||
            (changes['feature'] && !changes['feature'].isFirstChange())) {
            const newlngLat = changes['lngLat']
                ? this.lngLat()
                : this.feature().geometry.coordinates;
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
            if (this.marker() &&
                this.marker().markerInstance &&
                this.popupInstance) {
                this.mapService.addPopupToMarker(this.marker().markerInstance, this.popupInstance);
            }
        }
        if (changes['offset'] &&
            !changes['offset'].isFirstChange() &&
            this.popupInstance) {
            this.popupInstance.setOffset(this.offset());
        }
    }
    ngAfterViewInit() {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    }
    ngOnDestroy() {
        if (this.popupInstance) {
            if (this.lngLat() || this.feature()) {
                this.mapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker() && this.marker().markerInstance) {
                this.mapService.removePopupFromMarker(this.marker().markerInstance);
            }
        }
        this.popupInstance = undefined;
    }
    createPopup() {
        return this.mapService.createPopup({
            popupOptions: {
                closeButton: this.closeButton(),
                closeOnClick: this.closeOnClick(),
                closeOnMove: this.closeOnMove(),
                focusAfterOpen: this.focusAfterOpen(),
                anchor: this.anchor(),
                offset: this.offset(),
                className: this.className(),
                maxWidth: this.maxWidth(),
            },
            popupEvents: {
                popupOpen: this.popupOpen,
                popupClose: this.popupClose,
            },
        }, this.content.nativeElement);
    }
    addPopup(popup) {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.lngLat() || this.feature()) {
                this.mapService.addPopupToMap(popup, this.lngLat()
                    ? this.lngLat()
                    : this.feature().geometry.coordinates);
            }
            else if (this.marker() && this.marker().markerInstance) {
                this.mapService.addPopupToMarker(this.marker().markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PopupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: PopupComponent, isStandalone: true, selector: "mgl-popup", inputs: { closeButton: { classPropertyName: "closeButton", publicName: "closeButton", isSignal: true, isRequired: false, transformFunction: null }, closeOnClick: { classPropertyName: "closeOnClick", publicName: "closeOnClick", isSignal: true, isRequired: false, transformFunction: null }, closeOnMove: { classPropertyName: "closeOnMove", publicName: "closeOnMove", isSignal: true, isRequired: false, transformFunction: null }, focusAfterOpen: { classPropertyName: "focusAfterOpen", publicName: "focusAfterOpen", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, className: { classPropertyName: "className", publicName: "className", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null }, feature: { classPropertyName: "feature", publicName: "feature", isSignal: true, isRequired: false, transformFunction: null }, lngLat: { classPropertyName: "lngLat", publicName: "lngLat", isSignal: true, isRequired: false, transformFunction: null }, marker: { classPropertyName: "marker", publicName: "marker", isSignal: true, isRequired: false, transformFunction: null }, offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { popupClose: "popupClose", popupOpen: "popupOpen" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div #content><ng-content/></div>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PopupComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-popup',
                    template: '<div #content><ng-content/></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { popupClose: [{
                type: Output
            }], popupOpen: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvcG9wdXAvcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBSVosTUFBTSxFQUVOLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFTaEQsTUFBTSxPQUFPLGNBQWM7SUFHakIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4QyxnQkFBZ0I7SUFDaEIsV0FBVyxHQUFHLEtBQUssRUFBK0IsQ0FBQztJQUNuRCxZQUFZLEdBQUcsS0FBSyxFQUFnQyxDQUFDO0lBQ3JELFdBQVcsR0FBRyxLQUFLLEVBQStCLENBQUM7SUFDbkQsY0FBYyxHQUFHLEtBQUssRUFBa0MsQ0FBQztJQUN6RCxNQUFNLEdBQUcsS0FBSyxFQUEwQixDQUFDO0lBQ3pDLFNBQVMsR0FBRyxLQUFLLEVBQTZCLENBQUM7SUFDL0MsUUFBUSxHQUFHLEtBQUssRUFBNEIsQ0FBQztJQUU3QyxtQkFBbUI7SUFDbkIsT0FBTyxHQUFHLEtBQUssRUFBa0MsQ0FBQztJQUNsRCxNQUFNLEdBQUcsS0FBSyxFQUFjLENBQUM7SUFDN0IsTUFBTSxHQUFHLEtBQUssRUFBbUIsQ0FBQztJQUNsQyxNQUFNLEdBQUcsS0FBSyxFQU1YLENBQUM7SUFFTSxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUN0QyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUVQLE9BQU8sQ0FBYTtJQUU1RCxhQUFhLENBQVM7SUFFdEIsUUFBUTtRQUNOLElBQ0UsQ0FBQyxJQUFJLENBQUMsTUFB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LENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FDM0IsS0FBSyxFQUNMLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUc7b0JBQ2hCLENBQUMsQ0FBRSxJQUFJLENBQUMsT0FBTyxFQUFHLENBQUMsUUFBUyxDQUFDLFdBQWlDLENBQ2pFLENBQUM7WUFDSixDQUFDO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFHLENBQUMsY0FBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFFLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLElBQUksS0FBSyxDQUNiLHVEQUF1RCxDQUN4RCxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt3R0E1SVUsY0FBYzs0RkFBZCxjQUFjLDByREFIZixtQ0FBbUM7OzRGQUdsQyxjQUFjO2tCQU4xQixTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLG1DQUFtQztvQkFDN0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQTJCVyxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLFNBQVM7c0JBQWxCLE1BQU07Z0JBRWlDLE9BQU87c0JBQTlDLFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIGluamVjdCxcbiAgaW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG5nTGF0TGlrZSwgUG9pbnRMaWtlLCBQb3B1cCwgUG9wdXBPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6ICdtZ2wtcG9wdXAnLFxuICB0ZW1wbGF0ZTogJzxkaXYgI2NvbnRlbnQ+PG5nLWNvbnRlbnQvPjwvZGl2PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXRcbntcbiAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gaW5qZWN0KE1hcFNlcnZpY2UpO1xuXG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgY2xvc2VCdXR0b24gPSBpbnB1dDxQb3B1cE9wdGlvbnNbJ2Nsb3NlQnV0dG9uJ10+KCk7XG4gIGNsb3NlT25DbGljayA9IGlucHV0PFBvcHVwT3B0aW9uc1snY2xvc2VPbkNsaWNrJ10+KCk7XG4gIGNsb3NlT25Nb3ZlID0gaW5wdXQ8UG9wdXBPcHRpb25zWydjbG9zZU9uTW92ZSddPigpO1xuICBmb2N1c0FmdGVyT3BlbiA9IGlucHV0PFBvcHVwT3B0aW9uc1snZm9jdXNBZnRlck9wZW4nXT4oKTtcbiAgYW5jaG9yID0gaW5wdXQ8UG9wdXBPcHRpb25zWydhbmNob3InXT4oKTtcbiAgY2xhc3NOYW1lID0gaW5wdXQ8UG9wdXBPcHRpb25zWydjbGFzc05hbWUnXT4oKTtcbiAgbWF4V2lkdGggPSBpbnB1dDxQb3B1cE9wdGlvbnNbJ21heFdpZHRoJ10+KCk7XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBmZWF0dXJlID0gaW5wdXQ8R2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+PigpO1xuICBsbmdMYXQgPSBpbnB1dDxMbmdMYXRMaWtlPigpO1xuICBtYXJrZXIgPSBpbnB1dDxNYXJrZXJDb21wb25lbnQ+KCk7XG4gIG9mZnNldCA9IGlucHV0PFxuICAgIHwgbnVtYmVyXG4gICAgfCBQb2ludExpa2VcbiAgICB8IHtcbiAgICAgICAgW2FuY2hvcjogc3RyaW5nXTogW251bWJlciwgbnVtYmVyXTtcbiAgICAgIH1cbiAgPigpO1xuXG4gIEBPdXRwdXQoKSBwb3B1cENsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcG9wdXBPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIHBvcHVwSW5zdGFuY2U/OiBQb3B1cDtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoXG4gICAgICAodGhpcy5sbmdMYXQoKSAmJiB0aGlzLm1hcmtlcigpKSB8fFxuICAgICAgKHRoaXMuZmVhdHVyZSgpICYmIHRoaXMubG5nTGF0KCkpIHx8XG4gICAgICAodGhpcy5mZWF0dXJlKCkgJiYgdGhpcy5tYXJrZXIoKSlcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWFya2VyLCBsbmdMYXQsIGZlYXR1cmUgaW5wdXQgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZScpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICAoY2hhbmdlc1snbG5nTGF0J10gJiYgIWNoYW5nZXNbJ2xuZ0xhdCddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydmZWF0dXJlJ10gJiYgIWNoYW5nZXNbJ2ZlYXR1cmUnXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICBjb25zdCBuZXdsbmdMYXQgPSBjaGFuZ2VzWydsbmdMYXQnXVxuICAgICAgICA/IHRoaXMubG5nTGF0KCkhXG4gICAgICAgIDogKHRoaXMuZmVhdHVyZSgpIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMhIGFzIFtudW1iZXIsIG51bWJlcl0pO1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcCh0aGlzLnBvcHVwSW5zdGFuY2UhLCB0cnVlKTtcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2VUbXAgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcChcbiAgICAgICAgcG9wdXBJbnN0YW5jZVRtcCxcbiAgICAgICAgbmV3bG5nTGF0LFxuICAgICAgICB0aGlzLnBvcHVwSW5zdGFuY2UhLmlzT3BlbigpLFxuICAgICAgKTtcbiAgICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHBvcHVwSW5zdGFuY2VUbXA7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYXJrZXInXSAmJiAhY2hhbmdlc1snbWFya2VyJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjb25zdCBwcmV2aW91c01hcmtlcjogTWFya2VyQ29tcG9uZW50ID0gY2hhbmdlc1snbWFya2VyJ10ucHJldmlvdXNWYWx1ZTtcbiAgICAgIGlmIChwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFya2VyKHByZXZpb3VzTWFya2VyLm1hcmtlckluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5tYXJrZXIoKSAmJlxuICAgICAgICB0aGlzLm1hcmtlcigpIS5tYXJrZXJJbnN0YW5jZSAmJlxuICAgICAgICB0aGlzLnBvcHVwSW5zdGFuY2VcbiAgICAgICkge1xuICAgICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcmtlcihcbiAgICAgICAgICB0aGlzLm1hcmtlcigpIS5tYXJrZXJJbnN0YW5jZSEsXG4gICAgICAgICAgdGhpcy5wb3B1cEluc3RhbmNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydvZmZzZXQnXSAmJlxuICAgICAgIWNoYW5nZXNbJ29mZnNldCddLmlzRmlyc3RDaGFuZ2UoKSAmJlxuICAgICAgdGhpcy5wb3B1cEluc3RhbmNlXG4gICAgKSB7XG4gICAgICB0aGlzLnBvcHVwSW5zdGFuY2Uuc2V0T2Zmc2V0KHRoaXMub2Zmc2V0KCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgdGhpcy5hZGRQb3B1cCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucG9wdXBJbnN0YW5jZSkge1xuICAgICAgaWYgKHRoaXMubG5nTGF0KCkgfHwgdGhpcy5mZWF0dXJlKCkpIHtcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlcigpICYmIHRoaXMubWFya2VyKCkhLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXJrZXIodGhpcy5tYXJrZXIoKSEubWFya2VySW5zdGFuY2UhKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3B1cEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQb3B1cCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBTZXJ2aWNlLmNyZWF0ZVBvcHVwKFxuICAgICAge1xuICAgICAgICBwb3B1cE9wdGlvbnM6IHtcbiAgICAgICAgICBjbG9zZUJ1dHRvbjogdGhpcy5jbG9zZUJ1dHRvbigpLFxuICAgICAgICAgIGNsb3NlT25DbGljazogdGhpcy5jbG9zZU9uQ2xpY2soKSxcbiAgICAgICAgICBjbG9zZU9uTW92ZTogdGhpcy5jbG9zZU9uTW92ZSgpLFxuICAgICAgICAgIGZvY3VzQWZ0ZXJPcGVuOiB0aGlzLmZvY3VzQWZ0ZXJPcGVuKCksXG4gICAgICAgICAgYW5jaG9yOiB0aGlzLmFuY2hvcigpLFxuICAgICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQoKSxcbiAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY2xhc3NOYW1lKCksXG4gICAgICAgICAgbWF4V2lkdGg6IHRoaXMubWF4V2lkdGgoKSxcbiAgICAgICAgfSxcbiAgICAgICAgcG9wdXBFdmVudHM6IHtcbiAgICAgICAgICBwb3B1cE9wZW46IHRoaXMucG9wdXBPcGVuLFxuICAgICAgICAgIHBvcHVwQ2xvc2U6IHRoaXMucG9wdXBDbG9zZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQb3B1cChwb3B1cDogUG9wdXApIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmxuZ0xhdCgpIHx8IHRoaXMuZmVhdHVyZSgpKSB7XG4gICAgICAgIHRoaXMubWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKFxuICAgICAgICAgIHBvcHVwLFxuICAgICAgICAgIHRoaXMubG5nTGF0KClcbiAgICAgICAgICAgID8gdGhpcy5sbmdMYXQoKSFcbiAgICAgICAgICAgIDogKHRoaXMuZmVhdHVyZSgpIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMhIGFzIFtudW1iZXIsIG51bWJlcl0pLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlcigpICYmIHRoaXMubWFya2VyKCkhLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKHRoaXMubWFya2VyKCkhLm1hcmtlckluc3RhbmNlISwgcG9wdXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdtZ2wtcG9wdXAgbmVlZCBlaXRoZXIgbG5nTGF0L21hcmtlci9mZWF0dXJlIHRvIGJlIHNldCcsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==