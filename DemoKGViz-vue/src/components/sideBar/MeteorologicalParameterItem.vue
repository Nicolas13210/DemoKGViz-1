
<template>
    <div>
        <v-checkbox density="compact" :hide-details="true" @click="checkParameter($event)">
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
        checkParameter(event) {
            const isChecked = event.target.checked;

            if (isChecked) {
                this.$store.dispatch('addParameter', this.param);
            } else {
                this.$store.dispatch('removeParameter', this.param);
            }
          
        }
    }
}
</script>

<style scoped>
</style>
