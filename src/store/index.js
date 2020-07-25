import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import UIkit from "uikit";

Vue.use(Vuex)

const listener = store => {
    const actions = ["addToCart"]
    store.subscribe(mutation => {
        if (actions.includes(mutation.type)){
            UIkit.notification({message: "</h3>Added to cart</h3>", status: 'success'})
        }
    })
}

export default new Vuex.Store({
    state: {
        allProducts: [],
        allFarmers: [],
        farmerProducts: [],
        farmerProfile: {},
        cart: [],
        config: {},
        userType: '',
        isBottomBar: false,
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
        },
        addUserType(state, payload){
            state.userType = payload
        },
        addToCart(state, payload){
            state.cart.unshift(payload)
        },
        removeFromCart(state, payload){
            state.cart.splice(payload, 1)
        },
        clearCart(state){
          state.cart.length = 0
        },
        changeBottomBar(state, payload){
            state.isBottomBar = payload
        },
        addFarmers(state, payload){
            state.allFarmers = payload
        }
    },
    plugins: [createPersistedState(), listener]
});
