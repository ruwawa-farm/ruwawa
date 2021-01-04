<template>
    <div class="orders">
        <div class="orders-list">
            <h2 class="uk-text-center">My orders</h2>
            <h3 class="uk-text-center uk-text-danger">{{orders.length === 0 ? "You have not received any order yet": ""}}</h3>
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
                        <h4 class="ruwawa-order-name">Product: {{order.roast}} {{ order.name }} <b>{{order.grade !== undefined ? ", Grade "+ order.grade : ""}} </b></h4>
                        <h4>Total : Ksh.{{order.total}}</h4>
                        <h4>Order status</h4>
                    </div>
                    <Stepper :steps="steps" @completed-step="completeStep" @active-step="isStepActive"></Stepper>
                </div>
            </div>
        </div>
        <div class="subscriptions-list">
            <h2 class="uk-text-center">My Subscribers</h2>
            <h3 class="uk-text-center uk-text-danger">{{subscriptions.length === 0 ? "You have no subscribers yet" : ""}}</h3>
            <div uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="sub in subscriptions" :key="sub._id">
                    <div class="uk-card-media-top">
                        <img v-bind:src="sub.product.image_url" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body sub-card">
                        <p>Amount : {{sub.amount}}{{sub.product.unit}}s</p>
                        <p>Total : Ksh.{{sub.total}}</p>
                        <p>Next confirmed : {{sub.date}}{{["st","nd","rd"][((sub.date+90)%100-10)%10-1]||"th"}} {{sub.LCD}}</p>
                    </div>
                    <div class="uk-card-footer uk-flex uk-flex-around">
                        <p class="uk-button uk-text-primary" @click="confirmSubscription(sub)">Confirm {{monthNames[new Date().getMonth() + 1]}} delivery</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UIkit from "uikit";
    import Stepper from "vue-stepper"
    import Step from './step.vue';

    export default {
        components: {
        Stepper,
        },
        mounted() {
            this.checkOrders()
        },
        data() {
            return{
                noOrders: "",
                reason: "",
                currentOrder: {},
                monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
            ],
            orders: this.$store.state.orders,
            subscriptions: this.$store.state.subscriptions
            }
        },
        methods: {
            getOrderStatus: function (order) {
            return order.status[2].complete ? 3 : order.status[1].complete ? 2 : order.status[0].complete ? 1 : 0
            },
            getImageUrl(id){
                return this.$store.state.allProducts.find(product => product._id === id).image_url
            },
            declineOrder(order){
                this.currentOrder = order
            },
            submitOrderDecline(){
                let data = {
                    confirmed: false,
                    reason: this.reason,
                    order: this.currentOrder
                }
                this.axios.post('/orders/confirm', data, this.$store.state.config)
                    .then(res => {
                        if (res.status === 200){
                            UIkit.notification({message: "Updated order status", status: 'success'})
                            this.$store.commit('confirmedOrder', {index: this.orders.indexOf(this.currentOrder), confirmed: false})
                            this.currentOrder.confirmed = false
                            this.currentOrder.declined = true
                        }
                    })
                    .catch(err => { UIkit.notification({message: err.response.data.error, status: 'danger'})})
                UIkit.modal('#modal-decline').hide()
            },
            confirmSubscription(sub){
                const data = {subscription: sub}
                this.axios.post('/subscriptions/confirm', data, this.$store.state.config)
                    .then(res => {
                        if (res.status === 200){
                            UIkit.notification({message: "Updated subscription status", status: 'success'})
                            this.subscriptions[this.subscriptions.indexOf(sub)].LCD = this.monthNames[new Date().getMonth() + 1]
                        }
                    })
                    .catch(err => { UIkit.notification({message: err.response.data.error, status: 'danger'})})
            }
        }
    }
</script>

<style scoped>

    h4 {
        margin: 10px !important;
    }

    .ruwawa-order-name {
        text-transform: capitalize !important;
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

    .sub-card {
        text-align: start !important;
    }
</style>
