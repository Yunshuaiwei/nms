import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/users/User.vue'
import Property from '../components/performance/Property.vue'
import Fault from '../components/malfunction/Fault.vue'
import Device from '../components/performance/Device.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User },
        { path: '/property', component: Property },
        { path: '/fault', component: Fault },
        { path: '/device', component: Device }
      ]
    }
  ]
})

// 挂载路由导航守卫

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径来
  // next是一个函数，表示放行
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
