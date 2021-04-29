<template>
  <el-form :model="modalForm"
           :rules="modalFormRules"
           ref="moadlForm"
           label-width="82px">
    <el-form-item label="店铺名称："
                  prop="title">
      <el-input class="has-limit"
                v-model="modalForm.title"
                placeholder="请输入店铺名称"
                maxlength=30
                show-word-limit
                autocomplete="off">
      </el-input>
    </el-form-item>
    <el-form-item label="店铺Id："
                  prop="shopId">
      <el-input class="has-limit"
                v-model="modalForm.shopId"
                :disabled="Boolean(addEditId)"
                placeholder="请输入店铺Id"
                maxlength=20
                show-word-limit
                autocomplete="off">
      </el-input>
    </el-form-item>
    <el-form-item label="店铺链接："
                  prop="shopLink">
      <el-input v-model="modalForm.shopLink"
                placeholder="请输入店铺链接"
                autocomplete="off">
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import tableMixin from '@/mixins/dealTable'
import { modalForm, modalFormRules } from './formData'
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
      modalFormRules: modalFormRules
    }
  },
  created () {
    if (this.addEditId) {
      this.getFormData()
    }
  },
  mounted () {

  },
  methods: {

    getFormData () {
      this.$request.post('/shopconfig/shopdetail', { shopId: this.addEditId }).then(res => {
        this.modalForm = {
          shopId: this.addEditId,
          ...res.data
        }
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
      const submitForm = {
        ...this.modalForm
      }
      return new Promise((resolve, reject) => {
        this.$request.post('/shopconfig/shopset', submitForm).then(res => {
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
