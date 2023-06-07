export function buildQuery_extractRDF(stationName, startDate, endDate) {
    return `
PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>

CONSTRUCT {
    ?uriDataset a qb:DataSet ;
                dct:issued ?issueDate ;
                qb:slice ?uriSlice1 .
    ?uriSlice1 a qb:Slice ;
               wes-dimension:station ?station ;
               wes-dimension:periodStartDate ?periodStartDate ;
               wes-dimension:periodEndDate ?periodEndDate ;
               qb:observation [
                   a qb:Observation ;
                   qb:dataSet ?uriDataset ;
                   wes-attribute:observationDate ?date ;
                   wes-measure:minDailyTemperature ?temp_min ;
                   wes-measure:maxDailyTemperature ?temp_max ;
                   wes-measure:rainfall24h ?rainfall ;
               ].
}
WHERE {
    SELECT DISTINCT ?issueDate ?uriDataset ?uriSlice1 ?station ?date ?periodStartDate ?periodEndDate ?temp_min ?temp_max ?rainfall ?gdd
    WHERE {
        VALUES ?stationName { "` + stationName + `" }
        VALUES ?periodStartDate { "` + startDate + `" }
        VALUES ?periodEndDate { "` + endDate + `" }

        ?s a qb:Slice ;
           wes-dimension:station ?station ;
           wes-dimension:year ?year ;
           qb:observation [
               a qb:Observation ;
               wes-attribute:observationDate ?date ;
               wes-measure:minDailyTemperature ?temp_min ;
               wes-measure:maxDailyTemperature ?temp_max ;
               wes-measure:rainfall24h ?rainfall ;
           ].

        ?station a weo:WeatherStation ;
                 rdfs:label ?stationName ;
                 weo:stationID ?stationID .

        BIND(xsd:date(NOW()) AS ?issueDate)
        FILTER (?date >= xsd:date(?periodStartDate))
        FILTER (?date <= xsd:date(?periodEndDate))
        BIND(URI(CONCAT("http://ns.inria.fr/meteo/observationslice/", ?periodStartDate, "_", ?periodEndDate, "/slice_", str(?stationID))) AS ?uriSlice1)
        BIND(URI(CONCAT("http://ns.inria.fr/meteo/dataset/", ?periodStartDate, "_", ?periodEndDate, "/dataset_", str(?stationID))) AS ?uriDataset)
    }
    ORDER BY ?date
}
    `;
}

export function buildQuery_extractData(stationName, startDate, endDate) {
    return `
PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>

SELECT DISTINCT ?stationName ?date ?temp_avg ?temp_min ?temp_max (?temp_max - ?temp_min AS ?tdiff) ?rainfall ?gdd
WHERE {
    VALUES ?stationName { "` + stationName + `" }
    VALUES ?periodStartDate { "` + startDate + `" }
    VALUES ?periodEndDate { "` + endDate + `" }

    ?s a qb:Slice ;
       wes-dimension:station ?station ;
       wes-dimension:year ?year ;
       qb:observation [
          a qb:Observation ;
          wes-attribute:observationDate ?date ;
          wes-measure:minDailyTemperature ?temp_min ;
          wes-measure:maxDailyTemperature ?temp_max ;
          wes-measure:avgDailyTemperature ?temp_avg ;
          wes-measure:rainfall24h ?rainfall ;
       ].

    ?station a weo:WeatherStation ;
             rdfs:label ?stationName ;
             weo:stationID ?stationID .

    BIND(IF(xsd:float(?temp_avg) > 10.0, xsd:float(?temp_avg) - 10.0, xsd:float(1)) AS ?gdd)

    FILTER (?date >= xsd:date(?periodStartDate))
    FILTER (?date <= xsd:date(?periodEndDate))
}
ORDER BY ?date
    `;
}

export function buildQuery_station() {
    return `
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT DISTINCT *
WHERE {
    ?station rdfs:label ?stationName ;
             geo:lat ?lat ;
             geo:long ?long .
}
    `;
}

