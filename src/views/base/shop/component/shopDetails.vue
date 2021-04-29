<template>
  <div class="details-drawer-wrap">
    <div class="details-item">
      <h4>店铺信息</h4>
      <p class="flex"><label>店铺名称：</label><span>{{detailInfo.title}}</span></p>
      <p class="flex"><label>店铺链接：</label><span class="link-open"
              @click="openShop(detailInfo.shopLink)">{{detailInfo.shopLink}}</span></p>
    </div>
    <div class="details-item"
         v-show="detailInfo.currentActivityList&&detailInfo.currentActivityList.length>0">
      <h4>当前活动信息</h4>
      <ul v-for="(item,index) in detailInfo.currentActivityList"
          :key="index">
        <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{item.levelName}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
        <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
      </ul>
    </div>
    <div class="details-item"
         v-show="detailInfo.futureActivityList&&detailInfo.futureActivityList.length>0">
      <h4>未来活动信息</h4>
      <ul v-for="(item,index) in detailInfo.futureActivityList"
          :key="index">
        <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{item.levelName}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
        <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
      </ul>
    </div>
    <div class="details-item"
         v-show="detailInfo.historyActivityList&&detailInfo.historyActivityList.length>0">
      <h4>历史活动信息</h4>
      <ul v-for="(item,index) in detailInfo.historyActivityList"
          :key="index">
        <li class="flex"><label>历史活动：</label><span>{{item.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{item.levelName}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
        <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
      </ul>
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
