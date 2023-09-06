<template>
    <div class="flex items-center justify-center bg-black">
      <img :src="agroImage" alt="Agro Image" class="w-auto h-12" />
    </div>
  </template>
  
  <script lang="ts">
  import agroImage from '~/assets/agro2.png';
  
  export default {
    data() {
      return {
        agroImage
      };
    },
    name: 'HeaderComponent'
  };
  </script>
  