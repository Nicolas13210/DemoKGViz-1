export function buildQuery_extractDailyRDF(stationName, startDate, endDate) {
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
    SELECT distinct ?issueDate ?uriDataset ?uriSlice1 ?stationName ?date
        (SAMPLE(?temp_min) as ?daily_temp_min)
        (SAMPLE(?temp_max) as ?daily_temp_max)
        (SAMPLE(?rainfall) as ?daily_rainfall)
        (avg(?v)-273.15 as ?daily_tempAVG)
        WHERE
        {
            VALUES ?stationName {` + stationName + `}
            ?station a weo:WeatherStation ; rdfs:label ?stationName; weo:stationID ?stationID .
            BIND(xsd:date(NOW()) AS ?issueDate)
            BIND(URI(CONCAT("http://ns.inria.fr/meteo/observationslice/", ?periodStartDate, "_", ?periodEndDate, "/slice_", str(?stationID))) AS ?uriSlice1)
            BIND(URI(CONCAT("http://ns.inria.fr/meteo/dataset/", ?periodStartDate, "_", ?periodEndDate, "/dataset_", str(?stationID))) AS ?uriDataset)
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
    GROUP BY ?stationName ?date ?uriDataset ?uriSlice1 ?issueDate
    ORDER BY ?date ?stationName
}
    `;
}

export function buildQuery_extractAggregateRDF(stationName, startDate, endDate) {
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
    SELECT ?issueDate ?uriDataset ?uriSlice1 ?stationName
(SUM(IF(?temp_min < 0.0, 1, 0)) AS ?nbFrostDays)
(SUM(IF(?rainfall > 0.0, 1, 0)) AS ?nbRainyDays)
(SUM(IF(?temp_min > 20.0, 1, 0)) AS ?nbHeatDays)
(SUM(IF(?temp_max > 20.0, 1, 0)) AS ?nbSummerDays)
#(SUM(IF(?humidity > 60, 1, 0)) AS ?nbWetDays)
#(SUM(IF(?windSpeed > 5.28, 1, 0)) AS ?nbWindyDays)
(SUM(IF(?temp_avg > 10, ?temp_avg - 10, 0)) AS ?gdd)
WHERE
{
    VALUES ?stationName  {` + stationName + `}
    ?station a weo:WeatherStation ; rdfs:label ?stationName .
    
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
        
        BIND(IF(?r > 0, ?r, 0) AS ?rainfall)
     
        FILTER (?date >= xsd:date("` + startDate + `"))
        FILTER (?date <= xsd:date("` + endDate + `"))
    }
}
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
    ?station rdfs:label ?stationName;
             geo:lat ?lat ;
             geo:long ?long .
}
    `;
}

