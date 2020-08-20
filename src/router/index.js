import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/index.vue')
  },
  // User
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/user/info/:id',
    name: 'UserInfo',
    component: () => import('@/views/user/info.vue')
  },
  {
    path: '/user/add',
    name: 'UserAdd',
    component: () => import('@/views/user/edit.vue')
  },
  {
    path: '/user/edit/:id',
    name: 'UserEdit',
    component: () => import('@/views/user/edit.vue')
  },
  // Account
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/account/index.vue')
  },
  {
    path: '/account/info/:id',
    name: 'AccountInfo',
    component: () => import('@/views/account/info.vue')
  },
  {
    path: '/account/add',
    name: 'AccountAdd',
    component: () => import('@/views/account/edit.vue')
  },
  {
    path: '/account/edit/:id',
    name: 'AccountEdit',
    component: () => import('@/views/account/edit.vue')
  },
  // Record
  {
    path: '/record',
    name: 'Record',
    component: () => import('@/views/record/index.vue')
  },
  {
    path: '/record/info/:id',
    name: 'RecordInfo',
    component: () => import('@/views/record/info.vue')
  },
  {
    path: '/record/add',
    name: 'RecordAdd',
    component: () => import('@/views/record/edit.vue')
  },
  {
    path: '/record/edit/:id',
    name: 'RecordEdit',
    component: () => import('@/views/record/edit.vue')
  },
  {
    path: '/record/type',
    name: 'RecordType',
    component: () => import('@/views/record-type/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
