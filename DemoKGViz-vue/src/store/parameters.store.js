export const parametersModule = {
    namespace: false,
    state() {
        return {
            parameters: []
        }
    },
    mutations: {
        addParameter(state, payload) {
            state.parameters.push(payload.parameter)
        },
        removeParameter(state, payload) {
            const parameterIndex = state.parameters.indexOf(payload.parameter);

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
            context.commit("addParameter", {parameter: payload})
        },
        removeParameter(context, payload) {
            context.commit("removeParameter", {parameter: payload})
        }
    }
}