import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import vm from '../main.js'
Vue.use(VueRouter)

const Edit = () => import('../components/content/Edit.vue')
const Admin = () => import('../components/content/Admin.vue')
const Artical = () => import('../components/content/Artical.vue')
const routes = [
  {
    path: '/',
    name: 'reload',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta:{
      title: '登陆'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    meta:{
      title: '编辑'
    }
  },
  {
    path: '/artical',
    name: 'Artical',
    component: Artical,
    meta:{
      title: '文章'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  // store.commit('changeTitle',to.meta.title)
  // next()
  if (from.path === '/edit' && store.state.editStatus) {
    vm.$confirm('未提交的内容不会保存, 是否离开?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.commit('changeEditStatus')
      store.commit('changeRoute',to.path)
      next()
    }).catch(() => {
    });
  } else if (store.state.islogin === true)
  {
    if (to.path !== '/admin')
    {
      store.commit('changeTitle',to.meta.title)
    } else {
      store.commit('changeTitle',to.meta.title)
      store.commit('changeLoginState')
    }
    store.commit('changeRoute',to.path)
    next()
  } else if (to.path !== '/admin' && to.path !== '/') {
    vm.$alert('请先登录', 'Tips', {
      confirmButtonText: '确定'
    })
    next('/admin')
  } else {
    store.commit('changeRoute',to.path)
    next()
  }
})

export default router
