import { Component } from '@angular/core';
import { LayerComponent, MapComponent } from 'ngx-mapbox-gl';
import { LayerSpecification, Map } from 'mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v11'"
      [zoom]="[15.5]"
      [center]="[-74.0066, 40.7135]"
      [pitch]="[45]"
      [bearing]="[-17.6]"
      [antialias]="true"
      (mapLoad)="onLoad($event.target)"
    >
      <mgl-layer
        id="3d-buildings"
        source="composite"
        sourceLayer="building"
        [filter]="['==', 'extrude', 'true']"
        type="fill-extrusion"
        [minzoom]="15"
        [paint]="{
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height'],
          ],
          'fill-extrusion-opacity': 0.6,
        }"
        [before]="labelLayerId"
      />
    </mgl-map>
  `,
  imports: [MapComponent, MglMapResizeDirective, LayerComponent],
  styleUrls: ['./examples.css'],
})
export class Display3dBuildingsComponent {
  labelLayerId?: string;

  onLoad(mapInstance: Map) {
    const layers = mapInstance.getStyle().layers;
    if (!layers) {
      return;
    }
    this.labelLayerId = this.getLabelLayerId(layers);
  }

  private getLabelLayerId(layers: LayerSpecification[]) {
    for (const layer of layers) {
      if (layer.type === 'symbol' && layer.layout?.['text-field']) {
        return layer.id;
      }
    }
    return;
  }
}
