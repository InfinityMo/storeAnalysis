import { Table, TableColumn, Pagination } from 'element-ui'
import Operate from '@/common/components/standardTable/operate'
const tableAttrs = Object.keys(Object.assign({}, Table.props, TableColumn.props))
const pagingAttrs = Object.keys(Object.assign({}, Pagination.props))
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total,prev,pager,next,sizes,jumper'
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const paginationPageSize = this.$attrs.pagination ? this.$attrs.pagination.pageSize : 10
    return {
      pageChange: {
        pageNum: 1,
        pageSize: paginationPageSize
      }
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageChange.pageSize = pageSize
      // 页数大小发生变化时，手动将当前页设置为1
      this.pageChange.pageNum = 1
      this.$emit('tableChange', this.pageChange)
    },
    handleCurrentChange (pageNum) {
      this.pageChange.pageNum = pageNum
      this.$emit('tableChange', this.pageChange)
    },
    dealProp ($this) {
      const attrs = { ...$this.$attrs, ...$this.$props }
      const tablefilterProps = {}
      const pagingfilterProps = {}
      Object.keys(attrs).forEach(item => {
        if (tableAttrs.includes(item)) {
          tablefilterProps[item] = attrs[item]
        }
        if (pagingAttrs.includes(item)) {
          pagingfilterProps[item] = attrs[item]
        }
        if (item === 'pagination') {
          pagingfilterProps['page-size'] = attrs[item].pageSize || 10
          pagingfilterProps['current-page'] = attrs[item].pageNum || 1
          pagingfilterProps.total = attrs[item].total || 0
        }
      })
      return { tablefilterProps, pagingfilterProps }
    }
  },
  render () {
    const attrs = this.$attrs
    const props = this.dealProp(this)
    return (<div>
      <el-table {...{ attrs: props.tablefilterProps }} class="standard-table">
        {attrs.columns.map((item, index) => {
          const scopedSlots = {
            default: ({ row }) => {
              return item.scopedSlots ? <Operate render={item.scopedSlots} row={row} column={item}></Operate> : null
            }
          }
          return item.scopedSlots
            ? <el-table-column {...{ attrs: item }} scopedSlots={scopedSlots}></el-table-column>
            : <el-table-column {...{ attrs: item }} ></el-table-column>
        })}
      </el-table>
      <el-pagination
        class="pagination"
        {...{ attrs: props.pagingfilterProps }}
        onsize-change={this.handleSizeChange}
        oncurrent-change={this.handleCurrentChange}>
      </el-pagination>
    </div>)
  }
}
