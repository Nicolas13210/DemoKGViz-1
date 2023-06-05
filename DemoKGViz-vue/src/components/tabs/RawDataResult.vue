<template>
    <div class="rawData">
        <v-table>
            <thead>
            <tr>
                <th class="text-left">
                    Station Name
                </th>

                <th class="text-left" v-for="item in processData" :key="item.param">
                    {{ item.param }}
                </th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.tmin }}</td>
                <td>{{ item.tmax }}</td>
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
                {
                    name: 'Nice',
                    date: '2023-02-02',
                    tmin: 5,
                    tmax: 10,
                },
            ],
        }
    },
    computed: {
        processData() {
            console.log(this.$store.getters.getParameters)
            console.log(this.selectAndConcatAttributes(this.$store.getters.getWeather))
            return this.$store.getters.getParameters
        }
    },
    methods: {
        selectAndConcatAttributes(json) {
            let properties = this.$store.getters.getParameters
            this.properties = properties;
            console.log(this.properties)

            let result = [];

            console.log(result)
            return result;
        }
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
