const roles = []
export const setRoles = (menu) => {
  return new Promise((resolve, reject) => {
    menu.forEach(item => {
      roles.push(item.name)
      // 特殊处理的字段，权限系统打通后更换方案
      if (item.name === 'shopInfo') {
        roles.push('shopTab', 'shopData')
      }
      if (item.name === 'rankEstimate') {
        roles.push('rankTab', 'rankData')
      }
      // eslint-disable-next-line no-unused-expressions
      item.children ? setRoles(item.children) : null
    })
    resolve(roles)
  })
}
