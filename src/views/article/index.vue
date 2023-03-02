<template>
  <div class="main">
    <header class="header"></header>

    <n-grid x-gap="20" style="padding: 12px;">
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
            <editor v-model:editor-content="articleBasicForm.content" />
          </n-form-item>
        </n-form>
      </n-gi>

      <n-gi :span="7">
        <n-form
          ref="articleExtraFormRef"
          :model="articleExtraForm"
          :rules="extraRules"
        >    
          <n-form-item label="分类: ">
            <n-checkbox-group v-model:value="articleExtraForm.categotyIdList">
              <n-space item-style="display: flex;">
                <n-checkbox 
                  v-for="item in categoryList" 
                  :key="item.id"
                  :value="item.id"
                  :label="item.name" />
              </n-space>
            </n-checkbox-group>
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
  import { createArticle, findPage } from '@/api/article';
  import { ref, reactive, onMounted } from 'vue';
  import Editor from '@/components/Editor/index.vue';
  import { useNotification, type FormInst } from 'naive-ui';

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
    categotyIdList: []
  });
  const extraRules = {};
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

  const handleSubmit = async () => {
    console.log(articleBasicForm, 'articleBasicForm');
    console.log(articleExtraForm, 'articleExtraForm');
    await createArticle({
      ...articleBasicForm,
      categoryIdList: articleExtraForm.categotyIdList,
      tagIdList: tagList.value.filter(tag => tag.checked).map(tag => tag.id)
    });
    notification.success({ 
      content: '操作成功!', meta: '该文章完成创建',
      duration: 1500, keepAliveOnHover: true
    });
  };

  onMounted(() => {
    fetchList();
    fetchCategoryList();
    findPage({
      pageSize: 10,
      page: 1
    });
  });
</script>

<style lang="less" scoped>
  .main {
    background-color: rgb(24, 24, 28);
  }
</style>
