<script>
export default {
    name: "MeteorologicalParameter",
    methods: {
        async checkParameters([type, param]) {
            if (document.getElementById(param).checked) {
                this.$store.commit('pushParameter', param, type);
            } else {
                this.$store.commit('cleanParameters', param);
            }
            document.getElementById("parameters-choose").innerHTML = "Parameters selected : " + this.$store.state.parameters;

            // TODO: call the right component for updateData and updateGraph.
            await updateData(type);
            updateGraph(type);
        }
    }
}
</script>

<template>
    <div id="param">
        <h2 id="parameters-select">Agro-Meteorological Parameters</h2>

        <div id="column1">
            <p id="dailyTemp" style="font-size: 1.5em;">
                <strong>Daily temperature</strong>
                <br>

                <input TYPE=CHECKBOX name="TMin" id="TMin" type="CHECKBOX"
                       onclick="checkParameters(['TmpRain','TMin'])"> Daily minimum temperature (T<sub>min</sub>)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">The daily minimum temperature represents the lower temperature for each days</span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="TMax" id="TMax" type="CHECKBOX"
                       onclick="checkParameters(['TmpRain','TMax'])"> Daily maximum temperature (T<sub>max</sub>)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">The daily maximum temperature represents the higher temperature for each days</span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="TMean" id="TMean" type="CHECKBOX"
                       onclick="checkParameters(['TmpRain','TMean'])"> Daily mean temperature (T<sub>avg</sub>)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">The daily mean temperature represents the awerage temperature for each days</span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="TDiff" id="TDiff" type="CHECKBOX"
                       onclick="checkParameters(['TmpRain','TDiff'])"> Daily thermal amplitude (T<sub>Diff</sub>)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">The daily thermal amplitude represents the difference between the maximum and the minimum temperature for each days</span>
                </span>
                <br>

            </p>
        </div>

        <div id="column2">
            <p id="rain" style="font-size: 1.5em;">
                <strong>Precipitation</strong><br>

                <input TYPE=CHECKBOX name="rainDay" id="rainDay" type="CHECKBOX"
                       onclick="checkParameters(['TmpRain','rainDay'])"> Daily precipitation (rainDay)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Cumulative daily precipitation R<sub>d</sub> recorded from 6:00 UTC day d till 6:00 UTC day d+1 </span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="nbRainDay" id="nbRainDay" type="CHECKBOX"
                       onclick="checkParameters(['Numb','nbRainDay'])"> Number of rainy days (nbRainDay)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Number of rainy days represents the number of days during which R<sub>d</sub> > 1mm</span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="sumRain" id="sumRain" type="CHECKBOX"
                       onclick="checkParameters(['GddRain','sumRain'])"> Total precipitation (sumRain)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Sum of daily cumulative precipitation recorded during a period </span>
                </span>
                <br>
            </p>


            <p id="wet" style="font-size: 1.5em;">
                <strong>Humidity</strong><br>

                <input TYPE=CHECKBOX name="nbWetDays" id="nbWetDays" type="CHECKBOX"
                       onclick="checkParameters(['Numb','nbWetDays'])"> Number of wet days (nbWetDays)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Number of wet days represents the number of days during which the humidity is higher than 60% for a period</span>
                </span>
                <br>

            </p>

            <p id="wind" style="font-size: 1.5em;">
                <strong>Wind</strong><br>

                <input TYPE=CHECKBOX name="highWind" id="highWind" type="CHECKBOX"
                       onclick="checkParameters(['Numb','highWind'])"> Number of high wind days (wind)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Number of high wind days represents the number of days during the wind is higher than 5.28 m/s for a period</span>
                </span>
                <br>

            </p>

        </div>

        <div id="column3">
            <p id="frost" style="font-size: 1.5em;">
                <strong>Frost days and ice days</strong><br>

                <input TYPE=CHECKBOX name="frostDays" id="frostDays" type="CHECKBOX"
                       onclick="checkParameters(['Numb','frostDays'])"> Number of frost days (frostDays)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Number of frost days represents the number of days during which the minimum temperature is lower than 0°C for a period</span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="iceDays" id="iceDays" type="CHECKBOX"
                       onclick="checkParameters(['Numb','iceDays'])"> Number of ice days (iceDays)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Number of ice days represents the number of days when the maximum temperature is lower than 0°C for a period</span>
                </span>
                <br>
            </p>

            <p id="summer" style="font-size: 1.5em;">
                <strong>Summer days and heat days</strong><br>

                <input TYPE=CHECKBOX name="summerDays" id="summerDays" type="CHECKBOX"
                       onclick="checkParameters(['Numb','summerDays'])"> Number of summer days (summerDays)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Number of summer days represents the number of days during which the maximum temperature is higher than 25°C for a period</span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="heatDays" id="heatDays" type="CHECKBOX"
                       onclick="checkParameters(['Numb','heatDays'])"> Number of heat days (heatDays)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Number of stress days represents the number of days during which the minimum temperature is higher than 20°C for a period</span>
                </span>
                <br>

            </p>

            <p id="heating" style="font-size: 1.5em;">
                <strong>Growing degree days</strong><br>

                <input TYPE=CHECKBOX name="Gdd" id="Gdd" type="CHECKBOX" onclick="checkParameters(['GddRain','Gdd'])">
                Growing degree days (GDD)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Growing degree days is equal to the average daily temperature minus base temperature </span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="sumGdd" id="sumGdd" type="CHECKBOX"
                       onclick="checkParameters(['GddRain','sumGdd'])"> Accumulated growing degree days (sumGDD)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Accumulated growing degree days represents the sum of Growing degree days (GDD) over a period of time</span>
                </span>
                <br>

                <input TYPE=CHECKBOX name="GSTmax" id="GSTmax" type="CHECKBOX"
                       onclick="checkParameters(['GddRain','sumGdd'])"> Growing Season T<sub>max</sub>
                (GST<sub>max</sub>)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Average of the daily maximum temperature (Tmax) during the growing season</span>
                </span>
                <br>
                <input TYPE=CHECKBOX name="GSTmin" id="GSTmin" type="CHECKBOX"
                       onclick="checkParameters(['GddRain','sumGdd'])"> Growing Season T<sub>min</sub>
                (GST<sub>min</sub>)
                <span class="tooltipParam">[?]
                    <span class="tooltiptextParam">Average of the daily minimum temperature (Tmin) during the growing season</span>
                </span>
                <br>
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

input {
    cursor: pointer;
}

h2 {
    text-align: center;
    padding: 25px;
    margin-bottom: 0;
    background-color: lightblue;
    border-radius: 15px;
}

/* Tooltip container */
.tooltipParam {
    position: relative;
    display: inline-block;
}

/* Tooltip text */
.tooltipParam .tooltiptextParam {
    visibility: hidden;
    width: 500px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -250px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
}

#column4 .tooltipParam .tooltiptextParam {
    margin-left: -450px;
}

/* Tooltip arrow */
.tooltipParam .tooltiptextParam::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

#column4 .tooltipParam .tooltiptextParam::after {
    margin-left: 195px;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltipParam:hover .tooltiptextParam {
    visibility: visible;
    opacity: 1;
}

</style>
