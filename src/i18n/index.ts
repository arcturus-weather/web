import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs.js'
import en from './en'
import zhHans from './zhHans'

const messages = {
  en,
  zhHans,
}

// i18n docs: https://kazupon.github.io/vue-i18n/zh/
// vuetify docs: https://next.vuetifyjs.com/en/features/internationalization/

export default createI18n({
  locale: 'zhHans',
  fallbackLocale: 'en',
  messages,
})
