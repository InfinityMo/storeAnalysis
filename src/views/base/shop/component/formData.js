export const modalForm = {
  title: '', // 店铺名称
  shopLink: '' // 店铺链接
}

export const modalFormRules = {
  title: [
    { required: true, message: '请输入店铺名称', trigger: 'blur' }
  ],
  shopLink: [
    { required: true, message: '请输入店铺链接', trigger: 'blur' }
  ]
}
