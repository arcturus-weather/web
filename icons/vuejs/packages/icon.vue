<template>
  <svg
    aria-hidden="true"
    :style="{
      width: iconSize,
      height: iconSize,
    }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'i-icon',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { qweatherIcon, caiyunIcon } from '../../utils';
import 'virtual:svg-icons-register';

interface P {
  name: string;
  type?: 'qweather' | 'caiyun';
  size?: number | string;
}

const props = withDefaults(defineProps<P>(), {
  size: 50,
  type: 'qweather',
});

const iconSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`;
  } else if (typeof props.size === 'string') {
    return props.size;
  }

  return '50px';
});

const type = computed(() => {
  if (/^warnings-/.test(props.name)) {
    return 'warnings';
  } else {
    return 'weathers';
  }
});

const name = computed(() => {
  if (props.type === 'qweather') {
    return qweatherIcon(props.name);
  } else if (props.type === 'caiyun') {
    return caiyunIcon(props.name);
  }
});

const symbolId = computed(() => {
  return `#icon-${type.value}-${name.value}`;
});
</script>
