<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import mapboxgl from 'mapbox-gl';
import { usePortsStore } from '@/stores/portsStore';
import { useShipsStore } from '@/stores/shipsStore';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
    name: 'MapboxComponent',
    setup() {
        const mapContainer = ref(null);
        let map: mapboxgl.Map | null = null;

        let portMarkers: mapboxgl.Marker[] = [];
        let shipMarkers: mapboxgl.Marker[] = [];

        const portsStore = usePortsStore();
        const shipsStore = useShipsStore();

        const addMarkers = (items: any[], markersArray: mapboxgl.Marker[], color?: string) => {
            for (const item of items) {
                const [longitude, latitude] = item.geometry.coordinates;
                const options: mapboxgl.MarkerOptions = { rotationAlignment: 'horizon' };
                if (color) options.color = color;

                const marker = new mapboxgl.Marker(options)
                    .setLngLat([longitude, latitude])
                    .addTo(map!);

                markersArray.push(marker);
            }
        };

        const clearMarkers = (markersArray: mapboxgl.Marker[]) => {
            for (const marker of markersArray) {
                marker.remove();
            }
            markersArray.length = 0;
        };

        onMounted(() => {
            const runtimeConfig = useRuntimeConfig();
            mapboxgl.accessToken = runtimeConfig.public.mapboxToken;

            map = new mapboxgl.Map({
                container: (mapContainer.value as any) as HTMLElement,
                style: 'mapbox://styles/mapbox/outdoors-v12',
                center: [111.00391063182929,-5.277512107350034],  // starting position [lng, lat]
                zoom: 3
            });

            map.on('load', () => {
                addMarkers(portsStore.filteredPorts, portMarkers, '#FF0000');
                addMarkers(shipsStore.filteredShips, shipMarkers);
            });

            watch(portsStore.filters, () => {
                clearMarkers(portMarkers);
                addMarkers(shipsStore.filteredShips, portMarkers, '#FF0000');
            });

            watch(shipsStore.filters, () => {
                clearMarkers(shipMarkers);
                addMarkers(shipsStore.filteredShips, shipMarkers);
            });

            onUnmounted(() => {
                clearMarkers([...portMarkers, ...shipMarkers]);
                if (map) {
                    map.remove();
                }
            });
        });

        return { mapContainer };
    }
}
</script>