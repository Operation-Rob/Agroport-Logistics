import { defineStore } from 'pinia';
import { ShipFeature, ShipFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ships.json';

// Explicitly tell TypeScript the type of geojsonData
let typedGeojsonData = (portsGeoJson as any) as ShipFeatureCollection;


export interface shipFilters {
    product: string | null;
}

export const useShipsStore = defineStore({
    id: 'ships',
    state: (): { ships: ShipFeatureCollection, filters: shipFilters } => ({
        ships: typedGeojsonData,
        filters: {
            product : null,
        }
    }),
    getters: {
        filteredShips(): ShipFeature[] {
            // Filter the ships based on the filters
            if (this.filters.product) {
                return this.ships.features.filter((ship: ShipFeature) => ship.properties['Product'] === this.filters.product);
            }

            return this.ships.features;
        }
    },
    actions: {
        setFilters(newFilters: shipFilters) {
            this.filters = newFilters;
        }
    }
});