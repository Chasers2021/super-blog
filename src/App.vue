
<template>
  <n-config-provider :theme="theme" class="config-provider">
    <n-notification-provider>
      <layout class="layout">
        <router-view />
      </layout>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Layout from './layout/index.vue';
  import { ref } from 'vue';
  import { darkTheme, NConfigProvider } from 'naive-ui';
  const theme = ref(darkTheme);
</script>

<style lang="less" scoped>
  .config-provider {
    height: 100%;

    .layout {
      height: 100%;
    }
  }
</style>
