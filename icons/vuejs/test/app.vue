<template>
  <div class="page-wrapper flex column">
    <div class="flex mb-50 column">
      <div class="mb-30">和风天气测试</div>
      <div>
        <i-icon name="100" :size="40"></i-icon>
        <i-icon name="101" :size="50"></i-icon>
        <i-icon name="102" :size="60"></i-icon>
        <i-icon name="103" size="70px"></i-icon>
        <i-icon name="warnings-1001"></i-icon>
      </div>
    </div>

    <div class="flex mb-50 column">
      <div class="mb-30">彩云天气测试</div>
      <div>
        <i-icon
          name="PARTLY_CLOUDY_DAY"
          type="caiyun"
        ></i-icon>
        <i-icon
          name="PARTLY_CLOUDY_NIGHT"
          type="caiyun"
        ></i-icon>
        <i-icon name="CLEAR_NIGHT" type="caiyun"></i-icon>
        <i-icon name="CLEAR_DAY" type="caiyun"></i-icon>
        <i-icon name="warnings-02" type="caiyun"></i-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
body,
html {
  margin: 0;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.column {
  flex-direction: column;
}

.page-wrapper {
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
}

.mb-50 {
  margin-bottom: 50px;
}

.mb-30 {
  margin-bottom: 30px;
}
</style>
