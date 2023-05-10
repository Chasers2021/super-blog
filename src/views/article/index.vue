<template>
  <div class="main-content-container">
    <n-grid x-gap="20">
      <n-gi :span="17">
        <n-form
          ref="articleBasicFormRef"
          :model="articleBasicForm"
          :rules="rules"
        >
          <n-form-item label="标题: " path="title">
            <n-input 
              v-model:value="articleBasicForm.title" 
              clearable
              :allow-input="inputTrim" 
              placeholder="输入名称" 
            />
          </n-form-item>
    
          <n-form-item label="描述: ">
            <n-input
              v-model:value="articleBasicForm.description" 
              type="textarea"
              clearable
              :allow-input="inputTrim"
              placeholder="输入描述" 
            />
          </n-form-item>
    
          <n-form-item label="标签: ">
            <n-space>
              <n-tag
                type="info"
                v-for="item in tagList"
                :key="item.id"
                v-model:checked="item.checked" 
                checkable
              >
                {{ item.name }}
              </n-tag>
            </n-space>
          </n-form-item>
    
          <n-form-item label="内容: " path="content">
            <Editor v-model:editor-content="articleBasicForm.content" ref="editorRef" />
          </n-form-item>
        </n-form>
      </n-gi>

      <n-gi :span="7">
        <n-form
          ref="articleExtraFormRef"
          :model="articleExtraForm"
          :rules="extraRules"
        >    
          <n-form-item label="分类: " path="categoryIdList">
            <n-checkbox-group v-model:value="articleExtraForm.categoryIdList">
              <n-space item-style="display: flex;">
                <n-checkbox 
                  v-for="item in categoryList" 
                  :key="item.id"
                  :value="item.id"
                  :label="item.name" />
              </n-space>
            </n-checkbox-group>
          </n-form-item>
          <n-form-item label="缩略图: " path="thumbnailUrl">
            <n-upload
              action="/api/file/upload"
              list-type="image-card"
              show-download-button
              v-model:file-list="fileList"
              class="upload-image"
              :max="1"
              @remove="handleRemove"
              @finish="handleUploaded"
            >
              Upload
            </n-upload>
          </n-form-item>
        </n-form>
        <n-button type="primary" style="width: 100%;" @click="handleSubmit">
          提交
        </n-button>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
  import { getTags } from '@/api/tag';
  import { getCategories } from '@/api/category';
  import { createArticle, findById, updateArticle } from '@/api/article';
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Editor from '@/components/Editor/index.vue';
  import { useNotification, type FormInst, type UploadFileInfo } from 'naive-ui';

  const currentRoute = useRoute();
  const notification = useNotification();
  const articleBasicFormRef = ref<FormInst | null>(null);
  const articleExtraFormRef = ref<FormInst | null>(null);
  const inputTrim = (value: string) => !value.startsWith(' ') && !value.endsWith(' ');
  const articleBasicForm = reactive({
    title: '',
    description: '',
    content: ''
  });
  const rules = {
    title: { required: true, message: '请输入标题', trigger: 'blur' },
    content: { required: true, message: '请输入内容', trigger: 'blur' }
  };

  const articleExtraForm = reactive({
    categoryIdList: [],
    thumbnailUrl: ''
  });

  const extraRules = {
    categoryIdList: { type: 'array', required: true, message: '请填写分类', trigger: 'change' },
    thumbnailUrl: { required: true, message: '请上传', trigger: 'change' }
  };

  const categoryList = ref<any []>([]);
  const fetchCategoryList = async () => {
    const res = await getCategories();
    categoryList.value = res.data.list;
  };

  const tagList = ref<any []>([]);
  const fetchList = async () => {
    const res = await getTags({
      pageSize: 999,
      page: 1
    });
    tagList.value = res.data.list.map((item: { checked: boolean; }) => {
      item.checked = false;
      return item;
    });
  };

  const fileList = ref<any []>([]);
  const handleUploaded = ({ file, event }: { file: UploadFileInfo, event: ProgressEvent }) => {
    const res = JSON.parse((event.target as XMLHttpRequest).response);
    file.url = `/static/${res.data.filename}`;
    articleExtraForm.thumbnailUrl = file.url;
    return file;
  };

  const handleSubmit = async () => {
    await Promise.all([
      articleBasicFormRef.value?.validate(),
      articleExtraFormRef.value?.validate()
    ]);

    if (currentRoute.params.id) {
      await updateArticle({
        ...articleBasicForm,
        categoryIdList: articleExtraForm.categoryIdList,
        tagIdList: tagList.value.filter(tag => tag.checked).map(tag => tag.id),
        thumbnailUrl: articleExtraForm.thumbnailUrl,
      }, currentRoute.params.id as unknown as number);
    } else {
      await createArticle({
        ...articleBasicForm,
        categoryIdList: articleExtraForm.categoryIdList,
        thumbnailUrl: articleExtraForm.thumbnailUrl,
        tagIdList: tagList.value.filter(tag => tag.checked).map(tag => tag.id)
      });
    }
    notification.success({ 
      content: '操作成功!', meta: '该文章完成创建',
      duration: 1500, keepAliveOnHover: true
    });
  };
  const handleRemove = () => {
    articleExtraForm.thumbnailUrl = '';
  };
  const editorRef = ref(null);
  onMounted(async () => {
    fetchCategoryList();
    if (currentRoute.params.id) {
      await fetchList();
      const res = await findById(currentRoute.params.id as unknown as number);
      articleBasicForm.content = res.data.result.content;
      articleBasicForm.title = res.data.result.title;
      articleBasicForm.description = res.data.result.description;
      articleExtraForm.categoryIdList = res.data.result.categoryIdList;
      articleExtraForm.thumbnailUrl = res.data.result.thumbnailUrl;
      if (articleExtraForm.thumbnailUrl) {
        fileList.value.push({
          url: articleExtraForm.thumbnailUrl,
          status: 'finished'
        });
      }
      tagList.value.forEach(tag => {
        if (res.data.result.tagIdList.find((id: any) => id === tag.id)) tag.checked = true;
      });
      (editorRef.value as any).setEditorValue(articleBasicForm.content);
    } else {
      fetchList();
    }
  });
</script>

<style lang="less" scoped>
.upload-image {
  width: 100%;

  :deep(.n-upload-file-list.n-upload-file-list--grid) {
    display: block;
  }

  :deep(.n-upload-file.n-upload-file--image-card-type) {
    width: 100%;
    height: auto;
  }

  :deep(.n-upload-trigger.n-upload-trigger--image-card) {
    width: 100%;
    .n-upload-dragger {
      padding: 36px 0;
    }
  }
}
</style>
