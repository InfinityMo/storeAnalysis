import Vue from 'vue'
import VueRouter from 'vue-router'
import baseLayout from '@/layouts/baseLayout'
import tabLayout from '@/layouts/tabLayout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '' },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Base',
    meta: { title: '基础信息配置' },
    component: baseLayout,
    redirect: '/base/shop',
    children: [
      {
        path: '/base/shop',
        name: 'BaseShop',
        meta: { title: '店铺配置' },
        component: () => import('@/views/base/shop/index.vue')
      },
      {
        path: '/base/link',
        name: 'BaseLink',
        meta: { title: '链接配置' },
        component: () => import('@/views/base/link/index.vue')
      },
      {
        path: '/base/activity',
        name: 'BaseActivity',
        meta: { title: '活动配置' },
        component: () => import('@/views/base/activity/index.vue')
      }
    ]
  },
  {
    path: '/shop',
    name: 'Shop',
    meta: { title: '' },
    component: baseLayout,
    redirect: '/shopInfo',
    children: [
      {
        path: 'shopInfo',
        name: 'ShopInfo',
        meta: { title: '店铺信息' },
        component: () => import('@/views/shop/index.vue')
      }
    ]
  },
  {
    path: '/rank',
    name: 'Rank',
    meta: { title: '特殊活动' },
    component: baseLayout,
    redirect: '/rankEstimate',
    children: [
      {
        path: 'rankEstimate',
        name: 'RankEstimate',
        meta: { title: '预计排行' },
        component: () => import('@/views/rank/index.vue')
      }
    ]
  },
  {
    path: '/tab',
    name: 'Tab',
    meta: { title: '' },
    component: tabLayout,
    children: [
      {
        path: 'shopData',
        name: 'ShopData',
        meta: { title: '店铺信息' },
        component: () => import('@/views/shop/data.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'forbidden',
    component: () => import('@/views/401/index.vue')
  },
  {
    path: '*',
    name: 'None',
    component: () => import('@/views/404/index.vue')
  }
]

const router = new VueRouter({
  routes
})
// 捕获路由异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
