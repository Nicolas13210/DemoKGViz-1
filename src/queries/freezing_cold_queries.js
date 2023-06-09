export function getRequestFreezingColdData(stationName, startDate, endDate) {
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
PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
PREFIX wevp: <http://ns.inria.fr/meteo/vocab/weatherproperty/>
SELECT ?stationName
             ?startDate
           ?endDate
          ?PeriodInDays
           ?nbDaysTemp5
            ?nbfrostDaysTmin
            ?nbfrostDaysTavg
            ?nbDaysextremeTemp10
            ?nbDaysextremeTemp4
            ?vernalizationDays
         #((?vernalizationDays/?PeriodInDays)/(3600*24) as ?frequencyVernalisationDays)
{
SELECT ?stationName
    (SUM(IF(?temp_min < -5.0, 1, 0)) AS ?nbDaysTemp5)
    (SUM(IF(?temp_min < 0.0, 1, 0)) AS ?nbfrostDaysTmin)
    (SUM(IF(?temp_avg < 0.0, 1, 0)) AS ?nbfrostDaysTavg)
    (SUM(IF(?temp_min < -10.0, 1, 0)) AS ?nbDaysextremeTemp10)
    (SUM(IF(?temp_min < -4.0, 1, 0)) AS ?nbDaysextremeTemp4)
    (SUM(IF(?temp_avg > 3.0 && ?temp_avg <10.0 , 1, 0)) AS ?vernalizationDays)
    ?startDate
    ?endDate
    ?PeriodInDays
WHERE
{
        VALUES ?startDate { "` + startDate + `"}
        VALUES ?endDate { "` + endDate + `"}
        VALUES  ?stationName {` + stationName + `}
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
        FILTER (?date >= xsd:date(?startDate))
        FILTER (?date <= xsd:date(?endDate))
        BIND((xsd:date(?endDate) - xsd:date(?startDate))/(3600*24)+1 AS ?PeriodInDays).
}
GROUP BY ?stationName  ?startDate ?endDate ?PeriodInDays
}
    `;
}
