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
                        prop="date">
            <el-date-picker v-model="queryFrom.date"
                            :disabled="dateDisabled"
                            :editable="false"
                            :clearable="false"
                            :picker-options="datePickerOptions"
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
import { getYesterday } from '@/common/utils/timeCalc'
export default {
  mixins: [tableMixin],
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: [],
      allSelectOption: [], // 所有搜索数据
      searchSelectOption: [], // 搜索候选数据源
      dateDisabled: true,
      queryDate: getYesterday(),
      datePickerStart: '',
      datePickerEnd: '',
      datePickerOptions: {
        disabledDate: (time) => {
          if (this.datePickerStart && this.datePickerEnd) {
            return (time && time.getTime() > new Date(this.datePickerEnd).getTime()) || (time && time.getTime() < new Date(this.datePickerStart).getTime())
          }
        }
      }
    }
  },
  watch: {
    'queryFrom.activityId' () {
      String(this.queryFrom.activityId) ? this.dateDisabled = false : this.dateDisabled = true
    }
  },
  created () {
    this.getSelectData()
    this.getTableData() // 获取列表数据
  },
  mounted () {

  },
  methods: {
    getSelectData () {
      Promise.all([
        this._fetchSelectData('3', { key: '0', value: 'started' })
      ]).then(res => {
        this.allSelectOption = res[0]
      })
    },
    getTableData () {
      const searchForm = {
        ...this.queryFrom,
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }
      return new Promise((resolve) => {
        this.$request.post('/rankexpress/ranklist', searchForm).then(res => {
          res.data ? resolve(true) : resolve(false)
          const resData = res.data.result || []
          this.tableData = resData
          this.PAGING.total = res.data.total
        })
      })
    },
    activityChange (value) {
      this.queryFrom.date = ''
      const target = this.allSelectOption.filter(item => item.value === value)[0]
      if (target) {
        this.queryFrom.date = target.end
        this.datePickerStart = target.start
        this.datePickerEnd = target.end
      } else {
        this.dateDisabled = true
      }
    },
    remoteMethod (query) {
      if (query !== '') {
        this.searchSelectOption = this.allSelectOption.filter(item => {
          return (item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        })
      } else {
        this.searchSelectOption = []
      }
    },
    queryHandel () {
      this._resetPageNum()
      this.getTableData().then(res => {
        this.queryDate = res ? this.queryFrom.date : getYesterday()
      })
    },
    openNewtab (scoped) {
      const { row } = scoped
      const routeUrl = this.$router.resolve({
        name: 'RankData',
        query: {
          shopId: Base64.encode(row.shopId),
          rank: Base64.encode(row.rank),
          date: Base64.encode(this.queryDate)
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
