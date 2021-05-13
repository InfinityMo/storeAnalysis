<template>
  <el-form :model="dynamicForm"
           class="dynamic-form"
           v-if="dynamicForm.dynamicData.length>0"
           ref="dynamicForm"
           label-width="82px">
    <div class="dynamic-item"
         v-for="(dynamicItem, index) in dynamicForm.dynamicData"
         :key="dynamicItem.itemId">
      <icon class="delete-icon"
            type="icon-delete-17"
            :hover="true"
            hoverType="icon-delete-hover-17"
            @click.native="deleteItem(dynamicItem.itemId)" />
      <div class="form-item">
        <el-form-item label="活动选择："
                      :ref="'dynamicData.' + index + '.activityId'"
                      :prop="'dynamicData.' + index + '.activityId'"
                      :rules="{required: true, message: '请选择活动', trigger: 'change'}">
          <el-select popper-class="dialog-upper"
                     @change="selectChange('',index)"
                     placeholder="请选择活动"
                     v-model="dynamicItem.activityId">
            <el-option v-for="item in dynamicItem.selectOption"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="活动玩法："
                      :ref="'dynamicData.' + index + '.rules'"
                      :prop="'dynamicData.' + index + '.rules'">
          <el-input v-model="dynamicItem.rules"
                    autosize
                    type="textarea"
                    resize="none"
                    :clearable="true"
                    maxlength="500"
                    show-word-limit
                    placeholder="请输入活动玩法">
          </el-input>
        </el-form-item>
      </div>
    </div>
    <div class="flex-item-center flex-justify-center add-wrap"
         @click="addHandle"
         v-if="dynamicForm.dynamicData.length<startedActivityOption.length">
      <icon type="icon-add-green-14" />
      <span>添加新的活动</span>
    </div>
  </el-form>
</template>

<script>
import common from '@/mixins/dealTable'
import { scrollView } from '@/common/utils/funcStore'
// import { modalForm, modalFormRules } from './formData'
export default {
  mixins: [common],
  props: {
    addEditId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      dynamicForm: {
        dynamicData: [
          {
            selectOption: [],
            itemId: this.$createUUID(),
            activityId: '',
            rules: ''
          }
        ]
      },
      allSelectId: [], // 当前页面上所有的选项
      startedActivityOption: []
    }
  },
  created () {
    this.getNotFinishActivity()
  },
  mounted () {

  },
  methods: {
    getNotFinishActivity () {
      this._fetchSelectData('3', { key: '2', value: 'notend' }).then(res => {
        this.startedActivityOption = res
        res.forEach(item => this.dynamicForm.dynamicData[0].selectOption.push(item))
      })
    },
    async addHandle () {
      this.dynamicForm.dynamicData.push({
        selectOption: await this.addSetOption(),
        itemId: this.$createUUID(),
        activityId: '',
        rules: ''
      })
    },
    addSetOption () {
      const option = []
      this.startedActivityOption.forEach(item => {
        if (!this.allSelectId.includes(item.value)) {
          option.push(item)
        }
      })
      return option
    },
    deleteItem (id) {
      if (this.dynamicForm.dynamicData.length < 2) {
        return false
      }
      const targetIndex = this.dynamicForm.dynamicData.findIndex(i => i.itemId === id)
      if (targetIndex !== -1) {
        this.dynamicForm.dynamicData.splice(targetIndex, 1)
        // 删除后改变select
        this.selectChangeHandle('', true)
      }
    },
    async selectChangeHandle (index, isDelete) {
      this.allSelectId = []
      await this.dynamicForm.dynamicData.map(item => {
        if (item.activityId) {
          this.allSelectId.push(item.activityId)
        }
      })
      await this.dynamicForm.dynamicData.forEach((item, currentIndex) => {
        if (currentIndex !== index || isDelete) {
          item.selectOption = this.selectSetOption(item.activityId)
        }
      })
    },
    selectChange (selectValue, index) {
      this.selectChangeHandle(index)
    },
    selectSetOption (curId) {
      const option = []
      this.startedActivityOption.forEach(item => {
        if (!this.allSelectId.includes(item.value) || item.value === curId) {
          option.push(item)
        }
      })
      return option
    },
    validForm () {
      return new Promise((resolve, reject) => {
        this.$refs.dynamicForm.validate((valid, object) => {
          if (valid) {
            this.submitData().then(res => {
              resolve(res)
            })
          } else {
            scrollView(object, this)
            resolve(false)
            return false
          }
        })
      })
    },
    submitData () {
      const submitForm = {
        linkId: this.addEditId,
        activityList: JSON.stringify(this.dynamicForm.dynamicData)
      }
      return new Promise((resolve, reject) => {
        this.$request.post('/linkconfig/setlinkpromotion', submitForm).then(res => {
          if (res.errorCode === 1) {
            this.$message.success('保存成功')
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
