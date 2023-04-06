<script>
import MeteorologicalParameter from "@/components/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/PeriodParameter.vue";
import ExportResult from "@/components/ExportResult.vue";


import LeafletMap from "@/components/LeafletMap.vue";
import ChartResult from "@/components/ChartResult.vue";
import SideBar from "@/components/sideBar/SideBar.vue";

export default {
    name: "App",
    components: {
        SideBar,
        ChartResult,
        LeafletMap,
        MeteorologicalParameter,
        PeriodParameter,
        ExportResult,
    },
    created() {
        this.$store.dispatch("setStationsApi");
    },
}
</script>

<template>
    <v-card>
        <v-layout>
            <v-app-bar title="WeKG-MF-based Agrometeorological Parameters Computing and Visualisation"></v-app-bar>

            <v-navigation-drawer>
                <SideBar></SideBar>
            </v-navigation-drawer>

            <v-main style="min-height: 300px;">
                <LeafletMap></LeafletMap>
                <MeteorologicalParameter></MeteorologicalParameter>
                <PeriodParameter></PeriodParameter>
                <ExportResult></ExportResult>
                <ChartResult></ChartResult>
            </v-main>
        </v-layout>
    </v-card>
</template>

// global styles
<style>
body {
    margin: 0;
    padding: 0;
}
</style>

<style scoped>

</style>
