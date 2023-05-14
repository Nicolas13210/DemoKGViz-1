import { isParameterTypeDataAlreadyFetch } from "../utils/utils"
import {buildQuery_tmpRainStation} from "@/queries/queries";


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
            if(!isParameterTypeDataAlreadyFetch(context.getters.getParameters, payload)) {
               //context.dispatch("setWeather", payload.request(context.getters.getSelectedStations, context.getters.getStartDate, context.getters.getEndDate))
                context.dispatch("setWeather", {query:
                        payload.request(context
                                .getters.getSelectedStations,
                            context
                                .getters.getStartDate,
                            context
                                .getters.getEndDate),
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