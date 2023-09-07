<template>
  <div
    class="fixed top-0 left-0 h-screen bg-black pr-0 py-2 pl-2 z-10 text-white"
  >
    <h1 class="font-bold underline pb-2 pl-2 text-lg">Ship Table</h1>
    <div class="h-[calc(100vh-76px)] overflow-y-scroll py-2 pl-2 pr-4">
      <ul class="space-y-3" ref="shipCardsContainer">
        <ShipCard
          v-for="ship in filteredShips"
          :key="ship.properties['Vessel Name']"
          @ship-selected="handleShipSelected"
          :shipName="ship.properties['Vessel Name']"
          :shipType="ship.properties['Vessel Type - Detailed']"
          :cargo="ship.properties['product']"
          :eta="ship.properties['Calculated Eta']?.toString()"
          :volume="(ship.properties['Capacity - Gt'] ?? 0).toString()"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { useShipsStore } from "@/stores/shipsStore";
import ShipCard from "./ShipCard.vue";
import { ref } from 'vue';

export default {
  name: "LeftSidebar",
  components: {
    ShipCard,
  },
  setup(props: any, { emit }) {
    const shipsStore = useShipsStore();
    const filteredShips = computed(() => shipsStore.filteredShips);
    const shipCardsContainer = ref(null);
    const handleShipSelected = (shipName: string) => {
      emit("focus-on-ship", shipName);
    };
    const scrollToShipCard = (shipName: string) => {
        const cardElement = shipCardsContainer.value?.querySelector(`[shipName="${shipName}"]`);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return {
      filteredShips,
      handleShipSelected,
      scrollToShipCard,
      shipCardsContainer
    };
  },
};
</script>

<style></style>
