<template>
  <div class="flex-justify-end flex-item-center bottom-check"
       v-show="bottomShow">
    <div class="btn-group">
      <el-button type="primary"
                 @click="saveHandle">保存</el-button>
      <el-button @click="addHandle">
        <icon type="icon-add-green-14"
              :padding="[0,5,0,0]" />新增角色
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bottomShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    saveHandle () {
      this.$emit('bottomSave')
    },
    addHandle () {
      this.$emit('bottomAdd')
    }
  }
}
</script>
<style lang="less" scoped>
.bottom-check {
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 0;
  height: 44px;
  background-color: #fff;
  box-shadow: 0px -1px 2px -2px rgba(0, 0, 0, 0.16),
    0px -3px 6px rgba(0, 0, 0, 0.12), 0px 5px 12px 4px rgba(0, 0, 0, 0.09);
  z-index: 1;
  .btn-group {
    padding-right: 20px;
  }
}
</style>
