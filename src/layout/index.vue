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
        <h2 class="title">
          <icon-compontent class="icon-compontent"/>{{ currentRoute.meta.name }}
        </h2>
        <main class="main-content">
          <slot />
        </main>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
  import { EllipsisHorizontalCircle, EllipseOutline } from '@vicons/ionicons5';
  import { useRoute, RouterLink } from 'vue-router';
  import logoSrc from '@/assets/logo-user.svg';
  import { ref, computed, h } from 'vue';
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
        icon: item.meta.useIconForMenu && item.meta.icon
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
  const IconCompontent = computed(() => currentRoute.meta.icon);
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
      .icon-compontent {
        margin-right: 10px;
        top: 3px;
      }

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