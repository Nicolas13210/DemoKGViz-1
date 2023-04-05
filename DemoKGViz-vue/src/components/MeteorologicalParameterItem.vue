<script>
import 'floating-vue/dist/style.css';

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
            document.getElementById("parameters-choose").innerHTML = "Parameters selected : " + this.$store.state.parameters;

            // TODO: call the right component for updateData and updateGraph.
            // updateData(type).then(() => updateGraph(type));
        }
    }
}
</script>

<template>
    <input type="checkbox" :name="param" :id="param"
           v-on:click="checkParameters([this.type,this.param])">
    <label :for="param" v-html="title"></label>
    <button v-tooltip="tooltip">?</button>
</template>

<style scoped>

input {
    cursor: pointer;
}

</style>
