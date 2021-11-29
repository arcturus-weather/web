// 国际化
import VueI18n from 'vue-i18n';
import Vue from 'vue';
// 引入自定义翻译文件
import en from '../i18n/en';
import cn from '../i18n/zh-CN';
import tc from '../i18n/zh-TC';

Vue.use(VueI18n);

export default new VueI18n({
    locale: localStorage.getItem('locale') || 'zh-CN',
    messages: {
        'zh-CN': cn,
        'zh-TC': tc,
        'en': en
    }
})