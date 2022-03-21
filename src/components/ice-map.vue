<template>
  <el-dialog
    title="地图选点"
    :visible="visible"
    @opened="opened"
    @close="$emit('update:visible', false)"
  >
    <el-row class="input" :gutter="10">
      <el-col :span="16">
        <el-autocomplete
          style="width: 100%"
          v-model="input"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          :debounce="1000"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="confirm">确认</el-button>
      </el-col>
    </el-row>
    <!-- 地图显示 -->
    <div id="map" ref="map"></div>
  </el-dialog>
</template>

<script>
import { DrawQQMap, qqMap } from "../utils/location/qqMap";
import { mapState, mapActions } from "pinia";
import { useLocation, useWeather, useLoading } from "../store";

export default {
  name: "ice-map",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: "",
      drawMap: null, // 腾讯地图实例
    };
  },
  computed: {
    ...mapState(useLocation, ["lat", "lng"]),
  },
  methods: {
    ...mapActions(useLocation, ["changeLocation"]),
    ...mapActions(useWeather, ["qweatherHandler"]),
    ...mapActions(useLoading, ["changeLoading"]),
    // 点击建议列表事件
    handleSelect(item) {
      const { lat, lng } = item.location;
      // 暂时保存信息
      this.locInfo = item;
      // 更新锚点
      this.drawMap.updateMaker(lat, lng);
    },
    // 搜索并建议
    querySearchAsync(queryString, cb) {
      if (queryString !== "") {
        qqMap.searchSuggest(queryString).then((res) => {
          const result = res.map((e) => {
            return {
              value: e.title,
              location: e.location,
              province: e.province,
              district: e.district,
              city: e.city,
            };
          });
          cb(result);
        });
      }
    },
    // 点击确认按钮
    confirm() {
      const {
        location: { lat, lng },
        city,
        value,
        district,
        province,
      } = this.locInfo;
      // 修改全局地址
      this.changeLocation(lat, lng, value, city, district, province);
      this.changeLoading(true);
      this.qweatherHandler(`${lng},${lat}`);
      this.$emit("update:visible", false);
    },
    // 打开时初始化地图
    opened() {
      if (this.drawMap === null) {
        // 初始化地图
        this.drawMap = new DrawQQMap(
          this.$refs.map,
          this.lat,
          this.lng,
          (res) => {
            this.input = res.name;
            this.locInfo = {
              location: {
                lat: res.lat,
                lng: res.lng,
              },
              value: res.name,
            };
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.input {
  width: 300px;
  margin-bottom: 1em;
}

#map {
  height: 200px;
  width: 100%;
}
</style>
