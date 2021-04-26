<template>
  <el-dialog :title="modalTitle"
             :top="offestTop"
             :destroy-on-close="true"
             :close-on-click-modal="false"
             :visible.sync="modalShow"
             width="438px"
             custom-class="custom-dialog"
             :before-close="modalCancel">
    <el-form :model="modalForm"
             :rules="modalFormRules"
             ref="moadlForm"
             label-width="82px">
      <el-form-item label="店铺名称："
                    prop="shop_name">
        <el-input v-model="modalForm.shop_name"
                  placeholder="请输入店铺名称"
                  maxlength=50
                  :disabled="disabled"
                  autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="店铺链接："
                    prop="shop_url">
        <el-input v-model="modalForm.shop_url"
                  placeholder="请输入店铺链接"
                  maxlength=100
                  autocomplete="off">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="modalCancel">取 消</el-button>
      <el-button type="primary"
                 @click="modalConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import tableMixin from '@/mixins/dealTable'
import { modalForm, modalFormRules } from './modalFormData'
export default {
  mixins: [tableMixin],
  props: {
    modalTitle: {
      type: String,
      required: true
    },
    offestTop: {
      type: String,
      default: '60px'
    },
    modalShow: {
      type: Boolean,
      required: true,
      default: false
    },
    addEditId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      modalForm: JSON.parse(JSON.stringify(modalForm)),
      modalFormRules: modalFormRules,
      disabled: false,
      selectOption: [],
      sellerType: [
        {
          value: 1,
          label: '天猫'
        }, {
          value: 2,
          label: '淘宝'
        }
      ],
      shopOwner: [
        {
          value: 1,
          label: '内部'
        }, {
          value: 0,
          label: '外部'
        }
      ]
    }
  },
  created () {
    if (this.addEditId) {
      this.disabled = true
      this.getFormData()
    } else {
      this.disabled = false
    }
  },
  mounted () {
    this.editModalFormRules()
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
    // 穿梭框搜索
    filterMethod (query, item) {
      return item.label.indexOf(query) > -1
    },
    getFormData () {
      this.$request.post('shopUpdate', { RowGuid: this.addEditId }).then(res => {
        this.modalForm = {
          ...res.data
        }
      })
    },
    restForm (refId) {
      this.$refs[refId].resetFields()
    },
    modalCancel () {
      this.$emit('modalCancel', false)
      this.restForm('moadlForm')
    },
    modalConfirm () {
      this.$refs.moadlForm.validate((valid) => {
        if (valid) {
          this.submitData()
        } else {
          return false
        }
      })
    },
    submitData () {
      const submitParams = {
        RowGuid: this.addEditId,
        shop_name: this.modalForm.shop_name,
        user_id: this.modalForm.user_id,
        shop_id: this.modalForm.shop_id,
        seller_type: this.modalForm.seller_type,
        is_owner: this.modalForm.is_owner,
        shop_url: this.modalForm.shop_url,
        select_brand: this.modalForm.select_brand.join()
      }
      this.$request.post('/shopSave', submitParams).then(res => {
        if (res.errorCode === 1) {
          this.$message.success('保存成功')
          this.$emit('modalConfirm', true)
        } else {
          this.$message.error('保存失败')
        }
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
