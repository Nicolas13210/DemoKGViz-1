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
                   wes-measure:avgDailyTemperature ?temp_avg
               ].
}
WHERE {
    SELECT distinct ?issueDate ?uriDataset  ?station ?date ?periodStartDate ?periodEndDate
        ?temp_min ?temp_max ?rainfall ?temp_avg
        WHERE
        {
            VALUES ?stationName {` + stationName + `}
            BIND(xsd:date("` + startDate + `") as ?periodStartDate)
            BIND(xsd:date("` + endDate + `") as ?periodEndDate)
            ?station a weo:WeatherStation ; rdfs:label ?stationName; weo:stationID ?stationID .
            BIND(xsd:date(NOW()) AS ?issueDate)
            BIND(URI(CONCAT("http://ns.inria.fr/meteo/aggregateobservationslice/", ?periodStartDate, "_", ?periodEndDate, "/slice_", str(?stationID))) AS ?uriSlice1)
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
            wes-measure:avgDailyTemperature ?temp_avg;
            wes-measure:rainfall24h ?rainfall] .
            BIND(IF(?r > 0.0, ?r, 0.0) AS ?rainfall)
            FILTER (?date >= ?periodStartDate)
            FILTER (?date <= ?periodEndDate)
        }
    }
    GROUP BY ?stationName ?date ?uriDataset ?uriSlice1 ?issueDate
    ORDER BY ?date ?stationName
}
    `;
}

export function buildQuery_extractAggregateRDF(stationName, startDate, endDate) {
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
  PREFIX dct: <http://purl.org/dc/terms/>
  CONSTRUCT {
      ?uriDataset a qb:DataSet ;
                  dct:issued ?issueDate ;
                  qb:slice ?uriSlice1 .
      ?uriSlice1 a qb:Slice ;
                wes-dimension:station ?station ;
                wes-dimension:periodStartDate ?periodStartDate ;
                wes-dimension:periodEndDate ?periodEndDate ;
                wes-measure:nbColdDays ?nbColdDays ;
                wes-measure:nbExtColdDays ?nbExtColdDays ;
                wes-measure:nbVernDays ?nbVernDays ;
                wes-measure:nbRainyDays ?nbRainyDays ;
                wes-measure:nbHeatDays ?nbHeatDays ;
                wes-measure:nbExtHeatDays ?nbExtHeatDays ;
                wes-measure:nbWindyDays ?nbWindyDays ;
                wes-measure:startFrost ?startFrost ;
                wes-measure:endFrost ?endFrost ;
                wes-measure:startHeat ?startHeat ;
                wes-measure:endHeat ?endHeat ;
                wes-measure:extrColdFreq ?extrColdFreq ;
                wes-measure:coldFreq ?coldFreq ;
                wes-measure:heatFreq ?heatFreq ;
                wes-measure:extrHeatFreq ?extrHeatFreq ;
                wes-measure:vernFreq ?vernFreq ;
                wes-measure:rainfreq ?rainfreq ;
                wes-measure:frostPeriod ?frostPeriod ;
                wes-measure:heatPeriod ?heatPeriod ;
                wes-measure:nbDryDays ?nbDryDays ;
                wes-measure:nbWetDays ?nbWetDays ;
                wes-measure:dryFreq ?dryFreq ;
                wes-measure:wetFreq ?wetFreq ;
                wes-measure:windFreq ?windFreq .


  }
  WHERE {
      SELECT
      ?station
      (SUM(IF(?temp_min < 0, 1, 0)) AS ?nbColdDays)
      (SUM(IF(?temp_avg < 0, 1, 0)) AS ?nbExtColdDays)
      (SUM(IF(?temp_avg > 0 && ?temp_avg < 40, 1, 0)) AS ?nbVernDays)
      (SUM(IF(?rainfall > 0, 1, 0)) AS ?nbRainyDays)
      (SUM(IF(?temp_max > 30, 1, 0)) AS ?nbHeatDays)
      (SUM(IF(?temp_avg > 30, 1, 0)) AS ?nbExtHeatDays)
      (SUM(IF(?wind > 5, 1, 0)) AS ?nbWindyDays)
      (MIN(?dateF) AS ?startFrost)
      (MAX(?dateF) AS ?endFrost)
      (MIN(?dateH) AS ?startHeat)
      (MAX(?dateH) AS ?endHeat)
      (ROUND(xsd:double(SUM(IF(?temp_min < 0, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?coldFreq)
      (ROUND(xsd:double(SUM(IF(?temp_avg < 0, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?extrColdFreq)
      (ROUND(xsd:double(SUM(IF(?temp_max > 30, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?heatFreq)
      (ROUND(xsd:double(SUM(IF(?temp_avg > 30, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?extrHeatFreq)
      (ROUND(xsd:double(SUM(IF(?temp_avg > 0 && ?temp_avg < 40, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?vernFreq)
      (ROUND(xsd:double(SUM(IF(?rainfall > 0, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?rainfreq)
      ((MAX(?dateF)-MIN(?dateF))/(3600*24)+ 1 as ?frostPeriod)
      ((MAX(?dateH)-MIN(?dateH))/(3600*24)+1 as ?heatPeriod)
      (SUM(IF(?humidity < 40, 1, 0)) AS ?nbDryDays)
      (SUM(IF(?humidity > 60, 1, 0)) AS ?nbWetDays)
      (ROUND(xsd:double(SUM(IF(?humidity < 40, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?dryFreq)
      (ROUND(xsd:double(SUM(IF(?humidity > 60, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?wetFreq)
      (ROUND(xsd:double(SUM(IF(?wind > 5, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?windFreq)
      (SAMPLE(?periodEndDate )as ?periodEndDate)
      (SAMPLE(?periodStartDate) as ?periodStartDate)
      (SAMPLE(?uriSlice1) as ?uriSlice1)
      (SAMPLE(?uriDataset) as ?uriDataset)
  WHERE
  {

      BIND(xsd:date("` + startDate + `") AS ?periodStartDate)
      BIND(xsd:date("` + endDate + `") AS ?periodEndDate)
      BIND(xsd:date(NOW()) AS ?issueDate)
      VALUES ?stationName {`+ stationName +`}
      ?station a weo:WeatherStation ; rdfs:label ?stationName; weo:stationID ?stationID .
      BIND(URI(CONCAT("http://ns.inria.fr/meteo/aggregateobservationslice/", ?periodStartDate, "_", ?periodEndDate, "/slice_", str(?stationID))) AS ?uriSlice1)
      BIND(URI(CONCAT("http://ns.inria.fr/meteo/dataset/", ?periodStartDate, "_", ?periodEndDate, "/dataset_", str(?stationID))) AS ?uriDataset)
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
          FILTER (?date >= xsd:date("2020-01-01"))
          FILTER (?date <= xsd:date("2020-12-31"))
          BIND(IF(?temp_min<0,?date,xsd:date('0000-01-01')) AS ?dateF)
          BIND(IF(?temp_max>30,?date,xsd:date('0000-01-01')) AS ?dateH)
          BIND((xsd:date("2020-12-31")-xsd:date("2020-01-01"))/(3600*24)+ 1 AS ?days)
          BIND(?rainfall - 0 AS ?deficit)
      }
      UNION
      {
          SELECT (AVG(?humidityR) AS ?humidity) ?date ?station
          WHERE {
              ?obs a weo:MeteorologicalObservation ;
                  sosa:observedProperty wevp:airRelativeHumidity ;
                  sosa:hasSimpleResult ?humidityR ;
                  sosa:resultTime ?datetime ;
                  wep:madeByStation ?station .
              ?station a weo:WeatherStation ;
                      rdfs:label ?stationName .
              BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date)
              FILTER (?stationName = `+ stationName +`)
              FILTER (?date >= ?periodStartDate)
              FILTER (?date <= ?periodEndDate)
            }
            GROUP BY ?station ?date
      }

      UNION
      {
          SELECT (AVG(?windR) AS ?wind) ?date ?station
          WHERE {
              ?obs a weo:MeteorologicalObservation ;
                  sosa:observedProperty wevp:windAverageSpeed ;
                  sosa:hasSimpleResult ?windR ;
                  sosa:resultTime ?datetime ;
                  wep:madeByStation ?station .
              ?station a weo:WeatherStation ;
                      rdfs:label ?stationName .
              BIND (xsd:date(SUBSTR(STR(?datetime), 1, 10)) AS ?date)
              FILTER (?stationName = "POITIERS-BIARD")
              FILTER (?date >= ?periodStartDate)
              FILTER (?date <= ?periodEndDate)
          }
          GROUP BY ?station ?date
      }
      
      FILTER (?stationName = `+ stationName +`)
  }
  GROUP BY ?station
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

export function buildQuery_exportDailyData(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel,deficitLevel, windSpeed) {
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

export function buildQuery_exportAggregateData(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel,deficitLevel, windSpeed) {
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

export function buildQuery_tmpRainStation(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel, windSpeed) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
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

SELECT DISTINCT ?stationName ?date (SAMPLE(?temp_avg) AS ?temp_avg) 
(SAMPLE(?temp_min) AS ?temp_min) (SAMPLE(?temp_max) AS ?temp_max) (SAMPLE(?temp_diff) AS ?temp_diff) (SAMPLE(?rainfall) AS ?rainfall) 
(AVG(?hum) as ?humidity)
WHERE {

    ?station a weo:WeatherStation ;
             rdfs:label ?stationName .

    FILTER(?stationName IN (` + formattedStations + `))


    {?s a qb:Slice ;
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
    BIND(IF(BOUND(?temp_min) && BOUND(?temp_max),ABS(xsd:double(?temp_max) - xsd:double(?temp_min)) ,0) as ?temp_diff)
    FILTER (?date >= xsd:date("` + startDate + `"))
    FILTER (?date <= xsd:date("` + endDate + `"))
}
GROUP BY ?stationName ?date
ORDER BY ?stationName ?date
    `;
}


