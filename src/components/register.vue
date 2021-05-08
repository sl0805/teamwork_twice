<template>
  <div class="register_container">
    <el-header>
      <div>
        <span class="title">注册</span>
      </div>
      <div>
        <el-link @click="login" class="register_btn">登录</el-link>
        <el-link @click="manager">管理员登陆入口</el-link>
      </div>
    </el-header>
    <!---->
    <div class="register_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="" alt="" />
      </div>
      <!--登录表单区域-->
      <el-form
        :model="registerForm"
        label-width="0px"
        class="register_form"
        :rules="registerFormRules"
        ref="registerFormRef"
        ><!--registerFormRef就是表单的实例对象-->
        <el-form-item prop="inviteCode">
          <label class="tip">邀请码</label>
          <el-input
            prefix-icon="el-icon-search"
            v-model="registerForm.inviteCode"
            class="register_input"
          ></el-input>
        </el-form-item>
        <!--email-->
        <el-form-item prop="email">
          <label class="tip">邮箱</label>
          <el-input
            prefix-icon="el-icon-search"
            v-model="registerForm.email"
            class="register_input"
          ></el-input>
        </el-form-item>
        <!--用户名-->
        <el-form-item prop="username">
          <label class="tip">用户名</label>
          <el-input
            prefix-icon="el-icon-search"
            v-model="registerForm.username"
            class="register_input"
          ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <label class="tip">密码</label>
          <el-input
            prefix-icon="el-icon-search"
            v-model="registerForm.password"
            type="password"
            class="register_input"
          ></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item prop="passwordAgain">
          <label class="tip">确认密码</label>
          <el-input
            prefix-icon="el-icon-search"
            v-model="registerForm.passwordAgain"
            type="password"
            class="register_input"
          ></el-input>
        </el-form-item>
        <!--验证码-->
        <el-form-item prop="inputVerify">
          <label class="tip">验证码</label>
          <el-input
            prefix-icon="el-icon-search"
            v-model="registerForm.inputVerify"
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
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="" class="background" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  这是登录表单的数据绑定对象
      registerForm: {
        email: '957309025@qq.com',
        username: '2',
        password: '2',
        passwordAgain: '2',
        inviteCode: '',
        inputVerify: '',
        gender: 0
      },
      codeImg: '',
      //  这是表单的验证规则对象
      registerFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
          //  { validator: this.judgeEmail, trigger: 'change' }
        ],
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        //  验证两次密码是否一致
        passwordAgain: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          //  { validator: this.passwordTwice, trigger: 'change' }
        ],
        inviteCode: [
          { required: true, message: '请输入邀请码', trigger: 'blur' }
        ],
        inputVerify: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
    //  两次密码是否一致的验证规则
    passwordTwice(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error('两次密码不一致！'))
      } else callback()
    },
    //  邮箱是否合法
    judgeEmail(rule, value, callback) {
      //  var judge = /[a-zA-Z0-9_]{1,}[@][a-z0-9]{2,3}[.][a-z]{2,3}/g
      var judge =
        '^\\s*\\w+(?:\\.?[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$'
      if (value.match(judge) !== value) {
        callback(new Error('请输入正确的邮箱！'))
      } else callback()
      // 使用valiator校验规则时，一定要返回一个回调函数
      //  就算没有else需求也要写else，这样子validate方法进行表单预校验才能生效
    },
    //  跳转到登录界面
    login() {
      this.$router.push('/auth/login')
    },
    //  跳转到管理员登录界面
    manager() {
      this.$router.push('/manager/login')
    },
    //  注册
    register() {
      //  访问到表单的引用对象this.$refs.registerFormRef, validate进行表单的预校验，validate中接收一个回调函数，valid为布尔值，判断表单是否通过验证
      this.$refs.registerFormRef.validate(async (valid) => {
        console.log('!')
        if (!valid) return false
        //  把传输的数据从json格式改成form-data格式，才可以成功被后台数据接收
        const postData = this.$qs.stringify(this.registerForm)
        //  解构data数据
        const { data: res } = await this.$http.post('/auth/register', postData)
        if (res.code !== 201) {
          //  return this.$message.error('该邮箱已被注册')
          alert('该邮箱已被注册')
        }
        alert('注册成功')
        this.$router.push('/manager/login')
      })
    }
  }
}
</script>

<style scoped src="../assets/css/userRegister.css">
</style>
