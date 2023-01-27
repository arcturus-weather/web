import { createApp } from 'vue';
import App from './app.vue';
import icon from '@packages';

const app = createApp(App);

app.use(icon).mount('#app');
