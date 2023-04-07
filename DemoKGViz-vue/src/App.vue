<script>
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import TabsBar from "@/components/TabsBar.vue";
import SideBar from "@/components/sideBar/SideBar.vue";


export default {
    name: "App",
    components: {
        SideBar,
        TabsBar,
        MeteorologicalParameter,
    },
    created() {
        this.$store.dispatch("setStationsApi");
    },
}
</script>

<template>
    <div class="app">
        <v-card>
            <v-layout>
                <v-app-bar title="WeKG-MF-based Agrometeorological Parameters Computing and Visualisation"
                           color="primary"></v-app-bar>
                <v-navigation-drawer>
                    <SideBar></SideBar>
                </v-navigation-drawer>
                <v-main style="min-height: 300px;">
                    <TabsBar></TabsBar>
                </v-main>
            </v-layout>
        </v-card>
    </div>
</template>

// global styles
<style>
body {
    margin: 0;
    padding: 0;
}
</style>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
}
</style>
