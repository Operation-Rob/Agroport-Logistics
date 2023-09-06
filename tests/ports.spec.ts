// tests/unit/ports.spec.ts
import { createPinia, Pinia } from 'pinia';
import portsGeoJson from '@/data/ports.json';
import { usePortsStore } from '@/stores/portsStore'; // Adjust the import based on your actual file structure
import { PortFeatureCollection } from '@/types/GeoJSONTypes';

// Mocking the GeoJSON data if needed
const typedGeojsonData: PortFeatureCollection = portsGeoJson as PortFeatureCollection;

describe('Ports Store', () => {
    let store: ReturnType<typeof usePortsStore>;
    let pinia: Pinia;

    beforeEach(() => {
        pinia = createPinia();
        store = usePortsStore(pinia);
    });

    it('initializes with correct ports and filters', () => {
        expect(store.$state.ports).toEqual(typedGeojsonData);
        expect(store.$state.filters).toEqual({});
    });

    it('sets filters correctly', () => {
        const newFilters: Record<string, unknown> = {
            flag: 'USA',
            type: 'Cargo',
        };

        store.setFilters(newFilters);
        expect(store.$state.filters).toEqual(newFilters);
    });

    it('returns filteredPorts correctly', () => {
        // Since we haven't implemented filtering logic yet,
        // this is a basic check to make sure the getter works
        expect(store.filteredPorts).toEqual(store.$state.ports.features);
    });
});
