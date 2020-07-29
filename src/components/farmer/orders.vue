<template>
    <div class="orders">
        <h2 class="uk-text-center">My orders</h2>

        <div class="orders-list">
            <h3 class="uk-text-center uk-text-danger">{{noOrders}}</h3>
            <div uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="(order, index) in orders" :key="order._id">
                    <div class="uk-card-media-top">
                        <img v-bind:src="order.product.image_url" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body">
                        <div class="uk-card-footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        mounted() {
            this.checkOrders()
        },
        data() {
            return{
                noOrders: "",
                orders: this.$store.state.orders
            }
        },
        methods: {
            checkOrders(){
                if (this.orders.length === 0) this.noOrders = "No orders available"
            }
        }
    }
</script>

<style scoped>

</style>
