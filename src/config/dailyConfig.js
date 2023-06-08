import {buildQuery_dailyCumulativePrecipitation, buildQuery_tmpRainStation} from "@/queries/queries"

export const dailyConfig = [
    {
        title: "Daily Weather Variables", "items": [
            {
                title: "Daily minimum temperature (T<sub>min</sub>)",
                tooltip: "The daily minimum temperature represents the lower air temperature recorded from 18:00 UTC day d-1 till 18:00 UTC day d",
                type: "TmpRain",
                param: "TMin",
                jsonPath: "temp_min",
                request: buildQuery_tmpRainStation,
                availableChart: "line",
                displayUnit: "°C",
                enabled: true
            }, {
                title: "Daily maximum temperature (T<sub>max</sub>)",
                tooltip: "The daily maximum temperature represents the highest air temperature recorded from 6:00 UTC day d till 6:00 UTC day d+1",
                type: "TmpRain",
                param: "TMax",
                jsonPath: "temp_max",
                request: buildQuery_tmpRainStation,
                availableChart: "line",
                displayUnit: "°C",
                enabled: true
            }, {
                title: "Daily mean (average) temperature (T<sub>avg</sub>)",
                tooltip: "The daily mean temperature represents the average value of daily maximum and minimum temperatures",
                type: "TmpRain",
                param: "TMean",
                jsonPath: "temp_avg",
                request: buildQuery_tmpRainStation,
                availableChart: "line",
                displayUnit: "°C",
                enabled: true
            }, {
                title: "Daily range of temperature (T<sub>Diff</sub>)",
                tooltip: "The daily thermal amplitude represents the difference between the maximum and the minimum temperature for each days",
                type: "TmpRain",
                param: "TRange",
                jsonPath: "temp_diff",
                request: buildQuery_tmpRainStation,
                availableChart: "line",
                displayUnit: "°C",
                enabled: true
            } /*{
                title: "Daily precipitation (rainDay)",
                tooltip: "Daily cumulative precipitation R<sub>d</sub> recorded from 6:00 UTC day d till 6:00 UTC day d+1",
                type: "TmpRain",
                param: "rainDay",
                jsonPath: "rainfall",
                request: buildQuery_tmpRainStation,
                availableChart: "bar",
                displayUnit: "mm",
                enabled: false
            }*/, {
                title: "Daily cumulative precipitation (sumRain)",
                tooltip: "Sum of daily cumulative precipitation recorded during a period",
                type: "GddRain",
                param: "sumRain",
                jsonPath: "rainfall",
                request: buildQuery_dailyCumulativePrecipitation,
                availableChart: "line",
                displayUnit: "mm",
                enabled: true
            }, {
                title: "Shortwave Radiation Sum",
                tooltip: "TODO",
                type: "TODO",
                param: "srsum",
                jsonPath: "TODO",
                request: undefined,
                availableChart: "line",
                displayUnit: "TODO",
                enabled: false
            }, {
                title: "Daily average humidity",
                tooltip: "Average daily humidity.",
                type: "TODO",
                param: "humavg",
                jsonPath: "TODO",
                request: undefined,
                availableChart: "line",
                displayUnit: "TODO",
                enabled: true
            }, {
                title: "Sum of daily ETP",
                tooltip: "Sum of daily potential evapotranspiration (mm).",
                type: "TODO",
                param: "sumetp",
                jsonPath: "TODO",
                request: undefined,
                availableChart: "line",
                displayUnit: "TODO",
                enabled: false
            }
        ]
    }
]
