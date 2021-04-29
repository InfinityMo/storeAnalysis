export const columnsData = (h, $this) => [{
  dataKey: 'linkName',
  title: '链接地址',
  align: 'left',
  width: 300,
  render: (h, scoped) => {
    return (<div class="link-open" onClick={() => window.open(scoped.row.linkName)}>
      {scoped.row.linkName}
    </div>)
  }
},
{
  dataKey: 'linkTitle',
  title: '商品标题',
  align: 'left',
  width: 480
},
{
  dataKey: 'isValid',
  title: '链接状态',
  align: 'left',
  render: (h, scoped) => {
    return (
      scoped.row.isValid === '1' ? <span class="link-valid">有效</span> : <span class="link-invalid">无效</span>
    )
  }
},
{
  dataKey: 'operate',
  title: '操作',
  width: 150,
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="operate-btn-group">
        <el-button style="padding-left:0" type="text" onClick={() => $this.configActivity(scoped)}>配置活动</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.openDraw(scoped)}>查看</el-button>
      </div>
    )
  }
}]
