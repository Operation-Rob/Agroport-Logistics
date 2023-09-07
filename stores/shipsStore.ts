import { defineStore } from 'pinia';
import { ShipFeature, ShipFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ships.json';

// Explicitly tell TypeScript the type of geojsonData
let typedGeojsonData = (portsGeoJson as any) as ShipFeatureCollection;

export interface shipFilters {
    product: string | null;
    origin: string | null;
    dest: string | null;
}

export const useShipsStore = defineStore({
    id: 'ships',
    state: (): { ships: ShipFeatureCollection, filters: shipFilters, changed_signal: boolean } => ({
        ships: typedGeojsonData,
        filters: {
            product : null,
            origin: null,
            dest: null
        },
        changed_signal: false,
    }),
    getters: {
        filteredShips(): ShipFeature[] {
            // Filter the ships based on the filters
            let filteredShips = this.ships.features;

            if (this.filters.product) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['product'] === this.filters.product);
            }

            if (this.filters.origin) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Origin Port Country'] === this.filters.origin);
            }

            if (this.filters.dest) {
                filteredShips = filteredShips.filter((ship: ShipFeature) => ship.properties['Destination Port Country'] === this.filters.dest);
            }

            return filteredShips;
        }
    },
    actions: {
        setFilters(key: keyof shipFilters, value: string | null) {
            // Check for a valid key to avoid runtime errors
            if (key in this.filters) {
                this.filters[key] = value;
                this.changed_signal = !this.changed_signal;
            } else {
                console.error(`Invalid key: ${key}`);
            }
        }
    }
});