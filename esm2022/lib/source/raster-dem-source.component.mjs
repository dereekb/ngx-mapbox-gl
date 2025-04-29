import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
// Typing issue in RasterDEMSourceSpecification
// type RasterDemSourceInputs = {
//   [K in keyof Omit<RasterDEMSourceSpecification, 'type'>]: InputSignal<
//     Omit<RasterDEMSourceSpecification, 'type'>[K]
//   >;
// };
export class RasterDemSourceComponent {
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
    attribution = input();
    encoding = input();
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
            (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
            (changes['encoding'] && !changes['encoding'].isFirstChange()) ||
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
            type: 'raster-dem',
            url: this.url(),
            tiles: this.tiles(),
            bounds: this.bounds(),
            minzoom: this.minzoom(),
            maxzoom: this.maxzoom(),
            tileSize: this.tileSize(),
            attribution: this.attribution(),
            encoding: this.encoding(),
            volatile: this.volatile(),
        };
        this.mapService.addSource(this.id(), source);
        this.sourceAdded = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: RasterDemSourceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.13", type: RasterDemSourceComponent, isStandalone: true, selector: "mgl-raster-dem-source", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: false, transformFunction: null }, tiles: { classPropertyName: "tiles", publicName: "tiles", isSignal: true, isRequired: false, transformFunction: null }, bounds: { classPropertyName: "bounds", publicName: "bounds", isSignal: true, isRequired: false, transformFunction: null }, minzoom: { classPropertyName: "minzoom", publicName: "minzoom", isSignal: true, isRequired: false, transformFunction: null }, maxzoom: { classPropertyName: "maxzoom", publicName: "maxzoom", isSignal: true, isRequired: false, transformFunction: null }, tileSize: { classPropertyName: "tileSize", publicName: "tileSize", isSignal: true, isRequired: false, transformFunction: null }, attribution: { classPropertyName: "attribution", publicName: "attribution", isSignal: true, isRequired: false, transformFunction: null }, encoding: { classPropertyName: "encoding", publicName: "encoding", isSignal: true, isRequired: false, transformFunction: null }, volatile: { classPropertyName: "volatile", publicName: "volatile", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: RasterDemSourceComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: 'mgl-raster-dem-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFzdGVyLWRlbS1zb3VyY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWFwYm94LWdsL3NyYy9saWIvc291cmNlL3Jhc3Rlci1kZW0tc291cmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFLVCxNQUFNLEVBQ04sS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRWhELCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsMEVBQTBFO0FBQzFFLG9EQUFvRDtBQUNwRCxPQUFPO0FBQ1AsS0FBSztBQVFMLE1BQU0sT0FBTyx3QkFBd0I7SUFDM0IsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxpQkFBaUI7SUFDakIsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQVUsQ0FBQztJQUU5QixvQkFBb0I7SUFDcEIsR0FBRyxHQUFHLEtBQUssRUFBdUMsQ0FBQztJQUNuRCxLQUFLLEdBQUcsS0FBSyxFQUF5QyxDQUFDO0lBQ3ZELE1BQU0sR0FBRyxLQUFLLEVBQTBDLENBQUM7SUFDekQsT0FBTyxHQUFHLEtBQUssRUFBMkMsQ0FBQztJQUMzRCxPQUFPLEdBQUcsS0FBSyxFQUEyQyxDQUFDO0lBQzNELFFBQVEsR0FBRyxLQUFLLEVBQTRDLENBQUM7SUFDN0QsV0FBVyxHQUFHLEtBQUssRUFBK0MsQ0FBQztJQUNuRSxRQUFRLEdBQUcsS0FBSyxFQUE0QyxDQUFDO0lBQzdELFFBQVEsR0FBRyxLQUFLLEVBQTRDLENBQUM7SUFFckQsV0FB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QUssRUFBRTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtTQUMxQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7d0dBM0VVLHdCQUF3Qjs0RkFBeEIsd0JBQXdCLDgwQ0FIekIsRUFBRTs7NEZBR0Qsd0JBQXdCO2tCQU5wQyxTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBpbmplY3QsXG4gIGlucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgUmFzdGVyREVNU291cmNlU3BlY2lmaWNhdGlvbiB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbi8vIFR5cGluZyBpc3N1ZSBpbiBSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uXG4vLyB0eXBlIFJhc3RlckRlbVNvdXJjZUlucHV0cyA9IHtcbi8vICAgW0sgaW4ga2V5b2YgT21pdDxSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uLCAndHlwZSc+XTogSW5wdXRTaWduYWw8XG4vLyAgICAgT21pdDxSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uLCAndHlwZSc+W0tdXG4vLyAgID47XG4vLyB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6ICdtZ2wtcmFzdGVyLWRlbS1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBSYXN0ZXJEZW1Tb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gaW5qZWN0KE1hcFNlcnZpY2UpO1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBpZCA9IGlucHV0LnJlcXVpcmVkPHN0cmluZz4oKTtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICB1cmwgPSBpbnB1dDxSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uWyd1cmwnXT4oKTtcbiAgdGlsZXMgPSBpbnB1dDxSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uWyd0aWxlcyddPigpO1xuICBib3VuZHMgPSBpbnB1dDxSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uWydib3VuZHMnXT4oKTtcbiAgbWluem9vbSA9IGlucHV0PFJhc3RlckRFTVNvdXJjZVNwZWNpZmljYXRpb25bJ21pbnpvb20nXT4oKTtcbiAgbWF4em9vbSA9IGlucHV0PFJhc3RlckRFTVNvdXJjZVNwZWNpZmljYXRpb25bJ21heHpvb20nXT4oKTtcbiAgdGlsZVNpemUgPSBpbnB1dDxSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uWyd0aWxlU2l6ZSddPigpO1xuICBhdHRyaWJ1dGlvbiA9IGlucHV0PFJhc3RlckRFTVNvdXJjZVNwZWNpZmljYXRpb25bJ2F0dHJpYnV0aW9uJ10+KCk7XG4gIGVuY29kaW5nID0gaW5wdXQ8UmFzdGVyREVNU291cmNlU3BlY2lmaWNhdGlvblsnZW5jb2RpbmcnXT4oKTtcbiAgdm9sYXRpbGUgPSBpbnB1dDxSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uWyd2b2xhdGlsZSddPigpO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3Qgc3ViMSA9IHRoaXMubWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLm1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKVxuICAgICAgICAucGlwZShmaWx0ZXIoKCkgPT4gIXRoaXMubWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCgpKSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIxKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGNoYW5nZXNbJ3VybCddICYmICFjaGFuZ2VzWyd1cmwnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1sndGlsZXMnXSAmJiAhY2hhbmdlc1sndGlsZXMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snYm91bmRzJ10gJiYgIWNoYW5nZXNbJ2JvdW5kcyddLmlzRmlyc3RDaGFuZ2UoKSkgfHxcbiAgICAgIChjaGFuZ2VzWydtaW56b29tJ10gJiYgIWNoYW5nZXNbJ21pbnpvb20nXS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAoY2hhbmdlc1snbWF4em9vbSddICYmICFjaGFuZ2VzWydtYXh6b29tJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ3RpbGVTaXplJ10gJiYgIWNoYW5nZXNbJ3RpbGVTaXplJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2F0dHJpYnV0aW9uJ10gJiYgIWNoYW5nZXNbJ2F0dHJpYnV0aW9uJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ2VuY29kaW5nJ10gJiYgIWNoYW5nZXNbJ2VuY29kaW5nJ10uaXNGaXJzdENoYW5nZSgpKSB8fFxuICAgICAgKGNoYW5nZXNbJ3ZvbGF0aWxlJ10gJiYgIWNoYW5nZXNbJ3ZvbGF0aWxlJ10uaXNGaXJzdENoYW5nZSgpKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMubWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCgpKTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgY29uc3Qgc291cmNlOiBSYXN0ZXJERU1Tb3VyY2VTcGVjaWZpY2F0aW9uID0ge1xuICAgICAgdHlwZTogJ3Jhc3Rlci1kZW0nLFxuICAgICAgdXJsOiB0aGlzLnVybCgpLFxuICAgICAgdGlsZXM6IHRoaXMudGlsZXMoKSxcbiAgICAgIGJvdW5kczogdGhpcy5ib3VuZHMoKSxcbiAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSgpLFxuICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tKCksXG4gICAgICB0aWxlU2l6ZTogdGhpcy50aWxlU2l6ZSgpLFxuICAgICAgYXR0cmlidXRpb246IHRoaXMuYXR0cmlidXRpb24oKSxcbiAgICAgIGVuY29kaW5nOiB0aGlzLmVuY29kaW5nKCksXG4gICAgICB2b2xhdGlsZTogdGhpcy52b2xhdGlsZSgpLFxuICAgIH07XG4gICAgdGhpcy5tYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkKCksIHNvdXJjZSk7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==