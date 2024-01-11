import { Component, EventEmitter, Input, NgZone, Output, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { deprecationWarning } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.service";
class ImageComponent {
    constructor(mapService, zone) {
        this.mapService = mapService;
        this.zone = zone;
        this.imageError = new EventEmitter();
        this.imageLoaded = new EventEmitter();
        /**
         * @deprecated Use imageError instead
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.error = new EventEmitter();
        /**
         * @deprecated Use imageLoaded instead
         */
        this.loaded = new EventEmitter();
        this.isAdded = false;
        this.isAdding = false;
    }
    ngOnInit() {
        this.warnDeprecatedOutputs();
        this.sub = this.mapService.mapLoaded$
            .pipe(switchMap(() => fromEvent(this.mapService.mapInstance, 'styledata').pipe(startWith(undefined), filter(() => !this.isAdding && !this.mapService.mapInstance.hasImage(this.id)))))
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
            this.mapService.removeImage(this.id);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    async init() {
        this.isAdding = true;
        if (this.data) {
            this.mapService.addImage(this.id, this.data, this.options);
            this.isAdded = true;
            this.isAdding = false;
        }
        else if (this.url) {
            try {
                await this.mapService.loadAndAddImage(this.id, this.url, this.options);
                this.isAdded = true;
                this.isAdding = false;
                this.zone.run(() => {
                    this.imageLoaded.emit();
                    this.loaded.emit();
                });
            }
            catch (error) {
                this.zone.run(() => {
                    this.imageError.emit(error);
                    this.error.emit(error);
                });
            }
        }
    }
    warnDeprecatedOutputs() {
        const dw = deprecationWarning.bind(undefined, ImageComponent.name);
        if (this.error.observed) {
            dw('error', 'imageError');
        }
        if (this.loaded.observed) {
            dw('loaded', 'imageLoaded');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ImageComponent, deps: [{ token: i1.MapService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.4", type: ImageComponent, selector: "mgl-image", inputs: { id: "id", data: "data", options: "options", url: "url" }, outputs: { imageError: "imageError", imageLoaded: "imageLoaded", error: "error", loaded: "loaded" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true }); }
}
export { ImageComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.4", ngImport: i0, type: ImageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-image',
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i1.MapService }, { type: i0.NgZone }]; }, propDecorators: { id: [{
                type: Input
            }], data: [{
                type: Input
            }], options: [{
                type: Input
            }], url: [{
                type: Input
            }], imageError: [{
                type: Output
            }], imageLoaded: [{
                type: Output
            }], error: [{
                type: Output
            }], loaded: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQUU5QyxNQUlhLGNBQWM7SUF5QnpCLFlBQW9CLFVBQXNCLEVBQVUsSUFBWTtRQUE1QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWhCdEQsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO1FBQ3BELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNqRDs7V0FFRztRQUNILDREQUE0RDtRQUNsRCxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFDekQ7O1dBRUc7UUFDTyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUVwQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFHMEMsQ0FBQztJQUVwRSxRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVU7YUFDbEMsSUFBSSxDQUNILFNBQVMsQ0FBQyxH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Q0FBQztRQUNuRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzhHQWhHVSxjQUFjO2tHQUFkLGNBQWMsK09BRmYsRUFBRTs7U0FFRCxjQUFjOzJGQUFkLGNBQWM7a0JBSjFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSxFQUFFO2lCQUNiO3NIQUdVLEVBQUU7c0JBQVYsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFFSSxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBS0csS0FBSztzQkFBZCxNQUFNO2dCQUlHLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEltYWdlRGF0YSwgTWFwSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XG5pbXBvcnQgeyBkZXByZWNhdGlvbldhcm5pbmcgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1pbWFnZScsXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBkYXRhPzogTWFwSW1hZ2VEYXRhO1xuICBASW5wdXQoKSBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zO1xuICBASW5wdXQoKSB1cmw/OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGltYWdlRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHsgc3RhdHVzOiBudW1iZXIgfT4oKTtcbiAgQE91dHB1dCgpIGltYWdlTG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGltYWdlRXJyb3IgaW5zdGVhZFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdGF0dXM6IG51bWJlciB9PigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGltYWdlTG9hZGVkIGluc3RlYWRcbiAgICovXG4gIEBPdXRwdXQoKSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBpc0FkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgaXNBZGRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2FybkRlcHJlY2F0ZWRPdXRwdXRzKCk7XG4gICAgdGhpcy5zdWIgPSB0aGlzLm1hcFNlcnZpY2UubWFwTG9hZGVkJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKHVuZGVmaW5lZCksXG4gICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICgpID0+XG4gICAgICAgICAgICAgICAgIXRoaXMuaXNBZGRpbmcgJiYgIXRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5oYXNJbWFnZSh0aGlzLmlkKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmluaXQoKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgKGNoYW5nZXNbJ2RhdGEnXSAmJiAhY2hhbmdlc1snZGF0YSddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydvcHRpb25zJ10gJiYgIWNoYW5nZXNbJ29wdGlvbnMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1sndXJsJ10gJiYgIWNoYW5nZXNbJ3VybCddLmlzRmlyc3RDaGFuZ2UoKSlcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5pc0FkZGVkKSB7XG4gICAgICB0aGlzLm1hcFNlcnZpY2UucmVtb3ZlSW1hZ2UodGhpcy5pZCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGluaXQoKSB7XG4gICAgdGhpcy5pc0FkZGluZyA9IHRydWU7XG4gICAgaWYgKHRoaXMuZGF0YSkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmFkZEltYWdlKHRoaXMuaWQsIHRoaXMuZGF0YSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIHRoaXMuaXNBZGRlZCA9IHRydWU7XG4gICAgICB0aGlzLmlzQWRkaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVybCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5tYXBTZXJ2aWNlLmxvYWRBbmRBZGRJbWFnZSh0aGlzLmlkLCB0aGlzLnVybCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5pc0FkZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmltYWdlTG9hZGVkLmVtaXQoKTtcbiAgICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmltYWdlRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB3YXJuRGVwcmVjYXRlZE91dHB1dHMoKSB7XG4gICAgY29uc3QgZHcgPSBkZXByZWNhdGlvbldhcm5pbmcuYmluZCh1bmRlZmluZWQsIEltYWdlQ29tcG9uZW50Lm5hbWUpO1xuICAgIGlmICh0aGlzLmVycm9yLm9ic2VydmVkKSB7XG4gICAgICBkdygnZXJyb3InLCAnaW1hZ2VFcnJvcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb2FkZWQub2JzZXJ2ZWQpIHtcbiAgICAgIGR3KCdsb2FkZWQnLCAnaW1hZ2VMb2FkZWQnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==