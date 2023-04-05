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

      <l-marker v-for="marker in markers" :lat-lng="marker.coordinates" :name="marker.name" :draggable="false"
        :ref="marker.name">
        <l-popup :content="marker.name"></l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import regionsJson from "../assets/regions.json"
import { LMap, LTileLayer, LGeoJson, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LPopup
  },
  data() {
    return {
      // Map
      zoom: 6,
      center: [47.41322, 2],

      // GeoJSON
      geoJson: regionsJson,
      options: [
        { name: "Metropolis", coordinates: [47, 2] },
        { name: "Metropolis 2", coordinates: [47, 3] },
        { name: "Metropolis 3", coordinates: [47, 4] },
        { name: "Metropolis 4", coordinates: [47, 5] },
      ],
      geoJsonOptions: {
        onEachFeature: this.onEachFeature,
        /*         styleOnEachFeature: {
                  color: '#ff0000',
                  fillColor: '#ff0000',
                  fillOpacity: 0.5
                } */
      },
      markers: [
        { name: "1", coordinates: [47, 2] },
        { name: "2", coordinates: [47, 3] },
        { name: "3", coordinates: [47, 4] },
        { name: "4", coordinates: [47, 5] },
        { name: "5", coordinates: [47, 6] }
      ]
    };
  },
  methods: {
    showMarkerPopup(name) {
      this.$refs[name][0].openPopup()
    },

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
  border: 1px solid black;
  border-radius: 15px;
}

.map h2 {
  background-color: lightblue;
  padding: 20px;
  margin: 0;
  text-align: center;
  border-radius: 15px;
}

.map-options {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.map-options h3 {
  margin: 0;
}

button {
  padding: 10px;
}
</style>