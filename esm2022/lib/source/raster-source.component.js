import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class RasterSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : []));
    /* Dynamic inputs */
    url = input(...(ngDevMode ? [undefined, { debugName: "url" }] : []));
    tiles = input(...(ngDevMode ? [undefined, { debugName: "tiles" }] : []));
    bounds = input(...(ngDevMode ? [undefined, { debugName: "bounds" }] : []));
    minzoom = input(...(ngDevMode ? [undefined, { debugName: "minzoom" }] : []));
    maxzoom = input(...(ngDevMode ? [undefined, { debugName: "maxzoom" }] : []));
    tileSize = input(...(ngDevMode ? [undefined, { debugName: "tileSize" }] : []));
    scheme = input(...(ngDevMode ? [undefined, { debugName: "scheme" }] : []));
    attribution = input(...(ngDevMode ? [undefined, { debugName: "attribution" }] : []));
    volatile = input(...(ngDevMode ? [undefined, { debugName: "volatile" }] : []));
    sourceAdded = false;
    sub = new Subscription();
    ngOnInit() {
        const sub1 = this.mapService.mapLoaded$.subscribe(() => {
            this.init();
            const sub = fromEvent(this.mapService.mapInstance, 'styledata')
                .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
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
            (changes['scheme'] && !changes['scheme'].isFirstChange()) ||
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['volatile'] && !changes['volatile'].isFirstChange())) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id());
            this.sourceAdded = false;
        }
    }
    init() {
        const source = {
            type: 'raster',
            url: this.url(),
            tiles: this.tiles(),
            bounds: this.bounds(),
            minzoom: this.minzoom(),
            maxzoom: this.maxzoom(),
            tileSize: this.tileSize(),
            scheme: this.scheme(),
            attribution: this.attribution(),
            volatile: this.volatile(),
        };
        this.mapService.addSource(this.id(), source);
        this.sourceAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: RasterSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: RasterSourceComponent, isStandalone: true, selector: "mgl-raster-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: false, transformFunction: null }, tiles: { classPropertyName: "tiles", publicName: "tiles", isSignal: true, isRequired: false, transformFunction: null }, bounds: { classPropertyName: "bounds", publicName: "bounds", isSignal: true, isRequired: false, transformFunction: null }, minzoom: { classPropertyName: "minzoom", publicName: "minzoom", isSignal: true, isRequired: false, transformFunction: null }, maxzoom: { classPropertyName: "maxzoom", publicName: "maxzoom", isSignal: true, isRequired: false, transformFunction: null }, tileSize: { classPropertyName: "tileSize", publicName: "tileSize", isSignal: true, isRequired: false, transformFunction: null }, scheme: { classPropertyName: "scheme", publicName: "scheme", isSignal: true, isRequired: false, transformFunction: null }, attribution: { classPropertyName: "attribution", publicName: "attribution", isSignal: true, isRequired: false, transformFunction: null }, volatile: { classPropertyName: "volatile", publicName: "volatile", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: RasterSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-raster-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], url: [{ type: i0.Input, args: [{ isSignal: true, alias: "url", required: false }] }], tiles: [{ type: i0.Input, args: [{ isSignal: true, alias: "tiles", required: false }] }], bounds: [{ type: i0.Input, args: [{ isSignal: true, alias: "bounds", required: false }] }], minzoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "minzoom", required: false }] }], maxzoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxzoom", required: false }] }], tileSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "tileSize", required: false }] }], scheme: [{ type: i0.Input, args: [{ isSignal: true, alias: "scheme", required: false }] }], attribution: [{ type: i0.Input, args: [{ isSignal: true, alias: "attribution", required: false }] }], volatile: [{ type: i0.Input, args: [{ isSignal: true, alias: "volatile", required: false }] }] } });
//# sourceMappingURL=raster-source.component.js.map