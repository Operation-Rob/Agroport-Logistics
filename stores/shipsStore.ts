import { defineStore } from 'pinia';
import { ShipFeature, ShipFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ships.json';

// Explicitly tell TypeScript the type of geojsonData
let typedGeojsonData = (portsGeoJson as any) as ShipFeatureCollection;

export const useShipsStore = defineStore({
    id: 'ships',
    state: (): { ships: ShipFeatureCollection, filters: Record<string, unknown> } => ({
        ships: typedGeojsonData,
        filters: {}
    }),
    getters: {
        filteredShips(): ShipFeature[] {
            // Filter the ships based on the filters
            return this.ships.features;
        }
    },
    actions: {
        setFilters(newFilters: {}) {
            this.filters = newFilters;
        }
    }
});