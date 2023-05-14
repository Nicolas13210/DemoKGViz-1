import axios from "axios";
import { buildQuery_station, buildQuery_tmpRainStation } from "../queries/queries"

export const dateModule = {
    namespace: false,
    state() {
        return {
            startDate: "2016-01-01",
            endDate: "2021-01-31",
        }
    },
    mutations: {
        setStartDate(state, payload) {
            state.startDate = payload
        },
        setEndDate(state, payload) {
            state.endDate = payload
        }
    },
    getters: {
        getStartDate(state) {
            return state.startDate
        },
        getEndDate(state) {
            return state.endDate
        }
    },
    actions: {
        setStartDate(context, payload) {
            context.commit('setStartDate', payload);

            // reload chart data
            context.dispatch("setWeather", {query:
                buildQuery_tmpRainStation(context
                .getters.getSelectedStations,
                context
                .getters.getStartDate,
                context
                .getters.getEndDate),
                queryMethod: buildQuery_tmpRainStation.name
        });
        },
        setEndDate(context, payload) {
            context.commit('setEndDate', payload);

            // reload chart data
           //TODO change context.dispatch("setWeather", buildQuery_tmpRainStation(context.getters.getSelectedStations, context.getters.getStartDate, context.getters.getEndDate));
           context.dispatch("setWeather", {query:
               buildQuery_tmpRainStation(context
               .getters.getSelectedStations,
               context
               .getters.getStartDate,
               context
               .getters.getEndDate),
               queryMethod: buildQuery_tmpRainStation.name
        });
        },
    }
}