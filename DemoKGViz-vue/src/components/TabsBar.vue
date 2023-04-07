<template>
  <div>
    <v-tabs v-model="tab" bg-color="secondary">
      <v-tab value="map">
        <v-icon class="mr-2">mdi-map</v-icon>
        Map
      </v-tab>
      <v-tab value="data">
        <v-icon class="mr-2">mdi-database</v-icon>
        Data
      </v-tab>
      <v-tab value="pie-chart">
        <v-icon class="mr-2">mdi-chart-pie-outline</v-icon>
        Pie chart
      </v-tab>
      <v-tab value="line-chart">
        <v-icon class="mr-2">mdi-chart-line</v-icon>
        Line chart
      </v-tab>
      <v-tab value="export"> 
        <v-icon class="mr-2">mdi-export</v-icon>
        Export
      </v-tab>
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
          <D3Chart :data="[{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }, { x: 4, y: 15 }]"
            :line2Data="[{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }, { x: 4, y: 20 }]"
            :line1Data="[{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }, { x: 4, y: 15 }]"></D3Chart>
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
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";
import ExportResult from "@/components/ExportResult.vue";
import D3Chart from "./D3Chart.vue";

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
    D3Chart
  },
}
</script>

<style scoped></style>
