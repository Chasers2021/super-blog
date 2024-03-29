<template>
  <div class="main-content-container">
    <div class="container">
      <header class="header">
        标签列表({{ total }})
        <n-button class="create-button" type="primary" @click="handleCreate">
          + 创建标签
        </n-button>
      </header>
      <n-data-table
        :columns="columns"
        :data="list"
        :pagination="pagination"
        :bordered="false"
      />
    </div>

    <n-modal
      v-model:show="visible"
      preset="dialog" 
      :showIcon="false"
      :on-after-leave="handleClose"
    >
      <template #header><div>{{ tagTitle }}</div></template>
      
      <template #default>
        <n-form
          ref="tagFormRef"
          :label-width="80"
          :model="tagForm"
          :rules="rules"
        >
          <n-form-item label="名称: " path="name">
            <n-input 
              v-model:value="tagForm.name" 
              clearable
              :allow-input="inputTrim" 
              placeholder="输入名称" 
            />
          </n-form-item>
          <n-form-item label="code: " path="code">
            <n-input 
              v-model:value="tagForm.code" 
              clearable
              :allow-input="inputTrim" 
              placeholder="请输入" 
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
              v-model:value="tagForm.icon" 
              clearable
              :allow-input="inputTrim" 
            />
          </n-form-item>
          <n-form-item label="描述: ">
            <n-input
              v-model:value="tagForm.description" 
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
  import { getTags, createTag, updateTag, deleteTag } from '@/api/tag';
  import { computed, onMounted, reactive, ref, h } from 'vue';
  import {
    NButton,
    NDataTable,
    NForm,
    NFormItem,
    NInput,
    NModal,
    useDialog,
    useNotification,
    type FormInst,
    type UploadFileInfo
  } from 'naive-ui';

  const dialog = useDialog();
  const notification = useNotification();
  const list = ref<any []>([]);
  const total = ref(0);
  const columns = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: '名称',
      key: 'name',
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


  const pagination = reactive({
    pageSize: 10,
    page: 1
  });

  const visible = ref(false);
  const handleCreate = () => visible.value = true;
  const inputTrim = (value: string) => !value.startsWith(' ') && !value.endsWith(' ');
  const tagFormRef = ref<FormInst | null>(null);
  const isUpdate = computed(() => tagForm.id);
  const tagTitle = computed(() => isUpdate.value ? '编辑标签' : '新标签');

  const uploadHeaders = {
    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
  };

  const fileList = ref<any []>([]);
  const tagForm = reactive({
    name: '',
    description: '',
    id: null,
    code: '',
    icon: '',
    backgroundUrl: ''
  });

  const handleRemove = () => {
    tagForm.backgroundUrl = '';
    fileList.value = [];
  };

  const handleUploaded = ({ file, event }: { file: UploadFileInfo, event: ProgressEvent }) => {
    const res = JSON.parse((event.target as XMLHttpRequest).response);
    file.url = `/static/${res.data.filename}`;
    tagForm.backgroundUrl = file.url;
    return file;
  };

  const handleEdit = (row: any) => {
    visible.value = true;
    Object.assign(tagForm,  row);
    if (tagForm.backgroundUrl) {
      fileList.value = [{
        url: tagForm.backgroundUrl,
        status: 'finished'
      }];
    } else {
      fileList.value = [];
    }
  };

  const handleDelete = (row: any) => {
    row.id && dialog.warning({
      title: '警告',
      content: '确定删除该标签吗?',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deleteTag(row.id as number);

        notification.success({
          content: '操作成功!', meta: '该标签已删除',
          duration: 1500, keepAliveOnHover: true 
        });

        await fetchList();
      }
    });
  };

  const handleClose = () => {
    tagForm.name = '';
    tagForm.description = '';
    tagForm.id = null;
    tagForm.icon = '';
    tagForm.code = '';
    tagForm.backgroundUrl = '';
  };

  const handleCancel = () => {
    visible.value = false;
  };

  const handleConfirm = async () => {
    await tagFormRef.value?.validate();
    let meta = '';
  
    if (isUpdate.value) {
      await updateTag(tagForm.id as unknown as number, tagForm);
      meta = '该标签完成修改';
    } else {
      await createTag(tagForm);
      meta = '该标签完成创建';
    }
    notification.success({ 
      content: '操作成功!', meta,
      duration: 1500, keepAliveOnHover: true
    });
    visible.value = false;
    await fetchList();
  };

  const rules = {
    name: {
      required: true,
      message: '请输入名称',
      trigger: 'blur'
    }
  };

  const fetchList = async () => {
    const res = await getTags(pagination);
    list.value = res.data.list;
    total.value = res.data.total;
  };

  onMounted(() => {
    fetchList();
  });
</script>

<style lang="less" scoped>
  .main-content-container {
    .container {
      width: 100%;
    }

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
  }
</style>