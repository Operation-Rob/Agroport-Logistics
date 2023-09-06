<template>
    <div class="fixed top-0 right-0 w-1/5 h-screen bg-black pr-0 py-2 pl-2 z-10 text-white">
        <h1 class="font-bold underline pb-2 pl-2 text-lg">Filters</h1>
        <div>

        </div>
        <button class="bg-al-green hover:bg-[#6ff283] active:bg-[#4fa156] px-2 rounded text-black font-bold absolute right-3 bottom-[40px]">Export</button>
    </div>
</template>

<script lang="ts">
import { useShipsStore } from '@/stores/shipsStore';

export default {
    name: 'RightSidebar'
}
</script>

<style></style>