<template>
  <div class="login-page">
    <div class="login-form">
      <n-form
        style="width: 400px;"
        ref="formRef"
        size="large"
        :model="form"
        :rules="rules"
        :show-label="false"
      >
        <n-form-item path="account" label="账号">
          <n-input v-model:value="form.account" @keydown.enter.prevent>
            <template #prefix>
              <n-icon :component="PersonCircleOutline" />
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="form.password"
            type="password"
            @keydown.enter.prevent
          >
            <template #prefix>
              <n-icon :component="KeyOutline" />
            </template>
          </n-input>
        </n-form-item>

        <n-form-item>
          <n-button color="#fff200" style="width: 100%;" @click="handleLogin">登录</n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PersonCircleOutline, KeyOutline } from '@vicons/ionicons5';
import type { FormInst } from 'naive-ui';
import { getPublicKey, login } from '@/api/rsa';
import JSEncrypt from 'jsencrypt';

const form = reactive({
  account: '',
  password: ''
});
const rules = {
  account: {
    required: true,
    message: '请输入账号',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
};
const formRef =  ref<FormInst | null>(null);
const handleLogin = async () => {
  await formRef.value?.validate();
  const res = await getPublicKey();
  const publicKey = res.data;
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  const password = encryptor.encrypt(form.password);
  await login({
    ...form,
    password
  });
};
</script>

<style lang="less" scoped>
.login-page {
  // background-color: #212631;
  background-color: rgb(16, 16, 20);
  width: 100%;
  height: 100%;
  .login-form {
    width: 40%;
    min-width: 500px;
    position: fixed;
    height: 100%;
    right: 0;
    top: 0;
    background-color: #18181c;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: linear-gradient(206.16deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 101.12%);
  }
}
</style>
