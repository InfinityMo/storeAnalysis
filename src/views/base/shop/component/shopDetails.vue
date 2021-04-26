<template>
  <div class="details-drawer-wrap">
    <div class="details-item">
      <h4>店铺信息</h4>
      <p class="flex"><label>店铺名称：</label><span>{{shopInfo.title}}</span></p>
      <p class="flex"><label>店铺链接：</label><span class="link-open"
              @click="openShop(shopInfo.shopLink)">{{shopInfo.shopLink}}</span></p>
    </div>
    <div class="details-item">
      <h4>当前活动信息</h4>
      <ul v-for="(item,index) in shopInfo.currentActivityList"
          :key="index">
        <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{item.level}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
        <li class="flex"><label>活动玩法：</label><span>{{item.rule}}</span></li>
      </ul>
    </div>
    <div class="details-item">
      <h4>历史活动信息</h4>
      <ul v-for="(item,index) in shopInfo.historyActivityList"
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
    addEditId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      shopInfo: { ...shopInfo }
    }
  },
  created () {

  },
  methods: {
    openShop (link) {
      window.open(link)
    }
  }
}
</script>
