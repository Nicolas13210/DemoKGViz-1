import {buildQuery_GddDaysStation, buildQuery_nbStatsDaysStation} from "@/queries/queries"

export const agroMeteorologicalConfig = [{
    title: "Freezing cold", items: [{
        title: "Number of rainy days (nbRainDay)",
        tooltip: "Number of rainy days represents the number of days during which R<sub>d</sub> > 1mm",
        param: "nbRainyDays",
        jsonPath: "nbRainyDays",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    },
        {
            title: "Number of frost days (TMean < 0°C)",
            tooltip: "TODO",
            param: "TODO",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: true
        },
        {
            title: "Number of days with extreme low temperatures (Tmin < -10°C)",
            tooltip: "TODO",
            param: "TODO",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: true
        },
        {
            title: "Number of frost days (Tmin < 0°C)",
            tooltip: "TODO",
            param: "TODO",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: true
        },
        {
            title: "Last frost day",
            tooltip: "Last day of frost on a Julian day.",
            param: "frostend",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: false
        },
        {
            title: "Number of vernalization days (3°C < tmoy < 10 °C)",
            tooltip: "Number of days for which 3°C < tmoy < 10 °C.",
            param: "verndays",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " day(s)",
            enabled: false
        },
        {
            title: "Frequency of vernalization days ",
            tooltip: "Frequency (%) of days with 3°C < mean tm < 10°C.",
            param: "vernfreq",
            jsonPath: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: " %",
            enabled: false
        }]
}, {
    title: "Heat", items: [{
        title: "Number of days of extreme heat stress (Tmax > 20 °C)",
        tooltip: "Number of summer days represents the number of days during which the maximum temperature is higher than 25°C for a period",
        param: "TODO",
        jsonPath: "TODO",
        request: buildQuery_nbStatsDaysStation,
        availableChart: "POLAR",
        displayUnit: " day(s)",
        enabled: true
    }, {
        title: "Number of days of heat stress (Tmean> 15°C)",
        tooltip: "",
        param: "TODO",
        jsonPath: "TODO",
        request: undefined,
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
        title: "Spellheat",
        tooltip: "Nombre de vagues de chaleur de plus de {Spellheat} jours (tmax > {Theat} °C).",
        param: "TODO",
        jsonPath: "TODO",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TODO",
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
        displayUnit: "°C",
        enabled: false
    }, {
        title: "First heat day",
        tooltip: "Premier jour d'échaudage (tmax > {Theat} °C) en jour julien.",
        param: "heatend",
        jsonPath: "heatend",
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "°C",
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
        tooltip: "Frequency of wet days represents the frequency during which the humidity is higher than 60% for a period",
        param: "TODO",
        jsonPath: "TODO",
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
        tooltip: "Frequency (%) of rainy days.",
        param: "raifreq",
        jsonPath: "TODO",
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
        tooltip: "TODO",
        param: "TODO",
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
    },
        {
            title: "Mean of daily range of temperature",
            tooltip: "TODO",
            param: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: "°C",
            enabled: true
        },
        {
            title: "Photothermal coefficient",
            tooltip: "TODO",
            param: "TODO",
            request: undefined,
            availableChart: "POLAR",
            displayUnit: "°C",
            enabled: false
        }
    ]
}]
