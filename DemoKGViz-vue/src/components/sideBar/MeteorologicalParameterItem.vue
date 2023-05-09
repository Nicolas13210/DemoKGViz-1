<script>

export default {
    name: "MeteorologicalParameterItem",
    props: {
        title: String,
        tooltip: String,
        type: String,
        param: String,
    },
    methods: {
        checkParameters(event) {
            const isChecked = event.target.checked;

            if (isChecked) {
                this.$store.dispatch('pushParameter', { parameter: this.param, type: this.type });
            } else {
                this.$store.dispatch('cleanParameters', this.param);
            }
          
        }
    }
}
</script>

<template>
    <div>
        <v-checkbox density="compact" :hide-details="true" @click="checkParameters($event)">
            <template v-slot:label>
                <div class="text-body-2 font-weight-regular" v-html="title"></div>
                <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn density="compact" icon="mdi-help-circle-outline" variant="text" v-bind="props"></v-btn>
                    </template>
                    <span v-html="tooltip"></span>
                </v-tooltip>
            </template>
        </v-checkbox>
    </div>
</template>

<style scoped>
</style>
