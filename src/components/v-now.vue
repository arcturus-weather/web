<template>
  <!-- 当前天气 -->
  <div>
    <v-card flat>
      <v-carousel :show-arrows="false">
        <!-- 今日 AQI -->
        <!-- <v-carousel-item>
          
        </v-carousel-item> -->
        <!-- 生活指数 -->
        <!-- <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item> -->
      </v-carousel>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "v-now",
  data: () => {
    return {
      onboarding: 0,
    };
  },
};
</script>
<style lang="sass">
</style>