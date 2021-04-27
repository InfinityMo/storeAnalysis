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
        <el-col :span="8">
          <el-form-item label="商品标题："
                        prop="linkName">
            <el-select placeholder="请选择商品标题"
                       v-model="queryFrom.linkName">
              <el-option v-for="item in stateOptions"
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
import { stateOptions } from '@/common/commonData/baseData'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import { linkTableData } from '@/common/commonData/testDevData'
import addActivity from './component/addActivity'
import linkDetails from './component/linkDetails'

export default {
  mixins: [tableMixin],
  components: { addActivity, linkDetails },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: linkTableData,
      stateOptions: stateOptions, // 监控状态下拉数据
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
