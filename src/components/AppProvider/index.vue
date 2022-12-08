<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <slot name="default"></slot>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
  import { NDialogProvider, NNotificationProvider, NLoadingBarProvider } from 'naive-ui';
</script>
