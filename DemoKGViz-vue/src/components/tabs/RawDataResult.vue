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
                <th class="text-left" v-for="prop in properties" :key="prop.param">
                    {{ prop.param }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in processData" :key="item.name">
                <td>{{ item.stationName }}</td>
                <td>{{ item.date }}</td>
                <td v-for="prop in properties" :key="prop.param">{{ item[prop.jsonPath] }}</td>
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
            properties: [],
            data: [
            ],
        }
    },
    computed: {
        processData() {
            console.log(this.mergeWeatherData(this.$store.getters.getWeather.map(el=> el.result.values)))
            return this.mergeWeatherData(this.$store.getters.getWeather.map(el=> el.result.values))
        },
        properties() {
            return this.$store.getters.getParameters
        }
    },
    methods: {
        mergeWeatherData(weatherArray) {
            const mergedData = [];

            weatherArray.forEach(weather => {
                weather.forEach(item => {
                    const existingItem = mergedData.find(mergedItem => mergedItem.date === item.date);

                    if (existingItem) {
                        Object.keys(item).forEach(key => {
                            if (key !== 'date' && !existingItem.hasOwnProperty(key)) {
                                existingItem[key] = item[key];
                            }
                        });
                    } else {
                        mergedData.push({ ...item });
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
