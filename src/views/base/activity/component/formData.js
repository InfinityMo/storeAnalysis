export const modalForm = {
  activityName: '', // 活动名称
  start: '', // 开始时间
  end: '', // 结束时间
  timeRange: [], // 时间数组
  level: '', // 活动等级
  activityMemo: '' // 备注
}

export const modalFormRules = {
  activityName: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { pattern: /^\S(.*\S)?$/, message: '请输入正确的活动名称', trigger: 'blur' }
  ],
  timeRange: [
    { required: true, message: '请选择活动时间', trigger: 'change' }
  ],
  level: [
    { required: true, message: '请选择活动等级', trigger: 'change' }
  ],
  activityMemo: [
    { pattern: /^\S(.*\S)?$/, message: '请输入正确的备注', trigger: 'blur' }
  ]
}

export const editAitivityForm = {
  activityId: '', // 活动名称
  rules: '' // 玩法
}

export const editAitivityFormRules = {
  activityId: [
    { required: true, message: '请选择活动', trigger: 'change' }
  ],
  rules: [
    { pattern: /^\S(.*\S)?$/, message: '请输入正确的活动玩法', trigger: 'blur' }
  ]
}
