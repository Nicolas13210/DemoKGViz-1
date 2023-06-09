import { isParameterTypeDataAlreadyFetch } from "@/utils/utils"


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
        getParameters(state) {
            return state.parameters
        },
        isChartUsed: (state) => (availableChart) => {
            return state.parameters.some((parameter) => parameter.availableChart === availableChart)
        }
    },
    actions: {
        addParameter(context, payload) {
            if (context.getters.getSelectedStations.length > 0 &&
                !isParameterTypeDataAlreadyFetch(context.getters.getParameters, payload)) {
                context.dispatch("setWeather", {
                    query: payload.request(
                        context.getters.getSelectedStationsJoin,
                        context.getters.getDate[0],
                        context.getters.getDate[1]
                    ),
                    queryMethod: payload.request.name
                });
            }

            context.commit("addParameter", payload);
        },
        removeParameter(context, payload) {
            context.commit("removeParameter", payload)
        }
    }
}
