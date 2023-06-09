import {buildQuery_GddDaysStation, buildQuery_nbStatsDaysStation} from "@/queries/queries"

export const agroMeteorologicalConfig = [{
    title: "Freezing cold", items: [{
        title: "Number of days with low temperatures (T<sub>min</sub> < -5°C)",
        tooltip: "TO BE DEFINED",
        param: "cDaysTMin",
        jsonPath: "nbDaysTemp5",
        request: buildQuery_tmpRainStation,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of frost days (T<sub>Mean</sub> < 0°C)",
        tooltip: "TO BE DEFINED",
        param: "cFrostDays",
        jsonPath: "nbfrostDaysTavg",
        request: buildQuery_tmpRainStation,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days with extreme low temperatures (T<sub>min</sub> < -10°C)",
        tooltip: "TO BE DEFINED",
        param: "cDaysTMin10",
        jsonPath: "nbDaysextremeTemp10",
        request: buildQuery_tmpRainStation,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days with extreme low temperatures (T<sub>min</sub> < -4°C)",
        tooltip: "TO BE DEFINED",
        param: "cDaysTMin4",
        jsonPath: "nbDaysextremeTemp4",
        request: buildQuery_tmpRainStation,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of frost days (T<sub>min</sub> < 0°C)",
        tooltip: "TO BE DEFINED",
        param: "cFrostDays",
        jsonPath: "nbfrostDaysTmin",
        request: buildQuery_tmpRainStation,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of vernalization days (3°C < T<sub>mean</sub> < 10°C)",
        tooltip: "TO BE DEFINED",
        param: "vernDays",
        jsonPath: "vernalizationDays",
        request: buildQuery_tmpRainStation,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Frequency of vernalization days",
        tooltip: "Frequency (%) of days with 3°C < mean tm < 10°C.",
        param: "vernFreq",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "%",
        enabled: false
    }, {
        title: "Spellrost",
        tooltip: "TO BE DEFINED",
        param: "numbColdWav",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "First frost day",
        tooltip: "TO BE DEFINED",
        param: "frostStart",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "Last frost day",
        tooltip: "TO BE DEFINED",
        param: "frostEnd",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }]
}, {
    title: "Heat", items: [{
        title: "Number of days of extreme heat stress (T<sub>max</sub> > 20°C)",
        tooltip: "TO BE DEFINED",
        param: "xhsDaysMax20",
        jsonPath: "xhsdaysmax20",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Number of days of extreme heat stress (T<sub>max</sub> > 25°C)",
        tooltip: "TO BE DEFINED",
        param: "xhsDaysMax25",
        jsonPath: "xhsdaysmax25",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days of heat stress (T<sub>mean</sub> > 15°C)",
        tooltip: "TO BE DEFINED",
        param: "hsDaysMean15",
        jsonPath: "hsdaysmean15",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Number of days with mean temperatures (Tmean < 7 °C)",
        tooltip: "",
        param: "TODO",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Number of days of extreme heat stress (T<sub>mean</sub> > 25°C)",
        tooltip: "TO BE DEFINED",
        param: "xhsDaysMean25",
        jsonPath: "xhsdaysmean25",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Accumulated growing degree days",
        tooltip: "TO BE DEFINED",
        param: "sumGDD",
        jsonPath: "SumGDD",
        request: buildQuery_GddDaysStation,
        availableChart: "bar",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Spellheat",
        tooltip: "Nombre de vagues de chaleur de plus de {Spellheat} jours (tmax > {Theat} °C).",
        param: "TODO",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "Accumulated growing degree days (sumGDD)",
        tooltip: "Sum of average temperatures on days when tmean > 0°C.",
        param: "gdd",
        jsonPath: "gdd",
        request: buildQuery_GddDaysStation,
        availableChart: "line",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Last heat day",
        tooltip: "Dernier jour d'échaudage (tmax > {Theat} °C) en jour julien.",
        param: "heatend",
        jsonPath: "heatend",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "First heat day",
        tooltip: "Premier jour d'échaudage (tmax > {Theat} °C) en jour julien.",
        param: "heatend",
        jsonPath: "heatend",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }]
}, {
    title: "Humidity conditions", items: [{
        title: "Number of wet days (nbWetDays)",
        tooltip: "Number of wet days represents the number of days during which the humidity is higher than 60% for a period",
        param: "wetDays",
        jsonPath: "nbWetDays",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Number of dry days (nbDryDays)",
        tooltip: "Number of dry days represents the number of days during which the humidity is lower than 40% for a period",
        param: "nbDryDays",
        jsonPath: "nbDryDays",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Frequency of wet days (wetFreq)",
        tooltip: "TO BE DEFINED",
        param: "wetFreq",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: false
    }, {
        title: "Frequency of dry days (dryFreq)",
        tooltip: "Frequency of dry days represents the frequency during which the humidity is lower than 40% for a period",
        param: "TODO",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: false
    },
        {
            title: "Sum of high humidity (highHumSum)",
            tooltip: "TODO",
            param: "TODO",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: false
        },
        {
            title: "Sum of dry humidity (lowHumSum)",
            tooltip: "TODO",
            param: "TODO",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: false
        },
        {
            title: "Waves of high humidity (numbWetWav)",
            tooltip: "TODO",
            param: "TODO",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: false
        },
        {
            title: "Waves of low humidity (numbDryWav)",
            tooltip: "TODO",
            param: "TODO",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: false
        }]
}, {
    title: "Water Deficit", items: [{
        title: "Number of rainy days",
        tooltip: "Nombre de jours rr > 0 mm",
        param: "raidays",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Number of heavy rainy days (rr > 15mm)",
        tooltip: "TO BE DEFINED",
        param: "hRaiDays15",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of heavy rainy days (rr > 20mm)",
        tooltip: "TO BE DEFINED",
        param: "hRaiDays20",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of heavy rainy days (rr > 30mm)",
        tooltip: "TO BE DEFINED",
        param: "hRaiDays30",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Cumulative precipitation",
        tooltip: "Amount of precipitation",
        param: "cprecip",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Frequency of rainy days",
        tooltip: "TO BE DEFINED",
        param: "raiFreq",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " %",
        enabled: false
    }, {
        title: "Number of rainless days",
        tooltip: "Number of days with rainfall deficit.",
        param: "defraidays",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: false
    }, {
        title: "Frequency of rainless days",
        tooltip: "Frequency (%) of days with rainfall deficit",
        param: "defraifreq",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " %",
        enabled: false
    }, {
        title: "Number of days with water deficit",
        tooltip: "Number of days with soil water content < 9.0.",
        param: "watsdays",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: false
    }, {
        title: "Frequency of days with water deficit",
        tooltip: "Frequency (%) of days with soil water content < 9.0.",
        param: "watsfreq",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " %",
        enabled: false
    }, {
        title: "Sum of water deficit",
        tooltip: "Sum of water deficits: Σ(RAIN - ETP).",
        param: "sumwd",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "line",
        displayUnit: " mm",
        enabled: false
    }, {
        title: "Number of days of water deficit",
        tooltip: "TO BE DEFINED",
        param: "wdDays",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: false
    }, {
        title: "Number of consecutive days with (rain - ETP) > seuil",
        tooltip: "Highest number of consecutive days with (rain - FTE) > threshold.",
        param: "maxconswatexcdays",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: false
    }, {
        title: "Drought waves",
        tooltip: "Number of dry spells (20 consecutive days without rain).",
        param: "numbdroughtwav",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: " nb",
        enabled: false
    } ]
},/*{
    title: "Wind", items: [{
        title: "Number of high wind days (wind)",
        tooltip: "Number of high wind days represents the number of days during the wind is higher than 5.28 m/s for a period",
        param: "nbWindyDays",
        jsonPath: "nbWindyDays",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }]
}*/ {
    title: "Frost days and ice days", items: [{
        title: "Number of frost days (frostDays)",
        tooltip: "Number of frost days represents the number of days during which the minimum temperature is lower than 0°C for a period",
        param: "nbFrostDays",
        jsonPath: "nbFrostDays",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Number of ice days (iceDays)",
        tooltip: "Number of ice days represents the number of days when the maximum temperature is lower than 0°C for a period",
        param: "iceDays",
        jsonPath: "TODO",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }]
}, {
    title: "Thermal conditions", items: [{
        title: "Mean of daily minimum air temperature",
        tooltip: "TO BE DEFINED",
        param: "meanMinT",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Mean of daily maximum air temperature",
        tooltip: "TODO",
        param: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Mean of daily average air temperature",
        tooltip: "TODO",
        param: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Mean of daily range of temperature",
        tooltip: "TO BE DEFINED",
        param: "meanRangeT",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Photothermal coefficient",
        tooltip: "TO BE DEFINED",
        param: "photoThermalQuotient",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "°C",
        enabled: false
    }]
}]
