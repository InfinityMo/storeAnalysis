import Vue from 'vue'
import VueRouter from 'vue-router'
import baseLayout from '@/layouts/baseLayout'
import tabLayout from '@/layouts/tabLayout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '' },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/base',
    name: 'base',
    meta: { title: '基础信息配置' },
    component: baseLayout,
    redirect: '/base/shop',
    children: [
      {
        path: 'shop',
        name: 'baseShop',
        meta: { title: '店铺配置' },
        component: () => import('@/views/base/shop/index.vue')
      },
      {
        path: 'link',
        name: 'baseLink',
        meta: { title: '链接配置' },
        component: () => import('@/views/base/link/index.vue')
      },
      {
        path: 'activity',
        name: 'baseActivity',
        meta: { title: '活动配置' },
        component: () => import('@/views/base/activity/index.vue')
      }
    ]
  },
  {
    path: '/shop',
    name: 'shop',
    meta: { title: '' },
    component: baseLayout,
    redirect: '/shop/shopInfo',
    children: [
      {
        path: 'shopInfo',
        name: 'shopInfo',
        meta: { title: '店铺信息' },
        component: () => import('@/views/shop/index.vue')
      }
    ]
  },
  {
    path: '/rank',
    name: 'rank',
    meta: { title: '特殊活动' },
    component: baseLayout,
    redirect: '/rank/rankEstimate',
    children: [
      {
        path: 'rankEstimate',
        name: 'rankEstimate',
        meta: { title: '预订排行' },
        component: () => import('@/views/rank/rankEstimate/index.vue')
      }
    ]
  },
  {
    path: '/shopTab',
    name: 'shopTab',
    meta: { title: '' },
    component: tabLayout,
    redirect: '/shopTab/shopData',
    children: [
      {
        path: 'shopData',
        name: 'shopData',
        meta: { title: '店铺信息' },
        component: () => import('@/views/shop/component/data.vue')
      }
    ]
  }, {
    path: '/rankTab',
    name: 'rankTab',
    meta: { title: '' },
    component: tabLayout,
    redirect: '/rankTab/rankData',
    children: [
      {
        path: 'rankData',
        name: 'rankData',
        meta: { title: '预订排行' },
        component: () => import('@/views/rank/rankEstimate/component/data.vue')
      }
    ]
  }, {
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
