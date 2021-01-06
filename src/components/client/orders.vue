<template>
    <div class="orders">
        <div class="orders-list">
            <h2 class="uk-text-center">My orders</h2>
            <h3 class="uk-text-center uk-text-danger">{{orders.length === 0 ? "You have not placed any order yet": ""}}</h3>
            <div class="uk-grid uk-flex uk-flex-center uk-grid-small center-horizontal">
                <div class="uk-card uk-width-1-6@m uk-margin-bottom uk-width-1-2 center-horizontal"
                     v-bind:class="[largeDevice ? 'uk-card-default uk-card-hover uk-margin-right uk-margin-left': '']"
                     v-for="(order, index) in orders" :key="order._id" @click="[order.status !== 'complete' ? showOrder(order, index) : {}]">
                    <div class="uk-card-media-top">
                        <div class="uk-card-badge uk-label" :class="[getLabel(order)]">
                            {{order.status}}
                        </div>
                        <img :src="getImageUrl(order.product_id)" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body uk-text-center">
                        <h3>{{getProductName(order.product_id)}}</h3>
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
                    <Stepper :order="order" :index="currentIndex" :editable="false" @onComplete="complete"></Stepper>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UIkit from "uikit";
import Stepper from '../stepper.vue'

export default {
    components: {Stepper},
    data() {
        return{
            order: {},
            currentIndex: 0,
            monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            orders: this.$store.state.orders,
            subscriptions: this.$store.state.subscriptions,
            largeDevice: !this.$store.state.small
        }
    },
    methods: {
        getLabel(order) {
            switch (order.status) {
                case 'processing':
                    return 'uk-label-danger'
                case 'packaged':
                    return 'uk-label-warning'
                case 'transit':
                    return 'uk-label-primary'
                default:
                    return 'uk-label-success'
            }
        },
        getImageUrl(id){
            return this.$store.state.allProducts.find(product => product._id === id).image_url
        },
        getProductName(id){
            return this.$store.state.allProducts.find(product => product._id === id).name
        },
        showOrder(order, index){
            this.order = order
            this.currentIndex = index
            const name = this.$store.state.allProducts.find(product => product._id === order.product_id).name
            this.order.name = name !== "Coffee" ? this.$pluralize(name, order.amount) : name;
            UIkit.modal('#modal-order').show()
        },
        complete(){
            UIkit.modal('#modal-order').hide()
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
