export const columnsData = (h, $this) => [{
  dataKey: 'menuName',
  title: '菜单',
  align: 'left',
  width: 200,
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        {scoped.row.menuName}
      </div>
    )
  }
}, {
  dataKey: 'view',
  title: '查看',
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        <el-switch
          value={scoped.row.view}
          onchange={() => $this.switchChange(scoped, 'view')}
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div>
    )
  }
}, {
  dataKey: 'edit',
  title: '编辑',
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        <el-switch
          value={scoped.row.edit}
          onchange={() => $this.switchChange(scoped, 'edit')}
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div>
    )
  }
}, {
  dataKey: 'upload',
  title: '上传',
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        <el-switch
          value={scoped.row.upload}
          onchange={() => $this.switchChange(scoped, 'upload')}
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div>
    )
  }
}, {
  dataKey: 'downLoad',
  title: '下载',
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        <el-switch
          value={scoped.row.downLoad}
          onchange={() => $this.switchChange(scoped, 'downLoad')}
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div>
    )
  }
}, {
  dataKey: 'add',
  title: '新增',
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        <el-switch
          value={scoped.row.add}
          onchange={() => $this.switchChange(scoped, 'add')}
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div>
    )
  }
}, {
  dataKey: 'delete',
  title: '删除',
  align: 'left',
  render: (h, scoped) => {
    return (
      <div class="flex-justify-start">
        <el-switch
          value={scoped.row.delete}
          onchange={() => $this.switchChange(scoped, 'delete')}
          active-color="#2BB8BD"
          inactive-color="#dcdfe6">
        </el-switch>
      </div>
    )
  }
}]
