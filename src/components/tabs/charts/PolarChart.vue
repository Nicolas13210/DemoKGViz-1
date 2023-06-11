<template>
    <PolarArea v-if="displayChart && processData !== undefined" :data="processData" :options="chartOptions" class="chart"/>
</template>

<script>
import {PolarArea} from 'vue-chartjs';
import {ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Title, Tooltip} from 'chart.js'
import CryptoJS from "crypto-js";
import uniqolor from "uniqolor";
import {th} from "vuetify/locale";

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
            const params = json2.map(param => param.jsonPath);
            const values = json1.values.filter(item => item["stationName"] === stationName)[0];

            return Object.keys(values)
              .filter(key => params.includes(key))
              .map(key => parseInt(values[key]));
        },
        extractKeys(stationName, json1, json2) {
            const params = json2.map(param => param.jsonPath);
            const keys = Object.keys(json1.values.filter(item => item["stationName"] === stationName)[0]);

            return keys.filter(key => params.includes(key));
        },
        mergeValuesByStationName(data) {
            const mergedData = {};
            data.forEach(obj => {
                const stationName = obj.values[0].stationName;
                if (!mergedData[stationName]) {
                    mergedData[stationName] = { values: [obj.values[0]] };
                } else {
                    mergedData[stationName].values[0] = {
                        ...mergedData[stationName].values[0],
                        ...obj.values[0]
                    };
                }
            });
            return Object.values(mergedData);
        }

    },
    computed: {
        processData() {
            if (this.$store.getters.getAggregate.length === 0) {
                // No data loaded.
                console.log("undefinedundefinedundefinedundefinedundefinedundefinedundefinedundefinedundefinedundefined")
                return undefined;
            }

            let labels = [];
            let backgroundColors = [];
            let data = [];

            console.log(this.chartData)
            console.log(this.chartData[0].values)

            let mergedData = this.mergeValuesByStationName(this.chartData)
            // For each station with data
            for (const stationData of mergedData[0].values) {
                console.log(stationData)
                const stationName = stationData["stationName"];

                const titleLabels = this.extractKeys(stationName, mergedData[0], this.$store.getters.getParameters)
                  .map(item => item + " (" + stationName + ")");
                labels = labels.concat(titleLabels);

                backgroundColors = backgroundColors.concat(titleLabels.map(item =>
                  uniqolor(CryptoJS.SHA256(item).toString(), {saturation: [45, 90], lightness: [45, 75]}).color
                ));
                console.log("this.extractValues(stationName, this.chartData[0], this.$store.getters.getParameters)")
                console.log(this.extractValues(stationName, mergedData[0], this.$store.getters.getParameters))
                data = data.concat(this.extractValues(stationName, mergedData[0], this.$store.getters.getParameters));
            }

            const polarChart = {
                labels: labels,
                datasets: [{
                    backgroundColor: backgroundColors,
                    data: data
                }]
            }

            console.log("PolarChart computed", polarChart);
            return polarChart;
        },
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (chart) => {
                                const value = chart.formattedValue;
                                if (value !== '0' || value !== '1') {
                                    return value + ' days';
                                }
                                return value + ' day';
                            }
                        }
                    }
                }
            };
        },
        displayChart() {
            return this.$store.getters.isChartUsed("POLAR") && this.$store.getters.getSelectedStations.length
        }
    }
}
</script>

<style scoped>
.chart {
    width: 50vw;
}
</style>
