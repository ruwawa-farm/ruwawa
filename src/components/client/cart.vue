<template>
    <div class="uk-width-1-1 center-horizontal">

        <div class="cart uk-text-center" :class="{hidden: !showCart}">
            <h1>My Cart</h1>
            <div class="card-expansion uk-padding">
                <md-card v-for="order in orders" :key="order.product._id">
                    <md-card-media>
                        <img :src="order.product.image_url" width="200px" height="auto">
                    </md-card-media>

                    <md-card-header>
                        <div class="md-title uk-text-center">{{order.product.name}}</div>
                    </md-card-header>

                    <md-card-expand>
                        <md-card-actions md-alignment="space-between">
                            <div><md-button @click="removeFromCart(order)">Remove</md-button></div>

                            <md-card-expand-trigger>
                                <md-button>More... </md-button>
                            </md-card-expand-trigger>

                        </md-card-actions>

                        <md-card-expand-content>
                            <md-card-content style="text-align: start !important;">
                                <h4>Amount: {{order.amount}} {{order.product.unit}}s</h4>
                                <h4>From: {{order.farmer.farmName}}</h4>
                                <h4>Total: Ksh.{{order.total}}</h4>
                            </md-card-content>
                        </md-card-expand-content>
                    </md-card-expand>

                </md-card>
            </div>
            <button class="uk-button uk-button-default" @click="confirm">{{btn}}</button>
        </div>

        <div class="delivery uk-text-center" :class="{hidden: !showDelivery}">
            <h1>Enter the delivery address</h1>
            <input class="uk-input uk-width-1-3@m" placeholder="Enter your delivery address" v-gmaps-searchbox:location.name.geometry=vm>
            <google-map id="map" ref="Map" :key="refresh" :center="location" :zoom="14">
                <google-map-marker :position="location" :key="markerRefresh"></google-map-marker>
            </google-map>
            <div class="uk-margin">
                <button class="uk-button uk-button-default" type="button" @click="locationSelected">Select</button>
            </div>
        </div>

        <div class="summary" :class="{hidden: !showSummary}">
            <h1 class="uk-text-center">Summary</h1>
            <table class="uk-table uk-table-divider uk-table-small uk-width-1-2@m center-horizontal">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Delivery cost (Ksh.)</th>
                    <th>Total cost (Ksh.)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in orders" :key="order.product._id">
                    <td>{{order.product.name}}</td>
                    <td>{{order.amount}} {{order.product.unit}}s</td>
                    <td>{{order.deliveryCost}}</td>
                    <td>{{order.deliveryCost + order.total}}</td>
                </tr>
                <tr class="uk-text-center">
                    <td colspan="4">Sum Total : Ksh.{{this.sumTotal}}</td>
                </tr>
                </tbody>
            </table>
            <div class="uk-text-center">
                <button class="uk-button uk-button-default" type="button" @click="confirmOrder">Submit</button>
            </div>
        </div>

    </div>
</template>

<script>
    import {getDistance} from 'geolib'
    import UIkit from "uikit";

    export default {
        mounted() {
            this.orders.forEach(order => {
                if (order.delivered){
                    this.hasDelivery = true
                }
            })
            this.getCurrentLocation()
        },
        data(){
            return {
                btn: 'Next',
                hasDelivery: false,
                showDelivery: false,
                showCart: true,
                showSummary: false,
                orders: this.$store.state.cart,
                currentLat: 0.0,
                currentLong: 0.0,
                refresh: 0,
                markerRefresh: 0,
                sumTotal: 0,
                lat: '',
                lng: '',
                vm: {},
                location: {lat: this.lat, lng: this.lng}
            }
        },
        methods: {
            removeFromCart(order){
                let index = this.orders.indexOf(order)
                this.$store.commit('removeFromCart', index)
            },
            confirm(){
                this.showCart = false
                if (this.hasDelivery) {
                    this.showDelivery = true
                    this.location.lat = this.lat
                    this.location.lng = this.lng
                    this.refresh += 1;
                    this.markerRefresh += 1;
                } else {
                    this.showSummary = true
                    this.getTotals()
                }
            },
            getCurrentLocation(){
                this.$getLocation()
                    .then((coordinates) => {
                        this.currentLat = coordinates.lat;
                        this.currentLong = coordinates.lng;
                        this.lat = coordinates.lat;
                        this.lng = coordinates.lng;
                    });
            },
            locationUpdated(latlng) {
                this.lat = latlng.lat;
                this.lng = latlng.lng;
            },
            locationSelected(){
                this.showDelivery = false
                this.showSummary = true
                this.getTotals()
            },
            getTotals(){
                this.orders.forEach(order => {
                    if (order.delivered){
                        let farm = {latitude: order.farmer.farmLat, longitude: order.farmer.farmLng}
                        let delivery = {latitude: this.lat, longitude: this.lng}
                        let distance = getDistance(farm, delivery, 100)/1000
                        order.deliveryCost = Math.round(distance * 100)
                    }
                    else {
                        order.deliveryCost = 0
                    }
                    this.sumTotal += (order.total + order.deliveryCost)
                })
            },
            confirmOrder: function () {
                this.axios.post('/orders/new', {orders: this.orders}, this.$store.state.config)
                    .then(res => {
                        if (res.status === 200){
                            this.orders = []
                            this.$store.commit("clearCart")
                            this.$store.commit("addOrders", res.data.orders)
                            UIkit.notification({message: "Recorded orders successfully", status: 'success'})
                        }
                    })
                    .catch(err => { UIkit.notification({message: err.response.data.error, status: 'danger'})})
            }
        },
        watch: {
            "vm.location"(value){
                let lat = value.geometry.location.lat()
                let lng = value.geometry.location.lng()
                this.lat = lat
                this.lng = lng
                this.location.lat = lat
                this.location.lng = lng
                this.refresh += 1;
                this.markerRefresh += 1;
            },
        }
    }
</script>

<style scoped>

    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }

    h4 {
        margin: 10px !important;
    }

    @media (max-width: 900px) {
        .md-card {
            width: auto;
            margin: 4px;
            display: inline-block;
            vertical-align: top;
        }
    }

    .hidden {
        display: none;
    }

    .map-container{
        height: 400px !important;
        margin-left: auto !important;
        margin-right: auto !important;
    }

    .vue-google-map {
        margin: 10px auto;
        width: 400px !important;
        height: 400px !important;
    }

    @media (min-width: 960px){
        .vue-google-map {
            width: calc(100% * 1 / 3.001) !important;
            height: auto;
        }
    }

</style>
