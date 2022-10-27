import { createRouter, createWebHistory } from 'vue-router';
const Category = () => import('@/views/category/index.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: 'category'
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        name: '分类管理'
      }
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('@/components/editor/editor.vue'),
      meta: {
        name: '文章管理'
      }
    },
  ]
});


export default router;
