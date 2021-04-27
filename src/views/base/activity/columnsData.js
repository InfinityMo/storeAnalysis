export const columnsData = (h, $this) => [{
  dataKey: 'activityName',
  title: '活动名称',
  align: 'left',
  width: 240
}, {
  dataKey: 'level',
  title: '活动等级',
  align: 'left'
},
{
  dataKey: 'start',
  title: '开始时间',
  align: 'left'
},
{
  dataKey: 'end',
  title: '结束时间',
  align: 'left'
},
{
  dataKey: 'operate',
  title: '操作',
  width: 250,
  align: 'left',
  render: (h, scoped) => {
    return (
      <div>
        <el-button style="padding-left:0" type="text" onClick={() => $this.editMoadl(scoped)}>编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" onClick={() => $this.openDraw(scoped)}>查看</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm onOnConfirm={() => $this.deleteHandle(scoped)} placement="top" title="确定删除吗？">
          <el-button type="text" slot="reference" >删除</el-button>
        </el-popconfirm>
      </div>
    )
  }
}]
