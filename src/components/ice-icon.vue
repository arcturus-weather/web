<template>
  <svg aria-hidden="true" :style="styleObject">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
/*************************
 *  引入 iconfont 图标    *
 *************************/
import '//at.alicdn.com/t/font_3222523_qxdxwmlxjn.js';
import '//at.alicdn.com/t/font_3192173_1er6fiyhl1p.js';
import '//at.alicdn.com/t/font_3184399_x1h5png7n8.js';
import '//at.alicdn.com/t/font_3185244_88v7v16rhan.js';

export default {
  name: "ice-icon",
  props: {
    name: String,
    size: {
      default: 50,
      type: Number,
    },
  },
  data() {
    return {
      styleObject: {
        width: `${this.size}px`,
        height: `${this.size}px`,
      },
    };
  },
};
</script>