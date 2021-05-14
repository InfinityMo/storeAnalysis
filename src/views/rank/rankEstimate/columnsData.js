export const columnsData = (h, $this) => [{
  dataKey: 'rank',
  title: '排名',
  width: 60,
  align: 'right'
}, {
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
  dataKey: 'preOrderCount',
  title: '预售销量',
  align: 'right'
},
{
  dataKey: 'preLinkCount',
  title: '预售链接数',
  align: 'right'
}, {
  dataKey: 'preOrderValue',
  title: '预售销售额',
  align: 'right'
},
{
  dataKey: 'promotionCount',
  title: '关联活动数',
  align: 'right'
}]
