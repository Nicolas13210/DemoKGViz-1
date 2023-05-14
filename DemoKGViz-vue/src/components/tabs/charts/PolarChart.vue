<template>
  <PolarArea :data="processData" :options="chartOptions"/>
</template>

<script>
import {PolarArea} from 'vue-chartjs';
import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

export default {
  name: "LineChart",
  props: {
    chartData: Object,
  },
  components: {
    PolarArea
  },
  data() {
    return {
      // Property for the chart.
      properties: []
    }
  },
  methods: {
    extractValues(json1,json2) {
      const params = json2.map(param => param.param);
      const values = json1.values[0];

      return Object.keys(values)
          .filter(key => params.includes(key))
          .map(key => parseInt(values[key]));
    },
    extractKeys(json1, json2) {
      const params = json2.map(param => param.param);
      const keys = Object.keys(json1.values[0]);

      return keys.filter(key => params.includes(key));
    }
  },
  computed: {
    processData() {
      if (this.$store.getters.getWeatherNbDay.length === 0) {
        // No data loaded.
        return undefined;
      }
      const datasets = [];
      datasets.push({
        label: "test",
        data: this.extractValues(this.chartData, this.$store.getters.getParameters),
      });
      const data2 = {
        labels: this.extractKeys(this.chartData, this.$store.getters.getParameters),
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
