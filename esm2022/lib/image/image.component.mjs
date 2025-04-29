import { Component, EventEmitter, NgZone, Output, inject, input, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class ImageComponent {
    mapService = inject(MapService);
    zone = inject(NgZone);
    /* Init inputs */
    id = input.required();
    /* Dynamic inputs */
    data = input();
    options = input();
    url = input();
    imageError = new EventEmitter();
    imageLoaded = new EventEmitter();
    isAdded = false;
    isAdding = false;
    sub;
    ngOnInit() {
        this.sub = this.mapService.mapLoaded$
            .pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'styledata').pipe(startWith(undefined), filter(() => !this.isAdding &&
            !this.mapService.mapInstance.hasImage(this.id())))))
            .subscribe(() => this.init());
    }
    ngOnChanges(changes) {
        if ((changes['data'] && !changes['data'].isFirstChange()) ||
            (changes['options'] && !changes['options'].isFirstChange()) ||
            (changes['url'] && !changes['url'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    ngOnDestroy() {
        if (this.isAdded) {
            this.mapService.removeImage(this.id());
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    async init() {
        this.isAdding = true;
        if (this.data()) {
            this.mapService.addImage(this.id(), this.data(), this.options());
            this.isAdded = true;
            this.isAdding = false;
        }
        else if (this.url()) {
            try {
                await this.mapService.loadAndAddImage(this.id(), this.url(), this.options());
                this.isAdded = true;
                this.isAdding = false;
                this.zone.run(() => {
                    this.imageLoaded.emit();
                });
            }
            catch (error) {
                this.zone.run(() => {
                    this.imageError.emit(error);
                });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ImageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: ImageComponent, isStandalone: true, selector: "mgl-image", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { imageError: "imageError", imageLoaded: "imageLoaded" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ImageComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-image',
                    template: '',
                }]
        }], propDecorators: { imageError: [{
                type: Output
            }], imageLoaded: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFJTixNQUFNLEVBRU4sTUFBTSxFQUNOLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBUWhELE1BQU0sT0FBTyxjQUFjO0lBQ2pCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5QixpQkFBaUI7SUFDakIsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQVUsQ0FBQztJQUU5QixvQkFBb0I7SUFDcEIsSUFBSSxHQUFHLEtBQUssRUFBa0MsQ0FBQztJQUMvQyxPQUFPLEdBQUcsS0FBSyxFQUFrQyxDQUFDO0lBQ2xELEdBQUcsR0FBRyxLQUFLLEVBQVUsQ0FBQztJQUVaLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUyxDQUFDO0lBQ3ZDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRXpDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDaEIsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixHQUFHLENBQWU7SUFFMUIsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVO2FBQ2xDLElBQUksQ0FDSCxTQUFTLENBQUMsR0FBRyxF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O29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7OEJBYVcsVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBpbmplY3QsXG4gIGlucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgdHlwZSB7IE1hcCB9IGZyb20gJ21hcGJveC1nbCc7XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ21nbC1pbWFnZScsXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gaW5qZWN0KE1hcFNlcnZpY2UpO1xuICBwcml2YXRlIHpvbmUgPSBpbmplY3QoTmdab25lKTtcblxuICAvKiBJbml0IGlucHV0cyAqL1xuICBpZCA9IGlucHV0LnJlcXVpcmVkPHN0cmluZz4oKTtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBkYXRhID0gaW5wdXQ8UGFyYW1ldGVyczxNYXBbJ2FkZEltYWdlJ10+WzFdPigpO1xuICBvcHRpb25zID0gaW5wdXQ8UGFyYW1ldGVyczxNYXBbJ2FkZEltYWdlJ10+WzJdPigpO1xuICB1cmwgPSBpbnB1dDxzdHJpbmc+KCk7XG5cbiAgQE91dHB1dCgpIGltYWdlRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEVycm9yPigpO1xuICBAT3V0cHV0KCkgaW1hZ2VMb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBpc0FkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgaXNBZGRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YiA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgodW5kZWZpbmVkKSxcbiAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgKCkgPT5cbiAgICAgICAgICAgICAgICAhdGhpcy5pc0FkZGluZyAmJlxuICAgICAgICAgICAgICAgICF0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UuaGFzSW1hZ2UodGhpcy5pZCgpKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pbml0KCkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIChjaGFuZ2VzWydkYXRhJ10gJiYgIWNoYW5nZXNbJ2RhdGEnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snb3B0aW9ucyddICYmICFjaGFuZ2VzWydvcHRpb25zJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ3VybCddICYmICFjaGFuZ2VzWyd1cmwnXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuaXNBZGRlZCkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZUltYWdlKHRoaXMuaWQoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGluaXQoKSB7XG4gICAgdGhpcy5pc0FkZGluZyA9IHRydWU7XG4gICAgaWYgKHRoaXMuZGF0YSgpKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UuYWRkSW1hZ2UodGhpcy5pZCgpLCB0aGlzLmRhdGEoKSEsIHRoaXMub3B0aW9ucygpKTtcbiAgICAgIHRoaXMuaXNBZGRlZCA9IHRydWU7XG4gICAgICB0aGlzLmlzQWRkaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVybCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLm1hcFNlcnZpY2UubG9hZEFuZEFkZEltYWdlKFxuICAgICAgICAgIHRoaXMuaWQoKSxcbiAgICAgICAgICB0aGlzLnVybCgpISxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMoKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pc0FkZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmltYWdlTG9hZGVkLmVtaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmltYWdlRXJyb3IuZW1pdChlcnJvciBhcyBFcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19