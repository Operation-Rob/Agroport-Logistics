<template>
  <li class="outline cursor-pointer rounded-md bg-gray-950">
    <div class="p-2 pt-1" @click="cardClicked">
      <div>{{ shipName }}</div>
      <div class="italic text-sm">{{ shipType }}</div>
      <div class="text-sm">ETA: {{ eta }}</div>
      <div class="text-sm">Cargo: {{ cargo }}</div>
      <div class="text-sm">Volume: {{ volume }}</div>
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
  methods: {
    cardClicked() {
      this.$emit("ship-selected", this.shipName);
    },
  },
};
</script>

<style></style>
