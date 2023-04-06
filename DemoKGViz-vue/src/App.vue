<script>
import MeteorologicalParameter from "@/components/MeteorologicalParameter.vue";
import TabsBar from "@/components/TabsBar.vue";


export default {
  name: "App",
  components: {
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
        <v-app-bar title="WeKG-MF-based Agrometeorological Parameters Computing and Visualisation"></v-app-bar>
        <v-navigation-drawer>
          <!--TODO-->
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
  padding: 0 30px 30px 30px;
}
</style>
