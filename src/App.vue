<template>
  <v-app>
    <nav-bar />
    <!-- 设置抽屉 -->
    <setting-drawer />
  </v-app>
  
</template>


<script>
import navBar from "./components/v-nav-bar.vue";
import settingDrawer from "./components/v-setting-drawer.vue";

export default {
  name: "App",
  components: { navBar, settingDrawer },
};
</script>
