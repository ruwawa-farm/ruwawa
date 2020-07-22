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
            <h1>Select the Delivery location</h1>
            <h3>Drag the map to place the pointer</h3>
            <map-location-selector :latitude="currentLat" :longitude="currentLong" @locationUpdated="locationUpdated" :key="refresh" class="uk-width-1-2@m"></map-location-selector>
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
                <button class="uk-button uk-button-default" type="button" @click="confirmOrder">Select</button>
            </div>
        </div>

    </div>
</template>

<script>
    import mapLocationSelector from 'vue-google-maps-location-selector';
    import {getDistance} from 'geolib'
    import UIkit from 'uikit'

    export default {
        components: {
            mapLocationSelector
        },
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
                sumTotal: 0,
                lat: '',
                lng: '',
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
                        this.refresh += 1;
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
            confirmOrder(){
                UIkit.notification({message: "Order confirmed", status: 'success'})
            }
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

</style>
