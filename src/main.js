/***********************
 *         vue         *
 **********************/
import Vue from 'vue';
import App from './App.vue';

/***********************
 *      my custom      *
 **********************/
import './utils/time'; // 时间格式化
// import './utils/mock'; // 请求劫持

/***********************
 *     element-ui      *
 **********************/
import 'element-ui/lib/theme-chalk/index.css';
import {
  Button,
  Icon,
  Row,
  Col,
  Container,
  Aside,
  Main,
  Dialog,
  Autocomplete,
  Input,
  Alert,
  Tag,
  Card,
  Carousel,
  CarouselItem,
  Progress,
  Message,
  Loading,
} from 'element-ui';

Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Card);
Vue.use(Alert);
Vue.use(Progress);
Vue.use(Tag);
Vue.use(Container);
Vue.use(Autocomplete);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Input);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;

/***********************
 *        pinia        *
 **********************/
import { createPinia, PiniaVuePlugin } from 'pinia';
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

/***********************
 *       echart       *
 **********************/
import echarts from './plugins/echarts';
Vue.prototype.$echarts = echarts;

/***********************
 *    创建 vue 实例     *
 **********************/
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  pinia,
  render: h => h(App),
});
