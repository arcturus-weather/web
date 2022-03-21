<template>
  <el-card class="living" shadow="never">
    <div slot="header" class="title">生活指数</div>
    <el-carousel :autoplay="false" height="200px" indicator-position="none">
      <el-carousel-item
        class="swiper-i"
        v-for="(item, index) in livingIndices"
        :key="index"
      >
        <el-row style="height: 100%">
          <el-col :span="12" v-for="(i, index) in item" :key="index">
            <!-- 图标 -->
            <ice-icon :name="`icon-${i.type}`"></ice-icon>
            <!-- 简介 -->
            <div class="desc">
              <div>{{ i.name }}</div>
              <div>{{ i.category }}</div>
            </div>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script>
import { useWeather } from "../store";
import iceIcon from "./ice-icon.vue";

export default {
  name: "ice-living-indices",
  components: {
    iceIcon,
  },
  computed: {
    livingIndices() {
      const living = useWeather().livingIndices;

      let living2D = [];
      for (let i = 0; i < living.length; i += 4) {
        living2D.push(living.slice(i, i + 4));
      }

      return living2D;
    },
  },
};
</script>

<style scoped>
.living .title {
  font-weight: bold;
}

.living .el-col {
  display: flex;
  height: 50%;
  padding: 15px 30px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}

.living .desc {
  flex: 1;
  text-align: center;
  margin-left: 10px;
}

.living .desc div:last-of-type {
  color: #909399;
}
</style>