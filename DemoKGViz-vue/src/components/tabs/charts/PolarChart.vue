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
    setProperties(parameters) {
      let properties = [];
      for (let parameter in parameters) {
        properties.push({
          title: parameters[parameter].param,
          jsonPath: parameters[parameter].jsonPath,
          color: "#ffa600",
          type: parameters[parameter].availableChart
        })
      }
      console.log(properties)
      return properties;
    },
    selectAndConcatAttributes(json) {
      let properties = this.setProperties(this.$store.getters.getParameters)
      this.properties = properties;
      const attributes = ["date"].concat(properties.map(element => element.jsonPath));
      let result = [];
      for (let attribute of attributes) {
        let values = [];
        for (let valueObj of json.values) {
          let value = valueObj[attribute];
          values.push(value);
        }
        result.push({"attribute": attribute, "values": values});
      }
      return result;
    },
  },
  computed: {
    processData() {
      let computedData = this.selectAndConcatAttributes(this.chartData);

      if (this.$store.getters.getWeather.length === 0) {
        // No data loaded.
        return undefined;
      }
      const labels = computedData.find(item => item.attribute === "date").values;
      const datasets = [];
      for (let property of this.properties) {
        datasets.push({
          label: property.title,
          backgroundColor: property.color,
          data: [28, 48, 40, 19, 96, 27, 100],
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
