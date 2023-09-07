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
            let filteredPorts = this.ports.features;

            if (this.filters.product) {
                filteredPorts = filteredPorts.filter((port: PortFeature) => port.properties['Primary Export'] === this.filters.product);
            }

            return filteredPorts;
        }
    },
    actions: {
        setFilters(key: keyof portFilters, value: string | null) {
            // Check for a valid key to avoid runtime errors
            if (key in this.filters) {
                this.filters[key] = value;
            } else {
                console.error(`Invalid key: ${key}`);
            }
        }
    }
});