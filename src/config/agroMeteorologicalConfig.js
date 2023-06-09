import {getRequestFreezingColdData} from "@/queries/freezing_cold_queries";
import {getRequestHeatData} from "@/queries/heat_queries";
import {getRequestHumidityConditionsData} from "@/queries/humidity_conditions_queries";
import {getRequestWaterDeficitData} from "@/queries/water_deficit_queries";
import {getRequestThermalConditionsData} from "@/queries/thermal_conditions_queries";

export const agroMeteorologicalConfig = [{
    title: "Freezing cold", items: [{
        title: "Number of days with low temperatures (T<sub>min</sub> < -5°C)",
        tooltip: "TO BE DEFINED",
        param: "cDaysTMin",
        jsonPath: "nbDaysTemp5",
        request: getRequestFreezingColdData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of frost days (T<sub>Mean</sub> < 0°C)",
        tooltip: "TO BE DEFINED",
        param: "cFrostDays",
        jsonPath: "nbfrostDaysTavg",
        request: getRequestFreezingColdData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days with extreme low temperatures (T<sub>min</sub> < -10°C)",
        tooltip: "TO BE DEFINED",
        param: "cDaysTMin10",
        jsonPath: "nbDaysextremeTemp10",
        request: getRequestFreezingColdData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days with extreme low temperatures (T<sub>min</sub> < -4°C)",
        tooltip: "TO BE DEFINED",
        param: "cDaysTMin4",
        jsonPath: "nbDaysextremeTemp4",
        request: getRequestFreezingColdData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of frost days (T<sub>min</sub> < 0°C)",
        tooltip: "TO BE DEFINED",
        param: "cFrostDays",
        jsonPath: "nbfrostDaysTmin",
        request: getRequestFreezingColdData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of vernalization days (3°C < T<sub>mean</sub> < 10°C)",
        tooltip: "TO BE DEFINED",
        param: "vernDays",
        jsonPath: "vernalizationDays",
        request: getRequestFreezingColdData,
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
        request: getRequestHeatData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days of extreme heat stress (T<sub>max</sub> > 25°C)",
        tooltip: "TO BE DEFINED",
        param: "xhsDaysMax25",
        jsonPath: "xhsdaysmax25",
        request: getRequestHeatData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days of heat stress (T<sub>mean</sub> > 15°C)",
        tooltip: "TO BE DEFINED",
        param: "hsDaysMean15",
        jsonPath: "hsdaysmean15",
        request: getRequestHeatData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days with mean temperatures (T<sub>mean</sub> < 7°C)",
        tooltip: "TO BE DEFINED",
        param: "daysMean7",
        jsonPath: "daysmean7",
        request: getRequestHeatData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of days of extreme heat stress (T<sub>mean</sub> > 25°C)",
        tooltip: "TO BE DEFINED",
        param: "xhsDaysMean25",
        jsonPath: "xhsdaysmean25",
        request: getRequestHeatData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Accumulated growing degree days",
        tooltip: "TO BE DEFINED",
        param: "sumGDD",
        jsonPath: "SumGDD",
        request: getRequestHeatData,
        availableChart: "bar",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Spellheat",
        tooltip: "TO BE DEFINED",
        param: "numbHeatWav",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "Last heat day",
        tooltip: "TO BE DEFINED",
        param: "heatEnd",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "First heat day",
        tooltip: "TO BE DEFINED",
        param: "heatStart",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }]
}, {
    title: "Humidity conditions", items: [{
        title: "Number of wet days (wetDays)",
        tooltip: "TO BE DEFINED",
        param: "wetDays",
        jsonPath: "TODO",
        request: getRequestHumidityConditionsData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of dry days (dryDays)",
        tooltip: "TO BE DEFINED",
        param: "dryDays",
        jsonPath: "TODO",
        request: getRequestHumidityConditionsData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Frequency of wet days (wetFreq)",
        tooltip: "TO BE DEFINED",
        param: "wetFreq",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "%",
        enabled: false
    }, {
        title: "Frequency of dry days (dryFreq)",
        tooltip: "TO BE DEFINED",
        param: "dryFreq",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "%",
        enabled: false
    }, {
        title: "Sum of high humidity (highHumSum)",
        tooltip: "TO BE DEFINED",
        param: "highHumSum",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "Sum of dry humidity (lowHumSum)",
        tooltip: "TO BE DEFINED",
        param: "lowHumSum",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "Waves of high humidity (numbWetWav)",
        tooltip: "TO BE DEFINED",
        param: "numbWetWav",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }, {
        title: "Waves of low humidity (numbDryWav)",
        tooltip: "TO BE DEFINED",
        param: "numbDryWav",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }]
}, {
    title: "Water Deficit", items: [{
        title: "Number of rainy days (rr > 0mm)",
        tooltip: "TO BE DEFINED",
        param: "raiDays",
        jsonPath: "TODO",
        request: getRequestWaterDeficitData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of heavy rainy days (rr > 15mm)",
        tooltip: "TO BE DEFINED",
        param: "hRaiDays15",
        jsonPath: "TODO",
        request: getRequestWaterDeficitData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of heavy rainy days (rr > 20mm)",
        tooltip: "TO BE DEFINED",
        param: "hRaiDays20",
        jsonPath: "TODO",
        request: getRequestWaterDeficitData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Number of heavy rainy days (rr > 30mm)",
        tooltip: "TO BE DEFINED",
        param: "hRaiDays30",
        jsonPath: "TODO",
        request: getRequestWaterDeficitData,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: true
    }, {
        title: "Cumulative precipitation",
        tooltip: "TO BE DEFINED",
        param: "cPrecip",
        jsonPath: "TODO",
        request: getRequestWaterDeficitData,
        availableChart: "bar",
        displayUnit: "mm",
        enabled: true
    }, {
        title: "Frequency of rainy days",
        tooltip: "TO BE DEFINED",
        param: "raiFreq",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "%",
        enabled: false
    }, {
        title: "Number of rainless days",
        tooltip: "TO BE DEFINED",
        param: "defraiDays",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: false
    }, {
        title: "Frequency of rainless days",
        tooltip: "TO BE DEFINED",
        param: "defraiFreq",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "%",
        enabled: false
    }, {
        title: "Number of days with water deficit",
        tooltip: "TO BE DEFINED",
        param: "watsDays",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: false
    }, {
        title: "Frequency of days with water deficit",
        tooltip: "TO BE DEFINED",
        param: "watsFreq",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "%",
        enabled: false
    }, {
        title: "Sum of water deficit",
        tooltip: "TO BE DEFINED",
        param: "sumWd",
        jsonPath: undefined,
        request: undefined,
        availableChart: "line",
        displayUnit: "mm",
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
        tooltip: "TO BE DEFINED",
        param: "maxConsWatExcDays",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "day(s)",
        enabled: false
    }, {
        title: "Drought waves",
        tooltip: "TO BE DEFINED",
        param: "numbDroughtWav",
        jsonPath: undefined,
        request: undefined,
        availableChart: "POLAR",
        displayUnit: "TO BE DEFINED",
        enabled: false
    }]
}, {
    title: "Thermal conditions", items: [{
        title: "Mean of daily minimum air temperature",
        tooltip: "TO BE DEFINED",
        param: "meanMinT",
        jsonPath: "TODO",
        request: getRequestThermalConditionsData,
        availableChart: "POLAR",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Mean of daily maximum air temperature",
        tooltip: "TO BE DEFINED",
        param: "meanMaxT",
        jsonPath: "TODO",
        request: getRequestThermalConditionsData,
        availableChart: "POLAR",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Mean of daily average air temperature",
        tooltip: "TO BE DEFINED",
        param: "meanAvgT",
        jsonPath: "TODO",
        request: getRequestThermalConditionsData,
        availableChart: "POLAR",
        displayUnit: "°C",
        enabled: true
    }, {
        title: "Mean of daily range of temperature",
        tooltip: "TO BE DEFINED",
        param: "meanRangeT",
        jsonPath: "TODO",
        request: getRequestThermalConditionsData,
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
