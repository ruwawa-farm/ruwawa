import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//views
import index from '../views/index.vue'
import clientSignup from '../components/client/signup.vue'
import farmerSignup from '../components/farmer/signup.vue'
import clientHome from '../components/client/navigation.vue'
import farmerHome from '../components/farmer/navigation'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/client/signup',
    name: 'signup',
    component: clientSignup
  },
  {
    path: '/farmer/signup',
    name: 'farmer',
    component: farmerSignup
  },
  {
    path: '/home',
    name: 'clientHome',
    component: clientHome
  },
  {
    path: '/dashboard',
    name: 'farmerHome',
    component: farmerHome
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
