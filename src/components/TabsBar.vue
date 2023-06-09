<template>
    <v-tabs class="tabs" v-model="tab" bg-color="secondary">
        <v-tab value="map">
            <v-icon class="mr-2">mdi-map</v-icon>
            Map
        </v-tab>
        <v-tab value="data">
            <v-icon class="mr-2">mdi-table-large</v-icon>
            Data
        </v-tab>
        <v-tab value="charts">
            <v-icon class="mr-2">mdi-chart-bar</v-icon>
            Charts
        </v-tab>
        <v-tab value="export">
            <v-icon class="mr-2">mdi-file-download-outline</v-icon>
            Export
        </v-tab>
    </v-tabs>
    <v-window class="windows" v-model="tab">
        <v-window-item  class="window" value="map">
            <LeafletMap></LeafletMap>
        </v-window-item>
        <v-window-item value="data">
            <RawDataResult></RawDataResult>
        </v-window-item>
        <v-window-item value="charts">
            <ChartResult></ChartResult>
        </v-window-item>
        <v-window-item value="export">
            <ExportResult></ExportResult>
        </v-window-item>
    </v-window>
</template>

<script>
import ChartResult from "@/components/Tabs/ChartResult.vue";
import LeafletMap from "@/components/tabs/LeafletMap.vue";
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";
import ExportResult from "@/components/tabs/ExportResult.vue";
import RawDataResult from "@/components/tabs/RawDataResult.vue";

export default {
    name: "TabsBar",
    data: () => ({
        tab: null,
    }),
    components: {
        RawDataResult,
        ChartResult,
        LeafletMap,
        MeteorologicalParameter,
        PeriodParameter,
        ExportResult
    },
}
</script>

<style scoped>
.tabs {
    position: sticky;
    top: 64px;
    z-index: 999;
}
.windows {
    height: calc(100% - 50px);
}
.window {
    height: calc(100%);
}
</style>
