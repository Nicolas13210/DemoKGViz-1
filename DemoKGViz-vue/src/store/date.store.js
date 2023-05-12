import axios from "axios";

export const dateModule = {
    namespace: false,
    state() {
        return {
            startDate: new Date(2016, 0, 1),
            endDate: new Date(2021, 11, 31),
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
            context.commit('setStartDate', payload)
        },
        setEndDate(context, payload) {
            context.commit('setEndDate', payload)
        },
    }
}