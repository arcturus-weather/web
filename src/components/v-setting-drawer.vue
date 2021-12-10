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
      <v-item-group v-model="selected" @change="changeTheme">
        <v-row no-gutters>
          <v-col
            v-for="item in mode"
            :key="item.mode"
            cols="12"
            md="6"
            class="pa-1"
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
                {{ $t(item.mode) }}
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
export default {
  name: "setting-drawer",
  data: () => {
    return {
      drawer: false, // 默认关闭设置抽屉
      selected: null,
      mode: [
        {
          // 亮色模式
          mode: "light-mode",
          icon: "mdi-white-balance-sunny",
        },
        {
          // 暗黑模式
          mode: "dark-mode",
          icon: "mdi-weather-night",
        },
        {
          // 跟随系统
          mode: "system-mode",
          icon: "mdi-desktop-tower-monitor",
        },
        {
          // 混合模式
          mode: "mixed-mode",
          icon: "mdi-theme-light-dark",
        },
      ],
    };
  },
  methods: {
    changeTheme(value) {
      if (value === "light-mode") {
        // 浅色主题
        this.$vuetify.theme.dark = false;
        localStorage.setItem("theme", "light-mode");
      } else if (value === "dark-mode") {
        // 暗色主题
        this.$vuetify.theme.dark = true;
        localStorage.setItem("theme", "dark-mode");
      } else if (value === "system-mode") {
        // 跟随系统
      } else if (value === "mixed-mode") {
        // 混合模式
      }
    },
    drawerHandle(e) {
      this.drawer = e;
    },
    close() {
      // 关闭设置栏
      this.drawer = false;
    },
  },
  mounted() {
    // 绑定打开设置栏事件
    this.$bus.$on("open", this.drawerHandle);
    // 设置主题
    let t = localStorage.getItem("theme");
    this.selected = t || "light-mode"; // 获取主题模式, 默认亮色模式
    if (t === "light-mode") {
      this.$vuetify.theme.dark = false;
    } else if (t === "dark-mode") {
      this.$vuetify.theme.dark = true;
    }
  },
  beforeDestroy() {
    // 解绑设置栏事件
    this.$bus.off("open");
  },
};
</script>