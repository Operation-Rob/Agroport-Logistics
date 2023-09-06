<template>
    <div class="fixed top-0 left-0 w-1/5 h-screen bg-black p-4 z-10 text-white">
        <h1 class="font-bold underline pb-2">Ship Table</h1>
        <ul class="space-y-3">
            <ShipCard v-for="ship in filteredShips" :key="ship.name" :shipName="ship.name" :shipType="ship.type" :cargo="ship.cargo" :eta="ship.eta" :volume="ship.volume" />
        </ul>
    </div>
</template>

<script lang="ts">
import ShipCard from './ShipCard.vue';
    export default {
        name: 'LeftSidebar',
        components: {
        ShipCard
    },
        data() {
            return {
                filteredShips: [{ name: 'Ship 1', type: 'Bulk Carrier', cargo: 'Ammonia', eta: '08/09/2023 12:35', volume: '5MT' },{ name: 'Ship 2', type: 'Bulk Carrier', cargo: 'Ammonia', eta: '08/09/2023 12:35', volume: '10MT' }]
            }
        }
    }
</script>

<style></style>