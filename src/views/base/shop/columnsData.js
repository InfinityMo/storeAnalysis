export const columnsData = (h, $this) => [{
  dataKey: 'title',
  title: '店铺名称',
  align: 'left',
  width: 240
}, {
  dataKey: 'shopLink',
  title: '店铺链接',
  align: 'left',
  render: (h, scoped) => {
    return (<div class="link-open" onClick={() => window.open(scoped.row.shopLink)}>
      {scoped.row.shopLink}
    </div>)
  }
},
{
  dataKey: 'activity',
  title: '当前活动数',
  align: 'left',
  render: (h, scoped) => {
    return (<div>
      {scoped.row.activity.length}
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
          active-value="1"
          inactive-value="0"
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div>
    )
  }
},
{
  dataKey: 'operate',
  title: '操作',
  width: 360,
  align: 'left',
  render: (h, scoped) => {
    return (
      <div>
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
