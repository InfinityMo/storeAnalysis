export const columnsData = (h, $this) => [{
  dataKey: 'shopName',
  title: '店铺名称',
  align: 'left',
  width: 240
}, {
  dataKey: 'shopUrl',
  title: '店铺链接',
  align: 'left'
},
{
  dataKey: 'operate',
  title: '操作',
  width: 120,
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
