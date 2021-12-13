<template>
  <v-card flat>
    <v-list-item-group class="hours-list" ref="hourScroll">
      <div class="d-flex" style="height:100%">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="flex-column align-center"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.time | Time }}</v-list-item-title>
          </v-list-item-content>

          <i :class="`qi-${item.icon}`"></i>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div
        class="tempChart"
        style="height: 100px"
        ref="tempChart"
        :style="{ width: tempChartWidth + 'px' }"
      ></div>
    </v-list-item-group>
  </v-card>
</template>
<script>
import { filter } from "@/mixin";
import { darkMode } from "@/mixin";
export default {
  name: "v-hours",
  data: () => ({
    tempChartWidth: 0,
  }),
  mixins: [filter, darkMode],
  watch: {
    // 切换主题模式后重新绘制降水图
    darkMode(n) {
      this.myChart.dispose();
      this.drawHours(n ? "dark" : "light");
    },
  },
  methods: {
    drawHours(mode) {
      // 绘制时间折线图
      this.myChart = this.$echarts.init(this.$refs.tempChart, mode);
      let that = this;
      window.onresize = function () {
        that.myChart.resize();
      };
      let option = {
        backgroundColor: "transparent",
        // 直角坐标系网格
        grid: {
          left: "0",
          right: "0",
          bottom: "0",
          top: "5%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "category",
        },
        yAxis: {
          axisLabel: {
            show: false,
          },
          splitNumber: 1,
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            label: {
              show: true,
              formatter: "{c}°",
            },
            type: "line",
            smooth: true,
            data: this.temperature,
          },
        ],
      };

      option && this.myChart.setOption(option);
    },
  },
  computed: {
    items() {
      let h = this.$store.state.hours;
      let items = h.map((el) => {
        return {
          time: new Date(el.fxTime),
          temp: el.temp,
          icon: el.icon,
          text: el.text,
        };
      });
      return items;
    },
    temperature() {
      let temp = this.items.map((el) => {
        return el.temp;
      });
      return temp;
    },
  },
  mounted() {
    new Promise((resolve) => {
      let scrollWidth = this.$refs.hourScroll.$el.scrollWidth;
      this.tempChartWidth = scrollWidth;
      resolve();
    }).then(() => {
      this.drawHours(this.darkMode ? "dark" : "light");
    });
  },
};
</script>

<style lang="sass">
.hours-list
  position: relative
  overflow-x: scroll
  height: 200px
  &::-webkit-scrollbar
    height: 0

.tempChart
  position: absolute
  bottom: 0
  height: 100px
  width: 100%
</style>>