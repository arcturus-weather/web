<template>
  <ice-form v-model:active="active">
    <!-- 登录 -->
    <template v-slot:title1>
      {{ $t('account.logIn') }}
    </template>
    <template v-slot:form1>
      <q-form @submit="onLogin">
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
          <!-- 密码输入框 -->
          <q-input
            outlined
            v-model="password_1"
            :label="$t('account.password')"
            :type="vis ? 'text' : 'password'"
            :error-message="passwordErrorMsg"
            :error="passwordError"
            @focus="passwordError = false"
            :rules="[(pwd) => pwd !== '' || $t('waring.passwordMissing')]"
          >
            <template v-slot:append>
              <q-icon
                size="20px"
                class="cursor-pointer q-ml-sm"
                :name="vis ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                @click.stop.prevent="vis = !vis"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="center">
          <!-- 登录确认按钮 -->
          <q-btn
            class="button"
            outline
            color="primary"
            type="submit"
            :loading="loginLoading"
            :label="$t('account.logIn')"
          />
        </q-card-actions>
      </q-form>

      <q-card-actions align="center">
        <!-- 重置密码 -->
        <q-btn flat color="primary" :label="$t('account.forget')" :to="r" />
        <!-- 返回首页 -->
        <q-btn flat color="primary" :label="$t('back')" to="/home" />
      </q-card-actions>
    </template>
    <!-- 注册 -->
    <template v-slot:title2>
      {{ $t('account.signIn') }}
    </template>
    <template v-slot:form2>
      <q-form class="form" @submit="onSignIn">
        <!-- 邮箱输入框 -->
        <q-card-section class="email-input q-px-lg">
          <q-input
            outlined
            v-model="email"
            :label="$t('account.email')"
            :error-message="emailErrorMsg2"
            :error="emailError2"
            @focus="emailError2 = false"
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
        <!-- 注册按钮 -->
        <q-card-actions class="confirm-btn q-pb-md" align="center">
          <q-btn
            outline
            class="button"
            color="primary"
            type="submit"
            :loading="signInLoading"
            :label="$t('account.signIn')"
          />
        </q-card-actions>
      </q-form>
    </template>
  </ice-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LogIn',
});
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import iceForm from 'components/ice-form.vue';
import { isValidEmail } from 'utils/utils';
import { notify } from 'utils/utils';
import { i18n } from 'src/boot/i18n';

import { RouteLocationRaw, useRouter } from 'vue-router';
const router = useRouter();

import { useUserStore } from 'stores/stores';
const user = useUserStore();

const email = ref(''), // 邮箱
  active = ref(false), // 是否切换表单二
  password_1 = ref(''), // 密码一
  password_2 = ref(''), // 密码二
  vis = ref(false), // 密码可见性
  emailErrorMsg = ref(''), // 账号相关错误信息
  emailError = ref(false), // 账号是否错误
  emailErrorMsg2 = ref(''), // 账号相关错误信息
  emailError2 = ref(false), // 账号是否错误
  passwordErrorMsg = ref(''), // 密码相关错误信息
  passwordError = ref(false), // 密码是否错误
  loginLoading = ref(false),
  signInLoading = ref(false);

const r = computed(() => {
  const redirect = router.currentRoute.value.query.redirect;

  if (typeof redirect !== 'undefined') {
    return {
      path: '/reset',
      query: {
        redirect: redirect,
      },
    };
  }

  return { path: '/reset' };
});

const p = computed(() => {
  const redirect = router.currentRoute.value.query.redirect as RouteLocationRaw;

  if (typeof redirect !== 'undefined') {
    return redirect;
  }

  return '/home';
});

// 登录
function onLogin() {
  emailError.value = false;
  passwordError.value = false;
  loginLoading.value = true;

  user
    .login(email.value, password_1.value)
    .then(() => {
      loginLoading.value = false;

      notify.positive(i18n.global.t('success.logIn'));

      setTimeout(() => {
        // 登录成功, 跳转至重定向网址, 或者首页
        router.push(p.value);
      }, 2000);
    })
    .catch((err: any) => {
      loginLoading.value = false;
      const { code } = err;
      if (code === 3000) {
        passwordError.value = true;
        passwordErrorMsg.value = i18n.global.t('waring.passwordInvalid');
      } else if (code === 3001) {
        emailError.value = true;
        emailErrorMsg.value = i18n.global.t('waring.emailInvaild');
      }
    });
}

// 注册
function onSignIn() {
  emailError2.value = false;
  signInLoading.value = true;

  user
    .signin(email.value, password_1.value)
    .then(() => {
      signInLoading.value = false;

      notify.positive(i18n.global.t('success.signIn'));

      active.value = false; // 切回去登录
    })
    .catch((err: any) => {
      signInLoading.value = false;
      const { code } = err;
      if (code === 3002) {
        emailError2.value = true;
        emailErrorMsg2.value = i18n.global.t('waring.emailExist');
      }
    });
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
