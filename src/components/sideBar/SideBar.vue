<script>
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";
import SpatialParameter from "@/components/sideBar/SpatialParameter.vue";
import DailyParameter from "@/components/sideBar/DailyParameter.vue";

export default {
    name: "SideBar",
    components: {
        PeriodParameter,
        MeteorologicalParameter,
        SpatialParameter,
        DailyParameter
    }
}
</script>

<template>
    <div class="sidebar">
        <SpatialParameter></SpatialParameter>
        <PeriodParameter></PeriodParameter>
        <DailyParameter></DailyParameter>
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
