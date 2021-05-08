<!--
 * @Author: your name
 * @Date: 2021-03-29 19:00:07
 * @LastEditTime: 2021-05-02 22:11:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2020\registeration\src\components\index.vue
-->
<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span>普通管理员界面</span>
      </div>
      <el-link type="info" @click="dialogVisible = true" style="color: black">
        注销
      </el-link>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <span>确定要退出吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="logout">确 定</el-button>
        </span>
      </el-dialog>
    </el-header>
    <el-container>
      <el-aside :span="12">
        <el-col>
          <el-menu
            router
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="rgb(255, 183, 64)"
            text-color="black"
            active-text-color="rgb(255, 57, 0)"
            ><!--default-active="2" default-openeds="['2']"-->
            <el-menu-item index="1">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-submenu index="2" @click="apartments">
              <template slot="title">
                <i class="el-icon-place"></i>
                <span>我管理的部门</span>
              </template>
              <el-menu-item index="/manager/apartments" :data="departments">
                {{ departments }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/manager/assignList">
              <i class="el-icon-tickets"></i>
              <span>报名名单</span>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>考核轮次</span>
              </template>
              <el-menu-item index="4-1" @click="round">
                <template slot="title">
                  <i class="el-icon-s-flag"></i>
                  <span>一轮考核</span>
                </template>
              </el-menu-item>
              <el-menu-item index="4-2">
                <template slot="title">
                  <i class="el-icon-s-flag"></i>
                  <span>二轮考核</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/manager/issue">
              <template>
                <i class="el-icon-position"></i>
                <span>发布考核任务</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>个人信息</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      departments: 0
    }
  },
  created() {
    //  this.$http.get()
    this.departments = this.$route.params.departments
  },
  methods: {
    apartments() {
      this.$router.push('/manager/apartments')
    },
    round() {
      this.$router.push('/manager/round')
    },
    logout() {
      this.dialogVisible = false
      this.$router.push('/manager/login')
    }
  }
}
</script>

<style scoped src="../assets/css/manager.css">
</style>
