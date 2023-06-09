export function getRequestHeatData(stationName, startDate, endDate) {
    return `
"PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
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

SELECT ?stationName ?startDate ?endDate 
    (SUM(IF(?temp_max > 20.0, 1, 0)) AS ?xhsdaysmax20)
    (SUM(IF(?temp_max > 25.0, 1, 0)) AS ?xhsdaysmax25)
    (SUM(IF(?temp_avg > 15.0, 1, 0)) AS ?hsdaysmean15)
    (SUM(IF(?temp_avg < 7.0, 1, 0)) AS ?daysmean7)
    (SUM(IF(?temp_avg > 25.0, 1, 0)) AS ?xhsdaysmean25)
    (SUM(IF((?temp_min+?temp_max)/2 > 0.0, (?temp_min+?temp_max)/2, 0.0)) AS ?SumGDD)
    
WHERE
{
        VALUES  ?stationName {` + stationName + `}
        VALUES ?startDate {"` + startDate + `}
        VALUES ?endDate {"` + endDate + `"}
        ?s a qb:Slice ;
           wes-dimension:station ?station ;
           wes-dimension:year ?year ;
           qb:observation [
               a qb:Observation ;
               wes-attribute:observationDate ?date ;
               wes-measure:minDailyTemperature ?temp_min ;
               wes-measure:maxDailyTemperature ?temp_max ;
               wes-measure:avgDailyTemperature ?temp_avg ;
           ] .
        ?station a weo:WeatherStation ;
                 rdfs:label ?stationName .
        FILTER (?date >= xsd:date(?startDate))
        FILTER (?date <= xsd:date(?endDate))
  }
GROUP BY ?stationName  ?startDate ?endDate
    `;
}
