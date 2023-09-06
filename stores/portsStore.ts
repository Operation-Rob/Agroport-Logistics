import { defineStore } from 'pinia';
import { PortFeature, PortFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ports.geojson';

// Explicitly tell TypeScript the type of geojsonData
const typedGeojsonData = portsGeoJson as PortFeatureCollection;


interface PortState {
    ports: any;  // Replace `any` with the actual type of your GeoJSON data
    filters: Record<string, unknown>;
}

export const usePortsStore = defineStore({
    id: 'ports',
    state: (): { ports: PortFeatureCollection, filters: Record<string, unknown> } => ({
        ports: typedGeojsonData,
        filters: {}
    }),
    getters: {
        filteredPorts(): PortFeature[] {
            return this.ports.features;
        }
    },
    actions: {
        setFilters(newFilters: {}) {
            this.filters = newFilters;
        }
    }
});