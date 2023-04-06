<script>
import MeteorologicalParameter from "@/components/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/PeriodParameter.vue";
import ExportResult from "@/components/ExportResult.vue";


import LeafletMap from "@/components/LeafletMap.vue";
import ChartResult from "@/components/ChartResult.vue";
import D3Chart from "@/components/D3Chart.vue";

export default {
    name: "App",
    components: {
      ChartResult,
        LeafletMap,
        MeteorologicalParameter,
        PeriodParameter,
        ExportResult,
        D3Chart
    },
  created() {
    this.$store.dispatch("setStationsApi");
  },
}
</script>

<template>
  <div class="app">
    <h1 class="app-title">
      WeKG-MF-based Agrometeorological Parameters Computing and Visualisation
    </h1>

    <D3Chart></D3Chart>
    <LeafletMap></LeafletMap>
    <MeteorologicalParameter></MeteorologicalParameter>
    <PeriodParameter></PeriodParameter>
    <ExportResult></ExportResult>
    <ChartResult></ChartResult>
  </div>
</template>

// global styles
<style>
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  padding: 0 30px 30px 30px;
}

.app-title {
  text-align: center;
  background-color: rgb(75, 125, 190);
  border-radius: 15px;
  padding: 20px ;
  color: white;
}
</style>
