export default [
  {
    pId: '1',
    pTitle: '基础信息配置',
    icon: 'icon-config-16',
    pPath: '/base',
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
    pId: '2',
    pTitle: '店铺信息',
    icon: 'icon-shop-16',
    pPath: '/shop/shopInfo'
  },
  {
    pId: '3',
    pTitle: '特殊活动',
    icon: 'icon-rank-16',
    pPath: '/rank',
    children: [{
      path: '/rank/rankEstimate',
      title: '预订排行'
    }]
  }
]
