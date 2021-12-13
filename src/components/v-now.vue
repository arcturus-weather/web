<template>
  <!-- 当前天气 -->
  <v-card flat outlined class="mb-1">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h3 mb-1">
          {{ temp }} °
        </v-list-item-title>
        <div class="text-overline mb-4">
          {{ status }},{{ $t("feelsLike") }}:{{ feelsLike }}°
        </div>
        <v-list-item-subtitle>
          {{ `${$t("updateTime")}:${updateTime}` }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <i class="text-h1" :class="`qi-` + icon"></i>
    </v-list-item>
    <div class="py-2 px-3 d-flex justify-space-between">
      <v-chip
        x-large
        v-for="item in statusList"
        :key="item.label"
        @click="item.func"
        style="border-radius: 0.5em"
        outlined
        :color="item.color"
        class="mx-1  flex-grow-1 justify-center"
      >
        <div class="text-center">
          <v-icon small> {{ item.icon }}</v-icon>
          <div class="text-caption">{{ $t(item.label) }}</div>
          <div class="text-caption">{{ item.text }}</div>
        </div>
      </v-chip>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "v-now",
  data: () => ({
    onboarding: 0,
  }),
  computed: {
    feelsLike() {
      // 体感指数
      return this.$store.state.now.feelsLike;
    },
    temp() {
      // 当前温度
      return this.$store.state.now.temp;
    },
    status() {
      return this.$store.state.now.text;
    },
    icon() {
      return this.$store.state.now.icon;
    },
    updateTime() {
      let time = new Date(this.$store.state.now.obsTime);
      return `${time.getHours()}:${time.getMinutes()}`;
    },
    statusList() {
      let now = this.$store.state.now;
      let list = [
        {
          // 风向
          icon: "mdi-fan",
          label: "windDir",
          func: "",
          color: "#81D4FA",
          text: `${now.windDir}`,
        },
        {
          // 湿度
          icon: "mdi-water",
          label: "humidity",
          func: "",
          color: "#00B0FF",
          text: `${now.humidity}%`,
        },
        {
          // 大气压
          icon: "mdi-thermometer",
          label: "pressure",
          func: "",
          color: "#EF6C00",
          text: `${now.pressure}hPa`,
        },
        {
          // 能见度
          icon: "mdi-eye",
          label: "vis",
          func: "",
          color: "#90A4AE",
          text: `${now.vis}km`,
        },
      ];
      return list;
    },
  },
};
</script>
<style lang="sass">
</style>