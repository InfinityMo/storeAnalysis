<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="店铺名称："
                        prop="shopId">
            <!-- <el-input v-model="queryFrom. shopId"
                      placeholder="请输入店铺名称"
                      autocomplete="off">
            </el-input> -->
            <el-select v-model="queryFrom.shopId"
                       filterable
                       remote
                       placeholder="请输入店铺名称"
                       :remote-method="remoteMethod">
              <el-option v-for="item in searchSelectOption"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品标题："
                        prop="linkId">
            <!-- <el-select placeholder="请选择商品标题"
                       v-model="queryFrom.linkId">
              <el-option v-for="item in stateOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select> -->
            <el-select v-model="queryFrom.linkId"
                       filterable
                       remote
                       placeholder="请选择商品标题"
                       :remote-method="remoteLinkMethod">
              <el-option v-for="item in linkSearchSelectOption"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="链接状态："
                        prop="isValid">
            <el-select placeholder="请选择链接状态"
                       v-model="queryFrom.isValid">
              <el-option v-for="item in stateOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="search-btn">
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
        <h4>链接列表</h4>
      </div>
      <standard-table :dataSource="tableData"
                      :columns="columns"
                      :pagination="PAGING"
                      @tableChange="tableChange" />
    </div>
    <Dialog dialogTitle="配置活动"
            dialogWidth="728px"
            :dialogShow="actDialogShow"
            @dialogCancel="actDialogCancel"
            @dialogConfirm="actDialogConfirm">
      <addActivity slot="content"
                   ref="actContent"
                   :addEditId="addEditId" />
    </Dialog>
    <Dialog dialogTitle="管理活动"
            dialogWidth="930px"
            :isShowFooter="false"
            :dialogShow="manageDialogShow"
            @dialogCancel="manageDialogCancel">
      <activityManage slot="content"
                      activityType="2"
                      v-if="manageDialogShow"
                      :dataId="addEditId" />
    </Dialog>
    <Drawer :drawerTitle="drawerTitle"
            drawerWidth="856px"
            :drawerShow="drawerShow"
            @drawerClosed="drawerClosed">
      <linkDetails slot="content"
                   :addEditId="addEditId" />
    </Drawer>
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { linkStateOptions } from '@/common/commonData/baseData'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import addActivity from './component/addActivity'
import activityManage from '../activity/component/activityManage'
import linkDetails from './component/linkDetails'

export default {
  mixins: [tableMixin],
  components: { addActivity, activityManage, linkDetails },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: [],
      stateOptions: linkStateOptions, // 监控状态下拉数据
      dialogTitle: '', // 弹窗的名称
      dialogShow: false,
      addEditId: '', // 编辑时存在id，新增时id为空
      actDialogShow: false,
      manageDialogShow: false,
      drawerShow: false,
      drawerTitle: '',
      searchSelectOption: [],
      allShopOption: [],
      allLinkOption: [],
      linkSearchSelectOption: []
    }
  },
  created () {
    this.getSelectData()
    this.getTableData() // 获取列表数据
  },

  methods: {
    getSelectData () {
      Promise.all([
        this._fetchSelectData('2', {}),
        this._fetchSelectData('2', {})
      ]).then(res => {
        this.allShopOption = res[0]
        this.allLinkOption = res[1]
      })
    },
    getTableData () {
      const searchForm = {
        ...this.queryFrom,
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }
      delete searchForm.timeRange
      this.$request.post('/linkconfig/linklist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
    },
    // 查看
    openDraw (scoped) {
      const { row } = scoped
      this.addEditId = row.linkId
      this.drawerTitle = row.linkTitle
      this.drawerShow = true
    },
    drawerClosed () {
      this.drawerShow = false
    },
    configActivity (scoped) {
      const { row } = scoped
      this.addEditId = row.linkId
      this.actDialogShow = true
    },
    actDialogConfirm () {
      this.$refs.actContent.validForm().then(res => {
        if (res) {
          this.getTableData()
          this.actDialogShow = false
        }
      })
    },
    actDialogCancel () {
      this.actDialogShow = false
    },
    activityManage (scoped) {
      const { row } = scoped
      this.manageDialogShow = true
      this.addEditId = row.linkId
    },
    manageDialogCancel () {
      this.manageDialogShow = false
    },
    queryHandel () {
      this._resetPageNum()
      this.getTableData()
    },
    remoteMethod (query) {
      if (query !== '') {
        this.searchSelectOption = this.allShopOption.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        })
      } else {
        this.searchSelectOption = []
      }
    },
    remoteLinkMethod (query) {
      if (query !== '') {
        this.linkSearchSelectOption = this.allLinkOption.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        })
      } else {
        this.linkSearchSelectOption = []
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
