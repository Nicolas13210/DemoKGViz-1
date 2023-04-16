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
        checkParameters([type, param]) {
            if (document.getElementById(param).checked) {
                this.$store.dispatch('pushParameter', { parameters: param, type: type });
            } else {
                this.$store.dispatch('cleanParameters', param);
            }

            // TODO: call the right component for updateData and updateGraph.
            // updateData(type).then(() => updateGraph(type));
        }
    }
}
</script>

<template>
    <div>
        <v-checkbox density="compact" :hide-details="true">
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
