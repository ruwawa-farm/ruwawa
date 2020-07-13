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
                        <div class="products">
                            <div class="uk-card uk-card-default uk-card-hover uk-width-1-6@m uk-width-2-3 uk-margin-right uk-margin-left"
                                 v-for="berry in products.filter((e) => {return e.type === 'berry'})" :key="berry._id"
                                 @click="showFarmers(products.indexOf(berry))">
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
                        <div class="products">
                            <div class="uk-card uk-card-default uk-card-hover uk-width-1-6@m uk-width-2-3 uk-margin-left uk-margin-right"
                                 v-for="cereal in products.filter((e) => {return e.type === 'cereal'})" :key="cereal._id"
                                 @click="showFarmers(products.indexOf(cereal))">
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
                        <div class="products">
                            <div class="uk-card uk-card-default uk-card-hover uk-width-1-6@m uk-width-2-3 uk-margin-left uk-margin-right"
                                 v-for="fruit in products.filter((e) => {return e.type === 'fruit'})" :key="fruit._id"
                                 @click="showFarmers(products.indexOf(fruit))">
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
                        <div class="products">
                            <div class="uk-card uk-card-default uk-card-hover uk-width-1-6@m uk-width-2-3 uk-margin-left uk-margin-right"
                                 v-for="legume in products.filter((e) => {return e.type === 'legume'})" :key="legume._id"
                                 @click="showFarmers(products.indexOf(legume))">
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
                        <div class="products">
                            <div class="uk-card uk-card-default uk-card-hover uk-width-1-6@m uk-width-2-3 uk-margin-left uk-margin-right"
                                 v-for="nut in products.filter((e) => {return e.type === 'nut'})" :key="nut._id"
                                 @click="showFarmers(products.indexOf(nut))">
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
                        <div class="products">
                            <div class="uk-card uk-card-default uk-card-hover uk-width-1-6@m uk-width-2-3 uk-margin-left uk-margin-right"
                                 v-for="veg in products.filter((e) => {return e.type === 'vegetable'})" :key="veg._id"
                                 @click="showFarmers(products.indexOf(veg))">
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

        <!-- Farmer's list modal -->
        <div id="modal-farmers" class="uk-modal-full" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-full uk-close-large icon-black" type="button" uk-close @click="modalHidden"></button>
                <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                    <div class="center-vertical" uk-height-viewport>
                        <div class="uk-text-center">
                            <img v-bind:src="products[productIndex].image_url" width="300px" height="300px">
                            <h1>{{products[productIndex].name}}</h1>
                            <div class="uk-margin">
                                <input class="uk-input" v-model="productAmount" type="number" placeholder="Enter the amount you need">
                            </div>
                        </div>
                    </div>
                    <div class="uk-padding-large">
                        <h1>Available Farmers</h1>
                        <h4>Choose from which farmer you would like to buy from</h4>

                        <div v-bind:class="{loaded: !farmersLoading}">
                            <img src="../../assets/images/farmers_loading.gif">
                        </div>

                        <div v-bind:class="{loaded: farmersLoading}">
                            <div class="uk-margin">
                                <div class="uk-form-controls">
                                    <h3 class="uk-text-danger">{{farmersListState}}</h3>
                                    <h4 class="farmers-radio" v-for="(farmer) in availableFarmers" :key="farmer._id">
                                        <label><input class="uk-radio" type="radio" name="radio1" @click="updateTotalPrice(getProductPrice(farmer))">
                                            {{farmer.farmName}} : Ksh. {{getProductPrice(farmer)}}
                                        </label>
                                    </h4><br>
                                </div>
                                <h3>Total price: Ksh. {{totalProductPrice}}</h3>
                                <button class="uk-button uk-button-default" v-bind:disabled="undefinedPrice">Add to Cart</button>
                            </div>
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
        created() {
            this.$emit('products-active', true)
            if (this.$store.state.allProducts.length === 0)
                return this.getProducts()
            this.products = this.$store.state.allProducts
        },
        data(){
            return {
                products: [],
                availableFarmers: [],
                productIndex: 0,
                productName: '',
                productAmount: 0,
                farmerProductPrice: 0,
                farmersListState: '',
                totalProductPrice: 0,
                farmersLoading: true,
                undefinedPrice: false
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
            },
            showFarmers(index){
                this.productIndex = index
                let product = this.products[index]
                this.productName = product.name
                UIkit.modal('#modal-farmers').show()
                this.axios.get(`/farmers/product/${product._id}/instock`, this.$store.state.config)
                .then(res => {
                    this.farmersLoading = false
                    this.availableFarmers = res.data.farmers
                    if (this.availableFarmers.length === 0)
                        this.farmersListState = "No available farmers yet."
                    else
                        this.farmersListState = ""
                })
                .catch(err => { UIkit.notification({message: err.response.data.error, status: 'danger'})})
            },
            getProductPrice(farmer){
                return farmer.products.find(product => product.name === this.productName).price
            },
            modalHidden(){
                this.farmerProductPrice = 0
                this.productAmount = 0
                this.totalProductPrice = 0
                this.farmersLoading = true
            },
            updateTotalPrice(value){
                this.farmerProductPrice = parseInt(value)
                if (value === undefined || value === ""){
                    this.totalProductPrice = 0
                    this.undefinedPrice = true
                }
                else{
                    this.undefinedPrice = false
                    this.totalProductPrice = parseInt(value) * this.productAmount
                }
            }
        },
        watch: {
            productAmount(value) {
                if (value !== "")
                    this.totalProductPrice = parseInt(value) * this.farmerProductPrice
            },
        }
    }
</script>

<style scoped>
    :root {
        --gutter : 20px
    }

    @media (min-width: 1200px) {
        .uk-grid > * {
             padding-left: 0 !important;
        }
    }

    .loaded {
        display: none;
    }

    .uk-accordion-title,
    .uk-card-default :hover {
        cursor: pointer;
    }

    .farmers-radio {
        margin: 0 !important;
    }

    .uk-radio{
        margin: 20px;
    }

    .products {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding: 30px 0 30px 0;
        -webkit-overflow-scrolling: touch;
    }
    .products .uk-card{
        flex: 0 0 auto;
    }

    .products::-webkit-scrollbar {
        display: none;
    }


</style>
