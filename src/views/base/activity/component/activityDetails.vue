<template>
  <div class="details-drawer-wrap">
    <div class="details-item no-padding">
      <ul class="no-padding">
        <li class="flex"><label>活动名称：</label><span>{{detailInfo.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{detailInfo.levelName}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{detailInfo.start}} ~ {{detailInfo.end}}</span></li>
        <li class="flex"><label v-html="'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：'"></label><span>{{detailInfo.activityMemo}}</span></li>
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
  // watch: {
  //   addEditId (val, oldval) {
  //     if (this.addEditId) {
  //       this.getDetailInfo()
  //     }
  //   }
  // },
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
      this.$request.post('/promotionconfig/promotiondetail', { activityId: this.addEditId }).then(res => {
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
