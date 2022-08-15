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
  history: createWebHistory('/admin/'),
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
