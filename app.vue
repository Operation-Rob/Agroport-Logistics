
<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <Header class="h-[10%]" />
    <main class="h-[90%] overflow-y-auto">
      <MapboxComponent class="w-full h-screen" />
    </main>
    <Footer class="h-[5%]" />
  </div>
</template>

<script lang="ts">
import MapboxComponent from '../components/Mapbox/Mapbox.vue'
import LeftSidebar from '../components/Sidebars/LeftSidebar.vue'
import RightSidebar from '../components/Sidebars/RightSidebar.vue'
import Header from '../components/Header/Header.vue'
import Footer from '../components/Footer/Footer.vue'

export default {
  components: {
    MapboxComponent,
    LeftSidebar,
    RightSidebar,
    Header,
    Footer
  }
}
</script>