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
                        // TODO: change color here with the key "title" + "stationName".
                        color: randomColor({seed: "myRandomSeed"}),
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
                    data: computedData.find(item => item.attribute === property.jsonPath).values,
                    type: property.type,
                    displayUnit: property.displayUnit
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
