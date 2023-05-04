import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/layout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/dashBoard.vue'),
        alias: '/home',
      },
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
        meta: { requiresAuth: true },
      },
      {
        path: '/favorites',
        component: () => import('src/pages/favorites.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/notFound.vue'),
  },

  {
    path: '/login',
    component: () => import('src/pages/login.vue'),
  },
  {
    path: '/reset',
    component: () => import('src/pages/reset.vue'),
  },
];

export default routes;
