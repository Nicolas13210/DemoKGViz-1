<template>
    <div class="container">
        <div v-for="(parameter, i) in parameters" :key="i">
            <div class="text-subtitle-2 font-weight-bold">{{ parameter.title }}</div>
            <DailyParameterItem v-for="item in parameter.items"
                                         :available-chart="item.availableChart"
                                         :displayUnit="item.displayUnit"
                                         :json-path="item.jsonPath"
                                         :param="item.param"
                                         :request="item.request"
                                         :title="item.title"
                                         :tooltip="item.tooltip"
                                         :type="item.type"
            :enabled="item.enabled">
            </DailyParameterItem>
        </div>
    </div>
</template>

<script>
import DailyParameterItem from "@/components/sideBar/DailyParameterItem.vue";
import {dailyConfig} from "@/config/dailyConfig"

export default {
    name: "DailyParameter",
    components: {
        DailyParameterItem
    },
    data() {
        return {
            parameters: dailyConfig
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
