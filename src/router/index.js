/**
 * 路由配置
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import EleLayout from '@/layout';
import { menuToRoutes } from 'ele-admin';
import { WHITE_LIST, HOME_PATH } from '@/config/setting';
import { getToken } from '@/utils/token-util';
//import NProgress from 'nprogress';

Vue.use(VueRouter);

// 静态路由
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: { title: '登录' }
  },
  {
    path: '/forget',
    component: () => import('@/views/forget'),
    meta: { title: '忘记密码' }
  },
  {
    path: '/test',
    component: () => import('@/views/test'),
    meta: { title: '测试' }
  },
  {
    path: '*',
    component: () => import('@/views/exception/404')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

/* 更新浏览器标题方法 */
const updateTitle = function(route) {
  if (!route?.path?.startsWith('/redirect/')) {
    const names = [];
    if (route?.meta?.title) {
      names.push(route.meta.title);
    }
    const appName = process.env.VUE_APP_NAME;
    if (appName) {
      names.push(appName);
    }
    document.title = names.join(' - ');
  }
};

// 路由守卫
router.beforeEach((to, from, next) => {
  //NProgress.start();
  updateTitle(to);
  // 判断是否登录
  if (getToken()) {
    // 还未注册动态路由则先获取
    if (!store.state.user.menus) {
      store
        .dispatch('user/fetchUserInfo')
        .then(({ menus, homePath }) => {
          router.addRoute({
            path: '/',
            component: EleLayout,
            redirect: HOME_PATH ?? homePath,
            children: menuToRoutes(menus, (component) =>
              import('@/views' + component)
            )
          });
          next({ ...to, replace: true });
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
  } else if (WHITE_LIST.includes(to.path)) {
    next();
  } else {
    next({
      path: '/login',
      query: to.path === '/' ? {} : { from: to.path }
    });
  }
});

router.afterEach(() => {
  setTimeout(() => {
    //NProgress.done(true);
  }, 300);
});

export default router;
