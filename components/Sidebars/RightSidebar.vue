<template>
  <div
    class="fixed top-0 right-0 h-screen bg-black pl-2 py-2 pr-1 z-10 text-white space-y-3"
  >
    <div class="outline rounded-md bg-gray-950 p-2 pt-1">
      <h1 class="font-bold underline pb-2 pl-2 text-lg">Filters</h1>
      <div class="space-y-1">
        <div class="text-sm pb-2">
          Select Cargo
          <select
            v-model="product"
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option>All</option>
            <option>Urea</option>
            <option>UAN</option>
            <option>MOP</option>
          </select>
        </div>
        <div class="text-sm pb-2">
          Select Origin Country
          <select
            v-model="originCountry"
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option>All</option>
            <option>Russia</option>
            <option>Qatar</option>
            <option>Saudi Arabia</option>
            <option>United Arab Emirates</option>
            <option>Bahrain</option>
            <option>Trinidad & Tobago</option>
            <option>Indonesia</option>
            <option>Malaysia</option>
            <option>Jordan</option>
          </select>
        </div>

        <div class="text-sm pb-2">
          Select Destination Country
          <select
            v-model="destCountry"
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option>All</option>
            <option>Australia</option>
            <option>Turkey</option>
            <option>Spain</option>
            <option>Israel</option>
            <option>Libya</option>
            <option>Bangladesh</option>
            <option>Algeria</option>
            <option>China</option>
            <option>United Arab Emirates</option>
            <option>South Africa</option>
            <option>Brazil</option>
            <option>Indonesia</option>
            <option>Egypt</option>
            <option>United States of America</option>
            <option>Tunisia</option>
            <option>Mexico</option>
            <option>Greece</option>
            <option>Russia</option>
            <option>Pakistan</option>
            <option>Singapore</option>
            <option>Saudi Arabia</option>
            <option>Yemen</option>
            <option>Oman</option>
            <option>Iraq</option>
            <option>Kenya</option>
            <option>Venezuela</option>
            <option>Tanzania</option>
            <option>Italy</option>
            <option>Trinidad & Tobago</option>
            <option>Chile</option>
            <option>Phillipines</option>
            <option>Japan</option>
            <option>Thailand</option>
            <option>India</option>
            <option>Canada</option>
          </select>
        </div>
        <div
          class="text-sm"
          v-if="destCountry == 'All' || destCountry == 'Australia'"
        >
          Select Destination Port
          <select
            v-model="destPort"
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option>All</option>
            <option>Fremantle</option>
            <option>Kwinana</option>
            <option>Bunbury</option>
            <option>Albany</option>
            <option>Esperance</option>
            <option>Geraldton</option>
          </select>
        </div>
        <div class="text-sm pb-2">
          Select Vessel Type
          <select
            v-model="vesselType"
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option>All</option>
            <option>Bulk Carrier</option>
            <option>Oil/Chemical Tanker</option>
          </select>
        </div>
        <div>
          <button
            class="bg-green-400 w-full text-black font-bold border border-none rounded-md"
            @click="resetFilters"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
    <div class="outline rounded-md bg-gray-950 p-2 pt-1">
      <h1 class="font-bold underline pb-2 pl-2 text-base">
        Projected Incoming Fertiliser
      </h1>
      <img src="@/assets/graph.png" />
    </div>
    <div class="pr-4 w-full absolute bottom-9">
      <button
        class="bg-al-green hover:bg-[#6ff283] active:bg-[#4fa156] pl-2 rounded w-full text-black font-bold"
      >
        Export
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { useShipsStore } from "@/stores/shipsStore";

type CountryCodeMapping = {
  [key: string]: string | null;
};

type ProductMapping = {
  [key: string]: string | null;
};

const countryCodeMapping: CountryCodeMapping = {
  All: null,
  Russia: "RU",
  Qatar: "QA",
  Bahrain: "BH",
  "Trinidad & Tobago": "TT",
  Indonesia: "ID",
  Malaysia: "MY",
  Jordan: "JO",
  Australia: "AU",
  Turkey: "TR",
  Spain: "ES",
  Israel: "IL",
  Libya: "LY",
  Bangladesh: "BD",
  Algeria: "DZ",
  China: "CN",
  "United Arab Emirates": "AE",
  "South Africa": "ZA",
  Brazil: "BR",
  Egypt: "EG",
  "United States of America": "US",
  Tunisia: "TN",
  Mexico: "MX",
  Greece: "GR",
  Pakistan: "PK",
  Singapore: "SG",
  "Saudi Arabia": "SA",
  Yemen: "YE",
  Oman: "OM",
  Iraq: "IQ",
  Kenya: "KE",
  Venezuela: "VE",
  Tanzania: "TZ",
  Italy: "IT",
  Chile: "CL",
  Phillipines: "PH",
  Japan: "JP",
  Thailand: "TH",
  India: "ID",
  Canada: "CA",
};

const productMapping: ProductMapping = {
  All: null,
  Urea: "Urea",
  UAN: "UAN",
  MOP: "MOP",
};

export default {
  name: "RightSidebar",
  setup() {
    const product = ref("All");
    const originCountry = ref("All");
    const destCountry = ref("All");
    const destPort = ref("All");
    const vesselType = ref("All");
    const shipsStore = useShipsStore();

    console.log(shipsStore);

    watch(product, (newCargoValue) => {
      const mappedProduct = productMapping[newCargoValue];
      if (mappedProduct === "UAN") {
        shipsStore.setFilters("vesselType", "Oil/Chemical Tanker");
      }
      if (mappedProduct === "Urea" || mappedProduct === "MOP") {
        shipsStore.setFilters("vesselType", "Bulk Carrier");
      }
      //shipsStore.setFilters("product", mappedProduct);
    });

    watch(originCountry, (newOriginCountryValue) => {
      const countryCode = countryCodeMapping[newOriginCountryValue];
      shipsStore.setFilters("origin", countryCode);
    });

    watch(destCountry, (newDestCountryValue) => {
      const countryCode = countryCodeMapping[newDestCountryValue];
      shipsStore.setFilters("dest", countryCode);
    });

    watch(destPort, (newDestPortValue) => {
      shipsStore.setFilters(
        "destPort",
        newDestPortValue === "All" ? null : newDestPortValue.toUpperCase()
      );
    });

    watch(vesselType, (newVesselTypeValue) => {
      shipsStore.setFilters(
        "vesselType",
        newVesselTypeValue === "All" ? null : newVesselTypeValue
      );
    });

    return {
      product,
      originCountry,
      destCountry,
      destPort,
      vesselType,
    };
  },
  methods: {
    resetFilters() {
      this.product = "All";
      this.originCountry = "All";
      this.destCountry = "All";
      this.destPort = "All";
      this.vesselType = "All";
    },
  },
};
</script>

<style></style>
