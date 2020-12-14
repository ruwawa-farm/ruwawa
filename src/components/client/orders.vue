<template>
    <div class="orders">
        <div class="orders-list">
            <h2 class="uk-text-center">My orders</h2>
            <h3 class="uk-text-center uk-text-danger">{{orders.length === 0 ? "You have not made any order yet": ""}}</h3>
            <div uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="order in orders" :key="order._id">
                    <div class="uk-card-media-top">
                        <div class="uk-card-badge uk-label"
                             :class="[getOrderStatus(order) === 0? 'uk-label-danger' : getOrderStatus(order) === 1 ?  'uk-label-warning': getOrderStatus(order) === 2 ?  'uk-label-primary' : 'uk-label-success']">
                            {{getOrderStatus(order) === 0? 'Not Confirmed' : getOrderStatus(order) === 1 ?  'Packaged': getOrderStatus(order) === 2 ?  'In Transit' : 'Delivered'}}
                        </div>
                        <img :src="getImageUrl(order.product_id)" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
    },
    data() {
        return {
            noOrders: "",
            orders: this.$store.state.orders,
        }
    },
    methods: {
        getOrderStatus(order){
            return order.status[0].complete ? 1 : order.status[1].complete ? 2 : order.status[2].complete ? 3 : 0;
        },
        getImageUrl(id){
            return this.$store.state.allProducts.find(product => product._id === id).image_url
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
