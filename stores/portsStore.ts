import { defineStore } from 'pinia';
import { PortFeature, PortFeatureCollection } from '@/types/GeoJSONTypes';
import portsGeoJson from '@/data/ports.json';

// Explicitly tell TypeScript the type of geojsonData
const typedGeojsonData = (portsGeoJson as any) as PortFeatureCollection;

export interface portFilters {
    product: string | null;
}

export const usePortsStore = defineStore({
    id: 'ports',
    state: (): { ports: PortFeatureCollection, filters: portFilters } => ({
        ports: typedGeojsonData,
        filters: {
            product : null,
        }
    }),
    getters: {
        filteredPorts(): PortFeature[] {
            // Filter the ports based on the product they're carrying
            if (this.filters.product) {
                return this.ports.features.filter((port: PortFeature) => port.properties['Primary Export'] === this.filters.product);
            }

            return this.ports.features;
        }
    },
    actions: {
        setFilters(newFilters: portFilters) {
            this.filters = newFilters;
        }
    }
});