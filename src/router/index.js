import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: DefaultLayout,
    redirect: '/statistics',
    children: [
      {
        path: '/users',
        name: 'Пользователи',
        component: () =>
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/Users.vue'),
          },
          {
            path: ':id',
            name: 'Пользователь',
            component: () =>
                import('@/views/CRUD/User.vue'),
          },
        ]
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
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/Roles.vue'),
          },
          {
            path: ':id',
            name: 'Роль',
            component: () =>
                import('@/views/CRUD/Role.vue'),
          },
        ]
      },
      {
        path: '/items',
        name: 'Товары',
        component: () =>
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/Items.vue'),
          },
          {
            path: ':id',
            name: 'Товар',
            component: () =>
                import('@/views/CRUD/Item.vue'),
          },
        ]
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
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/PaymentsHistory.vue'),
          },
          {
            path: ':id',
            name: 'История оплаты',
            component: () =>
                import('@/views/CRUD/PaymentHistory.vue'),
          },
          {
            path: 'user/:id',
            name: 'История оплаты пользователя',
            component: () =>
                import('@/views/CRUD/PaymentHistoryUser.vue'),
          },
        ]
      },
      {
        path: '/categories',
        name: 'Категории',
        component: () =>
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/Categories.vue'),
          },
          {
            path: ':id',
            name: 'Категория',
            component: () =>
                import('@/views/CRUD/Category.vue'),
          },
        ]
      },
      {
        path: '/statistics',
        name: 'Статистика',
        component: () =>
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/Statistics.vue'),
          },
        ]
      },
      {
        path: '/notify',
        name: 'Рассылка',
        component: () =>
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/Notify.vue'),
          },
        ]
      },
      {
        path: '/bot/info',
        name: 'Редактор бота',
        component: () =>
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/BotInfo.vue'),
          },
        ]
      },
      {
        path: '/event',
        name: 'Мероприятия',
        component: () =>
            import('@/views/LayoutCRUD/LayoutCRUD.vue'),
        children: [
          {
            path: '',
            name: '',
            component: () =>
                import('@/views/CRUD/Event.vue'),
          },
        ]
      },
    ],
  },
  {
    path: "/login",
    name: 'Авторизация',
    component: () =>
        import('@/views/Authenticate/Login.vue'),
  },
  {
    path: "/404",
    name: 'Страница не найдена',
    component: () =>
        import('@/views/pages/Page404.vue'),
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory('/' + process.env.VUE_APP_PREFIX_BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/404'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
