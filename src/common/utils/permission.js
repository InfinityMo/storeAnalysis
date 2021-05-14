/*
function：全局路由拦截
author：Infinity
time：2020-8-17
*/
import router from '@/router/index'
import store from '@/store/index'

router.beforeEach((to, from, next) => {
  const whiteList = ['/login', '/401', '/403', '/404']
  // console.log(router)
  if (to.path === '/login') {
    // 进入首页时将loading取消
    store.commit('SETSPINNING', false)
    localStorage.removeItem(`${store.getters.getTrackId}userData`)
    sessionStorage.removeItem(`${store.getters.getTrackId}userData`)
    next()
    return
  }

  // const userData = JSON.parse(localStorage.getItem('userData')) || {}

  const userLoaclData = JSON.parse(localStorage.getItem(`${store.getters.getTrackId}userData`)) || {}
  const userSessionData = JSON.parse(sessionStorage.getItem(`${store.getters.getTrackId}userData`)) || {}
  if (Object.keys(userSessionData).length > 0 && Object.keys(userLoaclData).length > 0) {
    router.addRoutes(store.getters.asyncRouters)
    console.log(router)
    if (to.path === '/') {
      next(store.getters.menus[0].path)
      return
    }
    next()
  } else {
    next('/login')
  }
  if (whiteList.includes(to.path)) {
    next()
  }
})
