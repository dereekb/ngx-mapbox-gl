import { MAPBOX_API_KEY } from './map/map.service';
export function provideMapboxGL(config) {
    return {
        provide: MAPBOX_API_KEY,
        useValue: config.accessToken,
    };
}
//# sourceMappingURL=provide-mapbox-gl.js.map