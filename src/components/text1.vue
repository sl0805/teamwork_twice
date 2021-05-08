<!--
 * @Author: your name
 * @Date: 2021-05-06 00:13:25
 * @LastEditTime: 2021-05-06 23:57:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2020\registeration\src\components\tag1.vue
-->
<template>
  <div class="text1">
    <div v-if="!yes_no">
      <p>请输入标题</p>
      <el-input v-model="title" placeholder="请输入内容"></el-input>
    </div>
    <div v-else>{{ title }}</div>
    <div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button @click="onCloseClick">delete</el-button>
      <el-button @click="yes">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'text1',
  props: {
    // 标签内容
    title: String,
    input: String
  },

  methods: {
    onCloseClick() {
      // 这个即调用父组件中的delete函数，并把title作为参数
      const t = {}
      t.isTag = true
      t.isTag1 = false
      t.title = this.title
      t.input = this.input
      this.$emit('delete', t)
    },
    yes() {
      this.yes_no = true
      this.$emit('getInfo', this.title)
    }
  },
  data() {
    return {
      yes_no: false
    }
  }
}
</script>

<style scoped>
.textarea {
  display: inline-block;
  margin: 3px;
}
</style>
