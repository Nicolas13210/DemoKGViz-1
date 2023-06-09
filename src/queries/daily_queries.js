export function getRequestDailyData(stationName, startDate, endDate) {
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
    (avg(?v)-273.15 as ?daily_temp_mean)
    (avg(?humidity) as ?daily_airhumidity)
    (SAMPLE(?GDD) as ?daily_gdd)
    (SAMPLE(?amplitude) as ?daily_thermal_ampl)
   
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
        wes-measure:maxDailyTemperature ?temp_max; 
        wes-measure:rainfall24h ?r ].
        BIND(IF(?r > 0.0, ?r, 0.0) AS ?rainfall)
        BIND(IF((?temp_min+?temp_max)/2 > 0.0, (?temp_min+?temp_max)/2.0, 0.0) AS ?GDD)
        BIND(?temp_max - ?temp_min as ?amplitude)
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
    UNION
    {
       ?obs a weo:MeteorologicalObservation;
        sosa:observedProperty wevp:airRelativeHumidity;
        sosa:hasSimpleResult ?humidity;
        sosa:resultTime ?datetime;
        wep:madeByStation ?station. 
        BIND (xsd:date(SUBSTR(STR(?datetime), 1,10)) as ?date)  
    }

    FILTER (xsd:date(?date)>= xsd:date(?startDate))
    FILTER (xsd:date(?date) <= xsd:date(?endDate))
    }
GROUP BY ?stationName ?date
ORDER BY ?date
    `;
}
