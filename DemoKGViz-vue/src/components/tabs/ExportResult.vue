<script>
import {buildQuery_extractData, buildQuery_extractRDF} from '@/queries/queries';

export default {
    name: "ExportResult",
    methods: {
        getDateFormat(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return year + "-" + this.numberFormatString(month) + "-" + this.numberFormatString(day);
        },
        numberFormatString(number) {
            if (number >= 1 && number <= 9) {
                return '0' + number;
            }
            return number;
        },
        createFileRDF(stationName) {
            const startDate = this.getDateFormat(this.$store.getters.getStartDate);
            const endDate = this.getDateFormat(this.$store.getters.getEndDate);
            console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate)
            this.$store.getters.getEndpoint.queryTurtle(buildQuery_extractRDF(stationName, startDate, endDate)).then((turtle) => {
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
        createFileJSON(stationName) {
            const startDate = this.getDateFormat(this.$store.getters.getStartDate);
            const endDate = this.getDateFormat(this.$store.getters.getEndDate);
            console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate)
            this.$store.getters.getEndpoint.query(buildQuery_extractData(stationName, startDate, endDate)).then((json) => {
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
        createFileCSV(stationName) {
            const startDate = this.getDateFormat(this.$store.getters.getStartDate);
            const endDate = this.getDateFormat(this.$store.getters.getEndDate);
            console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate)
            this.$store.getters.getEndpoint.queryCSV(buildQuery_extractData(stationName, startDate, endDate)).then((csv) => {
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
        <div class="groupExport">
            <v-btn class="export" variant="outlined" id="RDF" @click="createFileRDF(textStation)">
                <img class="export" src="../../img/rdf_logo.png" alt="export">
            </v-btn>

            <v-btn class="export" variant="outlined" id="JSON" @click="createFileJSON(textStation)">
                <img class="export" src="../../img/json_logo.png" alt="export">
            </v-btn>

            <v-btn class="export" variant="outlined" id="CSV" @click="createFileCSV(textStation)">
                <img class="export" src="../../img/csv_logo.png" alt="export">
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
div#export {
    margin-top: 20px;
}

button.export {
    width: 100px;
    height: 100px;
    border-radius: 15px;
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
