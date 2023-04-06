<template>
  <div id="visualisation">
    <div class="groupVisualisation">
      <DefaultBarChart></DefaultBarChart>
    </div>
  </div>
</template>

<script>


import DefaultBarChart from "@/components/charts/DefaultBarChart.vue";

export default {
  name: "ChartResult",
  components: {
    DefaultBarChart
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