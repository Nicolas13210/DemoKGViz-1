import { buildQuery_tmpRainStation } from "../queries/queries"

export const metricsConfig = [
    {
        "title": "Daily temperature",
        "items": [
            {
                "title": "Minimum temperature (T<sub>min</sub>)",
                "tooltip": "The daily minimum temperature represents the lower air temperature recorded from 18:00 UTC day d-1 till 18:00 UTC day d",
                "type": "TmpRain",
                "param": "TMin",
                "jsonPath": "temp_min",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "LINE"
                ]
            },
            {
                "title": "Maximum temperature (T<sub>max</sub>)",
                "tooltip": "The daily maximum temperature represents the highest air temperature recorded from 6:00 UTC day d till 6:00 UTC day d+1",
                "type": "TmpRain",
                "param": "TMax",
                "jsonPath": "temp_max",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "LINE"
                ]
            },
            {
                "title": "Mean temperature (T<sub>avg</sub>)",
                "tooltip": "The daily mean temperature represents the average value of daily maximum and minimum temperatures",
                "type": "TmpRain",
                "param": "TMean",
                "jsonPath": "temp_avg",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "LINE"
                ]
            },
            {
                "title": "Thermal amplitude (T<sub>Diff</sub>)",
                "tooltip": "The daily thermal amplitude represents the difference between the maximum and the minimum temperature for each days",
                "type": "TmpRain",
                "param": "TDiff",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "LINE"
                ]
            }
        ]
    },
    {
        "title": "Precipitation",
        "items": [
            {
                "title": "Daily precipitation (rainDay)",
                "tooltip": "Daily cumulative precipitation R<sub>d</sub> recorded from 6:00 UTC day d till 6:00 UTC day d+1",
                "type": "TmpRain",
                "param": "rainDay",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "BAR"
                ]
            },
            {
                "title": "Number of rainy days (nbRainDay)",
                "tooltip": "Number of rainy days represents the number of days during which R<sub>d</sub> > 1mm",
                "type": "Numb",
                "param": "nbRainDay",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "BAR"
                ]
            },
            {
                "title": "Cumulative precipitation (sumRain)",
                "tooltip": "Sum of daily cumulative precipitation recorded during a period",
                "type": "GddRain",
                "param": "sumRain",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "BAR"
                ]
            }
        ]
    },
    {
        "title": "Humidity",
        "items": [
            {
                "title": "Number of wet days (nbWetDays)",
                "tooltip": "Number of wet days represents the number of days during which the humidity is higher than 60% for a period",
                "type": "Numb",
                "param": "nbWetDays",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "POLAR"
                ]
            }
        ]
    },
    {
        "title": "Wind",
        "items": [
            {
                "title": "Number of high wind days (wind)",
                "tooltip": "Number of high wind days represents the number of days during the wind is higher than 5.28 m/s for a period",
                "type": "Numb",
                "param": "highWind",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "POLAR"
                ]
            }
        ]
    },
    {
        "title": "Frost days and ice days",
        "items": [
            {
                "title": "Number of frost days (frostDays)",
                "tooltip": "Number of frost days represents the number of days during which the minimum temperature is lower than 0°C for a period",
                "type": "Numb",
                "param": "frostDays",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "POLAR"
                ]
            },
            {
                "title": "Number of ice days (iceDays)",
                "tooltip": "Number of ice days represents the number of days when the maximum temperature is lower than 0°C for a period",
                "type": "Numb",
                "param": "iceDays",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "POLAR"
                ]
            }
        ]
    },
    {
        "title": "Summer days and heat days",
        "items": [
            {
                "title": "Number of summer days (summerDays)",
                "tooltip": "Number of summer days represents the number of days during which the maximum temperature is higher than 25°C for a period",
                "type": "Numb",
                "param": "summerDays",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "POLAR"
                ]
            },
            {
                "title": "Number of heat days (heatDays)",
                "tooltip": "Number of stress days represents the number of days during which the minimum temperature is higher than 20°C for a period",
                "type": "Numb",
                "param": "heatDays",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "POLAR"
                ]
            }
        ]
    },
    {
        "title": "Growing degree days",
        "items": [
            {
                "title": "Growing degree days (GDD)",
                "tooltip": "Growing degree days is equal to the average daily temperature minus base temperature",
                "type": "GddRain",
                "param": "Gdd",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "BAR"
                ]
            },
            {
                "title": "Accumulated growing degree days (sumGDD)",
                "tooltip": "Accumulated growing degree days represents the sum of Growing degree days (GDD) over a period of time",
                "type": "GddRain",
                "param": "sumGdd",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "LINE"
                ]
            },
            {
                "title": "Growing Season T<sub>max</sub> (GST<sub>max</sub>)",
                "tooltip": "Average of the daily maximum temperature (T<sub>max</sub>) during the growing season",
                "type": "GddRain",
                "param": "GSTmax",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "LINE"
                ]
            },
            {
                "title": "Growing Season T<sub>min</sub> (GST<sub>min</sub>)",
                "tooltip": "Average of the daily minimum temperature (T<sub>min</sub>) during the growing season",
                "type": "GddRain",
                "param": "GSTmin",
                "request": buildQuery_tmpRainStation,
                "availableChart": [
                    "LINE"
                ]
            }
        ]
    }
]