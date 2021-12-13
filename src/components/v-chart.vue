<template>
  <div>
    <transition name="fade" :duration="200" appear mode="out-in">
      <!-- 选项卡 -->
      <v-chip-group
        class="mx-1"
        active-class="primary--text"
        v-model="selected"
        mandatory
        v-if="$store.state.hours"
      >
        <v-chip v-for="item in tags" :key="item">{{ $t(item) }}</v-chip>
      </v-chip-group>
      <v-row v-else no-gutters>
        <v-skeleton-loader type="chip" class="pa-1" />
        <v-skeleton-loader type="chip" class="pa-1" />
      </v-row>
    </transition>
    <!-- 内容 -->
    <v-card flat outlined class="ma-1">
      <transition name="fade" :duration="200" appear mode="out-in">
        <v-tabs-items v-model="selected" v-if="$store.state.hours">
          <v-tab-item key="hours" class="pa-2">
            <!-- 逐小时天气预报 -->
            <v-hours />
          </v-tab-item>
          <v-tab-item key="week">
            <!-- 一周天气预报 -->
            <v-hours />
          </v-tab-item>
        </v-tabs-items>
        <v-skeleton-loader v-else type="list-item-avatar-three-line" />
      </transition>
    </v-card>
  </div>
</template>
<script>
import VHours from "./v-hours.vue";

export default {
  name: "v-chart",
  data: () => ({
    tags: ["hours", "week"],
    selected: "hours",
  }),
  components: { VHours },
};
</script>