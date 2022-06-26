<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'utils/mock';

import QWeatherStrategies from 'utils/weather/strategies/qweather';
import Weather from 'utils/weather/strategies/weather';
import Location from 'utils/location/location';

export default defineComponent({
  name: 'App',
  setup() {
    const qw = new QWeatherStrategies(process.env.qWeatherKeysss!);

    const w = new Weather(qw, 'qweather');

    const loc = new Location({
      latitude: 21,
      longitude: 110,
    });

    w.getAllweather(loc).then((res) => console.log(res));
  },
});
</script>
