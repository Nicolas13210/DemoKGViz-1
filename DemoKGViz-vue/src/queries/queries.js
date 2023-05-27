export function buildQuery_extractRDF(stationName, startDate, endDate) {
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dct:   <http://purl.org/dc/terms/> 

    CONSTRUCT 
    {
        ?uriDataset a qb:DataSet ; dct:issued ?issueDate ; 
        qb:slice ?uriSlice1 .
        ?uriSlice1  a qb:Slice; 
        wes-dimension:station ?station;
        wes-dimension:periodStartDate ?periodStartDate; 
        wes-dimension:periodEndDate ?periodEndDate; 
        qb:observation  [
            a qb:Observation ; qb:dataSet  ?uriDataset ;
            wes-attribute:observationDate ?date ; 
            wes-measure:minDailyTemperature ?temp_min ; 
            wes-measure:maxDailyTemperature ?temp_max ;
            wes-measure:rainfall24h ?rainfall;  
        ].

    } 
    WHERE {
        SELECT distinct ?issueDate ?uriDataset ?uriSlice1 ?station ?date ?periodStartDate ?periodEndDate ?temp_min  ?temp_max  ?rainfall ?gdd 
        WHERE
        {
            VALUES ?stationName {"` + stationName + `"}
            VALUES ?periodStartDate {"` + startDate + `"}
            VALUES ?periodEndDate {"` + endDate + `"}
            ?s  a qb:Slice ;
            wes-dimension:station ?station  ;
        
            wes-dimension:year ?year;
            qb:observation [
                a qb:Observation ;
                wes-attribute:observationDate ?date ;
                wes-measure:minDailyTemperature ?temp_min; 
                wes-measure:maxDailyTemperature ?temp_max; 
                wes-measure:rainfall24h ?rainfall ].
                
            ?station a weo:WeatherStation ; rdfs:label ?stationName; weo:stationID ?stationID .
           
            BIND(xsd:date(NOW()) AS ?issueDate)
            FILTER (?date >=xsd:date(?periodStartDate))
            FILTER (?date <=xsd:date(?periodEndDate))
            BIND(URI(CONCAT("http://ns.inria.fr/meteo/observationslice/",?periodStartDate, "_", ?periodEndDate, "/slice_",str(?stationID ))) as ?uriSlice1  )
            BIND(URI(CONCAT("http://ns.inria.fr/meteo/dataset/",?periodStartDate, "_", ?periodEndDate, "/dataset_",str(?stationID ))) as ?uriDataset  )
        }
        ORDER BY ?date
    }
    `;
}

export function buildQuery_extractData(stationName, startDate, endDate) {
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dct:   <http://purl.org/dc/terms/> 

    SELECT distinct ?stationName ?date  ?temp_avg ?temp_min  ?temp_max (?temp_max -  ?temp_min) as ?tdiff  ?rainfall ?gdd
    WHERE
    {
        VALUES ?stationName {"` + stationName + `"}
        VALUES ?periodStartDate {"` + startDate + `"}
        VALUES ?periodEndDate {"` + endDate + `"}
        ?s  a qb:Slice ;
        wes-dimension:station ?station  ;
    
        wes-dimension:year ?year;
        qb:observation [
        a qb:Observation ;
        wes-attribute:observationDate ?date ;
        wes-measure:minDailyTemperature ?temp_min; 
        wes-measure:maxDailyTemperature ?temp_max; 
        wes-measure:avgDailyTemperature ?temp_avg; 
        wes-measure:rainfall24h ?rainfall]  .

        ?station a weo:WeatherStation ; rdfs:label ?stationName; weo:stationID ?stationID .
        BIND( IF( xsd:float(?temp_avg) > 10.0 , xsd:float(?temp_avg) - 10.0, xsd:float(1))  as ?gdd)
        FILTER (?date >=xsd:date(?periodStartDate))
        FILTER (?date <=xsd:date(?periodEndDate))
    }
    ORDER BY ?date
    `;
}

export function buildQuery_station() {
    return `
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX geosparql:  <http://www.opengis.net/ont/geosparql#> 
    SELECT distinct * WHERE {
        ?station rdfs:label ?stationName;  geo:lat ?lat; geo:long ?long .
    }
    `
}

