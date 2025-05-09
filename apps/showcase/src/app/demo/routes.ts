import { Router, Routes, type ActivatedRouteSnapshot } from '@angular/router';
import { DemoIndexComponent } from './demo-index.component';
import { Display3dBuildingsComponent } from './examples/3d-buildings.component';
import { AddImageGeneratedComponent } from './examples/add-image-generated.component';
import { AddImageMissingGeneratedComponent } from './examples/add-image-missing-generated.component';
import { AddImageComponent } from './examples/add-image.component';
import { AttributionPositionComponent } from './examples/attribution-position.component';
import { CenterOnSymbolComponent } from './examples/center-on-symbol.component';
import { ClusterHtmlComponent } from './examples/cluster-html.component';
import { ClusterComponent } from './examples/cluster.component';
import { NgxCustomAttributionComponent } from './examples/ngx-custom-attribution.component';
import { NgxCustomLocaleComponent } from './examples/ngx-custom-locale.component';
import { CustomMarkerIconsComponent } from './examples/custom-marker-icons.component';
import { CustomStyleIdComponent } from './examples/custom-style-id.component';
import { DragAMarkerComponent } from './examples/drag-a-marker.component';
import { FullscreenComponent } from './examples/fullscreen.component';
import { GeoJSONLineComponent } from './examples/geojson-line.component';
import { HeatMapComponent } from './examples/heatmap.component';
import { HoverStylesComponent } from './examples/hover-styles.component';
import { InteractiveFalseComponent } from './examples/interactive-false.component';
import { LanguageSwitchComponent } from './examples/language-switch.component';
import { LiveUpdateFeatureComponent } from './examples/live-update-feature.component';
import { LocateUserComponent } from './examples/locate-user.component';
import { MapProjectionComponent } from './examples/map-projection.component';
import { NavigationComponent } from './examples/navigation.component';
import { NgxClusterHtmlComponent } from './examples/ngx-cluster-html.component';
import { NgxCustomControlComponent } from './examples/ngx-custom-control.component';
import { NgxCustomMarkerIconsComponent } from './examples/ngx-custom-marker-icons.component';
import { NgxDragAPointComponent } from './examples/ngx-drag-a-point.component';
import { NgxGeoJSONLineComponent } from './examples/ngx-geojson-line.component';
import { NgxScaleControlComponent } from './examples/ngx-scale-control.component';
import { PolygonPopupOnClickComponent } from './examples/polygon-popup-on-click.component';
import { PopupOnClickComponent } from './examples/popup-on-click.component';
import { PopupComponent } from './examples/popup.component';
import { SatelliteMapComponent } from './examples/satellite-map.component';
import { SetPopupComponent } from './examples/set-popup.component';
import { SetStyleComponent } from './examples/set-style.component';
import { ToggleLayersComponent } from './examples/toggle-layers.component';
import { ZoomtoLinestringComponent } from './examples/zoomto-linestring.component';
import { StackblitzEditComponent } from './stackblitz-edit/stackblitz-edit.component';
import { inject } from '@angular/core';
import { SimpleMapComponent } from './examples/simple-map.component';

export const Category = {
  STYLES: 'Styles',
  LAYERS: 'Layers',
  SOURCES: 'Sources',
  USER_INTERACTION: 'User interaction',
  CAMERA: 'Camera',
  CONTROLS_AND_OVERLAYS: 'Controls and overlays',
  PROJECTIONS: 'Projections',
} as const;
export type Category = (typeof Category)[keyof typeof Category];

