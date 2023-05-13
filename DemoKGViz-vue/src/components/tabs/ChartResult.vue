<template>
  <div id="visualisation">
    <div class="groupVisualisation">
      <ComboChart v-if="getWeather !== undefined" :chartData="getWeather"></ComboChart>
      <PolarChart v-if="getWeather !== undefined" :chartData="getWeather"></PolarChart>
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
      return this.$store.getters.getWeather.result;
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
