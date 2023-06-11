export function getRequestHumidityConditionsData(stationName, startDate, endDate) {
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
    (SUM(IF(?daily_airhumidity > 60.0, 1, 0)) AS ?wetdays)
   (SUM(IF(?daily_airhumidity < 40.0, 1, 0)) AS ?drydays) WHERE
{

SELECT distinct ?stationName ?date (avg(?humidity) as ?daily_airhumidity)
  
    WHERE
       {
       VALUES ?stationName {` + stationName + `}
       VALUES ?startDate {"` + startDate + `"}
       VALUES ?endDate {"` + endDate + `"}
       ?obs a weo:MeteorologicalObservation;
        sosa:observedProperty wevp:airRelativeHumidity;
        sosa:hasSimpleResult ?humidity;
        sosa:resultTime ?datetime;
        wep:madeByStation ?station. 
        BIND (xsd:date(SUBSTR(STR(?datetime), 1,10)) as ?date)
       
FILTER (xsd:date(?date)>= xsd:date(?startDate))
FILTER (xsd:date(?date) <= xsd:date(?endDate))
    }
GROUP BY ?stationName ?date
ORDER BY ?date
}
GROUP BY ?stationName
    `;
}
