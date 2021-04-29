<template>
  <div class="details-drawer-wrap">
    <div class="details-item">
      <h4>链接信息</h4>
      <p class="flex"><label>商品标题：</label><span>{{detailInfo.linkTitle}}</span></p>
      <p class="flex"><label>上次标题：</label><span>{{detailInfo.lastTitle}}</span></p>
      <p class="flex"><label>链接地址：</label><span class="link-open"
              @click="openShop(detailInfo.linkName)">{{detailInfo.linkName}}</span></p>
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
  data () {
    return {
      detailInfo: {}
    }
  },
  watch: {
    addEditId (val, oldval) {
      if (this.addEditId) {
        this.getDetailInfo()
      }
    }
  },
  created () {
    if (this.addEditId) {
      this.getDetailInfo()
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
    },
    openShop (link) {
      window.open(link)
    }
  }
}
</script>
