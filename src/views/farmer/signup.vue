<template>
    <div id="signup">
        <div class="uk-child-width-expand@s uk-text-center" uk-grid>
            <div>
                <img src="../../assets/images/ruwawa-logo.png" alt="logo" width="50%" height="50%">
                <h3>Create an account and register your farm so that you can start selling</h3>
            </div>
            <div>
                <div class="uk-card uk-card-default uk-card-hover uk-width-1-2@m">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom">Register</h3>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <div id="steps">
                            <span class="uk-margin-left uk-margin-right" v-bind:class="{stepActive: !stepOneDone}">Personal</span>
                            <span class="uk-margin-left uk-margin-right" v-bind:class="{stepActive: stepOneDone}">Farm</span>
                        </div>
                        <div id="step-one" class="uk-margin" v-bind:class="{hidden: stepOneDone}">
                            <form v-on:submit.prevent="moveNext">
                                <div class="uk-margin">
                                    <input class="uk-input" type="text" placeholder="Enter your full names" v-model="name" required>
                                </div>
                                <div class="uk-margin">
                                    <input class="uk-input" type="email" placeholder="Enter your email" v-model="email" required>
                                </div>
                                <div class="uk-margin">
                                    <vue-tel-input v-model="phone"></vue-tel-input>
                                </div>
                                <div class="uk-margin">
                                    <input class="uk-input" type="password" placeholder="Enter your password" v-model="password" required>
                                </div>
                                <div class="uk-margin">
                                    <input class="uk-input" type="password" placeholder="Confirm your password" v-bind:disabled="confirm" v-model="password_rpt" required>
                                </div>
                                <div class="uk-alert-danger" v-bind:class="{err: !error}" uk-alert>
                                    <p class="err_msg">{{error_message}} <span uk-icon="close" v-on:click="close"></span></p>
                                </div>
                                <button class="uk-button uk-button-default uk-align-right" type="submit">Next</button>
                            </form>
                        </div>
                        <div id="step-two" class="uk-margin" v-bind:class="{hidden: !stepOneDone}">
                            <form v-on:submit.prevent="register">
                                <div class="uk-margin">
                                    <input class="uk-input" type="text" placeholder="Enter your farm name" v-model="farmName" required>
                                </div>
                                <div class="uk-margin" uk-toggle="target: #my-id" @click="getCurrentLocation">
                                    <input class="uk-input" type="text" :value="farmAddress"  disabled required>
                                </div>
                                <div id="my-id" uk-modal>
                                    <div class="uk-modal-dialog uk-modal-body uk-text-center">
                                        <h2 class="uk-modal-title">Select the Farm location</h2>
                                        <h3>Drag the map to place the pointer</h3>
                                        <map-location-selector :latitude="currentLat" :longitude="currentLong" @locationUpdated="locationUpdated" :key="refresh" class="uk-width-1-1"></map-location-selector>
                                        <div>
                                            <p>Your location coordinates</p>
                                            <p> <span>Latitude : {{lat}}</span> <span>Longitude : {{lng}}</span></p>
                                        </div>
                                        <div class="uk-margin">
                                            <button class="uk-button uk-modal-close" type="button" @click="changeMap">Select</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="products">
                                    <p>Products available in your farm</p>
                                    <div class="uk-margin">
                                        <md-chip class="product" md-deletable v-for="(product, index) in products" :key="product" @click="removeProduct(index)">{{product}}</md-chip>
                                    </div>
                                    <p>Select below</p>
                                    <div class="uk-margin">
                                        <badger-accordion>
                                            <badger-accordion-item>
                                                <div class="accordion_header" slot="header">Cash Crops</div>
                                                <div slot="content">
                                                    <md-chip md-clickable v-for="(cashCrop, index) in cashCrops" :key="cashCrop" @click="addProduct(index)">{{cashCrop}}</md-chip>
                                                </div>
                                            </badger-accordion-item>
                                        <badger-accordion-item>
                                            <div class="accordion_header" slot="header">Food Crops</div>
                                            <div slot="content">
                                                <md-chip md-clickable v-for="(foodCrop, index) in foodCrops" :key="foodCrop" @click="addProduct(index)">{{foodCrop}}</md-chip>
                                            </div>
                                        </badger-accordion-item>
                                        <badger-accordion-item>
                                            <div class="accordion_header" slot="header">Fruits</div>
                                            <div slot="content">
                                                <md-chip md-clickable v-for="(fruit, index) in fruits" :key="fruit" @click="addProduct(index)">{{fruit}}</md-chip>
                                            </div>
                                        </badger-accordion-item>
                                        <badger-accordion-item>
                                            <div class="accordion_header" slot="header">Nuts</div>
                                            <div slot="content">
                                                <md-chip md-clickable v-for="(nut, index) in nuts" :key="nut" @click="addProduct(index)">{{nut}}</md-chip>
                                            </div>
                                        </badger-accordion-item>
                                        </badger-accordion>
                                    </div>
                                    <p>None of the above? You can update later.</p>
                                </div>
                                <div class="uk-alert-danger" v-bind:class="{err: !error}" uk-alert>
                                    <p class="err_msg">{{error_message}} <span uk-icon="close" v-on:click="close"></span></p>
                                </div>
                                <div class="uk-margin">
                                      <div class="uk-flex uk-flex-around">
                                        <div>
                                            <button class="uk-button uk-button-default" @click="goBack">Back</button>
                                        </div>
                                        <div>
                                            <button class="uk-button uk-button-default" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mapLocationSelector from 'vue-google-maps-location-selector'
    import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'

    export default {
        components: {
            mapLocationSelector,
            BadgerAccordion,
            BadgerAccordionItem
        },
        mounted(){
            this.axios.get("https://ruwawa-db.herokuapp.com/products")
                .then(response => {
                    response.data.products.forEach((item) => {
                        switch (item.type) {
                            case "nuts":
                                this.nuts.unshift(item);
                                break;
                            case "food crop":
                                this.foodCrops.unshift(item);
                                break;
                            case "fruit":
                                this.fruits.unshift(item);
                                break;
                            case "cash crop":
                                this.cashCrops.unshift(item);
                                break;
                        }
                    });
                })
        },
        data(){
            return {
                name: '',
                email: '',
                phone: '',
                password: '',
                password_rpt: '',
                error_message: '',
                currentLat: 0.0,
                currentLong: 0.0,
                lat: '',
                lng: '',
                farmName: '',
                refresh: 0,
                farmAddress: 'Select your farm location',
                products: [],
                fruits: [],
                nuts: [],
                cashCrops: ["crop1", "crop2"],
                foodCrops: [],
                error: false,
                confirm: true,
                stepOneDone: false,
            }
        },
        methods: {
            close(){
                this.error = false
            },
            moveNext(){
                this.stepOneDone = true
            },
            goBack(){
                this.stepOneDone = false
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
            changeMap(){
                this.currentLat = this.lat;
                this.currentLong = this.long;
                this.farmAddress = "Location selected. Click to change it";
                this.refresh += 1;
            },
            addProduct(index){
                this.products.push(this.cropType[index]);
                this.cropType.splice(index, 1)
            },
            removeProduct(index){
                this.options.push(this.products[index]);
                this.products.splice(index, 1)
            },
            register(){
            }
        },
        watch :{
            password(){
                if (this.password.length < 8){
                    this.error = true;
                    this.error_message = "password is too short! At least 8 characters."
                }
                else{
                    this.confirm = false;
                    this.error = false;
                }
            },
            password_rpt(){
                if (this.password !== this.password_rpt){
                    this.error = true;
                    this.error_message = 'passwords do not match'
                }
                else {
                    this.error = false
                }
            }
        }
    }
</script>

<style scoped>
    #signup{
        margin-top: 5em;
        background-color: white;
    }
    .err{
        display: none;
    }
    .err_msg{
        margin: 0 0 0 0 !important;
    }
    span:hover{
        cursor: pointer;
    }

    .uk-alert-danger{
        padding: 0.5em;
        margin: 20px;
    }
    .uk-card-header, button{
        background-color: #0b6623;
        color: white;
    }
    .uk-card-title{
        color: white;
    }
    .steps{
        margin-left: auto;
        margin-right: auto;
    }
    .map-container{
        position: inherit !important;
        height: 400px;
        margin-left: auto !important;
        margin-right: auto !important;
    }

    .stepActive{
        color: #0b6623;
        font-weight: bolder;
        text-decoration: underline;
    }

    .uk-button-default{
        background: none !important;
        color: #222;
    }

    .hidden{
        display: none;
    }
    .product{
        background-color: #0b6623;
        color: white !important;
    }

    .md-chip{
        margin: 5px !important;
    }
</style>
