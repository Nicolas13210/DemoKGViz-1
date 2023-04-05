<script>
import MeteorologicalParameter from "@/components/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/PeriodParameter.vue";
import ExportResult from "@/components/ExportResult.vue";


import LeafletMap from "@/components/LeafletMap.vue";
import ChartResult from "@/components/ChartResult.vue";

export default {
    name: "App",
    components: {
      ChartResult,
        LeafletMap,
        MeteorologicalParameter,
        PeriodParameter,
        ExportResult,
    }
}
</script>

<template>
    <div class="app">
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
  padding: 30px;
}
</style>
