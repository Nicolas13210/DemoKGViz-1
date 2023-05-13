<template>
  <Bar :data="processData" :options="chartOptions"/>
</template>

<script>
import {Bar} from 'vue-chartjs';
import {Chart, BarElement, LineController, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'

Chart.register(BarElement, LineController, CategoryScale, Title, Tooltip, Legend, PointElement, LinearScale, LineElement);

export default {
  name: "LineChart",
  props: {
    chartData: Object,
    chartAttributes: Object,
  },
  components: {
    Bar
  },
  computed: {
    processData() {
      if (this.$store.getters.getWeather.length === 0) {
        // No data loaded.
        return undefined;
      }
      const labels = this.chartData.find(item => item.attribute === "date").values;
      const datasets = [];
      for (let property of this.chartAttributes) {
        datasets.push({
          label: property.title,
          backgroundColor: property.color,
          data: this.chartData.find(item => item.attribute === property.jsonPath).values,
          type: property.type
        });
      }
      const data2 = {
        labels: labels,
        datasets: datasets
      }
      console.log("lineChart computed:", data2);
      return data2;
    },
    chartOptions() {
      return {
        responsive: true
      };
    }
  }
}
</script>

<style scoped>

</style>
