export const columnsData = (h, $this) => [{
  dataKey: 'staffName',
  title: '姓名',
  width: 190
}, {
  dataKey: 'staffId',
  title: '工号',
  width: 330
}, {
  dataKey: 'dept',
  title: '部门'
},
{
  dataKey: 'operate',
  title: '操作',
  width: 120,
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
