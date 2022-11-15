<template>
  <div class="tool-box">
    <n-button size="small" class="preview-button" @click="handlePreview">预览</n-button>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['usePreview']);
  const handlePreview = () => emit('usePreview');
</script>

<style lang="less" scoped>
  .tool-box {
    height: 46px;
    padding: 0 16px;
    border-bottom: 1px solid #434343;
    background-color: #000;

    .preview-button {
      float: right;
      margin-top: 10px;
    }
  }
</style>
