<template>
  <title>Agroport Logistics</title>
  <div class="h-screen flex flex-col overflow-hidden">
    <Header
      @left="
        () => {
          leftSidebarOpen = true;
        }
      "
      @right="
        () => {
          rightSidebarOpen = true;
        }
      "
      class="h-[10%]"
    />

    <main class="h-[90%] overflow-y-hidden">
      <LeftSidebar
        v-on-click-outside="
          () => {
            leftSidebarOpen = false;
          }
        "
        class="md:-translate-x-0 md:w-1/5 transition-transform w-2/3"
        :class="{ '-translate-x-full': !leftSidebarOpen }"
        ref="leftSidebarRef"
        @focus-on-ship="focusOnShip"
      />

      <RightSidebar
        v-on-click-outside="
          () => {
            rightSidebarOpen = false;
          }
        "
        class="md:translate-x-0 md:w-1/5 transition-transform w-2/3"
        :class="{ 'translate-x-full': !rightSidebarOpen }"
      />
      <MapboxComponent
        ref="mapboxRef"
        class="w-full h-screen"
        @ship-marker-clicked="handleMarkerClick"
      />
    </main>
    <Footer class="h-[5%] z-20" />
  </div>
</template>

<script setup>
import MapboxComponent from "../components/Mapbox/Mapbox.vue";
import LeftSidebar from "../components/Sidebars/LeftSidebar.vue";
import RightSidebar from "../components/Sidebars/RightSidebar.vue";
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
import { vOnClickOutside } from "@vueuse/components";
const leftSidebarOpen = ref(false);
const rightSidebarOpen = ref(false);

const mapboxRef = ref(null);
const leftSidebarRef = ref(null);

const focusOnShip = (shipname) => {
  mapboxRef.value.zoomToShip(shipname);
  leftSidebarOpen.value = false;
};
const handleMarkerClick = (shipName) => {
  leftSidebarRef.value.scrollToShipCard(shipName);
};
</script>
