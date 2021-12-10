<template>
  <v-app>
    <nav-bar />
    <!-- 设置抽屉 -->
    <setting-drawer />
    <v-main>
      <v-row no-gutters>
        <v-col md="3" sm="12" class="px-2"><v-now /></v-col>
        <v-col md="7" sm="12">
          <v-row no-gutters class="pa-1">
            <v-col md="8" class="px-1">
              <v-aqi-panel />
            </v-col>
            <v-col md="4" class="px-1">
              <v-sun-moon />
            </v-col>
          </v-row>
        </v-col>
        <v-col md="2" xs="12"></v-col>
      </v-row>
    </v-main>
  </v-app>
</template>


<script>
import VSunMoon from "./components/v-sun-moon.vue";
import VAqiPanel from "./components/v-aqi-panel.vue";
import vNow from "./components/v-now.vue";
import navBar from "./components/v-nav-bar.vue";
import settingDrawer from "./components/v-setting-drawer.vue";

export default {
  name: "App",
  components: { navBar, settingDrawer, vNow, VAqiPanel, VSunMoon },
  mounted() {},
};
</script>
