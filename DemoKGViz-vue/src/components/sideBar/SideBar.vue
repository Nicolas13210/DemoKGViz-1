<script>
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";
import SpacialParameter from "@/components/sideBar/SpacialParameter.vue";

export default {
    name: "SideBar",
    components: {
        PeriodParameter,
        MeteorologicalParameter,
        SpacialParameter
    }
}
</script>

<template>
    <div class="sidebar">
        <SpacialParameter></SpacialParameter>
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
