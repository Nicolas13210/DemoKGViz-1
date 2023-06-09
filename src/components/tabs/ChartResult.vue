<template>
    <div v-if="getStationsLength === 0 || getStationsParameters === 0">
        <v-alert type="info" title="Information" text="Please select at least one station and one parameter to show any chart."
            variant="tonal"></v-alert>
    </div>
    <div id="visualisation">
        <div class="groupVisualisation">
            <ComboChart v-if="getWeather.length > 0" :chartData="getWeather"></ComboChart>
            <PolarChart v-if="getAggregate !== undefined" :chartData="getAggregate"></PolarChart>
        </div>
    </div>
</template>

<script>
import ComboChart from "@/components/tabs/charts/ComboChart.vue";
import PolarChart from "@/components/tabs/charts/PolarChart.vue";

export default {
    name: "ChartResult",
    components: {
        ComboChart,
        PolarChart
    },
    computed: {
        getWeather() {
            return this.$store.getters.getWeather;
        },
        getAggregate() {
            return this.$store.getters.getAggregate;
        },
        getStationsLength() {
            return this.$store.getters.getSelectedStations.length;
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
