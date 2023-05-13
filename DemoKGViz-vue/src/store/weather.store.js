import axios from "axios";
import {transformData} from '../utils/dataTransformation'

export const weatherModule = {
    namespace: false, state() {
        return {
            weather: [],
        }
    }, mutations: {
        setWeather(state, payload) {
            if (!state.weather.some(e => payload.query === e.query)) {
                state.weather.push(payload);
            }
        }
    }, getters: {
        //TODO remove index 0
        getWeather(state) {
            return state.weather[0];
        }
    }, actions: {
        async setWeather(context, payload) {
            try {
                const response = await axios.post("/sparql", {
                    query: payload
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }, responseType: 'json'
                });
                console.log("payload")
                console.log(context)
                const transformedData = transformData(response.data);
                context.commit("setWeather", {query: payload.toString(), result: transformedData});
            } catch (error) {
                console.error(error);
            }
        }
    }
}