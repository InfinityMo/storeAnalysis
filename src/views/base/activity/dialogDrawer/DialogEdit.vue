<template>
  <el-dialog :title="modalTitle"
             :top="offestTop"
             :destroy-on-close="true"
             :visible.sync="modalShow"
             width="1000px"
             :before-close="modalCancel">
    <DailogStep :systemId="viewId"
                isEditStep />
  </el-dialog>
</template>

<script>
import DailogStep from '../../shop/index'
export default {
  components: { DailogStep },
  props: {
    modalTitle: {
      type: String,
      required: true
    },
    offestTop: {
      type: String,
      default: '50px'
    },
    modalShow: {
      type: Boolean,
      required: true,
      default: false
    },
    viewId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    modalCancel () {
      this.$emit('viewModalCancel')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
