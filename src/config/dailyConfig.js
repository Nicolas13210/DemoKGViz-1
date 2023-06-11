import {getRequestDailyData} from "@/queries/daily_queries";

export const dailyConfig = [
    {
        title: "Daily Weather Variables",
        items: [
            {
                title: "Daily minimum temperature (DT<sub>min</sub>)",
                tooltip: "TO BE DEFINED",
                param: "DTMin",
                jsonPath: "daily_temp_min",
                request: getRequestDailyData,
                availableChart: "line",
                displayUnit: "°C",
                enabled: true
            },
            {
                title: "Daily maximum temperature (DT<sub>max</sub>)",
                tooltip: "TO BE DEFINED",
                param: "DTMax",
                jsonPath: "daily_temp_max",
                request: getRequestDailyData,
                availableChart: "line",
                displayUnit: "°C",
                enabled: true
            },
            {
                title: "Daily mean (average) temperature (DT<sub>mean</sub>)",
                tooltip: "TO BE DEFINED",
                param: "DTMean",
                jsonPath: "daily_temp_mean",
                request: getRequestDailyData,
                availableChart: "line",
                displayUnit: "°C",
                enabled: true
            },
            {
                title: "Daily range of temperature (DT<sub>range</sub>)",
                tooltip: "TO BE DEFINED",
                param: "DTRange",
                jsonPath: "daily_thermal_ampl",
                request: getRequestDailyData,
                availableChart: "line",
                displayUnit: "°C",
                enabled: true
            },
            {
                title: "Daily cumulative precipitation (rain<sub>sum</sub>)",
                tooltip: "Sum of daily cumulative precipitation recorded during a period",
                param: "rainSum",
                jsonPath: "daily_rainfall",
                request: getRequestDailyData,
                availableChart: "bar",
                displayUnit: "mm",
                enabled: true
            },
            {
                title: "Shortwave Radiation Sum (sr<sub>sum</sub>)",
                tooltip: "TO BE DEFINED",
                param: "srSum",
                jsonPath: "TO BE DEFINED",
                request: undefined,
                availableChart: "line",
                displayUnit: "TO BE DEFINED",
                enabled: false
            },
            {
                title: "Daily average humidity (hum<sub>avg</sub>)",
                tooltip: "TO BE DEFINED",
                param: "humAvg",
                jsonPath: "daily_airhumidity",
                request: getRequestDailyData,
                availableChart: "line",
                displayUnit: "%",
                enabled: true
            },
            {
                title: "Sum of daily ETP (sum<sub>ETP</sub>)",
                tooltip: "TO BE DEFINED",
                param: "sumEtp",
                jsonPath: "TODO",
                request: undefined,
                availableChart: "line",
                displayUnit: "TO BE DEFINED",
                enabled: false
            },
            {
                title: "GDD",
                tooltip: "TO BE DEFINED",
                param: "gdd",
                jsonPath: "daily_gdd",
                request: getRequestDailyData,
                availableChart: "bar",
                displayUnit: "°C",
                enabled: true
            }
        ]
    }
]
