<script>
import {buildQuery_exportDailyData} from '@/queries/queries';
import axios from "axios";

export default {
    name: "ExportResult",
    methods: {
        downloadFile(content, fileName, fileType) {
            // Create a Blob object from the content with the specified file type
            const blob = new Blob([content], {type: fileType});

            // Create a URL for the blob object
            const url = URL.createObjectURL(blob);

            // Create an <a> element for the download
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;

            // Simulate a click on the link to trigger the download
            link.click();

            // Clean up the object URL after the download
            URL.revokeObjectURL(url);
        },
        async downloadData(extension, extensionType) {
            try {
                // TODO: call the endpoint to get period data.
                const dailyRequest = axios.post("/sparql", {
                    format: extension,
                    query: buildQuery_exportDailyData(this.$store.getters.getSelectedStationsJoin, this.$store.getters.getStartDate, this.$store.getters.getEndDate)
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                const [responseDaily] = await Promise.all([dailyRequest]);
                this.downloadFile(
                  (extensionType === 'json') ? JSON.stringify(responseDaily.data) : responseDaily.data,
                  "daily." + extensionType,
                  "text/plain");
            } catch (error) {
                console.error("An error occurred while retrieving data to download a file", error);
            }

        }
    },
    computed: {
        getStationsLength() {
            return this.$store.getters.getSelectedStations.length;
        }
    }
}

</script>

<template>
    <div v-if="getStationsLength === 0">
        <v-alert type="info" title="Information" text="Please select at least one station to export any data."
                 variant="tonal"></v-alert>
    </div>
    <div id="export">
        <div class="groupExport">
            <v-btn class="export" variant="outlined" :disabled="getStationsLength === 0">
                <img class="export" src="../../img/rdf_logo.png" alt="export">
            </v-btn>

            <v-btn class="export" variant="outlined" :disabled="getStationsLength === 0"
                   @click="downloadData('application/sparql-results+json', 'json')">
                <img class="export" src="../../img/json_logo.png" alt="export">
            </v-btn>

            <v-btn class="export" variant="outlined" :disabled="getStationsLength === 0" @click="downloadData('text/csv', 'csv')">
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
    margin: 0 3em;
}

div.groupExport {
    /* Centrer les boutons au center de la page */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}

img.export {
    width: 75px;
    height: 75px;
    margin: auto;
    display: block;
}
</style>
