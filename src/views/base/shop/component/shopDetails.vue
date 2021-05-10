<template>
  <div>
    <div class="details-drawer-wrap activity-box">
      <div class="details-item item-has-border">
        <h4 class="link-shop-title">店铺信息</h4>
        <p class="flex"><label>店铺名称：</label><span>{{detailInfo.title}}</span></p>
        <p class="flex"><label>店铺链接：</label><span class="link-open"
                @click="openShop(detailInfo.shopLink)">{{detailInfo.shopLink}}</span></p>
      </div>
      <div class="activity-wrap">
        <p v-if="!nodata"
           class="activity-title">活动信息</p>
        <div class="details-item activity-item"
             v-if="detailInfo.currentActivityList&&detailInfo.currentActivityList.length>0">
          <ul v-for="(item,index) in detailInfo.currentActivityList"
              :key="index">
            <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
            <li class="flex level-status">
              <label>活动等级：</label><span>{{item.levelName}}</span>
              <label>活动状态：</label>
              <span class="activity-status orange"
                    v-if="item.activityStatus===3">未开始</span>
              <span class="activity-status green"
                    v-if="item.activityStatus===2">进行中</span>
              <span class="activity-status gray"
                    v-if="item.activityStatus===1">已结束</span>
            </li>
            <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
            <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
          </ul>
        </div>
        <div class="details-item activity-item"
             v-if="detailInfo.futureActivityList&&detailInfo.futureActivityList.length>0">
          <ul v-for="(item,index) in detailInfo.futureActivityList"
              :key="index">
            <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
            <li class="flex level-status">
              <label>活动等级：</label><span>{{item.levelName}}</span>
              <label>活动状态：</label>
              <span class="activity-status orange"
                    v-if="item.activityStatus===3">未开始</span>
              <span class="activity-status green"
                    v-if="item.activityStatus===2">进行中</span>
              <span class="activity-status gray"
                    v-if="item.activityStatus===1">已结束</span>
            </li>
            <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
            <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
          </ul>
        </div>
        <div class="details-item activity-item"
             v-if="detailInfo.historyActivityList&&detailInfo.historyActivityList.length>0">
          <ul v-for="(item,index) in detailInfo.historyActivityList"
              :key="index">
            <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
            <li class="flex level-status">
              <label>活动等级：</label><span>{{item.levelName}}</span>
              <label>活动状态：</label>
              <span class="activity-status orange"
                    v-if="item.activityStatus===3">未开始</span>
              <span class="activity-status green"
                    v-if="item.activityStatus===2">进行中</span>
              <span class="activity-status gray"
                    v-if="item.activityStatus===1">已结束</span>
            </li>
            <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
            <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    addEditId: {
      type: [String, Number],
      required: true
    }
  },
  watch: {
    addEditId (val, oldval) {
      if (this.addEditId) {
        this.getDetailInfo()
      }
    }
  },
  computed: {
    nodata () {
      return (this.detailInfo.currentActivityList && this.detailInfo.currentActivityList.length <= 0) && (this.detailInfo.futureActivityList && this.detailInfo.futureActivityList.length <= 0) && (this.detailInfo.historyActivityList && this.detailInfo.historyActivityList.length <= 0)
    }
  },
  data () {
    return {
      detailInfo: {}
    }
  },
  created () {
    if (this.addEditId) {
      this.getDetailInfo()
    }
  },
  methods: {
    getDetailInfo () {
      this.$request.post('/shopconfig/shopdetail', { shopId: this.addEditId }).then(res => {
        if (res) {
          this.detailInfo = {
            ...res.data
          }
        }
      })
    },
    openShop (link) {
      window.open(link)
    }
  }
}
</script>
