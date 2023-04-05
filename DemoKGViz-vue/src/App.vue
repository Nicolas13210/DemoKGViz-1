<script>
import MeteorologicalParameter from "@/components/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/PeriodParameter.vue";
import ExportResult from "@/components/ExportResult.vue";

export default {
  name: "App",
    components: {ExportResult, PeriodParameter, MeteorologicalParameter}
}
</script>

<template>
  <MeteorologicalParameter></MeteorologicalParameter>
  <PeriodParameter></PeriodParameter>
  <ExportResult></ExportResult>
</template>

<style scoped>

</style>
