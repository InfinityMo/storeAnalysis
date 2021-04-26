<template>
  <div class="drawer-inner-wrap content-wrap">
    <div class="filter-warp">
      <p>请选择想要授权的员工或部门</p>
      <el-input class="filter-input"
                placeholder="请输入部门名或员工名进行筛选"
                prefix-icon="el-icon-search"
                clearable
                v-model="filterText">
      </el-input>
    </div>
    <el-tree class="filter-tree"
             :data="warrantData"
             :props="defaultProps"
             show-checkbox
             default-expand-all
             :filter-node-method="filterNode"
             ref="tree">
    </el-tree>
    <div class=" btn-group">
      <el-button @click="warrantClose">取消</el-button>
      <el-button type="primary"
                 @click="warrant">授权</el-button>
    </div>
  </div>
</template>
<script>
import { treeData as warrantData } from '@/common/formData/form'
export default {
  data () {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      warrantData: warrantData
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 关闭授权drawer
    warrantClose () {
      this.$emit('warrantClose')
    },
    // 授权
    warrant () {
      // 授权回调结束后，关闭drawer
      this.$emit('warrantClose', false)
    },
    // 搜索
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style lang="less" scoped>
.content-wrap {
  position: relative;
  padding: 0 20px 20px 20px;
  font-size: 14px;
  color: #333;
  p {
    line-height: 20px;
    margin-bottom: 20px;
  }
  .filter-warp {
    position: absolute;
    top: 0;
    right: 20px;
    left: 20px;
    z-index: 10;
    background-color: #fff;
    .filter-input {
      margin-bottom: 5px;
      height: 40px;
    }
  }
  .filter-tree {
    height: calc(100vh - 150px);
    padding: 85px 0 0 0;
    box-sizing: border-box;
    overflow: auto;
  }
  /deep/.el-tree-node__content {
    height: 30px;
  }
  .btn-group {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
