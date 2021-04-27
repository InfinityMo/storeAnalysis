export const columnsData = (h, $this) => [{
  dataKey: 'title',
  title: '店铺名称',
  align: 'left',
  width: 240
}, {
  dataKey: 'saleValue',
  title: '销量',
  align: 'right'
},
{
  dataKey: 'linkNum',
  title: '有效链接',
  align: 'right'
},
{
  dataKey: 'activityNum',
  title: '关联活动数',
  align: 'right'
},
{
  dataKey: 'operate',
  title: '操作',
  width: 250,
  align: 'left',
  render: (h, scoped) => {
    return (
      <div>
        <el-button style="padding-left:0" type="text" onClick={() => $this.configActivity(scoped)}>配置活动</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.editMoadl(scoped)}>编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.openDraw(scoped)}>查看</el-button>
      </div>
    )
  }
}]
