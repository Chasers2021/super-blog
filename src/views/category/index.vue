<template>
  <div class="main-content-container">
    <main class="container">
      <header class="header">
        分类列表({{ categories.length }})
        <n-button class="create-button" type="primary" @click="handleCreate">
          + 创建分类
        </n-button>
      </header>
      <div class="container-card">
        <n-card v-for="item in categories" :key="item.id" class="category-card">
          <template #header>{{ item.name }}</template>
  
          <template #header-extra>
            <n-button text style="margin-right: 8px;" @click="handleEdit(item)">
              <n-icon size="16"><create-outline /></n-icon>
              编辑
            </n-button>
            <n-button text @click="handleDelete(item)">
              <n-icon size="16"><trash /></n-icon>
              删除
            </n-button>
          </template>
  
          <template #default>{{ item.description }}</template>
        </n-card>
      </div>
    </main>

    <n-modal
      v-model:show="visible"
      preset="dialog" 
      :showIcon="false"
      :on-after-leave="close"
    >
      <template #header><div>{{ categoryTitle }}</div></template>
      
      <template #default>
        <n-form
          ref="categoryFormRef"
          :label-width="80"
          :model="categoryForm"
          :rules="rules"
        >
          <n-form-item label="名称: " path="name">
            <n-input 
              v-model:value="categoryForm.name" 
              clearable
              :allow-input="inputTrim" 
              placeholder="输入名称" 
            />
          </n-form-item>
          <n-form-item label="背景图: " path="backgroundUrl">
            <n-upload
              action="/api/file/upload"
              list-type="image-card"
              show-download-button
              :headers="uploadHeaders"
              v-model:file-list="fileList"
              class="upload-image"
              :max="1"
              @remove="handleRemove"
              @finish="handleUploaded"
            >
              Upload
            </n-upload>
          </n-form-item>
          <n-form-item label="icon: " path="icon">
            <n-input 
              v-model:value="categoryForm.icon" 
              clearable
              :allow-input="inputTrim" 
            />
          </n-form-item>
          <n-form-item label="描述: ">
            <n-input
              v-model:value="categoryForm.description" 
              type="textarea"
              clearable
              :allow-input="inputTrim"
              placeholder="输入描述" 
            />
          </n-form-item>
        </n-form>
      </template>

      <template #action>
        <n-button @click="handleCancel">取消</n-button>
        <n-button type="primary" @click="handleConfirm">确认</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, onMounted } from 'vue';
  import {
    getCategories,
    createCategory,
    updateCategoty,
    deleteCategoty
  } from '@/api/category';
  import { Trash, CreateOutline } from '@vicons/ionicons5';
  import { useDialog, useNotification, type FormInst, type UploadFileInfo } from 'naive-ui';

  const dialog = useDialog();
  const notification = useNotification();

  interface Category {
    name: string,
    id?: number,
    description: string,
    backgroundUrl: string,
    icon: string
  }

  const categories = ref<Category[]>([]);
  const fetchList = async () => {
    const res = await getCategories();
    categories.value = res.data.list;
  };

  onMounted(() => {
    fetchList();
  });

  const visible = ref(false);
  const handleCreate = () => visible.value = true;

  const rules = {
    name: {
      required: true,
      message: '请输入名称',
      trigger: 'blur'
    },
    backgroundUrl: {
      required: true,
      message: '请上传',
      trigger: 'blur'
    }
  };
  const uploadHeaders = {
    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
  };
  const categoryFormRef = ref<FormInst | null>(null);
  const categoryForm = reactive({
    name: '',
    description: '',
    id: null,
    backgroundUrl: '',
    icon: ''
  });

  const inputTrim = (value: string) => !value.startsWith(' ') && !value.endsWith(' ');
  const fileList = ref<any []>([]);
  const handleRemove = () => {
    categoryForm.backgroundUrl = '';
    fileList.value = [];
  };

  const handleUploaded = ({ file, event }: { file: UploadFileInfo, event: ProgressEvent }) => {
    const res = JSON.parse((event.target as XMLHttpRequest).response);
    file.url = `/static/${res.data.filename}`;
    categoryForm.backgroundUrl = file.url;
    return file;
  };

  const close = () => {
    categoryForm.name = '';
    categoryForm.description = '';
    categoryForm.id = null;
    categoryForm.backgroundUrl = '';
    categoryForm.icon = '';
  };

  const isUpdate = computed(() => categoryForm.id);
  const categoryTitle = computed(() => isUpdate.value ? '编辑分类' : '新分类');

  const handleConfirm = async () => {
    await categoryFormRef.value?.validate();
    let meta = '';

    if (isUpdate.value) {
      await updateCategoty(categoryForm.id as unknown as number, categoryForm);
      meta = '该分类完成修改';
    } else {
      await createCategory(categoryForm);
      meta = '该分类完成创建';
    }

    notification.success({ 
      content: '操作成功!', meta,
      duration: 1500, keepAliveOnHover: true
    });

    visible.value = false;
    await fetchList();
  };

  const handleCancel = () => visible.value = false;

  const handleEdit = (category: Category) => {
    visible.value = true;
    categoryForm.name = category.name;
    categoryForm.description = category.description;
    categoryForm.id = category.id as any;
    categoryForm.backgroundUrl = category.backgroundUrl;
    categoryForm.icon = category.icon;
    if (categoryForm.backgroundUrl) {
      fileList.value = [{
        url: categoryForm.backgroundUrl,
        status: 'finished'
      }];
    } else {
      fileList.value = [];
    }
  };

  const handleDelete = (category: Category) => {
    category.id && dialog.warning({
      title: '警告',
      content: '确定删除改分类吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deleteCategoty(category.id as number);

        notification.success({
          content: '操作成功!', meta: '该分类已删除',
          duration: 1500, keepAliveOnHover: true 
        });

        await fetchList();
      }
    });
  };
</script>

<style lang="less" scoped>
  .container {
    width: 100%;

    .header {
      height: 60px;
      font-size: 16px;
      line-height: 60px;

      .create-button {
        float: right;
        margin-top: 12px;
        margin-right: 20px;
      }
    }

    &-card {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
  
      .category-card {
        width: 31%;
        margin-bottom: 12px;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
</style>
