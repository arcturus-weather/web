<template>
  <v-card flat outlined class="pa-2">
    <div ref="rainChart" style="width: 100%; height: 200px"></div>
  </v-card>
</template>
<script>
export default {
  name: "v-rain",
  data: () => ({}),
  watch: {
    // 切换主题模式后重新绘制降水图
    darkMode(n) {
      this.myChart.dispose();
      this.drawRainChart(n ? "dark" : "light");
    },
  },
  methods: {
    // 绘制降水图
    drawRainChart(mode) {
      this.myChart = this.$echarts.init(this.$refs.rainChart, mode);
      window.onresize = ()=> {
        this.myChart.resize();
      };
      let option = {
        backgroundColor: "transparent",
        title: {
          text: this.$t("rainChart"),
          textStyle: {
            fontWeight: "normal",
          },
        },
        // 提示框组件
        tooltip: {
          trigger: "none", // 触发类型
          axisPointer: {
            // 坐标轴指示器配置项
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        toolbox: {
          // 工具栏
          showTitle: false,
          feature: {
            saveAsImage: {},
          },
        },
        // 直角坐标系网格
        grid: {
          left: "1%",
          top: "40%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          // x 轴
          {
            type: "category",
            boundaryGap: false, // 坐标轴两边留白
            data: this.array,
          },
        ],
        yAxis: [
          // y 轴
          {
            name: this.$t("precip"),
            type: "value",
          },
        ],
        series: [
          {
            type: "line",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8, // 图形透明度
              color: "#0277BD",
            },
            emphasis: {
              focus: "series",
            },
            data: this.value,
          },
        ],
      };

      option && this.myChart.setOption(option);
    },
  },
  computed: {
    value() {
      let minutely = this.$store.state.rain.minutely;
      let precipList = minutely.map((el) => parseFloat(el.precip));
      return precipList;
    },
    array() {
      let array = new Array();
      array.push(this.$t("now"));
      for (let i = 1; i < 24; i++) {
        array.push(5 * i + "min");
      }
      return array;
    },
    darkMode() {
      return this.$vuetify.theme.dark;
    },
  },
  mounted() {
    this.drawRainChart(this.darkMode ? "dark" : "light");
  },
};
</script>