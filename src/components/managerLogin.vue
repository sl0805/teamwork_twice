<!--
 * @Author: your name
 * @Date: 2021-02-25 15:10:13
 * @LastEditTime: 2021-05-07 23:22:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2020\front_java\src\components\login.vue
-->
<template>
  <div class="login_container">
    <el-header>
      <div>
        <img class="img" src="" alt="" />
        <span class="title">普通管理员登录</span>
      </div>
      <div>
        <el-link to="" @click.native="toRegister" class="register_btn">
          注册
        </el-link>
        <el-link @click="manager">超级管理员登陆入口</el-link>
      </div>
    </el-header>
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="" alt="" />
      </div>
      <!--登录表单区域-->
      <el-form
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
        ref="loginFormRef"
        ><!--loginFormRef就是表单的实例对象-->
        <!--用户名-->
        <el-form-item prop="username">
          <label class="tip">账号</label>
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            class="login_input"
          ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <label class="tip">密码</label>
          <el-input
            class="login_input"
            prefix-icon="el-icon-view"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!--验证码-->
        <el-form-item prop="verifyCode">
          <label class="tip">验证码</label>
          <el-input
            prefix-icon="el-icon-search"
            v-model="loginForm.verifyCode"
            style="width: 40%"
          ></el-input>
          <img
            @click="getVerify"
            class="code-img"
            width="85px"
            height="40px"
            title="点击刷新"
            :src="codeImg"
            style="float: right"
          />
        </el-form-item>
        <!--按钮-->
        <el-form-item>
          <div class="btns">
            <el-link @click="findPassword" class="forget_btn"
              >忘记密码?</el-link
            >
            <el-button type="primary" @click="login" class="btn"
              >登录</el-button
            >
            <el-button type="info" @click="resetLoginForm" class="btn"
              >重置</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  这是登录表单的数据绑定对象
      /*  loginForm: {
        username: '1',
        password: 'test',
        verifyCode: ''
      },  */
      loginForm: {
        username: '2',
        password: '2',
        verifyCode: ''
      },
      //  这是验证码图片
      codeImg: '',
      //  这是表单的验证规则对象
      //  trigger: 'blur'是输入框失去焦点时提示错误,'change'会随着输入内容进行提示错误
      loginFormRules: {
        //  验证账号是否合法
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        //  验证密码是否合法
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  跳转到管理员登录界面
    manager() {
      //  this.$router.push('/manager/login')
    },
    //  点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    //  登录功能
    async login() {
      //  访问到表单的引用对象this.$refs.loginFormRef, validate进行表单的预校验，validate中接收一个回调函数，valid为布尔值，判断表单是否通过验证
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return false
        //  把传输的数据从json格式改成form-data格式，才可以成功被后台数据接收
        const postData = this.$qs.stringify(this.loginForm)
        //  解构data数据
        const { data: res } = await this.$http
          .post('/auth/login', postData)
          .catch(() => alert('信息填写错误，请重试！'))
        if (res.code !== 200) return this.$message.error('登陆失败')
        //  this.$message.success('登陆成功')
        //  清除sessionStorage中的验证码token
        window.sessionStorage.clear()
        //  把登录成功后的token存进sessionStorage中，记录登录状态
        window.sessionStorage.setItem('token', res.data)
        //  通过编程式导航跳转到用户主页，路由地址是/home
        this.$router.push('/super')
        //  const departmentId = res.data[1].departmentId
        /*  this.$router.push({
          name: 'manager',
          params: { departments: departmentId }
        })  */
      })
      //  this.$router.push('/manager')
    },
    //  获取验证码图片，并存进codeImg中
    async getVerify() {
      const { data: res } = await this.$http.get('/auth/getVerifyCode')
      if (res.code !== 200) return this.$message.error('验证码获取失败')
      //  获取验证码token后存进sessionStorage中
      window.sessionStorage.setItem('token', res.data)
      this.$http({
        url: '/auth/getVerifyPic',
        method: 'get',
        //  获取图片需要设置响应格式为'blob'
        responseType: 'blob'
      }).then((res) => {
        this.codeImg = window.URL.createObjectURL(res.data)
      })
    },
    //  找回密码要跳回的界面
    findPassword() {
      //  this.$router.push('/auth/findPassword')
    }
  }
}
</script>

<style scoped src="../assets/css/managerLogin.css">
</style>
