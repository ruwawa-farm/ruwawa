<template>
    <div class="orders">

        <div class="orders-list">
            <h2 class="uk-text-center">My orders</h2>
            <h3 class="uk-text-center uk-text-danger">{{orders.length === 0 ? "You have not made any order yet": ""}}</h3>
            <div uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="order in orders" :key="order._id">
                    <div class="uk-card-media-top">
                        <div class="uk-card-badge uk-label" v-bind:class="[order.confirmed? 'uk-label-success' : 'uk-label-danger']">{{order.confirmed? "Confirmed" : order.declined ? "Declined" : "Not confirmed"}}</div>
                        <img v-bind:src="order.product.image_url" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body">
                        <div class="uk-card-footer">
                            <span uk-icon="icon: trash" class="icon-black" @click="removeProduct(order)"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="subscriptions-list">
            <h2 class="uk-text-center">My Subscriptions</h2>
            <h3 class="uk-text-center uk-text-danger">{{subscriptions.length === 0 ? "You have no subscriptions yet" : ""}}</h3>
            <div uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="sub in subscriptions" :key="sub._id">
                    <div class="uk-card-media-top">
                       <img v-bind:src="sub.product.image_url" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body sub-card">
                        <p>From : {{sub.farmName}}</p>
                        <p>Amount : {{sub.amount}}{{sub.product.unit}}s</p>
                        <p>Total : Ksh.{{sub.total}}</p>
                        <p>Next confirmed : {{sub.date}}{{["st","nd","rd"][((sub.date+90)%100-10)%10-1]||"th"}} {{sub.LCD}}</p>
                    </div>
                    <div class="uk-card-footer">
                        <a class="uk-button uk-text-danger" @click="cancelSubscription(sub)">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UIkit from "uikit";

    export default {
        mounted() {
            this.getOrders()
            this.getSubscriptions()
        },
        data() {
            return {
                noOrders: "",
                noSubscriptions: '',
                orders: this.$store.state.orders,
                subscriptions: this.$store.state.subscriptions
            }
        },
        methods: {
            getOrders(){
                if (this.$store.state.ordersChanged){
                    this.axios.get('/orders/client', this.$store.state.config)
                        .then(res => {
                            this.$store.commit("addOrders", res.data.orders)
                            this.$store.commit("ordersChanged", false)
                        })
                        .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
                }
            },
            removeProduct: function (order) {
                let data = {id: order._id}
                this.axios.post('/orders/client/delete', data, this.$store.state.config)
                    .then(res => {
                        if (res.status === 200) {
                            this.$store.commit("removeOrder", this.orders.indexOf(order))
                            UIkit.notification({message: 'Order deleted successfully', status: 'success'})
                        }
                    })
                    .catch(err => {
                        UIkit.notification({message: err.response.data.error, status: 'danger'})
                    })
            },
            getSubscriptions(){
                if (this.$store.state.subscriptionsChanged){
                    this.axios.get('/subscriptions/client', this.$store.state.config)
                        .then(res => {
                            if (res.status === 200){
                                this.$store.commit('subscriptionsChanged', false)
                                this.$store.commit('addSubscriptions', res.data.subscriptions)
                            }
                        })
                        .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
                }
            },
            cancelSubscription(sub){
                let data = {subscription: sub}
                this.axios.post('/subscriptions/cancel', data, this.$store.state.config)
                    .then(res => {
                        if (res.status === 200){
                            const index = this.subscriptions.indexOf(sub)
                            this.subscriptions.splice(index, 1)
                            this.$store.commit('removeSubscription', index)
                        }
                    })
                    .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            }
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

        .orders-list,
        .subscriptions-list {
            padding: 30px !important;
        }
    }

    .sub-card {
        text-align: start !important;
    }

</style>
