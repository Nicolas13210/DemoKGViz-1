<template>
  <div id="visualisation">
    <h2>Visualisations</h2>
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
h2 {
  text-align: center;
  padding: 25px;
  margin-bottom: 0;
  background-color: lightblue;
  border-radius: 15px;
  margin-top: 0;
}

div#visualisation {
  border: black solid 1px;
  margin-top: 20px;
  border-radius: 15px;
}

div.groupVisualisation {
  /* Centrer les boutons au center de la page */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}
</style>