export const DEMO_ROUTES: Routes = [
  {
    path: '',
    component: DemoIndexComponent,
    children: [
      {
        path: 'edit/:demoUrl',
        component: StackblitzEditComponent,
        canActivate: [
          (route: ActivatedRouteSnapshot) => {
            if (
              DEMO_ROUTES[0].children?.some(
                (r) => r.path === route.params['demoUrl'],
              )
            ) {
              return true;
            }
            return inject(Router).createUrlTree(['/demo']);
          },
        ],
      },
      {
        path: 'simple-map',
        component: SimpleMapComponent,
        data: { label: 'Display a map', cat: Category.STYLES },
      },
      {
        path: 'custom-style-id',
        component: CustomStyleIdComponent,
        data: {
          label: 'Display a map with a custom style',
          cat: Category.STYLES,
        },
      },
      {
        path: 'setstyle',
        component: SetStyleComponent,
        data: { label: "Change a map's style", cat: Category.STYLES },
      },
      {
        path: 'satellite-map',
        component: SatelliteMapComponent,
        data: { label: 'Display a satellite map', cat: Category.STYLES },
      },
      {
        path: 'add-image-generated',
        component: AddImageGeneratedComponent,
        data: {
          label: 'Add a generated icon to the map',
          cat: Category.LAYERS,
        },
      },
      {
        path: 'add-image',
        component: AddImageComponent,
        data: { label: 'Add an icon to the map', cat: Category.LAYERS },
      },
      {
        path: 'toggle-layers',
        component: ToggleLayersComponent,
        data: { label: 'Show and hide layers', cat: Category.LAYERS },
      },
      {
        path: '3d-buildings',
        component: Display3dBuildingsComponent,
        data: { label: 'Display 3d buildings', cat: Category.LAYERS },
      },
      {
        path: 'cluster',
        component: ClusterComponent,
        data: { label: 'Create and style clusters', cat: Category.LAYERS },
      },
      {
        path: 'heatmap',
        component: HeatMapComponent,
        data: { label: 'Create a heatmap layer', cat: Category.LAYERS },
      },
      {
        path: 'geojson-line',
        component: GeoJSONLineComponent,
        data: { label: 'Add a GeoJSON line', cat: Category.LAYERS },
      },
      {
        path: 'ngx-geojson-line',
        component: NgxGeoJSONLineComponent,
        data: { label: '[NGX] Add a GeoJSON line', cat: Category.LAYERS },
      },
      {
        path: 'custom-marker-icons',
        component: CustomMarkerIconsComponent,
        data: {
          label: 'Add custom icons with Markers',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'ngx-custom-marker-icons',
        component: NgxCustomMarkerIconsComponent,
        data: {
          label: '[NGX] Add custom icons with Markers',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'live-update-feature',
        component: LiveUpdateFeatureComponent,
        data: { label: 'Update a feature in realtime', cat: Category.SOURCES },
      },
      {
        path: 'popup',
        component: PopupComponent,
        data: { label: 'Display a popup', cat: Category.CONTROLS_AND_OVERLAYS },
      },
      {
        path: 'set-popup',
        component: SetPopupComponent,
        data: {
          label: 'Attach a popup to a marker instance',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'fullscreen',
        component: FullscreenComponent,
        data: {
          label: 'View a fullscreen map',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'navigation',
        component: NavigationComponent,
        data: {
          label: 'Display map navigation controls',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'locate-user',
        component: LocateUserComponent,
        data: { label: 'Locate the user', cat: Category.CONTROLS_AND_OVERLAYS },
      },
      {
        path: 'attribution-position',
        component: AttributionPositionComponent,
        data: {
          label: 'Change the default position for attribution',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'ngx-scale-control',
        component: NgxScaleControlComponent,
        data: {
          label: '[NGX] Show scale information',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'ngx-custom-control',
        component: NgxCustomControlComponent,
        data: {
          label: '[NGX] Add a custom control',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'interactive-false',
        component: InteractiveFalseComponent,
        data: {
          label: 'Display a non-interactive map',
          cat: Category.USER_INTERACTION,
        },
      },
      {
        path: 'language-switch',
        component: LanguageSwitchComponent,
        data: {
          label: "Change a map's language",
          cat: Category.USER_INTERACTION,
        },
      },
      {
        path: 'center-on-symbol',
        component: CenterOnSymbolComponent,
        data: {
          label: 'Center the map on a clicked symbol',
          cat: Category.USER_INTERACTION,
        },
      },
      {
        path: 'ngx-drag-a-point',
        component: NgxDragAPointComponent,
        data: {
          label: '[NGX] Create a draggable point',
          cat: Category.USER_INTERACTION,
        },
      },
      {
        path: 'drag-a-marker',
        component: DragAMarkerComponent,
        data: {
          label: 'Create a draggable marker',
          cat: Category.USER_INTERACTION,
        },
      },
      {
        path: 'hover-styles',
        component: HoverStylesComponent,
        data: {
          label: 'Create a hover effect',
          cat: Category.USER_INTERACTION,
        },
      },
      {
        path: 'popup-on-click',
        component: PopupOnClickComponent,
        data: {
          label: 'Display a popup on click',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'zoomto-linestring',
        component: ZoomtoLinestringComponent,
        data: {
          label: 'Fit to the bounds of a LineString',
          cat: Category.USER_INTERACTION,
        },
      },
      {
        path: 'cluster-html',
        component: ClusterHtmlComponent,
        data: {
          label: 'Display HTML clusters with custom properties',
          cat: Category.LAYERS,
        },
      },
      {
        path: 'ngx-cluster-html',
        component: NgxClusterHtmlComponent,
        data: {
          label: '[NGX] Display HTML clusters with custom properties',
          cat: Category.LAYERS,
        },
      },
      {
        path: 'polygon-popup-on-click',
        component: PolygonPopupOnClickComponent,
        data: {
          label: 'Show polygon information on click',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'add-image-missing-generated',
        component: AddImageMissingGeneratedComponent,
        data: {
          label: 'Generate and add a missing icon to the map',
          cat: Category.STYLES,
        },
      },
      {
        path: 'ngx-custom-attribution',
        component: NgxCustomAttributionComponent,
        data: {
          label: '[NGX] Add custom attributions',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'ngx-custom-locale',
        component: NgxCustomLocaleComponent,
        data: {
          label: '[NGX] Add custom localization for controls',
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'map-projection',
        component: MapProjectionComponent,
        data: {
          label: 'Display a web map using an alternate projection',
          cat: Category.PROJECTIONS,
        },
      },
      { path: '**', redirectTo: 'display-map' },
    ],
  },
];

export type RoutesByCategory = { [P in Category]: Routes };

export const ROUTES_BY_CATEGORY: RoutesByCategory =
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  DEMO_ROUTES[0].children!.reduce<RoutesByCategory>((acc, route) => {
    if (!route.data) {
      return acc;
    }
    const category = route.data['cat'] as Category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(route);
    return acc;
  }, {} as RoutesByCategory);
