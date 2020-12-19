<template>
    <div class="orders">
        <div class="orders-list">
            <h2 class="uk-text-center">My orders</h2>
            <h3 class="uk-text-center uk-text-danger">{{orders.length === 0 ? "You have not made any order yet": ""}}</h3>
            <div class="uk-flex-center" uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="order in orders" :key="order._id" @click="showOrder(order)">
                    <div class="uk-card-media-top">
                        <div class="uk-card-badge uk-label"
                             :class="[getOrderStatus(order) === 0? 'uk-label-danger' : getOrderStatus(order) === 1 ?  'uk-label-warning': getOrderStatus(order) === 2 ?  'uk-label-primary' : 'uk-label-success']">
                            {{getOrderStatus(order) === 0? 'Processing' : getOrderStatus(order) === 1 ?  'Packaged': getOrderStatus(order) === 2 ?  'In Transit' : 'Delivered'}}
                        </div>
                        <img :src="getImageUrl(order.product_id)" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body">
                    </div>
                </div>
            </div>

            <div id="modal-order" class="uk-flex-top" uk-modal>
                <div class="uk-modal-dialog uk-width-1-2@m uk-margin-auto-vertical">
                    <div class="uk-margin-left uk-margin-right uk-margin-top uk-margin">
                        <h4>Product: {{order.roast}} {{ order.name }} {{order.grade !== undefined ? ", "+ order.grade : ""}}</h4>
                        <h4>Total : Ksh.{{order.total}}</h4>
                        <h4>Order status</h4>
                    </div>
                    <Stepper :steps="steps" @completed-step="completeStep" @active-step="isStepActive"></Stepper>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Stepper from 'vue-stepper'
import Step from './step.vue'
import UIkit from "uikit"
import $ from 'jquery'

export default {
    components: {
        Stepper,
    },
    mounted() {
        $('.bottom').remove()
        $('.material-icons').css('background-color', '#0b6623')
        $('.step-title>h4').css('color', '#0b6623')
        $('.content').css('margin', 0)
    },
    data() {
        return {
            noOrders: "",
            orders: this.$store.state.orders,
            order: {},
            steps: [
                {
                    icon: 'loop',
                    name: 'confirmed',
                    title: 'Processing',
                    component: Step,
                    completed: true

                },
                {
                    icon: 'shopping_basket',
                    name: 'package',
                    title: 'Packaged',
                    component: Step,
                    completed: false

                },
                {
                    icon: 'local_shipping',
                    name: 'transit',
                    title: 'In Transit',
                    component: Step,
                    completed: false
                },
                {
                    icon: 'place',
                    name: 'delivered',
                    title: 'Delivered',
                    component: Step,
                    completed: false
                }
            ]
        }
    },
    methods: {
        getOrderStatus: function (order) {
            return order.status[2].complete ? 3 : order.status[1].complete ? 2 : order.status[0].complete ? 1 : 0
        },
        getImageUrl(id){
            return this.$store.state.allProducts.find(product => product._id === id).image_url
        },
        showOrder(order){
            this.order = order
            const name = this.$store.state.allProducts.find(product => product._id === order.product_id).name
            this.order.name = this.$pluralize(name, order.amount)
            const status = order.status[2].complete ? 3 : order.status[1].complete ? 2 : order.status[0].complete ? 1 : 0;
            const payload = status === 3 ? "delivered" : status === 2 ? "transit" : status === 1 ? "packaged" : "processing";
            this.$store.commit('setStep', payload)
            UIkit.modal('#modal-order').show()
        },
        completeStep(payload) {
            this.steps.forEach((step) => {
                if (step.name === payload.name) {
                    step.completed = true;
                }
            })
        },
        isStepActive(payload) {
            this.steps.forEach((step) => {
                if (step.name === payload.name) {
                    if(step.completed === true) {
                        step.completed = false;
                    }
                }
            })
        },
    }
}
</script>
<style scoped>

h4 {
    margin: 10px !important;
}
@media (min-width: 1200px) {
    .uk-grid > * {
        padding-left: 0 !important;
    }
    .uk-card {
        margin: 10px;
    }
    .orders-list {
        padding: 30px !important;
    }
}
</style>
