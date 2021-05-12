<template>
  <div class="page">
    <div class="table-wrap">
      <div class="flex-item-center table-info shop-table-info">
        <img :src="shopImg"
             alt="店铺icon"
             v-imgError />
        <div class="shop flex-between">
          <h5>{{shopInfo.shopTitle}}-{{shopInfo.date}} 预售排行</h5>
          <ol class="flex-item-center">
            <li><label>预售排名：</label><span>{{shopInfo.rank}}</span></li>
            <li><label>预售销量：</label><span>{{shopInfo.preOrderCount}}</span></li>
            <li><label>预售链接数：</label><span>{{shopInfo.preLinkCount}}</span></li>
            <li><label>关联活动数：</label><span>{{shopInfo.promotionCount}}<em @click="openDraw({linkId:shopId,linkTitle:shopInfo.shopTitle},'1')">查看玩法</em></span></li>
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
      <drawerDetails slot="content"
                     v-if="drawerShow"
                     :dataId="dataId"
                     :dataTimeRange="dataTimeRange"
                     :dataType="dataType" />
    </Drawer>
  </div>
</template>
<script>
import { Base64 } from 'js-base64'
import { columnsData } from './columnsData.js'
import tableMixin from '@/mixins/dealTable'
import drawerDetails from '@/components/drawerModel/drawerDetails'
export default {
  mixins: [tableMixin],
  components: { drawerDetails },
  data () {
    return {
      columns: columnsData(this.$createElement, this),
      tableData: [],
      shopId: Base64.decode(this.$route.query.shopId),
      shopInfo: { rank: Base64.decode(this.$route.query.rank), date: Base64.decode(this.$route.query.date) },
      shopImg: '',
      drawerTitle: '',
      drawerShow: false,
      dataId: '',
      dataType: '1', // 1是店铺，2是链接
      dataTimeRange: [Base64.decode(this.$route.query.date), Base64.decode(this.$route.query.date)]
    }
  },
  created () {
    this.getShopImg()
    this.getShopInfo()
    this.getTableData()
  },
  methods: {
    getShopImg () {
      this.$request.post('/shopexpress/shopicon', { shopId: this.shopId }).then(res => {
        this.shopImg = res.data.iconLink
      })
    },
    getShopInfo () {
      const searchForm = {
        shopId: this.shopId,
        start: this.shopInfo.date || '',
        end: this.shopInfo.date || ''
      }
      this.$request.post('/shopexpress/ranktitle', searchForm).then(res => {
        this.shopInfo = {
          ...this.shopInfo,
          ...res.data
        }
      })
    },
    getTableData () {
      const searchForm = {
        shopId: this.shopId,
        start: this.shopInfo.date || '',
        end: this.shopInfo.date || '',
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }
      this.$request.post('/linkexpress/ranklink', searchForm).then(res => {
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
.table-wrap {
  margin-top: 0;
}
</style>
