<!--
 * @Author: your name
 * @Date: 2021-03-29 19:00:07
 * @LastEditTime: 2021-05-02 21:01:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2020\registeration\src\components\index.vue
-->
<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span>超级管理员界面</span>
      </div>
      <div>
        <el-link type="info" @click="dialogVisible = true" style="color: black">
          注销
        </el-link>
      </div>

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
            :default-openeds="['2']"
            :default-active="defaultAc"
            class="el-menu-vertical-demo"
            background-color="rgb(255, 183, 64)"
            text-color="black"
            active-text-color="rgb(255, 57, 0)"
            ><!--default-active="2" default-openeds="['2']"-->
            <el-menu-item index="1" @click="apartments">
              <template slot="title">
                <i class="el-icon-place"></i>
                <span>管理员列表</span>
              </template>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>部门列表</span>
              </template>

              <el-menu-item
                v-for="(department, index) in departments"
                :key="index"
                @click="apartments(index)"
                :index="department.name + department.id"
              >
                <template slot="title">
                  <i class="el-icon-s-flag"></i>
                  <span>{{ department.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/super/newDepartment">新建部门</el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <div :data="departments">{{ departments[id] }}</div>
        <el-button @click="invite">生成邀请码</el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      departments: [],
      defaultAc: '',
      id: 1
    }
  },
  async created() {
    const { data: res } = await this.$http.get('/manager/listAllDepartment')
    this.departments = res.data
    this.id = this.$route.query.id - 1
    this.defaultAc =
      this.departments[this.id].name + this.departments[this.id].id
  },
  methods: {
    apartments(id) {
      //  this.$router.push('/super/apartments')
      this.id = id
      this.$router.push({ path: '/super/apartments', query: { id: id + 1 } })
    },
    logout() {
      this.dialogVisible = false
      this.$router.push('/manager/login')
    },
    async invite() {
      const { data: res } = await this.$http.get(
        'manager/getInviteCode?departmentId=' + this.id + '&timeOut=3'
      )
      console.log(res.data)
    }
  }
}
</script>

<style scoped src="../assets/css/manager.css">
</style>
