<!--
 * @Author: your name
 * @Date: 2021-05-06 00:13:25
 * @LastEditTime: 2021-05-06 17:57:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2020\registeration\src\components\tag1.vue
-->
<template>
  <div class="tag1">
    <span>{{ content }}:</span>
    <el-button @click="onCloseClick">test</el-button>
  </div>
</template>

<script>
export default {
  name: 'tag1',
  props: {
    // 标签内容
    content: String
  },
  methods: {
    onCloseClick() {
      // 将删除标签事件暴露除去
      const t = {}
      t.isTag = false
      t.isTag1 = true
      t.content = this.content
      this.$emit('delete1', t)
    }
  }
}
</script>
