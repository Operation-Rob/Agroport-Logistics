import { defineStore } from 'pinia';
import { ShipFeature, ShipFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ships.json';

// Explicitly tell TypeScript the type of geojsonData
let typedGeojsonData = (portsGeoJson as any) as ShipFeatureCollection;

interface PortState {
    ports: any;  // Replace `any` with the actual type of your GeoJSON data
    filters: Record<string, unknown>;
}

export const usePortsStore = defineStore({
    id: 'ports',
    state: (): { ports: ShipFeatureCollection, filters: Record<string, unknown> } => ({
        ports: typedGeojsonData,
        filters: {}
    }),
    getters: {
        filteredPorts(): ShipFeature[] {
            return this.ports.features;
        }
    },
    actions: {
        setFilters(newFilters: {}) {
            this.filters = newFilters;
        }
    }
});