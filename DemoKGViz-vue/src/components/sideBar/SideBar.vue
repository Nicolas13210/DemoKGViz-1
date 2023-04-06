<script>
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";

export default {
    name: "SideBar",
    components: {PeriodParameter, MeteorologicalParameter}
}
</script>

<template>
    <v-list-item title="Period">
        <PeriodParameter></PeriodParameter>
    </v-list-item>
    <v-list>
        <v-list-item title="Parameters">
            <MeteorologicalParameter></MeteorologicalParameter>
        </v-list-item>
    </v-list>
</template>

<style scoped>
</style>
