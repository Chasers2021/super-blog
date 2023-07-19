<template>
  <div class="main-content-container">
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="form"
    >
      <n-form-item>
        <n-select
          v-model:value="form.status"
          :options="statusOptions"
          @update:value="handleUpdateStatus"
        />
      </n-form-item>
      <n-form-item>
        <n-input v-model:value="form.keyword" placeholder="输入关键词查询" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleSearch">查询</n-button>
      </n-form-item>
    </n-form>
    <n-data-table
      remote
      :columns="columns"
      :data="list"
      :pagination="form.pagination"
      :bordered="false"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { NDataTable, NButton, NSpace, useNotification } from 'naive-ui';
import { ref, reactive, onBeforeMount, h } from 'vue';
import { findPage, updateStatus } from '@/api/comment';

const notification = useNotification();

enum Status {
  NotReviewed = 0,
  Pass = 1,
  Delete = 2,
  Garbage = 3
}

const form = reactive({
  status: '',
  keyword: '',
  pagination: {
    pageSize: 10,
    page: 1,
    itemCount: 0,
  }
});

const handleUpdateStatus = () => {
};

const statusOptions = ref([
  {
    label: '全部状态',
    value: ''
  },
  {
    label: '待审核',
    value: 0
  },
  {
    label: '审核通过',
    value: 1
  },
  {
    label: '已删除',
    value: 2
  },
  {
    label: '垃圾',
    value: 3
  }
]);

const handleSearch = () => {
  fetch();
};

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
    title: '状态',
    key: 'status',
    render(row: any) {
      if (row.status === Status.NotReviewed) return '待审核';
      if (row.status === Status.Pass) return '审核通过';
      if (row.status === Status.Garbage) return '垃圾';
      if (row.status === Status.Delete) return '已删除';
    }
  },
  {
    title: '评论人',
    key: 'commentator',
  },
  {
    title: '内容',
    key: 'content'
  },
  {
    title: '操作',
    key: 'actions',
    render(row: any) {
      return h(NSpace, { vertical: true }, [
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            style: {
              marginLeft: '10px'
            },
            onClick: () => handleClick(row, Status.Pass)
          },
          { default: () => '审核通过' }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            style: {
              marginLeft: '10px'
            },
            onClick: () => handleClick(row, Status.Delete)
          },
          { default: () => '删除' }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            style: {
              marginLeft: '10px'
            },
            onClick: () => handleClick(row, Status.Garbage)
          },
          { default: () => '标为垃圾' }
        ),
      ]);
    },
  }
];

const list = ref<any []>([]);

const fetch = async () => {
  const res = await findPage({
    status: form.status,
    keyword: form.keyword,
    ...form.pagination
  });
  list.value = res.data.list;
  form.pagination.itemCount = res.data.total;
};

const handlePageChange = async (page: number) => {
  form.pagination.page = page;
  await fetch();
};

const handleClick = async (row: any, status: number) => {
  await updateStatus(row.id, { status });
  notification.success({
    content: '操作成功!' ,
    duration: 1500
  });
  fetch();
};

onBeforeMount(() => {
  fetch();
});
</script>
