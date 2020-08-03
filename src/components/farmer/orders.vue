<template>
    <div class="orders">
        <h2 class="uk-text-center">My orders</h2>

        <div class="orders-list">
            <h3 class="uk-text-center uk-text-danger">{{noOrders}}</h3>
            <div uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="order in orders" :key="order._id">
                    <div class="uk-card-media-top">
                        <div class="uk-card-badge uk-label" v-bind:class="[order.confirmed? 'uk-label-success' : 'uk-label-danger']">{{order.confirmed? "Confirmed" : "Not confirmed"}}</div>
                        <img v-bind:src="order.product.image_url" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body">
                        <div class="uk-card-footer uk-flex uk-flex-around">
                            <a class="uk-button uk-text-primary" @click="confirmOrder(order)">Confirm</a>
                            <a class="uk-button uk-text-danger" href="#modal-decline" @click="declineOrder(order)" uk-toggle>Decline</a>
                        </div>
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
    export default {
        mounted() {
            this.checkOrders()
        },
        data() {
            return{
                noOrders: '',
                reason: '',
                currentOrder: {},
                orders: this.$store.state.orders
            }
        },
        methods: {
            checkOrders(){
                if (this.orders.length === 0) this.noOrders = "No orders available"
            },
            confirmOrder(order){
                console.log(order)
            },
            declineOrder(order){
                this.currentOrder = order
            },
            submitOrderDecline(){
                UiKit.modal('#modal-decline').hide()
                console.log(this.reason)
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
</style>
