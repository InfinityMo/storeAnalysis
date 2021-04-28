export const columnsData = (h, $this) => [{
  dataKey: 'title',
  title: '店铺名称',
  align: 'left',
  width: 280,
  render: (h, scoped) => {
    return (<div class="link-open span-text" onClick={() => $this.openNewtab(scoped)}>
      {scoped.row.title}
    </div>)
  }
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
  dataKey: 'isValid',
  title: '监控状态',
  width: 100,
  align: 'left',
  render: (h, scoped) => {
    return (
      scoped.row.isValid === '1' ? <span class="link-valid">已监控</span> : <span class="link-invalid">未监控</span>
    )
  }
}]
