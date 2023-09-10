<template>
  <title>Agroport Logistics</title>
  <div v-if="continued" class="h-screen flex flex-col overflow-hidden">
    <Header
      @left="
        () => {
          leftSidebarOpen = true;
        }
      "
      @right="
        () => {
          rightSidebarOpen = true;
        }
      "
      class="h-[10%]"
    />

    <main class="h-[90%] overflow-y-hidden">
      <LeftSidebar
        v-on-click-outside="
          () => {
            leftSidebarOpen = false;
          }
        "
        class="z-50 md:-translate-x-0 md:w-1/5 transition-transform w-2/3"
        :class="{ '-translate-x-full': !leftSidebarOpen }"
        ref="leftSidebarRef"
        @focus-on-ship="focusOnShip"
      />

      <RightSidebar
        v-on-click-outside="
          () => {
            rightSidebarOpen = false;
          }
        "
        class="z-50 md:translate-x-0 md:w-1/5 transition-transform w-2/3"
        :class="{ 'translate-x-full': !rightSidebarOpen }"
      />
      <MapboxComponent
        ref="mapboxRef"
        class="w-full h-screen"
        @ship-marker-clicked="handleMarkerClick"
      />
    </main>
    <Footer class="h-[5%] z-20" />
  </div>
  <div v-else class="flex h-screen items-center bg-gray-950 text-white">
    <div>
      <h1 class="text-3xl text-center font-bold">Thank you for participating in our demo!</h1>
      <p class="text-center">If you liked it, feel free to contact us using any of the methods listed below:</p>
      <br/>
      <div>
        <ul class="flex flex-wrap w-screen justify-center gap-10 w-screen">
          <li v-for="member in members" class="flex flex-col rounded border-white border-2 w-40">
            <img class="rounded-full border-white border-[1px] mx-6 mb-1 mt-2" :src="member.image" />
            <h1 class="font-bold text-center">{{ member.name }}</h1>
            <div class="flex justify-center pb-2">
              <a v-if="member.email" :href="`mailto:${member.email}`">
                <svg-icon
                type="mdi"
                :path="mdiEmail"
                size="26"
                ></svg-icon>
              </a>
              <a v-if="member.linkedin" :href="`https://www.linkedin.com/in/${member.linkedin}/`">
                <svg-icon
                type="mdi"
                :path="mdiLinkedin"
                size="26"
                ></svg-icon>
              </a>
              <a v-if="member.github" :href="`https://www.github.com/${member.github}/`">
                <svg-icon
                type="mdi"
                :path="mdiGithub"
                size="26"
                ></svg-icon>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <br/><br/>
      <div class="flex flex-col gap-1">
        <p class="text-center">Still want to play around?</p>
        <div class="flex justify-center">
          <button @click="continueToDemo()" class="rounded border-white border-2 px-1 hover:border-blue-600 hover:text-blue-500">
            Continue to demo... &raquo;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MapboxComponent from "../components/Mapbox/Mapbox.vue";
import LeftSidebar from "../components/Sidebars/LeftSidebar.vue";
import RightSidebar from "../components/Sidebars/RightSidebar.vue";
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
import { vOnClickOutside } from "@vueuse/components";

import SvgIcon from "@jamescoyle/vue-icon";
import { mdiEmail, mdiLinkedin, mdiGithub } from "@mdi/js";

import conorImage from "~/assets/conor.jpg";
import michaelImage from "~/assets/michael.jpg";
import tristanImage from "~/assets/tristan.jpg";
import nickImage from "~/assets/nick.jpg";
import karamImage from "~/assets/karam.jpg";
import jordanImage from "~/assets/jordan.jpg";

const leftSidebarOpen = ref(false);
const rightSidebarOpen = ref(false);

const continued = ref(false);

const mapboxRef = ref(null);
const leftSidebarRef = ref(null);

const members = ref([
  {name: "Conor Bennett", image: conorImage, linkedin: "cjnbennett", email: "conor.jn.bennett@gmail.com", github: "cjnbennett"},
  {name: "Michael Nefiodovas", image: michaelImage, linkedin: "michael-nef", email: "michael@nef.net.au", github: "MouseAndKeyboard"},
  {name: "Tristan Robertson", image: tristanImage, linkedin: "tristan-robertson-16bb33280", email: "everyusernameistaken25@gmail.com", github: "Scrumptious13"},
  {name: "Nicholas Michlin", image: nickImage, linkedin: "nicholas-michlin-714a74207", email: "nicholas.hy.michlin@gmail.com", github: "nicodeas"},
  {name: "Karam Thethy", image: karamImage, linkedin: "karam-thethy", email: "thethyka@gmail.com", github: "thethyka"},
  {name: "Jordan Fisker", image: jordanImage, linkedin: "jordan-fisker-78b597230", email: "jordanfisker@outlook.com", github: "otta8634"}
]);

const focusOnShip = (shipname) => {
  mapboxRef.value.zoomToShip(shipname);
  leftSidebarOpen.value = false;
};
const handleMarkerClick = (shipName) => {
  leftSidebarOpen.value = true;
  leftSidebarRef.value.scrollToShipCard(shipName);
};

const continueToDemo = () => {
  continued.value = true;
};
</script>
