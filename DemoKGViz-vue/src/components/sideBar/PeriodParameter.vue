<template>
    <div class="period-parameter">
        <div>
            <span class="text-subtitle-2 font-weight-bold">Temporal period</span>
            <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn density="compact" icon="mdi-help-circle-outline" variant="text" v-bind="props"></v-btn>
                </template>
                <span>Format: YYYY-MM-DD</span>
            </v-tooltip>
        </div>
        <div class="date-pickers">
            <VueDatePicker auto-apply prevent-min-max-navigation ignore-time-validation hide-offset-dates
                           :enable-time-picker="false"
                           v-model="this.startDate"
                           :min-date="this.minDate"
                           :max-date="this.maxDate"
                           :format="this.stringToStringFormatted(this.startDate)"
                           placeholder="Select a start date"
                           @update:model-value="this.updateStartDate"/>
            <VueDatePicker auto-apply prevent-min-max-navigation ignore-time-validation hide-offset-dates
                           :enable-time-picker="false"
                           v-model="this.endDate"
                           :min-date="this.minDate"
                           :max-date="this.maxDate"
                           :format="this.stringToStringFormatted(this.endDate)"
                           placeholder="Select an end date"
                           @update:model-value="this.updateEndDate"/>
        </div>

        <div class="text-subtitle-2 font-weight-bold">Comparaison slider (soon)</div>
        <v-range-slider :ticks="this.yearsTicks" :model-value="this.yearsBound" :min="this.yearsBound[0]"
                        :max="this.yearsBound[1]" :step="1" show-ticks="always" tick-size="4"/>
    </div>
</template>

<script>

export default {
    name: "PeriodParameter",
    data() {
        return {
            // Date picker

            // Configuration to prevent the selection of dates outside [minDate ; maxDate]
            minDate: new Date(2016, 0, 1),
            maxDate: new Date(2021, 11, 31),

            // Range slider
            yearsTicks: [2016, 2017, 2018, 2019, 2020, 2021],
            yearsBound: [2016, 2021]
        }
    },
    methods: {
        dateToStringFormatted(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return year + "-" + this.numberFormatString(month) + "-" + this.numberFormatString(day);
        },
        stringToStringFormatted(strDate) {
            const strDateSplit = strDate.split("-");
            const date = new Date(strDateSplit[0], strDateSplit[1] - 1, strDateSplit[2]);
            return this.dateToStringFormatted(date);
        },
        numberFormatString(number) {
            if (number >= 1 && number <= 9) {
                return '0' + number;
            }
            return number;
        },
        updateStartDate(date) {
            this.$store.dispatch('setStartDate', this.dateToStringFormatted(date));
        },
        updateEndDate(date) {
            this.$store.dispatch('setEndDate', this.dateToStringFormatted(date));
        }
    },
    computed: {
        startDate() {
            return this.$store.getters.getStartDate
        },
        endDate() {
            return this.$store.getters.getEndDate
        },
    }
}

</script>

<style scoped>
.period-parameter {
    display: flex;
    flex-direction: column;
    gap: 10px
}

.date-pickers {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
}
</style>
