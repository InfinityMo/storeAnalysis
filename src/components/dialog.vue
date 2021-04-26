<template>
  <el-dialog :title="dialogTitle"
             :top="offestTop"
             :destroy-on-close="true"
             :close-on-click-modal="closeByModal"
             :visible.sync="dialogShow"
             :lock-scroll="lockScroll"
             :width="dialogWidth"
             custom-class="custom-dialog"
             :before-close="dialogCancel">
    <slot name="content"></slot>
    <!-- <el-form :model="modalForm"
             :rules="modalFormRules"
             ref="moadlForm"
             label-width="82px">
      <el-form-item label="店铺名称："
                    prop="shop_name">
        <el-input v-model="modalForm.shop_name"
                  placeholder="请输入店铺名称"
                  maxlength=50
                  :disabled="disabled"
                  autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="店铺链接："
                    prop="shop_url">
        <el-input v-model="modalForm.shop_url"
                  placeholder="请输入店铺链接"
                  maxlength=100
                  autocomplete="off">
        </el-input>
      </el-form-item>
    </el-form> -->
    <div slot="footer"
         v-if="isShowFooter"
         class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary"
                 @click="dialogConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 弹窗标题
    dialogTitle: {
      type: String,
      required: true
    },
    // 弹窗宽度
    dialogWidth: {
      type: String,
      required: true,
      default: '500px'
    },
    // 点击moadl是否可关闭
    closeByModal: {
      type: Boolean,
      default: false
    },
    // 距离顶部距离
    offestTop: {
      type: String,
      default: '60px'
    },
    // 是否显示弹窗
    dialogShow: {
      type: Boolean,
      required: true,
      default: false
    },
    // 是否在 Dialog 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true
    },
    isShowFooter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    dialogCancel () {
      this.$emit('dialogCancel', false)
    },
    dialogConfirm () {
      this.$emit('dialogConfirm', false)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
