<template>
  <el-form :model="modalForm"
           :rules="modalFormRules"
           ref="moadlForm"
           label-width="82px">
    <el-form-item label="店铺名称："
                  prop="title">
      <el-input v-model="modalForm.title"
                placeholder="请输入店铺名称"
                maxlength=50
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
