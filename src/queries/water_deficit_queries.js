export function getRequestWaterDeficitData(stationName, startDate, endDate) {
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

SELECT ?stationName
    (SUM(IF(?rainfall > 0.0, 1, 0)) AS ?raidays)
    (SUM(IF(?rainfall > 15.0, 1, 0)) AS ?hraidays15)
    (SUM(IF(?rainfall > 20.0, 1, 0)) AS ?hraidays20)
   (SUM(IF(?rainfall > 30.0, 1, 0)) AS ?hraidays30)
    
WHERE
{
        VALUES ?stationName {` + stationName + `}
        VALUES ?startDate {"` + startDate + `"}
        VALUES ?endDate {"` + endDate + `"}
        ?s a qb:Slice ;
           wes-dimension:station ?station ;
           wes-dimension:year ?year ;
           qb:observation [
               a qb:Observation ;
               wes-attribute:observationDate ?date ;
               wes-measure:rainfall24h ?rainfall
           ] .
        ?station a weo:WeatherStation ; rdfs:label ?stationName .
       
        FILTER (?date >= xsd:date(?startDate))
        FILTER (?date <= xsd:date(?endDate))
        
}
GROUP BY ?stationName
    `;
}
