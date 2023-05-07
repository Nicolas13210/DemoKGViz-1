<template>
    <div id="visualisation">
        <div class="groupVisualisation">
            <LineChart></LineChart>
        </div>
    </div>
</template>

<script>
import LineChart from "@/components/tabs/charts/LineChart.vue";

export default {
    name: "ChartResult",
    components: {
        LineChart,
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
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}
</style>
