<template>
  <v-card class="pa-2" flat outlined>
    <v-card-title class="pa-0">{{ $t("airqulity") }}</v-card-title>
    <v-row no-gutters align="center">
      <!-- AQI  -->
      <v-progress-circular
        :rotate="-90"
        :size="100"
        width="5"
        :value="AQI"
        color="primary"
      >
        {{ AQI }}
      </v-progress-circular>

      <v-col class="mx-4">
        <!-- 污染源指数 -->
        <div v-for="item in pollution" :key="item.label" class="text-caption">
          {{ item.label }}
          <v-progress-linear
            :value="item.percentage"
            height="5"
            striped
            color="deep-orange"
            rounded
          ></v-progress-linear>
          <p class="text-right mb-0">{{ item.level + item.unit }}</p>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "v-api-panel",
  data: () => {
    return {};
  },
  computed: {
    AQI() {
      return this.$store.state.air.aqi;
    },
    pollution() {
      let air = this.$store.state.air;
      let pollution_list = [
        {
          label: "PM10",
          level: air.pm10,
          percentage: (air.pm10 / 1500) * 100,
          unit: "μg/m³",
        },
        {
          label: "PM2.5",
          level: air.pm2p5,
          percentage: (air.pm2p5 / 75) * 100,
          unit: "μg/m³",
        },
        {
          label: "NO2",
          level: air.no2,
          percentage: (air.no2 / 750) * 100,
          unit: "μg/m³",
        },
        {
          label: "SO2",
          level: air.so2,
          percentage: (air.so2 / 750) * 100,
          unit: "μg/m³",
        },
        {
          label: "CO",
          level: air.co,
          percentage: (air.co / 750) * 100,
          unit: "mg/m³",
        },
        {
          label: "O3",
          level: air.o3,
          percentage: (air.o3 / 200) * 100,
          unit: "μg/m³",
        },
      ];
      return pollution_list;
    },
  },
  mounted() {
    //  获取空气质量报告
    this.$store.dispatch("getAirQuality");
  },
};
</script>