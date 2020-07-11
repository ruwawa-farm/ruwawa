<template>
    <div id="products uk-width-1-1">

        <!-- All products list -->
        <div class="uk-width-3-4 center-horizontal uk-margin">
            <h2 class="uk-text-center">Select the product you want to buy from the list below</h2>
            <ul uk-accordion>

                <!-- Berries -->
                <li>
                    <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Berries</h4></div>
                    <div class="uk-accordion-content">
                        <div uk-grid>
                            <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right"
                                 v-for="(berry) in products.filter((e) => {return e.type === 'berry'})" :key="berry._id">
                                <div class="uk-card-media-top">
                                    <img v-bind:src="berry.image_url" alt="product" height="auto">
                                </div>
                                <div class="uk-card-body">
                                    <p>{{berry.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- Cereals -->
                <li>
                    <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Cereals</h4></div>
                    <div class="uk-accordion-content">
                        <div uk-grid>
                            <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right"
                                 v-for="(cereal) in products.filter((e) => {return e.type === 'cereal'})" :key="cereal._id">
                                <div class="uk-card-media-top">
                                    <img v-bind:src="cereal.image_url" alt="product" height="auto">
                                </div>
                                <div class="uk-card-body">
                                    <p>{{cereal.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- Fruits -->
                <li>
                    <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Fruits</h4></div>
                    <div class="uk-accordion-content">
                        <div uk-grid>
                            <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right"
                                 v-for="(fruit) in products.filter((e) => {return e.type === 'fruit'})" :key="fruit._id">
                                <div class="uk-card-media-top">
                                    <img v-bind:src="fruit.image_url" alt="product" height="auto">
                                </div>
                                <div class="uk-card-body">
                                    <p>{{fruit.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- Legumes -->
                <li>
                    <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Legumes</h4></div>
                    <div class="uk-accordion-content">
                        <div uk-grid>
                            <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right"
                                 v-for="(legume) in products.filter((e) => {return e.type === 'legume'})" :key="legume._id">
                                <div class="uk-card-media-top">
                                    <img v-bind:src="legume.image_url" alt="product" height="auto">
                                </div>
                                <div class="uk-card-body">
                                    <p>{{legume.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- Nuts -->
                <li>
                    <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Nuts</h4></div>
                    <div class="uk-accordion-content">
                        <div uk-grid>
                            <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right"
                                 v-for="(nut) in products.filter((e) => {return e.type === 'nut'})" :key="nut._id">
                                <div class="uk-card-media-top">
                                    <img v-bind:src="nut.image_url" alt="product" height="auto">
                                </div>
                                <div class="uk-card-body">
                                    <p>{{nut.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- Vegetables -->
                <li>
                    <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Vegetables</h4></div>
                    <div class="uk-accordion-content">
                        <div uk-grid>
                            <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right"
                                 v-for="(veg) in products.filter((e) => {return e.type === 'vegetable'})" :key="veg._id">
                                <div class="uk-card-media-top">
                                    <img v-bind:src="veg.image_url" alt="product" height="auto">
                                </div>
                                <div class="uk-card-body">
                                    <p>{{veg.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
    import UIkit from "uikit";

    export default {
        created() {
            this.$emit('products-active', true)
            if (this.$store.state.allProducts.length === 0)
                return this.getProducts()
            this.products = this.$store.state.allProducts
        },
        data(){
            return {
                products: []
            }
        },
        methods:{
            getProducts(){
                this.axios.get('/products')
                .then(res => {
                    this.$store.commit("addProducts", res.data.products)
                    this.products = res.data.products
                })
                .catch(err => { UIkit.notification({message: err.response.data.error, status: 'danger'})})
            }
        }
    }
</script>

<style scoped>

    @media (min-width: 1200px) {
        .uk-grid > * {
             padding-left: 0 !important;
        }
    }
</style>
