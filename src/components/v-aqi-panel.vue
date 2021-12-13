<template>
  <v-card class="pa-2" flat outlined>
    <v-row no-gutters align="center">
      <!-- AQI  -->
      <v-progress-circular
        :rotate="-90"
        :size="100"
        width="5"
        :value="AQI.percentage"
        :color="AQIColor"
      >
        <div class="d-flex flex-column align-center">
          {{ AQI.aqi }}
          <v-chip :color="AQIColor" small text-color="white">{{
            AqiCategory
          }}</v-chip>
        </div>
      </v-progress-circular>

      <v-col class="mx-4">
        <!-- 污染源指数 -->
        <div v-for="item in pollution" :key="item.label" style="font-size: 0.7em">
          {{ item.label }}
          <v-progress-linear
            :value="item.percentage"
            height="5"
            color="deep-orange"
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
  data: () => ({}),
  computed: {
    AQI() {
      return {
        aqi: this.$store.state.air.aqi,
        percentage: this.$store.state.air.aqi / 5,
      };
    },
    AQIColor() {
      let aqi = this.$store.state.air.aqi;
      if (aqi < 51) {
        return "#26A69A";
      } else if (aqi < 101) {
        return "#FDD835";
      } else if (aqi < 151) {
        return "#FF6F00";
      } else if (aqi < 201) {
        return "#E53935";
      } else if (aqi < 300) {
        return "#AB47BC";
      } else {
        return "#311B92";
      }
    },
    AqiCategory() {
      return this.$store.state.air.category;
    },
    pollution() {
      let air = this.$store.state.air;
      let pollution_list = [
        {
          label: "PM10",
          level: air.pm10,
          percentage: air.pm10 / 15,
          unit: "μg/m³",
        },
        {
          label: "PM2.5",
          level: air.pm2p5,
          percentage: air.pm2p5 / 0.75,
          unit: "μg/m³",
        },
        {
          label: "NO2",
          level: air.no2,
          percentage: air.no2 / 7.5,
          unit: "μg/m³",
        },
        {
          label: "SO2",
          level: air.so2,
          percentage: air.so2 / 7.5,
          unit: "μg/m³",
        },
        {
          label: "CO",
          level: air.co,
          percentage: air.co / 7.5,
          unit: "mg/m³",
        },
        {
          label: "O3",
          level: air.o3,
          percentage: air.o3 / 2,
          unit: "μg/m³",
        },
      ];
      return pollution_list;
    },
  },
  mounted() {},
};
</script>
