<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="活动选择："
                        prop="activityId">
            <el-select v-model="queryFrom.activityId"
                       filterable
                       remote
                       @change="activityChange"
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
        <el-col :span="8">
          <el-form-item label="日期选择："
                        prop="activityId">
            <el-date-picker v-model="queryFrom.date"
                            :disabled="dateDisabled"
                            :editable="false"
                            :clearable="false"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            placeholder="请选择日期">
            </el-date-picker>
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
  </div>
</template>
<script>
import { Base64 } from 'js-base64'
import tableMixin from '@/mixins/dealTable'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import { shopInfoTableData } from '@/common/commonData/testDevData'

export default {
  mixins: [tableMixin],
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: shopInfoTableData,
      allShopOption: [], // 所有店铺数据
      searchSelectOption: [], // 搜索候选数据源
      dateDisabled: true
    }
  },
  created () {
    this.getSelectData()
    // this.getTableData() // 获取列表数据
  },
  mounted () {

  },
  methods: {
    getSelectData () {
      Promise.all([
        this._fetchSelectData('3', { key: '0', value: 'started' })
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
      this.$request.post('/shopconfig/shoplist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
    },
    activityChange () {
      debugger
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
    queryHandel () {
      this._resetPageNum()
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
