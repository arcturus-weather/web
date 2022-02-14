<template>
  <!-- 导航栏 -->
  <v-app-bar flat app dense>
    <v-toolbar-title>{{ $t("appName") }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- 设置按钮 -->
    <v-btn icon class="mx-1" @click="openDrawer" small color="primary">
      <v-icon small>mdi-cog-outline</v-icon>
    </v-btn>

    <!-- 切换语言 -->
    <v-menu bottom offset-y transition="scroll-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" small color="primary">
          <v-icon small>mdi-translate</v-icon>
          <v-icon small>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list dense class="pa-1">
          <v-subheader class="font-weight-bold">{{ $t("translate") }}</v-subheader>
          <v-list-item-group v-model="$i18n.locale">
            <v-list-item
              @click="changeLanguage(item)"
              v-for="item in languages"
              :key="item.value"
              :value="item.value"
              class="px-2 my-1"
            >
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "nav-bar",
  data: () => ({}),
  computed: {
    languages() {
      // 获取定义的语言列表
      let messages = this.$i18n.messages;
      // 重新组合成新列表
      return Object.keys(messages).map((el) => {
        return {
          value: el,
          text: messages[el].label,
        };
      });
    },
  },
  methods: {
    changeLanguage(e) {
      // 修改当前语言并存入缓存
      this.$i18n.locale = e.value;
      localStorage.setItem("locale", e.value);
    },
    openDrawer() {
      // 打开设置栏
      this.$store.commit("openDrawer", true);
    },
  },
};
</script>