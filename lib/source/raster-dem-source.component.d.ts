import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RasterDemSource } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import * as i0 from "@angular/core";
export declare class RasterDemSourceComponent implements OnInit, OnDestroy, OnChanges, RasterDemSource {
    private mapService;
    id: string;
    url?: RasterDemSource['url'];
    tiles?: RasterDemSource['tiles'];
    bounds?: RasterDemSource['bounds'];
    minzoom?: RasterDemSource['minzoom'];
    maxzoom?: RasterDemSource['maxzoom'];
    tileSize?: RasterDemSource['tileSize'];
    attribution?: RasterDemSource['attribution'];
    encoding?: RasterDemSource['encoding'];
    type: RasterDemSource['type'];
    private sourceAdded;
    private sub;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<RasterDemSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RasterDemSourceComponent, "mgl-raster-dem-source", never, { "id": { "alias": "id"; "required": false; }; "url": { "alias": "url"; "required": false; }; "tiles": { "alias": "tiles"; "required": false; }; "bounds": { "alias": "bounds"; "required": false; }; "minzoom": { "alias": "minzoom"; "required": false; }; "maxzoom": { "alias": "maxzoom"; "required": false; }; "tileSize": { "alias": "tileSize"; "required": false; }; "attribution": { "alias": "attribution"; "required": false; }; "encoding": { "alias": "encoding"; "required": false; }; }, {}, never, never, false, never>;
}
