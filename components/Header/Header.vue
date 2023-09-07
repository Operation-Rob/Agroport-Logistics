<template>
  <div class="flex items-center justify-center bg-black">
    <div
      class="h-5 w-5 bg-white cursor-pointer"
      @click="
        () => {
          emit('left');
        }
      "
    >
      Open left
    </div>
    <img :src="agroImage" alt="Agro Image" class="w-auto h-7 md:h-12" />
    <div
      class="h-5 w-5 bg-white cursor-pointer"
      @click="
        () => {
          emit('right');
        }
      "
    >
      R
  </div>
</template>

<script setup lang="ts">
import agroImage from "~/assets/agro2.png";
const emit = defineEmits(["left","right"]);
</script>
