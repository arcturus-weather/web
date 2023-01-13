<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
    @show="init"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('map.select') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <!-- 地址输入 -->
        <q-input
          class="q-mb-md"
          outlined
          v-model="address"
          @keydown.enter.prevent="enter"
          :label="$t('map.placeholder')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>

          <q-menu
            v-model="displayList"
            max-width="300px"
            no-parent-event
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list>
              <q-item
                clickable
                @click="select(item)"
                v-close-popup
                v-for="(item, idx) in poiList"
                :key="idx"
              >
                <q-item-section>{{ item.address }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-input>
        <div ref="map" class="map" id="map"></div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('cacel')" color="primary" v-close-popup />
        <q-btn
          flat
          :label="$t('confirm')"
          color="primary"
          @click="confirm"
          :disable="!canConfirm"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'iceMap',
});
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { DrawQQMap } from '@utils/location/qqMap';
import { debounce } from '@utils/utils';
import { qqMap } from '@stores/stores';

let drawMap: DrawQQMap;

const map = ref<HTMLElement | null>(null),
  latitude = ref(0),
  longitude = ref(0),
  address = ref(''),
  city_ = ref(''),
  displayList = ref(false),
  canConfirm = ref(true),
  poiList = ref<Array<qqMapSuggestionsItem>>([]); // 搜索建议

const props = defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
  duration: {
    // 输入框防抖时长
    default: 500,
    type: Number,
  },
  lat: {
    default: 39.9087,
    type: Number,
  },
  lng: {
    default: 116.3974,
    type: Number,
  },
  addr: {
    type: String,
    default: '天安门',
  },
  city: {
    type: String,
    default: '北京市',
  },
});

const emit = defineEmits(['update:model-value', 'confirm']);

function init() {
  drawMap.init(map.value, props.lat, props.lng);
  latitude.value = props.lat;
  longitude.value = props.lng;
  address.value = props.addr;
  city_.value = props.city;
}

function confirm() {
  // 用户点击确认后将所选数据传给父组件
  emit('confirm', {
    latitude: latitude.value,
    longitude: longitude.value,
    city: city_.value,
    address: address.value,
  });
}

function getList(e: string | number | null) {
  const el = String(e);

  if (el !== '') {
    qqMap
      .searchSuggestions(el)
      .then((res) => {
        poiList.value = res as unknown as Array<qqMapSuggestionsItem>;
        displayList.value = true;
      })
      .catch(() => {
        poiList.value.length = 0; // 请求失败后置空
      });
  }
}

// 回车后获取地址
function enter() {
  getList(address.value);
}

function select(e: qqMapSuggestionsItem) {
  const {
    address: addr,
    city,
    location: { lat, lng },
  } = e;

  latitude.value = lat;
  longitude.value = lng;
  address.value = addr;
  city_.value = city;

  // 更新锚点
  drawMap.updateMaker(lat, lng);
  // 瞄点居中
  drawMap.setMakerCenter(lat, lng);
}

// 不能把 drawMap 写成 ref 否则会报错
// 'Failed to execute 'postMessage' on 'Worker': #<t> could not be cloned.'
drawMap = new DrawQQMap(
  debounce((res: IMapData) => {
    latitude.value = res.latitude;
    longitude.value = res.longitude;
    canConfirm.value = false;

    // 根据纬度获取详细地址
    qqMap
      .getLocationDetail(`${latitude.value},${longitude.value}`)
      .then((e: locationDetail) => {
        const {
          address: addr,
          address_component: { city: c },
        } = e;
        canConfirm.value = true;
        address.value = addr;
        city_.value = c;
      });
  }, 500)
);
</script>

<style lang="scss" scoped>
@mixin mdi($width: 300px, $screen: 600px) {
  @media screen and (max-width: $screen) {
    width: $width;
  }
}

.map {
  height: 250px;
  width: 500px;

  @include mdi();
  @include mdi(250px, 400px);
  @include mdi(200px, 300px);
}
</style>

