<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg row items-center justify-center">
        <div class="container" :class="active ? 'active' : 'deactive'">
          <q-card class="card" flat bordered>
            <q-card-section class="title">
              <!-- 表单一标题 -->
              <div class="text-h4 text-primary q-pa-md text-bold">
                <slot name="title1"></slot>
              </div>
            </q-card-section>
            <slot name="form1"></slot>
          </q-card>
          <q-card class="card alt" flat>
            <!-- 表单切换按钮 -->
            <div class="toggle">
              <q-btn
                v-if="displaySwitchBtn && !active"
                class="toggle-btn"
                @click="switchToForm2"
                icon="fa-solid fa-user-pen"
                unelevated
                color="primary"
                rounded
              ></q-btn>
            </div>
            <q-card-section class="title row items-center">
              <!-- 表单二标题 -->
              <div class="text-h4 text-primary text-bold q-pa-md">
                <slot name="title2"></slot>
              </div>
              <q-space />
              <!-- 关闭表单按钮 -->
              <q-btn flat round icon="fa-solid fa-xmark" @click="switchToForm1" />
            </q-card-section>
            <slot name="form2"></slot>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
// This component references to https://codepen.io/andytran/pen/RPBdgM
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iceForm',
});
</script>

<script lang="ts" setup>
// This component references to https://codepen.io/andytran/pen/RPBdgM
defineProps({
  displaySwitchBtn: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['switchToForm2', 'switchToForm1', 'update:active']);

function switchToForm2() {
  emit('switchToForm2');
  emit('update:active', true);
}

function switchToForm1() {
  emit('switchToForm1');
  emit('update:active', false);
}
</script>

<style lang="scss" scoped>
$white: #ffffff;
$toggle-size: 60px;

.container {
  position: relative;
  width: 400px;

  @media screen and (max-width: 400px) {
    width: 90%;
  }

  @media screen and (max-width: 500px) {
    width: 350px;
  }

  // 点击注册按钮后样式
  &.active {
    .card {
      &:first-child {
        background: darken($white, 2%);
        margin: 0 10px;
      }

      &.alt {
        top: 10px;
        right: 0;
        width: 100%;
        overflow: hidden;

        .toggle {
          background-color: $grey-11;
          top: 25px;
          right: -$toggle-size / 2;
          transform: scale(20);
          transition: transform 0.3s ease-in-out;
        }

        .title {
          left: 0;
          opacity: 1;
          transition: 0.3s ease 0.3s;
        }
      }
    }
  }

  .card {
    position: relative;

    &:first-child::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      border: 1px solid rgba(0, 0, 0, 0.12);
      transform: translateX(-50%);
      background: darken($white, 2%);
      border-radius: 5px 5px 0 0;
      width: 95%;
      height: 10px;
      z-index: -1;
    }

    &.alt {
      position: absolute;
    }

    .title {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 5px;
        border-radius: 2.5px;
        transform: translateY(-50%);
        height: 60%;
        background-color: $primary;
      }
    }

    .toggle {
      position: absolute;
      width: $toggle-size;
      height: $toggle-size;
      color: $white;
    }
  }

  &.deactive {
    .card {
      transition: 0.3s ease;

      &.alt {
        top: 25px;
        right: -$toggle-size / 2;
        z-index: 10;
        width: $toggle-size;
        height: $toggle-size;
        background: none;
        transition: 0.3s ease;
        overflow: hidden;

        // 右上角点击按钮
        .toggle-btn {
          width: inherit;
          height: inherit;
        }

        .title {
          left: 100px;
          opacity: 0;
        }
      }
    }
  }
}
</style>

