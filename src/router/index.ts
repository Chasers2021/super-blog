import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//导入所有路由
const modules = import.meta.globEager('./modules/**/*.ts')
const routeModuleList: RouteRecordRaw[] = [];
Object.keys(modules).forEach(key=>{
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
})


//根节点
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}
//登录路由
const loginRoute:RouteRecordRaw = {
  path:'login',
  name:'Login',
  component:()=> import('@/views/login/index.vue'),
  meta:{
    title:'登录'
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('../views/Preview.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/Article.vue')
    },
  ]
})


export default router
