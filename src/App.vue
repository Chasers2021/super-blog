
<template>
  <n-config-provider :theme="theme" class="config-provider">
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppProvider from '@/components/AppProvider/index.vue';
  import { ref } from 'vue';
  import { darkTheme, NConfigProvider } from 'naive-ui';
  const theme = ref(darkTheme);
</script>

<style lang="less" scoped>
  .config-provider {
    height: 100%;
  }
</style>