export function buildQuery_exportDailyData(stationName, startDate, endDate) {
    return `
PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX wep: <http://ns.inria.fr/meteo/ontology/property/>
PREFIX wevp: <http://ns.inria.fr/meteo/vocab/weatherproperty/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT distinct ?stationName ?date
    (SAMPLE(?temp_min) as ?daily_temp_min)
    (SAMPLE(?temp_max) as ?daily_temp_max)
    (SAMPLE(?rainfall) as ?daily_rainfall)
    (avg(?v)-273.15 as ?daily_tempAVG)
    WHERE
    {
        VALUES ?stationName {` + stationName + `}
        ?station a weo:WeatherStation ; rdfs:label ?stationName; weo:stationID ?stationID .
    {
        ?s a qb:Slice ;
        wes-dimension:station ?station;
        wes-dimension:year ?year;
        qb:observation [
        a qb:Observation ;
        wes-attribute:observationDate ?date ;
        wes-measure:minDailyTemperature ?temp_min;
        wes-measure:maxDailyTemperature ?temp_max;
        wes-measure:rainfall24h ?rainfall] .
        BIND(IF(?r > 0.0, ?r, 0.0) AS ?rainfall)
        FILTER (?date >=xsd:date("` + startDate + `"))
        FILTER (?date <=xsd:date("` + endDate + `"))
    }
      UNION
    {
       ?obs a weo:MeteorologicalObservation;
        sosa:observedProperty wevp:airTemperature;
        sosa:hasSimpleResult ?v;
        sosa:resultTime ?datetime;
        wep:madeByStation ?station.
        BIND (xsd:date(SUBSTR(STR(?datetime), 1,10)) as ?date)
        FILTER (xsd:date(SUBSTR(STR(?datetime), 1,10))>=xsd:date("` + startDate + `"))
        FILTER (xsd:date(SUBSTR(STR(?datetime), 1,10))<=xsd:date("` + endDate + `"))
    }
}
GROUP BY ?stationName ?date
ORDER BY ?date ?stationName
    `;
}

export function buildQuery_exportPeriodData(stationName, startDate, endDate) {
    return `
PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX wep: <http://ns.inria.fr/meteo/ontology/property/>
PREFIX wevp: <http://ns.inria.fr/meteo/vocab/weatherproperty/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT ?stationName
(SUM(IF(?temp_min < 0.0, 1, 0)) AS ?nbFrostDays)
(SUM(IF(?rainfall > 0.0, 1, 0)) AS ?nbRainyDays)
(SUM(IF(?temp_min > 20.0, 1, 0)) AS ?nbHeatDays)
(SUM(IF(?temp_max > 20.0, 1, 0)) AS ?nbSummerDays)
(SUM(IF(?humidity > 60, 1, 0)) AS ?nbWetDays)
(SUM(IF(?windSpeed > 5.28, 1, 0)) AS ?nbWindyDays)
?gdd
WHERE
{
VALUES ?stationName {` + stationName + `}
    {
        SELECT (AVG(?humidityR) AS ?humidity) ?date ?stationName
        WHERE {
            ?obs a weo:MeteorologicalObservation ;
                 sosa:observedProperty wevp:airRelativeHumidity ;
                 sosa:hasSimpleResult ?humidityR ;
                 sosa:resultTime ?datetime ;
                 wep:madeByStation ?station .
            ?station a weo:WeatherStation ;
                     rdfs:label ?stationName .
            BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date)
            FILTER (?date >= xsd:date("` + startDate + `"))
            FILTER (?date <= xsd:date("` + endDate + `"))
        }
        GROUP BY ?stationName ?date
    }

    UNION

    {
        SELECT (AVG(?windSpeedD) AS ?windSpeed) ?date ?stationName
        WHERE {
            ?obs a weo:MeteorologicalObservation ;
                 sosa:observedProperty wevp:windAverageSpeed ;
                 sosa:hasSimpleResult ?windSpeedD ;
                 sosa:resultTime ?datetime ;
                 wep:madeByStation ?station .
            ?station a weo:WeatherStation ;
                     rdfs:label ?stationName .
            BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date)
            FILTER (?date >= xsd:date("` + startDate + `"))
            FILTER (?date <= xsd:date("` + endDate + `"))
        }
        GROUP BY ?stationName ?date
    }
}
GROUP BY ?stationName ?temp_avg ?temp_min ?temp_max ?rainfall ?gdd
ORDER BY ?stationName
    `;
}

export function buildQuery_tmpRainStation(stationName, startDate, endDate) {
    console.log("Fetching tmpRainStation " + stationName + " between " + startDate + " and " + endDate)
    return `
PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?stationName ?date ?temp_avg ?temp_min ?temp_max (?temp_max - ?temp_min AS ?temp_diff) ?rainfall
WHERE {
    VALUES ?stationName {` + stationName + `}

    ?s a qb:Slice ;
       wes-dimension:station ?station ;
       wes-dimension:year ?year ;
       qb:observation [
          a qb:Observation ;
          wes-attribute:observationDate ?date ;
          wes-measure:minDailyTemperature ?temp_min ;
          wes-measure:maxDailyTemperature ?temp_max ;
          wes-measure:avgDailyTemperature ?temp_avg ;
          wes-measure:rainfall24h ?r
       ] .

    ?station a weo:WeatherStation ;
             rdfs:label ?stationName .

    BIND(IF(?r > 0, ?r, 0) AS ?rainfall)

    FILTER (?date >= xsd:date("` + startDate + `"))
    FILTER (?date <= xsd:date("` + endDate + `"))
}
ORDER BY ?date
    `;
}


