<script>
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import TabsBar from "@/components/TabsBar.vue";
import SideBar from "@/components/sideBar/SideBar.vue";
import {buildQuery_tmpRainStation} from "@/queries/queries";


export default {
    name: "App",
    components: {
        SideBar,
        TabsBar,
        MeteorologicalParameter,
    },
    created() {
        // Retrieve the stations.
        this.$store.dispatch("setStationsApi");

/*
TODO: TO REMOVE
        // Retrieve any relevant changes to update the data tab and charts tab.
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'setSelectedStations') {
                // Subscribe to any change on the stations selected.
                this.drawCharts();
            } else if (mutation.type === 'pushParameter' && this.$store.getters.getSelectedStations.length > 0) {
                // Subscribe to any change on the parameters selected.
                // TODO: maybe this is not the right method because we can maybe receive already all the data from the backend when we select a station.
                this.drawCharts();
            } else if (mutation.type === 'cleanParameters') {
                // TODO: maybe clear the charts.
            } else if (mutation.type === 'setStartDate' || mutation.type === 'setEndDate') {
                // Subscribe to any change on the period parameter.
                this.drawCharts();
            }
        });
 */

    }
}
</script>

<template>
    <div class="app">
        <v-card>
            <v-app>
                <v-app-bar title="WeKG-MF-based Agrometeorological Parameters Computing and Visualisation"
                           color="primary"></v-app-bar>
                <v-navigation-drawer :permanent="true" :width="400">
                    <SideBar></SideBar>
                </v-navigation-drawer>
                <v-main style="min-height: 300px;">
                    <TabsBar></TabsBar>
                </v-main>
            </v-app>
        </v-card>
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
}
</style>
