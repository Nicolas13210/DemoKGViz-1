<template>
    <Line :data="processData" :options="chartOptions"/>
</template>

<script>
import {Line} from 'vue-chartjs'
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement)

export default {
  name: "LineChart",
  props: {
    chartData: Object,
    chartAttributes: Object,
  },
  components: {
    Line
  },
  computed: {
    processData() {
      if (this.$store.getters.getAllData.length === 0) {
        // No data loaded.
        return undefined;
      }
      const labels = this.chartData.find(item => item.attribute === "date").values;
      const datasets = [];
      for (let property of this.chartAttributes) {
        datasets.push({
          label: property.title,
          backgroundColor: property.color,
          data: this.chartData.find(item => item.attribute === property.jsonPath).values
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
