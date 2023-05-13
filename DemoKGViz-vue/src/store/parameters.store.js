export const parametersModule = {
    namespace: false,
    state() {
        return {
            parameters: []
        }
    },
    mutations: {
        addParameter(state, payload) {
            state.parameters.push(payload.param)
        },
        removeParameter(state, payload) {
            const parameterIndex = state.parameters.indexOf(payload.param);

            if(parameterIndex === -1) {
                return
            }

            state.parameters.splice(parameterIndex, 1)
        }
    },
    getters: {

    },
    actions: {
        addParameter(context, payload) {
            context.commit("addParameter", payload)
            context.dispatch("setWeather", payload.request(context.getters.getSelectedStations, context.getters.getStartDate, context.getters.getEndDate))
        },
        removeParameter(context, payload) {
            context.commit("removeParameter", payload)
        }
    }
}