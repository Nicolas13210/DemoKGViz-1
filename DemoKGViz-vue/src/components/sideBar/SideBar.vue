<script>
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";

export default {
    name: "SideBar",
    components: {PeriodParameter, MeteorologicalParameter}
}
</script>

<template>
    <v-list>
        <v-list-subheader>Period</v-list-subheader>
        <v-list-item-action start end>
            <PeriodParameter></PeriodParameter>
        </v-list-item-action>

        <br>

        <v-list-subheader>Parameters</v-list-subheader>
        <v-list-item-action>
            <MeteorologicalParameter></MeteorologicalParameter>
        </v-list-item-action>
    </v-list>
</template>

<style scoped>
</style>
