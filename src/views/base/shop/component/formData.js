export const modalForm = {
  title: '', // 店铺名称
  shopId: '', // 店铺id
  shopLink: '' // 店铺链接
}

export const modalFormRules = {
  title: [
    { required: true, message: '请输入店铺名称', trigger: 'blur' },
    { pattern: /^\S(.*\S)?$/, message: '请输入正确的店铺名称', trigger: 'blur' }
  ],
  shopId: [
    { required: true, message: '请输入店铺Id', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: '请输入正确的店铺Id', trigger: 'blur' }
  ],
  shopLink: [
    { required: true, message: '请输入店铺链接', trigger: 'blur' },
    { pattern: /(?:).(?:tmall|taobao).(?:com|hk)/, message: '请填写正确的店铺链接', trigger: 'blur' }
  ]
}
