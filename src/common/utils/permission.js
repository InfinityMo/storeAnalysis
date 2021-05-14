/*
function：全局路由拦截
author：Infinity
time：2020-8-17
*/
import router from '@/router/index'
import store from '@/store/index'

router.beforeEach((to, from, next) => {
  const whiteList = ['/401', '/403', '/404']

  if (to.path === '/login') {
    // 进入首页时将loading取消
    store.commit('SETSPINNING', false)
    next()
    return
  }
  if (whiteList.includes(to.path)) {
    next()
    return
  }
  const userLoaclData = JSON.parse(localStorage.getItem(`${store.getters.getTrackId}userData`)) || {}
  const userSessionData = JSON.parse(sessionStorage.getItem(`${store.getters.getTrackId}userData`)) || {}
  if (Object.keys(userSessionData).length > 0 && Object.keys(userLoaclData).length > 0) {
    store.getters.roles.includes(to.name) ? next() : next('/401')
  } else {
    next('/login')
  }
})
