<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="活动名称："
                        prop="activityName">
            <el-input v-model="queryFrom.activityName"
                      placeholder="请输入活动名称"
                      autocomplete="off">
            </el-input>
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
              <el-option v-for="item in stateOptions"
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
import { stateOptions } from '@/common/commonData/baseData'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import { activityTableData } from '@/common/commonData/testDevData'
import addEdit from './component/addEdit'
import activityDetails from './component/activityDetails'

export default {
  mixins: [tableMixin],
  components: { addEdit, activityDetails },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: activityTableData,
      stateOptions: stateOptions, // 监控状态下拉数据
      dialogTitle: '', // 弹窗的名称
      dialogShow: false,
      addEditId: '', // 编辑时存在id，新增时id为空
      drawerShow: false,
      drawerTitle: ''
    }
  },
  created () {

    // this.getSelects()
  },
  mounted () {
    // this.getTableData() // 获取列表数据
  },
  methods: {
    getTableData () {
      this.$request.post('./')
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
          this.dialogShow = false
        }
      })
    },
    // moadl关闭
    dialogCancel () {
      this.dialogShow = false
    },
    queryHandel () {
      this.queryFrom = {
        RowGuid: this.searchForm.RowGuid[0] || ''
      }
      this.getTableData()
    },
    // 开关事件
    switchChange (scoped) {
      //  const { row } = scoped
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
