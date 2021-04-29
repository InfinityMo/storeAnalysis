<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="活动名称："
                        prop="activityId">
            <el-select v-model="queryFrom.activityId"
                       filterable
                       remote
                       placeholder="请输入活动名称"
                       :remote-method="remoteMethod">
              <el-option v-for="item in searchSelectOption"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="el-col-date">
          <el-form-item label="选择日期："
                        prop="timeRange">
            <el-date-picker v-model="queryFrom.timeRange"
                            :editable="false"
                            :clearable="false"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动等级："
                        prop="level">
            <el-select placeholder="请选择活动等级"
                       v-model="queryFrom.level">
              <el-option v-for="item in activityLevels"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="search-btn el-col-has-date">
          <el-form-item>
            <el-button @click="_resetForm('searchForm')">重置</el-button>
            <el-button type="primary"
                       @click="queryHandel">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table-wrap">
      <div class="flex-between-center table-info">
        <h4>活动列表</h4>
        <el-button type="primary"
                   class="flex-item-center"
                   @click="addHandle">
          <icon type="icon-add-white-14"
                :padding="[0,5,0,0]" />配置活动
        </el-button>
      </div>
      <standard-table :dataSource="tableData"
                      :columns="columns"
                      :pagination="PAGING"
                      @tableChange="tableChange" />
    </div>
    <Dialog :dialogTitle="dialogTitle"
            dialogWidth="598px"
            :dialogShow="dialogShow"
            @dialogCancel="dialogCancel"
            @dialogConfirm="dialogConfirm">
      <addEdit slot="content"
               ref="addContent"
               v-if="dialogShow"
               :addEditId="addEditId" />
    </Dialog>
    <Drawer :drawerTitle="drawerTitle"
            drawerWidth="856px"
            :drawerShow="drawerShow"
            @drawerClosed="drawerClosed">
      <activityDetails slot="content"
                       :addEditId="addEditId" />
    </Drawer>
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import addEdit from './component/addEdit'
import activityDetails from './component/activityDetails'
import { mapMutations } from 'vuex'
export default {
  mixins: [tableMixin],
  components: { addEdit, activityDetails },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: [],
      activityLevels: [], // 活动等级下拉数据
      dialogTitle: '', // 弹窗的名称
      dialogShow: false,
      addEditId: '', // 编辑时存在id，新增时id为空
      drawerShow: false,
      drawerTitle: '',
      allActivityOption: [], // 所有活动数据
      searchSelectOption: [] // 搜索候选数据源
    }
  },

  created () {
    this.getSelectData()
    this.getTableData() // 获取列表数据
  },
  mounted () {

  },
  methods: {
    ...mapMutations(['SETBASICMUTATION']),
    getSelectData () {
      Promise.all([
        this._fetchSelectData('/promotionconfig/dropdownlist', {
          type: '',
          optionalDict: { key: '0', value: 'all' }
        }),
        this._fetchSelectData('/promotionconfig/leveldropdownlist', {
          type: '',
          optionalDict: {}
        })
      ]).then(res => {
        this.allActivityOption = res[0]
        this.activityLevels = res[1]
        this.SETBASICMUTATION({ storeName: 'activityLevels', payload: this.activityLevels })
      })
    },
    getTableData () {
      const searchForm = {
        ...this.queryFrom,
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize,
        start: this.queryFrom.timeRange[0] || '',
        end: this.queryFrom.timeRange[1] || ''
      }
      delete searchForm.timeRange
      this.$request.post('/promotionconfig/promotionlist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
    },
    // 新增
    addHandle () {
      this.addEditId = ''
      this.dialogTitle = '配置活动'
      this.dialogShow = true
    },
    // 编辑
    editMoadl (scoped) {
      const { row } = scoped
      this.addEditId = row.activityId
      this.dialogTitle = '编辑活动'
      this.dialogShow = true
    },
    // 查看
    openDraw (scoped) {
      const { row } = scoped
      this.addEditId = row.activityId
      this.drawerTitle = row.activityName
      this.drawerShow = true
    },
    drawerClosed () {
      this.drawerShow = false
    },
    dialogConfirm () {
      this.$refs.addContent.validForm().then(res => {
        if (res) {
          this.getTableData()
          this.dialogShow = false
        }
      })
    },
    // moadl关闭
    dialogCancel () {
      this.dialogShow = false
    },
    queryHandel () {
      this._resetPageNum()
      this.getTableData()
    },
    deleteHandle (scoped) {
      const { row } = scoped
      this.$request.post('/promotionconfig/promotiondelete', { activityId: row.activityId }).then(res => {
        if (res) {
          this.$message.success('删除成功')
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.searchSelectOption = this.allActivityOption.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        })
      } else {
        this.searchSelectOption = []
      }
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
@import "~@/common/styles/page-table";
</style>
