<script>
import DefaultBarChart from "@/components/DefaultBarChart.vue";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "App",
  components: {
    LeafletMap,
    DefaultBarChart
  }
}
</script>

<template>
  <div class="app">
    <LeafletMap></LeafletMap>
    <DefaultBarChart></DefaultBarChart>
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
