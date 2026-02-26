import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, input, } from '@angular/core';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class CustomControl {
    container;
    constructor(container) {
        this.container = container;
    }
    onAdd() {
        return this.container;
    }
    onRemove() {
        return this.container.parentNode.removeChild(this.container);
    }
    getDefaultPosition() {
        return 'top-right';
    }
}
export class ControlComponent {
    mapService = inject(MapService);
    /* Init inputs */
    position = input(...(ngDevMode ? [undefined, { debugName: "position" }] : []));
    content;
    control;
    controlAdded = false;
    ngAfterContentInit() {
        if (this.content.nativeElement.childNodes.length) {
            this.control = new CustomControl(this.content.nativeElement);
            this.mapService.mapCreated$.subscribe(() => {
                this.mapService.addControl(this.control, this.position());
                this.controlAdded = true;
            });
        }
    }
    ngOnDestroy() {
        if (this.controlAdded) {
            this.mapService.removeControl(this.control);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.1.1", type: ControlComponent, isStandalone: true, selector: "mgl-control", inputs: { position: { classPropertyName: "position", publicName: "position", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], ngImport: i0, template: `
    <div class="mapboxgl-ctrl" #content>
      <ng-content />
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.1", ngImport: i0, type: ControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mgl-control',
                    template: `
    <div class="mapboxgl-ctrl" #content>
      <ng-content />
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { position: [{ type: i0.Input, args: [{ isSignal: true, alias: "position", required: false }] }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }] } });
//# sourceMappingURL=control.component.js.map