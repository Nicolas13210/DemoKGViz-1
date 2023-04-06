<script>
import MeteorologicalParameter from "@/components/MeteorologicalParameter.vue";

export default {
    name: "SideBar",
    components: {MeteorologicalParameter}
}
</script>

<template>
    <v-list>
        <v-list-item title="Parameters">
            <MeteorologicalParameter></MeteorologicalParameter>
        </v-list-item>
    </v-list>
</template>

<style scoped>

</style>
