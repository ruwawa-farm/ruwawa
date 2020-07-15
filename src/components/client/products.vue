<template>
    <div id="products uk-width-1-1">

        <!-- All products list -->
        <div class="uk-width-3-4 center-horizontal uk-margin"   >
            <h2 class="uk-text-center">Select the product you want to buy from the list below</h2>
            <ul uk-accordion>
                <!-- Berries -->
                <li>
                    <div class="uk-accordion-title uk-text-center"><h4 class="accordion-title uk-align-left">Berries</h4></div>
                    <div class="uk-accordion-content">
                        <div class="products">
                            <div class="uk-card uk-card-default uk-width-5-6@m"
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
                            <div class="uk-card uk-card-default uk-width-5-6@m"
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
                            <div class="uk-card uk-card-default uk-card-hover uk-width-5-6@m"
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
                            <div class="uk-card uk-card-default uk-width-5-6@m"
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
                            <div class="uk-card uk-card-default uk-width-5-6@m"
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
                            <div class="uk-card uk-card-default uk-width-5-6@m"
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
                            <h4>Enter the amount you need below in {{products[productIndex].unit}}s</h4>
                            <div class="uk-margin">
                                <input class="uk-input" v-model="productAmount" type="number" placeholder="Amount">
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
        mounted() {
            window.onpopstate = ev => {
                if (this.modalActive){
                    this.$router.push("")
                }
                else {
                    return ev
                }
            }
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
                undefinedPrice: false,
                modalActive: false
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
                this.modalActive = true
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
                this.modalActive = false
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
        },
        beforeDestroy() {
            this.$emit('products-active', false)
        }
    }
</script>

<style scoped>

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
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    @media only screen and (max-width: 900px) {
        .products { grid-template-columns: repeat(2, 1fr); }
    }

</style>
