<template>
  <div class="login">
    <div class="login-content flex-center flex-item-center">
      <div class="login-back-wrap">
        <div class="login-wrap">
          <div class="login-form">
            <p class="flex-item-center flex-justify-center">
              <img class="title-img"
                   src="@/assets/img/system/title.png">
            </p>
            <p class="sub-title">店铺数据查看、留存、分析系统</p>
            <div class="login-title">
              <h5>账号登录</h5>
              <p>请使用管理员授权的账号密码登录</p>
            </div>
            <el-form :model="loginForm"
                     :rules="loginRules"
                     ref="loginForm">
              <el-form-item prop="staffId"
                            class="form-item">
                <el-input class="reset-login-user"
                          :class="{'focus-login-user':tlShow}"
                          @focus="tlShow=true"
                          @blur="userNameBlur"
                          placeholder="请输入用户名"
                          v-model="loginForm.staffId">
                  <span slot="prefix">
                    <icon type="icon-user-13" />
                    <label class="tl"
                           v-show="tlShow">TL -</label>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item prop="password"
                            class="form-item">
                <el-input placeholder="请输入用户密码"
                          v-model="loginForm.password"
                          show-password
                          @keyup.enter.native="login">
                  <span slot="prefix">
                    <icon type="icon-pwd-13" />
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item class="form-item form-item-btn">
                <el-button class="login-btn"
                           type="primary"
                           @click="login">登 录</el-button>
              </el-form-item>
            </el-form>
            <div class="bottom-tip flex-item-center">
              <div class="line"></div>
              <span>若忘记密码，请联系管理员 </span>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Base64 } from 'js-base64'
export default {
  data () {
    return {
      loginForm: {
        staffId: '',
        password: ''
      },
      loginRules: {
        staffId: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      tlShow: false
    }
  },
  computed: {
    ...mapGetters(['menus'])
  },
  mounted () {
    this.$nextTick(() => {
      this.$watermark.set('', 10)
    })
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    login () {
      this.$refs.loginForm.validate((valid) => {
        const loginData = {
          staffId: `TL-${this.loginForm.staffId}`,
          password: Base64.encode(this.loginForm.password)
        }
        if (valid) {
          this.getUserInfo(loginData).then(res => {
            if (res) {
              this.$router.replace(this.menus[0].path)
              this.$bus.$emit('isLogin')
            }
          })
        } else {
          return false
        }
      })
    },
    userNameBlur () {
      this.loginForm.staffId ? this.tlShow = true : this.tlShow = false
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index";
@import "~@/common/styles/adapt.less";
</style>
