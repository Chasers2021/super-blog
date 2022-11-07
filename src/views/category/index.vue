<template>
  <div class="main">
    <header class="header">分类列表</header>
    <n-card title="卡片插槽示例">
      <template #header>
        分类1
      </template>
      分类描述内容
      <template #footer>
       分类描述
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { getCategories } from '@/api/category';
  import { useNotification } from 'naive-ui';
  const notification = useNotification();

  onMounted(async () => {
    try {
      await getCategories();
    } catch (error) {
      notification.warning({
        content: '说点啥呢',
        meta: '想不出来',
        duration: 1500,
        keepAliveOnHover: true
      });
    }
  });
</script>

<style lang="less" scoped>
  .main {
    padding-left: 20px;
    background-color: rgb(24, 24, 28);
    padding-bottom: 20px;

    .header {
      height: 40px;
      font-size: 16px;
      line-height: 40px;
    }
  }
</style>
