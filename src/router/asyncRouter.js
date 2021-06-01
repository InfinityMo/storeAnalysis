
// const routes = [
//   {
//     path: '/login',
//     name: 'Login',
//     meta: { title: '' },
//     component: () => import('@/views/login/index.vue')
//   },
//   {
//     path: '/',
//     name: 'Base',
//     meta: { title: '基础信息配置' },
//     component: baseLayout,
//     redirect: '/base/shop',
//     children: [
//       {
//         path: '/base/shop',
//         name: 'BaseShop',
//         meta: { title: '店铺配置' },
//         component: () => import('@/views/base/shop/index.vue')
//       },
//       {
//         path: '/base/link',
//         name: 'BaseLink',
//         meta: { title: '链接配置' },
//         component: () => import('@/views/base/link/index.vue')
//       },
//       {
//         path: '/base/activity',
//         name: 'BaseActivity',
//         meta: { title: '活动配置' },
//         component: () => import('@/views/base/activity/index.vue')
//       }
//     ]
//   },
//   {
//     path: '/shop',
//     name: 'Shop',
//     meta: { title: '' },
//     component: baseLayout,
//     redirect: '/shopInfo',
//     children: [
//       {
//         path: 'shopInfo',
//         name: 'ShopInfo',
//         meta: { title: '店铺信息' },
//         component: () => import('@/views/shop/index.vue')
//       }
//     ]
//   },
//   {
//     path: '/rank',
//     name: 'Rank',
//     meta: { title: '特殊活动' },
//     component: baseLayout,
//     redirect: '/rankEstimate',
//     children: [
//       {
//         path: 'rankEstimate',
//         name: 'RankEstimate',
//         meta: { title: '预订排行' },
//         component: () => import('@/views/rank/index.vue')
//       }
//     ]
//   },
//   {
//     path: '/shopTab',
//     name: 'ShopTab',
//     meta: { title: '' },
//     component: tabLayout,
//     children: [
//       {
//         path: 'shopData',
//         name: 'ShopData',
//         meta: { title: '店铺信息' },
//         component: () => import('@/views/shop/component/data.vue')
//       }
//     ]
//   }, {
//     path: '/rankTab',
//     name: 'RankTab',
//     meta: { title: '' },
//     component: tabLayout,
//     children: [
//       {
//         path: 'rankData',
//         name: 'RankData',
//         meta: { title: '预订排行' },
//         component: () => import('@/views/rank/component/data.vue')
//       }
//     ]
//   }, {
//     path: '/401',
//     name: 'forbidden',
//     component: () => import('@/views/401/index.vue')
//   },
//   {
//     path: '*',
//     name: 'None',
//     component: () => import('@/views/404/index.vue')
//   }
// ]
// eslint-disable-next-line no-unused-vars
// import baseLayout from '@/layouts/baseLayout'
// resolve => require(['@/components/' + c.component + ''], resolve)
const baseLayout = () => import('@/layouts/baseLayout')
// eslint-disable-next-line no-unused-vars
const rootRouter = {
  // name: '',
  // path: '',
  // meta: { title: '首页' },
  // component: baseLayout,
  // redirect: '/base/shop',
  // children: [{
  //   path: 'shopInfo',
  //   name: 'ShopInfo',
  //   meta: { title: '店铺信息' },
  //   component: () => import('@/views/shop/index.vue')
  // }
  // ]
}
// path: '/',
// name: 'Base',
// meta: { title: '基础信息配置' },
// component: baseLayout,
// redirect: '/base/shop',
// children: [
//   {
//     path: '/base/shop',
//     name: 'BaseShop',
//     meta: { title: '店铺配置' },
//     component: () => import('@/views/base/shop/index.vue')
//   }]
//   {
//     path: '/shop',
//     name: 'Shop',
//     meta: { title: '' },
//     component: baseLayout,
//     redirect: '/shopInfo',
//     children: [
//       {
//         path: 'shopInfo',
//         name: 'ShopInfo',
//         meta: { title: '店铺信息' },
//         component: () => import('@/views/shop/index.vue')
//       }
//     ]
//   },
export const generatorDynamicRouter = (menu) => {
  return new Promise((resolve, reject) => {
    const listMenu = menu.map(item => {
      return item.children ? {
        name: item.name,
        path: item.path,
        meta: { title: item.title },
        component: baseLayout,
        redirect: item.children[0].path,
        children: listChildren(item.children)
      }
        : {
          name: item.name,
          path: `/${item.path.split('/')[1]}`,
          meta: { title: item.title },
          component: baseLayout,
          redirect: `/${item.path.split('/')[2]}`,
          children: listChildren2(item)
        }
    })
    resolve(listMenu)
    // console.log(listMenu)
    // const menuNav = []
    // const childrenNav = []
    // //      后端数据, 根级树数组,  根级 PID
    // listToTree(result, childrenNav, 0)
    // rootRouter.children = childrenNav
    // menuNav.push(rootRouter)
    // console.log('menuNav', menuNav)
    // const routers = generator(menuNav)
    // routers.push(notFoundRouter)
    // console.log('routers', routers)
    // resolve(routers)
  })
}
//   {
//     path: '/rank',
//     name: 'Rank',
//     meta: { title: '特殊活动' },
//     component: baseLayout,
//     redirect: '/rankEstimate',
//     children: [
//       {
//         path: 'rankEstimate',
//         name: 'RankEstimate',
//         meta: { title: '预订排行' },
//         component: () => import('@/views/rank/index.vue')
//       }
//     ]
//   },
const listChildren = (childrenMenu) => {
  return childrenMenu.map(item => {
    return {
      path: item.path.split('/')[2],
      name: item.name,
      meta: { title: item.title },
      component: () => import('@/views' + item.path + '/index.vue')
      // component: resolve => require(['@/views' + item.path + '/index.vue'], resolve)
    }
  })
}
const listChildren2 = (item) => {
  return [{
    path: item.path.split('/')[2],
    name: item.name,
    meta: { title: item.title },
    component: () => import('@/views/' + item.path.split('/')[1] + '/index.vue')
    // component: resolve => require(['@/views' + item.path.split('/')[1] + '/index.vue'], resolve)
  }]
}
