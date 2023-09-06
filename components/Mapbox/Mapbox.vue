<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";

export default {
  name: "MapboxComponent",
  setup() {
    const mapContainer = ref(null);

    onMounted(() => {
      const runtimeConfig = useRuntimeConfig();
      mapboxgl.accessToken = runtimeConfig.public.mapboxToken;
      new mapboxgl.Map({
        container: mapContainer.value as unknown as HTMLElement,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [0, 0], // starting position [lng, lat]
        zoom: 9,
      });
    });

    return { mapContainer };
  },
};
</script>
