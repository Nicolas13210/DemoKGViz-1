<template>
    <div>
        <v-tabs v-model="tab"
                bg-color="secondary">
          <v-tab value="map">Map</v-tab>
          <v-tab value="data">Data</v-tab>
          <v-tab value="pie-chart">Pie chart</v-tab>
          <v-tab value="line-chart">Line chart</v-tab>
          <v-tab value="export">Export</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="map">
              <LeafletMap></LeafletMap>
            </v-window-item>
            <v-window-item value="data">
              TODO
            </v-window-item>
            <v-window-item value="pie-chart">
              <ChartResult></ChartResult>
            </v-window-item>
            <v-window-item value="line-chart">
              <ChartResult></ChartResult>
            </v-window-item>
            <v-window-item value="export">
              <ExportResult></ExportResult>
            </v-window-item>
          </v-window>
        </v-card-text>
    </div>
</template>

<script>
import ChartResult from "@/components/Tabs/ChartResult.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import MeteorologicalParameter from "@/components/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/PeriodParameter.vue";
import ExportResult from "@/components/ExportResult.vue";

export default {
  name: "TabsBar",
  data: () => ({
    tab: null,
  }),
  components: {
    ChartResult,
    LeafletMap,
    MeteorologicalParameter,
    PeriodParameter,
    ExportResult,
  },
}
</script>

<style scoped>
</style>