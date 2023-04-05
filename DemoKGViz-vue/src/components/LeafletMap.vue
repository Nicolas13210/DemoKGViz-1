<template>
  <div class="map">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, 2]" :use-global-leaflet="false">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
      <l-geo-json :geojson="geoJson"></l-geo-json>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import regionsJson from "../assets/regions.json"
import { LMap, LTileLayer,LGeoJson  } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson 
  },
  data() {
    return {
      zoom: 6,
      geoJson: regionsJson
    };
  },
};
</script>

<style scoped>
.map {
  height: 700px;
  width: 700px;
}
</style>