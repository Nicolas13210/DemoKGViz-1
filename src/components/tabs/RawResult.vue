<template>
    <v-tabs class="tabs" v-model="tab" bg-color="secondary">
        <v-tab value="data">
            <v-icon class="mr-2">mdi-table-large</v-icon>
            Daily
        </v-tab>
        <v-tab value="global">
            <v-icon class="mr-2">mdi-table-large</v-icon>
            Global
        </v-tab>

    </v-tabs>
    <v-window class="windows" v-model="tab">
        <v-window-item value="data">
            <RawDataResult></RawDataResult>
        </v-window-item>
        <v-window-item value="global">
            <TableChart></TableChart>
        </v-window-item>
    </v-window>
</template>
<script>
import RawDataResult from "@/components/tabs/RawDataResult.vue";
import TableChart from "@/components/tabs/TableChart.vue";

export default {
    name: "Results",
    data: () => ({
        tab: null,
    }),
    components: {
        RawDataResult,
        TableChart
    },
}
</script>