<template>
    <Line v-if="chartData !== undefined" :data="chartData" :options="chartOptions"/>
</template>

<script>
import {Line} from 'vue-chartjs'
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'

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
            ]
        }
    },
    methods: {
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
        }
    },
    computed: {
        chartData() {
            if (this.$store.getters.getAllData.length === 0) {
                // No data loaded.
                return undefined;
            }

            console.log("lineChart data:", this.$store.getters.getAllData);
            let test = this.selectAndConcatAttributes(this.$store.getters.getAllData.result)
            const labels = test.find(item => item.attribute === "date").values;
            const datasets = [];
            for (let property of this.properties) {
                datasets.push({
                    label: property.title,
                    backgroundColor: property.color,
                    data: test.find(item => item.attribute === property.jsonPath).values
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
