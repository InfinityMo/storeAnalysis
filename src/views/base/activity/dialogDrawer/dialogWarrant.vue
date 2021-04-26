<template>
  <el-dialog :title="modalTitle"
             :top="offestTop"
             :destroy-on-close="true"
             :visible.sync="modalShow"
             width="926 px"
             :before-close="modalCancel">
    <standard-table :dataSource="tableData"
                    :columns="columns"
                    :pagination="PAGING"
                    :paginationLayout="['total', 'prev', 'pager', 'next']"
                    @tableChange="tableChange" />
  </el-dialog>
</template>
<script>
import { roleColumnsData } from '../columnsData'
import tableMixin from '@/mixins/dealTable'
export default {
  mixins: [tableMixin],
  props: {
    modalTitle: {
      type: String,
      required: true
    },
    offestTop: {
      type: String,
      default: '50px'
    },
    modalShow: {
      type: Boolean,
      required: true,
      default: false
    },
    viewId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      tableData: [{
        id: 1,
        roleName: '上传专员',
        roleRemark: '上传专员的角色说明'
      }],
      columns: roleColumnsData(this.$createElement, this)
    }
  },
  methods: {
    modalCancel () {
      this.$emit('viewModalCancel')
    },
    //
    toView (scoped) {
      const { row } = scoped
      this.viewShow = true
      this.$emit('openRoleDrawer', row.id, row.roleName)
    },
    // 授权
    warrant (scoped) {
      const { row } = scoped
      this.$emit('openWarrantDrawer', row.id, row.roleName)
    },
    // 表格分页的变化
    tableChange (changeParams) {
      this.PAGING.pageSize = changeParams.pageSize
      this.PAGING.pageNum = changeParams.pageNum
      this.getTableData()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
