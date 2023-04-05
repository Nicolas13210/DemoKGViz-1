<script>
import MeteorologicalParameterItem from "@/components/MeteorologicalParameterItem.vue";

export default {
    name: "MeteorologicalParameter",
    components: {MeteorologicalParameterItem}
}
</script>

<template>
    <div id="param">
        <h2 id="parameters-select">Agro-Meteorological Parameters</h2>

        <div id="column1">
            <p id="dailyTemp" style="font-size: 1.5em;">
                <strong>Daily temperature</strong>
                <br>
                <MeteorologicalParameterItem title="Daily minimum temperature (T<sub>min</sub>)"
                                             tooltip="The daily minimum temperature represents the lower temperature for each days"
                                             type="TmpRain"
                                             param="TMin">
                </MeteorologicalParameterItem>
                <br>
                <MeteorologicalParameterItem title="Daily maximum temperature (T<sub>max</sub>)"
                                             tooltip="The daily maximum temperature represents the higher temperature for each days"
                                             type="TmpRain"
                                             param="TMax">
                </MeteorologicalParameterItem>
                <br>
                <MeteorologicalParameterItem title="Daily mean temperature (T<sub>avg</sub>)"
                                             tooltip="The daily mean temperature represents the average temperature for each days"
                                             type="TmpRain"
                                             param="TMean">
                </MeteorologicalParameterItem>
                <br>
                <MeteorologicalParameterItem title="Daily thermal amplitude (T<sub>Diff</sub>)"
                                             tooltip="The daily thermal amplitude represents the difference between the maximum and the minimum temperature for each days"
                                             type="TmpRain"
                                             param="TDiff">
                </MeteorologicalParameterItem>
            </p>
        </div>

        <div id="column2">
            <p id="rain" style="font-size: 1.5em;">
                <strong>Precipitation</strong>
                <br>
                <MeteorologicalParameterItem title="Daily precipitation (rainDay)"
                                             tooltip="Cumulative daily precipitation Rd recorded from 6:00 UTC day d till 6:00 UTC day d+1"
                                             type="TmpRain"
                                             param="rainDay">
                </MeteorologicalParameterItem>
                <br>
                <MeteorologicalParameterItem title="Number of rainy days (nbRainDay)"
                                             tooltip="Number of rainy days represents the number of days during which Rd > 1mm"
                                             type="Numb"
                                             param="nbRainDay">
                </MeteorologicalParameterItem>
                <br>
                <MeteorologicalParameterItem title="Total precipitation (sumRain)"
                                             tooltip="Sum of daily cumulative precipitation recorded during a period"
                                             type="GddRain"
                                             param="sumRain">
                </MeteorologicalParameterItem>
            </p>

            <p id="wet" style="font-size: 1.5em;">
                <strong>Humidity</strong>
                <br>
                <MeteorologicalParameterItem title="Number of wet days (nbWetDays)"
                                             tooltip="Number of wet days represents the number of days during which the humidity is higher than 60% for a period"
                                             type="Numb"
                                             param="nbWetDays">
                </MeteorologicalParameterItem>
            </p>

            <p id="wind" style="font-size: 1.5em;">
                <strong>Wind</strong>
                <br>
                <MeteorologicalParameterItem title="Number of high wind days (wind)"
                                             tooltip="Number of high wind days represents the number of days during the wind is higher than 5.28 m/s for a period"
                                             type="Numb"
                                             param="highWind">
                </MeteorologicalParameterItem>
            </p>

        </div>

        <div id="column3">
            <p id="frost" style="font-size: 1.5em;">
                <strong>Frost days and ice days</strong>
                <br>
                <MeteorologicalParameterItem title="Number of frost days (frostDays)"
                                             tooltip="Number of frost days represents the number of days during which the minimum temperature is lower than 0°C for a period"
                                             type="Numb"
                                             param="frostDays">
                </MeteorologicalParameterItem>
                <br>
                <MeteorologicalParameterItem title="Number of ice days (iceDays)"
                                             tooltip="Number of ice days represents the number of days when the maximum temperature is lower than 0°C for a period"
                                             type="Numb"
                                             param="iceDays">
                </MeteorologicalParameterItem>
            </p>

            <p id="summer" style="font-size: 1.5em;">
                <strong>Summer days and heat days</strong>
                <br>
                <MeteorologicalParameterItem title="Number of summer days (summerDays)"
                                             tooltip="Number of summer days represents the number of days during which the maximum temperature is higher than 25°C for a period"
                                             type="Numb"
                                             param="summerDays">
                </MeteorologicalParameterItem>
                <br>
                <MeteorologicalParameterItem title="Number of heat days (heatDays)"
                                             tooltip="Number of stress days represents the number of days during which the minimum temperature is higher than 20°C for a period"
                                             type="Numb"
                                             param="heatDays">
                </MeteorologicalParameterItem>
            </p>

            <p id="heating" style="font-size: 1.5em;">
                <strong>Growing degree days</strong>
                <br>
                <MeteorologicalParameterItem title="Growing degree days (GDD)"
                                             tooltip="Growing degree days is equal to the average daily temperature minus base temperature"
                                             type="GddRain"
                                             param="Gdd">
                </MeteorologicalParameterItem>
                <br>
                <MeteorologicalParameterItem title="Accumulated growing degree days (sumGDD)"
                                             tooltip="Accumulated growing degree days represents the sum of Growing degree days (GDD) over a period of time"
                                             type="GddRain"
                                             param="sumGdd">
                </MeteorologicalParameterItem>
                <br>
                <!-- Old param: sumGdd, check if it is normal -->
                <MeteorologicalParameterItem title="Growing Season T<sub>max</sub> (GST<sub>max</sub>)"
                                             tooltip="Average of the daily maximum temperature (Tmax) during the growing season"
                                             type="GddRain"
                                             param="GSTmax">
                </MeteorologicalParameterItem>
                <br>
                <!-- Old param: sumGdd, check if it is normal -->
                <MeteorologicalParameterItem title="Growing Season T<sub>min</sub> (GST<sub>min</sub>)"
                                             tooltip="Average of the daily minimum temperature (Tmin) during the growing season"
                                             type="GddRain"
                                             param="GSTmin">
                </MeteorologicalParameterItem>
            </p>
        </div>

        <div id="column4">

        </div>
        <p id="parameters-choose">Parameters selected :</p>
    </div>
</template>

<style scoped>
div#param {
    border: black solid 1px;
    margin-top: 100px;
    border-radius: 15px;
}

div#column1 {
    width: 33%;
    display: inline-block;
    height: auto;
    vertical-align: top;
}

div#column2 {
    width: 33%;
    display: inline-block;
    height: auto;
    vertical-align: top;
}

div#column3 {
    width: 33%;
    display: inline-block;
    height: auto;
    vertical-align: top;
}

p {
    margin: 5px 20px;
    text-align: justify;
    text-justify: inter-word;
}

h2 {
    text-align: center;
    padding: 25px;
    margin-bottom: 0;
    background-color: lightblue;
    border-radius: 15px;
    margin-top: 0;
}

</style>
