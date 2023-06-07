<template>
    <div class="rawData">
        <v-table>
            <thead>
            <tr>
                <th class="text-left">
                    Station Name
                </th>
                <th class="text-left">
                    Date
                </th>
                <th class="text-left" v-for="prop in existingProperties" :key="prop.param">
                    {{ prop.param }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in processData" :key="item.name">
                <td>{{ item.stationName }}</td>
                <td>{{ item.date }}</td>
                <td v-for="prop in existingProperties" :key="prop.param">{{ item[prop.jsonPath] }}</td>
            </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";

export default {
    name: 'RawDataResult',
    data () {
        return {
            data: [
            ],
        }
    },
    computed: {
        processData() {
            return this.mergeWeatherData(this.$store.getters.getWeather.map(el=> el.result.values))
        },
        properties() {
            return this.$store.getters.getParameters
        },
        existingProperties() {
            // List of properties available in merged data (containing a date)
            let properties = []
            for(let prop of this.$store.getters.getParameters) {
                if(prop.jsonPath in this.mergeWeatherData(this.$store.getters.getWeather.map(el=> el.result.values))[0]) {
                    properties.push(prop)
                }
            }
            return properties;
        },
    },
    methods: {
        mergeWeatherData(weatherArray) {
            const mergedData = [];
            weatherArray.forEach(weather => {
                weather.forEach(item => {
                    if("date" in item) {
                        const existingItem = mergedData.find(
                          mergedItem => mergedItem.date === item.date && mergedItem.stationName === item.stationName
                        );
                        if (existingItem) {
                            Object.keys(item).forEach(key => {
                                if (key !== 'date' && key !== 'stationName' && !existingItem.hasOwnProperty(key)) {
                                    existingItem[key] = item[key];
                                }
                            });
                        } else {
                            mergedData.push({ ...item });
                        }
                    }

                });
            });
            return mergedData;
        },
    }
}
</script>

<style scoped>
.map {
    display: flex;
    flex-direction: column;
    height: 80vh;
}
</style>
