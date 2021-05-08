<!--
 * @Author: your name
 * @Date: 2021-03-29 19:00:07
 * @LastEditTime: 2021-05-07 00:01:50
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
            default-active="/manager/issue"
            class="el-menu-vertical-demo"
            background-color="rgb(255, 183, 64)"
            text-color="black"
            active-text-color="rgb(255, 57, 0)"
            ><!--default-active="2" default-openeds="['2']"-->
            <el-menu-item index="/manager">
              <i class="el-icon-user-solid"></i>
              <span slot="title"> 个人信息 </span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-place"></i>
                <span>我管理的部门</span>
              </template>
              <el-menu-item index="/manager/apartments"
                >{ 部门名称 }</el-menu-item
              >
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
              <el-menu-item index="4-2" @click="round">
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
      <el-main>
        <div>
          <!-- 标签容器已经被初始化而且内容多余0条，则显示内容 -->
          <div v-for="(tag, index) in tags" :key="index">
            <text1
              v-if="tag.isTag"
              :data="tag"
              :title="tag.title"
              :input="tag.input"
              @delete="onTagDelete"
              @getInfo="onCommit"
            />
            <tag1
              v-else-if="tag.isTag1"
              :data="[tag, index]"
              :content="tag.content"
              @delete1="onTagDelete(index)"
            />
          </div>
          <!-- 否则，标签只是被初始化了，但是没有数据 -->
          <button @click="addTag">添加文本框</button>
          <button @click="addTag1">添加其他</button>
          <button @click="commit">发布问卷</button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Text1 from './text1.vue'
import Tag1 from './tag1.vue'
export default {
  //
  components: {
    Text1,
    Tag1
  },
  created() {
    // 从网络加载tag数据.
    this.tags = []
  },
  //
  data() {
    return {
      tags: undefined, // 初始化是没有 tag数据的，在页面打开后，通过网络请求获取标签。
      dialogVisible: false,
      questionnaire: {},
      list: []
    }
  },
  methods: {
    round() {
      this.$router.push('/manager/round')
    },
    logout() {
      this.dialogVisible = false
      this.$router.push('/manager/login')
    },
    // 添加tag
    addTag() {
      const t = {}
      t.isTag = true
      t.isTag1 = false
      //  t.title = '标题' + this.tags.length
      //  t.input = '输入'
      this.tags.push(t)
      const test = {}
      test.title = '标题'
      test.type = 'tag'
      test.index = this.tags.length
      test.val = []
      this.list.push(test)
    },
    addTag1() {
      const t = {}
      t.isTag = false
      t.isTag1 = true
      t.content = '侧首' + this.tags.length
      this.tags.push(t)
    },
    onTagDelete(tag) {
      console.log(typeof tag)
      console.log(typeof this.tags[0])
      if (this.tags[0] !== tag) console.log('!!')
      // 从数组中移除。
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    async commit() {
      this.questionnaire.departmentId = 1
      this.questionnaire.title = '测试用卷'
      this.questionnaire.describe = '希望能成功吧'
      this.questionnaire.endDate = {
        date: 0,
        day: 0,
        hours: 0,
        minutes: 0,
        month: 0,
        nanos: 0,
        seconds: 0,
        time: 0,
        timezoneOffset: 0,
        year: 0
      }
      const postdata = {}
      postdata.questionnaire = this.questionnaire
      postdata.problemList = this.list
      console.log(postdata)
      const res = await this.$http.post(
        '/question/insertQuestionnaire',
        //  JSON.stringify(postdata)
        postdata
      )
      console.log(res)
    },
    onCommit(title) {
      console.log(title)
    }
  }
}
</script>

<style scoped src="../assets/css/taskIssue.css">
</style>
