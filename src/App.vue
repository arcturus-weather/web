<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'utils/mock';
import 'utils/weather/test';

export default defineComponent({
  name: 'App',
});
</script>