export function buildQuery_nbStatsDaysStation(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel, windSpeed) {
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
    (SUM(IF(?temp_min < ` + coldMin + `, 1, 0)) AS ?nbColdDays)
    (SUM(IF(?temp_avg < ` + coldMin + `, 1, 0)) AS ?nbExtremeColdDays)
    (SUM(IF(?temp_avg > ` + minTemp + ` && ?temp_avg < `+ maxTemp + `, 1, 0)) AS ?nbVernDays)
    (SUM(IF(?rainfall > ` + rainLevel + `, 1, 0)) AS ?nbRainyDays)
    (SUM(IF(?temp_max > ` + heat + `, 1, 0)) AS ?nbHeatDays)
    (SUM(IF(?temp_avg > ` + heat + `, 1, 0)) AS ?nbExtremeHeatDays)
    (SUM(IF(?wind > ` + windSpeed + `, 1, 0)) AS ?nbWindyDays)
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
    (ROUND(xsd:double(SUM(IF(?wind > ` + windSpeed + `, 1, 0))*100)/xsd:double(SAMPLE(?days))*100)/100 AS ?windFrequencie)

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
        BIND(IF(?temp_min<` + coldMin + `,?date,xsd:date('0000-01-01')) AS ?dateF)
        BIND(IF(?temp_max>` + heat + `,?date,xsd:date('0000-01-01')) AS ?dateH)
        BIND((xsd:date("` + endDate + `")-xsd:date("` + startDate + `"))/(3600*24)+1 AS ?days)
        BIND(?rainfall - 0 AS ?deficit)
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
        SELECT (AVG(?windR) AS ?wind) ?date ?stationName
        WHERE {
            ?obs a weo:MeteorologicalObservation ;
                 sosa:observedProperty wevp:windAverageSpeed ;
                 sosa:hasSimpleResult ?windR ;
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

export function buildQuery_GddDaysStation(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel, windSpeed) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb: <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?stationName ?date ?cumulativeGDD ?GDD 
    {SELECT DISTINCT ?stationName ?date ?GDD  (SUM(?GDDSUM) AS ?cumulativeGDD)
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
               ] .
            ?s a qb:Slice ;
               wes-dimension:station ?station ;
               wes-dimension:year ?year ;
               qb:observation [
                   a qb:Observation ;
                   wes-attribute:observationDate ?date1 ;
                   wes-measure:minDailyTemperature ?min1 ;
                   wes-measure:maxDailyTemperature ?max1 ;
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
        }`;
}

export function buildQuery_dailyCumulativeDeficit(stationName, startDate, endDate, baseTemp,coldMin, heat, minTemp, maxTemp, minHum, maxHum, rainLevel, deficitLevel, windSpeed) {
    const formattedStations = stationName.replace(/\" \"/g, "\",\"") + ",\"\"";
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?stationName (?date1 AS ?date) (SUM(?rainfall2) AS ?cprecip){
        {SELECT  ?stationName ?date1 ?rainfall1 WHERE
            {
                ?s  a qb:Slice ;
                wes-dimension:station ?station  ;
                wes-dimension:year ?year;
                qb:observation [
                a qb:Observation ;
                wes-attribute:observationDate ?date1 ;
                wes-measure:rainfall24h ?r;] .
                ?station a weo:WeatherStation ; rdfs:label ?stationName.
                BIND(IF(?r>0 && STR(?r)!="Unknown", ?r,0) as ?rainfall1)
                FILTER (?date1 >=xsd:date("`+ startDate +`"))
                FILTER (?date1 <=xsd:date("`+ endDate +`"))
                FILTER (?stationName IN (` + formattedStations + `))
            }
        }
        {SELECT  ?stationName ?date2  ?rainfall2 WHERE
            {
                ?s  a qb:Slice ;
                wes-dimension:station ?station  ;
            
                wes-dimension:year ?year;
                qb:observation [
                a qb:Observation ;
                wes-attribute:observationDate ?date2 ;
                wes-measure:rainfall24h ?r] .
                ?station a weo:WeatherStation ; rdfs:label ?stationName.
                BIND(IF(?r>0 && STR(?r)!="Unknown", ?r,0) as ?rainfall2)
                FILTER (?date2 >=xsd:date("`+ startDate +`"))
                FILTER (?date2 <=xsd:date("`+ endDate +`"))
                FILTER (?stationName IN (` + formattedStations + `))
            }
        }
        FILTER(?date1>=?date2)
        FILTER (?stationName IN (` + formattedStations + `))
        }
    GROUP BY ?stationName ?date1 ?rainfall1
    ORDER BY ?stationName ?date1
    `;
}
export function buildQuery_consecutiveDaysSpellFrost(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel, windSpeed) {
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

    SELECT ?stationName ?date1   WHERE {
      {
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
      
            FILTER (?date1 >=xsd:date("`+ startDate +`"))
            FILTER (?date1 <=xsd:date("`+ endDate +`"))
      
            FILTER (?tempMin1 < ` + coldMin + `)
      }
      UNION
      {
        ?station a weo:WeatherStation ; rdfs:label ?stationName.
      }
      FILTER (?stationName IN (` + formattedStations + `))
    }
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 
  `
}

export function buildQuery_consecutiveDaysSpellHeat(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel, windSpeed) {
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

    SELECT ?stationName ?date1   WHERE {
      {?station a weo:WeatherStation ; rdfs:label ?stationName.
      
            # The first slice in the sequence
            ?s1 a qb:Slice ;
                wes-dimension:station ?station ;
                wes-dimension:year ?year1 ;
                qb:observation [
                    a qb:Observation ;
                    wes-attribute:observationDate ?date1 ;
                    wes-measure:maxDailyTemperature ?tempMax1
                ] .
      
            FILTER (?date1 >=xsd:date("`+ startDate +`"))
            FILTER (?date1 <=xsd:date("`+ endDate +`"))
            FILTER (?tempMax1 > ` + heat + `)
          }
          UNION {
            ?station a weo:WeatherStation ; rdfs:label ?stationName.
          }
      FILTER (?stationName IN (` + formattedStations + `))}
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 
  `
}

export function buildQuery_consecutiveDaysHighHum(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel, windSpeed) {
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

    SELECT ?stationName ?date1   WHERE {
      {?station a weo:WeatherStation ; rdfs:label ?stationName.
      
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
      
            FILTER (?humidity1 > ` + maxHum + `)
          }
          UNION{
            ?station a weo:WeatherStation ; rdfs:label ?stationName .
          }
      FILTER (?stationName IN (` + formattedStations + `))}
            
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 
  `
}

export function buildQuery_consecutiveDaysLowHum(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel, windSpeed) {
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

    SELECT ?stationName ?date1   WHERE {
      {?station a weo:WeatherStation ; rdfs:label ?stationName.
      
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
      
            FILTER (?humidity1 < ` + minHum + `)
          }
          UNION{
            ?station a weo:WeatherStation ; rdfs:label ?stationName .
          }
      FILTER (?stationName IN (` + formattedStations + `))}
            
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 
  `
}

export function buildQuery_consecutiveDaysDroughtWave(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel, windSpeed) {
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

    SELECT ?stationName ?date1   WHERE {
      {?station a weo:WeatherStation ; rdfs:label ?stationName.
      
            # The first slice in the sequence
            ?s1 a qb:Slice ;
                wes-dimension:station ?station ;
                wes-dimension:year ?year1 ;
                qb:observation [
                    a qb:Observation ;
                    wes-attribute:observationDate ?date1 ;
                    wes-measure:rainfall24h ?rainfall1
                ] .
      
            FILTER (?date1 >=xsd:date("`+ startDate +`"))
            FILTER (?date1 <=xsd:date("`+ endDate +`"))
            FILTER (?rainfall1 <= 0)}
            UNION
            {
                ?station a weo:WeatherStation ; rdfs:label ?stationName.
            }

      FILTER (?stationName IN (` + formattedStations + `))
    }
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 
  `
}

export function buildQuery_consecutiveDaysmaxConsDays(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel, windSpeed) {
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

    SELECT ?stationName ?date1   WHERE {
      {?station a weo:WeatherStation ; rdfs:label ?stationName.
      
            # The first slice in the sequence
            ?s1 a qb:Slice ;
                wes-dimension:station ?station ;
                wes-dimension:year ?year1 ;
                qb:observation [
                    a qb:Observation ;
                    wes-attribute:observationDate ?date1 ;
                    wes-measure:rainfall24h ?rainfall1 ;
                ] .
            FILTER (?date1 >=xsd:date("`+ startDate +`"))
            FILTER (?date1 <=xsd:date("`+ endDate +`"))
            BIND(?rainfall1 - 0 as ?deficit1)
            FILTER (?deficit1 <= ` + deficitLevel + `)
        }
        UNION
        {
            ?station a weo:WeatherStation ; rdfs:label ?stationName.
        }
      
      FILTER (?stationName IN (` + formattedStations + `))
    }
    GROUP BY ?stationName
    ORDER BY ?stationName ?date1 
  `
}

export function buildQuery_StatsPeriod(stationName,startDate,endDate,baseTemp,coldMin,heat,minTemp,maxTemp,minHum,maxHum,rainLevel,deficitLevel, windSpeed) {
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
    SELECT ?stationName (ROUND(AVG(?temp_min)*100)/100 AS ?meanmint) (ROUND(AVG(?temp_max)*100)/100 AS ?meanmaxt) 
    (ROUND(AVG(?temp_avg)*100)/100 AS ?meanavgt) (ROUND(AVG(?temp_diff)*100)/100 AS ?meanranget) 
     WHERE 
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
                   wes-measure:rainfall24h ?rain
               ] .
            ?station a weo:WeatherStation ;
                     rdfs:label ?stationName .
            FILTER (?stationName IN (` + formattedStations + `))
            FILTER (?date >= xsd:date("` + startDate + `"))
            FILTER (?date <= xsd:date("` + endDate + `"))
            BIND(IF(BOUND(?temp_min) && BOUND(?temp_max),ABS(xsd:double(?temp_max) - xsd:double(?temp_min)) ,0) as ?temp_diff)

        }
        GROUP BY ?stationName`
    }