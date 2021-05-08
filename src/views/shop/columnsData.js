export const columnsData = (h, $this) => [{
  dataKey: 'shopTitle',
  title: '店铺名称',
  align: 'left',
  width: 300,
  render: (h, scoped) => {
    return (<div class="link-open span-text" onClick={() => $this.openNewtab(scoped)}>
      {scoped.row.shopTitle}
    </div>)
  }
}, {
  dataKey: 'shopSoldCount',
  title: '销量',
  align: 'right'
},
{
  dataKey: 'linkCount',
  title: '有效链接',
  align: 'right'
},
{
  dataKey: 'promotionCount',
  title: '关联活动数',
  align: 'right'
},
{
  dataKey: 'isValid',
  title: '监控状态',
  width: 200,
  align: 'right',
  render: (h, scoped) => {
    return (
      scoped.row.isValid ? <span class="link-valid">已监控</span> : <span class="link-invalid">未监控</span>
    )
  }
}]
