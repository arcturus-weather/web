<template>
  <div class="btn-toggle__container">
    <q-btn
      size="10px"
      no-caps
      v-for="(item, idx) in options"
      :key="idx"
      :label="item.label"
      :icon="item.icon"
      :disable="item.disable"
      @click="$emit('update:model-value', item.value)"
      :color="item.value === modelValue ? 'primary' : 'grey-11'"
      :text-color="item.value === modelValue ? 'white' : 'primary'"
      unelevated
      :padding="padding"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface OPTIONS {
  label?: string;
  icon?: string;
  value?: string;
  disable?: boolean;
}

export default defineComponent({
  name: 'iceBtnToggle',

  props: {
    options: Array as PropType<Array<OPTIONS>>,
    modelValue: String,
    padding: {
      type: String,
      default: '15px 10px',
    },
  },

  emits: ['update:model-value'],

  setup() {},
});
</script>

<style lang="scss">
.btn-toggle__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 140px);
  grid-gap: 16px;
}
</style>
