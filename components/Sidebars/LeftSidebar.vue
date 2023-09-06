<template>
    <div class="fixed top-0 left-0 w-1/5 h-screen bg-black p-4 z-10 text-white">
        <h1 class="font-bold underline pb-2">Ship Table</h1>
        <ul class="space-y-3">
            <ShipCard v-for="ship in filteredShips" :key="ship.properties['Vessel Name']" :shipName="ship.properties['Vessel Name']" :shipType="ship.properties['Vessel Type - Detailed']" :cargo="ship.properties['Product']" :eta="ship.properties['Calculated Eta']" :volume="(ship.properties['Capacity - Gt'].toString())" />
        </ul>
    </div>
</template>

<script lang="ts">
import { useShipsStore } from '@/stores/shipsStore';
import ShipCard from './ShipCard.vue';

    export default {
        name: 'LeftSidebar',
        components: {
        ShipCard
    },
    setup() {
        const shipsStore = useShipsStore();
        const filteredShips = computed(() => shipsStore.filteredShips);
        return {
            filteredShips
        };
    }        
    }
</script>

<style></style>