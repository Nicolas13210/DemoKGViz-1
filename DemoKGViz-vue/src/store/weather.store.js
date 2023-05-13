import axios from "axios";
import { transformData } from '../utils/dataTransformation'

export const weatherModule = {
    namespace: false,
    state() {
        return {
            weather: [],
        }
    },
    mutations: {
        setWeather(state, payload) {
            state.weather = payload;
        }
    },
    getters: {
        getWeather(state) {
            return state.weather;
        }
    },
    actions: {
        async setWeather(context, payload) {
            try {
                const response = await axios.post("/sparql", {
                    query: payload
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'json'
                });

                const transformedData = transformData(response.data);
                context.commit("setWeather", { query: payload.toString(), result: transformedData });
            } catch (error) {
                console.error(error);
            }
        }
    }
}