<template>
  <div class="details-drawer-wrap">
    <div class="details-item"
         v-if="detailInfo.currentActivityList&&detailInfo.currentActivityList.length>0">
      <h4>当前活动信息</h4>
      <ul v-for="(item,index) in detailInfo.currentActivityList"
          :key="index">
        <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{item.levelName}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
        <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
      </ul>
    </div>
    <!-- <div class="details-item"
         v-if="detailInfo.futureActivityList&&detailInfo.futureActivityList.length>0">
      <h4>未来活动信息</h4>
      <ul v-for="(item,index) in detailInfo.futureActivityList"
          :key="index">
        <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{item.levelName}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
        <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
      </ul>
    </div> -->
    <div class="details-item"
         v-if="dataType==='2'&&detailInfo.historyActivityList&&detailInfo.historyActivityList.length>0">
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
import { shopInfo } from '@/common/commonData/testDevData'
export default {
  props: {
    dataId: {
      type: [String, Number],
      required: true
    },
    dataType: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      detailInfo: { ...shopInfo }
    }
  },
  watch: {
    dataId (val, oldval) {
      if (this.dataId) {
        this.getDetailInfo()
      }
    }
  },
  created () {
    if (this.dataId) {
      this.getDetailInfo()
    }
  },
  methods: {
    getDetailInfo () {
      const url = this.dataType === '1' ? '/shopconfig/shopdetail' : '/linkconfig/linkdetail'
      const queryForm = this.dataType === '1' ? { shopId: this.dataId } : { linkId: this.dataId }
      this.$request.post(url, queryForm).then(res => {
        if (res) {
          this.detailInfo = {
            ...res.data
          }
        }
      })
    }
  }
}
</script>
