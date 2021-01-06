import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import VuePageTransition from 'vue-page-transition'
import VueTelInput from 'vue-tel-input'
import Axios from "axios";
import VueAxios from "vue-axios";
import Toasted from 'vue-toasted';
import VueGeolocation from "vue-browser-geolocation/src";
import mdChips from "vue-material/dist/components/MdChips";
import mdCard from "vue-material/dist/components/MdCard";
import mdIcons from "vue-material/dist/components/MdIcon";
import mdButtons from "vue-material/dist/components/MdButton"
import VueNavigationBar from "vue-navigation-bar";
import VueCarousel from 'vue-carousel';
import jwt from 'vuejs-jwt'
import AOS from 'aos'
import VueGmaps from 'vue-gmaps'
import VueGoogleMap from 'vuejs-google-maps'
import rate from 'vue-rate'
import VuePluralize from 'vue-pluralize'
import {Datetime} from "vue-datetime";

const axios = Axios.create({
  baseURL: "https://ruwawa-db.herokuapp.com/"
})

//Styles
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import 'aos/dist/aos.css'
import 'vue-rate/dist/vue-rate.css'
import 'vue-datetime/dist/vue-datetime.css'

//Components
Vue.component("vue-navigation-bar", VueNavigationBar);
Vue.component('datetime', Datetime)

Vue.use(VuePageTransition);
Vue.use(VueTelInput, {required: true});
Vue.use(VueCarousel);
Vue.use(Toasted);
Vue.use(VueAxios, axios);
Vue.use(VueGeolocation);
Vue.use(mdChips);
Vue.use(mdCard);
Vue.use(mdIcons);
Vue.use(mdButtons);
Vue.use(AOS.init())
Vue.use(jwt)
Vue.use(rate)
Vue.use(VuePluralize)
Vue.use(VueGmaps, {key: 'AIzaSyAF-NGOw1lcrVBEp81LPAbqxd3yzXC1l34'})
Vue.use(VueGoogleMap, {load: {apiKey: 'AIzaSyAF-NGOw1lcrVBEp81LPAbqxd3yzXC1l34'}})

Vue.config.productionTip = false

new Vue({store, router, render: h => h(App)}).$mount('#app')
