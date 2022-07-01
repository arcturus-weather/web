import iceWeather from 'iweather_icons';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  app.use(iceWeather);
});
