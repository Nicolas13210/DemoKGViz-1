<script>
import MeteorologicalParameter from "@/components/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/PeriodParameter.vue";
import ExportResult from "@/components/ExportResult.vue";

import DefaultBarChart from "@/components/DefaultBarChart.vue";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
    name: "App",
    components: {
        LeafletMap,
        MeteorologicalParameter,
        PeriodParameter,
        ExportResult,
        DefaultBarChart,
    }
}
</script>

<template>
    <div class="app">
        <LeafletMap></LeafletMap>
        <MeteorologicalParameter></MeteorologicalParameter>
        <PeriodParameter></PeriodParameter>
        <ExportResult></ExportResult>
        <DefaultBarChart></DefaultBarChart>
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
