<template>
  <div>
    <standard-table :dataSource="tableData"
                    :paginationLayout="['total', 'prev', 'pager', 'next']"
                    :columns="columns"
                    :pagination="PAGING"
                    @tableChange="tableChange" />
    <Dialog dialogTitle="编辑活动"
            dialogWidth="574px"
            :dialogShow="dialogShow"
            @dialogCancel="dialogCancel"
            @dialogConfirm="dialogConfirm">
      <editAitivity slot="content"
                    ref="addContent"
                    :dataId="dataId"
                    :activityType="activityType"
                    :activityId="activityId" />
    </Dialog>
  </div>

</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { activityManageTableData } from '@/common/commonData/testDevData'
import { columnsData } from './columnsData.js'
import editAitivity from './editAitivity'
export default {
  mixins: [tableMixin],
  components: { editAitivity },
  props: {
    // shop或link的id
    dataId: {
      type: [String, Number],
      required: true
    },
    // 1是店铺，2是链接
    activityType: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      columns: columnsData(this.$createElement, this),
      tableData: activityManageTableData,
      dialogShow: false,
      activityId: ''
    }
  },
  methods: {
    dialogConfirm () {
      this.$refs.addContent.validForm().then(res => {
        if (res) {
          this.dialogShow = false
        }
      })
    },
    editMoadl (scoped) {
      const { row } = scoped
      this.activityId = row.activityId
      this.dialogShow = true
    },
    // moadl关闭
    dialogCancel () {
      this.dialogShow = false
    },
    deleteHandle () {

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
