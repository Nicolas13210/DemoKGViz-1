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

        // Retrieve any relevant changes to update the data tab and charts tab.
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'setSelectedStations') {
                // Subscribe to any change on the stations selected.
                this.drawCharts();
            } else if (mutation.type === 'pushParameter' && this.$store.getters.getSelectedStations.length > 0) {
                // Subscribe to any change on the parameters selected.
                // TODO: maybe this is not the right method because we can maybe received already all the data from the backend when we select a station.
                this.drawCharts();
            } else if (mutation.type === 'cleanParameters') {
                // TODO: maybe clear the charts.
            } else if (mutation.type === 'setStartDate' || mutation.type === 'setEndDate') {
                // Subscribe to any change on the period parameter.
                this.drawCharts();
            }
        });
    },
    methods: {
        convertDateToYearMonthDay(date) {
            const year = date.getFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        drawCharts() {
            const selectedStations = (this.$store.getters.getSelectedStations).map(station => station.stationName.value);

            // FIXME: The following "IF" is temporarily used to not stress the back-end server during our tests. So the for-loop will always loop on one station.
            if (selectedStations.length === 1) {
                // Draw charts according to the removed/added stations.
                const startDate = this.convertDateToYearMonthDay(this.$store.getters.getStartDate);
                const endDate = this.convertDateToYearMonthDay(this.$store.getters.getEndDate);

                for (const selectedStation of selectedStations) {
                    this.$store.dispatch("fetchWeatherData", buildQuery_tmpRainStation(selectedStation, startDate, endDate));
                }
            }
        }
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
