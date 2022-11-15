<template>
  <div class="main">
    <header class="header"></header>
    <editor v-model:editor-content="editorContent"/>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Editor from '@/components/Editor/index.vue';

  const editorContent = ref('');
</script>

<style lang="less" scoped>
  .main {
    background-color: rgb(24, 24, 28);
  }
</style>