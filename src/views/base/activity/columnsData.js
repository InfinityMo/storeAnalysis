export const columnsData = (h, $this) => [{
  dataKey: 'systemName',
  title: '系统名称',
  align: 'left',
  render: (h, scoped, row) => {
    return (
      <span class="view-title ell" onClick={() => $this.toView(scoped)}>{scoped.row.systemName}</span>
    )
  }
}, {
  dataKey: 'systemIdent',
  title: '系统标识',
  align: 'left'
}, {
  dataKey: 'systemDesc',
  title: '系统描述',
  align: 'left'
}, {
  dataKey: 'updateTime',
  title: '更新时间',
  align: 'left'
},
{
  dataKey: 'operate',
  title: '操作',
  width: 280,
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start flex-item-center">
        <span class="view-title operate-btn ell" style="padding-left:0" type="text" onClick={() => $this.editMoadl(scoped)}>编辑</span>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm onOnConfirm={() => $this.deleteHandle(scoped)} placement="top" title="确定删除吗？">
          <span class="view-title ell operate-btn" type="text" slot="reference" >删除</span>
        </el-popconfirm>
        <el-divider direction="vertical"></el-divider>
        <span class="view-title operate-btn ell" type="text" onClick={() => $this.roleEdit(scoped)}>角色编辑</span>
        <el-divider class="view-title ell" direction="vertical"></el-divider>
        <span class="view-title operate-btn ell" type="text" onClick={() => $this.warrant(scoped)}>角色授权</span>
      </div >
    )
  }
}]
// 角色授权表单
export const roleColumnsData = (h, $this) => [{
  dataKey: 'roleName',
  title: '角色名',
  align: 'left',
  width: 150,
  render: (h, scoped, row) => {
    return (
      <span class="view-title ell" onClick={() => $this.toView(scoped)}>{scoped.row.roleName}</span>
    )
  }
}, {
  dataKey: 'roleRemark',
  title: '说明',
  align: 'left'
},
{
  dataKey: 'operate',
  title: '操作',
  width: 80,
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start flex-item-center">
        <span class="view-title ell operate-btn" style="padding-left:0" type="text" onClick={() => $this.warrant(scoped)}>授权</span>
      </div>
    )
  }
}]
