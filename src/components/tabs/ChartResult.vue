<template>
    <div v-if="getStationsLength === 0 || getStationsParameters === 0">
        <v-alert type="info" title="Information" text="Please select at least one station and one parameter to show any chart."
            variant="tonal"></v-alert>
    </div>
    <div id="visualisation">
        <div class="groupVisualisation">
            <ComboChart v-if="getWeather.length > 0" :chartData="getWeather"></ComboChart>
            <BarChart v-if="getWeatherNbDay !== undefined" :chartData="getWeatherNbDay"></BarChart>
        </div>
    </div>
</template>

<script>
import ComboChart from "@/components/tabs/charts/ComboChart.vue";
import BarChart from "@/components/tabs/charts/BarChart.vue";


export default {
    name: "ChartResult",
    components: {
        ComboChart,
        BarChart,
    },
    computed: {
        getWeather() {
            return this.$store.getters.getRawWeather;
        },
        getWeatherNbDay() {
            return this.$store.getters.getWeatherNbDay?.result;

        },
        getStationsLength() {
            return this.$store.getters.getSelectedStations.length;
        },
        getStationsParameters() {
            return this.$store.getters.getParameters.length
        },
    }
}
</script>

<style scoped>
div#visualisation {
    margin-top: 20px;
}

div.groupVisualisation {
    /* Centrer les boutons au center de la page */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}
</style>
