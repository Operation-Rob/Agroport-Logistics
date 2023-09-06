<template>
  <main>
    <MapboxComponent class="w-full h-screen" />
  </main>
  <LeftSidebar />
</template>

<script lang="ts">
import MapboxComponent from '../components/Mapbox/Mapbox.vue'
import LeftSidebar from '../components/Sidebars/LeftSidebar.vue'
import RightSidebar from '../components/Sidebars/RightSidebar.vue'

export default {
  components: {
    MapboxComponent,
    LeftSidebar,
    RightSidebar
  }
}
</script>