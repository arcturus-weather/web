<template>
  <q-page class="page__container">
    <transition-group name="list" tag="div" class="row card__container">
      <div
        class="card col-12 col-sm-5 col-md-3 clickable"
        v-for="item in favorites"
        :key="`${item.latitude}-${item.longitude}`"
      >
        <div class="checkbox__container" @click.stop v-show="displayCheckBox">
          <q-checkbox
            class="ckeckbox"
            v-model="wantDelete"
            :val="item"
          ></q-checkbox>
        </div>
        <q-card flat bordered v-ripple.early @click="select(item)">
          <q-card-section class="q-pa-lg">
            <div class="ellipsis">{{ item.address }}</div>
            <div class="text-caption">{{ item.city }}</div>
          </q-card-section>
        </q-card>
      </div>
    </transition-group>

    <ice-map v-model="visible" @confirm="confirm"></ice-map>
    <q-page-sticky
      position="bottom-right"
      :offset="$q.screen.xs ? [18, 90] : [18, 18]"
    >
      <q-btn
        fab
        style="margin-right: 5px"
        :icon="displayCheckBox ? 'fa-solid fa-trash-can' : 'fa-solid fa-pen'"
        color="primary"
        @click="deleteFav"
      />

      <q-btn
        fab
        icon="fa-solid fa-plus"
        color="primary"
        @click="visible = true"
      />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FavoritesPage',
});
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import iceMap from 'src/components/ice-map.vue';
import { useRouter } from 'vue-router';
import { useUserStore, useLocationStore } from 'stores/stores';
const user = useUserStore();
const loc = useLocationStore();
const router = useRouter();

const visible = ref(false);
const favorites = ref<IMapData[]>([]); // 收藏列表
const wantDelete = ref<IMapData[]>([]); // 打算删除的收藏列表
const displayCheckBox = ref(false);

function confirm(e: IMapData) {
  user.addFavorite(e).then((res) => {
    favorites.value = res.favorites;
  });
}

function select(e: IMapData) {
  loc.changeLocation(e);

  // 修改地址后返回主页
  router.push('/home');
}

function deleteFav() {
  if (displayCheckBox.value) {
    // 只有要删除的收藏数不为 0 才发送请求
    if (wantDelete.value.length !== 0) {
      user.deleteFavorite(wantDelete.value).then((res) => {
        favorites.value = res.favorites;
        displayCheckBox.value = false;
        wantDelete.value.length = 0; // 删除后就清空
      });
    } else {
      displayCheckBox.value = false;
    }
  } else {
    displayCheckBox.value = true;
  }
}

onMounted(() => {
  user.favorites().then((res) => {
    favorites.value = res;
  });
});
</script>

<style lang="scss" scoped>
$page-padding: 15px;
.page__container {
  padding: $page-padding;

  .card {
    padding: 10px;
    position: relative;

    .checkbox__container {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 5;

      .ckeckbox {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
}

.card__container {
  position: relative;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>

