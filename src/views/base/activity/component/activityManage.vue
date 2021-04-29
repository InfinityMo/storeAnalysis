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
                    v-if="dialogShow"
                    :dataId="dataId"
                    :activityType="activityType"
                    :activityId="activityId"
                    :modalForm="modalForm" />
    </Dialog>
  </div>

</template>
<script>
import tableMixin from '@/mixins/dealTable'
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
      tableData: [],
      dialogShow: false,
      activityId: '',
      modalForm: {}
    }
  },
  created () {
    if (this.dataId) {
      this.getTableData()
    }
  },
  methods: {
    getTableData () {
      const searchForm = {
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }
      if (this.activityType === '1') {
        searchForm.shopId = this.dataId
      } else {
        searchForm.linkId = this.dataId
      }
      const url = this.activityType === '1' ? '/shopconfig/getshoppromotion' : '/linkconfig/getlinkpromotion'
      this.$request.post(url, searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
    },
    dialogConfirm () {
      this.$refs.addContent.validForm().then(res => {
        if (res) {
          this.getTableData()
          this.dialogShow = false
        }
      })
    },
    editMoadl (scoped) {
      const { row } = scoped
      this.activityId = row.activityId
      this.modalForm = { ...row }
      this.dialogShow = true
    },
    // moadl关闭
    dialogCancel () {
      this.dialogShow = false
    },
    deleteHandle (scoped) {
      const { row } = scoped
      let url = ''
      const deleteParams = {
        activityId: row.activityId
      }
      if (this.activityType === '1') {
        url = '/shopconfig/deleteshoppromotion'
        deleteParams.shopId = this.dataId
      } else {
        url = '/linkconfig/deletelinkpromotion'
        deleteParams.linkId = this.dataId
      }
      this.$request.post(url, deleteParams).then(res => {
        if (res) {
          this.$message.success('删除成功')
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
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
