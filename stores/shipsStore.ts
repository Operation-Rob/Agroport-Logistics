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
            let filtered = this.ships.features;

            if (this.filters.cargo && this.filters.cargo !== 'All') {
                filtered = filtered.filter(ship => ship.properties['Product'] === this.filters.cargo);
            }

            if (this.filters.country && this.filters.country !== 'All') {
                console.log(this.filters.country);
                filtered = filtered.filter(ship => ship.properties['Origin Port Country'] === this.filters.country);
            }

            return filtered;
        }
    },
    actions: {
        setFilter(key: string, value: unknown) {
            this.filters[key] = value;
        }
    }
});