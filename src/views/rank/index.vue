<template>
  <div class="page">
    <div class="table-wrap dept-wrap">
      <el-tree :data="deptData"
               :key="randomKey"
               node-key="id"
               default-expand-all
               :expand-on-click-node="false">
        <!-- <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text"
                       size="mini"
                       @click="() => append(data)">
              Append
            </el-button>
            <el-button type="text"
                       size="mini"
                       @click="() => remove(node, data)">
              Delete
            </el-button>
          </span>
        </span> -->
        <span class="custom-tree-node flex flex-item-center"
              slot-scope="{ node, data }">
          <span v-if="!data.isEdit"
                @dblclick="dbClickHandle(node,data)">{{ node.label }}</span>
          <span v-else
                class="edit-input">
            <el-input v-model="deptName"
                      v-focus
                      placeholder="请输入部门名称">
            </el-input>
            <el-link :disabled="!deptName"
                     class="confirm-btn"
                     :underline="false">确定</el-link>
            <!-- <span class="confirm-btn" ></span> -->
            <el-link class="cancel-btn"
                     @click="cancel(node,data)"
                     :underline="false">取消</el-link>
            <!-- <span class="confirm-btn"
                  ></span> -->
          </span>
          <span class="icon-operate"
                :class="{'hide-operate':data.isEdit}">
            <icon type="icon-add-green-14"
                  :padding="[0,0,0,0]"
                  @click.native="() => append(node, data)" />
            <icon type="icon-delete-14"
                  :padding="[0,0,0,10]"
                  @click.native="() => remove(node, data)" />
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { createUUID } from '@/common/utils/funcStore'
export default {
  mixins: [tableMixin],

  data () {
    return {
      deptName: '',
      randomKey: 1,
      deptData: [
        {
          id: '1',
          label: '上海联恩',
          children: [
            {
              id: '2',
              label: '管理决策中心'
            },
            {
              id: '3',
              label: '数据开发部',
              children: [
                {
                  id: '4',
                  label: '开发组'
                }, {
                  id: '5',
                  label: '数据组'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  created () {
    // this.getSelects()
  },
  mounted () {
    // this.getTableData() // 获取列表数据
  },
  methods: {
    dbClickHandle (node, data) {
      this.cancelAllEdit()
      data.isEdit = true
      this.deptName = data.label
      this.randomKey = createUUID()
    },
    cancelAllEdit () {
      this.resetState(this.deptData)
    },
    resetState (arr) {
      arr.forEach(i => {
        if (i.children && i.children.length > 0) {
          this.resetState(i.children)
        }
        delete i.isEdit
      })
    },
    cancel (node, data) {
      // data.isEdit = false
      delete data.isEdit
      if (data.isAdd) {
        this.remove(node, data)
      }
      this.randomKey = createUUID()
    },
    append (node, data) {
      let id = 10000
      const newChild = { id: id++, label: 'ccc', isEdit: true, isAdd: true, children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.randomKey = createUUID()
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  },
  directives: {
    focus: {
      inserted (el, binding, vnode) {
        el.querySelector('input').focus()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/page-table";
@import "./index";
</style>
