<template>
  <ice-form :displaySwitchBtn="false" v-model:active="active">
    <!-- 获取验证码 -->
    <template v-slot:title1>
      {{ $t('account.reset') }}
    </template>
    <template v-slot:form1>
      <q-form @submit="onConfirm">
        <q-card-section class="q-px-lg">
          <!-- 邮箱账号输入 -->
          <q-input
            outlined
            v-model="email"
            :label="$t('account.email')"
            lazy-rules
            :rules="[isValidEmail]"
            :error-message="emailErrorMsg"
            :error="emailError"
            @focus="emailError = false"
          />
        </q-card-section>
        <q-card-section class="q-px-lg">
          <!-- 验证码输入框 -->
          <q-input
            outlined
            v-model="code"
            :label="$t('account.code')"
            :error-message="codeErrorMsg"
            :error="codeError"
            @focus="codeError = false"
            lazy-rules="ondemand"
            :rules="[(code) => code !== '' || $t('waring.codeMissing')]"
          >
            <!-- 倒计时 -->
            <template v-slot:append>
              <div v-if="dispalyCountDown" class="text-caption">
                {{ countdown }}s
              </div>
            </template>
            <!-- 发送验证码按钮 -->
            <template v-slot:after>
              <q-btn
                icon="fa-solid fa-paper-plane"
                @click="getCode"
                :disable="disable"
                round
                flat
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="center">
          <!-- 确认按钮 -->
          <q-btn
            class="button"
            outline
            color="primary"
            type="submit"
            :loading="confirmLoading"
            :label="$t('confirm')"
          />
        </q-card-actions>
      </q-form>

      <q-card-actions align="center">
        <!-- 返回登录 -->
        <q-btn flat color="primary" :label="$t('account.backLogIn')" :to="r" />
        <!-- 返回首页 -->
        <q-btn flat color="primary" :label="$t('back')" to="/home" />
      </q-card-actions>
    </template>
    <!-- 修改密码 -->
    <template v-slot:title2>
      {{ $t('account.reset') }}
    </template>
    <template v-slot:form2>
      <q-form class="form" @submit="onChangePwd">
        <!-- 邮箱输入框 -->
        <q-card-section class="email-input q-px-lg">
          <!-- 邮箱只读 -->
          <q-input
            outlined
            v-model="email"
            :label="$t('account.email')"
            :readonly="true"
          />
        </q-card-section>
        <!-- 密码一输入框 -->
        <q-card-section class="password-1-input q-px-lg">
          <q-input
            outlined
            v-model="password_1"
            :label="$t('account.password')"
            type="password"
          />
        </q-card-section>
        <!-- 密码二输入框 -->
        <q-card-section class="password-2-input q-px-lg">
          <q-input
            outlined
            v-model="password_2"
            :label="$t('account.repeat')"
            type="password"
            lazy-rules
            :rules="[
              (psw) => psw === password_1 || $t('waring.passwordNotEqual'),
            ]"
          />
        </q-card-section>
        <!-- 修改按钮 -->
        <q-card-actions class="confirm-btn q-pb-md" align="center">
          <q-btn
            outline
            class="button"
            color="primary"
            type="submit"
            :loading="changeLoading"
            :label="$t('confirm')"
          />
        </q-card-actions>
      </q-form>
    </template>
  </ice-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'resetPassword',
});
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import iceForm from 'components/ice-form.vue';
import { isValidEmail } from 'utils/utils';
import { i18n } from 'src/boot/i18n';
import { notify } from 'utils/utils';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/stores';

const router = useRouter();
const user = useUserStore();

let timer: NodeJS.Timeout | null = null;

const r = computed(() => {
  const redirect = router.currentRoute.value.query.redirect;

  if (typeof redirect !== 'undefined') {
    return {
      path: '/login',
      query: {
        redirect: redirect,
      },
    };
  }

  return { path: '/login' };
});

const email = ref(''), // 邮箱
  active = ref(false), // 是否切换表单二
  countdown = ref(0), // 倒计时
  dispalyCountDown = ref(false), // 是否展示倒计时
  disable = ref(false), // 是否可以发送验证码
  code = ref(''), // 验证码
  password_1 = ref(''), // 密码一
  password_2 = ref(''), // 密码二
  emailErrorMsg = ref(''), // 账号相关错误信息
  emailError = ref(false), // 账号是否错误
  codeErrorMsg = ref(''), // 密码相关错误信息
  codeError = ref(false), // 密码是否错误
  confirmLoading = ref(false),
  changeLoading = ref(false);

// 验证验证码
function onConfirm() {
  emailError.value = false;
  codeError.value = false;
  confirmLoading.value = true;

  user
    .verifyCode(email.value, code.value)
    .then(() => {
      confirmLoading.value = false;

      active.value = true; // 验证成功, 跳转表单二
    })
    .catch((err: any) => {
      confirmLoading.value = false;
      const { code } = err;
      if (code === 3003) {
        codeError.value = true;
        codeErrorMsg.value = i18n.global.t('waring.codeInvalid');
      }
    });
}

// 修改密码
function onChangePwd() {
  changeLoading.value = true;

  user
    .changePassword(email.value, password_1.value)
    .then(() => {
      changeLoading.value = false;

      notify.positive(i18n.global.t('success.password'));

      setTimeout(() => {
        // 修改成功, 跳转登录页面
        router.push(r.value);
      }, 2000);
    })
    .catch(() => {
      // 其他错误...
    });
}

// 获取验证码
function getCode() {
  if (!timer) {
    countdown.value = 10;
    disable.value = true;
    dispalyCountDown.value = true;

    user.obtainCode(); // 获取验证码请求

    timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        disable.value = false;
        dispalyCountDown.value = false;
        clearInterval(Number(timer));
        timer = null;
      }
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
$white: #ffffff;
$toggle-size: 60px;

.button {
  width: 100px;
}

.active {
  .email-input,
  .password-1-input,
  .password-2-input,
  .confirm-btn {
    left: 0;
    opacity: 1;
    transition: 0.3s ease;
  }

  .email-input {
    transition-delay: 0.4s;
  }

  .password-1-input {
    transition-delay: 0.5s;
  }

  .password-2-input {
    transition-delay: 0.6s;
  }

  .confirm-btn {
    transition-delay: 0.7s;
  }
}

.deactive {
  .email-input,
  .password-1-input,
  .password-2-input,
  .confirm-btn {
    left: 100px;
    opacity: 0;
  }
}
</style>

