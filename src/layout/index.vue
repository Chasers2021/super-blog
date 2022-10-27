<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menus"
      />
    </n-layout-sider>
    <slot />
  </n-layout>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const routes = router.getRoutes();
  const collapsed = ref<boolean>(false);

  const menus = computed(() => {
    return routes.filter(route => route.meta).map((item) => ({
      label: item.meta.name,
      key: item.name
    }));
  });
</script>
