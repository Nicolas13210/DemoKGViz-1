import axios from "axios";
import {transformData} from '@/utils/dataTransformation'
import {getRequestFreezingColdData} from "@/queries/freezing_cold_queries";
import {getRequestHeatData} from "@/queries/heat_queries";

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
            return state.weather.filter(value =>
                value.queryMethod === "getRequestFreezingColdData" ||
                value.queryMethod === "getRequestHeatData" ||
                value.queryMethod === "getRequestHumidityConditionsData" ||
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
