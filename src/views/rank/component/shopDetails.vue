<template>
  <div class="details-drawer-wrap">
    <div class="details-item">
      <h4>当前活动信息</h4>
      <ul v-for="(item,index) in detailInfo.currentActivityList"
          :key="index">
        <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{item.level}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
        <li class="flex"><label>活动玩法：</label><span>{{item.rule}}</span></li>
      </ul>
    </div>
    <div class="details-item">
      <h4>历史活动信息</h4>
      <ul v-for="(item,index) in detailInfo.historyActivityList"
          :key="index">
        <li class="flex"><label>历史活动：</label><span>{{item.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{item.level}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
        <li class="flex"><label>活动玩法：</label><span>{{item.rule}}</span></li>
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
      // this.getDetailInfo()
    }
  },
  methods: {
    getDetailInfo () {
      this.$request.post('/linkconfig/linkdetail', { linkId: this.addEditId }).then(res => {
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