export function buildQuery_tmpRainStation(stationName, startDate, endDate) {
    console.log("Fetching tmpRainStation " + stationName + " between " + startDate + " and " + endDate)
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
 PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
 PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    
    SELECT distinct ?stationName ?date  ?temp_avg ?temp_min  ?temp_max (?temp_max -  ?temp_min) as ?temp_diff ?rainfall
   WHERE
    {
        VALUES ?stationName {` + stationName + `}
        ?s  a qb:Slice ;
        wes-dimension:station ?station  ;
    
        wes-dimension:year ?year;
        qb:observation [
        a qb:Observation ;
        wes-attribute:observationDate ?date ;
        wes-measure:minDailyTemperature ?temp_min; 
        wes-measure:maxDailyTemperature ?temp_max; 
        wes-measure:avgDailyTemperature ?temp_avg; 

        wes-measure:rainfall24h ?r]  .
        ?station a weo:WeatherStation ; rdfs:label ?stationName.
        BIND( IF( ?r > 0 , ?r, 0)  as ?rainfall)
        FILTER (?date >=xsd:date("` + startDate + `"))
        FILTER (?date <=xsd:date("` + endDate + `"))
           }
        ORDER BY ?date
    `
}


export function buildQuery_nbStatsDaysStation(stationName, startDate, endDate) {
    console.log("Fetching nbStatsDaysStation " + stationName + " between " + startDate + " and " + endDate)
    const formattedStations = stationName.replace(/ /g, ",")
    return `
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX sosa: <http://www.w3.org/ns/sosa/>
    PREFIX wep: <http://ns.inria.fr/meteo/ontology/property/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX wevp: <http://ns.inria.fr/meteo/vocab/weatherproperty/> 
    
       SELECT
       ?stationName
       (sum(if(?temp_min<0.0, 1, 0)) as ?nbFrostDays) 
       (sum(if(?rainfall>0.0, 1, 0)) as ?nbRainyDays) 
       (sum(if(?temp_min>20.0, 1, 0)) as ?nbHeatDays) 
       (sum(if(?temp_max>20.0, 1, 0)) as ?nbSummerDays)  
       (sum(if(?humidity>60, 1, 0)) as ?nbwetDays)  
       (sum(if(?windSpeed>5.28, 1, 0)) as ?nbWindyDays)  WHERE
        {
            {
            
            ?s  a qb:Slice ;
            wes-dimension:station ?station  ;
        
            wes-dimension:year ?year;
            qb:observation [
            a qb:Observation ;
            wes-attribute:observationDate ?date ;
            wes-measure:minDailyTemperature ?temp_min; 
            wes-measure:maxDailyTemperature ?temp_max; 
            wes-measure:avgDailyTemperature ?temp_avg; 
            wes-measure:rainfall24h ?rainfall] .
            ?station a weo:WeatherStation ; rdfs:label ?stationName.
            FILTER (?stationName IN (` + formattedStations + `))
            FILTER (?date >=xsd:date("2021-01-01" ))
            FILTER (?date <=xsd:date("2021-01-31" ))
          }
          UNION 
        {
          SELECT (AVG(?humidityR) as ?humidity) ?date ?stationName WHERE {
           ?obs a weo:MeteorologicalObservation;
           sosa:observedProperty wevp:airRelativeHumidity;
           sosa:hasSimpleResult ?humidityR;
           sosa:resultTime ?datetime;
           wep:madeByStation ?station. 
           ?station a weo:WeatherStation ; rdfs:label ?stationName.
          BIND (xsd:date(SUBSTR(STR(?datetime), 1,10)) as ?date)
          FILTER (?stationName IN (` + formattedStations + `))
          FILTER (?date >=xsd:date("2021-01-01"))
          FILTER (?date <=xsd:date("2021-01-31"))
         }
         GROUP BY ?stationName ?date
         } 
       UNION 
        {
          SELECT (AVG(?windSpeedD) as ?windSpeed) ?date ?stationName WHERE {
           ?obs a weo:MeteorologicalObservation;
           sosa:observedProperty wevp:windAverageSpeed;
           sosa:hasSimpleResult ?windSpeedD;
           sosa:resultTime ?datetime;
           wep:madeByStation ?station. 
           ?station a weo:WeatherStation ; rdfs:label ?stationName.
          BIND (xsd:date(SUBSTR(STR(?datetime), 1,10)) as ?date)
          FILTER (?stationName IN (` + formattedStations + `))
          FILTER (?date >=xsd:date("2021-01-01" ))
          FILTER (?date <=xsd:date("2021-01-31"))
         }
        GROUP BY ?stationName ?date
        }
       FILTER (?stationName IN (` + formattedStations + `))
      }
      GROUP BY ?stationName
        `
}

export function buildQuery_GddDaysStation(stationName, startDate, endDate) {
    console.log("Fetching GddDaysStation " + stationName + " between " + startDate + " and " + endDate)
    return `
    PREFIX wes: <http://ns.inria.fr/meteo/observationslice/>
    PREFIX weo: <http://ns.inria.fr/meteo/ontology/>
    PREFIX qb:  <http://purl.org/linked-data/cube#>
    PREFIX wes-dimension: <http://ns.inria.fr/meteo/observationslice/dimension#>
    PREFIX wes-measure: <http://ns.inria.fr/meteo/observationslice/measure#>
    PREFIX wes-attribute: <http://ns.inria.fr/meteo/observationslice/attribute#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    
    SELECT distinct  ?stationName ?date  ?gdd ?rainfall WHERE
    {
        VALUES ?stationName {"`+ stationName +`"}
        ?s  a qb:Slice ;
        wes-dimension:station ?station  ;
    
        wes-dimension:year ?year;
        qb:observation [
        a qb:Observation ;
        wes-attribute:observationDate ?date ;
        wes-measure:avgDailyTemperature ?temp_avg;
        wes-measure:rainfall24h ?r] .
        ?station a weo:WeatherStation ; rdfs:label ?stationName.
        BIND( IF( ?r > 0 , ?r, 0)  as ?rainfall)
        BIND( IF( ?temp_avg > 10 , ?temp_avg - 10, 0)  as ?gdd)
        FILTER (?date >=xsd:date("`+ startDate +`"))
        FILTER (?date <=xsd:date("`+ endDate +`"))
    }
    ORDER BY ?date
    `
}
