<template>
  <!-- 导航栏 -->
  <v-app-bar flat app>
    <v-toolbar-title>{{ appName }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- 搜索框 -->
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      placeholder="搜索"
      clearable
      rounded
      hide-details
      class="shrink"
      style="border-radius: 5px"
    />

    <!-- 设置 -->
    <v-btn icon class="mx-1">
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>

    <v-btn @click="changeLanguage">点击</v-btn>

    <!-- 切换语言 -->
    <v-menu bottom rounded offset-y class="mx-1">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon>mdi-translate</v-icon>
          <v-icon small>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content>
          <p>{{ translate }}</p>
        </v-list-item-content>
      </v-card>
    </v-menu>

    <v-menu
      bottom
      min-width="200px"
      rounded
      offset-y
      nudge-bottom="20px"
      class="mx-1"
    >
      <!-- 头像 -->
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar>
            <v-icon> mdi-account-circle </v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <!-- 资料卡片 -->
      <v-card>
        <v-list-item-content>
          <div class="text-center">
            <v-avatar size="100px">
              <v-icon size="100px"> mdi-account-circle </v-icon>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
          </div>
          <!-- 账号管理 -->
          <v-btn rounded text outlined>{{ account }}</v-btn>
          <v-divider class="my-3"></v-divider>
          <!-- 退出登录 -->
          <v-btn rounded text>{{ $vuetify.lang.t("$vuetify.loginout") }}</v-btn>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "nav-bar",
  data: () => ({
    user: {
      fullName: "John Doe",
    },
    account: "编辑",
    appName: "小天气",
    translate: "翻译",
  }),
  methods: {
    changeLanguage() {
      console.log(this.$t);
    },
  },
  mounted() {},
};
</script>

<style lang="sass">
</style>