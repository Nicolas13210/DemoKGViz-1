<template>
    <div class="spacial-parameter">
        <div class="text-subtitle-2 font-weight-bold">Spacial parameter</div>
        <v-select v-model="selectedStations" :items="this.stations"
            label="Stations" @update:model-value="selectionUpdated($event)" multiple>
            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 3">
                    <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 3" class="text-grey text-caption align-self-center">
                    (+{{ this.selectedStations.length - 3 }} others)
                </span>
            </template>
        </v-select>
    </div>
</template>

<script>

export default {
    name: "SpacialParameter",
    computed: {
        stations() {
            const stations = this.$store.getters.getStations;
            return stations.map(station => station.stationName.value);
        },
        selectedStations() {
            return this.$store.getters.getSelectedStations;
        }
    },
    methods: {
        selectionUpdated(event) {
            this.$store.dispatch('setSelectedStations', event);
        }
    }
}

</script>

<style scoped>
.spacial-parameter {
    display: flex;
    flex-direction: column;
    gap: 10px
}
</style>
