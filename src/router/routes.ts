import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/dashBoard.vue') },
      {
        path: '/about',
        component: () => import('pages/about.vue'),
      },
      {
        path: '/settings',
        component: () => import('pages/settings.vue'),
      },
      {
        path: '/calendar',
        component: () => import('pages/calendar.vue'),
      },
      {
        path: '/map',
        component: () => import('pages/map.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/NotFound.vue'),
  },
];

export default routes;