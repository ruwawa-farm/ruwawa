<template>
    <div class="orders">
        <h2 class="uk-text-center">My orders</h2>

        <div class="orders-list">
            <h3 class="uk-text-center uk-text-danger">{{noOrders}}</h3>
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
    </div>
</template>

<script>
    import UIkit from "uikit";

    export default {
        mounted() {
            this.getOrders()
        },
        data() {
            return {
                noOrders: "",
                orders: this.$store.state.orders
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
    }

</style>
