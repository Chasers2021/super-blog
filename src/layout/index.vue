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
  import { useRoute, RouterLink } from 'vue-router';
  import { routes } from '@/router';

  const currentRoute = useRoute();
  const collapsed = ref<boolean>(false);

  const generateMenus = (menus: any[]) => {
    return menus.filter(item => item.meta).map((item) => {
      const res = {
        label: () => h(
          RouterLink,
          {
            to: {
              name: item.name,
            }
          },
          { default: () => item.meta.name }
        ),
        key: item.name,
      };
      if (Array.isArray(item.children)) {
        (res as any).children = generateMenus(item.children);
      }
      return res;
    });
  };

  const menus = computed(() => {
    return generateMenus(routes);
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