import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/**
 *  配置滚动条的位置
 *  通过这个这个属性（是个函数），可以让应用像浏览器的原生表现那样，在按下 后退/前进 按钮时，简单地让页面滚动到顶部或原来的位置。
 */
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition
    } else {
        return {x: 0, y: 0}
    }
}
/**
 *  路由配置
 *  @mode: 配置路由模式（"hash" | "history" | "abstract"）
 *  @base: 如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
 *  @linkActiveClass: 点击触发的class
 *  @scrollBehavior: 配置滚动条的位置
 */
const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    likActiveClass: 'link-active',
    scrollBehavior,
    routes: [
        {
            path: '/',
            redirect: '/home'
        }, {
            path: '/login',
            component: resolve => require.ensure([], () => resolve(require('@/components/page/login')), 'login'),
            meta: {title: '登录'},
        }, {
            path: '*',
            component: resolve => require.ensure([], () => resolve(require('@/components/page/404')), 'error'),
            meta: {title: '404'},
        }, {
            path: '/',
            component: resolve => require.ensure([], () => resolve(require('@/components/layout/init')), 'home'),
            meta: {title: '初始化组件'},
            children: [
                {
                    path: '/home',
                    component: resolve => require(['../components/page/home.vue'], resolve),
                    meta: {title: '系统首页'}
                }, {
                    path: '/403',
                    component: resolve => require.ensure([], () => resolve(require('@/components/page/403')), 'error'),
                    meta: {title: '403'},
                }
            ]
        }
    ]
})
/**
 *  修改网站title的值
 */
router.afterEach((transition) => {
    if (transition.meta.title) {
        document.title = transition.meta.title
    }
})
/**
 * 路由拦截器
 * 用钩子函数对路由进行权限跳转
 * 1.判断该路由是否需要登录权限
 * 2.通过vuex state获取当前的token是否存在
 * 3.将跳转的路由path作为参数，登录成功后跳转到该路由
 */
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})
/**
 * 路由输出
 */
export default router
