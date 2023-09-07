<template>
    <div class="fixed top-0 right-0 w-1/5 h-screen bg-black pr-0 py-2 pl-2 z-10 text-white">
        <h1 class="font-bold underline pb-2 pl-2 text-lg">Filters</h1>
        <div class="space-y-1">
        <div>
            Cargo:
            <select v-model="product" class="bg-gray-200 text-black px-1 rounded absolute right-2 border-2 border-gray-600 w-36">
                <option>All</option>
                <option>Urea</option>
                <option>Fertiliser 2</option>
                <option>Fertiliser 3</option>
            </select>
        </div>
        <div>
            Country:
            <select v-model="country" class="bg-gray-200 text-black px-1 rounded absolute right-2 border-2 border-gray-600 w-36">
                <option>All</option>
                <option>Indonesia</option>
                <option>China</option>
                <option>South Korea</option>
            </select>
        </div>
        </div>
        <button class="bg-al-green hover:bg-[#6ff283] active:bg-[#4fa156] px-2 rounded text-black font-bold absolute right-3 bottom-[40px]">Export</button>
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useShipsStore } from '@/stores/shipsStore';

type CountryCodeMapping = {
    [key: string]: string | null;
};

type ProductMapping = {
    [key: string]: string | null;
};

const countryCodeMapping: CountryCodeMapping = {
    "All": null,
    "Indonesia": "IN",
    "China": "CN",
    "South Korea": "KR", // not sure about this one, but maybe we just don't have any data for it?
};

const productMapping: ProductMapping = {
    "All": null,
    "Urea": "Urea",
    "Fertiliser 2": "FERTILISER2",
    "Fertiliser 3": "FERTILISER3",
};

export default {
    name: 'RightSidebar',
    setup() {
        const product = ref('All');
        const country = ref('All');
        const shipsStore = useShipsStore();
        
        console.log(shipsStore);

        watch(product, (newCargoValue) => {
            const mappedProduct = productMapping[newCargoValue];
            shipsStore.setFilters('product', mappedProduct);
        });

        watch(country, (newCountryValue) => {
            const countryCode = countryCodeMapping[newCountryValue];
            shipsStore.setFilters('origin', countryCode);
        });

        return {
            product,
            country
        };
    }
}
</script>

<style></style>