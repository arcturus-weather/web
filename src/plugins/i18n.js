// 国际化
import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n);

export default new VueI18n({
    locale: localStorage.getItem('locale') || 'zh-CN',
    messages: {
        'zh-CN': require('../i18n/zh-hans'),
        'zh-TC': require('../i18n/zh-hant'),
        'en-US': require('../i18n/en')
    }
})