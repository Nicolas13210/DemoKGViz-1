import axios from "axios";
import {transformData} from '@/utils/dataTransformation'

export const weatherModule = {
    namespace: false, state() {
        return {
            weather: [],
        }
    }, mutations: {
        setWeather(state, payload) {
            let index = state.weather.findIndex(value => value.queryMethod === payload.queryMethod)
            console.log("index", index)
            console.log("payload", payload)
            if (index !== -1) {
                state.weather[index] = payload;
            } else {
                state.weather.push(payload);
            }
        }
    }, getters: {
        getWeather(state) {
            return state.weather;
        }, getWeatherNbDay(state) {
            return state.weather.find(value => value.queryMethod === "buildQuery_nbStatsDaysStation");
        },
    }, actions: {
        async setWeather(context, payload) {
            try {
                const response = await axios.post("/sparql", {
                    query: payload.query
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }, responseType: 'json'
                });
                const transformedData = transformData(response.data);
                context.commit("setWeather", {
                    query: payload.query.toString(), queryMethod: payload.queryMethod, result: transformedData
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}
