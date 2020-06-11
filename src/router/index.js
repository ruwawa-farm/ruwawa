import Vue from 'vue'
import VueRouter from 'vue-router'
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
import signup from '../views/client/signup.vue'
import farmer from  '../views/farmer/signup.vue'
import clientNavigation from '../views/client/navigation.vue'

//component views
import contacts from '../views/contacts'

  //client components
import clientProducts from '../views/client/products'
import clientHome from '../views/client/home'
import clientFarmers from '../views/client/farmers'
import clientOrders from '../views/client/orders'

  //farmers components

//Components
Vue.component("vue-navigation-bar", VueNavigationBar);
Vue.component('Contacts', contacts)

Vue.component("Home", clientHome)
Vue.component("Products", clientProducts)
Vue.component('Farmers', clientFarmers)
Vue.component('Orders', clientOrders)


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
  },
  {
    path: '/client/home',
    name: 'clientHome',
    component: clientNavigation
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
