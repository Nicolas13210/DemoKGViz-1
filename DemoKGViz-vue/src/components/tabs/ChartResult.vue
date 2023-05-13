<template>
  <div id="visualisation">
    <div class="groupVisualisation">
      <LineChart v-if="getWeather !== undefined" :chartData="getSelectAndConcatAttributes" :chartAttributes="this.properties"></LineChart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/tabs/charts/LineChart.vue";
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
  computed: {
    getSelectAndConcatAttributes() {
      return this.selectAndConcatAttributes(this.$store.getters.getWeather.result);
    },
    getWeather() {
      console.log("this.$store.getters.getWeather")
      console.log(this.$store.getters.getWeather.result)
      return this.$store.getters.getWeather.result;
    },
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
