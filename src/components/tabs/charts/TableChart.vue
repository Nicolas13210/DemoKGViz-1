<template>
    <div class="rawData">
      <v-table>
        <thead>
          <tr>
            <th class="text-left" scope="col">Station Name</th>
            <th v-for="prop in $store.getters.getDatesParameters" :key="prop.param" class="text-left" scope="col">
              {{ `${prop.param} (${prop.displayUnit})` }}
              <v-tooltip location="bottom">
                <template v-slot:activator="{props}">
                  <v-btn density="compact" icon="mdi-help-circle-outline" variant="text" v-bind="props"></v-btn>
                </template>
                <span v-html="prop.tooltip"></span>
              </v-tooltip>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in mergedData" :key="item.name">
            <td><a :href="findStationDetail(item.stationName).station.value">{{ item.stationName }}</a></td>
            <td v-for="prop in $store.getters.getDatesParameters" :key="prop.param">{{ item[prop.jsonPath] }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  
  export default {
    name: "TableChart",
    computed: {
      mergedData() {
        const weatherArray = this.$store.getters.getWeather.map(el => el.result.values);
        const mergedData = [];
        weatherArray.forEach(weather => {
          weather.forEach(item => {
            const existingItem = mergedData.find(mergedItem => mergedItem.stationName === item.stationName);
            if (existingItem) {
              Object.keys(item).forEach(key => {
                if (key !== 'date' && key !== 'stationName' && !existingItem.hasOwnProperty(key)) {
                  existingItem[key] = item[key];
                }
              });
            } else {
              mergedData.push({ ...item });
            }
          });
        });
        return mergedData;
      }
    },
    methods: {
      findStationDetail(stationName) {
        return this.$store.getters.getStations.find(value => value.stationName.value === stationName);
      }
    }
  };
  </script>
  