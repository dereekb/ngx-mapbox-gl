import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewEncapsulation, inject, input, viewChild, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class MarkerComponent {
    mapService = inject(MapService);
    /* Init input */
    offset = input();
    anchor = input();
    clickTolerance = input();
    /* Dynamic input */
    feature = input();
    lngLat = input();
    draggable = input();
    popupShown = input();
    className = input();
    zIndex = input();
    pitchAlignment = input();
    rotationAlignment = input();
    markerDragStart = new EventEmitter();
    markerDragEnd = new EventEmitter();
    markerDrag = new EventEmitter();
    content = viewChild('content', { read: ElementRef });
    markerInstance;
    ngOnInit() {
        if (this.feature() && this.lngLat()) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    }
    ngOnChanges(changes) {
        if (changes['lngLat'] && !changes['lngLat'].isFirstChange()) {
            this.markerInstance.setLngLat(this.lngLat());
        }
        if (changes['feature'] && !changes['feature'].isFirstChange()) {
            this.markerInstance.setLngLat(this.feature().geometry.coordinates);
        }
        if (changes['draggable'] && !changes['draggable'].isFirstChange()) {
            this.markerInstance.setDraggable(!!this.draggable());
        }
        if (changes['popupShown'] && !changes['popupShown'].isFirstChange()) {
            changes['popupShown'].currentValue
                ? this.markerInstance.getPopup()?.addTo(this.mapService.mapInstance)
                : this.markerInstance.getPopup()?.remove();
        }
        if (changes['pitchAlignment'] &&
            !changes['pitchAlignment'].isFirstChange()) {
            this.markerInstance.setPitchAlignment(changes['pitchAlignment'].currentValue);
        }
        if (changes['rotationAlignment'] &&
            !changes['rotationAlignment'].isFirstChange()) {
            this.markerInstance.setRotationAlignment(changes['rotationAlignment'].currentValue);
        }
    }
    ngAfterViewInit() {
        this.mapService.mapCreated$.subscribe(() => {
            this.markerInstance = this.mapService.addMarker({
                markersOptions: {
                    offset: this.offset(),
                    anchor: this.anchor(),
                    pitchAlignment: this.pitchAlignment(),
                    rotationAlignment: this.rotationAlignment(),
                    draggable: this.draggable(),
                    element: this.content()?.nativeElement,
                    feature: this.feature(),
                    lngLat: this.lngLat(),
                    clickTolerance: this.clickTolerance(),
                },
                markersEvents: {
                    markerDragStart: this.markerDragStart,
                    markerDrag: this.markerDrag,
                    markerDragEnd: this.markerDragEnd,
                },
            });
        });
    }
    ngOnDestroy() {
        this.mapService.removeMarker(this.markerInstance);
        this.markerInstance = undefined;
    }
    togglePopup() {
        this.markerInstance.togglePopup();
    }
    updateCoordinates(coordinates) {
        this.markerInstance.setLngLat(coordinates);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MarkerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "18.2.13", type: MarkerComponent, isStandalone: true, selector: "mgl-marker", inputs: { offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, clickTolerance: { classPropertyName: "clickTolerance", publicName: "clickTolerance", isSignal: true, isRequired: false, transformFunction: null }, feature: { classPropertyName: "feature", publicName: "feature", isSignal: true, isRequired: false, transformFunction: null }, lngLat: { classPropertyName: "lngLat", publicName: "lngLat", isSignal: true, isRequired: false, transformFunction: null }, draggable: { classPropertyName: "draggable", publicName: "draggable", isSignal: true, isRequired: false, transformFunction: null }, popupShown: { classPropertyName: "popupShown", publicName: "popupShown", isSignal: true, isRequired: false, transformFunction: null }, className: { classPropertyName: "className", publicName: "className", isSignal: true, isRequired: false, transformFunction: null }, zIndex: { classPropertyName: "zIndex", publicName: "zIndex", isSignal: true, isRequired: false, transformFunction: null }, pitchAlignment: { classPropertyName: "pitchAlignment", publicName: "pitchAlignment", isSignal: true, isRequired: false, transformFunction: null }, rotationAlignment: { classPropertyName: "rotationAlignment", publicName: "rotationAlignment", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { markerDragStart: "markerDragStart", markerDragEnd: "markerDragEnd", markerDrag: "markerDrag" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, read: ElementRef, isSignal: true }], usesOnChanges: true, ngImport: i0, template: `
    <div [class]="className()" [style.z-index]="zIndex()" #content>
      <ng-content />
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MarkerComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-marker',
                    template: `
    <div [class]="className()" [style.z-index]="zIndex()" #content>
      <ng-content />
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { markerDragStart: [{
                type: Output
            }], markerDragEnd: [{
                type: Output
            }], markerDrag: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1hcGJveC1nbC9zcmMvbGliL21hcmtlci9tYXJrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBSVosTUFBTSxFQUdOLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBYWhELE1BQU0sT0FBTyxlQUFlO0lBRWxCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEMsZ0JBQWdCO0lBQ2hCLE1BQU0sR0FBRyxLQUFLLEVBQTJCLENBQUM7SUFDMUMsTUFBTSxHQUFHLEtBQUssRUFBMkIsQ0FBQztJQUMxQyxjQUFjLEdBQUcsS0FBSyxFQUFtQyxDQUFDO0lBRTFELG1CQUFtQjtJQUNuQixPQUFPLEdBQUcsS0FBSyxFQUFrQyxDQUFDO0lBQ2xELE1BQU0sR0FBRyxLQUFLLEVBQWMsQ0FBQztJQUM3QixTQUFTLEdBQUcsS0FBSyxFQUE4QixDQUFDO0lBQ2hELFVBQVUsR0FBRyxLQUFLLEVBQVcsQ0FBQztJQUM5QixTQUFTLEdBQUcsS0FBSyxFQUFVLENBQUM7SUFDNUIsTUFBTSxHQUFHLEtBQUssRUFBVSxDQUFDO0lBQ3pCLGNBQWMsR0FBRyxLQUFLLEVBQW1DLENBQUM7SUFDMUQsaUJBQWlCLEdBQUcsS0FBSyxFQUFzQyxDQUFDO0lBRXRELGVBQWUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBQzdDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBQzNDLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRXpDLE9BQU8sR0FBRyxT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LEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO2lCQUN0QztnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO29CQUNyQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7b0JBQzNCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtpQkFDbEM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsV0FBcUI7UUFDckMsSUFBSSxDQUFDLGNBQWUsQ0FBQyxTQUFTLENBQUMsV0FBK0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7d0dBdEdVLGVBQWU7NEZBQWYsZUFBZSx1c0RBdUIwQyxVQUFVLGtFQS9CcEU7Ozs7R0FJVDs7NEZBSVUsZUFBZTtrQkFYM0IsU0FBUzttQkFBQztvQkFDVCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRTs7OztHQUlUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBb0JXLGVBQWU7c0JBQXhCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIHZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IExuZ0xhdExpa2UsIE1hcmtlciwgTWFya2VyT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY2xhc3NOYW1lKClcIiBbc3R5bGUuei1pbmRleF09XCJ6SW5kZXgoKVwiICNjb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQgLz5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuICBwcml2YXRlIG1hcFNlcnZpY2UgPSBpbmplY3QoTWFwU2VydmljZSk7XG5cbiAgLyogSW5pdCBpbnB1dCAqL1xuICBvZmZzZXQgPSBpbnB1dDxNYXJrZXJPcHRpb25zWydvZmZzZXQnXT4oKTtcbiAgYW5jaG9yID0gaW5wdXQ8TWFya2VyT3B0aW9uc1snYW5jaG9yJ10+KCk7XG4gIGNsaWNrVG9sZXJhbmNlID0gaW5wdXQ8TWFya2VyT3B0aW9uc1snY2xpY2tUb2xlcmFuY2UnXT4oKTtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIGZlYXR1cmUgPSBpbnB1dDxHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD4+KCk7XG4gIGxuZ0xhdCA9IGlucHV0PExuZ0xhdExpa2U+KCk7XG4gIGRyYWdnYWJsZSA9IGlucHV0PE1hcmtlck9wdGlvbnNbJ2RyYWdnYWJsZSddPigpO1xuICBwb3B1cFNob3duID0gaW5wdXQ8Ym9vbGVhbj4oKTtcbiAgY2xhc3NOYW1lID0gaW5wdXQ8c3RyaW5nPigpO1xuICB6SW5kZXggPSBpbnB1dDxudW1iZXI+KCk7XG4gIHBpdGNoQWxpZ25tZW50ID0gaW5wdXQ8TWFya2VyT3B0aW9uc1sncGl0Y2hBbGlnbm1lbnQnXT4oKTtcbiAgcm90YXRpb25BbGlnbm1lbnQgPSBpbnB1dDxNYXJrZXJPcHRpb25zWydyb3RhdGlvbkFsaWdubWVudCddPigpO1xuXG4gIEBPdXRwdXQoKSBtYXJrZXJEcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcbiAgQE91dHB1dCgpIG1hcmtlckRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcbiAgQE91dHB1dCgpIG1hcmtlckRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcblxuICByZWFkb25seSBjb250ZW50ID0gdmlld0NoaWxkPHN0cmluZywgRWxlbWVudFJlZj4oJ2NvbnRlbnQnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSk7XG5cbiAgbWFya2VySW5zdGFuY2U/OiBNYXJrZXI7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZmVhdHVyZSgpICYmIHRoaXMubG5nTGF0KCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZmVhdHVyZSBhbmQgbG5nTGF0IGlucHV0IGFyZSBtdXR1YWxseSBleGNsdXNpdmUnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2xuZ0xhdCddICYmICFjaGFuZ2VzWydsbmdMYXQnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdCh0aGlzLmxuZ0xhdCgpISk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydmZWF0dXJlJ10gJiYgIWNoYW5nZXNbJ2ZlYXR1cmUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdChcbiAgICAgICAgdGhpcy5mZWF0dXJlKCkhLmdlb21ldHJ5IS5jb29yZGluYXRlcyBhcyBbbnVtYmVyLCBudW1iZXJdLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2RyYWdnYWJsZSddICYmICFjaGFuZ2VzWydkcmFnZ2FibGUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldERyYWdnYWJsZSghIXRoaXMuZHJhZ2dhYmxlKCkpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sncG9wdXBTaG93biddICYmICFjaGFuZ2VzWydwb3B1cFNob3duJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjaGFuZ2VzWydwb3B1cFNob3duJ10uY3VycmVudFZhbHVlXG4gICAgICAgID8gdGhpcy5tYXJrZXJJbnN0YW5jZSEuZ2V0UG9wdXAoKT8uYWRkVG8odGhpcy5tYXBTZXJ2aWNlLm1hcEluc3RhbmNlKVxuICAgICAgICA6IHRoaXMubWFya2VySW5zdGFuY2UhLmdldFBvcHVwKCk/LnJlbW92ZSgpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydwaXRjaEFsaWdubWVudCddICYmXG4gICAgICAhY2hhbmdlc1sncGl0Y2hBbGlnbm1lbnQnXS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldFBpdGNoQWxpZ25tZW50KFxuICAgICAgICBjaGFuZ2VzWydwaXRjaEFsaWdubWVudCddLmN1cnJlbnRWYWx1ZSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ3JvdGF0aW9uQWxpZ25tZW50J10gJiZcbiAgICAgICFjaGFuZ2VzWydyb3RhdGlvbkFsaWdubWVudCddLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0Um90YXRpb25BbGlnbm1lbnQoXG4gICAgICAgIGNoYW5nZXNbJ3JvdGF0aW9uQWxpZ25tZW50J10uY3VycmVudFZhbHVlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5tYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdGhpcy5tYXBTZXJ2aWNlLmFkZE1hcmtlcih7XG4gICAgICAgIG1hcmtlcnNPcHRpb25zOiB7XG4gICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCgpLFxuICAgICAgICAgIGFuY2hvcjogdGhpcy5hbmNob3IoKSxcbiAgICAgICAgICBwaXRjaEFsaWdubWVudDogdGhpcy5waXRjaEFsaWdubWVudCgpLFxuICAgICAgICAgIHJvdGF0aW9uQWxpZ25tZW50OiB0aGlzLnJvdGF0aW9uQWxpZ25tZW50KCksXG4gICAgICAgICAgZHJhZ2dhYmxlOiB0aGlzLmRyYWdnYWJsZSgpLFxuICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuY29udGVudCgpPy5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgIGZlYXR1cmU6IHRoaXMuZmVhdHVyZSgpLFxuICAgICAgICAgIGxuZ0xhdDogdGhpcy5sbmdMYXQoKSxcbiAgICAgICAgICBjbGlja1RvbGVyYW5jZTogdGhpcy5jbGlja1RvbGVyYW5jZSgpLFxuICAgICAgICB9LFxuICAgICAgICBtYXJrZXJzRXZlbnRzOiB7XG4gICAgICAgICAgbWFya2VyRHJhZ1N0YXJ0OiB0aGlzLm1hcmtlckRyYWdTdGFydCxcbiAgICAgICAgICBtYXJrZXJEcmFnOiB0aGlzLm1hcmtlckRyYWcsXG4gICAgICAgICAgbWFya2VyRHJhZ0VuZDogdGhpcy5tYXJrZXJEcmFnRW5kLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlTWFya2VyKHRoaXMubWFya2VySW5zdGFuY2UhKTtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdG9nZ2xlUG9wdXAoKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEudG9nZ2xlUG9wdXAoKTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdChjb29yZGluYXRlcyBhcyBbbnVtYmVyLCBudW1iZXJdKTtcbiAgfVxufVxuIl19