<template>
    <Bar ref="barChart" :data="processData" :options="chartOptions" @dblclick="resetZoom()" />
</template>

<script>
import { Bar } from 'vue-chartjs';
import { randomColor } from "randomcolor";
import CryptoJS from 'crypto-js';
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
import zoomPlugin from 'chartjs-plugin-zoom';


Chart.register(BarElement, LineController, CategoryScale, Title, Tooltip, Legend, PointElement, LinearScale, LineElement, zoomPlugin);

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
                        displayUnit: parameters[parameter].displayUnit,
                        queryMethod: parameters[parameter].request.name
                    })
                }
            }
            return properties;
        },
        selectAndConcatAttributes(json) {
            let properties = this.setProperties(this.$store.getters.getParameters)
            this.properties = properties;

            let result = [];
            for (let attribute of properties.concat({
                jsonPath: "date",
            })) {

                let values = [];
                let attributes = [];

                if (attribute.jsonPath === "date") {
                    // Use the first query to obtain the dates
                    attributes = json[0].result.values;
                } else {
                    attributes = json.find(value => value.queryMethod === attribute.queryMethod).result.values;
                }

                for (let valueObj of attributes) {
                    let value = valueObj[attribute.jsonPath];
                    values.push({ "station": valueObj['stationName'], "value": value });
                }

                values.forEach(item => {
                    const existingItem = result.find(outputItem => outputItem.station === item.station);

                    if (existingItem) {
                        existingItem.data.push({ "attribute": attribute.jsonPath, "value": item.value });
                    } else {
                        result.push({
                            station: item.station,
                            data: [{ "attribute": attribute.jsonPath, "value": item.value }]
                        });
                    }
                });
            }
            return result;
        },
        selectAndConcatAttributesDateComparaison(json) {
            let properties = this.setProperties(this.$store.getters.getParameters)
            this.properties = properties;


            let result = [];
            for (let attribute of properties.concat({
                jsonPath: "date",
            })) {
                let values = [];
                let attributes = [];

                if (attribute.jsonPath === "date") {
                    // Use the first query to obtain the dates
                    attributes = json[0].result.values;
                } else {
                    attributes = json.find(value => value.queryMethod === attribute.queryMethod).result.values;
                }


                for (let valueObj of attributes) {
                    let value = valueObj[attribute.jsonPath];
                    let date = valueObj["date"];
                    values.push({ "station": valueObj['stationName'], "value": value, "year": date.substring(0, 4) });
                }
                values.forEach(item => {
                    const existingItem = result.find(outputItem => outputItem.station === item.station);

                    if (existingItem) {
                        existingItem.data.push({
                            "attribute": attribute.jsonPath,
                            "value": item.value,
                            "year": item.year
                        });
                    } else {
                        result.push({
                            station: item.station,
                            data: [{ "attribute": attribute.jsonPath, "value": item.value, "year": item.year }]
                        });
                    }
                });
            }
            return result;
        },
        resetZoom() {
            this.$refs.barChart.chart.resetZoom();
        },
    },
    computed: {
        processData() {
            if (this.$store.getters.getWeather.length === 0) {
                // No data loaded.
                return undefined;
            }

            let computedData, labels;
            if (this.$store.getters.getComparison) {
                computedData = this.selectAndConcatAttributesDateComparaison(this.chartData);
                labels = [...new Set(computedData[0].data.filter(item => item.attribute === "date").map(item => item.value.slice(5)))];
            } else {
                computedData = this.selectAndConcatAttributes(this.chartData);
                labels = [...new Set(computedData[0].data.filter(item => item.attribute === "date").map(item => item.value))];
            }

            const years = [...new Set(computedData[0].data.map(entry => entry.year))];

            const datasets = [];
            for (let year of years) {
                for (let stationData of computedData) {
                    // For each station (station: XXX, data: [{attribute: XXX, value: XXX}]).
                    for (let property of this.properties) {

                        const titleLabel = property.title + "(" + stationData.station + ")" + ((this.$store.getters.getComparison) ? " - " + year : "");
                        let data;
                        if (this.$store.getters.getComparison) {
                            data = stationData.data.filter(item => item.attribute === property.jsonPath && item.year === year).map(item => parseFloat(item.value))

                        } else {
                            data = stationData.data.filter(item => item.attribute === property.jsonPath).map(item => item.value)
                        }

                        // Low encryption method, just to randomize the String.
                        const colorSha1 = CryptoJS.SHA256(titleLabel).toString();
                        datasets.push({
                            label: titleLabel,
                            backgroundColor: randomColor({
                                seed: colorSha1,
                                alpha: 1,
                                format: "rgba",
                            }),
                            borderColor: randomColor({
                                seed: colorSha1,
                                alpha: 0.4,
                                format: "rgba"
                            }),
                            data: data,
                            type: property.type,
                            displayUnit: property.displayUnit,
                            borderWidth: 3,
                            hoverBorderWidth: 10,
                            onClick: (evt, item) => {
                                console.log("fgzeijoger")
                            },
                            /*                             actions: [{
                                                            name: 'Reset zoom',
                                                            handler(chart) {
                                                                chart.resetZoom();
                                                            }
                                                        }] */
                        });
                    }
                }
            }

            return {
                labels: labels,
                datasets: datasets
            };
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
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                            modifierKey: 'ctrl',
                        },
                        zoom: {
                            drag: {
                                enabled: true
                            },
                            mode: 'x',
                        },
                    }
                }
            };
        }
    }
}
</script>

<style scoped></style>
