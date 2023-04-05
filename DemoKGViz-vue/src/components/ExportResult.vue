<script>
import {buildQuery_extractRDF, buildQuery_extractData} from '@/queries/queries';

export default {
    name: "ExportResult",
    methods: {
        createFileRDF(stationName, startDate, endDate) {
            console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate)
            this.$store.state.endpoint.queryTurtle(buildQuery_extractRDF(stationName, startDate, endDate)).done((turtle) => {
                this.downloadFileRDF(turtle);
            });
        },
        downloadFileRDF(text) {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'export.txt');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
        createFileJSON(stationName, startDate, endDate) {
            console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate)
            this.$store.state.endpoint.query(buildQuery_extractData(stationName, startDate, endDate)).done((json) => {
                json = JSON.stringify(json, null, 2);
                this.downloadFileJSON(json);
            });
        },
        downloadFileJSON(text) {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'export.json');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
        createFileCSV(stationName, startDate, endDate) {
            console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate)
            this.$store.state.endpoint.queryCSV(buildQuery_extractData(stationName, startDate, endDate)).done((csv) => {
                console.log(csv);
                this.downloadFileCSV(csv);
            });
        },
        downloadFileCSV(text) {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'export.csv');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }
    }
}

</script>

<template>
    <div id="export">
        <h2 id="period-select">Export</h2>
        <div class="groupExport">
            <button class="export" id="RDF" v-on:click="createFileRDF(textStation, startDate, endDate)">
                <img class="export" src="../img/rdf_logo.png" alt="export">
            </button>

            <button class="export" id="JSON" v-on:click="createFileJSON(textStation, startDate, endDate)">
                <img class="export" src="../img/json_logo.png" alt="export">
            </button>

            <button class="export" id="CSV" v-on:click="createFileCSV(textStation, startDate, endDate)">
                <img class="export" src="../img/csv_logo.png" alt="export">
            </button>
        </div>
    </div>
</template>

<style scoped>
h2 {
    text-align: center;
    padding: 25px;
    margin-bottom: 0;
    background-color: lightblue;
    border-radius: 15px;
}

div#export {
    border: black solid 1px;
    margin-top: 20px;
    border-radius: 15px;
}

button.export {
    width: 100px;
    height: 100px;
    display: inline-block;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: black solid 1px;
    cursor: pointer;
    background-color: white;
}

div.groupExport {
    /* Centrer les boutons au center de la page */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}

button.export#JSON {
    margin: 0 100px;
}

img.export {
    width: 75px;
    height: 75px;
    margin: auto;
    display: block;
}
</style>
