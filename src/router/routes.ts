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
        path: '/favorites',
        component: () => import('src/pages/favorites.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/notFound.vue'),
  },
];

export default routes;
