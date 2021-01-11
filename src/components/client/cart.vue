<template>
    <div class="uk-width-1-1 center-horizontal">
        <div class="uk-text-center" :class="{cart: !smallDevice}">
            <h1>My Cart</h1>
            <div class="ruwawa-cart-large" :class="{hidden: smallDevice}">
                <table class="uk-table uk-table-middle uk-width-2-3@m center-horizontal">
                    <thead>
                    <tr>
                        <th></th>
                        <th><h4>Product</h4></th>
                        <th><h4>Amount</h4></th>
                        <th><h4>Total</h4></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="order in orders" :key="order.product._id" class="uk-card uk-card-default uk-margin">
                        <td> <img :src="order.product.image_url" width="100px"></td>
                        <td> {{order.product.name}}</td>
                        <td>{{order.amount}} {{ order.product.unit | pluralize(order.amount) }}</td>
                        <td> Ksh. {{order.total}}</td>
                        <td><span uk-icon="icon: trash" class="icon-black" @click="removeOrder(order)"></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="ruwawa-cart-small uk-width-1-1 uk-padding-large" :class="{hidden: !smallDevice}">
                <div v-for="order in orders" :key="order.product._id" class="uk-card uk-card-default uk-width-1-1 uk-margin">
                    <div uk-grid class="uk-flex-between">
                        <div class="uk-width-1-3">
                            <img :src="order.product.image_url" class="uk-width-1-1" height="auto">
                        </div>
                        <div class="center-vertical">
                            <table>
                                <tr><td class="small-td uk-margin-top"><h5>{{order.product.name}}</h5></td></tr>
                                <tr><td class="small-td uk-margin-top">{{order.amount}} {{ order.product.unit | pluralize(order.amount) }}</td></tr>
                                <tr><td class="small-td uk-margin-top">Ksh. {{order.total}}</td></tr>
                            </table>
                        </div>
                        <div class="center-vertical uk-margin-right">
                            <span uk-icon="icon: trash" class="icon-black" @click="removeOrder(order)"></span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="uk-button uk-button-default uk-width-1-6@m uk-width-2-3 round-btn" @click="submit">Submit</button>
        </div>
    </div>
</template>

<script>
    import UIkit from "uikit";

    const small = window.matchMedia("(max-width: 700px)")
    export default {
        created() {
            this.smallDevice= small.matches
        },
        data(){
            return {
                smallDevice: true,
                orders: this.$store.state.cart
            }
        },
        methods: {
            removeOrder(order){
                this.$store.commit('removeFromCart', order)
            },
            submit() {
                const orders = this.orders.map(this.prepareOrder)
                console.log(orders)
                this.axios.post('/orders/new', {orders: orders}, this.$store.state.config)
                    .then(res => {
                        this.orders = []
                        this.$store.commit("clearCart")
                        this.$store.commit("addOrders", res.data.orders)
                        UIkit.notification({message: "Recorded orders successfully", status: 'success'})
                    })
                    .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            },
            prepareOrder(order){
                return {
                    product_id: order.product._id,
                    farmer_id: order.farmer._id,
                    email: order.farmer.email,
                    total: order.total,
                    unit: order.product.unit,
                    amount: order.amount,
                    roast: order.roast !== undefined ? order.roast : '',
                    grade: order.grade !== undefined ? order.grade : ''
                }
            }
        }
    }
</script>

<style scoped>

.cart {
    margin: 5rem !important;
}

.small-td {
    text-align: start !important;
}

th {
    text-align: center !important;
}
th > h4{
    font-weight: 500 !important;
    line-height: 1.25 !important;
    margin: 0 !important;
}
</style>
