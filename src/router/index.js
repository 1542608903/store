import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue';
import Category from '@/components/Category.vue';
import Cart from '@/components/Cart.vue';
import Login from '@/components/Login.vue';
import Header from '@/components/Header.vue'
import ProductList from '@/components/ProductList.vue'
import Detail from '@/components/Detail.vue'
import Order from '@/components/Order.vue'
import My from '@/components/My.vue'
const routes = [
  { path: '/', component: Login },
  { path: '/', redirect: '/login' },
  {
    path: '/header',
    name: Header,
    component: Header,
    children: [ //children声明子路由
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/category',
        name: 'Category',
        hidden: true,
        component: Category,
        children:[
          {
            path:'/productlist/:classifyId',
            name:'ProductList',
            component:ProductList
          }
        ],
        redirect: '/productlist/1',//默认子路由
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path:'/detail/:id',
        name:'Detail',
        hidden: true,
        component:Detail
      },
      {
        path:'/order',
        name:'Order',
        component:Order,
      },
      {
        path:'/my',
        name:'My',
        component:My,
      }
    ],
    redirect: '/home',//默认子路由
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (token || to.path === '/login') {
    // 需要登录才能访问的页面，且未登录时跳转到登录页
    next();
  } else {
    next('/login');
  }

});
export default router
