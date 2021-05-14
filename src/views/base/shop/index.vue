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
          <el-form-item label="监控状态："
                        prop="isValid">
            <el-select placeholder="请选择店铺监控状态"
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
        <h4>店铺列表</h4>
        <el-button type="primary"
                   class="flex-item-center"
                   @click="addHandle">
          <icon type="icon-add-white-14"
                :padding="[0,5,0,0]" />配置店铺
        </el-button>
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
      <addEdit v-if="dialogShow"
               slot="content"
               ref="addContent"
               :addEditId="addEditId" />
    </Dialog>
    <Dialog dialogTitle="配置活动"
            dialogWidth="728px"
            :dialogShow="actDialogShow"
            @dialogCancel="actDialogCancel"
            @dialogConfirm="actDialogConfirm">
      <addActivity v-if="actDialogShow"
                   slot="content"
                   ref="actContent"
                   :addEditId="addEditId" />
    </Dialog>
    <Dialog dialogTitle="管理活动"
            dialogWidth="930px"
            :isShowFooter="false"
            :dialogShow="manageDialogShow"
            @dialogCancel="manageDialogCancel">
      <activityManage v-if="manageDialogShow"
                      slot="content"
                      activityType="1"
                      :dataId="addEditId" />
    </Dialog>
    <Drawer :drawerTitle="drawerTitle"
            drawerWidth="856px"
            :drawerShow="drawerShow"
            @drawerClosed="drawerClosed">
      <shopDetails v-if="drawerShow"
                   slot="content"
                   :addEditId="addEditId" />
    </Drawer>
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { stateOptions } from '@/common/commonData/baseData'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import addEdit from './component/addEdit'
import addActivity from './component/addActivity'
import shopDetails from './component/shopDetails'
import activityManage from '../activity/component/activityManage'
export default {
  mixins: [tableMixin],
  components: { addEdit, addActivity, shopDetails, activityManage },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: [],
      stateOptions: stateOptions, // 监控状态下拉数据
      dialogTitle: '', // 弹窗的名称
      dialogShow: false,
      addEditId: '', // 编辑时存在id，新增时id为空
      manageDialogShow: false,
      actDialogShow: false,
      drawerShow: false,
      drawerTitle: '',
      allShopOption: [], // 所有店铺数据
      searchSelectOption: [] // 搜索候选数据源
    }
  },
  created () {
    this.getSelectData()
    this.getTableData() // 获取列表数据
  },
  mounted () {
    // this.getTableData() // 获取列表数据
  },
  methods: {
    getSelectData () {
      Promise.all([
        this._fetchSelectData('1')
      ]).then(res => {
        this.allShopOption = res[0]
      })
    },
    getTableData () {
      const searchForm = {
        ...this.queryFrom,
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }
      // delete searchForm.timeRange
      this.$request.post('/shopconfig/shoplist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
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
          this.getTableData()
          this.getSelectData()
          this.dialogShow = false
        }
      })
    },
    // moadl关闭
    dialogCancel () {
      this.dialogShow = false
    },
    configActivity (scoped) {
      const { row } = scoped
      this.addEditId = row.shopId
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
      this.addEditId = row.shopId
    },
    manageDialogCancel () {
      this.getTableData()
      this.manageDialogShow = false
    },
    queryHandel () {
      this._resetPageNum()
      this.getTableData()
    },
    // 开关事件
    switchChange (scoped) {
      const { row } = scoped
      if (row.isValid === 0) {
        this.$confirm('打开监控需要等待一天才能看到数据，是否打开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/shopconfig/changestatus', { shopId: row.shopId, isValid: row.isValid }).then(res => {
            if (res.errorCode === 1) {
              this.$message.success('操作成功')
              this.getTableData()
            } else {
              this.$message.success('操作失败')
            }
          })
        }).catch(() => {
          return false
        })
      } else {
        this.$request.post('/shopconfig/changestatus', { shopId: row.shopId, isValid: row.isValid }).then(res => {
          if (res.errorCode === 1) {
            this.$message.success('操作成功')
            this.getTableData()
          } else {
            this.$message.success('操作失败')
          }
        })
      }
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
