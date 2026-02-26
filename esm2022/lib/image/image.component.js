import { Component, EventEmitter, NgZone, Output, inject, input, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class ImageComponent {
    mapService = inject(MapService);
    zone = inject(NgZone);
    /* Init inputs */
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : []));
    /* Dynamic inputs */
    data = input(...(ngDevMode ? [undefined, { debugName: "data" }] : []));
    options = input(...(ngDevMode ? [undefined, { debugName: "options" }] : []));
    url = input(...(ngDevMode ? [undefined, { debugName: "url" }] : []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ImageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: ImageComponent, isStandalone: true, selector: "mgl-image", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { imageError: "imageError", imageLoaded: "imageLoaded" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ImageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-image',
                    template: '',
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], url: [{ type: i0.Input, args: [{ isSignal: true, alias: "url", required: false }] }], imageError: [{
                type: Output
            }], imageLoaded: [{
                type: Output
            }] } });
//# sourceMappingURL=image.component.js.map