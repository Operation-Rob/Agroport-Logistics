<template>
    <div class="fixed top-0 left-0 w-1/5 h-screen bg-black p-4 z-10 text-white">
        <h1>Ship Table</h1>
        <ul>
            <ShipCard v-for="ship in filteredShips" :key="ship.name" :shipName="ship.name" />
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
                filteredShips: [{ name: 'Ship 1' },{ name: 'Ship 2' }]
            }
        }
    }
</script>

<style></style>