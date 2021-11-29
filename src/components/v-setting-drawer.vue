<template>
  <v-navigation-drawer v-model="drawer" absolute right temporary width="300">
    <!-- 设置顶栏 -->
    <v-toolbar flat>
      <div class="text-h6">{{ $t("setting") }}</div>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-container class="pa-3">
      <!-- 设置主题 -->
      <strong class="px-1">{{ $t("theme") }}</strong>
      <v-item-group v-model="mode">
        <v-row no-gutters>
          <!-- 浅色模式 -->
          <v-col class="pa-1">
            <v-item v-slot="{ active, toggle }">
              <v-btn
                block
                rounded-md
                large
                depressed
                @click="
                  light();
                  toggle();
                "
                value="light"
                :color="active ? 'primary' : ''"
              >
                {{ $t("light-mode") }}
                <v-icon right>mdi-white-balance-sunny</v-icon>
              </v-btn>
            </v-item>
          </v-col>
          <!-- 暗黑模式 -->
          <v-col class="pa-1">
            <v-item v-slot="{ active, toggle }">
              <v-btn
                block
                depressed
                rounded-md
                large
                @click="
                  dark();
                  toggle();
                "
                value="dark"
                :color="active ? 'primary' : ''"
              >
                {{ $t("dark-mode") }}
                <v-icon right>mdi-weather-night</v-icon>
              </v-btn>
            </v-item>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <!-- 跟随系统 -->
          <v-col class="pa-1">
            <v-item v-slot="{ active, toggle }">
              <v-btn
                block
                rounded-md
                large
                depressed
                @click="
                  system();
                  toggle();
                "
                value="system"
                :color="active ? 'primary' : ''"
              >
                {{ $t("system-mode") }}
                <v-icon right>mdi-desktop-tower-monitor</v-icon>
              </v-btn>
            </v-item>
          </v-col>
          <!-- 混合模式 -->
          <v-col class="pa-1">
            <v-item v-slot="{ active, toggle }">
              <v-btn
                block
                depressed
                rounded-md
                large
                @click="
                  mixed();
                  toggle();
                "
                value="mixed"
                :color="active ? 'primary' : ''"
              >
                {{ $t("mixed-mode") }}
                <v-icon right>mdi-theme-light-dark</v-icon>
              </v-btn>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "setting-drawer",
  data: () => {
    return {
      drawer: false, // 默认关闭设置抽屉
      mode: null,
    };
  },
  computed: {},
  methods: {
    drawerHandle(e) {
      this.drawer = e;
    },
    close() {
      // 关闭设置栏
      this.drawer = false;
    },
    light() {
      // 浅色主题
      this.$vuetify.theme.dark = false;
      localStorage.setItem("theme", "light");
    },
    dark() {
      // 暗色主题
      this.$vuetify.theme.dark = true;
      localStorage.setItem("theme", "dark");
    },
    system() {
      // 跟随系统
    },
    mixed() {
      // 混合模式
    },
  },
  mounted() {
    // 绑定打开设置栏事件
    this.$bus.$on("open", this.drawerHandle);
    // 设置主题
    let t = localStorage.getItem("theme");
    this.mode = t || "light"; // 获取主题模式, 默认亮色模式
    if (t === "light") {
      this.$vuetify.theme.dark = false;
    } else if (t === "dark") {
      this.$vuetify.theme.dark = true;
    }
  },
  beforeDestroy() {
    // 解绑设置栏事件
    this.$bus.off("open");
  },
};
</script>