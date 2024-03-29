<template>
  <div class="main-content-container">
    <n-data-table
      remote
      :columns="columns"
      :data="list"
      :pagination="pagination"
      :bordered="false"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { NDataTable, NButton, useDialog, useNotification } from 'naive-ui';
  import { ref, reactive, onMounted, h } from 'vue';
  import { useRouter } from 'vue-router';
  import { findPage, deleteById } from '@/api/article';
  const dialog = useDialog();
  const notification = useNotification();
  const router = useRouter();

  const columns = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: '标题',
      key: 'title',
    },
    {
      title: '描述',
      key: 'description'
    },
    {
      title: '操作',
      key: 'actions',
      render(row: any) {
        return [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => handleEdit(row)
            },
            { default: () => '编辑' }
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
              onClick: () => handleDelete(row)
            },
            { default: () => '删除' }
          ),
        ];
      },
    }
  ];
  const list = ref<any []>([]);
  const pagination = reactive({
    pageSize: 10,
    page: 1,
    itemCount: 0
  });

  onMounted(async () => {
    const res = await findPage(pagination);
    list.value = res.data.list;
    pagination.itemCount = res.data.total;
  });

  
const handlePageChange = async (page: number) => {
  pagination.page = page;
  const res = await findPage(pagination);
  list.value = res.data.list;
  pagination.itemCount = res.data.total;
};

  const handleEdit = (row: any) => {
    router.push({
      path: `/article/create/${row.id}`
    });
  };

  const handleDelete = (row: any) => {
    row.id && dialog.warning({
      title: '警告',
      content: '确定删除该文章吗?',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deleteById(row.id);
        notification.success({
          content: '操作成功!', meta: '该文章已删除',
          duration: 1500, keepAliveOnHover: true 
        });
        const res = await findPage(pagination);
        list.value = res.data.list;
        pagination.itemCount = res.data.total;
      }
    });
  };
</script>

<style lang="less" scoped>
</style>