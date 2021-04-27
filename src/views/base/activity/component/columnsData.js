export const columnsData = (h, $this) => [{
  dataKey: 'title',
  title: '活动名称',
  align: 'left',
  width: 240
}, {
  dataKey: 'rule',
  title: '玩法',
  align: 'left'
},
{
  dataKey: 'activityStatus',
  title: '状态',
  align: 'left',
  render: (h, scoped) => {
    return (<div>
      {scoped.row.activity.length}
    </div>)
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
        <el-button type="text" onClick={() => $this.editMoadl(scoped)}>编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm onOnConfirm={() => $this.deleteHandle(scoped)} placement="top" title="确定删除吗？">
          <el-button type="text" slot="reference" >删除</el-button>
        </el-popconfirm>
      </div>
    )
  }
}]