export function buildQuery_nbStatsDaysStation(stationName, startDate, endDate) {
    console.log("Fetching nbStatsDaysStation " + stationName + " between " + startDate + " and " + endDate)
    // The end of this variable is a quickfix. The IN clause seems to not work if there is only one item in the list.
    const formattedStations = stationName.replace(/ /g, ",") + ",\"\"";
    return `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX wep: <http://ns.inria.fr/meteo/ontology/property/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX wevp: <http://ns.inria.fr/meteo/vocab/weatherproperty/>

SELECT
    ?stationName
    (SUM(IF(?temp_min < 0.0, 1, 0)) AS ?nbFrostDays)
    (SUM(IF(?rainfall > 0.0, 1, 0)) AS ?nbRainyDays)
    (SUM(IF(?temp_min > 20.0, 1, 0)) AS ?nbHeatDays)
    (SUM(IF(?temp_max > 20.0, 1, 0)) AS ?nbSummerDays)
    (SUM(IF(?humidity > 60, 1, 0)) AS ?nbWetDays)
    (SUM(IF(?windSpeed > 5.28, 1, 0)) AS ?nbWindyDays)
WHERE
{
    {
        ?s a qb:Slice ;
           wes-dimension:station ?station ;
           wes-dimension:year ?year ;
           qb:observation [
               a qb:Observation ;
               wes-attribute:observationDate ?date ;
               wes-measure:minDailyTemperature ?temp_min ;
               wes-measure:maxDailyTemperature ?temp_max ;
               wes-measure:avgDailyTemperature ?temp_avg ;
               wes-measure:rainfall24h ?rainfall
           ] .
        ?station a weo:WeatherStation ;
                 rdfs:label ?stationName .
        FILTER (?stationName IN (` + formattedStations + `))
        FILTER (?date >= xsd:date("` + startDate + `"))
        FILTER (?date <= xsd:date("` + endDate + `"))
    }
    UNION
    {
        SELECT (AVG(?humidityR) AS ?humidity) ?date ?stationName
        WHERE {
            ?obs a weo:MeteorologicalObservation ;
                 sosa:observedProperty wevp:airRelativeHumidity ;
                 sosa:hasSimpleResult ?humidityR ;
                 sosa:resultTime ?datetime ;
                 wep:madeByStation ?station .
            ?station a weo:WeatherStation ;
                     rdfs:label ?stationName .
            BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date)
            FILTER (?stationName IN (` + formattedStations + `))
            FILTER (?date >= xsd:date("` + startDate + `"))
            FILTER (?date <= xsd:date("` + endDate + `"))
        }
        GROUP BY ?stationName ?date
    }
    UNION
    {
        SELECT (AVG(?windSpeedD) AS ?windSpeed) ?date ?stationName
        WHERE {
            ?obs a weo:MeteorologicalObservation ;
                 sosa:observedProperty wevp:windAverageSpeed ;
                 sosa:hasSimpleResult ?windSpeedD ;
                 sosa:resultTime ?datetime ;
                 wep:madeByStation ?station .
            ?station a weo:WeatherStation ;
                     rdfs:label ?stationName .
            BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date)
            FILTER (?stationName IN (` + formattedStations + `))
            FILTER (?date >= xsd:date("` + startDate + `"))
            FILTER (?date <= xsd:date("` + endDate + `"))
        }
        GROUP BY ?stationName ?date
    }
    FILTER (?stationName IN (` + formattedStations + `))
}
GROUP BY ?stationName
    `;
}

export function buildQuery_GddDaysStation(stationName, startDate, endDate) {
    console.log("Fetching GddDaysStation " + stationName + " between " + startDate + " and " + endDate)
    return `
PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?stationName ?date ?gdd ?rainfall
WHERE
{
    VALUES ?stationName { `+ stationName +` }
    ?s a qb:Slice ;
       wes-dimension:station ?station ;
       wes-dimension:year ?year ;
       qb:observation [
           a qb:Observation ;
           wes-attribute:observationDate ?date ;
           wes-measure:avgDailyTemperature ?temp_avg ;
           wes-measure:rainfall24h ?r
       ] .
    ?station a weo:WeatherStation ;
             rdfs:label ?stationName .
    BIND(IF(?r > 0, ?r, 0) AS ?rainfall)
    BIND(IF(?temp_avg > 10, ?temp_avg - 10, 0) AS ?gdd)
    FILTER (?date >= xsd:date("`+ startDate +`"))
    FILTER (?date <= xsd:date("`+ endDate +`"))
}
ORDER BY ?date
    `;
}

export function buildQuery_dailyCumulativePrecipitation(stationName, startDate, endDate) {
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    
    SELECT distinct  ?stationName ?date ?rainfall WHERE
    {
        VALUES ?stationName { `+ stationName +` }
        ?s  a qb:Slice ;
        wes-dimension:station ?station  ;
    
        wes-dimension:year ?year;
        qb:observation [
        a qb:Observation ;
        wes-attribute:observationDate ?date ;
        wes-measure:rainfall24h ?r] .
        ?station a weo:WeatherStation ; rdfs:label ?stationName.
        BIND(IF(?r>0 , ?r,0) as ?rainfall)
        FILTER (?date >=xsd:date("`+ startDate +`"))
        FILTER (?date <=xsd:date("`+ endDate +`"))
    }
    
    ORDER BY ?date
    `;
}
