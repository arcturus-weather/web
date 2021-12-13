import Vue from 'vue'
import App from './App.vue'
// 引入插件
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
// 引入 echarts
import echarts from "@/plugins/echarts"
Vue.prototype.$echarts = echarts

// 引入 mockServer.js
import "@/mock/mockServer";
// 引入 vuex
import store from '@/store'


Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  store,
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
  }
}).$mount('#app')