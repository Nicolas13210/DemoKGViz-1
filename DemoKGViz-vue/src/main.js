import {createApp} from 'vue'
import App from './App.vue'
import {createStore} from 'vuex'
import FloatingVue from 'floating-vue'


let SPARQL = function (o) {
    this.query = function (q) {
        return $.ajax({
            url: o.endpoint,
            accepts: {json: "application/sparql-results+json"},
            data: {query: q, apikey: o.apikey},
            dataType: "json",
            method: "POST",
        });
    };

    this.queryTurtle = function (q) {
        return $.ajax({
            url: o.endpoint,
            accepts: {turtle: "text/turtle"},
            data: {query: q, apikey: o.apikey},
            method: "POST",
        });
    }

    this.queryCSV = function (q) {
        return $.ajax({
            url: o.endpoint,
            accepts: {csv: "text/csv"},
            data: {query: q, apikey: o.apikey},
            method: "POST",
        });
    }
};


const store = createStore({
    state() {
        return {
            dataCalc: new Map(),
            graphLoaded: new Map(),

            // Used mainly by the MeteorologicalParameter component.
            parameters: [],
            weatherTypes: new Map(Object.entries({TmpRain: [], GddRain: [], Numb: []})),

            // Endpoint to call the back-end.
            endpoint: new SPARQL({
                apikey: "YOUR-API-KEY-HERE",
                endpoint: "https://weakg.i3s.unice.fr/sparql"
            })
        }
    },
    mutations: {
        clearDataCalc(state) {
            state.dataCalc.clear()
        },
        pushParameter(state, payload) {
            state.parameters.push(payload['parameter'])
            state.weatherTypes.get(payload['type']).push(payload['parameter'])
        },
        cleanParameters(state, parameter) {
            state.parameters = state.parameters.filter(function (item) {
                return item !== parameter
            })
        },
        destroyGraphLoaded(state, key) {
            state.graphLoaded.get(key).destroy()
            state.graphLoaded.delete(key)
        }
    },
    actions: {
        clearDataCalc(context) {
            context.commit('clearDataCalc')
        },
        pushParameter(context, payload) {
            context.commit('pushParameter', payload)
        },
        cleanParameters(context, parameter) {
            context.commit('cleanParameters', parameter)
        },
        destroyGraphLoaded(context, key) {
            context.commit('destroyGraphLoaded', key)
        }
    },
})

/* floating-vue configuration */
// Display the tooltip quickly (50ms instead of 200ms)
FloatingVue.options.themes.tooltip.delay.show = 50;

const app = createApp(App)
app.use(store)
app.use(FloatingVue)
app.mount('#app')
