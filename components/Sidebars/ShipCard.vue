<template>
  <li
    :shipName="shipName"
    class="outline cursor-pointer rounded-md bg-gray-950 flex min-w-full"
  >
    <div class="p-2 pt-1 min-w-full" @click="cardClicked">
      <div>{{ shipName }}</div>
      <div class="italic text-sm">{{ shipType }}</div>
      <div class="text-sm">ETA: {{ eta }}</div>
      <div class="text-sm">Cargo: {{ cargo }}</div>
      <div class="text-sm">Volume: {{ volume }}</div>
      <div class="text-sm">Origin: {{ origin }}</div>
      <div class="text-sm">Destination: {{ destination }}</div>
      <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block bg-al-green hover:bg-[#6ff283] active:bg-[#4fa156] px-2 py-1 rounded mt-2 transition text-sm text-black ease-in-out duration-150"
      >
        MarineTraffic
      </a>
      <div class="pt-2">
        <div class="flex justify-between mb-1">
          <span class="text-base font-medium text-white">Probability</span>
          <span class="text-sm font-medium text-white">{{
            formattedProbability
          }}</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="h-2.5 rounded-full"
            :class="barColor"
            :style="`width: ${formattedProbability}`"
          ></div>
        </div>
      </div>
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
      default: 0.0,
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
    destination: {
      type: String,
      required: true,
      default: "Unknown",
    }
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
  destination: {
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
        backgroundColor: `rgb(${Math.round(red)}, ${Math.round(green)}, 0)`,
      };
    },
    formattedProbability() {
      return (this.probability * 100).toFixed(2) + "%";
    },
    barColor() {
      const probability = Number((this.probability * 100).toFixed(2));
      if (probability < 25) {
        return "bg-green-400";
      } else if (probability < 50) {
        return "bg-yellow-400";
      } else if (probability < 75) {
        return "bg-orange-400";
      } else {
        return "bg-red-400";
      }
    },
    link() {
      return `https://www.marinetraffic.com/en/ais/details/ships/imo:${this.imo}`;
    },
  },
};
</script>

<style></style>
