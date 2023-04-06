<script>
export default {
    name: "PeriodParameter",
    methods: {
        dateChanged() {
            const startDate = document.getElementById("start").value;
            const endDate = document.getElementById("end").value;
            document.getElementById("start").max = endDate;
            document.getElementById("end").min = startDate;
            document.getElementById("date-choose").innerHTML = "Start: " + startDate + "<br>End: " + endDate;

            // Clear all data
            this.$store.commit('clearDataCalc');

            // Clear all graphs
            this.$store.state.weatherTypes.forEach(async (value, key) => {
                const canvasElement = document.getElementById(key);
                const ctx = canvasElement.getContext('2d');
                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                if (this.$store.state.graphLoaded.has(key)) {
                    this.$store.commit('destroyGraphLoaded', key)
                    await updateData(key);
                    updateGraph(key);
                }
            });
        }
    }
}

</script>

<template>
    <div id="period">
        <div id="dateStart">

            <label id="date-start" style="font-size: 1.5em;">Start date:</label>

            <br>

            <input type="date" class="date" id="start" name="start"
                   value="2016-01-01"
                   min="2016-01-01" max="2021-12-31"
                   @input="dateChanged()">
        </div>

        <div id="dateEnd">

            <label id="date-end" style="font-size: 1.5em;">End date:</label>

            <br>

            <input type="date" class="date" id="end" name="end"
                   value="2021-12-31"
                   min="2016-01-01" max="2021-12-31"
                   @input="dateChanged()">
        </div>

        <p id="date-choose">Start: 2016-01-01<br>End: 2021-12-31</p>
    </div>
</template>

<style scoped>

div#period {
    margin-top: 20px;
}

div#dateStart {
    width: 50%;
    text-align: center;
    float: left;
    padding-left: 25%;
    height: 100px;
}

div#dateEnd {
    width: 50%;
    text-align: center;
    float: left;
    padding-right: 25%;
    height: 100px;
}

p {
    margin: 5px 20px;
    text-align: justify;
    text-justify: inter-word;
}

p#date-choose {
    text-align: center;
}

input {
    cursor: pointer;
}

input.date {
    width: 250px;
    height: 30px;
    font-size: 22px;
    text-align: center;
}
</style>
