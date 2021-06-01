// import baseLayout from '@/layouts/baseLayout'
import tabLayout from '@/layouts/tabLayout'
const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '' },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/shopTab',
    name: 'ShopTab',
    meta: { title: '' },
    component: tabLayout,
    redirect: '/shopTab/shopData',
    children: [
      {
        path: 'shopData',
        name: 'ShopData',
        meta: { title: '店铺信息' },
        component: () => import('@/views/shop/component/data.vue')
      }
    ]
  }, {
    path: '/rankTab',
    name: 'RankTab',
    meta: { title: '' },
    component: tabLayout,
    redirect: '/rankTab/rankData',
    children: [
      {
        path: 'rankData',
        name: 'RankData',
        meta: { title: '预订排行' },
        component: () => import('@/views/rank/rankEstimate/component/data.vue')
      }
    ]
  }, {
    path: '/401',
    name: 'forbidden',
    component: () => import('@/views/401/index.vue')
  }
  // {
  //   path: '*',
  //   name: 'None',
  //   component: () => import('@/views/404/index.vue')
  // }
]
export default routes
