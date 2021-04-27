<template>
  <div class="details-drawer-wrap">
    <div class="details-item">
      <ul>
        <li class="flex"><label>活动名称：</label><span>{{detailInfo.activityName}}</span></li>
        <li class="flex"><label>活动等级：</label><span>{{detailInfo.level}}</span></li>
        <li class="flex"><label>活动时间：</label><span>{{detailInfo.start}} ~ {{detailInfo.end}}</span></li>
        <li class="flex"><label v-html="'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：'"></label><span>{{detailInfo.activityMemo}}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { activityInfo } from '@/common/commonData/testDevData'
export default {
  props: {
    addEditId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      detailInfo: { ...activityInfo }
    }
  },
  created () {

  },
  methods: {
  }
}
</script>
