<template>
  <el-form :model="modalForm"
           :rules="modalFormRules"
           ref="moadlForm"
           label-width="82px">
    <el-form-item label="活动选择："
                  prop="activityId">
      <el-select popper-class="dialog-upper"
                 placeholder="请选择活动"
                 v-model="modalForm.activityId">
        <el-option v-for="item in activityOption"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动玩法："
                  prop="rules">
      <el-input v-model="modalForm.rules"
                autosize
                type="textarea"
                resize="none"
                :clearable="true"
                maxlength="500"
                show-word-limit
                placeholder="请输入活动玩法">
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import tableMixin from '@/mixins/dealTable'
import { editAitivityForm, editAitivityFormRules } from './formData'

export default {
  mixins: [tableMixin],
  props: {
    // shop或link的id
    dataId: {
      type: [String, Number],
      required: true
    },
    // 1是店铺，2是链接
    activityType: {
      type: [String, Number],
      required: true
    },
    // 活动id
    activityId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      modalForm: JSON.parse(JSON.stringify(editAitivityForm)),
      modalFormRules: editAitivityFormRules,
      activityOption: []
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

    getFormData () {
      this.$request.post('shopUpdate', { RowGuid: this.addEditId }).then(res => {
        this.modalForm = {
          ...res.data
        }
      })
    },
    // restForm (refId = 'moadlForm') {
    //   this.$refs[refId].resetFields()
    // },
    validForm () {
      return new Promise((resolve, reject) => {
        this.$refs.moadlForm.validate((valid) => {
          if (valid) {
            this.submitData().then(res => {
              resolve(res)
            })
          } else {
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
