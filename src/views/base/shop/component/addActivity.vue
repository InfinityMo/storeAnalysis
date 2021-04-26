<template>
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
      <div class="form-item">
        <el-form-item label="活动选择："
                      :ref="'dynamicData.' + index + '.activityId'"
                      :prop="'dynamicData.' + index + '.activityId'"
                      :rules="{required: true, message: '请选择活动', trigger: 'change'}">
          <el-select placeholder="请选择活动"
                     v-model="dynamicItem.activityId">
            <el-option v-for="item in activityOption"
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
         v-if="dynamicForm.dynamicData.length<5">
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
            itemId: this.$createUUID(),
            activityId: '',
            rules: ''
          }
        ]
      },
      activityOption: []
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    addHandle () {
      this.dynamicForm.dynamicData.push({
        itemId: this.$createUUID(),
        activityId: '',
        rules: ''
      })
    },
    deleteItem (id) {
      if (this.dynamicForm.dynamicData.length < 2) {
        return false
      }
      const targetIndex = this.dynamicForm.dynamicData.findIndex(i => i.dynamicId === id)
      if (targetIndex !== -1) {
        this.dynamicForm.dynamicData.splice(targetIndex, 1)
      }
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
      // const submitParams = {
      //   RowGuid: this.addEditId,
      //   shop_name: this.modalForm.shop_name,
      //   user_id: this.modalForm.user_id,
      //   shop_id: this.modalForm.shop_id,
      //   seller_type: this.modalForm.seller_type,
      //   is_owner: this.modalForm.is_owner,
      //   shop_url: this.modalForm.shop_url,
      //   select_brand: this.modalForm.select_brand.join()
      // }
      return new Promise((resolve, reject) => {
        resolve(true)
        // this.$request.post('/shopSave', submitParams).then(res => {
        //   if (res.errorCode === 1) {
        //     this.$message.success('保存成功')
        //     resolve(true)
        //   } else {
        //     resolve(false)
        //   }
        // })
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
