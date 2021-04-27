export const columnsData = (h, $this) => [{
  dataKey: 'activityName',
  title: '活动名称',
  align: 'left',
  width: 250
}, {
  dataKey: 'rule',
  title: '玩法',
  align: 'left',
  width: 320
},
{
  dataKey: 'activityStatus',
  title: '状态',
  align: 'left',
  render: (h, scoped) => {
    if (scoped.row.activityStatus === '1') {
      return <span class="activity-status orange">未开始</span>
    }
    if (scoped.row.activityStatus === '2') {
      return <span class="activity-status green">进行中</span>
    }
    if (scoped.row.activityStatus === '3') {
      return <span class="activity-status gray">已结束</span>
    }
  }
},
{
  dataKey: 'operate',
  title: '操作',
  width: 180,
  align: 'left',
  render: (h, scoped) => {
    return scoped.row.activityStatus === '1' || scoped.row.activityStatus === '2' ? (
      <div>
        <el-button type="text" onClick={() => $this.editMoadl(scoped)}>编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm popper-class="dialog-upper" onOnConfirm={() => $this.deleteHandle(scoped)} placement="top" title="确定删除吗？">
          <el-button type="text" slot="reference" >删除</el-button>
        </el-popconfirm>
      </div>
    ) : null
  }
}]
