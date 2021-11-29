<template>
  <!-- 导航栏 -->
  <v-app-bar flat app>
    <v-toolbar-title>{{ $t("appName") }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- 搜索框 -->
    <div style="max-width: 15em">
      <v-text-field
        class="shrink rounded-lg"
        :placeholder="search"
        clearable
        rounded
        filled
        hide-details
        dense
      >
        <v-icon slot="prepend-inner" class="mx-1">mdi-magnify</v-icon>
      </v-text-field>
    </div>

    <!-- 设置按钮 -->
    <v-btn icon class="mx-1" @click="setting">
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>

    <!-- 切换语言 -->
    <v-menu
      bottom
      offset-y
      open-on-hover
      transition="scroll-y-transition"
      class="mx-1"
    >
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon>mdi-translate</v-icon>
          <v-icon small>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-group v-model="$i18n.locale" class="pa-2">
          <strong class="v-list-item">{{ $t("translate") }}</strong>
          <v-list-item
            @click="changeLanguage(item)"
            v-for="item in languages"
            :key="item.value"
            :value="item.value"
            class="my-1"
          >
            <v-list-item-title v-text="item.text"/>
          </v-list-item>
        </v-list-item-group>
      </v-card>
    </v-menu>

    <!-- 个人信息 -->
    <v-menu
      bottom
      min-width="200px"
      rounded
      offset-y
      open-on-hover
      transition="scroll-y-transition"
    >
      <!-- 头像 -->
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="mx-1">
          <v-avatar>
            <v-icon> mdi-account-circle </v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <!-- 资料卡片 -->
      <v-card class="text-center">
        <v-avatar size="100px">
          <v-icon size="100px"> mdi-account-circle </v-icon>
        </v-avatar>
        <h3>{{ user.name }}</h3>
        <!-- 账号管理 -->
        <v-btn rounded text outlined class="my-3">{{ $t("account") }}</v-btn>
        <v-divider></v-divider>
        <!-- 退出登录 -->
        <v-btn rounded text class="my-3">{{ $t("loginout") }}</v-btn>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "nav-bar",
  data: () => ({
    user: {
      name: "John Doe",
    },
  }),
  computed: {
    search() {
      return this.$t("search");
    },
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
    setting() {
      // 打开设置栏
      this.$bus.$emit("open", true);
    },
  },
};
</script>

<style lang="sass">
</style>