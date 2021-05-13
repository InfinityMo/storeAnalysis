<template>
  <div class="head">
    <div class="head-content flex-item-center flex-between">
      <!-- 用户信息 -->
      <div class="flex-item-center user">
        <p class="journal"
           @click="viewJournal">查看日志</p>
        <el-popover placement="bottom"
                    trigger="click"
                    popper-class="user-popover">
          <div slot="reference">
            <div class="flex-item-center user-info">
              <div><img src="@/assets/img/custom/userImg.png"></div>
              <p>欢迎您！{{userName||''}}</p>
            </div>
          </div>
          <div class="user-operate">
            <p class="flex-item-center"
               @click="editPwd"><i class="edit-pwd-icon"></i><span>修改密码</span></p>
            <p class="flex-item-center"
               @click="logout"><i class="log-out-icon"></i><span>退出登录</span></p>
          </div>
        </el-popover>
      </div>
      <slot name="left"></slot>
    </div>
    <el-dialog title="查看日志"
               custom-class="journal-dialog"
               width="1000px"
               top="40px"
               :modal="true"
               :destroy-on-close="true"
               :visible.sync="journalShow">
      <standard-table class="journal-table"
                      :dataSource="tableData"
                      :columns="columns"
                      :paginationLayout="['total', 'prev', 'pager', 'next']"
                      :pagination="PAGING"
                      @tableChange="tableChange" />
    </el-dialog>
    <el-dialog title="更改密码"
               custom-class="edit-pwd"
               :visible.sync="pwdShow"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               :lock-scroll="true"
               :append-to-body="true"
               @close="editPwdClose"
               width="470px">
      <el-form :model="editForm"
               :rules="editRules"
               label-width="96px"
               ref="editForm">
        <el-form-item prop="oripassword"
                      label="旧密码："
                      class="form-item">
          <el-input placeholder="请输入旧密码"
                    v-model="editForm.oripassword"
                    show-password>
          </el-input>
        </el-form-item>
        <el-form-item prop="newpassword"
                      label="新密码："
                      class="form-item">
          <el-input placeholder="请输入新密码"
                    v-model="editForm.newpassword"
                    show-password>
          </el-input>
        </el-form-item>
        <el-form-item prop="newpasswordTwo"
                      label="确认新密码："
                      class="form-item">
          <el-input placeholder="请输入确认新密码"
                    v-model="editForm.newpasswordTwo"
                    show-password>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer user-edit">
        <el-button @click="pwdShow = false">取 消</el-button>
        <el-button type="primary"
                   @click="editHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { Base64 } from 'js-base64'
import store from '@/store'
export default {
  data () {
    var checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editForm.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      journalShow: false,
      pwdShow: false,
      PAGING: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      columns: [{
        dataKey: 'date',
        title: '日期',
        align: 'left',
        width: 150
      }, {
        dataKey: 'user',
        title: '用户',
        align: 'left',
        width: 80
      }, {
        dataKey: 'type',
        title: '操作类型',
        align: 'left',
        width: 80
      }, {
        dataKey: 'detail',
        title: '操作',
        align: 'left'
      }],
      tableData: [],
      editForm: {
        oripassword: '',
        newpassword: '',
        newpasswordTwo: ''
      },
      editRules: {
        oripassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          // 密码至少包含 数字和英文，长度6-20
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码至少包含数字和英文，长度为6-20个字符', trigger: 'blur' }
        ],
        newpasswordTwo: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userName () {
      return (JSON.parse(sessionStorage.getItem(`${store.getters.getTrackId}userData`)) ? JSON.parse(sessionStorage.getItem(`${store.getters.getTrackId}userData`)).staffId : '') || ''
    }
  },
  methods: {
    viewJournal () {
      this.getTableData()
    },
    editPwd () {
      this.pwdShow = true
    },
    editPwdClose () {
      this.$refs.editForm.resetFields()
    },
    // 表格分页的变化
    tableChange (changeParams) {
      this.PAGING.pageSize = changeParams.pageSize
      this.PAGING.pageNum = changeParams.pageNum
      this.getTableData()
    },
    getTableData () {
      this.$request.post('/dialog', {
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
        this.journalShow = true
      })
    },
    editHandle () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const pwdData = {
            staffId: this.userName,
            oripassword: Base64.encode(this.editForm.oripassword),
            newpassword: Base64.encode(this.editForm.newpassword)
          }
          this.$request.post('/interfacecommon/changepassword', pwdData).then(res => {
            if (res.errorCode === 1) {
              this.$message.success('密码修改成功')
              localStorage.removeItem(`${store.getters.getTrackId}userData`)
              sessionStorage.removeItem(`${store.getters.getTrackId}userData`)
              this.$router.push('/login')
            }
          })
        } else {
          return false
        }
      })
    },
    logout () {
      localStorage.removeItem(`${store.getters.getTrackId}userData`)
      sessionStorage.removeItem(`${store.getters.getTrackId}userData`)
      localStorage.removeItem('system')
      sessionStorage.removeItem('system')
      this.$store.dispatch('resetUserInfo')
      // 跳转登录
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
// .head {
//   position: fixed;
//   left: 200px;
//   width: calc(100% - 200px);
//   height: 56px;
//   background-color: #fff;
//   box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
//   z-index: 2501;
//   .head-content {
//     flex-direction: row-reverse;
//     // justify-content: flex-end;
//     height: 100%;
//     padding: 0 60px;
//     .user {
//       div {
//         width: 36px;
//         height: 36px;
//         overflow: hidden;
//         img {
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//         }
//       }

//       p {
//         font-size: 14px;
//         margin-left: 10px;
//         color: #333;
//       }
//     }
//   }
// }
@import "~@/common/styles/header";
</style>>
