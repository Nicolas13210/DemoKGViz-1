import axios from "axios";
import { buildQuery_station, buildQuery_tmpRainStation } from "../queries/queries"

export const stationsModule = {
    namespace: false,
    state() {
        return {
            stations: [],
            selectedStations: []
        }
    },
    mutations: {
        setStations(state, payload) {
            state.stations = payload.stations;
        },
        setSelectedStations(state, payload) {
            state.selectedStations = payload.selectedStations
        },
        updateSelectedStations(state, payload) {
            const indexStation = state.selectedStations.indexOf(payload.selectedStation);

            if(indexStation === -1) {
                state.selectedStations.push(payload.selectedStation)
            } else {
                state.selectedStations.splice(indexStation, 1);
            }
        },
    },
    getters: {
        getStations(state) {
            return state.stations.sort(function (a, b) {
                if (a.stationName.value < b.stationName.value) {
                    return -1;
                }
                if (a.stationName.value > b.stationName.value) {
                    return 1;
                }
                return 0;
            });
        },
        getSelectedStations(state) {
            return state.selectedStations.sort();
        }
    },
    actions: {
        async setStationsFromAPI(context) {
            try {
                const response = await axios.post("/sparql",
                    {
                        query: buildQuery_station()
                    },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        responseType: 'json'
                    });

                context.commit("setStations", { stations: response.data.results.bindings });
            } catch (error) {
                console.error(error);
            }
        },
        setSelectedStations(context, payload) {
            context.commit("setSelectedStations", { selectedStations: payload });

            // reload chart data
            //context.dispatch("setWeather", buildQuery_tmpRainStation(context.getters.getSelectedStations, context.getters.getStartDate, context.getters.getEndDate));
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
        updateSelectedStations(context, payload) {
            context.commit("updateSelectedStations", { selectedStation: payload });

            // reload chart data
            //context.dispatch("setWeather", buildQuery_tmpRainStation(context.getters.getSelectedStations, context.getters.getStartDate, context.getters.getEndDate));
            context.dispatch("setWeather", {query:
                    buildQuery_tmpRainStation(context
                            .getters.getSelectedStations,
                        context
                            .getters.getStartDate,
                        context
                            .getters.getEndDate),
                queryMethod: buildQuery_tmpRainStation.name
            });
        }
    }
}