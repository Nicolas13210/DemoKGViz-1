import { groupRequestsByParam, reloadChart } from "@/utils/utils";

export const dateModule = {
    namespace: false,
    state() {
        return {
            // TODO: for production, use "2016-01-01".
            startDate: "2021-01-01",
            endDate: "2021-01-31",

            comparison: false,
            comparisonDate: [2016, 2017],
        }
    },
    mutations: {
        setStartDate(state, payload) {
            state.startDate = payload
        },
        setEndDate(state, payload) {
            state.endDate = payload
        },
        setComparison(state, payload) {
            state.comparison = payload
        },
        setComparisonDate(state, payload) {
            state.comparisonDate = payload
        },
    },
    getters: {
        getStartDate(state) {
            return state.startDate
        },
        getEndDate(state) {
            return state.endDate
        },
        getComparisonDate(state) {
            return state.comparisonDate
        },
        getComparison(state) {
            return state.comparison
        },
    },
    actions: {
        setStartDate(context, payload) {
            context.commit('setStartDate', payload);

            reloadChart(context, context.getters.getParameters, context.getters.getSelectedStationsJoin,
                context.getters.getStartDate,
                context.getters.getEndDate)
        },
        setEndDate(context, payload) {
            context.commit('setEndDate', payload);

            reloadChart(context, context.getters.getParameters, context.getters.getSelectedStationsJoin,
                context.getters.getStartDate,
                context.getters.getEndDate)
        },
        setComparison(context, payload) {
            context.commit('setComparison', payload);

            if (payload) {
                reloadChart(context, context.getters.getParameters, context.getters.getSelectedStationsJoin,
                    context.getters.getComparisonDate[0],
                    context.getters.getComparisonDate[1]);

                return
            }

            reloadChart(context, context.getters.getParameters, context.getters.getSelectedStationsJoin,
                context.getters.getStartDate,
                context.getters.getEndDate);
        },
        setComparisonDate(context, payload) {
            context.commit('setComparisonDate', payload);
            reloadChart(context, context.getters.getParameters, context.getters.getSelectedStationsJoin,
                context.getters.getComparisonDate[0],
                context.getters.getComparisonDate[1]);
        },
    }
}
