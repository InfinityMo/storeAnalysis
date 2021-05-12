export default [
  {
    id: '1',
    title: '基础信息配置',
    icon: 'icon-config-16',
    path: '/base',
    children: [{
      path: '/base/shop',
      title: '店铺配置'
    }, {
      path: '/base/link',
      title: '链接配置'
    }, {
      path: '/base/activity',
      title: '活动配置'
    }]
  },
  {
    id: '2',
    title: '店铺信息',
    icon: 'icon-shop-16',
    path: '/shop/shopInfo'
  },
  {
    id: '3',
    title: '特殊活动',
    icon: 'icon-rank-16',
    path: '/rank',
    children: [{
      path: '/rank/rankEstimate',
      title: '预订排行'
    }]
  }
]
