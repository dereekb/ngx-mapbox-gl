import { Component } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
  standalone: true,
  selector: 'showcase-demo',
  template: `<mgl-map [zoom]="[9]" [center]="[-74.5, 40]" />`,
  imports: [MapComponent],
  styleUrls: ['./examples.css'],
})
export class SimpleMapComponent {}
