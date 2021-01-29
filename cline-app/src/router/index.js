import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login'
import HomePage from '../page/homePage';
Vue.use(Router);
let router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: '/Login',
    //   component: Login
    // },
    {
      path: '/login',
      name: '/Login',
      component: Login
    },
    {
      path: '/homePage',
      name: 'homepage',
      component: HomePage
    }
  ]
});

router.beforeEach((to, from, next) => {//登录拦截
  // 判断是不是登录页面
  // 是登录页面
  if (to.path === '/login') {
    next();
  } else {
    // 不是登录页面
    // 判断 是否登录过
    let account = localStorage.getItem('account')
    account ? next() : next('/login')
  }
});
export default router