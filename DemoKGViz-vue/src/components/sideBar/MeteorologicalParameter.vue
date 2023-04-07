<template>
    <div class="container">
        <div class="text-subtitle-2 font-weight-bold">Parameters</div>
        <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel v-for="(parameter, i) in parameters" :key="i">
                <v-expansion-panel-title disable-icon-rotate>
                    {{ parameter.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <MeteorologicalParameterItem v-for="item in parameter.items" :title="item.title" :tooltip="item.tooltip"
                        :type="item.type" :param="item.param">
                    </MeteorologicalParameterItem>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
import MeteorologicalParameterItem from "@/components/sideBar/MeteorologicalParameterItem.vue";

export default {
    name: "MeteorologicalParameter",
    components: {
        MeteorologicalParameterItem
    },
    data() {
        return {
            parameters: [
                {
                    title: "Daily temperature",
                    items: [
                        {
                            title: "Minimum temperature",
                            tooltip: "The daily minimum temperature represents the lower temperature for each days",
                            type: "TmpRain",
                            param: "TMin"
                        },
                        {
                            title: "Maximum temperature",
                            tooltip: "The daily maximum temperature represents the higher temperature for each days",
                            type: "TmpRain",
                            param: "TMax"
                        },
                        {
                            title: "Maximum temperature",
                            tooltip: "The daily maximum temperature represents the higher temperature for each days",
                            type: "TmpRain",
                            param: "TMax"
                        },
                        {
                            title: "Thermal amplitude",
                            tooltip: "The daily thermal amplitude represents the difference between the maximum and the minimum temperature for each days",
                            type: "TmpRain",
                            param: "TDiff",
                        }
                    ]
                },
                {
                    title: "Precipitation",
                    items: [
                        {
                            title: "Daily precipitation",
                            tooltip: "Cumulative daily precipitation Rd recorded from 6:00 UTC day d till 6:00 UTC day d+1",
                            type: "TmpRain",
                            param: "rainDay",
                        },
                        {
                            title: "Number of rainy days",
                            tooltip: "Number of rainy days represents the number of days during which Rd > 1mm",
                            type: "Numb",
                            param: "nbRainDay",
                        },
                        {
                            title: "Total precipitation",
                            tooltip: "Sum of daily cumulative precipitation recorded during a period",
                            type: "GddRain",
                            param: "sumRain",
                        },
                    ]
                },
                {
                    title: "Humidity",
                    items: [
                        {
                            title: "Number of wet days",
                            tooltip: "Number of wet days represents the number of days during which the humidity is higher than 60% for a period",
                            type: "Numb",
                            param: "nbWetDays",
                        },
                    ]
                },
                {
                    title: "Wind",
                    items: [
                        {
                            title: "Number of high wind days",
                            tooltip: "Number of high wind days represents the number of days during the wind is higher than 5.28 m/s for a period",
                            type: "Numb",
                            param: "highWind",
                        },
                    ]
                },
                {
                    title: "Frost days and ice days",
                    items: [
                        {
                            title: "Number of frost days",
                            tooltip: "Number of frost days represents the number of days during which the minimum temperature is lower than 0°C for a period",
                            type: "Numb",
                            param: "frostDays",
                        },
                        {
                            title: "Number of ice days",
                            tooltip: "Number of ice days represents the number of days when the maximum temperature is lower than 0°C for a period",
                            type: "Numb",
                            param: "iceDays",
                        },
                    ]
                },
                {
                    title: "Summer days and heat days",
                    items: [
                        {
                            title: "Number of summer days",
                            tooltip: "Number of summer days represents the number of days during which the maximum temperature is higher than 25°C for a period",
                            type: "Numb",
                            param: "summerDays",
                        },
                        {
                            title: "Number of heat days (heatDays)",
                            tooltip: "Number of stress days represents the number of days during which the minimum temperature is higher than 20°C for a period",
                            type: "Numb",
                            param: "heatDays",
                        },
                    ]
                },
                {
                    title: "Growing degree days",
                    items: [
                        {
                            title: "Growing degree days",
                            tooltip: "Growing degree days is equal to the average daily temperature minus base temperature",
                            type: "GddRain",
                            param: "Gdd",
                        },
                        {
                            title: "Accumulated growing degree days",
                            tooltip: "Accumulated growing degree days represents the sum of Growing degree days (GDD) over a period of time",
                            type: "GddRain",
                            param: "sumGdd",
                        },
                        {
                            title: "Growing Season Tmax",
                            tooltip: "Average of the daily maximum temperature (Tmax) during the growing season",
                            type: "GddRain",
                            param: "GSTmax",
                        },
                        {
                            title:"Growing Season Tmin",
                            tooltip: "Average of the daily minimum temperature (Tmin) during the growing season",
                            type: "GddRain",
                            param: "GSTmin",
                        },
                    ]
                },
            ],
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
