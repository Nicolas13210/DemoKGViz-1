<script>
import 'floating-vue/dist/style.css';

export default {
    name: "MeteorologicalParameter",
    methods: {
        checkParameters([type, param]) {
            if (document.getElementById(param).checked) {
                this.$store.dispatch('pushParameter', {parameters: param, type: type});
            } else {
                this.$store.dispatch('cleanParameters', param);
            }
            document.getElementById("parameters-choose").innerHTML = "Parameters selected : " + this.$store.state.parameters;

            // TODO: call the right component for updateData and updateGraph.
            // updateData(type).then(() => updateGraph(type));
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
                       v-on:click="checkParameters(['TmpRain','TMin'])"> Daily minimum temperature (T<sub>min</sub>)
                <button v-tooltip="'The daily minimum temperature represents the lower temperature for each days'">?
                </button>
                <br>

                <input TYPE=CHECKBOX name="TMax" id="TMax" type="CHECKBOX"
                       v-on:click="checkParameters(['TmpRain','TMax'])"> Daily maximum temperature (T<sub>max</sub>)
                <button v-tooltip="'The daily maximum temperature represents the higher temperature for each days'">?
                </button>
                <br>

                <input TYPE=CHECKBOX name="TMean" id="TMean" type="CHECKBOX"
                       v-on:click="checkParameters(['TmpRain','TMean'])"> Daily mean temperature (T<sub>avg</sub>)
                <button v-tooltip="'The daily mean temperature represents the average temperature for each days'">?
                </button>
                <br>

                <input TYPE=CHECKBOX name="TDiff" id="TDiff" type="CHECKBOX"
                       v-on:click="checkParameters(['TmpRain','TDiff'])"> Daily thermal amplitude (T<sub>Diff</sub>)
                <button v-tooltip="'The daily thermal amplitude represents the difference between the maximum and the minimum temperature for each days'">
                    ?
                </button>
                <br>

            </p>
        </div>

        <div id="column2">
            <p id="rain" style="font-size: 1.5em;">
                <strong>Precipitation</strong><br>

                <input TYPE=CHECKBOX name="rainDay" id="rainDay" type="CHECKBOX"
                       v-on:click="checkParameters(['TmpRain','rainDay'])"> Daily precipitation (rainDay)
                <button v-tooltip="'Cumulative daily precipitation Rd recorded from 6:00 UTC day d till 6:00 UTC day d+1'">
                    ?
                </button>
                <br>

                <input TYPE=CHECKBOX name="nbRainDay" id="nbRainDay" type="CHECKBOX"
                       v-on:click="checkParameters(['Numb','nbRainDay'])"> Number of rainy days (nbRainDay)
                <button v-tooltip="'Number of rainy days represents the number of days during which Rd > 1mm'">?
                </button>
                <br>

                <input TYPE=CHECKBOX name="sumRain" id="sumRain" type="CHECKBOX"
                       v-on:click="checkParameters(['GddRain','sumRain'])"> Total precipitation (sumRain)
                <button v-tooltip="'Sum of daily cumulative precipitation recorded during a period'">?</button>
                <br>
            </p>


            <p id="wet" style="font-size: 1.5em;">
                <strong>Humidity</strong><br>

                <input TYPE=CHECKBOX name="nbWetDays" id="nbWetDays" type="CHECKBOX"
                       v-on:click="checkParameters(['Numb','nbWetDays'])"> Number of wet days (nbWetDays)
                <button v-tooltip="'Number of wet days represents the number of days during which the humidity is higher than 60% for a period'">
                    ?
                </button>
                <br>

            </p>

            <p id="wind" style="font-size: 1.5em;">
                <strong>Wind</strong><br>

                <input TYPE=CHECKBOX name="highWind" id="highWind" type="CHECKBOX"
                       v-on:click="checkParameters(['Numb','highWind'])"> Number of high wind days (wind)
                <button v-tooltip="'Number of high wind days represents the number of days during the wind is higher than 5.28 m/s for a period'">
                    ?
                </button>
                <br>

            </p>

        </div>

        <div id="column3">
            <p id="frost" style="font-size: 1.5em;">
                <strong>Frost days and ice days</strong><br>

                <input TYPE=CHECKBOX name="frostDays" id="frostDays" type="CHECKBOX"
                       v-on:click="checkParameters(['Numb','frostDays'])"> Number of frost days (frostDays)
                <button v-tooltip="'Number of frost days represents the number of days during which the minimum temperature is lower than 0°C for a period'">
                    ?
                </button>
                <br>

                <input TYPE=CHECKBOX name="iceDays" id="iceDays" type="CHECKBOX"
                       v-on:click="checkParameters(['Numb','iceDays'])"> Number of ice days (iceDays)
                <button v-tooltip="'Number of ice days represents the number of days when the maximum temperature is lower than 0°C for a period'">
                    ?
                </button>
                <br>
            </p>

            <p id="summer" style="font-size: 1.5em;">
                <strong>Summer days and heat days</strong><br>

                <input TYPE=CHECKBOX name="summerDays" id="summerDays" type="CHECKBOX"
                       v-on:click="checkParameters(['Numb','summerDays'])"> Number of summer days (summerDays)
                <button v-tooltip="'Number of summer days represents the number of days during which the maximum temperature is higher than 25°C for a period'">
                    ?
                </button>
                <br>

                <input TYPE=CHECKBOX name="heatDays" id="heatDays" type="CHECKBOX"
                       v-on:click="checkParameters(['Numb','heatDays'])"> Number of heat days (heatDays)
                <button v-tooltip="'Number of stress days represents the number of days during which the minimum temperature is higher than 20°C for a period'">
                    ?
                </button>
                <br>

            </p>

            <p id="heating" style="font-size: 1.5em;">
                <strong>Growing degree days</strong><br>

                <input TYPE=CHECKBOX name="Gdd" id="Gdd" type="CHECKBOX" v-on:click="checkParameters(['GddRain','Gdd'])">
                Growing degree days (GDD)
                <button v-tooltip="'Growing degree days is equal to the average daily temperature minus base temperature'">
                    ?
                </button>
                <br>

                <input TYPE=CHECKBOX name="sumGdd" id="sumGdd" type="CHECKBOX"
                       v-on:click="checkParameters(['GddRain','sumGdd'])"> Accumulated growing degree days (sumGDD)
                <button v-tooltip="'Accumulated growing degree days represents the sum of Growing degree days (GDD) over a period of time'">
                    ?
                </button>
                <br>

                <input TYPE=CHECKBOX name="GSTmax" id="GSTmax" type="CHECKBOX"
                       v-on:click="checkParameters(['GddRain','sumGdd'])"> Growing Season T<sub>max</sub>
                (GST<sub>max</sub>)
                <button v-tooltip="'Average of the daily maximum temperature (Tmax) during the growing season'">?
                </button>
                <br>
                <input TYPE=CHECKBOX name="GSTmin" id="GSTmin" type="CHECKBOX"
                       v-on:click="checkParameters(['GddRain','sumGdd'])"> Growing Season T<sub>min</sub>
                (GST<sub>min</sub>)
                <button v-tooltip="'Average of the daily minimum temperature (Tmin) during the growing season'">?
                </button>
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
    margin-top: 0;
}

</style>
