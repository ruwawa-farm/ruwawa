import Vue from 'vue'
import VueRouter from 'vue-router'
// noinspection ES6CheckImport
import VuePageTransition from 'vue-page-transition'
import VueTelInput from 'vue-tel-input'
import Axios from "axios";
import VueAxios from "vue-axios";
import Toasted from 'vue-toasted';
import VueGeolocation from "vue-browser-geolocation/src";
import mdChips from "vue-material/dist/components/MdChips";
import VueNavigationBar from "vue-navigation-bar";

//Styles
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "vue-navigation-bar/dist/vue-navigation-bar.css";



//views
import index from '../views/index.vue'
import contacts from '../views/contacts'
import clientSignup from '../components/client/signup.vue'
import farmerSignup from '../components/farmer/signup.vue'
import clientHome from '../components/client/navigation.vue'
import farmerHome from '../components/farmer/navigation'


//Components
Vue.component("vue-navigation-bar", VueNavigationBar);
Vue.component('Contacts', contacts)


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
    path: '/client/home',
    name: 'clientHome',
    component: clientHome
  },
  {
    path: '/farmer/home',
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
