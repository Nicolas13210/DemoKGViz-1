<script>
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";
import SpatialParameter from "@/components/sideBar/SpatialParameter.vue";

export default {
    name: "SideBar",
    components: {
        PeriodParameter,
        MeteorologicalParameter,
        SpatialParameter
    }
}
</script>

<template>
    <div class="sidebar">
        <SpatialParameter></SpatialParameter>
        <PeriodParameter></PeriodParameter>
        <MeteorologicalParameter></MeteorologicalParameter>
    </div>
</template>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}
</style>
