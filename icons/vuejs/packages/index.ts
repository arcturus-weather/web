import icon from './icon.vue';
import type { App } from 'vue';

export default {
  install: (app: App) => {
    app.component('i-icon', icon);
  },
};

export { icon };
