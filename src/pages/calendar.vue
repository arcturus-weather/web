<template>
  <q-page class="row q-pa-md page__container">
    <div class="col-xs-12 col-sm-6 col-md-4 column items-center">
      <!-- 日历 -->
      <q-date
        flat
        bordered
        v-model="now"
        event-color="orange"
        :events="events"
        style="width: 100%"
      />
      <q-btn
        unelevated
        class="q-mt-md"
        color="primary"
        :loading="loading"
        :label="$t('checkin')"
        icon-right="fa-solid fa-award"
        @click="checkin"
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-8 q-pa-md timeline column">
      <div class="text-h5 text-center">{{ $t('checkinRecord') }}</div>
      <q-timeline
        color="secondary"
        :layout="$q.screen.lt.sm ? 'dense' : 'loose'"
        style="flex: 1"
      >
        <q-scroll-area
          :thumb-style="{
            width: '0',
          }"
          style="height: 100%"
        >
          <q-timeline-entry
            v-for="item in calendarList"
            :key="item.id"
            :title="item.location.address"
            :subtitle="$d(new Date(item.date), 'long')"
            icon="fa-solid fa-location-dot"
          >
            <q-card flat class="clickable" @click="openEditor(item)">
              <q-card-section class="q-pa-none row items-center">
                <span class="q-mr-xs">{{ item.weather.temperature }}°</span>
                <span class="q-mr-xs">{{ item.weather.description }},</span>
                <span class="q-mr-xs">
                  {{ $t('weather.aqi') }} {{ item.weather.aqi }}
                </span>
                <i-icon :name="item.weather.icon" :size="20"></i-icon>
              </q-card-section>
              <q-card-section class="q-px-none" v-if="item.daily">
                {{ item.daily }}
              </q-card-section>
            </q-card>
          </q-timeline-entry>
        </q-scroll-area>
      </q-timeline>
    </div>

    <ice-write-panel
      v-model="visible"
      @confirm="confirm"
      :origin="origin"
    ></ice-write-panel>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CaledarPage',
});
</script>

<script lang="ts" setup>
import { date } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { notify } from 'src/utils/utils';
import { useUserStore, useWeatherStore } from 'stores/stores';
import iceWritePanel from 'components/ice-write-panel.vue';
const { t } = useI18n();

const loading = ref(false);
const now = ref(date.formatDate(new Date(), 'YYYY/MM/DD'));

const user = useUserStore();

const visible = ref(false);

const origin = ref(''); // 编辑器原始内容

const recordId = ref(''); // 当前日记的 id

const calendarList = ref<ICheckInRes[]>([]);

const events = computed(() => {
  return calendarList.value.map((e) => {
    return date.formatDate(e.date, 'YYYY/MM/DD');
  });
});

function openEditor(e: ICheckInRes) {
  origin.value = e.daily ?? '';
  recordId.value = e.id;
  // 打开编辑器
  visible.value = true;
}

function confirm(e: string) {
  user.daily(recordId.value, e).then(() => {
    notify.positive(t('success.daily'));
    calendarList.value[0].daily = e;
  });
}

function checkin() {
  const weather = useWeatherStore();
  if (weather.local) {
    loading.value = true;
    // 这里写的好丑啊 o(TヘTo)
    const {
      location,
      now: {
        feelsLike: { day: feelsLike = 0 } = {},
        temperature: { day: temperature = 0 },
        icon,
        description,
        wind: { wind360, windSpeed },
        humidity = 0,
        pressure = 0,
        clouds = 0,
        visibility = 0,
        precip = 0,
      },
      air: { aqi },
    } = weather.local;

    const options = {
      location,
      weather: {
        temperature,
        feelsLike,
        icon,
        description,
        wind360,
        windSpeed,
        humidity,
        pressure,
        clouds,
        visibility,
        precip,
        aqi,
      },
    };

    user
      .checkin(options)
      .then((res: ICheckInRes) => {
        loading.value = false;
        notify.positive(t('success.checkin'));

        calendarList.value.unshift(res);
        recordId.value = res.id;
        visible.value = true;
      })
      .catch((err) => {
        if (typeof err === 'string') {
          notify.negative(t(err));
        }

        loading.value = false;
      });
  } else {
    notify.negative(t('waring.checkinFail'));
  }
}

onMounted(() => {
  user.calendar().then((res: ICheckInRes[]) => {
    calendarList.value = res.reverse();
  });
});
</script>

<style lang="scss" scoped>
.page__container {
  flex-direction: row-reverse;

  @media screen and (max-width: 600px) {
    padding-bottom: 72px; // 这是 tabbar 高度

    .timeline {
      height: calc(100vh - 547px);
    }
  }
}
</style>

