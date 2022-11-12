<template>
  <div class="main">
    <header class="header">
      分类列表({{ categories.length }})
      <n-button 
        class="create-button"
        type="primary"
        @click="createCategory"
      >
        + 创建分类
      </n-button>
    </header>
    <main class="main-content">
      <n-card v-for="item in categories" :key="item.id" class="category-card">
        <template #header>
          {{ item.name }}
        </template>

        <template #header-extra>
          <n-button text style="margin-right: 8px;">
            <n-icon size="16">
              <create-outline />
            </n-icon>
            编辑
          </n-button>
          <n-button text>
            <n-icon size="16">
              <trash />
            </n-icon>
            删除
          </n-button>
        </template>

        <template #default>
          {{ item.description }}
        </template>
      </n-card>
    </main>

    <n-modal v-model:show="visible" preset="dialog" :showIcon="false">
      <template #header>
        <div>新分类</div>
      </template>
      
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
        <n-button @click="cancel">取消</n-button>
        <n-button type="primary" @click="confirm">确认</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { getCategories } from '@/api/category';
  import { Trash, CreateOutline } from '@vicons/ionicons5';
  import type { FormInst } from 'naive-ui';
  
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

  const visible = ref(false);
  const createCategory = () => {
    visible.value = true;
  };

  const rules = {
    name: {
      required: true,
      message: '请输入名称',
      trigger: 'blur'
    }
  };
  const categoryFormRef = ref<FormInst | null>(null);
  const categoryForm = reactive({
    name: '',
    description: ''
  });
  const inputTrim = (value: string) => !value.startsWith(' ') && !value.endsWith(' ');
  const confirm = async () => {
    await categoryFormRef.value?.validate();
    visible.value = false;
  };
  const cancel = () => {
    console.log('cancel');
    visible.value = false;
  };
</script>

<style lang="less" scoped>
  .main {
    padding-left: 20px;
    background-color: rgb(24, 24, 28);
    padding-bottom: 20px;

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

    &-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
  
      .category-card {
        width: 31%;
        margin-bottom: 12px;
      }
    }
  }
</style>
