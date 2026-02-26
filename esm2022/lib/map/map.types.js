/**
 * in typescript 4.1 DOM interface Position and Coordinates renamed to GeolocationPosition GeolocationCoordinates
 * to avoid deprecation angular version < 11.0.0 we declared own Coordinates, Position interface
 */
// export interface NgxMapboxGeolocationCoordinates {
//   readonly accuracy: number;
//   readonly altitude: number | null;
//   readonly altitudeAccuracy: number | null;
//   readonly heading: number | null;
//   readonly latitude: number;
//   readonly longitude: number;
//   readonly speed: number | null;
// }
// export interface Position {
//   coords: NgxMapboxGeolocationCoordinates;
//   target: GeolocateControl;
//   timestamp: number;
//   type: string;
// }
// export type MapImageData =
//   | HTMLImageElement
//   | ArrayBufferView
//   | { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
//   | ImageData
//   | ImageBitmap;
// export interface MapImageOptions {
//   pixelRatio: number;
//   sdf: boolean;
// }
//# sourceMappingURL=map.types.js.map