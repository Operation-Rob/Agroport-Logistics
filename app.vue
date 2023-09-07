<template>
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
        class="invisible md:visible transition w-1/5"
        @focus-on-ship="focusOnShip"
      />

      <transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-200"
        leave-active-class="transition duration-200"
      >
        <div
          v-if="leftSidebarOpen"
          class="flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full bg-stone-200 bg-opacity-10 backdrop-blur-sm transition"
        >
          <div
            v-on-click-outside="
              () => {
                leftSidebarOpen = false;
              }
            "
            :class="`bg-white rounded-2xl ${size}`"
          >
            <LeftSidebar class="w-2/3" @focus-on-ship="focusOnShip" />
          </div>
        </div>
      </transition>
      <RightSidebar class="invisible md:visible w-1/5" />
      <transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-200"
        leave-active-class="transition duration-200"
      >
        <div
          v-if="rightSidebarOpen"
          class="flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full bg-stone-200 bg-opacity-10 backdrop-blur-sm transition"
        >
          <div
            v-on-click-outside="
              () => {
                rightSidebarOpen = false;
              }
            "
            :class="`bg-white rounded-2xl ${size}`"
          >
            <RightSidebar class="w-2/3" />
          </div>
        </div>
      </transition>
      <MapboxComponent ref="mapboxRef" class="w-full h-screen" />
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

// export default {
//   components: {
//     MapboxComponent,
//     LeftSidebar,
//     RightSidebar,
//     Header,
//     Footer,
//   },
//   methods: {
//     focusOnShip(shipName: string) {
//       this.$refs.mapboxRef.zoomToShip(shipName);
//     },
//   },
// };
</script>
