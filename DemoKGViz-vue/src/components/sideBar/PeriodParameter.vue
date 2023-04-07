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
    computed: {},
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
        dateChanged(date) {
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
            <VueDatePicker
                auto-apply
                prevent-min-max-navigation
                ignore-time-validation
                hide-offset-dates
                :enable-time-picker="false"
                v-model="this.startDate"
                :min-date="this.minDate"
                :max-date="this.maxDate"
                :format="this.getDateFormat(this.startDate)"
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
                       :format="this.getDateFormat(this.endDate)"
                       placeholder="Select an end date"
                       @update:model-value="this.dateChanged"/>
        </div>
    </div>
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
