import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class ImageSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : []));
    /* Dynamic inputs */
    url = input(...(ngDevMode ? [undefined, { debugName: "url" }] : []));
    coordinates = input.required(...(ngDevMode ? [{ debugName: "coordinates" }] : []));
    sub;
    sourceId;
    ngOnInit() {
        this.sub = this.mapService.mapLoaded$.subscribe(() => this.init());
    }
    ngOnChanges(changes) {
        if (this.sourceId === undefined) {
            return;
        }
        const source = this.mapService.getSource(this.sourceId);
        if (source === undefined) {
            return;
        }
        source.updateImage({
            url: this.url(),
            coordinates: changes['coordinates'] === undefined ? undefined : this.coordinates(),
        });
    }
    ngOnDestroy() {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
        if (this.sourceId !== undefined) {
            this.mapService.removeSource(this.sourceId);
            this.sourceId = undefined;
        }
    }
    init() {
        const imageSource = {
            type: 'image',
            url: this.url(),
            coordinates: this.coordinates(),
        };
        this.mapService.addSource(this.id(), imageSource);
        this.sourceId = this.id();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ImageSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: ImageSourceComponent, isStandalone: true, selector: "mgl-image-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: false, transformFunction: null }, coordinates: { classPropertyName: "coordinates", publicName: "coordinates", isSignal: true, isRequired: true, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ImageSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-image-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], url: [{ type: i0.Input, args: [{ isSignal: true, alias: "url", required: false }] }], coordinates: [{ type: i0.Input, args: [{ isSignal: true, alias: "coordinates", required: true }] }] } });
//# sourceMappingURL=image-source.component.js.map