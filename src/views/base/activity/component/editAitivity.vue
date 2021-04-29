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
        <el-option v-for="item in startedActivityOption"
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
import { editAitivityFormRules } from './formData'

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
    },
    modalForm: {
      type: Object,
      required: true,
      default: () => { }
    }
  },
  data () {
    return {
      // modalForm: JSON.parse(JSON.stringify(editAitivityForm)),
      modalFormRules: editAitivityFormRules,
      startedActivityOption: [],
      oldActivityId: ''
    }
  },
  created () {
    this.getNotFinishActivity()
    this.oldActivityId = this.modalForm.activityId
  },
  mounted () {

  },
  methods: {
    getNotFinishActivity () {
      this._fetchSelectData('/promotionconfig/dropdownlist', {
        type: '',
        optionalDict: { key: '2', value: 'notend' }
      }).then(res => {
        this.startedActivityOption = res
      })
    },
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
      let url = ''
      const submitForm = {
        oldActivityId: this.oldActivityId,
        ...this.modalForm
      }
      if (this.activityType === '1') {
        url = '/shopconfig/seteachshoppromotion'
        submitForm.shopId = this.dataId
      } else {
        url = '/linkconfig/seteachlinkpromotion'
        submitForm.linkId = this.dataId
      }
      return new Promise((resolve, reject) => {
        this.$request.post(url, submitForm).then(res => {
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
