import {
    buildQuery_tmpRainStation,
    buildQuery_nbStatsDaysStation,
    buildQuery_GddDaysStation,
    buildQuery_nbStatsDaysHumStation,
    buildQuery_consecutiveDaysSpellFrost,
    buildQuery_consecutiveDaysSpellHeat,
    buildQuery_consecutiveDaysHighHum,
    buildQuery_consecutiveDaysDroughtWave,
    buildQuery_consecutiveDaysmaxConsDays,
    buildQuery_StatsPeriod,
    buildQuery_consecutiveDaysLowHum,
    buildQuery_dailyCumulativeDeficit

    
} from "@/queries/queries"

export const metricsConfig = [{"title":"Daily Weather Variables" , "items":[{
    "title": "Daily temperature", "items": [{
        "title": "Minimum temperature (T<sub>min</sub>)",
        "tooltip": "The daily minimum temperature represents the lower air temperature recorded from 18:00 UTC day d-1 till 18:00 UTC day d",
        "type": "TmpRain",
        "param": "TMin",
        "jsonPath": "temp_min",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Temperature (°C)" ,
        "displayUnit":"°C",
        "related":[{
            "title": "Mean of daily minimum air temperature",
            "tooltip": "The mean of the daily minimum temperature over the period",
            "type": "average",
            "param":"minMean",
            "jsonPath":"meanmint",
            "request" : buildQuery_StatsPeriod,
            "availableChart":"table",
            "axisLegend":"Temperature (°C)",
            "displayUnit": "°C",
            "related":[]
        }],
    }, {
        "title": "Maximum temperature (T<sub>max</sub>)",
        "tooltip": "The daily maximum temperature represents the highest air temperature recorded from 6:00 UTC day d till 6:00 UTC day d+1",
        "type": "TmpRain",
        "param": "TMax",
        "jsonPath": "temp_max",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Temperature (°C)" ,
        "displayUnit":"°C",
        "related":[{
            "title": "Mean of daily maximum air temperature",
            "tooltip": "The mean of the daily maximum temperature over the period",
            "type": "average",
            "param":"maxMean",
            "jsonPath":"meanmaxt",
            "request" : buildQuery_StatsPeriod,
            "availableChart":"table",
            "axisLegend":"Temperature (°C)",
            "displayUnit": "°C",
            "related":[]
        }],
    }, {
        "title": "Mean temperature (T<sub>avg</sub>)",
        "tooltip": "The daily mean temperature represents the average value of the temperatures",
        "type": "TmpRain",
        "param": "TMean",
        "jsonPath": "temp_avg",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Temperature (°C)" ,
        "displayUnit":"°C",
        "related":[{
            "title": "Mean of daily average air temperature",
            "tooltip": "The mean of the daily average temperature over the period",
            "type": "average",
            "param":"minAvg",
            "jsonPath":"meanavgt",
            "request" : buildQuery_StatsPeriod,
            "availableChart":"table",
            "axisLegend":"Temperature (°C)",
            "displayUnit": "°C",
            "related":[]
        }],
    }, {
        "title": "Thermal amplitude (T<sub>Diff</sub>)",
        "tooltip": "The daily thermal amplitude represents the difference between the maximum and the minimum temperature for each days",
        "type": "TmpRain",
        "param": "TDiff",
        "jsonPath": "temp_diff",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Temperature (°C)",
        "displayUnit":"°C",
        "related":[{
            "title": "Mean of daily range temperature",
            "tooltip": "The mean of the daily range temperature over the period",
            "type": "average",
            "param":"minRange",
            "jsonPath":"meanranget",
            "request" : buildQuery_StatsPeriod,
            "availableChart":"table",
            "axisLegend":"Temperature (°C)",
            "displayUnit": "°C",
            "related":[]
        }],
    }, {
        "title": "Daily precipitation (rainDay)",
        "tooltip": "Daily cumulative precipitation R<sub>d</sub> recorded from 6:00 UTC day d till 6:00 UTC day d+1",
        "type": "TmpRain",
        "param": "rainDay",
        "jsonPath": "rainfall",
        "request": buildQuery_tmpRainStation,
        "availableChart": "bar",
        "axisLegend": "Precipitations(mm)" ,
        "displayUnit":"mm",
        "related":[],
    }, {
        "title": "Radiation sum (rad<sub>sum</sub>)",
        "tooltip": "The radiation sum",
        "type": "TmpRain",
        "param": "radiation",
        "jsonPath": "radiation",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Radiations (W/m²)",
        "displayUnit":"W/m²",
        "related":[],
    }, {
        "title": "Daily Average Humidity (hum <sub>avg</sub>)",
        "tooltip": "The average humidiy",
        "type": "TmpRain",
        "param": "humidity",
        "jsonPath": "humidity",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "humidity (%)",
        "displayUnit":"%",
        "related":[],
    }, {
        "title": "Evapotranspiration (ETP<sub>sum</sub>)",
        "tooltip": "The evapotranspiration",
        "type": "TmpRain",
        "param": "evapotranspiration",
        "jsonPath": "evapotranspiration",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": " Evapotranspiration (ET0)",
        "displayUnit":"ET_0",
        "related":[],
        
    }]
}]}, {
    "title":"Agro-Meteorological Variables  ", "items":[
    {
    "title": "Freezing cold","items":[{
        "title": "Number of frost days (frostDays)",
        "tooltip": "Number of frost days represents the number of days during which the minimum temperature is lower than a limit for a period",
        "type": "Numb",
        "param": "nbFrostDays",
        "jsonPath": "nbFrostDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Frost day start",
                    "tooltip": "First day of the period where the minimum temperature is lower than the limit",
                    "type": "Numb",
                    "param": "startFrost",
                    "jsonPath": "startFrost",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "date",
                    "displayUnit":"date",
                    "related":[]
        
                }, {
                    "title": "Frost day end",
                    "tooltip": "Last day of the period where the minimum temperature is lower than the limit",
                    "type": "Numb",
                    "param": "endFrost",
                    "jsonPath": "endFrost",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "date",
                    "displayUnit":"date",
                    "related":[]
        
                }, {
                    "title": "Frost frequencie",
                    "tooltip": "Percentage of frost days over the period",
                    "type": "Numb",
                    "param": "frostFrequencie",
                    "jsonPath": "frostFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title": "Period of frost",
                    "tooltip": "Number of days between the first and the last day of frost",
                    "type": "Numb",
                    "param": "frostPeriod",
                    "jsonPath": "frostPeriod",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "days",
                    "displayUnit":"nb days",
                    "related":[]
        
                }, {
                    "title":"Spell frost",
                    "tooltip":"Number of spell frost that lasted at least {SpellFrost} day (T<sub>min</sub> \< cold) ",
                    "type": "frost",
                    "param": "spellFrost",
                    "jsonPath": "SpellFrost",
                    "request": buildQuery_consecutiveDaysSpellFrost,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"nb",
                    "related":[]
                    }],
    }, {
        "title": "Number of cold days (coldDays)",
        "tooltip": "Number of cold days represents the number of days when the mean temperature is lower than a limit for a period",
        "type": "Numb",
        "param": "nbColdDays",
        "jsonPath": "nbColdDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Cold frequencie",
                    "tooltip": "Percentage of cold days over the period",
                    "type": "Numb",
                    "param": "coldFrequencie",
                    "jsonPath": "coldFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }]
    }, {
        "title": "Number of vernalization days (vernDays)",
        "tooltip": "Number of vernalization days represents the number of days during which the mean temperature is between the min and max temperature choosen",
        "type": "TmpRain",
        "param": "nbVernDays",
        "jsonPath": "nbVernDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": "day(s)",
        "displayUnit":"day(s)",
        "related":[],
    }]
}, {
    "title": "Heat", "items": [ {
        "title": "Number of heat days (heatDays)",
        "tooltip": "Number of heat days represents the number of days during which the maximum temperature is higher than the heat limit for a period",
        "type": "Numb",
        "param": "nbHeatDays",
        "jsonPath": "nbHeatDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": "day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Heat day start",
                    "tooltip": "First day of the period where the maximum temperature is higher than the heat limit",
                    "type": "Numb",
                    "param": "startHeat",
                    "jsonPath": "startHeat",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "date",
                    "displayUnit":"date",
                    "related":[]
        
                }, {
                    "title": "Heat day end",
                    "tooltip": "Last day of the period where the maximum temperature is higher than the heat limit",
                    "type": "Numb",
                    "param": "endHeat",
                    "jsonPath": "endHeat",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "date",
                    "displayUnit":"date",
                    "related":[]
        
                }, {
                    "title": "Heat frequencie",
                    "tooltip": "Percentage of heat days over the period",
                    "type": "Numb",
                    "param": "heatFrequencie",
                    "jsonPath": "heatFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title": "Period of heat",
                    "tooltip": "Number of days between the first and the last day of heat",
                    "type": "Numb",
                    "param": "heatPeriod",
                    "jsonPath": "heatPeriod",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "days",
                    "displayUnit":"nb days",
                    "related":[]
        
                }, {
                    "title":"Spell heat",
                    "tooltip":"Number of spell heat that lasted at least {SpellHeat} days (T<sub>max</sub> \> heat) ",
                    "type": "heat",
                    "param": "spellHeat",
                    "jsonPath": "SpellHeat",
                    "request": buildQuery_consecutiveDaysSpellHeat,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"nb",
                    "related":[]
                    }]
            },{
        "title": "Number of average heat days (avgHeatDays)",
        "tooltip": "Number of average heat days represents the number of days during which the mean temperature is higher than the heat limit for a period",
        "type": "Numb",
        "param": "nbHeatDaysAvg",
        "jsonPath": "nbHeatDaysAvg",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": "day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Heat frequencie",
                    "tooltip": "Percentage of average heat days over the period",
                    "type": "Numb",
                    "param": "heatAvgFrequencie",
                    "jsonPath": "heatAvgFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }]
    }, {
        "title": "Growing degree days (GDD)",
        "tooltip": "Growing degree days is equal to the average daily temperature minus base temperature",
        "type": "GddRain",
        "param": "GDD",
        "jsonPath": "GDD",
        "request": buildQuery_GddDaysStation,   
        "availableChart": "bar",
        "axisLegend": "Temperature (DJ)",
        "displayUnit":"DJ",
        "related":[],
    }, {
        "title": "Accumulated growing degree days (sumGDD)",
        "tooltip": "Accumulated growing degree days represents the sum of Growing degree days (GDD) over a period of time",
        "type": "GddRain",
        "param": "cumulativeGDD",
        "jsonPath": "cumulativeGDD",
        "request": buildQuery_GddDaysStation,
        "availableChart": "line",
        "axisLegend": "Cumulative Temperature (DJ)",
        "displayUnit":"DJ",
        "related":[],
    }, {
        "title": "Photothermal quotient",
        "tooltip": "Photothermal quotient represents the cumulated radiation sum over the GDD on a period of time",
        "type": "GddRain",
        "param": "photothermalquotient",
        "jsonPath": "photothermalquotient",
        "request": buildQuery_GddDaysStation,
        "availableChart": "line",
        "axisLegend": "coeff photothermique (J/(m²DJ))",
        "displayUnit":"J/(m²DJ)",
        "related":[],
    }]
}, {
    "title": "Humidity Conditions", "items": [{
        "title": "Number of wet days (nbWetDays)",
        "tooltip": "Number of wet days represents the number of days during which the humidity is higher than maxHum for a period",
        "type": "Numb",
        "param": "nbWetDays",
        "jsonPath": "nbWetDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Wet frequencie",
                    "tooltip": "Percentage of Wet days over the period",
                    "type": "Numb",
                    "param": "wetFrequencie",
                    "jsonPath": "wetFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title":"High humidity",
                    "tooltip":"Number of spell of high humidity that lasted at least {SpellHum} day (RH \> maxHum) ",
                    "type": "humidity",
                    "param": "highHum",
                    "jsonPath": "HighHum",
                    "request": buildQuery_consecutiveDaysHighHum,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"nb",
                    "related":[]
                    }]
    }, {
        "title": "Number of dry days (nbDryDays)",
        "tooltip": "Number of dry days represents the number of days during which the humidity is lower than minHum for a period",
        "type": "Numb",
        "param": "nbDryDays",
        "jsonPath": "nbDryDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Dry frequencie",
                    "tooltip": "Percentage of dry days over the period",
                    "type": "Numb",
                    "param": "dryFrequencie",
                    "jsonPath": "dryFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title":"Low humidity",
                    "tooltip":"Number of spell of low humidity that lasted at least {SpellHum} day (RH \< minHum) ",
                    "type": "humidity",
                    "param": "lowHum",
                    "jsonPath": "LowHum",
                    "request": buildQuery_consecutiveDaysLowHum,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"nb",
                    "related":[]
                    } ]
    }, {
        "title": "High Humidity Sum",
        "tooltip": "Sum of high humidity (higher than maxHum)",
        "type": "Numb",
        "param": "wetCumul",
        "jsonPath": "wetCumul",
        "request": buildQuery_nbStatsDaysHumStation,
        "availableChart": "line",
        "axisLegend": " humidity (%)",
        "displayUnit":"%",
        "related":[]
    }, {
        "title": "Dry Humidity Sum",
        "tooltip": "Sum of dry humidity (lower than minHum)",
        "type": "Numb",
        "param": "dryCumul",
        "jsonPath": "dryCumul",
        "request": buildQuery_nbStatsDaysHumStation,
        "availableChart": "line",
        "axisLegend": " humidity (%)",
        "displayUnit":"%",
        "related":[]
    }]
}, {
    "title": "Water Deficit", "items": [{
        "title": "Number of rainy days ",
        "tooltip": "Number of rainy days represents the number of days during which precipitation are higher than the rain limit for a period",
        "type": "Numb",
        "param": "nbRainyDays",
        "jsonPath": "nbRainyDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Rain frequencie",
                    "tooltip": "Percentage of rainy days over the period",
                    "type": "Numb",
                    "param": "Rainfreq",
                    "jsonPath": "rainfreq",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }]
        }, {
        "title": "Number of rainless days ",
        "tooltip": "Number of rainless days represents the number of days during which the precipitation minus the evapotranspiratoin was lower than the deficit limit for a period",
        "type": "Numb",
        "param": "nbDefDays",
        "jsonPath": "nbDefDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Rainless days frequencie",
                    "tooltip": "Percentage of rainless days over the period",
                    "type": "Numb",
                    "param": "rainlessFrequencie",
                    "jsonPath": "rainlessFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title":"Max Consecutives Days",
                    "tooltip":"Max number of consecutives days for which (rain -ETP) \< threshold ",
                    "type": "consecutive",
                    "param": "maxConsecutive days",
                    "jsonPath": "maxConsDays",
                    "request": buildQuery_consecutiveDaysmaxConsDays,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"days",
                    "related":[]
                    }]
    }, {
        "title":"Drought waves",
        "tooltip":"Number of Drought waves that lasted at least {droughtWave} day (precipitation \<= rainLimit) ",
        "type": "rain",
        "param": "droughtWave",
        "jsonPath": "DroughtWave",
        "request": buildQuery_consecutiveDaysDroughtWave,
        "availableChart": "table",
        "axisLegend": " day(s)",
        "displayUnit":"nb",
        "related":[]
    }, {
        "title": "Cumulative Precipitations",
        "tooltip": "Sum of all the precipitation over the period",
        "type": "precipitation",
        "param": "cumulativeRain",
        "jsonPath": "cprecip",
        "request": buildQuery_dailyCumulativeDeficit,
        "availableChart": "line",
        "axisLegend": "Cumulative    precipitation (mm)",
        "displayUnit":"mm",
        "related":[]
    }, {
        "title": "Sum of water deficit",
        "tooltip": "Sum of all the water deficit (RAIN-ETP) over the period",
        "type": "precipitation",
        "param": "cumulativeWaterDeficit",
        "jsonPath": "sumwd",
        "request": buildQuery_dailyCumulativeDeficit,
        "availableChart": "line",
        "axisLegend": "waterDeficit (mm)",
        "displayUnit":"mm",
        "related":[]
    }]

},{
    "title": "Wind days", "items":[{
        "title": "Number of Windy days ",
        "tooltip": "Number of windy days represents the number of days during which the wind was higher than the  limit for a period",
        "type": "Numb",
        "param": "nbWindyDays",
        "jsonPath": "nbWindyDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Windy days frequencie",
                    "tooltip": "Percentage of windy days over the period",
                    "type": "Numb",
                    "param": "windFrequencie",
                    "jsonPath": "windFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }]
    }]
}]
}]
