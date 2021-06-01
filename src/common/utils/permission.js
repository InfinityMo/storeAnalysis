/*
function：全局路由拦截
author：Infinity
time：2020-8-17
*/
import router from '@/router/index'
// eslint-disable-next-line no-unused-vars
import store from '@/store/index'

router.beforeEach((to, from, next) => {
  // debugger
  const whiteList = ['/login', '/401', '/403', '/404']
  if (to.path === '/login') {
    // 进入首页时将loading取消
    store.commit('SETSPINNING', false)
    localStorage.removeItem(`${store.getters.getTrackId}userData`)
    sessionStorage.removeItem(`${store.getters.getTrackId}userData`)
    next()
    return
  }
  // // if (store.getters.asyncRouters.length === 0) {

  // // } else {
  // //   next()
  // // }
  // // console.log(store.getters.asyncRouters)
  // // const userData = JSON.parse(localStorage.getItem('userData')) || {}
  const userLoaclData = JSON.parse(localStorage.getItem(`${store.getters.getTrackId}userData`)) || {}
  const userSessionData = JSON.parse(sessionStorage.getItem(`${store.getters.getTrackId}userData`)) || {}
  if (Object.keys(userSessionData).length > 0 && Object.keys(userLoaclData).length > 0) {
    if (store.getters.dynamicRouters.length === 0) {
      // store.commit('SETROUTER')
      // console.log(store.getters.dynamicRouters)
      store.dispatch('setRouter').then(() => {
        router.addRoutes(store.getters.dynamicRouters)
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          // set the replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
        } else {
          // 跳转到目的路由
          next({ path: redirect, replace: true })
        }
      })
      // store.dispatch('setRouter').then(res => {
      //   router.addRoutes(store.getters.dynamicRouters)
      // })
      // router.addRoutes(store.getters.dynamicRouters)
      // console.log(router)
    } else {
      if (to.path === '/') {
        next(store.getters.menus[0].path)
        return
      }
      next()
    }

    // 请求带有 redirect 重定向时，登录自动重定向到该地址
    // const redirect = decodeURIComponent(from.query.redirect || to.path)
    // debugger
    // next({ path: redirect })
    // if (to.path === redirect) {
    //   // set the replace: true so the navigation will not leave a history record
    //   next({ ...to })
    // } else {
    //   // 跳转到目的路由
    //   next({ path: redirect })
    // }
    // next()
  } else {
    next('/login')
    // router.addRoutes(store.getters.asyncRouters)
    // // 请求带有 redirect 重定向时，登录自动重定向到该地址
    // const redirect = decodeURIComponent(from.query.redirect || to.path)
    // if (to.path === redirect) {
    //   // set the replace: true so the navigation will not leave a history record
    //   next({ ...to, replace: true })
    // } else {
    //   // 跳转到目的路由
    //   next({ path: redirect })
    // }
    // next('/login')
  }
  if (whiteList.includes(to.path)) {
    next()
  }
})
