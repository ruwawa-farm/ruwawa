<template>
    <div class="farmers">
        <div class="search-bar" uk-grid>
            <div class="uk-navbar-item uk-width-2-3">
                <form @submit.prevent class="uk-search uk-search-navbar">
                    <input class="uk-search-input uk-input" type="search" v-model="query" placeholder="Search farmers...">
                </form>
            </div>
        </div>
        <div class="farmers-list">
            <h3 class="uk-text-center uk-text-danger">{{noFarmers}}</h3>
            <div class="uk-flex-center" uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" @click="showDetails(farmer)" v-for="farmer in farmers" :key="farmer._id" href="#modal-profile" uk-toggle>
                    <div class="uk-card-media-top">
                        <img v-bind:src="farmer.profilePicture" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body">
                        {{farmer.name}}
                    </div>
                </div>
            </div>
        </div>
        <div id="modal-profile" class="uk-flex-top uk-modal-container" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                <button class="uk-modal-close-default icon-black" type="button" uk-close></button>
                <div class="uk-margin uk-padding">
                    <div uk-grid>
                        <div class="uk-text-center">
                            <img v-bind:src="currentFarmer.profilePicture" class="profile uk-padding-small" alt="profile">
                        </div>
                        <div class="uk-padding">
                            <h4>Name : {{currentFarmer.name}}</h4>
                            <h4>Email : {{currentFarmer.email}}</h4>
                            <h4>Farm : {{currentFarmer.farmName}}</h4>
                            <h4>Phone : 0{{currentFarmer.phone}}</h4>
                            <h4 v-bind:class="[currentFarmer.delivers ? 'uk-text-success' : 'uk-text-danger']">{{currentFarmer.delivers ? "Can make deliveries" : "Does not make deliveries"}}</h4>
                            <br>
                            <h4><b>Rate this farmer</b></h4>
                            <rate :length="5" :value="3" :ratedesc="['Very bad', 'bad', 'Okay', 'Good', 'Very good']" v-model="rating" />
                            <form v-on:submit.prevent="submitRating">
                                <div class="uk-margin">
                                    <input class="uk-input" placeholder="Enter your comment" type="text" v-model="comment" required>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div uk-grid>
                        <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right" v-for="product in currentFarmer.products" :key="product._id">
                            <div class="uk-card-media-top">
                                <div class="uk-card-badge uk-label" v-bind:class="[product.inStock? 'uk-label-success' : 'uk-label-danger']">{{product.inStock? "In stock" : "Out of Stock"}}</div>
                                <img v-bind:src="product.image_url" alt="product" height="auto">
                            </div>
                            <div class="uk-card-body">
                                <p>Ksh.{{product.price}}</p>
                            </div>
                            <div class="uk-card-footer">
                                <span @click="subscribeForm(product)">Subscribe</span>
                            </div>
                        </div>
                    </div>
                    <div id="comments">
                        <h2>Comments</h2>
                        <div v-for="rating in ratings" :key="rating.user">
                            <h4>
                                <b> {{rating.user}} </b>
                                <rate :length="5" :value="rating.rating" :disabled="true" />
                            </h4>
                            <h5>{{rating.comment}}</h5>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal-subscribe" class="uk-flex-top uk-modal-container" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                <button class="uk-modal-close-default icon-black" type="button" uk-close></button>
                <div class="uk-margin uk-padding">
                    <h3>Request a subscription to receive this item monthly</h3>
                    <form v-on:submit.prevent="subscribe">
                        <div class="uk-margin">
                            <p>Total price : {{totalPrice}}</p>
                            <input class="uk-input" placeholder="Enter the amount you want" type="number" v-model="amount" required>
                        </div>
                        <div class="uk-margin">
                            <input class="uk-input" placeholder="Enter the day of the month to get the item" type="number" v-model="date" required>
                        </div>
                        <button class="uk-button uk-text-center" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UIkit from "uikit";

export default {
    data(){
        return {
            query: '',
            farmers: this.$store.state.allFarmers,
            noFarmers: '',
            currentFarmer: {},
            farmersLoading: false,
            currentProduct: {},
            rating: 3,
            average: 3,
            ratings: [],
            comment: '',
            amount: "",
            totalPrice: 0,
            date: "",
        }
    },
    methods: {
        showDetails(farmer){
            this.currentFarmer = farmer
            this.axios.get(`/farmers/ratings/${farmer._id}`, this.$store.state.config)
                .then(res => {
                    this.ratings = res.data.ratings
                    this.average = res.data.average
                })
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
        },
        submitRating(){
            let data = {
                rating: this.rating,
                comment: this.comment
            }
            this.axios.post(`/farmers/rate/${this.currentFarmer._id}`, data, this.$store.state.config)
                .then(res => {
                    if (res.status === 200) {
                        this.ratings.unshift(data)
                        UIkit.notification({message: "Recorded rating successfully", status: 'success'})
                    }
                })
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
        },
        subscribeForm(product){
            this.currentProduct = product
            UIkit.modal('#modal-profile').hide()
            UIkit.modal('#modal-subscribe').show()
        },
        subscribe(){
            let data = {
                email: this.currentFarmer.email,
                product: this.currentProduct,
                farmer_id: this.currentFarmer._id,
                farmName: this.currentFarmer.farmName,
                total: this.totalPrice,
                amount: parseInt(this.amount),
                date: parseInt(this.date)
            }
            this.axios.post('/subscriptions/new', data, this.$store.state.config)
                .then(res => {
                    if (res.status === 200) {
                        UIkit.notification({message: res.data.reason, status: 'success'})
                        this.$store.commit('subscriptionsChanged', true)
                    }
                })
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
        }
    },
    watch: {
        amount(value){
            this.totalPrice = parseInt(value) * this.currentProduct.price
        },
        query(value){
            const data = this.$store.state.allFarmers
            this.farmers = value === "" ? data : data.filter(farmer => farmer.name.toLowerCase().includes(value.toLowerCase()));
            this.noFarmers = this.farmers.length === 0 ? `No farmers with the name ${value} found` : "";
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
.uk-card:hover {
    cursor: pointer;
}
.loaded {
    display: none;
}
.profile {
    width: 200px;
    height: 200px;
    background-position: center center;
    background-repeat: no-repeat;
}
.hidden {
    display: none;
}
</style>
