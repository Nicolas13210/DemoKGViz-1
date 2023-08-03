<template>
    <div class="data-table-container">
      <VDataTable
        height="530px"
        :headers="headers"
        :items="processData"
        items-per-page=-1
        fixed-header = true
        hover = true
    
      >
        <template v-slot:item.raw="{ item }">
          <tr>
            <td :class="{ 'fixed-column': true, 'station-name': true }">{{ item.stationName }}
            </td>
            <td :class="{ 'fixed-column': true, 'date-column': true }">{{ item.date }}</td>
            <td v-for="prop in existingProperties" :key="prop.param">{{ item[prop.jsonPath] }}</td>
          </tr>
        </template>
      </VDataTable>
    </div>
  </template>
  
  <script>
  import { VDataTable } from 'vuetify/labs/VDataTable'
  import "leaflet/dist/leaflet.css";
  
  
  export default {
    name: "RawDataResult",
    components: {
      VDataTable
    },
    data() {
      return {
        items: [
        ],
      };
    },
    computed:{
      processData() {
        return this.mergeWeatherData(this.$store.getters.getRawWeather.map(el => el.result.values))
      },
      properties() {
        return this.$store.getters.getRawParameters
      },
      existingProperties() {
      // List of properties available in merged data (containing a date)
        let properties = []
        for (let prop of this.$store.getters.getRawParameters) {
          if(this.$store.getters.getRawWeather.map(el => el.result.values).length>0){
            if (prop.jsonPath in this.mergeWeatherData(this.$store.getters.getRawWeather.map(el => el.result.values))[0]) {
              properties.push(prop)
            }
          }
        }
        return properties;
      },
      headers()  {
        return [
          {title: "Station Name", key: "stationName", width:150},
          {title: "Date", key: "date"},
          ...this.existingProperties.map((prop) => ({
            title: `${prop.param} (${prop.displayUnit})`,
            key: prop.jsonPath,
          })),
        ]
      },
  
    },
    methods: {
          mergeWeatherData(weatherArray) {
              const mergedData = [];
              weatherArray.forEach(weather => {
                  weather.forEach(item => {
                      if ("date" in item) {
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
                              mergedData.push({...item});
                          }
                      }
  
                  });
              });
              return mergedData;
          },
          findStationDetail(stationName) {
            console.log(stationName)
            //return this.$store.getters.getStations.find(value => value.stationName.value === stationName)
          }
      }
    
  }
  </script>
  
  <style scoped>
  
  </style>