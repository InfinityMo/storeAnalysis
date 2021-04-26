<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="系统名称：">
            <el-input v-model="queryFrom.shopName"
                      placeholder="请输入系统名称"
                      autocomplete="off">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="search-btn">
          <el-form-item>
            <el-button type="primary"
                       @click="queryHandel">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table-wrap">
      <div class="flex-between-center table-info">
        <h4>系统列表</h4>
        <el-button type="primary"
                   @click="addHandle">
          <icon type="icon-add-white-14"
                :padding="[0,5,0,0]" />新增系统
        </el-button>
      </div>
      <standard-table :dataSource="tableData"
                      :columns="columns"
                      :pagination="PAGING"
                      @tableChange="tableChange" />
    </div>
    <!-- 查看系统信息弹窗  -->
    <DialogView modalTitle="系统信息"
                :viewId="viewId"
                :modalShow="viewShow"
                :class="{'drawer-cover-dialog':drawerShow}"
                v-if="viewShow"
                @viewModalCancel="viewModalCancel"
                @openRoleDrawer="openRoleDrawer" />
    <!-- 编辑系统信息弹窗 -->
    <DialogEdit modalTitle="编辑系统"
                :viewId="viewId"
                :modalShow="editSystemShow"
                v-if="editSystemShow"
                @viewModalCancel="editModalCancel" />
    <!-- 查看角色信息 -->
    <Drawer :wrapperClosable="true"
            width="366px"
            :title="roleTitle"
            @drawerClosed="drawerClosed"
            ref="roleDrawer">
      <div slot="content">
        <roleContent :roleId="roleId" />
      </div>
    </Drawer>
    <!-- 角色授权弹窗 -->
    <DialogWarrant modalTitle="角色授权"
                   :viewId="viewId"
                   :modalShow="warrantShow"
                   :class="{'drawer-cover-dialog':drawerShow}"
                   v-if="warrantShow"
                   @viewModalCancel="warrantModalCancel"
                   @openRoleDrawer="openRoleDrawer"
                   @openWarrantDrawer="openWarrantDrawer" />
    <!-- 角色授权drawer -->
    <Drawer :wrapperClosable="false"
            width="310px"
            v-if="warrantDrawer"
            :title="`${roleTitle}——角色授权`"
            @drawerClosed="drawerClosed"
            ref="warrant">
      <div slot="content">
        <warrant @warrantClose="warrantClose" />
      </div>
    </Drawer>
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { columnsData } from './columnsData.js'
import DialogView from './dialogDrawer/dialogView'
import DialogEdit from './dialogDrawer/DialogEdit'
import DialogWarrant from './dialogDrawer/dialogWarrant'
// import { tableSearchForm } from './searchForm'
import roleContent from './dialogDrawer/roleContent'
import warrant from './dialogDrawer/warrant'
export default {
  mixins: [tableMixin],
  components: { DialogView, DialogEdit, DialogWarrant, roleContent, warrant },
  data () {
    return {
      searchForm: JSON.parse(JSON.stringify({})),
      queryFrom: { RowGuid: '' },
      columns: columnsData(this.$createElement, this),
      tableData: [{
        id: '8n2h95n324',
        systemName: '权限管理系统',
        systemIdent: '8baef6123fda7egh4',
        systemDesc: 'thelian的权限管理系统',
        updateTime: '2020-01-30 18:08:09'
      }],
      roleTitle: '', // 角色信息名
      roleId: '', // 角色ID
      viewShow: false, // 查看系统信息弹窗
      editSystemShow: false, // 编辑系统弹窗
      warrantShow: false, // 角色授权弹窗
      warrantDrawer: false, // 角色授权抽屉
      drawerShow: false, // 出现drawer时控制弹窗的层级
      viewId: '' // 当前点击的系统id
    }
  },
  created () {
    // this.getSelects()
  },
  mounted () {
    this.getTableData() // 获取列表数据
    // this.openRoleDrawer()
  },
  methods: {
    // 查询
    queryHandel () {
      this.queryFrom = {
        RowGuid: this.searchForm.RowGuid[0] || ''
      }
      this.getTableData()
    },
    // 新增系统
    addHandle () {
      this.$router.push('/system/add')
    },
    // 列表
    getTableData () {
      // this.$request.post('./a')
    },
    // 表格分页的变化
    tableChange (changeParams) {
      this.PAGING.pageSize = changeParams.pageSize
      this.PAGING.pageNum = changeParams.pageNum
      this.getTableData()
    },
    // 查看系统信息
    toView (scoped) {
      const { row } = scoped
      this.viewShow = true
      this.viewId = row.id
    },
    // 系统信息弹窗-close
    viewModalCancel () {
      this.viewShow = false
    },
    // 角色详情抽屉-open
    openRoleDrawer (roleId, roleName) {
      this.drawerShow = true
      this.roleTitle = roleName || ''
      this.roleId = roleId
      this.$refs.roleDrawer.drawerOpen()
    },
    // 角色详情抽屉-close
    drawerClosed () {
      this.drawerShow = false
      this.warrantDrawer = false
    },
    // 编辑系统信息
    editMoadl (scoped) {
      this.editSystemShow = true
    },
    // 编辑系统信息弹窗关闭
    editModalCancel () {
      this.editSystemShow = false
    },
    // 删除
    deleteHandle (scoped) {
      const { row } = scoped
      this.$request.post('/shopDelete', {
        RowGuid: row.RowGuid
      }).then(res => {
        if (res.errorCode === 1) {
          this.$message.success('删除成功')
          // 删除时需判断是不是最后一页
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    // 角色编辑
    roleEdit (scoped) {
      const { row } = scoped
      this.$router.push({
        name: 'SystemRole',
        params: { id: row.id }
      })
    },
    // 角色授权
    warrant (scoped) {
      const { row } = scoped
      this.viewId = row.id
      this.warrantShow = true
    },
    // 角色授权弹窗-close
    warrantModalCancel () {
      this.warrantShow = false
    },
    // 角色授权抽屉-open
    openWarrantDrawer (roleId, roleName) {
      this.drawerShow = true
      this.warrantDrawer = true
      this.roleTitle = roleName || ''
      this.roleId = roleId
      this.$nextTick(() => {
        this.$refs.warrant.drawerOpen()
      })
    },
    // 角色授权抽屉-close
    warrantClose (isShowConfirm) {
      // 调用手动关闭drawer
      this.$refs.warrant.manualCloseDrawer(isShowConfirm)
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/page-table";
</style>
