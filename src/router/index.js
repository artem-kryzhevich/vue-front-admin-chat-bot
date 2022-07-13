import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/users',
    children: [
      {
        path: '/users',
        name: 'Users',
        component: () =>
          import('@/views/Users.vue'),
      },
      {
        path: '/channels',
        name: 'Channels',
        component: () =>
            import('@/views/Channels.vue'),
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () =>
            import('@/views/Roles.vue'),
      },
      {
        path: '/items',
        name: 'Items',
        component: () =>
            import('@/views/Items.vue'),
      },
      {
        path: '/schedulers',
        name: 'Schedulers',
        component: () =>
            import('@/views/Schedulers.vue'),
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: () =>
            import('@/views/Notifications.vue'),
      },
      {
        path: '/content',
        name: 'Content',
        component: () =>
            import('@/views/Content.vue'),
      },
      {
        path: '/payment-history',
        name: 'PaymentHistory',
        component: () =>
            import('@/views/PaymentHistory.vue'),
      },
      {
        path: '/categories',
        name: 'Categories',
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
        name: 'Login',
        component: () =>
            import('@/views/Login.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
