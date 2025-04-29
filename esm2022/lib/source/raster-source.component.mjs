import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export class RasterSourceComponent {
    mapService = inject(MapService);
    /* Init inputs */
    id = input.required();
    /* Dynamic inputs */
    url = input();
    tiles = input();
    bounds = input();
    minzoom = input();
    maxzoom = input();
    tileSize = input();
    scheme = input();
    attribution = input();
    volatile = input();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: RasterSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: RasterSourceComponent, isStandalone: true, selector: "mgl-raster-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: false, transformFunction: null }, tiles: { classPropertyName: "tiles", publicName: "tiles", isSignal: true, isRequired: false, transformFunction: null }, bounds: { classPropertyName: "bounds", publicName: "bounds", isSignal: true, isRequired: false, transformFunction: null }, minzoom: { classPropertyName: "minzoom", publicName: "minzoom", isSignal: true, isRequired: false, transformFunction: null }, maxzoom: { classPropertyName: "maxzoom", publicName: "maxzoom", isSignal: true, isRequired: false, transformFunction: null }, tileSize: { classPropertyName: "tileSize", publicName: "tileSize", isSignal: true, isRequired: false, transformFunction: null }, scheme: { classPropertyName: "scheme", publicName: "scheme", isSignal: true, isRequired: false, transformFunction: null }, attribution: { classPropertyName: "attribution", publicName: "attribution", isSignal: true, isRequired: false, transformFunction: null }, volatile: { classPropertyName: "volatile", publicName: "volatile", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: RasterSourceComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-raster-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFzdGVyLXNvdXJjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9zb3VyY2UvcmFzdGVyLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBS1QsTUFBTSxFQUNOLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQVFoRCxNQUFNLE9BQU8scUJBQXFCO0lBQ3hCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsaUJBQWlCO0lBQ2pCLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFVLENBQUM7SUFFOUIsb0JBQW9CO0lBQ3BCLEdBQUcsR0FBRyxLQUFLLEVBQW9DLENBQUM7SUFDaEQsS0FBSyxHQUFHLEtBQUssRUFBc0MsQ0FBQztJQUNwRCxNQUFNLEdBQUcsS0FBSyxFQUF1QyxDQUFDO0lBQ3RELE9BQU8sR0FBRyxLQUFLLEVBQXdDLENBQUM7SUFDeEQsT0FBTyxHQUFHLEtBQUssRUFBd0MsQ0FBQztJQUN4RCxRQUFRLEdBQUcsS0FBSyxFQUF5QyxDQUFDO0lBQzFELE1BQU0sR0FBRyxLQUFLLEVBQXVDLENBQUM7SUFDdEQsV0FBVyxHQUFHLEtBQUssRUFBNEMsQ0FBQztJQUNoRSxRQUFRLEdBQUcsS0FBSyxFQUF5QyxDQUFDO0lBRWxELFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFakMsUUFBUTtRQUNOLE1BQU0sSUFBSSxH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QUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNyQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtTQUMxQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7d0dBM0VVLHFCQUFxQjs0RkFBckIscUJBQXFCLG8wQ0FIdEIsRUFBRTs7NEZBR0QscUJBQXFCO2tCQU5qQyxTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBpbmplY3QsXG4gIGlucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgUmFzdGVyU291cmNlU3BlY2lmaWNhdGlvbiB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ21nbC1yYXN0ZXItc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmFzdGVyU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgbWFwU2VydmljZSA9IGluamVjdChNYXBTZXJ2aWNlKTtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgaWQgPSBpbnB1dC5yZXF1aXJlZDxzdHJpbmc+KCk7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgdXJsID0gaW5wdXQ8UmFzdGVyU291cmNlU3BlY2lmaWNhdGlvblsndXJsJ10+KCk7XG4gIHRpbGVzID0gaW5wdXQ8UmFzdGVyU291cmNlU3BlY2lmaWNhdGlvblsndGlsZXMnXT4oKTtcbiAgYm91bmRzID0gaW5wdXQ8UmFzdGVyU291cmNlU3BlY2lmaWNhdGlvblsnYm91bmRzJ10+KCk7XG4gIG1pbnpvb20gPSBpbnB1dDxSYXN0ZXJTb3VyY2VTcGVjaWZpY2F0aW9uWydtaW56b29tJ10+KCk7XG4gIG1heHpvb20gPSBpbnB1dDxSYXN0ZXJTb3VyY2VTcGVjaWZpY2F0aW9uWydtYXh6b29tJ10+KCk7XG4gIHRpbGVTaXplID0gaW5wdXQ8UmFzdGVyU291cmNlU3BlY2lmaWNhdGlvblsndGlsZVNpemUnXT4oKTtcbiAgc2NoZW1lID0gaW5wdXQ8UmFzdGVyU291cmNlU3BlY2lmaWNhdGlvblsnc2NoZW1lJ10+KCk7XG4gIGF0dHJpYnV0aW9uID0gaW5wdXQ8UmFzdGVyU291cmNlU3BlY2lmaWNhdGlvblsnYXR0cmlidXRpb24nXT4oKTtcbiAgdm9sYXRpbGUgPSBpbnB1dDxSYXN0ZXJTb3VyY2VTcGVjaWZpY2F0aW9uWyd2b2xhdGlsZSddPigpO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3Qgc3ViMSA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKVxuICAgICAgICAucGlwZShmaWx0ZXIoKCkgPT4gIXRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCgpKSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIxKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGNoYW5nZXNbJ3VybCddICYmICFjaGFuZ2VzWyd1cmwnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1sndGlsZXMnXSAmJiAhY2hhbmdlc1sndGlsZXMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYm91bmRzJ10gJiYgIWNoYW5nZXNbJ2JvdW5kcyddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydtaW56b29tJ10gJiYgIWNoYW5nZXNbJ21pbnpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snbWF4em9vbSddICYmICFjaGFuZ2VzWydtYXh6b29tJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ3RpbGVTaXplJ10gJiYgIWNoYW5nZXNbJ3RpbGVTaXplJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ3NjaGVtZSddICYmICFjaGFuZ2VzWydzY2hlbWUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYXR0cmlidXRpb24nXSAmJiAhY2hhbmdlc1snYXR0cmlidXRpb24nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1sndm9sYXRpbGUnXSAmJiAhY2hhbmdlc1sndm9sYXRpbGUnXS5pc0ZpcnN0Q2hhbmdlKCkpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5tYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKCkpO1xuICAgICAgdGhpcy5zb3VyY2VBZGRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBzb3VyY2U6IFJhc3RlclNvdXJjZVNwZWNpZmljYXRpb24gPSB7XG4gICAgICB0eXBlOiAncmFzdGVyJyxcbiAgICAgIHVybDogdGhpcy51cmwoKSxcbiAgICAgIHRpbGVzOiB0aGlzLnRpbGVzKCksXG4gICAgICBib3VuZHM6IHRoaXMuYm91bmRzKCksXG4gICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20oKSxcbiAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSgpLFxuICAgICAgdGlsZVNpemU6IHRoaXMudGlsZVNpemUoKSxcbiAgICAgIHNjaGVtZTogdGhpcy5zY2hlbWUoKSxcbiAgICAgIGF0dHJpYnV0aW9uOiB0aGlzLmF0dHJpYnV0aW9uKCksXG4gICAgICB2b2xhdGlsZTogdGhpcy52b2xhdGlsZSgpLFxuICAgIH07XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkKCksIHNvdXJjZSk7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==