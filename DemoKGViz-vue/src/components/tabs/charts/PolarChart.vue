<template>
    <PolarArea :data="processData" :options="chartOptions" class="chart"/>
</template>

<script>
import {PolarArea} from 'vue-chartjs';
import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale} from 'chart.js'
import {randomColor} from "randomcolor";

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

export default {
    name: "PolarChart",
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
        extractValues(stationName, json1, json2) {
            const params = json2.map(param => param.param);
            const values = json1.values.filter(item => item["stationName"] === stationName)[0];

            return Object.keys(values)
              .filter(key => params.includes(key))
              .map(key => parseInt(values[key]));
        },
        extractKeys(stationName, json1, json2) {
            const params = json2.map(param => param.param);
            const keys = Object.keys(json1.values.filter(item => item["stationName"] === stationName)[0]);

            return keys.filter(key => params.includes(key));
        }
    },
    computed: {
        processData() {
            if (this.$store.getters.getWeatherNbDay.length === 0) {
                // No data loaded.
                return undefined;
            }

            let labels = [];
            let backgroundColors = [];
            let data = [];
            let displayUnits = [];

            // For each station with data
            for (const stationData of this.chartData.values) {
                const stationName = stationData["stationName"];

                const titleLabels = this.extractKeys(stationName, this.chartData, this.$store.getters.getParameters)
                  .map(item => item + " (" + stationName + ")");
                labels = labels.concat(titleLabels);

                backgroundColors = backgroundColors.concat(titleLabels.map(item => randomColor({seed: item})));
                data = data.concat(this.extractValues(stationName, this.chartData, this.$store.getters.getParameters));
                displayUnits = displayUnits.concat(" day(s)");
            }

            const polarChart = {
                labels: labels,
                datasets: [{
                    backgroundColor: backgroundColors,
                    data: data,
                    displayUnit: displayUnits
                }]
            }

            console.log("PolarChart computed", polarChart);
            return polarChart;
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
.chart {
    width: 50vw;
}
</style>
