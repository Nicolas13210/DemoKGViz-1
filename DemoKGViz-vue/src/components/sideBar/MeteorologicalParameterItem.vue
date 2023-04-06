<script>

export default {
    name: "MeteorologicalParameterItem",
    props: {
        title: String,
        tooltip: String,
        type: String,
        param: String
    },
    methods: {
        checkParameters([type, param]) {
            if (document.getElementById(param).checked) {
                this.$store.dispatch('pushParameter', {parameters: param, type: type});
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
    <v-checkbox
                :name="param"
                :id="param"
                @click="checkParameters([this.type,this.param])">
    <template v-slot:label>
        <span v-html="title"></span>
        <v-tooltip>
            <template v-slot:activator="{ props }">
                <v-btn density="compact" icon="mdi-question-mark-circle-outline" variant="tonal" v-bind="props">?</v-btn>
            </template>
            <span v-html="tooltip"></span>
        </v-tooltip>
    </template>
    </v-checkbox>

</template>

<style scoped>

</style>
