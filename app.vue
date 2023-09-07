
<template>
  <title>Agroport Logistics</title>
  <div class="h-screen flex flex-col overflow-hidden">
    <Header class="h-[10%]" />
    <main class="h-[90%] overflow-y-hidden">
      <LeftSidebar ref="leftSidebarRef" @focus-on-ship="focusOnShip" />
      <RightSidebar />
      <MapboxComponent ref="mapboxRef" class="w-full h-screen" @ship-marker-clicked="handleMarkerClick" />
    </main>
    <Footer class="h-[5%] z-20" />
  </div>
</template>

<script lang="ts">
import MapboxComponent from '../components/Mapbox/Mapbox.vue'
import LeftSidebar from '../components/Sidebars/LeftSidebar.vue'
import RightSidebar from '../components/Sidebars/RightSidebar.vue'
import Header from '../components/Header/Header.vue'
import Footer from '../components/Footer/Footer.vue'

export default {
  components: {
    MapboxComponent,
    LeftSidebar,
    RightSidebar,
    Header,
    Footer
  },
  methods: {
    focusOnShip(shipName: string) {
      this.$refs.mapboxRef.zoomToShip(shipName);
    },
    handleMarkerClick(shipName: string) {
      this.$refs.leftSidebarRef.scrollToShipCard(shipName);
    }
  }
}
</script>