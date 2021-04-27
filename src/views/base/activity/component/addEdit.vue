<template>
  <el-form :model="modalForm"
           :rules="modalFormRules"
           ref="moadlForm"
           label-width="82px">
    <el-form-item label="活动名称："
                  prop="activityName">
      <el-input class="has-limit"
                v-model="modalForm.activityName"
                placeholder="请输入活动名称"
                maxlength=30
                show-word-limit
                autocomplete="off">
      </el-input>
    </el-form-item>
    <el-form-item label="活动时间："
                  prop="timeRange">
      <el-date-picker popper-class="dialog-upper"
                      v-model="modalForm.timeRange"
                      :editable="false"
                      :clearable="false"
                      type="datetimerange"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="活动等级："
                  prop="level">
      <el-select placeholder="请选择活动等级"
                 popper-class="dialog-upper"
                 v-model="modalForm.level">
        <el-option v-for="item in stateOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注："
                  prop="activityMemo">
      <el-input v-model="modalForm.activityMemo"
                autosize
                type="textarea"
                resize="none"
                :clearable="true"
                maxlength="500"
                show-word-limit
                placeholder="请输入备注">
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import tableMixin from '@/mixins/dealTable'
import { modalForm, modalFormRules } from './formData'
import { stateOptions } from '@/common/commonData/baseData'
export default {
  mixins: [tableMixin],
  props: {
    addEditId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      modalForm: JSON.parse(JSON.stringify(modalForm)),
      modalFormRules: modalFormRules,
      stateOptions: stateOptions
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    urlCheck (value) {
      let cutIndex = 0
      const formatVal = value.trim()
      const hkIndex = formatVal.indexOf('.hk')
      const comIndex = formatVal.indexOf('.com')
      if (hkIndex !== -1) {
        cutIndex = hkIndex + 3
      }
      if (comIndex !== -1) {
        cutIndex = comIndex + 4
      }
      if (comIndex === -1 && hkIndex === -1) {
        return false
      }
      const cutStr = formatVal.substring(0, cutIndex)
      this.modalForm.shop_url = cutStr
      return true
    },
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
    },
    editModalFormRules () {
      this.$nextTick(() => {
        this.modalFormRules.shop_url[0].validator = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入店铺链接'))
          } else {
            const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
            if (reg.test(value)) {
              if (this.urlCheck(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的店铺链接'))
              }
            } else {
              callback(new Error('请输入正确的店铺链接'))
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
