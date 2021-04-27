<template>
  <div>
    <standard-table :dataSource="tableData"
                    :columns="columns"
                    :pagination="PAGING"
                    @tableChange="tableChange" />
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { activityTableData } from '@/common/commonData/testDevData'
import { columnsData } from './columnsData.js'
export default {
  mixins: [tableMixin],
  props: {
    dataId: {
      type: [String, Number],
      required: true
    },
    activityType: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      columns: columnsData(this.$createElement, this),
      tableData: activityTableData
    }
  },
  methods: {
    // 表格分页的变化
    tableChange (changeParams) {
      this.PAGING.pageSize = changeParams.pageSize
      this.PAGING.pageNum = changeParams.pageNum
      this.getTableData()
    }
  }
}
</script>
