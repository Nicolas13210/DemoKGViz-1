<template>
    <div class="container">
        <div class="text-subtitle-2 font-weight-bold">Agro-Meteorological Variables  </div>
        <!-- TODO: remove "panel" to be more extensible -->
        <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel v-for="(parameter, i) in parameters" :key="i">
                <v-expansion-panel-title disable-icon-rotate>
                    {{ parameter.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <MeteorologicalParameterItem v-for="item in parameter.items"
                                                 :title="item.title"
                                                 :tooltip="item.tooltip"
                                                 :param="item.param"
                                                 :request="item.request"
                                                 :json-path="item.jsonPath"
                                                 :available-chart="item.availableChart"
                                                 :displayUnit="item.displayUnit"
                                                 :enabled="item.enabled">
                    </MeteorologicalParameterItem>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
import MeteorologicalParameterItem from "@/components/sideBar/MeteorologicalParameterItem.vue";
import {agroMeteorologicalConfig} from "@/config/agroMeteorologicalConfig"

export default {
    name: "MeteorologicalParameter",
    components: {
        MeteorologicalParameterItem
    },
    data() {
        return {
            parameters: agroMeteorologicalConfig,
            panel: [0, 1, 2, 3, 4, 5, 6]
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
