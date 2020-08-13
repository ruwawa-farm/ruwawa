<template>
    <div class="orders">
        <h2 class="uk-text-center">My orders</h2>

        <div class="orders-list">
            <h3 class="uk-text-center uk-text-danger">{{orders.length === 0 ? "You have no orders yet": ""}}</h3>
            <div uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="order in orders" :key="order._id">
                    <div class="uk-card-media-top">
                        <div class="uk-card-badge uk-label" v-bind:class="[order.confirmed? 'uk-label-success' : 'uk-label-danger']">{{order.confirmed? "Confirmed" : order.declined ? "Declined" : "Not confirmed"}}</div>
                        <img v-bind:src="order.product.image_url" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body">
                        <p>Amount : {{order.amount}} {{order.product.unit}}s</p>
                        <p>Total price : Ksh.{{order.sumTotal}}</p>
                        <p>To be delivered : {{order.delivered ? "Yes" : "No"}}</p>
                        <div class="uk-card-footer uk-flex uk-flex-around" v-bind:class="[order.confirmed || order.declined ? 'hidden' : 'uk-flex']">
                            <a class="uk-button uk-text-primary" @click="confirmOrder(order)">Confirm</a>
                            <a class="uk-button uk-text-danger" href="#modal-decline" @click="declineOrder(order)" uk-toggle>Decline</a>
                        </div>
                    </div>
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
                    <div class="uk-card-body">
                        <h3>Date : {{sub.date}}{{["st","nd","rd"][((sub.date+90)%100-10)%10-1]||"th"}}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div id="modal-decline" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                <button class="uk-modal-close-default icon-black" type="button" uk-close></button>
                <div class="uk-margin uk-padding uk-text-center">
                    <form v-on:submit.prevent="submitOrderDecline">
                        <div class="uk-margin">
                            <input class="uk-input" placeholder="Why have you declined?" type="text" v-model="reason" required>
                        </div>
                        <div>
                            <button class="uk-button" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UiKit from 'uikit'
    import UIkit from "uikit";
    export default {
        mounted() {
            this.checkOrders()
        },
        data() {
            return{
                noOrders: '',
                reason: '',
                currentOrder: {},
                orders: this.$store.state.orders,
                subscriptions: this.$store.state.subscriptions
            }
        },
        methods: {
            checkOrders(){
                if (this.orders.length === 0) this.noOrders = "No orders available"
            },
            confirmOrder(order){
                let data = {
                    confirmed: true,
                    order: order
                }
                this.axios.post('/orders/confirm', data, this.$store.state.config)
                .then(res => {
                    if (res.status === 200){
                        UIkit.notification({message: "Updated order status", status: 'success'})
                        this.$store.commit('confirmedOrder', {index: this.orders.indexOf(order), confirmed: true})
                        order.confirmed = true
                    }
                })
                .catch(err => { UIkit.notification({message: err.response.data.error, status: 'danger'})})
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
                UiKit.modal('#modal-decline').hide()
            },
        }
    }
</script>

<style scoped>
    @media (min-width: 1200px) {
        .uk-grid > * {
            padding-left: 0 !important;
        }
        .uk-card {
            margin: 10px;
        }
    }

    .hidden {
        display: none;
    }
</style>
