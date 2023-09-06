<template>
    <div class="flex items-center justify-center bg-black">
      <img :src="agroImage" alt="Agro Image" class="w-auto h-10" />
    </div>
  </template>
  
  <script lang="ts">
  import agroImage from '~/assets/agro.png';
  
  export default {
    data() {
      return {
        agroImage
      };
    },
    name: 'HeaderComponent'
  };
  </script>
  