 import {reloadChart} from "@/utils/utils";
 export const weatherParameterModule = {
    state() {
            return {
                baseTemp : 5,
                coldMin : 0,
                heat : 30,
                minTemp:0,
                maxTemp:40,
                minHum:40,
                maxHum:60,
                rainLevel:0,
                deficitLevel:0,
                spellFrost:5,
                spellHeat:5,
                spellHum:7,
                droughtWave:20,

            }
        },
        mutations: {
            SET_BASE_TEMP(state, payload) {
                state.baseTemp = payload;
            },
            SET_COLD_MIN(state, payload) {
                state.coldMin = payload;
            },
            SET_HEAT(state,payload) {
                state.heat = payload;
            },
            SET_MIN_TEMP(state,payload) {
                state.minTemp = payload;
            },
            SET_MAX_TEMP(state,payload) {
                state.maxTemp = payload;
            },
            SET_MIN_HUM(state,payload) {
                state.minHum = payload;
            },
            SET_MAX_HUM(state,payload) {
                state.maxHum = payload;
            },
            SET_RAIN_LEVEL(state,payload) {
                state.rainLevel = payload;
            },
            SET_DEFICIT_LEVEL(state, payload) {
                state.deficitLevel = payload;
            },
            SET_SPELL_FROST(state,payload) {
                state.spellFrost = payload
            },
            SET_SPELL_HEAT(state,payload) {
                state.spellHeat = payload
            },
            SET_SPELL_HUM(state,payload) {
                state.spellHum = payload
            },
            SET_DROUGHT_WAVE(state,payload) {
                state.droughtWave = payload
            }
        },
        getters: {
            getBaseTemp(state) {
                return state.baseTemp
            },
            getColdMin(state) {
                return state.coldMin
            },
            getHeat(state) {
                return state.heat
            },
            getMinTemp(state) {
                return state.minTemp
            },
            getMaxTemp(state) {
                return state.maxTemp
            },
            getMinHum(state) { 
                return state.minHum
            },
            getMaxHum(state) {
                return state.maxHum
            },
            getRainLevel(state) {
                return state.rainLevel
            },
            getDeficitLevel(state) {
                return state.deficitLevel
            },
            getSpellFrost(state) {
                return state.spellFrost
            },
            getSpellHeat(state) {
                return state.spellHeat
            },
            getSpellHum(state) {
                return state.spellHum
            },
            getDroughtWave(state) {
                return state.droughtWave
            }



        },
        actions: {
            setBaseTemp(context, newBaseTemp) {
              context.commit('SET_BASE_TEMP', newBaseTemp);
              reloadChart(context)
            },
            setColdMin(context, newColdMin) {
              context.commit('SET_COLD_MIN', newColdMin);
              reloadChart(context)
            },
            setHeat(context,newHeat) {
                context.commit('SET_HEAT',newHeat);
                reloadChart(context)
            },
            setMinTemp(context, newMinTemp) {
                context.commit('SET_MIN_TEMP',newMinTemp);
                reloadChart(context)
            },
            setMaxTemp(context, newMaxTemp) {
                context.commit('SET_MAX_TEMP',newMaxTemp);
                reloadChart(context)
            },
            setMinHum(context, newMinHum) {
                context.commit('SET_MIN_HUM',newMinHum);
                reloadChart(context)
            },
            setMaxHum(context, newMaxHum) {
                context.commit('SET_MAX_HUM',newMaxHum);
                reloadChart(context)
            },
            setRainLevel(context,newRainLevel) {
                context.commit('SET_RAIN_LEVEL', newRainLevel);
                reloadChart(context)
            },
            setDeficitLevel(context,newDeficitLevel) {
                context.commit('SET_DEFICIT_LEVEL', newDeficitLevel);
                reloadChart(context)
            },
            setSpellFrost(context,newSpellFrost) {
                context.commit('SET_SPELL_FROST',newSpellFrost);
                reloadChart(context)
            },
            setSpellHeat(context,newSpellHeat) {
                context.commit('SET_SPELL_HEAT',newSpellHeat);
                reloadChart(context)
            },
            setSpellHum(context,newSpellHum) {
                context.commit('SET_SPELL_HUM',newSpellHum);
                reloadChart(context)
            },
            setDroughtWave(context,newDroughtWave) {
                context.commit("SET_DROUGHT_WAVE",newDroughtWave);
                reloadChart(context)
            }
        }
    }