<script>

export default {
    name: "SpacialParameter",
    data() {
        return {
            // Items selected by the user.
            value: [],
        }
    },
    computed: {
        allStations() {
            const stations = this.$store.getters.getAll.bindings;
            if (stations === undefined) {
                return [];
            }
            return stations.map(station => station.stationName.value);
        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'setSelectedStations') {
                // Update the 'value' property in case we are updating the selected stations (with the map for example).
                this.value = (this.$store.getters.getSelectedStations).map(station => station.stationName.value);
            }
        });
    },
    methods: {
        selectionUpdated(event) {
            this.$store.dispatch('updateSelectedStations', event);
        }
    }
}

</script>

<template>
    <div class="spacial-parameter">
        <div class="text-subtitle-2 font-weight-bold">Spacial parameter</div>
        <v-select v-model="value"
                  :items="this.allStations"
                  label="Stations"
                  @update:model-value="selectionUpdated($event)"
                  multiple>
            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 3">
                    <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 3" class="text-grey text-caption align-self-center">
                    (+{{ value.length - 3 }} others)
                </span>
            </template>
        </v-select>
    </div>
</template>

<style scoped>
.spacial-parameter {
    display: flex;
    flex-direction: column;
    gap: 10px
}
</style>
