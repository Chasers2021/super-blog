import { createRouter, createWebHistory } from 'vue-router';
const Category = () => import('@/views/category/index.vue');
const Tag = () => import('@/views/tag/index.vue');
const Article = () => import('@/views/article/index.vue');
const ArticleList = () => import('@/views/article/list.vue');

export const routes = [
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
    path: '/tag',
    name: 'tag',
    component: Tag,
    meta: {
      name: '标签管理'
    }
  },
  {
    path: '/article',
    name: 'article',
    redirect: '/article/list',
    meta: {
      name: '文章管理'
    },
    children: [
      {
        path: '/article/list',
        name: 'articleList',
        meta: {
          name: '文章列表',
        },
        component: ArticleList
      },
      {
        path: '/article/create',
        name: 'createArticle',
        meta: {
          name: '创建文章',
        },
        component: Article
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


export default router;
