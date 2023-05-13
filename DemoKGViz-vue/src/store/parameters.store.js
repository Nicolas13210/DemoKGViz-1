

export const parametersModule = {
    namespace: false,
    state() {
        return {
            parameters: []
        }
    },
    mutations: {
        addParameter(state, payload) {
            state.parameters.push(payload)
        },
        removeParameter(state, payload) {
            state.parameters = state.parameters.filter(parameter => parameter.param !== payload.param) 
        }
    },
    getters: {
        getParameters(state){
            return state.parameters
        }
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