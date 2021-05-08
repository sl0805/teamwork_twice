<!--
 * @Author: your name
 * @Date: 2021-02-25 15:10:13
 * @LastEditTime: 2021-04-27 20:59:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2020\front_java\src\components\login.vue
-->
<template>
  <div class="login_container">
    <el-header>
      <div>
        <img class="img" src="" alt="" />
        <span class="title">部门简介</span>
      </div>
      <div>
        <el-link @click="manager">普通管理员登陆入口</el-link>
      </div>
    </el-header>
    <div class="login_box">
      <div
        class="block"
        style="
          background-color: gray;
          width: 50%;
          margin-top: 20px;
          margin-left: 500px;
        "
      >
        <span class="demonstration">部门简介</span>
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">部门{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    manager() {
      this.$router.push('/manager/login')
    }
  }
}
</script>

<style scoped src="../assets/css/home.css">
</style>
