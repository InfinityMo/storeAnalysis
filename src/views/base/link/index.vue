<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="系统选择：">
            <el-cascader :options="systemOptions"
                         placeholder="请选择系统"
                         v-model="systemValue"
                         :props="{ multiple: true }"
                         collapse-tags
                         @change="changeLabel"
                         clearable>
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table-wrap">
      <div class="flex-between-center table-info table-role">
        <h4>角色编辑</h4>
        <div>
          <el-button @click="saveHandle"
                     v-show="dynamicForm.dynamicData.length>0"
                     type="primary">保存</el-button>
          <el-button @click="addHandle"
                     v-show="systemValue.length>0">
            <icon type="icon-add-green-14"
                  :padding="[0,5,0,0]" />新增角色
          </el-button>
        </div>
      </div>
      <el-form :model="dynamicForm"
               class="dynamic-form"
               v-if="dynamicForm.dynamicData.length>0"
               ref="dynamicForm"
               label-width="82px">
        <div class="dynamic-item"
             v-for="(dynamicItem, index) in dynamicForm.dynamicData"
             :key="dynamicItem.dynamicId">
          <icon class="delete-icon"
                type="icon-delete-17"
                :hover="true"
                hoverType="icon-delete-hover-17"
                @click.native="deleteItem(dynamicItem.dynamicId)" />
          <div class="flex-between-center">
            <div class="form-item">
              <el-form-item label="角色名称："
                            :ref="'dynamicData.' + index + '.roleName'"
                            :prop="'dynamicData.' + index + '.roleName'"
                            :rules="{required: true, message: '角色名称不能为空', trigger: 'blur'}">
                <el-input v-model="dynamicItem.roleName"
                          maxlength="8"
                          show-word-limit
                          placeholder="请输入角色名称">
                </el-input>
              </el-form-item>
            </div>
            <div class="form-item">
              <el-form-item label="授权页面："
                            :ref="'dynamicData.' + index + '.pages'"
                            :prop="'dynamicData.' + index + '.pages'"
                            :rules="{required: true, message: '请选择授权页面', trigger: 'change'}">
                <el-select v-model="dynamicItem.pages"
                           multiple
                           collapse-tags
                           placeholder="请选择授权页面"
                           @change="selectChange($event,dynamicItem.dynamicId)">
                  <el-option v-for="item in powerAllPages"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form-item">
              <el-form-item label="角色说明："
                            :ref="'dynamicData.' + index + '.remark'"
                            :prop="'dynamicData.' + index + '.remark'"
                            :rules="{required: true, message: '角色说明不能为空', trigger: 'blur'}">
                <el-input v-model="dynamicItem.remark"
                          maxlength="50"
                          show-word-limit
                          placeholder="请输入角色名称">
                </el-input>
              </el-form-item>
            </div>
          </div>
          <standard-table v-if="dynamicItem.powers.length>0"
                          :dataSource="dynamicItem.powers"
                          :hidePagination="true"
                          :columns="columns" />
        </div>
      </el-form>
      <div v-else
           class="flex-item-center flex-justify-center">
        <div class="no-role">
          <icon type="icon-no-data-36" />
          <p>暂无角色，请添加角色</p>
        </div>
      </div>
    </div>
    <checkBottom :bottomShow="bottomShow"
                 @bottomSave="saveHandle"
                 @bottomAdd="addHandle" />
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { options, powerAllPages } from './option'
import { columnsData } from './columnsData'
import { createUUID, getScrollTop } from '@/common/utils/funcStore'
import checkBottom from './checkBottom'
export default {
  mixins: [tableMixin],
  components: { checkBottom },
  data () {
    return {
      queryFrom: {},
      columns: columnsData(this.$createElement, this),
      systemValue: [],
      systemOptions: options,
      shareScopeEnd: [],
      powerAllPages: powerAllPages,
      // dynamicForm: {
      //   dynamicData: [{
      //     dynamicId: '',
      //     roleName: '',
      //     pages: [],
      //     remark: '',
      //     powers: [{
      //       dynamicId:'',
      //       id: '',
      //       menuName: '',
      //       view: true,
      //       edit: false,
      //       upload: false,
      //       downLoad: false,
      //       add: false,
      //       delete: false
      //     }]
      //   }]
      // },
      dynamicForm: {
        dynamicData: []
      },
      bottomShow: false
    }
  },
  watch: {
    'systemValue' (newVal, oldVal) {
      if (this.systemValue.length <= 0) {
        this.dynamicForm.dynamicData.splice(0)
      }
    }
  },
  created () {
    this.addListenerFunction()
    // this.getSelects()
  },
  mounted () {

    // this.getTableData() // 获取列表数据
  },
  methods: {

    changeLabel (val) {
      // 是否与上次的类型相同
      let changeFlag = false
      const changeItemArr = []
      // const changeItem = null
      if (this.shareScopeEnd.length === 0) {
        this.systemValue = val
      } else {
        // 与原数组比对
        this.systemValue.forEach((item) => {
          if (item[0] !== this.shareScopeEnd[0][0]) {
            changeFlag = true
            changeItemArr.push(item)
          }
          // if (item[0] !== this.shareScopeEnd[0][0]) { // 一级标签不同
          //   changeFlag = true
          //   changeItem = item
          // } else if (item[1] !== this.shareScopeEnd[0][1]) { // 一级标签相同但是二级标签不同
          //   changeFlag = true
          //   changeItem = item
          // } else if ((!item[2] && this.shareScopeEnd[0][2]) || (item[2] && !this.shareScopeEnd[0][2])) {
          //   changeFlag = true
          //   changeItem = item
          // }
        })
      }
      if (changeFlag) {
        this.systemValue = []
        this.systemValue = changeItemArr
        this.dynamicForm.dynamicData.splice(0)
      }
      this.shareScopeEnd = this.systemValue
    },
    switchChange (scoped, type) {
      const { row } = scoped
      const target = this.dynamicForm.dynamicData.filter(i => i.dynamicId === row.dynamicId)[0]
      if (target) {
        const targetPowers = target.powers.filter(i => i.id === row.id)[0]
        if (targetPowers) {
          // debugger
          this.$nextTick(() => {
            targetPowers[type] = !targetPowers[type]
          })
        }
      }
    },

    saveHandle () {
      this.$refs.dynamicForm.validate((valid, object) => {
        if (valid) {
          debugger
        } else {
          this.scrollView(object)
          return false
        }
      })
    },
    scrollView (object) {
      for (const i in object) {
        let dom = this.$refs[i]
        if (Object.prototype.toString.call(dom) !== '[object Object]') {
          dom = dom[0]
        }
        dom.$el.scrollIntoView({ // 滚动到指定节点
          // 值有start,center,end，nearest，当前显示在视图区域中间
          block: 'center',
          behavior: 'smooth'
        })
        break
      }
    },
    // 新增
    addHandle () {
      this.dynamicForm.dynamicData.unshift({
        dynamicId: createUUID(),
        roleName: '',
        pages: [],
        remark: '',
        powers: []
      })
      this.$nextTick(() => {
        this.$refs.dynamicForm.clearValidate()
      })
    },
    selectChange (value, dynamicId) {
      const target = this.dynamicForm.dynamicData.filter(i => i.dynamicId === dynamicId)[0]
      if (target) {
        // target.powers = []
        value.map(i => {
          const option = this.powerAllPages.filter(j => j.value === i)[0]
          if (option) {
            if (target.powers.filter(k => k.id === option.value).length <= 0) {
              target.powers.push({
                dynamicId: dynamicId,
                id: option.value,
                menuName: option.label,
                view: true,
                edit: false,
                upload: false,
                downLoad: false,
                add: false,
                delete: false
              })
            }
          }
        })
        // 去重power
        this.unique(target.powers, value)
      }
    },
    unique (arr, option) {
      arr.map((i, index) => {
        if (!option.includes(i.id)) {
          arr.splice(index, 1)
        }
      })
      // // debugger
      // const obj = {}
      // arr = arr.reduce((item, next) => {
      //   // debugger
      //   // console.log(obj[next.uniqueKey])
      //   // eslint-disable-next-line no-unused-expressions
      //   obj[next[uniqueKey]] ? '' : obj[next[uniqueKey]] = next[uniqueKey] && item.push(next)
      //   console.log(obj)
      //   return item
      // }, [])
      // // return arr.filter((item,index)=>arr.indexOf(item.))
    },
    // 删除类目
    deleteItem (id) {
      const targetIndex = this.dynamicForm.dynamicData.findIndex(i => i.dynamicId === id)
      if (targetIndex !== -1) {
        this.dynamicForm.dynamicData.splice(targetIndex, 1)
      }
    },
    addListenerFunction (e) {
      document.addEventListener('scroll', this.handleScroll, true)
    },
    handleScroll () {
      this.bottomShow = getScrollTop() > 150
      // if () {
      //    = true
      // } else {
      //   this.bottomShow = false
      // }
    }
    // queryHandel () {
    //   this.queryFrom = {
    //     RowGuid: this.searchForm.RowGuid[0] || ''
    //   }
    //   this.getTableData()
    // }
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.addListenerFunction)
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/page-table";
@import "./index";
</style>
