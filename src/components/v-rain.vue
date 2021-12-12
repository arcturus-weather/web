<template>
  <v-card flat outlined class="pa-2">
    <v-card-title class="pa-1">{{$t("rainChart")}}</v-card-title>
    <v-sparkline
      height="100"
      :value="value"
      :smooth="radius"
      :gradient="gradient"
      :line-width="width"
      :labels="labels"
      :stroke-linecap="lineCap"
      fill
      auto-line-width
      auto-draw
    ></v-sparkline>
  </v-card>
</template>
<script>
export default {
  name: "v-rain",
  data: () => ({
    width: 2,
    radius: 15,
    fill: true,
    lineCap: "round",
    gradient: ["#4FC3F7"]
  }),
  computed: {
    labels() {
      return [
        this.$t("now"),
        " ",
        " ",
        " ",
        " ",
        " ",
        "0.5h",
        " ",
        " ",
        " ",
        " ",
        " ",
        "1h",
        " ",
        " ",
        " ",
        " ",
        " ",
        "1.5h",
        " ",
        " ",
        " ",
        " ",
        "1.9h",
      ];
    },
    value() {
      let minutely = this.$store.state.rain.minutely;
      let precipList = minutely.map((el) => parseFloat(el.precip));
      return precipList;
    },
  },
};
</script>
<style lang="sass">
</style>