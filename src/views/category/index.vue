<template>
  <div class="main">
    <header class="header">分类列表</header>
    <n-card v-for="item in categories" :key="item.id">
      <template #header>
        {{ item.name }}
      </template>
      <template #default>
        {{ item.description }}
      </template>
      <template #action>
        <n-icon size="14">
          <create-outline />
        </n-icon>
        <n-icon size="14">
          <trash />
        </n-icon>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getCategories } from '@/api/category';
  import { Trash, CreateOutline } from '@vicons/ionicons5';
  
  interface Category {
    name: string,
    id: number,
    description: string
  }

  const categories = ref<Category[]>([]);
  const fetchList = async () => {
    const res = await getCategories();
    categories.value = res.data.list;
  };
  fetchList();
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
