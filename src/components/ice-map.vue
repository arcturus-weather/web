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
        <div ref="map" class="map" id="map">
          <div
            class="input absolute-top"
            @click.stop
            @touchstart.stop
            @mousemove.stop
          >
            <!-- 地址输入 -->
            <q-input
              outlined
              v-model="address"
              @update:model-value="input"
              @keydown.enter.prevent="enter"
              bg-color="white"
              :label="$t('map.placeholder')"
            />
            <q-menu
              v-model="displayList"
              :max-width="maxWidth"
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
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('cacel')" color="primary" v-close-popup />
        <q-btn
          flat
          :label="$t('confirm')"
          color="primary"
          @click="confirm"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { DrawQQMap } from 'utils/location/qqMap';
import { debounce } from 'utils/utils';
import { qqMap } from 'stores/stores';

let drawMap: DrawQQMap;

export default defineComponent({
  name: 'iceMap',

  props: {
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
  },

  computed: {
    maxWidth() {
      const width = window.innerWidth;

      if (width > 600) {
        return '250px';
      } else if (width <= 600 && width > 400) {
        return '150px';
      } else if (width <= 400 && width > 300) {
        return '125px';
      } else {
        return '100px';
      }
    },
  },

  methods: {
    init() {
      drawMap.init(this.map, this.lat, this.lng);
      this.latitude = this.lat;
      this.longitude = this.lng;
      this.address = this.addr;
      this.city_ = this.city;
    },

    confirm() {
      // 用户点击确认后将所选数据传给父组件
      this.$emit('confirm', {
        latitude: this.latitude,
        longitude: this.longitude,
        city: this.city_,
        address: this.address,
      });
    },

    getList(e: string | number | null) {
      const el = String(e);

      if (el !== '') {
        qqMap
          .searchSuggestions(el)
          .then((res) => {
            this.poiList = res as unknown as Array<qqMapSuggestionsItem>;
            this.displayList = true;
          })
          .catch(() => {
            this.poiList.length = 0; // 请求失败后置空
          });
      }
    },

    input: debounce(function (e: string | number | null) {
      this.getList(e);
    }),

    enter() {
      // 如果存在数据的话, 回车键不需要再次请求
      // 因为输入的时候就发送过请求
      // 直接展示即可
      if (this.poiList.length !== 0) {
        this.displayList = true;
      } else {
        this.getList(this.address);
      }
    },

    select(e: qqMapSuggestionsItem) {
      const {
        address,
        city,
        location: { lat, lng },
      } = e;

      this.latitude = lat;
      this.longitude = lng;
      this.address = address;
      this.city_ = city;

      // 更新锚点
      drawMap.updateMaker(lat, lng);
      // 瞄点居中
      drawMap.setMakerCenter(lat, lng);
    },
  },

  emits: ['update:model-value', 'confirm'],

  setup() {
    const map = ref<HTMLElement | null>(null),
      latitude = ref(0),
      longitude = ref(0),
      address = ref(''),
      city_ = ref(''),
      displayList = ref(false),
      poiList = ref<Array<qqMapSuggestionsItem>>([]); // 搜索建议

    // 不能把 drawMap 写成 ref 否则会报错
    // 'Failed to execute 'postMessage' on 'Worker': #<t> could not be cloned.'
    drawMap = new DrawQQMap(
      debounce((res: IMapData) => {
        latitude.value = res.latitude;
        longitude.value = res.longitude;

        // 根据纬度获取详细地址
        qqMap
          .getLocationDetail(`${latitude.value},${longitude.value}`)
          .then((e: locationDetail) => {
            const {
              address: addr,
              address_component: { city: c },
            } = e;

            address.value = addr;
            city_.value = c;
          });
      }, 500)
    );

    return {
      map,
      latitude,
      city_,
      poiList,
      longitude,
      address,
      displayList,
    };
  },
});
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

  .input {
    width: 250px;
    top: 10px;
    left: 10px;
    z-index: 9999;

    @include mdi(150px, 600px);
    @include mdi(125px, 400px);
    @include mdi(100px, 300px);
  }
}
</style>

