<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="店铺名称："
                        prop="title">
            <el-input v-model="queryFrom.title"
                      placeholder="请输入店铺名称"
                      autocomplete="off">
            </el-input>
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
        <h4>店铺列表</h4>
      </div>
      <standard-table :dataSource="tableData"
                      :columns="columns"
                      :pagination="PAGING"
                      @tableChange="tableChange" />
    </div>
    <Dialog :dialogTitle="dialogTitle"
            dialogWidth="574px"
            :dialogShow="dialogShow"
            @dialogCancel="dialogCancel"
            @dialogConfirm="dialogConfirm">
      <addEdit slot="content"
               ref="addContent"
               :addEditId="addEditId" />
    </Dialog>
    <Dialog dialogTitle="配置活动"
            dialogWidth="728px"
            :dialogShow="actDialogShow"
            @dialogCancel="actDialogCancel"
            @dialogConfirm="actDialogConfirm">
      <addActivity slot="content"
                   ref="actContent"
                   :addEditId="addEditId" />
    </Dialog>
    <Drawer :drawerTitle="drawerTitle"
            drawerWidth="856px"
            :drawerShow="drawerShow"
            @drawerClosed="drawerClosed">
      <shopDetails slot="content"
                   :addEditId="addEditId" />
    </Drawer>
  </div>
</template>
<script>
import { Base64 } from 'js-base64'
import tableMixin from '@/mixins/dealTable'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import { shopInfoTableData } from '@/common/commonData/testDevData'
import addEdit from './component/addEdit'
import addActivity from './component/addActivity'
import shopDetails from './component/shopDetails'

export default {
  mixins: [tableMixin],
  components: { addEdit, addActivity, shopDetails },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: shopInfoTableData,
      dialogTitle: '', // 弹窗的名称
      dialogShow: false,
      addEditId: '', // 编辑时存在id，新增时id为空
      actDialogShow: false,
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
      this.dialogTitle = '配置店铺'
      this.dialogShow = true
    },
    // 编辑
    editMoadl (scoped) {
      const { row } = scoped
      this.addEditId = row.shopId
      this.dialogTitle = '编辑店铺'
      this.dialogShow = true
    },
    // 查看
    openDraw (scoped) {
      const { row } = scoped
      this.addEditId = row.shopId
      this.drawerTitle = row.title
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
    configActivity () {
      this.actDialogShow = true
    },
    actDialogConfirm () {
      this.$refs.actContent.validForm().then(res => {
        if (res) {
          this.dialogShow = false
        }
      })
    },
    actDialogCancel () {
      this.actDialogShow = false
    },
    queryHandel () {
      this.queryFrom = {
        RowGuid: this.searchForm.RowGuid[0] || ''
      }
      this.getTableData()
    },
    openNewtab (scoped) {
      const { row } = scoped
      const routeUrl = this.$router.resolve({
        name: 'ShopData',
        query: {
          shopId: Base64.encode(row.shopId)
        }
      })
      window.open(routeUrl.href, '_blank')
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
