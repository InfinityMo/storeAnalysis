export const columnsData = (h, $this) => [{
  dataKey: 'title',
  title: '店铺名称',
  align: 'left',
  width: 180
}, {
  dataKey: 'linkTitle',
  title: '商品名称',
  align: 'left',
  width: 450
}, {
  dataKey: 'linkName',
  title: '链接地址',
  align: 'left',
  render: (h, scoped) => {
    return (<div class="link-open" onClick={() => window.open(scoped.row.linkName)}>
      {scoped.row.linkName}
    </div>)
  }
},

{
  dataKey: 'isValid',
  title: '链接状态',
  align: 'left',
  width: 80,
  render: (h, scoped) => {
    return (
      scoped.row.isValid === 1 ? <span class="link-valid">在售</span> : <span class="link-invalid">已下架</span>
    )
  }
},
{
  dataKey: 'operate',
  title: '操作',
  width: 230,
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="operate-btn-group">
        <el-button style="padding-left:0" type="text" onClick={() => $this.configActivity(scoped)}>配置活动</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.activityManage(scoped)}>活动管理</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.openDraw(scoped)}>查看</el-button>
      </div>
    )
  }
}]
