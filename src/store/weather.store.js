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
            if (index !== -1) {
                state.weather[index] = payload;
            } else {
                state.weather.push(payload);
            }
        }
    }, getters: {
        getWeather(state) {
            return state.weather;
        }, getAggregate(state) {
            const weatherList = state.weather;
            console.log("state.weather", weatherList);
            for (const weather of weatherList) {
                console.log("test 1");
                console.log("weather queryMethod", weather.queryMethod);
                console.log("test 1");
            }

            const beforeMap = state.weather.filter(value =>
                value.queryMethod === "getRequestFreezingColdData" ||
                value.queryMethod === "getRequestHeatData" ||
                value.queryMethod === "getRequestHumidityConditionsData" ||
                value.queryMethod === "getRequestWaterDeficitData" ||
                value.queryMethod === "getRequestThermalConditionsData");

            console.log("getAggregate beforeMap", beforeMap);

            const result = state.weather.filter(value =>
                value.queryMethod === "getRequestFreezingColdData" ||
                value.queryMethod === "getRequestHeatData" ||
                value.queryMethod === "getRequestHumidityConditionsData" ||
                value.queryMethod === "getRequestWaterDeficitData" ||
                value.queryMethod === "getRequestThermalConditionsData").map(item => item.result);

            console.log("getAggregate result", result);

            return state.weather.filter(value =>
                value.queryMethod === "getRequestFreezingColdData" ||
                value.queryMethod === "getRequestHeatData" ||
                value.queryMethod === "getRequestHumidityConditionsData" ||
                value.queryMethod === "getRequestWaterDeficitData" ||
                value.queryMethod === "getRequestThermalConditionsData").map(item => item.result);
        },
    }, actions: {
        async setWeather(context, payload) {
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL, {
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
