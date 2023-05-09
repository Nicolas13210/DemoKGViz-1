<template>
  <Line v-if="chartData !== undefined" :data="chartData" :options="chartOptions"/>
</template>

<script>
import {Line} from 'vue-chartjs'
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import {buildQuery_tmpRainStation} from "@/queries/queries";
import {parametersAvailable} from "@/utils/parametersAvailable";

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement)

export default {
  name: "LineChart",
  components: {
    Line
  },
  data() {
    return {
      // Property for the chart.
      properties: [
        /*
                {
                  title: "Tavg",
                  jsonPath: "temp_avg",
                  color: "#ffa600"

                },
                {
                  title: "Tmin",
                  jsonPath: "temp_min",
                  color: "#3c83ff"
                }
        */
      ]
    }
  },
  created() {
    this.drawCharts();
  },
  methods: {
    //TODO: move some methods to Chart result
    convertDateToYearMonthDay(date) {
      const year = date.getFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    selectAndConcatAttributes(json) {
      const attributes = ["date"].concat(this.properties.map(element => element.jsonPath));
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
    drawCharts() {
      const selectedStations = (this.$store.getters.getSelectedStations).map(station => station.stationName.value);

      // FIXME: The following "IF" is temporarily used to not stress the back-end server during our tests. So the for-loop will always loop on one station.

      if (selectedStations.length === 1) {
        // Draw charts according to the removed/added stations.
        const startDate = this.convertDateToYearMonthDay(this.$store.getters.getStartDate);
        const endDate = this.convertDateToYearMonthDay(this.$store.getters.getEndDate);

        for (const selectedStation of selectedStations) {
          this.$store.dispatch("fetchWeatherData", buildQuery_tmpRainStation(selectedStation, startDate, endDate));
        }
      }
    },
    isParameterAvailable(parameters) {
      this.properties = [];
      for (let parameter in parameters) {
        let item = parametersAvailable(parameters[parameter], "LINE")
        if (item !== undefined) {
          this.properties.push({
            title: item.param,
            jsonPath: item.jsonPath,
            //TODO: change color
            color: "#ffa600"
          })
        }
      }
    },
  },
  computed: {
    //TODO: REFACTOR THIS METHOD
    chartData() {
      this.isParameterAvailable(this.$store.getters.getParameters)

      if (this.$store.getters.getAllData.length === 0) {
        // No data loaded.
        return undefined;
      }

      let concatAttributes = this.selectAndConcatAttributes(this.$store.getters.getAllData.result)

      const labels = concatAttributes.find(item => item.attribute === "date").values;
      const datasets = [];
      for (let property of this.properties) {
        datasets.push({
          label: property.title,
          backgroundColor: property.color,
          data: concatAttributes.find(item => item.attribute === property.jsonPath).values
        });
      }

      const data = {
        labels: labels,
        datasets: datasets
      }
      console.log("lineChart computed:", data);
      return data;

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
