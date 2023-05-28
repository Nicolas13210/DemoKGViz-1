import {createStore} from "vuex";
import axios from "axios";
import {parametersModule} from "@/store/parameters.store";
import {stationsModule} from "@/store/stations.store";
import {weatherModule} from "@/store/weather.store";
import {dateModule} from "@/store/date.store";

function callSparql(url, query, key, type) {
    try {
        return axios.post(url, {
            query: query
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: type
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * TODO: REMOVE THIS
 */
let SPARQL = function (o) {
    this.query = function (q) {
        return callSparql(o.endpoint, q, 'json')
    };

    this.queryTurtle = function (q) {
        return callSparql(o.endpoint, q, 'text/turtle')
    }

    this.queryCSV = function (q) {
        return callSparql(o.endpoint, q, 'text/csv')
    }
};

const mainModule = {
    state: {
        // Used mainly by the MeteorologicalParameter component.
        weatherTypes: new Map(Object.entries({TmpRain: [], GddRain: [], Numb: []})),

        // Endpoint to call the back-end.
        endpoint: new SPARQL({
            endpoint: "/sparql"
        })
    }
}

export const index = createStore({
    modules: {
        mainModule,
        parametersModule,
        stationsModule,
        weatherModule,
        dateModule
    },
});
