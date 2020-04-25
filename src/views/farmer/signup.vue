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
                                <div class="uk-margin">
                                    <input class="uk-input" type="text" :value="farmAddress" disabled required>
                                    <div style="position:absolute; left:0; right:0; top:0; bottom:0; cursor: pointer;" @click="pickLocation()"></div>
                                </div>
                                <div class="products">
                                    <p>Products available in your farm</p>
                                    <div class="uk-margin">
                                        <md-chip class="product" md-deletable v-for="(product, index) in products" :key="product" @click="removeProduct(index)">{{product}}</md-chip>
                                    </div>
                                    <p>Select below</p>
                                    <div class="uk-margin">
                                        <md-chip md-clickable v-for="(product, index) in options" :key="product" @click="addProduct(index)">{{product}}</md-chip>
                                    </div>
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
    export default {
        data(){
            return {
                name: '',
                email: '',
                phone: '',
                password: '',
                password_rpt: '',
                error_message: '',
                currentLat: '',
                currentLong: '',
                lat: '',
                lng: '',
                farmName: '',
                farmAddress: 'Select your farm location',
                products: [],
                options: ['Coffee', 'Macadamia', 'Mangoes', 'Oranges', 'Apples', 'Tea', 'Pawpaws'],
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
                    .then(coordinates => {
                        this.currentLat = coordinates.lat;
                        this.currentLong = coordinates.lng;
                    });
            },
            addProduct(index){
                this.products.push(this.options[index]);
                this.options.splice(index, 1)
            },
            removeProduct(index){
                this.options.push(this.products[index]);
                this.products.splice(index, 1)
            },
            pickLocation(){
                console.log('Ready to pick location')
            },
            register(){
                if (this.products.length < 1){
                    this.error = true;
                    this.error_message = "Add at least one product"
                }
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
        },
        mounted() {
            this.$getLocation()
                .then(coordinates => {
                    this.currentLat = coordinates.lat;
                    this.currentLong = coordinates.lng;
                });
        }
    }
</script>

<style scoped>
    #signup{
        margin-top: 5em;
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
