import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ops',
    name: 'Ops',
    component: () => import(/* webpackChunkName: "about" */ '../views/ops.vue')
  },
  // {
  //   path: '/Container',
  //   name: 'Container',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Container.vue')
  // },
  {
    path: '/Register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
    {
      path: '/Recent',
      name: 'Recent',
      component: () => import(/* webpackChunkName: "about" */ '../views/Recent.vue')
    },
    {
      path: '/User',
      name: 'User',
      component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
    },
    // {
    //   path: '/Usertest',
    //   name: 'Usertest',
    //   component: () => import(/* webpackChunkName: "about" */ '../views/Usertest.vue')
    // },
    {
      path: '/CreateDoc',
      name: 'CreateDoc',
      component: () => import(/* webpackChunkName: "about" */ '../views/CreateDoc.vue')
    },
    {
      path: '/Bin',
      name: 'Bin',
      component: () => import(/* webpackChunkName: "about" */ '../views/Bin.vue')
    },
    {
      path: '/Rubbish',
      name: 'Rubbish',
      component: () => import(/* webpackChunkName: "about" */ '../views/Rubbish.vue')
    },
    {
      path: '/Congratulations',
      name: 'Congratulations',
      component: () => import(/* webpackChunkName: "about" */ '../views/Congratulations.vue')
    },
    {
      path: '/Desktop',
      name: 'Desktop',
      component: () => import(/* webpackChunkName: "about" */ '../views/Desktop.vue')
    },
    {
      path: '/Patterns',
      name: 'Patterns',
      component: () => import(/* webpackChunkName: "about" */ '../views/Patterns.vue')
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
    },
    {
      path: '/Favorite',
      name: 'Favorite',
      component: () => import(/* webpackChunkName: "about" */ '../views/Favorite.vue')
    },
    {
      path: '/browser',
      name: 'browser',
      component: () => import(/* webpackChunkName: "about" */ '../views/browser.vue')
    },
    {
      path: '/edit',
      name: 'editr',
      component: () => import(/* webpackChunkName: "about" */ '../views/edit.vue')
    },
]

const router = new VueRouter({
  routes
})

export default router
