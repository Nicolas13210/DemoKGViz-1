<template>
  <div class="map">
    <h2>Choose a localisation</h2>
    <div class="map-options">
      <h3>Options</h3>
      <div>
        <button v-for="option in options" @click="changeLocation(option.coordinates)">{{ option.name }}</button>
      </div>
    </div>

    <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
        name="OpenStreetMap"></l-tile-layer>
      <l-geo-json :geojson="geoJson" :options="geoJsonOptions"></l-geo-json>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import regionsJson from "../assets/regions.json"
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data() {
    return {
      // Map
      zoom: 6,
      center: [47.41322, 2],

      // GeoJSON
      geoJson: regionsJson,
      options: [
        { 'name': "Metropolis", coordinates: [47, 2] },
        { 'name': "Metropolis 2", coordinates: [47, 3] },
        { 'name': "Metropolis 3", coordinates: [47, 4] },
        { 'name': "Metropolis 4", coordinates: [47, 5] },
      ],
      geoJsonOptions: {
        onEachFeature: this.onEachFeature,
        /*         styleOnEachFeature: {
                  color: '#ff0000',
                  fillColor: '#ff0000',
                  fillOpacity: 0.5
                } */
      }
    };
  },
  methods: {
    changeLocation(coordinates) {
      this.center = coordinates;
    },

    onEachFeature(feature, layer) {
      this.setPopup(layer, feature.properties.nom)
      this.setClickListener(layer, feature.properties.nom);
    },
    
    setPopup(layer, name) {
      layer.bindPopup(name)
    },

    setClickListener(layer, name) {
      layer.on('click', () => {
        console.log("name", name)
      })
    }
  }
}
</script>

<style scoped>
.map {
  display: flex;
  flex-direction: column;
  height: 1000px;
  border: 2px solid black;
}

.map h2 {
  background-color: lightblue;
  padding: 20px;
  margin: 0;
  border-bottom: 2px solid;
}

.map-options {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.map-options h3 {
  margin: 0;
}
</style>