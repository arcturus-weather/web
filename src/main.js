import Vue from 'vue'
import App from './App.vue'
// 引入插件
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'

Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
  }
}).$mount('#app')