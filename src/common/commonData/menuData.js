export default [
  {
    pId: '1',
    pTitle: '基础信息配置',
    icon: 'icon-information-16',
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
    }
    ]
  },
  {
    pId: '2',
    pTitle: '店铺信息',
    icon: 'icon-staff-16',
    pPath: '/shop/shopInfo'
  },
  {
    pId: '3',
    pTitle: '预计排行',
    icon: 'icon-dept-16',
    pPath: '/rank/rankEstimate'
  }
]
