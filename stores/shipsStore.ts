import { defineStore } from 'pinia';
import { ShipFeature, ShipFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ships.json';

// Explicitly tell TypeScript the type of geojsonData
let typedGeojsonData = (portsGeoJson as any) as ShipFeatureCollection;

interface ShipState {
    ships: any;  // Replace `any` with the actual type of your GeoJSON data
    filters: Record<string, unknown>;
}

export const useShipsStore = defineStore({
    id: 'ships',
    state: (): { ships: ShipFeatureCollection, filters: Record<string, unknown> } => ({
        ships: typedGeojsonData,
        filters: {}
    }),
    getters: {
        filteredShips(): ShipFeature[] {
            return this.ships.features;
        }
    },
    actions: {
        setFilters(newFilters: {}) {
            this.filters = newFilters;
        }
    }
});