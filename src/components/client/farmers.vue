<template>
    <div class="farmers">

        <div class="search-bar" uk-grid>
            <div class="uk-navbar-item uk-width-2-3">
                <form @submit.prevent="searchFarmers" class="uk-search uk-search-navbar">
                    <span uk-search-icon></span>
                    <input class="uk-search-input" type="search" v-model="query" placeholder="Search farmers...">
                </form>
            </div>

            <div class="uk-margin">
                <div uk-form-custom="target: > * > span:first-child">
                    <select>
                        <option value="">Filter By.</option>
                        <option value="1">Rating</option>
                        <option value="2">Products</option>
                        <option value="3">Offers delivery</option>
                        <option value="4">Name (A - Z)</option>
                    </select>
                    <button class="uk-button uk-button-default" type="button" tabindex="-1">
                        <span></span>
                        <span uk-icon="icon: chevron-down"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="farmers-list">
            <h3 class="uk-text-center uk-text-danger">{{noFarmers}}</h3>
            <div v-bind:class="{loaded: !farmersLoading}" class="uk-text-center">
                <img src="../../assets/images/farmers_loading.gif">
            </div>
            <div v-bind:class="{loaded: farmersLoading}" uk-grid>
                <div class="uk-card uk-card-default w3-col w3-center m2 l2 s6" v-for="farmer in farmers" :key="farmer._id">
                    <div class="uk-card-media-top">
                        <img v-bind:src="farmer.profilePicture" class="profile uk-padding-small" alt="profile">
                    </div>
                    <div class="uk-card-body">
                        {{farmer.name}}
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
                query: "",
                farmers: this.$store.state.allFarmers,
                noFarmers: "",
                farmersLoading: false
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
            }
        }
    }
</script>

<style scoped>
    @import 'https://www.w3schools.com/w3css/4/w3.css';

    @media (min-width: 1200px) {
        .uk-grid > * {
            padding-left: 0 !important;
        }
        .uk-card {
            margin: 10px;
        }
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
