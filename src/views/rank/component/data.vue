<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
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
          <el-form-item label="商品名称："
                        prop="linkId">
            <el-select v-model="queryFrom.linkId"
                       filterable
                       remote
                       placeholder="请输入商品名称"
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
      <div class="flex-item-center table-info shop-table-info">
        <img src="@/assets/img/custom/hrn.jpg" />
        <div class="shop flex-between">
          <h5>HR赫莲娜官方旗舰店</h5>
          <ol class="flex-item-center">
            <li><label>有效链接：</label><span>62</span></li>
            <li><label>店铺销量：</label><span>9,999,999</span></li>
            <li><label>关联活动数：</label><span>2<em @click="openDraw({linkId:'',linkTitle:''},'1')">查看玩法</em></span></li>
          </ol>
        </div>
      </div>
      <standard-table :dataSource="tableData"
                      :columns="columns"
                      :pagination="PAGING"
                      @tableChange="tableChange" />
    </div>
    <Drawer :drawerTitle="drawerTitle"
            drawerWidth="856px"
            :drawerShow="drawerShow"
            @drawerClosed="drawerClosed">
      <shopDetails :dataId="dataId"
                   :dataType="dataType" />
    </Drawer>
  </div>
</template>
<script>
import { queryForm } from './searchForm'
import { columnsData } from './columnsData.js'
import { shopLinkTableData } from '@/common/commonData/testDevData'
import tableMixin from '@/mixins/dealTable'
import shopDetails from './shopDetails'
export default {
  mixins: [tableMixin],
  components: { shopDetails },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: shopLinkTableData,
      searchSelectOption: [],
      allLinkOption: [],
      drawerTitle: '',
      drawerShow: false,
      dataId: '',
      dataType: '1' // 1是店铺，2是链接
    }
  },
  methods: {
    getTableData () {
      const searchForm = {
        ...this.queryFrom,
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }
      delete searchForm.timeRange
      this.$request.post('/shopconfig/shoplist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
    },
    queryHandel () {
      this._resetPageNum()
      this.getTableData()
    },
    openDraw (row, type) {
      type ? this.dataType = '1' : this.dataType = '2'
      this.dataId = row.linkId
      this.drawerTitle = row.linkTitle
      this.drawerShow = true
    },
    drawerClosed () {
      this.drawerShow = false
    },
    remoteMethod (query) {
      if (query !== '') {
        this.searchSelectOption = this.allLinkOption.filter(item => {
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
