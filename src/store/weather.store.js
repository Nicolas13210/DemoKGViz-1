import axios from "axios";
import {transformData} from '@/utils/dataTransformation'
import { mapGetters } from "vuex";
import {weatherParameterModule} from "./weatherParameters.store";


function calculateSumOfDuration(data, minDuration,name) {
  const stationsMap = new Map();

  for (const entry of data) {
    const { station, duration } = entry;

    if (duration >= minDuration) {
      if (stationsMap.has(station)) {
        stationsMap.set(station, stationsMap.get(station) + 1);
      } else {
        stationsMap.set(station, 1);
      }
    }
  }

  return Array.from(stationsMap.entries()).map(([station, sumDuration]) => ({
    stationName: station,
    [name]:sumDuration,
  }));
}

function calculateDurationOfBiggestPeriod(data,name) {

  const stationsMap = new Map();

  for (const entry of data) {
    const { station, duration } = entry;

    if (stationsMap.has(station)) {
      stationsMap.set(station, Math.max(stationsMap.get(station), duration));
    } else {
      stationsMap.set(station, duration);
    }
  }
  return Array.from(stationsMap.entries()).map(([station, duration]) => ({
    stationName: station,
    [name]: duration,
  }));
}


function getNbWaves(payload) {
    let minDay =0
    let minDays = payload.nbDays    
    let name=payload.queryMethod.substring(26)
    switch(name){
        case 'SpellFrost':
            minDay = minDays.spellFrost;
            break;
        case 'SpellHeat':
            minDay = minDays.spellHeat;
            break;
        case 'HighHum':
            minDay=minDays.spellHum;
            break;
        case 'DroughtWave':
            minDay=minDays.droughtWave;
            break;
    }
    let data = payload.result.values
    const consecutivePeriods = [];
    let currentStartDate = data[0].date1;
    let currentEndDate = data[0].date2;
    let prevStation = data[0].stationName

      for (let i = 1; i < data.length; i++) {
        const previousEndDate = currentEndDate;
        const currentDate1 = data[i].date1;
        const currentStation = data[i].stationName;
        if (currentDate1 === previousEndDate && currentStation === prevStation) {
        currentEndDate = data[i].date2;
        } else {
        consecutivePeriods.push({station: prevStation, start: currentStartDate, end: currentEndDate, duration: (new Date(currentEndDate) - new Date(currentStartDate))/(3600*24 * 1000)+1 });
        currentStartDate = data[i].date1;
        currentEndDate = data[i].date2;
        prevStation = currentStation
        }
    }
    let sums ;

    consecutivePeriods.push({ station: prevStation, start: currentStartDate, end: currentEndDate, duration: (new Date(currentEndDate) - new Date(currentStartDate))/(3600*24 * 1000)+1 });
    if(name === 'maxConsDays') {
        sums = calculateDurationOfBiggestPeriod(consecutivePeriods,name)
    }else{
        sums = calculateSumOfDuration(consecutivePeriods,minDay,name)
    }
    payload.result.values = sums
    let test = payload.result.values

    return payload
}






export const weatherModule = {
    namespace: false, state() {
        return {
            weather: [],
            queries:["buildQuery_consecutiveDaysSpellFrost","buildQuery_consecutiveDaysSpellHeat","buildQuery_consecutiveDaysHighHum","buildQuery_consecutiveDaysDroughtWave","buildQuery_consecutiveDaysmaxConsDays"]
        }
    }, mutations: {
        setWeather(state, payload) {
            let index = state.weather.findIndex(value => value.queryMethod === payload.queryMethod)
            if(state.queries.includes(payload.queryMethod)) {
                payload = getNbWaves(payload)
            }
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
        }
    }, actions: {
        async setWeather(context, payload) {
            try {
                const response = await axios.post("api/sqrl", {
                    query: payload.query
                }, {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    }, responseType: 'json'
                });
                const transformedData = transformData(response.data);
                context.commit("setWeather", {
                    query: payload.query.toString(), queryMethod: payload.queryMethod, result: transformedData, nbDays: payload.nbDays
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}
