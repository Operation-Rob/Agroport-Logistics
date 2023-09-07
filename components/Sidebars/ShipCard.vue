<template>
  <li :shipName="shipName" class="outline cursor-pointer rounded-md bg-gray-950 flex">
    <!-- Left half of the card -->
    <div class="p-2 pt-1 w-1/2" @click="cardClicked">
      <div>{{ shipName }}</div>
      <div class="italic text-sm">{{ shipType }}</div>
      <div class="text-sm">ETA: {{ eta }}</div>
      <div class="text-sm">Cargo: {{ cargo }}</div>
      <div class="text-sm">Volume: {{ volume }}</div>
      <div class="text-sm">Origin: {{ origin }}</div>
      <a :href="link" target="_blank" rel="noopener noreferrer" class="inline-block bg-al-green hover:bg-[#6ff283] active:bg-[#4fa156] px-4 py-2 rounded mt-2 transition ease-in-out duration-150">
        MarineTraffic
      </a>
    </div>

    <!-- Right half of the card -->
    <div :style="probabilityStyle" class="w-1/2 flex items-center justify-center">
      <div class="text-4xl">{{ formattedProbability }}</div>
    </div>
  </li>
</template>

<script lang="ts">
export default {
  name: "ShipCard",
  props: {
    shipName: {
      type: String,
      required: true,
    },
    shipType: {
      type: String,
      required: true,
    },
    eta: {
      type: String,
      required: true,
      default: "N/A",
    },
    cargo: {
      type: String,
      required: true,
      default: "N/A",
    },
    volume: {
      type: String,
      required: true,
    },
    probability: {
      type: Number,
      required: true,
      default: 0.0
    },
    origin: {
      type: String,
      required: true,
      default: "Unknown",
    },
    imo: {
      type: String,
      required: true,
      default: "Unknown",
    },
  },
  shipType: {
    type: String,
    required: true,
  },
  eta: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  imo: {
    type: String,
    required: true,
  },
  methods: {
    cardClicked() {
      this.$emit("ship-selected", this.shipName);
    },
  },

  computed: {
    probabilityStyle() {
      const dimFactor = 0.8;

      let red = (1 - this.probability) * 255 * dimFactor;
      let green = this.probability * 255 * dimFactor;
      
      
      return {
        backgroundColor: `rgb(${Math.round(red)}, ${Math.round(green)}, 0)`
      };
    },
    formattedProbability() {
      return (this.probability * 100).toFixed(2) + '%';
    },
    link() {
      return `https://www.marinetraffic.com/en/ais/details/ships/imo:${this.imo}`;
    }
  }
};
</script>

<style></style>
