import { createStore } from "vuex";
import axios from "axios";
import {buildQuery_station} from "@/queries/queries";


/**
 * TODO: REMOVE THIS
 */
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

const mainModule = {
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
        pushParameter(state, parameter, type) {
            state.parameters.push(parameter)
            state.types.get(type).push(parameter)
        },
        cleanParameters(state, parameter) {
            state.parameters = state.parameters.filter(function (item) {
                return item !== parameter;
            })
        },
        destroyGraphLoaded(state, key) {
            state.graphLoaded.get(key).destroy();
            state.graphLoaded.delete(key);
        }
    }
}

const stationModule = {
    state() {
        return {
            stations: [],
        }
    },
    mutations: {
        setStations(state, payload) {
            state.stations = payload.stations.results
        },
    },
    getters: {
        findStation(state, id) {
            return state.stations.find((station) => station.id == id);
        },
        getAll(state) {
            return state.stations;
        },
    },
    actions: {
        async setStationsApi(context) {
            try {
                const response = await axios.post("/sparql", {
                    query: buildQuery_station(),
                    apikey: "YOUR-API-KEY-HERE",
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'json'
                });
                context.commit("setStations", { stations: response.data });
            } catch (error) {
                console.log("error", error);
            }
        },
    },
};

export const store = createStore({
    modules: {
        stationModule,
        mainModule
    },
});
