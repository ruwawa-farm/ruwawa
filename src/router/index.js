import Vue from 'vue'
import VueRouter from 'vue-router'
import VuePageTransition from 'vue-page-transition'
import VueTelInput from 'vue-tel-input'
import Axios from "axios";
import VueAxios from "vue-axios";
import Toasted from 'vue-toasted';
import VueGeolocation from "vue-browser-geolocation/src";
import mdChips from "vue-material/dist/components/MdChips";

//Styles
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


//views
import index from '../views/index.vue'
import signup from '../views/client/signup.vue'
import farmer from  '../views/farmer/signup.vue'


//components

Vue.use(VueRouter);
Vue.use(VuePageTransition);
Vue.use(VueTelInput, {required: true});
Vue.use(Toasted);
Vue.use(VueAxios, Axios);
Vue.use(VueGeolocation);
Vue.use(mdChips);
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
  },
    {
      path: '/farmer',
      name: 'farmer',
      component: farmer
    }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
