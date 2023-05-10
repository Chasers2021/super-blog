import { createRouter, createWebHistory } from 'vue-router';
const Category = () => import('@/views/category/index.vue');
const Tag = () => import('@/views/tag/index.vue');
const Article = () => import('@/views/article/index.vue');
const ArticleList = () => import('@/views/article/list.vue');
const Comment = () => import('@/views/comment/index.vue');

import { h, type Component} from 'vue';
import { NIcon } from 'naive-ui';
import {
  AlbumsOutline,
  PricetagsOutline,
  DocumentsOutline,
  ListOutline,
  ReceiptOutline
} from '@vicons/ionicons5';

export const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

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
      name: '分类管理',
      icon: renderIcon(AlbumsOutline),
      useIconForMenu: true
    },
  },
  {
    path: '/tag',
    name: 'tag',
    component: Tag,
    meta: {
      name: '标签管理',
      icon: renderIcon(PricetagsOutline),
      useIconForMenu: true
    },
  },
  {
    path: '/article',
    name: 'article',
    redirect: '/article/list',
    meta: {
      name: '文章管理',
      icon: renderIcon(DocumentsOutline),
      useIconForMenu: true
    },
    children: [
      {
        path: '/article/list',
        name: 'articleList',
        meta: {
          name: '文章列表',
          icon: renderIcon(ListOutline),
        },
        component: ArticleList
      },
      {
        path: '/article/create/:id?',
        name: 'createArticle',
        meta: {
          name: '创建文章',
          icon: renderIcon(ReceiptOutline),
        },
        component: Article
      }
    ]
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment,
    meta: {
      name: '评论管理',
      icon: renderIcon(PricetagsOutline),
      useIconForMenu: true
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


export default router;
