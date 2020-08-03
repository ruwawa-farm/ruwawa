<template>
    <div class="farmers">

        <div class="search-bar" uk-grid>
            <div class="uk-navbar-item uk-width-2-3">
                <form @submit.prevent="searchFarmers" class="uk-search uk-search-navbar">
                    <span uk-search-icon></span>
                    <input class="uk-search-input" type="search" v-model="query" placeholder="Search farmers...">
                </form>
            </div>

        </div>

        <div class="farmers-list">
            <h3 class="uk-text-center uk-text-danger">{{noFarmers}}</h3>
            <div v-bind:class="{loaded: !farmersLoading}" class="uk-text-center">
                <img src="../../assets/images/farmers_loading.gif">
            </div>
            <div v-bind:class="{loaded: farmersLoading}" uk-grid>
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
                                <p>{{product.name}} @ Ksh.{{product.price}}</p>
                            </div>
                        </div>
                    </div>

                    <div id="comments">
                        <h2>Comments</h2>
                        <div v-for="rating in ratings" :key="rating.user">
                            <h4> <b> {{rating.user}} </b> <rate :length="5" :value="rating.rating" :disabled="true" /></h4>
                            <h5>{{rating.comment}}</h5>
                            <hr>
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
        data(){
            return {
                query: '',
                farmers: this.$store.state.allFarmers,
                noFarmers: '',
                currentFarmer: {},
                farmersLoading: false,
                rating: 3,
                average: 3,
                ratings: [],
                comment: '',
            }
        },
        methods: {
            searchFarmers: function () {
                this.farmersLoading = true
                let name = this.query === "" ? "*" : this.query
                this.axios.get(`/farmers/search/${name}`, this.$store.state.config)
                    .then(res => {
                        this.farmersLoading = false
                        this.farmers = res.data.farmers
                        this.noFarmers = res.data.farmers.length === 0 ? `No farmers with the name ${name} found` : "";
                    })
                    .catch(err => {
                        UIkit.notification({message: err.response.data.error, status: 'danger'})
                    })
            },
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

</style>
