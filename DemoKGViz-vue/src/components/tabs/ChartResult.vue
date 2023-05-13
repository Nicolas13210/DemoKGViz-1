<template>
  <div id="visualisation">
    <div class="groupVisualisation">
      <LineChart v-if="getAllData !== undefined" :chartData="getSelectAndConcatAttributes" :chartAttributes="this.properties"></LineChart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/tabs/charts/LineChart.vue";
import {buildQuery_tmpRainStation} from "@/queries/queries";
import {parametersAvailable} from "@/utils/parametersAvailable";

export default {
  name: "ChartResult",
  components: {
    LineChart,
  },
  data() {
    return {
      // Property for the chart.
      properties: []
    }
  },
  created() {
   // this.fetchData();
  },
  computed: {
    getSelectedStation() {
      return (this.$store.getters.getSelectedStations).map(station => station.stationName.value);
    },
    getStartDate() {
      return this.convertDateToYearMonthDay(this.$store.getters.getStartDate);
    },
    getEndDate() {
      return this.convertDateToYearMonthDay(this.$store.getters.getEndDate);
    },
    getSelectAndConcatAttributes() {
      return this.selectAndConcatAttributes(this.$store.getters.getAllData.result);
    },
    getAllData() {
      return this.$store.getters.getAllData.result;
    },
  },
  methods: {
    // SI PARAMETER DE LA CHECKBOX COCHEE EST LINE, ALORS ON AJOUTE LES DATA EN PLUS AUX CHARTLINE DEJA PRESENT
    isParameterAvailable(parameters) {
      let properties = [];
      for (let parameter in parameters) {
        let item = parametersAvailable(parameters[parameter], "LINE")
        if (item !== undefined) {
          properties.push({
            title: item.param,
            jsonPath: item.jsonPath,
            color: "#ffa600"
          })
        }
      }
      return properties;
    },
    convertDateToYearMonthDay(date) {
      const year = date.getFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    selectAndConcatAttributes(json) {
      let properties = this.isParameterAvailable(this.$store.getters.getParameters)
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
    //TODO: to move ???
    fetchData() {
      // FIXME: The following "IF" is temporarily used to not stress the back-end server during our tests. So the for-loop will always loop on one station.
      if (this.getSelectedStation.length === 1) {
        // Draw charts according to the removed/added stations.
        for (const selectedStation of this.getSelectedStation) {
          this.$store.dispatch("fetchWeatherData", buildQuery_tmpRainStation(selectedStation, this.getStartDate, this.getEndDate));
        }
      }
    },
  },
  watch: {
    getSelectedStation(newCount, oldCount) {
      this.fetchData();
      console.log("call update getSelectedStation")
    },
    getStartDate(newCount, oldCount) {
      this.fetchData();
      console.log("call update getStartDate")
    },
    getEndDate(newCount, oldCount) {
      this.fetchData();
      console.log("call update getEndDate")
    }
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
