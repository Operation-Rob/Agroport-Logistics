import { defineStore } from 'pinia';
import { ShipFeature, ShipFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ships.json';

// Explicitly tell TypeScript the type of geojsonData
let typedGeojsonData = (portsGeoJson as any) as ShipFeatureCollection;


export interface shipFilters {
    product: string | null;
    origin: string | null;
}

export const useShipsStore = defineStore({
    id: 'ships',
    state: (): { ships: ShipFeatureCollection, filters: shipFilters } => ({
        ships: typedGeojsonData,
        filters: {
            product : null,
            origin: null
        }
    }),
    getters: {
        filteredShips(): ShipFeature[] {
            // Filter the ships based on the filters
            let filteredShips = this.ships.features;

            if (this.filters.product) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Product'] === this.filters.product);
            }

            if (this.filters.origin) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Origin Port Country'] === this.filters.origin);
            }

            return filteredShips;
        }
    },
    actions: {
        setFilters(key: keyof shipFilters, value: string | null) {
            // Check for a valid key to avoid runtime errors
            if (key in this.filters) {
                this.filters[key] = value;
            } else {
                console.error(`Invalid key: ${key}`);
            }
        }
    }
});