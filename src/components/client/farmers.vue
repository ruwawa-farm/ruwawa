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
            <div class="uk-child-width-expand@s" uk-grid>
                <div class="uk-card uk-card-default" v-for="farmer in farmers" :key="farmer._id">
                    <div class="uk-card-media-top">
                        <img v-bind:src="farmer.profilePicture" alt="profile" width="200px" height="200px">
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
        mounted() {
            this.searchFarmers()
        },
        data(){
            return {
                query: "",
                farmers: this.$store.state.allFarmers
            }
        },
        methods: {
            searchFarmers(){
                let name = this.query==="" ? "*" : this.query
                this.axios.get(`/farmers/search/${name}`, this.$store.state.config)
                .then(res => {this.farmers = res.data.farmers})
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            }
        }
    }
</script>

<style scoped>
</style>
