
<template>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">深色</n-button>
        <n-button @click="theme = null">浅色</n-button>
      </n-space>
      <n-button>
          <RouterLink to="/">Home</RouterLink>
        </n-button>
        <n-button>
          <RouterLink to="/article">article</RouterLink>
        </n-button>
        <n-button>
          <RouterLink to="/preview">preview</RouterLink>
        </n-button>
        <n-button>
          <RouterLink to="/about">About</RouterLink>
        </n-button>
    </n-card>
      
    <RouterView />

  </n-config-provider>


</template>
<script setup lang="ts">
  import { RouterLink, RouterView } from "vue-router";
  import { ref } from "vue";
  import { darkTheme ,NConfigProvider} from 'naive-ui';
  const theme = ref('');
  </script>
  


