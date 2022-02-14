<template>
  <v-navigation-drawer v-model="drawer" fixed right temporary width="300">
    <!-- 设置顶栏 -->
    <v-toolbar flat>
      <v-toolbar-title class="text-h6">{{ $t("setting") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeDrawer">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider />

    <v-container class="pa-3">
      <!-- 主题(标题) -->
      <div class="font-weight-bold text-caption pa-1">
        {{ $t("theme.theme") }}
      </div>
      <!-- 设置主题按钮 -->
      <v-item-group v-model="selected" @change="changeTheme">
        <v-row no-gutters>
          <v-col
            v-for="item in mode"
            :key="item.mode"
            class="pa-1"
            cols="12"
            md="6"
            lg="6"
            xl="6"
          >
            <v-item v-slot="{ active, toggle }" :value="item.mode">
              <v-btn
                block
                rounded-md
                large
                depressed
                @click="toggle"
                :color="active ? 'primary' : ''"
              >
                {{ $t(`theme.${item.mode}`) }}
                <v-icon right>{{ item.icon }}</v-icon>
              </v-btn>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>

    <p class="text-center">© {{ new Date().getFullYear() }} — Arcturus</p>
  </v-navigation-drawer>
</template>
<script>
import { common } from "@/mixin";

export default {
  name: "setting-drawer",
  data: () => ({
    selected: null,
    mode: [
      {
        // 亮色模式
        mode: "lightMode",
        icon: "mdi-white-balance-sunny",
      },
      {
        // 暗黑模式
        mode: "darkMode",
        icon: "mdi-weather-night",
      },
      {
        // 跟随系统
        mode: "followSystem",
        icon: "mdi-desktop-tower-monitor",
      },
      {
        // 自动模式
        mode: "auto",
        icon: "mdi-theme-light-dark",
      },
    ],
  }),
  mixins: [common],
  methods: {
    changeTheme(value) {
      this.setTheme(value);
      localStorage.setItem("theme", value);
    },
    closeDrawer() {
      // 关闭设置栏
      this.$store.commit("openDrawer", false);
    },
  },
  computed: {
    drawer: {
      // 读取设置栏开启/关闭状态
      get() {
        return this.$store.state.drawer;
      },
      set(status) {
        this.$store.commit("openDrawer", status);
      },
    },
  },
  mounted() {
    let theme = localStorage.getItem("theme") || "lightMode";
    this.selected = theme;
  },
};
</script>