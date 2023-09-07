<template>
  <div class="flex items-center justify-around bg-black">
    <div
      class="md:invisible cursor-pointer border-none rounded-lg bg-zinc-800 p-1"
      @click="
        () => {
          emit('left');
        }
      "
    >
      <svg-icon
        type="mdi"
        :path="mdiFerry"
        class="text-white"
        size="32"
      ></svg-icon>
    </div>
    <img
      :src="agroImage"
      alt="Agro Image"
      class="w-60 h-10 md:w-auto md:h-12"
    />
    <div
      class="md:invisible cursor-pointer border-none rounded-lg bg-zinc-800 p-1"
      @click="
        () => {
          emit('right');
        }
      "
    >
      <svg-icon
        type="mdi"
        :path="mdiTune"
        class="text-white"
        size="32"
      ></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import agroImage from "~/assets/agro2.png";
const emit = defineEmits(["left", "right"]);
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFerry, mdiTune } from "@mdi/js";
</script>
