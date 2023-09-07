<template>
  <div
    class="fixed top-0 invisible md:visible left-0 w-1/5 h-screen bg-black pr-0 py-2 pl-2 z-10 text-white"
  >
    <h1 class="font-bold underline pb-2 pl-2 text-lg">Ship Table</h1>
    <div class="h-[calc(100vh-76px)] overflow-y-scroll py-2 pl-2 pr-4">
      <ul class="space-y-3">
        <ShipCard
          v-for="ship in filteredShips"
          :key="ship.properties['Vessel Name']"
          @ship-selected="handleShipSelected"
          :shipName="ship.properties['Vessel Name']"
          :shipType="ship.properties['Vessel Type - Detailed']"
          :cargo="ship.properties['Product']"
          :eta="ship.properties['Calculated Eta']"
          :volume="ship.properties['Capacity - Gt'].toString()"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { useShipsStore } from "@/stores/shipsStore";
import ShipCard from "./ShipCard.vue";

export default {
  name: "LeftSidebar",
  components: {
    ShipCard,
  },
  setup(props, { emit }) {
    const shipsStore = useShipsStore();
    const filteredShips = computed(() => shipsStore.filteredShips);
    const handleShipSelected = (shipName: string) => {
      emit("focus-on-ship", shipName);
    };

    return {
      filteredShips,
      handleShipSelected,
    };
  },
};
</script>

<style></style>