export function buildQuery_exportDailyData(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel,deficitLevel) {
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

export function buildQuery_exportAggregateData(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel,deficitLevel) {
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

SELECT ?stationName
(SUM(IF(?temp_min < 0.0, 1, 0)) AS ?nbFrostDays)
(SUM(IF(?rainfall > 0.0, 1, 0)) AS ?nbRainyDays)
(SUM(IF(?temp_min > 20.0, 1, 0)) AS ?nbHeatDays)
(SUM(IF(?temp_max > 20.0, 1, 0)) AS ?nbSummerDays)
#(SUM(IF(?humidity > 60, 1, 0)) AS ?nbWetDays)
#(SUM(IF(?windSpeed > 5.28, 1, 0)) AS ?nbWindyDays)
(SUM(IF(?temp_avg > 10, ?temp_avg - 10, 0)) AS ?gdd)
WHERE
{
VALUES ?stationName  {` + stationName + `}
?station a weo:WeatherStation ; rdfs:label ?stationName .
    
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
        
        BIND(IF(?r > 0, ?r, 0) AS ?rainfall)
     
        FILTER (?date >= xsd:date("` + startDate + `"))
        FILTER (?date <= xsd:date("` + endDate + `"))
}
    `;
}

export function buildQuery_tmpRainStation(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel) {
    return `
PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX wep: <http://ns.inria.fr/meteo/ontology/property/> 
PREFIX sosa: <http://www.w3.org/ns/sosa/> 

SELECT DISTINCT (SAMPLE(?stationName) AS ?stationName) (SAMPLE(?date) AS ?date) (SAMPLE(?temp_avg) AS ?temp_avg) 
(SAMPLE(?temp_min) AS ?temp_min) (SAMPLE(?temp_max) AS ?temp_max) (SAMPLE(?temp_diff) AS ?temp_diff) (SAMPLE(?rainfall) AS ?rainfall) 
(SAMPLE(?radiation) AS ?radiation) (SAMPLE(?evapotranspiration) AS ?evapotranspiration) (AVG(?hum) as ?humidity)
WHERE {
    VALUES ?stationName {` + stationName + `}

    ?station a weo:WeatherStation ;
             rdfs:label ?stationName .


    {?s a qb:Slice ;
           wes-dimension:station ?station ;
           wes-dimension:year ?year ;
           qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date ;
              wes-measure:minDailyTemperature ?temp_min ;
              wes-measure:maxDailyTemperature ?temp_max ;
              wes-measure:avgDailyTemperature ?temp_avg ;
              wes-measure:rainfall24h ?r ; 
              wes-measure:radiationSum ?radiation ;
              wes-measure:evapotranspiration ?evapotranspiration
           ] .
       }
       UNION 
       {
  

          ?obs a weo:MeteorologicalObservation; 
          wep:madeByStation ?station;
          sosa:observedProperty <http://ns.inria.fr/meteo/vocab/weatherproperty/airRelativeHumidity> ;
          sosa:resultTime ?datetime ;
          sosa:hasSimpleResult ?hum .

          BIND (xsd:date(SUBSTR(STR(?datetime), 1,10)) as ?date)
       }


    

    BIND(IF(?r > 0, ?r, 0) AS ?rainfall)
    BIND(IF(BOUND(?temp_min) && BOUND(?temp_max),xsd:double(?temp_max) - xsd:double(?temp_min) ,0) as ?temp_diff)
    FILTER (?date >= xsd:date("` + startDate + `"))
    FILTER (?date <= xsd:date("` + endDate + `"))
}
GROUP BY ?date
ORDER BY ?date
    `;
}


export function buildQuery_nbStatsDaysStation(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel) {
    // The end of this variable is a quickfix. The IN clause seems to not work if there is only one item in the list.
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
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
    (SUM(IF(?temp_min < ` + coldMin + `, 1, 0)) AS ?nbFrostDays)
    (SUM(IF(?temp_avg < ` + coldMin + `, 1, 0)) AS ?nbColdDays)
    (SUM(IF(?temp_avg > ` + minTemp + ` && ?temp_avg < `+ maxTemp + `, 1, 0)) AS ?nbVernDays)
    (SUM(IF(?rainfall > ` + rainLevel + `, 1, 0)) AS ?nbRainyDays)
    (SUM(IF(?rainfall < ` + deficitLevel + `, 1, 0)) AS ?nbDefDays)
    (SUM(IF(?temp_max > ` + heat + `, 1, 0)) AS ?nbHeatDays)
    (SUM(IF(?temp_avg > ` + heat + `, 1, 0)) AS ?nbHeatDaysAvg)
    (MIN(?dateF) AS ?startFrost)
    (MAX(?dateF) AS ?endFrost)
    (MIN(?dateH) AS ?startHeat)
    (MAX(?dateH) AS ?endHeat)
    (ROUND(xsd:double(SUM(IF(?temp_min < ` + coldMin + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?frostFrequencie)
    (ROUND(xsd:double(SUM(IF(?temp_avg < ` + coldMin + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?coldFrequencie)
    (ROUND(xsd:double(SUM(IF(?temp_max > ` + heat + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?heatFrequencie)
    (ROUND(xsd:double(SUM(IF(?temp_avg > ` + heat + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?heatAvgFrequencie)
    (ROUND(xsd:double(SUM(IF(?temp_avg > ` + minTemp + ` && ?temp_avg < `+ maxTemp + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?vernFrequencie)
    (ROUND(xsd:double(SUM(IF(?rainfall > ` + rainLevel + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?rainfreq)
    ((MAX(?dateF)-MIN(?dateF))/(3600*24)+1 as ?frostPeriod)
    ((MAX(?dateH)-MIN(?dateH))/(3600*24)+1 as ?heatPeriod)
    (SUM(IF(?humidity < ` + minHum + `, 1, 0)) AS ?nbDryDays)
    (SUM(IF(?humidity > ` + maxHum + `, 1, 0)) AS ?nbWetDays)
    (ROUND(xsd:double(SUM(IF(?humidity < ` + minHum + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?dryFrequencie)
    (ROUND(xsd:double(SUM(IF(?humidity > ` + maxHum + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?wetFrequencie)
    (ROUND(xsd:double(SUM(IF(?rainfall < ` + deficitLevel + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?rainlessFrequencie)
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
               wes-measure:rainfall24h ?rainfall ;
               wes-measure:evapotranspiration ?evapo
               
           ] .
        ?station a weo:WeatherStation ;
                 rdfs:label ?stationName .
        FILTER (?stationName IN (` + formattedStations + `))
        FILTER (?date >= xsd:date("` + startDate + `"))
        FILTER (?date <= xsd:date("` + endDate + `"))
        BIND(IF(?temp_min<` + coldMin + `,?date,xsd:date('0000-01-01')) AS ?dateF)
        BIND(IF(?temp_max>` + heat + `,?date,xsd:date('0000-01-01')) AS ?dateH)
        BIND((xsd:date("` + endDate + `")-xsd:date("` + startDate + `"))/(3600*24)+1 AS ?days)
        BIND(?rainfall - ?evapo AS ?deficit)
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
    
    FILTER (?stationName IN (` + formattedStations + `))
}
GROUP BY ?stationName
    `;
}

export function buildQuery_nbStatsDaysHumStation(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel) {
    // The end of this variable is a quickfix. The IN clause seems to not work if there is only one item in the list.
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
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
    ?date
    (SUM(?wetHumidity) AS ?wetCumul)
    (SUM(?dryHumidity) AS ?dryCumul)
    
WHERE
{
  {
    SELECT (AVG(?humidityR) AS ?humidity) ?date ?stationName WHERE {
      ?station a weo:WeatherStation ;
        rdfs:label ?stationName .

      ?obs a weo:MeteorologicalObservation ;
        sosa:observedProperty wevp:airRelativeHumidity ;
        sosa:hasSimpleResult ?humidityR ;
        sosa:resultTime ?datetime ;
        wep:madeByStation ?station .          

      BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date)
      FILTER (?stationName IN (` + formattedStations + `))
      FILTER (?date >= xsd:date("` + startDate + `"))
      FILTER (?date <= xsd:date("` + endDate + `"))
    }
    GROUP BY ?stationName ?date
  }

  {
    SELECT (AVG(?humidityR) AS ?humidity1) ?date1 ?stationName WHERE {
      ?station a weo:WeatherStation ;
        rdfs:label ?stationName .

      ?obs a weo:MeteorologicalObservation ;
        sosa:observedProperty wevp:airRelativeHumidity ;
        sosa:hasSimpleResult ?humidityR ;
        sosa:resultTime ?datetime ;
        wep:madeByStation ?station .          

      BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date1)
      FILTER (?stationName IN (` + formattedStations + `))
      FILTER (?date1 >= xsd:date("` + startDate + `"))
      FILTER (?date1 <= xsd:date("` + endDate + `"))
    }
    GROUP BY ?stationName ?date1
  }

  FILTER(?date>=?date1)
  BIND(IF(?humidity1 >` + maxHum + `,?humidity1,0) AS ?wetHumidity)
  BIND(IF(?humidity1 <` + minHum + `,?humidity1,0) AS ?dryHumidity)

  FILTER (?stationName IN (` + formattedStations + `))
}
GROUP BY ?stationName ?date ?humidity
ORDER BY ?date
    `;
}


export function buildQuery_GddDaysStation(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb: <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?stationName ?date ?GDD  (SUM(?GDDSUM) AS ?cumulativeGDD) (SAMPLE(?rainfall1) AS ?rainfall)
    WHERE
    {
        VALUES ?stationName { `+ stationName +` }
        ?s a qb:Slice ;
           wes-dimension:station ?station ;
           wes-dimension:year ?year ;
           qb:observation [
               a qb:Observation ;
               wes-attribute:observationDate ?date ;
               wes-measure:minDailyTemperature ?min ;
               wes-measure:maxDailyTemperature ?max ;
               wes-measure:rainfall24h ?r
           ] .
        ?s a qb:Slice ;
           wes-dimension:station ?station ;
           wes-dimension:year ?year ;
           qb:observation [
               a qb:Observation ;
               wes-attribute:observationDate ?date1 ;
               wes-measure:minDailyTemperature ?min1 ;
               wes-measure:maxDailyTemperature ?max1 
            ] .
        ?station a weo:WeatherStation ;
                 rdfs:label ?stationName .
        BIND(IF(?r > 0, ?r, 0) AS ?rainfall1)


        BIND(IF(STR(?min)!="Unknown" && STR(?max)!="Unknown",(?min +  ?max)/2," ") AS ?temp_avg)
        BIND(IF(STR(?temp_avg)!=" ", IF(?temp_avg > `+ baseTemp + `, ?temp_avg - `+ baseTemp + `, 0),"Unknown" ) AS ?GDD)


        BIND(IF(STR(?min1)!="Unknown" && STR(?max1)!="Unknown",(?min1 +  ?max1)/2," ") AS ?temp_avg1)
        BIND(IF(STR(?temp_avg1)!=" ", IF(?temp_avg1 > `+ baseTemp + `, ?temp_avg1 - `+ baseTemp + `, 0),"Unknown" ) AS ?GDD1)


        BIND(IF(STR(?GDD1)!="Unknown",?GDD1,0) AS ?GDDSUM)
        FILTER (?date >= xsd:date("`+ startDate +`"))
        FILTER (?stationName IN (` + formattedStations + `))
        FILTER (?date <= xsd:date("`+ endDate +`"))
        FILTER ((?date) >=(?date1))
    }
    GROUP BY ?stationName ?date ?GDD
    ORDER BY ?date
    `;
}

export function buildQuery_dailyCumulativePrecipitation(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel) {
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
export function buildQuery_consecutiveDaysSpellFrost(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?stationName ?date1 ?date2  WHERE {
      ?station a weo:WeatherStation ; rdfs:label ?stationName.

      # The first slice in the sequence
      ?s1 a qb:Slice ;
          wes-dimension:station ?station ;
          wes-dimension:year ?year1 ;
          qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date1 ;
              wes-measure:minDailyTemperature ?tempMin1
          ] .

      # The ith slice in the sequence
      ?s2 a qb:Slice ;
          wes-dimension:station ?station ;
          wes-dimension:year ?year2 ;
          qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date2 ;
              wes-measure:minDailyTemperature ?tempMin2
          ] .
      FILTER (?date1 >=xsd:date("`+ startDate +`"))
      FILTER (?date1 <=xsd:date("`+ endDate +`"))
      FILTER (?date2 >=xsd:date("`+ startDate +`"))
      FILTER (?date2 <=xsd:date("`+ endDate +`"))
      FILTER (?stationName IN (` + formattedStations + `))
      FILTER (?date2 >= ?date1)      # Ensure n consecutive days in ascending order
      FILTER (?date2 - ?date1 = 3600*24)  # Ensure n consecutive days
      FILTER (?tempMin1 < ` + coldMin + ` && ?tempMin2 < ` + coldMin + `)
    }
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 ?date2
  `
}

export function buildQuery_consecutiveDaysSpellHeat(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?stationName ?date1 ?date2  WHERE {
      ?station a weo:WeatherStation ; rdfs:label ?stationName.

      # The first slice in the sequence
      ?s1 a qb:Slice ;
          wes-dimension:station ?station ;
          wes-dimension:year ?year1 ;
          qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date1 ;
              wes-measure:maxDailyTemperature ?tempMax1
          ] .

      # The ith slice in the sequence
      ?s2 a qb:Slice ;
          wes-dimension:station ?station ;
          wes-dimension:year ?year2 ;
          qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date2 ;
              wes-measure:maxDailyTemperature ?tempMax2
          ] .
      FILTER (?date1 >=xsd:date("`+ startDate +`"))
      FILTER (?date1 <=xsd:date("`+ endDate +`"))
      FILTER (?date2 >=xsd:date("`+ startDate +`"))
      FILTER (?date2 <=xsd:date("`+ endDate +`"))
      FILTER (?stationName IN (` + formattedStations + `))
      FILTER (?date2 >= ?date1)      # Ensure n consecutive days in ascending order
      FILTER (?date2 - ?date1 = 3600*24)  # Ensure n consecutive days
      FILTER (?tempMax1 > ` + heat + ` && ?tempMax2 > ` + heat + `)
    }
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 ?date2
  `
}

export function buildQuery_consecutiveDaysHighHum(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX sosa: <http://www.w3.org/ns/sosa/>
    PREFIX wep: <http://ns.inria.fr/meteo/ontology/property/>
    PREFIX wevp: <http://ns.inria.fr/meteo/vocab/weatherproperty/>

    SELECT ?stationName ?date1 ?date2  WHERE {
      ?station a weo:WeatherStation ; rdfs:label ?stationName.

      {
        SELECT (AVG(?humidityR) AS ?humidity1) ?date1 ?stationName WHERE {
          ?station a weo:WeatherStation ;
            rdfs:label ?stationName .

          ?obs a weo:MeteorologicalObservation ;
            sosa:observedProperty wevp:airRelativeHumidity ;
            sosa:hasSimpleResult ?humidityR ;
            sosa:resultTime ?datetime ;
            wep:madeByStation ?station .          

          BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date1)
          FILTER (?stationName IN (` + formattedStations + `))
          FILTER (?date1 >= xsd:date("` + startDate + `"))
          FILTER (?date1 <= xsd:date("` + endDate + `"))
        }
        GROUP BY ?stationName ?date1
  }
  {
        SELECT (AVG(?humidityR) AS ?humidity2) ?date2 ?stationName2 WHERE {
          ?station a weo:WeatherStation ;
            rdfs:label ?stationName2 .

          ?obs a weo:MeteorologicalObservation ;
            sosa:observedProperty wevp:airRelativeHumidity ;
            sosa:hasSimpleResult ?humidityR ;
            sosa:resultTime ?datetime ;
            wep:madeByStation ?station .          

          BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date2)
          FILTER (?stationName2 IN (` + formattedStations + `))
          FILTER (?date2 >= xsd:date("` + startDate + `"))
          FILTER (?date2 <= xsd:date("` + endDate + `"))
        }
        GROUP BY ?stationName2 ?date2
  }

      FILTER (?stationName IN (` + formattedStations + `))
      FILTER (?date2 >= ?date1)      # Ensure n consecutive days in ascending order
      FILTER (?date2 - ?date1 = 3600*24)  # Ensure n consecutive days
      FILTER (?humidity1 > ` + maxHum + ` && ?humidity2 > ` + maxHum + `)
    }
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 ?date2
  `
}

export function buildQuery_consecutiveDaysDroughtWave(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?stationName ?date1 ?date2  WHERE {
      ?station a weo:WeatherStation ; rdfs:label ?stationName.

      # The first slice in the sequence
      ?s1 a qb:Slice ;
          wes-dimension:station ?station ;
          wes-dimension:year ?year1 ;
          qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date1 ;
              wes-measure:rainfall24h ?rainfall1
          ] .

      # The ith slice in the sequence
      ?s2 a qb:Slice ;
          wes-dimension:station ?station ;
          wes-dimension:year ?year2 ;
          qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date2 ;
              wes-measure:rainfall24h ?rainfall2
          ] .
      FILTER (?date1 >=xsd:date("`+ startDate +`"))
      FILTER (?date1 <=xsd:date("`+ endDate +`"))
      FILTER (?date2 >=xsd:date("`+ startDate +`"))
      FILTER (?date2 <=xsd:date("`+ endDate +`"))
      FILTER (?stationName IN (` + formattedStations + `))
      FILTER (?date2 >= ?date1)      # Ensure n consecutive days in ascending order
      FILTER (?date2 - ?date1 = 3600*24)  # Ensure n consecutive days
      FILTER (?rainfall1 <= ` + rainLevel + ` && ?rainfall2 <=` + rainLevel + `)
    }
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 ?date2
  `
}

export function buildQuery_consecutiveDaysmaxConsDays(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?stationName ?date1 ?date2  WHERE {
      ?station a weo:WeatherStation ; rdfs:label ?stationName.

      # The first slice in the sequence
      ?s1 a qb:Slice ;
          wes-dimension:station ?station ;
          wes-dimension:year ?year1 ;
          qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date1 ;
              wes-measure:rainfall24h ?rainfall1 ;
              wes-measure:evapotranspiration ?evapotranspiration1
          ] .

      # The ith slice in the sequence
      ?s2 a qb:Slice ;
          wes-dimension:station ?station ;
          wes-dimension:year ?year2 ;
          qb:observation [
              a qb:Observation ;
              wes-attribute:observationDate ?date2 ;
              wes-measure:rainfall24h ?rainfall2 ; 
              wes-measure:evapotranspiration ?evapotranspiration2
          ] .
      FILTER (?date1 >=xsd:date("`+ startDate +`"))
      FILTER (?date1 <=xsd:date("`+ endDate +`"))
      FILTER (?date2 >=xsd:date("`+ startDate +`"))
      FILTER (?date2 <=xsd:date("`+ endDate +`"))
      FILTER (?stationName IN (` + formattedStations + `))
      FILTER (?date2 >= ?date1)      # Ensure n consecutive days in ascending order
      FILTER (?date2 - ?date1 = 3600*24)  # Ensure n consecutive days
      BIND(?rainfall1 - ?evapotranspiration1 as ?deficit1)
      BIND(?rainfall2 - ?evapotranspiration2 as ?deficit2)
      FILTER (?deficit1 <= ` + deficitLevel + ` && ?deficit2 <=` + deficitLevel + `)
    }
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 ?date2
  `
}