import { createApp } from 'vue'
import PcApp from '@/PcApp.vue'
import vuetify from 'plugins/vuetify'
import { loadFonts } from 'plugins/webfontloader'
import i18n from 'i18n'

loadFonts()

const app = createApp(PcApp).use(i18n).use(vuetify).mount('#app')
