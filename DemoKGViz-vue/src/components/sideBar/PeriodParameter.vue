<script>

export default {
    name: "PeriodParameter",
    data() {
        return {
            date: new Date()
        }
    },
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
                    // TODO: call the right component for updateData and updateGraph.
                    // await updateData(key);
                    // updateGraph(key);
                }
            });
        }
    }
}

</script>

<template>
    <div class="period-parameter">
        <div class="text-subtitle-2 font-weight-bold">Période de temps</div>
        <div class="date-pickers">
            <VueDatePicker placeholder="Select a start date" />
            <VueDatePicker placeholder="Select an end date" />
        </div>
    </div>


    <!--
      <div id="period">
          <h2 id="period-select">Select a period</h2>
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
      -->
</template>

<style scoped>
.period-parameter {
    display: flex;
    flex-direction: column;
    gap: 10px
}
.date-pickers {
    display: flex;
    flex-direction: column;
    gap: 4px
}
</style>
