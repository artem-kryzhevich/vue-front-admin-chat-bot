import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: DefaultLayout,
    //redirect: '/home',
    children: [
      /*{
        path: '/home',
        name: 'Home',
        component: () =>
            import('@/views/'),
      },*/
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
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '/login',
        name: 'Авторизация',
        component: () =>
            import('@/views/Login.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PREFIX_BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
