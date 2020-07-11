import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        allProducts: [],
        farmerProducts: [],
        farmerProfile: [],
        cart: [],
        config: {}
    },
    mutations: {
        addProducts(state, payload) {
            state.allProducts = payload
        },
        createConfig(state, payload){
            state.config = {
                headers: {
                    Authorization: 'Bearer ' + payload
                }
            }
        },
        addFarmerProfile(state, payload) {
            state.farmerProfile = payload
            state.farmerProducts = payload.products
        }
    },
    plugins: [createPersistedState()]
})
