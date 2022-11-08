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
        :value="selectedKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menus"
      />
    </n-layout-sider>

    <n-layout-content class="main">
      <h1 class="title">{{ currentRoute.meta.name }}</h1>
      <slot />
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
  import { ref, computed, h } from 'vue';
  import { useRouter, useRoute, RouterLink } from 'vue-router';

  const router = useRouter();
  const currentRoute = useRoute();
  const routes = router.getRoutes();
  const collapsed = ref<boolean>(false);

  const menus = computed(() => {
    return routes.filter(route => route.meta).map((item) => ({
      label: () => h(
        RouterLink,
        {
          to: {
            name: item.name,
          }
        },
        { default: () => item.meta.name }
      ),
      key: item.name
    }));
  });

  const selectedKey = computed(() => currentRoute.name);
</script>

<style lang="less" scoped>
  .main {
    padding: 0 20px;

    .title {
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      background-color: rgb(24, 24, 28);
    }
  }
</style>