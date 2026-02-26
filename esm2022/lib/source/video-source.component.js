import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class VideoSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : []));
    /* Dynamic inputs */
    urls = input.required(...(ngDevMode ? [{ debugName: "urls" }] : []));
    coordinates = input.required(...(ngDevMode ? [{ debugName: "coordinates" }] : []));
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
        if (changes['urls'] && !changes['urls'].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        else if (changes['coordinates'] &&
            !changes['coordinates'].isFirstChange()) {
            const source = this.mapService.getSource(this.id());
            if (source === undefined) {
                return;
            }
            source.setCoordinates(this.coordinates());
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.mapService.removeSource(this.id());
            this.sourceAdded = false;
        }
    }
    pause() {
        this.mapService.getSource(this.id())?.pause();
    }
    play() {
        this.mapService.getSource(this.id())?.play();
    }
    getVideo() {
        return this.mapService.getSource(this.id())?.getVideo();
    }
    init() {
        const source = {
            type: 'video',
            urls: this.urls(),
            coordinates: this.coordinates(),
        };
        this.mapService.addSource(this.id(), source);
        this.sourceAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: VideoSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: VideoSourceComponent, isStandalone: true, selector: "mgl-video-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, urls: { classPropertyName: "urls", publicName: "urls", isSignal: true, isRequired: true, transformFunction: null }, coordinates: { classPropertyName: "coordinates", publicName: "coordinates", isSignal: true, isRequired: true, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: VideoSourceComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-video-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], urls: [{ type: i0.Input, args: [{ isSignal: true, alias: "urls", required: true }] }], coordinates: [{ type: i0.Input, args: [{ isSignal: true, alias: "coordinates", required: true }] }] } });
//# sourceMappingURL=video-source.component.js.map