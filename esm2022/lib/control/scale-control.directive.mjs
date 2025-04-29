import { Directive, inject, input, } from '@angular/core';
import { ScaleControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import * as i0 from "@angular/core";
export class ScaleControlDirective {
    mapService = inject(MapService);
    controlComponent = inject((ControlComponent), { host: true });
    /* Init inputs */
    maxWidth = input();
    /* Dynamic inputs */
    unit = input();
    ngOnChanges(changes) {
        if (changes['unit'] && !changes['unit'].isFirstChange()) {
            this.controlComponent.control.setUnit(changes['unit'].currentValue);
        }
    }
    ngAfterContentInit() {
        this.mapService.mapCreated$.subscribe(() => {
            if (this.controlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            const options = {};
            const maxWidth = this.maxWidth();
            const unit = this.unit();
            if (maxWidth !== undefined) {
                options.maxWidth = maxWidth;
            }
            if (unit !== undefined) {
                options.unit = unit;
            }
            this.controlComponent.control = new ScaleControl(options);
            this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ScaleControlDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.13", type: ScaleControlDirective, isStandalone: true, selector: "[mglScale]", inputs: { maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null }, unit: { classPropertyName: "unit", publicName: "unit", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ScaleControlDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[mglScale]',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1tYXBib3gtZ2wvc3JjL2xpYi9jb250cm9sL3NjYWxlLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBR1QsTUFBTSxFQUNOLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUE0QixNQUFNLFdBQVcsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBTXZELE1BQU0sT0FBTyxxQkFBcUI7SUFDeEIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxnQkFBZ0IsR0FBRyxNQUFNLENBQy9CLENBQUEsZ0JBQThCLENBQUEsRUFDOUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLGlCQUFpQjtJQUNqQixRQUFRLEdBQUcsS0FBSyxFQUFVLENBQUM7SUFFM0Isb0JBQW9CO0lBQ3BCLElBQUksR0FBRyxLQUFLLEVBQXNDLENBQUM7SUFFbkQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7WUFDdkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQXdCLENBQUMsT0FBTyxDQUNyRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUM3QixDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1lBQ3JFLENBQUM7WUFDRCxNQUFNLE9BQU8sR0FBd0IsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQzlCLENBQUM7WUFDRCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FDakMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt3R0F6Q1UscUJBQXFCOzRGQUFyQixxQkFBcUI7OzRGQUFyQixxQkFBcUI7a0JBSmpDLFNBQVM7bUJBQUM7b0JBQ1QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxZQUFZO2lCQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBpbmplY3QsXG4gIGlucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjYWxlQ29udHJvbCwgdHlwZSBTY2FsZUNvbnRyb2xPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6ICdbbWdsU2NhbGVdJyxcbn0pXG5leHBvcnQgY2xhc3MgU2NhbGVDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzIHtcbiAgcHJpdmF0ZSBtYXBTZXJ2aWNlID0gaW5qZWN0KE1hcFNlcnZpY2UpO1xuICBwcml2YXRlIGNvbnRyb2xDb21wb25lbnQgPSBpbmplY3Q8Q29udHJvbENvbXBvbmVudDxTY2FsZUNvbnRyb2w+PihcbiAgICBDb250cm9sQ29tcG9uZW50PFNjYWxlQ29udHJvbD4sXG4gICAgeyBob3N0OiB0cnVlIH0sXG4gICk7XG5cbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgbWF4V2lkdGggPSBpbnB1dDxudW1iZXI+KCk7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgdW5pdCA9IGlucHV0PCdpbXBlcmlhbCcgfCAnbWV0cmljJyB8ICduYXV0aWNhbCc+KCk7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWyd1bml0J10gJiYgIWNoYW5nZXNbJ3VuaXQnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICh0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCBhcyBTY2FsZUNvbnRyb2wpLnNldFVuaXQoXG4gICAgICAgIGNoYW5nZXNbJ3VuaXQnXS5jdXJyZW50VmFsdWUsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zOiBTY2FsZUNvbnRyb2xPcHRpb25zID0ge307XG4gICAgICBjb25zdCBtYXhXaWR0aCA9IHRoaXMubWF4V2lkdGgoKTtcbiAgICAgIGNvbnN0IHVuaXQgPSB0aGlzLnVuaXQoKTtcbiAgICAgIGlmIChtYXhXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMubWF4V2lkdGggPSBtYXhXaWR0aDtcbiAgICAgIH1cbiAgICAgIGlmICh1bml0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy51bml0ID0gdW5pdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IFNjYWxlQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMubWFwU2VydmljZS5hZGRDb250cm9sKFxuICAgICAgICB0aGlzLmNvbnRyb2xDb21wb25lbnQuY29udHJvbCxcbiAgICAgICAgdGhpcy5jb250cm9sQ29tcG9uZW50LnBvc2l0aW9uKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=