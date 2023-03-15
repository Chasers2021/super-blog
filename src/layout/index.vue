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
      <div class="logo" :class="!collapsed ? 'expand' : ''">
        <img :src="logoSrc" alt="" srcset="">
        <span v-if="!collapsed">Naive UI</span>
      </div>

      <n-menu
        :value="selectedKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menus"
      />
    </n-layout-sider>

    <n-layout>
      <n-layout-header class="header">
        <n-icon size="18" style="margin-right: 16px;"><ellipsis-horizontal-circle /></n-icon>
        <n-icon size="18"><ellipse-outline /></n-icon>
      </n-layout-header>

      <n-layout-content content-style="padding: 16px;" class="main">
        <h2 class="title">{{ currentRoute.meta.name }}</h2>
        <main class="main-content">
          <slot />
        </main>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
  import { ref, computed, h } from 'vue';
  import { useRoute, RouterLink } from 'vue-router';
  import { routes } from '@/router';
  import logoSrc from '@/assets/logo-user.svg';
  import { EllipsisHorizontalCircle, EllipseOutline } from '@vicons/ionicons5';

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
        icon: item.icon
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
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    white-space: nowrap;
  
    > img {
      height: 32px;
      width: 32px;
    }
  }

  .expand {
   justify-content: flex-start;
   padding-left: 32px;
  
    > img {
      margin-right: 12px;
    }
  }

  .header {
    height: 64px;
    display: flex;
    padding-left: 32px;
    align-items: center;
  }

  .main {
    height: calc(100% - 64px);

    .title {
      height: 80px;
      line-height: 80px;
      padding-left: 16px;
      background-color: rgb(24, 24, 28);
      margin: 0px;
      margin-bottom: 16px;
    }

    .main-content {
      width: 100%;
      background-color: rgb(24, 24, 28);
    }
  }
</style>