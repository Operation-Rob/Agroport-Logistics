<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import mapboxgl from 'mapbox-gl';
import { usePortsStore } from '@/stores/portsStore';
import { useShipsStore } from '@/stores/shipsStore';
import 'mapbox-gl/dist/mapbox-gl.css';
import { reactive } from 'vue';

const state = reactive({
    map: null as mapboxgl.Map | null,
});

let shipMarkersMap: Record<string, mapboxgl.Marker> = {};

export default {
    name: 'MapboxComponent',
    setup() {
        const mapContainer = ref(null);

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
                    .addTo(state.map);

                markersArray.push(marker);

                if (!color) { /* Right now markers without color are ships... will need to change later */
                    const shipName = item.properties['Vessel Name'];
                    shipMarkersMap[shipName] = marker;
                }
            }
        };

        const clearMarkers = (markersArray: mapboxgl.Marker[]) => {
            for (const marker of markersArray) {
                marker.remove();
            }
            markersArray.length = 0;
            shipMarkersMap = {};
        };

        onMounted(() => {
            const runtimeConfig = useRuntimeConfig();
            mapboxgl.accessToken = runtimeConfig.public.mapboxToken;

            state.map = new mapboxgl.Map({
                container: (mapContainer.value as any) as HTMLElement,
                style: 'mapbox://styles/mapbox/outdoors-v12',
                center: [111.00391063182929,-5.277512107350034],  // starting position [lng, lat]
                zoom: 3
            });

            state.map.on('load', () => {
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
                if (state.map) {
                    state.map.remove();
                }
            });
        });

        return { mapContainer };
    },
    methods: {
        zoomToShip(shipName: string) {
            const marker = shipMarkersMap[shipName];
            if (marker && state.map) {
                const lngLat = marker.getLngLat();
                state.map.flyTo({
                    center: [lngLat.lng, lngLat.lat],
                    zoom: 7
                });
            }
        }
    }
}
</script>