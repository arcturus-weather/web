<template>
  <ice-form :displaySwitchBtn="false">
    <!-- 获取验证码 -->
    <template v-slot:title1>
      {{ $t('account.reset') }}
    </template>
    <template v-slot:form1>
      <q-form @submit="changePassword">
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
        <!-- 密码一输入框 -->
        <q-card-section class="password-1-input q-px-lg">
          <q-input
            outlined
            v-model="password_1"
            :label="$t('account.password')"
            :rules="[isValidPassword]"
            type="password"
            lazy-rules
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
        <q-card-section class="q-px-lg">
          <!-- 验证码输入框 -->
          <q-input
            outlined
            v-model="code"
            :label="$t('account.code')"
            :error-message="codeErrorMsg"
            :error="codeError"
            @focus="codeError = false"
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
import { isValidEmail, isValidPassword } from 'utils/utils';
import { notify } from 'utils/utils';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/stores';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
  confirmLoading = ref(false);

// 修改密码
function changePassword() {
  confirmLoading.value = true;

  user
    .changePassword(email.value, password_1.value, code.value)
    .then(() => {
      confirmLoading.value = false;

      notify.positive(t('success.password'));

      setTimeout(() => {
        // 修改成功, 跳转登录页面
        router.push(r.value);
      }, 2000);
    })
    .catch((err) => {
      confirmLoading.value = false;

      const { code } = err;

      if (code === 404) {
        // 账号不存在
        emailError.value = true;
        emailErrorMsg.value = t('waring.emailInvaild');
      } else if (code === 301 || code === 400) {
        // 验证码错误
        codeError.value = true;
        codeErrorMsg.value = t('waring.codeInvalid');
      }
    });
}

// 获取验证码
function getCode() {
  if (!timer) {
    countdown.value = 10;
    disable.value = true;
    dispalyCountDown.value = true;

    user.sendCode(email.value); // 获取验证码请求

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
.button {
  width: 100px;
}
</style>

