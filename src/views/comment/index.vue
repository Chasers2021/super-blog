<template>
  <div class="main-content-container">
    <n-data-table
      :columns="columns"
      :data="list"
      :pagination="pagination"
      :bordered="false"
    />
  </div>
</template>

<script setup lang="ts">
import { NDataTable } from 'naive-ui';
import { ref, reactive, onBeforeMount } from 'vue';
import { findPage } from '@/api/comment';

const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: 'pID',
    key: 'parentId'
  },
  {
    title: '文章 ID',
    key: 'articleId'
  },
  {
    title: '内容',
    key: 'content'
  },
  {
    title: '操作',
    key: 'actions'
  }
];
const list = ref<any []>([]);
const pagination = reactive({
  pageSize: 10,
  page: 1
});
onBeforeMount(async () => {
  const res = await findPage(pagination);
  list.value = res.data.list;
});
</script>
