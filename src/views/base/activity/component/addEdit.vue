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
                      @change="durationcheck"
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
        <el-option v-for="item in activityLevels"
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
                maxlength="200"
                show-word-limit
                placeholder="请输入备注">
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters('commonModule', ['activityLevels'])
  },
  created () {
    if (this.addEditId) {
      this.getActivityData()
    }
  },
  mounted () {
    // debugger
  },
  methods: {
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
    getActivityData () {
      this.$request.post('/promotionconfig/promotiondetail', { activityId: this.addEditId }).then(res => {
        if (res) {
          const form = res.data
          this.modalForm = {
            ...form
          }
          this.$set(this.modalForm, 'timeRange', [form.start, form.end])
        }
      })
    },
    submitData () {
      const submitForm = {
        activityId: this.addEditId,
        ...this.modalForm,
        start: this.modalForm.timeRange[0] || '',
        end: this.modalForm.timeRange[1] || ''
      }
      delete submitForm.timeRange
      return new Promise((resolve, reject) => {
        this.$request.post('/promotionconfig/promotionset', submitForm).then(res => {
          if (res.errorCode === 1) {
            this.$message.success('保存成功')
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    durationcheck () {
      this.$request.post('/promotionconfig/durationcheck', { start: this.modalForm.timeRange[0] || '', end: this.modalForm.timeRange[1] || '' }).then(res => {
        if (res) {
          if (res.data) {
            this.$confirm('此时间段内已配置过活动，请注意', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            })
          }
        }
      })
    },
    resetFrom () {
      this.$refs.moadlForm.resetFields()
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
