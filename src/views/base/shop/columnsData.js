export const columnsData = (h, $this) => [{
  dataKey: 'title',
  title: '店铺名称',
  align: 'left',
  width: 310
}, {
  dataKey: 'shopLink',
  title: '店铺链接',
  align: 'left',
  width: 300,
  render: (h, scoped) => {
    return (<div class="link-open" onClick={() => /^https|http/.test(scoped.row.shopLink) ? window.open(scoped.row.shopLink) : window.open(`https://${scoped.row.shopLink}`)}>
      {scoped.row.shopLink}
    </div>)
  }
},
{
  dataKey: 'promotionCount',
  title: '当前活动数',
  align: 'left',
  render: (h, scoped) => {
    return (<div>
      {scoped.row.promotionCount}
    </div>)
  }
},
{
  dataKey: 'isValid',
  title: '监控状态',
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        <el-switch
          value={scoped.row.isValid}
          onchange={() => $this.switchChange(scoped)}
          active-value={1}
          inactive-value={0}
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div >
    )
  }
},
{
  dataKey: 'operate',
  title: '操作',
  width: 280,
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="operate-btn-group">
        <el-button style="padding-left:0" type="text" onClick={() => $this.configActivity(scoped)}>配置活动</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.activityManage(scoped)}>活动管理</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.editMoadl(scoped)}>编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.openDraw(scoped)}>查看</el-button>
      </div>
    )
  }
}]

export const columnsData2 = (h, $this) => [{
  type: 'selection',
  align: 'center',
  width: 45
}, {
  prop: 'title',
  label: '店铺名称',
  align: 'left',
  width: 310
}, {
  prop: 'shopLink',
  label: '店铺链接',
  align: 'left',
  width: 300,
  render: (h, scoped) => {
    return (<div class="link-open" onClick={() => /^https|http/.test(scoped.row.shopLink) ? window.open(scoped.row.shopLink) : window.open(`https://${scoped.row.shopLink}`)}>
      {scoped.row.shopLink}
    </div>)
  }
},
{
  prop: 'promotionCount',
  label: '当前活动数',
  align: 'left',
  render: (h, scoped) => {
    return (<div>
      {scoped.row.promotionCount}
    </div>)
  }
},
{
  prop: 'isValid',
  label: '监控状态',
  align: 'left',
  scopedSlots: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        <el-switch
          value={scoped.row.isValid}
          onchange={() => $this.switchChange(scoped)}
          active-value={1}
          inactive-value={0}
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div >
    )
  }
},
{
  prop: 'operate',
  label: '操作',
  width: 280,
  align: 'left',
  scopedSlots: (h, scoped) => {
    return (
      <div class="operate-btn-group">
        <el-button style="padding-left:0" type="text" onClick={() => $this.configActivity(scoped)}>配置活动</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.activityManage(scoped)}>活动管理</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.editMoadl(scoped)}>编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.openDraw(scoped)}>查看</el-button>
      </div>
    )
  }
}]
