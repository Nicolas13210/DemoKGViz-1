<script>

export default {
    name: "PeriodParameter",
    data() {
        return {
            // Values selected by the user.
            startDate: new Date(2016, 0, 1),
            endDate: new Date(2021, 11, 31),

            // Configuration to prevent the selection of dates outside [minDate ; maxDate]
            minDate: new Date(2016, 0, 1),
            maxDate: new Date(2021, 11, 31)
        }
    },
    methods: {
        getDateFormat(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return this.numberFormatString(day) + "/" + this.numberFormatString(month) + "/" + year;
        },
        numberFormatString(number) {
            if (number >= 1 && number <= 9) {
                return '0' + number;
            }
            return number;
        },
        dateChanged(date, isStartDate) {
            this.$store.dispatch((isStartDate ? 'setStartDate' : 'setEndDate'), date);

            // Clear all data
            this.$store.dispatch('clearDataCalc');

            // Clear all graphs
            console.log(this.$store.getters.getWeatherTypes);
            this.$store.getters.getWeatherTypes.forEach(async (value, key) => {
                // TODO: clear in the right component the graphs
                // const canvasElement = document.getElementById(key);
                // const ctx = canvasElement.getContext('2d');
                // ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                // if (this.$store.state.graphLoaded.has(key)) {
                //     this.$store.dispatch('destroyGraphLoaded', key)
                //     TODO: call the right component for updateData and updateGraph.
                //     await updateData(key);
                //     updateGraph(key);
                // }
            });
        }
    }
}

</script>

<template>
    <div>
        <VueDatePicker
                auto-apply
                prevent-min-max-navigation
                ignore-time-validation
                hide-offset-dates
                :enable-time-picker="false"
                v-model="this.startDate"
                :min-date="this.minDate"
                :max-date="this.maxDate"
                :format="this.getDateFormat(this.startDate, true)"
                placeholder="Select a start date"
                @update:model-value="this.dateChanged"/>
        <br>
        <VueDatePicker auto-apply
                       prevent-min-max-navigation
                       ignore-time-validation
                       hide-offset-dates
                       :enable-time-picker="false"
                       v-model="this.endDate"
                       :min-date="this.minDate"
                       :max-date="this.maxDate"
                       :format="this.getDateFormat(this.endDate, false)"
                       placeholder="Select an end date"
                       @update:model-value="this.dateChanged"/>
    </div>
</template>

<style scoped>

</style>
