<template>
    <div id="products uk-width-1-1">

        <!-- All products list -->
        <div class="uk-width-3-4@m uk-width-1-1@s center-horizontal"   >
            <h2 class="uk-text-center">Select the product you want to buy from the list below</h2>
            <ul uk-accordion="multiple: true">
                <li class="uk-open" v-for="type in productTypes" :key="type">
                    <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">{{ type | pluralize(10) }}</h4></div>
                    <div class="uk-accordion-content uk-width-1-1">
                        <div class="uk-grid uk-grid-small center-horizontal">
                            <div class="uk-card uk-width-1-6@m uk-margin-bottom uk-width-1-2 center-horizontal"
                                 v-bind:class="[largeDevice ? 'uk-card-default uk-card-hover uk-margin-right uk-margin-left': '']"
                                 v-for="product in products.filter(e => {return e.type === type})" :key="product._id"
                                 @click="showFarmers(product)">
                                <div class="uk-card-media-top">
                                    <img v-bind:src="product.image_url" alt="product" height="auto">
                                </div>
                                <div class="uk-card-body">
                                    <p>{{product.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Farmer's list modal -->
        <div id="modal-farmers" class="uk-flex-top uk-modal-container" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-full uk-close-large icon-black" type="button" uk-close @click="modalHidden"></button>
                <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                    <div class="center-vertical" uk-height-viewport>
                        <div class="uk-text-center">
                            <img v-bind:src="currentProduct.image_url" width="300px" height="300px">
                            <h1>{{currentProduct.name}}</h1>
                            <h4>Enter the amount you need below in {{currentProduct.unit}}s</h4>
                            <div class="uk-margin uk-width-2-3 uk-width-1-1@m center-horizontal">
                                <input class="uk-input" v-model="productAmount" type="number" placeholder="Amount" required>
                            </div>
                        </div>
                    </div>
                    <div class="uk-padding-large">
                        <h1>Available Farms</h1>
                        <h4>Choose from which farm you would like to buy from</h4>
                        <div>
                            <div class="uk-margin">
                                <div class="uk-form-controls">
                                    <h3 class="uk-text-danger">{{farmersListState}}</h3>
                                    <h4 class="farmers-radio" v-for="farmer in availableFarmers" :key="farmer._id">
                                        <label><input class="uk-radio" type="radio" name="radio1" @click="updateTotalPrice(farmer)">
                                            {{farmer.farmName}} : Ksh. {{getProductPrice(farmer)}}
                                        </label>
                                    </h4><br>
                                </div>
                                <h3>Total price: Ksh. {{totalProductPrice}}</h3>
                                <button class="uk-button uk-button-default" type="submit" @click="addToCart" :class="{disabled: disableButton}">Add to Cart</button>
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

    const small = window.matchMedia("(max-width: 700px)")
    export default {
        created() {
            if (this.$store.state.allProducts.length === 0)
                return this.getProducts()
            this.products = this.$store.state.allProducts
            this.largeDevice = !small.matches
        },
        mounted() {
            window.onpopstate = ev => {
                if (this.modalActive)this.$router.push("")
                else return ev
            }
        },
        data(){
            return {
                products: [],
                availableFarmers: [],
                allFarmers: this.$store.state.allFarmers,
                productTypes: ['berry', 'cereal', 'fruit', 'legume', 'nut', 'vegetable'],
                selectedFarmer: {},
                currentProduct: {},
                farmersListState: '',
                totalProductPrice: 0,
                productAmount: 0,
                disableButton: true,
                modalActive: false,
                largeDevice: true
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
            showFarmers(product){
                this.modalActive = true
                this.currentProduct = product
                this.availableFarmers = []
                UIkit.modal('#modal-farmers').show()

                this.allFarmers.forEach( farmer => {
                    const productFind = farmer.products.find(item => item._id === product._id)
                    if (productFind && productFind.inStock && productFind.price !== "") {
                        this.availableFarmers.push(farmer)
                    }
                })
                this.farmersListState = this.availableFarmers.length === 0 ? "No available farmers yet." : "";
            },
            getProductPrice(farmer){
                return farmer.products.find(product => product.name === this.currentProduct.name).price
            },
            modalHidden(){
                this.farmerProductPrice = 0
                this.productAmount = 0
                this.totalProductPrice = 0
                this.farmersLoading = true
                this.modalActive = false
                this.delivered = false
                this.selectedFarmer = {}
            },
            updateTotalPrice(value){
                let price = this.getProductPrice(value)
                this.farmerProductPrice = parseInt(price)
                this.selectedFarmer = value
                this.totalProductPrice = parseInt(price) * this.productAmount
            },
            addToCart(){
                let order = {
                    product: this.currentProduct,
                    farmer: this.selectedFarmer,
                    total: this.totalProductPrice,
                    amount: parseInt(this.productAmount),
                }
                this.$store.commit("addToCart", order)
                this.modalHidden()
                this.disableButton = true
                UIkit.modal('#modal-farmers').hide()
            }
        },
        watch: {
            productAmount(value) {
                if (value !== "" && Object.keys(this.selectedFarmer).length !== 0){
                    this.totalProductPrice = parseInt(value) * this.farmerProductPrice
                }
            },
            totalProductPrice(value){
                this.disableButton = parseInt(value) === 0;
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

    .loaded {
        display: none;
    }

    .uk-accordion-title{
        background: #F4F6F7 !important;
    }

    .uk-accordion-content {
        background: #F7F9F9 !important;
        margin-top: 0 !important;
    }

    .accordion-title,
    .uk-accordion-title::before {
        padding: 1em !important;
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

    .disabled {
        cursor: not-allowed;
        pointer-events: none;

        /*Button disabled - CSS color class*/
        color: #c0c0c0;
        background-color: #ffffff;

    }
</style>
