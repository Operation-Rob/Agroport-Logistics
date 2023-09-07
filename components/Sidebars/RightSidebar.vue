<template>
  <div
    class="fixed top-0 right-0 h-screen bg-black pl-2 py-2 pr-1 z-10 text-white space-y-3"
  >
    <div class="outline rounded-md bg-gray-950 p-2 pt-1">
      <h1 class="font-bold underline pb-2 pl-2 text-lg">Filters</h1>
      <div class="space-y-1">
        <div class="text-sm">
          Cargo:
          <select
            v-model="product"
            class="bg-gray-200 text-black text-sm px-1 rounded absolute right-2 border-2 border-gray-600 w-36"
          >
            <option>All</option>
            <option>Urea</option>
            <option>UAN</option>
            <option>MOP</option>
          </select>
        </div>
        <div class="text-sm">
          Origin Country:
          <select
            v-model="originCountry"
            class="bg-gray-200 text-black text-sm px-1 rounded absolute right-2 border-2 border-gray-600 w-36"
          >
            <option>All</option>
            <option>Russia</option>
            <option>Qatar</option>
            <option>Saudi Arabia</option>
            <option>Bahrain</option>
            <option>Trinidad & Tobago</option>
            <option>Indonesia</option>
            <option>Malaysia</option>
            <option>Jordan</option>
          </select>
        </div>
        <div class="text-sm">
          Dest. Country:
          <select
            v-model="destCountry"
            class="bg-gray-200 text-black px-1 text-sm rounded absolute right-2 border-2 border-gray-600 w-36"
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
        <div class="text-sm" v-if="destCountry=='All'||destCountry=='Australia'">
          Dest. Port:
          <select
            v-model="destPort"
            class="bg-gray-200 text-black px-1 text-sm rounded absolute right-2 border-2 border-gray-600 w-36"
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
      </div>
    </div>
    <div class="outline rounded-md bg-gray-950 p-2 pt-1">
      <h1 class="font-bold underline pb-2 pl-2 text-base">Projected Incoming Fertiliser</h1>
      <svg ref="svgRef" width="300" height="150"></svg>
    </div>
    <button
      class="bg-al-green hover:bg-[#6ff283] active:bg-[#4fa156] px-2 rounded text-black font-bold absolute right-3 bottom-[40px]"
    >
      Export
    </button>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { useShipsStore } from "@/stores/shipsStore";
import * as d3 from "d3";

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
    name: 'RightSidebar',
    setup() {
        const product = ref('All');
        const originCountry = ref('All');
        const destCountry = ref('All');
        const destPort = ref('All');
        const shipsStore = useShipsStore();

    watch(product, (newCargoValue) => {
      const mappedProduct = productMapping[newCargoValue];
      shipsStore.setFilters("product", mappedProduct);
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
      shipsStore.setFilters("destPort", newDestPortValue==='All'?null:newDestPortValue.toUpperCase());
    });

    // d3 stuff
    const svgRef = ref(null);

    onMounted(() => {
      drawBarGraph();
    });

    function drawBarGraph() {
    const data = [4, 8, 15, 16, 23, 42, 54, 67];

    const svg = d3.select(svgRef.value);
    const width = 250;
    const height = 150;
    const barWidth = width / data.length;

    const y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height-2, 2]);

    const bar = svg.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", (d: any, i: any) => `translate(${i * barWidth},0)`);

    bar.append("rect")
        .attr("y", d => y(d))
        .attr("width", barWidth - 1)
        .attr("height", d => height - y(d)-2)
        .attr("fill", "#64DD77");

    const x = d3.scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([0, width])
        .padding(0.1);

    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).tickFormat((d:any) => {return d;}).ticks(5);

    const yAxisG = svg.append("g")
        .attr("class", "y-axis")
        .style("stroke-width", 4)
        .call(yAxis);

    yAxisG.selectAll("text")
        .style("fill", "white");

    yAxisG.selectAll("line, path")
        .style("stroke", "white")
        .style("stroke-width", 4);

    const xAxisG = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .style("stroke-width", 6)
        .call(xAxis);

    xAxisG.selectAll("text")
        .style("fill", "white");

    xAxisG.selectAll("line, path")
        .style("stroke", "white")
        .style("stroke-width", 6);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("fill", "white")
        .style("text-anchor", "middle")
        .text("Volume");
    }



    return {
      product,
      originCountry,
      destCountry,
      destPort,
      svgRef
    };
  },
};
</script>

<style></style>
