<template>
    <Bar :data="processData" :options="chartOptions"/>
</template>

<script>
import {Bar} from 'vue-chartjs';
import {randomColor} from "randomcolor";
import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'

Chart.register(BarElement, LineController, CategoryScale, Title, Tooltip, Legend, PointElement, LinearScale, LineElement);

export default {
    name: "ComboChart",
    props: {
        chartData: Object,
    },
    components: {
        Bar
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
                if (parameters[parameter].availableChart === "line" || parameters[parameter].availableChart === "bar") {
                    properties.push({
                        title: parameters[parameter].param,
                        jsonPath: parameters[parameter].jsonPath,
                        type: parameters[parameter].availableChart,
                        displayUnit: parameters[parameter].displayUnit
                    })
                }
            }
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
                    values.push({"station": valueObj['stationName'], "value": value});
                }

                values.forEach(item => {
                    const existingItem = result.find(outputItem => outputItem.station === item.station);

                    if (existingItem) {
                        existingItem.data.push({"attribute": attribute, "value": item.value});
                    } else {
                        result.push({station: item.station, data: [{"attribute": attribute, "value": item.value}]});
                    }
                });
            }
            return result;
        },
      selectAndConcatAttributesDateComparaison(json) {
        let properties = this.setProperties(this.$store.getters.getParameters)
        this.properties = properties;
        const attributes =  ["date"].concat(properties.map(element => element.jsonPath));

        let result = [];
        for (let attribute of attributes) {
          let values = [];
          for (let valueObj of json.values) {
            let value = valueObj[attribute];
            let date = valueObj["date"];
            values.push({"station": valueObj['stationName'], "value": value, "year": date.substring(0, 4)});
          }
          values.forEach(item => {
            const existingItem = result.find(outputItem => outputItem.station === item.station);

            if (existingItem) {
              existingItem.data.push({"attribute": attribute, "value": item.value, "year": item.year});
            } else {
              result.push({station: item.station, data: [{"attribute": attribute, "value": item.value, "year": item.year}]});
            }
          });
        }
        return result;
      },

    },
    computed: {
        processData() {
            if (this.$store.getters.getWeather.length === 0) {
                // No data loaded.
                return undefined;
            }
          let computedData, labels;
          if(this.$store.getters.getComparison) {
            computedData = this.selectAndConcatAttributesDateComparaison(this.chartData);
             labels = [...new Set(computedData[0].data.filter(item => item.attribute === "date").map(item => item.value.slice(5)))];
          } else {
            computedData = this.selectAndConcatAttributes(this.chartData);
             labels = [...new Set(computedData[0].data.filter(item => item.attribute === "date").map(item => item.value))];
          }

          const years = [...new Set(computedData[0].data.map(entry => entry.year))];

          const datasets = [];
          for(let year of years) {
            for (let stationData of computedData) {
              // For each station (station: XXX, data: [{attribute: XXX, value: XXX}]).
                for (let property of this.properties) {
                  const titleLabel = property.title + "(" + stationData.station + ")" + ((this.$store.getters.getComparison) ? " - " + year : "");
                  let data;
                  if(this.$store.getters.getComparison) {
                     data = stationData.data.filter(item => item.attribute === property.jsonPath && item.year === year).map(item => item.value)
                  } else {
                     data = stationData.data.filter(item => item.attribute === property.jsonPath).map(item => item.value)
                  }
                  datasets.push({
                    label: titleLabel,
                    backgroundColor: randomColor({seed: titleLabel}),
                    data:data ,
                    type: property.type,
                    displayUnit: property.displayUnit
                  });
              }
            }
          }
            const data = {
                labels: labels,
                datasets: datasets
            }
            return data;
        },
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (chart) =>
                              chart.dataset.label + ": " + chart.formattedValue + chart.dataset.displayUnit
                        }
                    }
                }
            };
        }
    }
}
</script>

<style scoped>

</style>
