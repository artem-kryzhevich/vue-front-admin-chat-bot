import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: DefaultLayout,
    redirect: '/users',
    children: [
      {
        path: '/users',
        name: 'Пользователи',
        component: () =>
          import('@/views/Users.vue'),
      },
      {
        path: '/channels',
        name: 'Каналы',
        component: () =>
            import('@/views/Channels.vue'),
      },
      {
        path: '/roles',
        name: 'Роли',
        component: () =>
            import('@/views/Roles.vue'),
      },
      {
        path: '/items',
        name: 'Товары',
        component: () =>
            import('@/views/Items.vue'),
      },
      {
        path: '/schedulers',
        name: 'Расписание',
        component: () =>
            import('@/views/Schedulers.vue'),
      },
      {
        path: '/notifications',
        name: 'Оповещения',
        component: () =>
            import('@/views/Notifications.vue'),
      },
      {
        path: '/content',
        name: 'Контент',
        component: () =>
            import('@/views/Content.vue'),
      },
      {
        path: '/payments-history',
        name: 'История оплат',
        component: () =>
            import('@/views/PaymentsHistory.vue'),
      },
      {
        path: '/categories',
        name: 'Категории',
        component: () =>
            import('@/views/Categories.vue'),
      },
    ],
  },
  {
    path: "/login",
    name: 'Авторизация',
    component: () =>
        import('@/views/Login.vue'),
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
