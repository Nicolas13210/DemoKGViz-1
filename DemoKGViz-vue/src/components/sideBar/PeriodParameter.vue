<template>
    <div class="period-parameter">
        <div class="text-subtitle-2 font-weight-bold">Temporal period</div>
        <div class="date-pickers">
            <VueDatePicker auto-apply prevent-min-max-navigation ignore-time-validation hide-offset-dates
                :enable-time-picker="false" v-model="this.startDate" 
                :min-date="this.minDate" 
                :max-date="this.maxDate"
                placeholder="Select a start date"
                @update:model-value="this.updateStartDate" />
            <br>
            <VueDatePicker auto-apply prevent-min-max-navigation ignore-time-validation hide-offset-dates
                :enable-time-picker="false" 
                v-model="this.endDate" 
                :min-date="this.minDate" 
                :max-date="this.maxDate"
                placeholder="Select an end date"
                @update:model-value="this.updateEndDate" />
        </div>

        <br>

        <div class="text-subtitle-2 font-weight-bold">Comparaison slider (soon)</div>
        <v-range-slider :ticks="this.yearsTicks" :model-value="this.yearsBound" :min="this.yearsBound[0]"
            :max="this.yearsBound[1]" :step="1" show-ticks="always" tick-size="4" />
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
        getDateFormat(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            
            return year + "-" + this.numberFormatString(month) + "-" + this.numberFormatString(day);
        },
        numberFormatString(number) {
            if (number >= 1 && number <= 9) {
                return '0' + number;
            }
            return number;
        },
        updateStartDate(date) {
            this.$store.dispatch('setStartDate', this.getDateFormat(date));
        },
        updateEndDate(date) {
            this.$store.dispatch('setEndDate', this.getDateFormat(date));
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
    gap: 4px
}
</style>
