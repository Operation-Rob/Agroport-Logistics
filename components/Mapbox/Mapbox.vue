<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import { usePortsStore } from '@/stores/portsStore';
import { useShipsStore } from '@/stores/shipsStore';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
    name: 'MapboxComponent',
    setup() {
        const mapContainer = ref(null);
        let map: mapboxgl.Map | null = null;

        const portsStore = usePortsStore();
        const shipsStore = useShipsStore();

        onMounted(() => {
            const runtimeConfig = useRuntimeConfig();
            mapboxgl.accessToken = runtimeConfig.public.mapboxToken;

            map = new mapboxgl.Map({
                container: (mapContainer.value as any) as HTMLElement,
                style: 'mapbox://styles/mapbox/outdoors-v12',
                center: [0, 0],  // starting position [lng, lat]
                zoom: 9
            });

            map.on('load', () => {
                for (const port of portsStore.filteredPorts) {
                    const [longitude, latitude] = port.geometry.coordinates;
                    const marker = new mapboxgl.Marker({
                            rotationAlignment: 'horizon',
                            color: '#FF0000'
                        }).setLngLat([longitude, latitude])
                          .addTo(map);
                }

                for (const ship of shipsStore.filteredShips) {
                    const [longitude, latitude] = ship.geometry.coordinates;
                    const marker = new mapboxgl.Marker({
                            rotationAlignment: 'horizon',
                        }).setLngLat([longitude, latitude])
                          .addTo(map);
                }
            });
            
        });

        return { mapContainer };
    }
}
</script>

<style>
.map-container {
    height: 100vh;
}
</style>