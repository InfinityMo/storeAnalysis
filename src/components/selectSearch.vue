<template>
  <!-- <el-select v-model="value"
             filterable
             :placeholder="'请选择'+placeholder">
    <el-option v-for="item in options"
               :key="item.value"
               :label="item.text"
               :value="item.value">
    </el-option>
  </el-select> -->
  <el-cascader :value="selectVal"
               :placeholder="'请选择'+placeholder"
               :options="newOption"
               filterable>
  </el-cascader>
</template>
<script>
export default {
  props: {
    selectVal: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  computed: {
    newOption () {
      const newOption = []
      this.options.forEach((item, index) => {
        newOption.push({
          value: item.value,
          label: item.text
        })
      })
      return newOption
    }
  },
  watch: {
    selectVal () {

    }
  },
  data () {
    return {
      value: ''
    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
</style>
