export function getRequestHeatData(stationName, startDate, endDate) {
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
    (SUM(IF(?daily_temp_max > 20.0, 1, 0)) AS ?xhsdaysmax20)
    (SUM(IF(?daily_temp_max > 25.0, 1, 0)) AS ?xhsdaysmax25)
    (SUM(IF(?daily_tempAVG > 15.0, 1, 0)) AS ?hsdaysmean15)
    (SUM(IF(?daily_tempAVG < 7.0, 1, 0)) AS ?daysmean7)
    (SUM(IF(?daily_tempAVG > 25.0, 1, 0)) AS ?xhsdaysmean25)
    (SUM(IF((?daily_temp_min+?daily_temp_max)/2 > 0.0, (?daily_temp_min+?daily_temp_max)/2, 0.0)) AS ?SumGDD)
WHERE {
SELECT distinct ?stationName ?date  
    (SAMPLE(?temp_min) as ?daily_temp_min)
    (SAMPLE(?temp_max) as ?daily_temp_max)
    (avg(?v)-273.15 as ?daily_tempAVG)
    WHERE
    {
        VALUES ?stationName {` + stationName + `}
        VALUES ?startDate {"` + startDate + `"}
        VALUES ?endDate {"` + endDate + `"}
        ?station a weo:WeatherStation ; rdfs:label ?stationName; weo:stationID ?stationID .
    {
       
        ?s  a qb:Slice ;
        wes-dimension:station ?station;
        wes-dimension:year ?year;
        qb:observation [
        a qb:Observation ;
        wes-attribute:observationDate ?date ;
        wes-measure:minDailyTemperature ?temp_min;
        wes-measure:maxDailyTemperature ?temp_max
     ].

    }
      UNION
    {
       
       ?obs a weo:MeteorologicalObservation;
        sosa:observedProperty wevp:airTemperature;
        sosa:hasSimpleResult ?v;
        sosa:resultTime ?datetime;
        wep:madeByStation ?station. 
      
        BIND (xsd:date(SUBSTR(STR(?datetime), 1,10)) as ?date)

       
    }
FILTER (xsd:date(?date)>= xsd:date(?startDate))
FILTER (xsd:date(?date) <= xsd:date(?endDate))

    }
GROUP BY ?stationName ?date
ORDER BY ?date
}
GROUP BY ?stationName
    `;
}
