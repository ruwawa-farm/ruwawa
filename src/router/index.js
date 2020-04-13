import Vue from 'vue'
import VueRouter from 'vue-router'

//views
import index from '../views/index.vue'
import signup from '../views/signup.vue'

//components

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
