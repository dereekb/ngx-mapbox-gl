import { ChangeDetectionStrategy, Component, forwardRef, inject, input, model, } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
import * as i0 from "@angular/core";
export class FeatureComponent {
    GeoJSONSourceComponent = inject(forwardRef(() => GeoJSONSourceComponent));
    /* Init inputs */
    id = model(...(ngDevMode ? [undefined, { debugName: "id" }] : [])); // FIXME number only for now https://github.com/mapbox/mapbox-gl-js/issues/2716
    geometry = input.required(...(ngDevMode ? [{ debugName: "geometry" }] : []));
    properties = input(...(ngDevMode ? [undefined, { debugName: "properties" }] : []));
    type = 'Feature';
    feature;
    ngOnInit() {
        if (!this.id()) {
            this.id.set(this.GeoJSONSourceComponent._getNewFeatureId());
        }
        this.feature = {
            type: this.type,
            geometry: this.geometry(),
            properties: this.properties() ? this.properties() : {},
        };
        this.feature.id = this.id();
        this.GeoJSONSourceComponent._addFeature(this.feature);
    }
    ngOnDestroy() {
        this.GeoJSONSourceComponent._removeFeature(this.feature);
    }
    updateCoordinates(coordinates) {
        this.feature.geometry.coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: FeatureComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: FeatureComponent, isStandalone: true, selector: "mgl-feature", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null }, geometry: { classPropertyName: "geometry", publicName: "geometry", isSignal: true, isRequired: true, transformFunction: null }, properties: { classPropertyName: "properties", publicName: "properties", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { id: "idChange" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: FeatureComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-feature',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }, { type: i0.Output, args: ["idChange"] }], geometry: [{ type: i0.Input, args: [{ isSignal: true, alias: "geometry", required: true }] }], properties: [{ type: i0.Input, args: [{ isSignal: true, alias: "properties", required: false }] }] } });
//# sourceMappingURL=feature.component.js.map