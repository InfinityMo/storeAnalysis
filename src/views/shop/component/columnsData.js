export const columnsData = (h, $this) => [{
  dataKey: 'dateTime',
  title: '日期',
  align: 'left'
}, {
  dataKey: 'linkTitle',
  title: '商品名称',
  align: 'left',
  width: 300,
  render: (h, scoped) => {
    return (<div class="link-open span-text" onClick={() => $this.openDraw(scoped.row)}>
      {scoped.row.linkTitle}
    </div>)
  }
}, {
  dataKey: 'oriPrice',
  title: '原价',
  align: 'right'
},
{
  dataKey: 'discountedPrice',
  title: '折扣价',
  align: 'right'
},
{
  dataKey: 'deposit',
  title: '定金',
  align: 'right'
},
{
  dataKey: 'restPayment',
  title: '尾款',
  align: 'right'
},
{
  dataKey: 'preOrderCount',
  title: '预定销量',
  align: 'right'
},
{
  dataKey: 'soldCount',
  title: '销量',
  align: 'right'
},
{
  dataKey: 'categoryName',
  title: '类目',
  align: 'right'
},
{
  dataKey: 'promotionCount',
  title: '活动数量',
  align: 'right'
}
]
