<template>
    <div class="map">
        <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>

            <l-geo-json :geojson="geoJson" :options="geoJsonOptions" :optionsStyle="() => geoJsonStyle"></l-geo-json>

            <l-marker v-for="(marker, i) in stations"
                :lat-lng="[parseFloat(marker.lat.value), parseFloat(marker.long.value)]" :name="marker.name"
                :draggable="false" :ref="marker.stationName.value" @click="this.selectStation(marker)">
                <l-popup :ref="'marker' + i" :content="marker.stationName.value"></l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import regionsJson from "../../assets/regions.json"
import { LMap, LTileLayer, LGeoJson, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
    name: 'LeafletMap',
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
        LMarker,
        LPopup
    },
    computed: {
        stations() {
            return this.$store.getters.getStations
        }
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
                { name: "Réunion/Mayotte", coordinates: [47, 3] },
                { name: "Guyanne", coordinates: [47, 4] },
                { name: "Saint-Pierre-Et-Miquelon", coordinates: [46.766333, -56.179167] },
                { name: "Guadeloupe/Martinique", coordinates: [47, 5] },
            ],
            geoJsonOptions: {
                onEachFeature: this.onEachFeature,
            },
            geoJsonStyle: {
                fillColor: 'gray',
                weight: 2,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.4
            },
        }
    },
    methods: {
        onEachFeature(feature, layer) {
            this.setRegionListeners(layer);
        },

        setRegionListeners(layer) {
            layer.on({
                mouseover: this.setRegionHoverStyle,
                mouseout: this.unsetRegionHoverStyle
            });
        },
        setRegionHoverStyle(layer) {
            layer.target.setStyle({
                fillColor: 'red',
                weight: 2,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.1
            })
        },
        unsetRegionHoverStyle(layer) {
            layer.target.setStyle({
                ...this.geoJsonStyle
            })
        },
        selectStation(marker) {
            this.$store.dispatch('updateSelectedStations', marker.stationName.value);
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
