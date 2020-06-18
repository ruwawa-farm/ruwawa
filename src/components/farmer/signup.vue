<template>
    <div id="signup">
        <div class="uk-child-width-expand@s uk-text-center uk-padding" uk-grid>
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
                                        <div class="uk-margin">
                                            <button class="uk-button uk-modal-close" type="button" @click="changeMap">Select</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="products">
                                    <p>Products available in your farm</p>
                                    <div class="uk-margin">
                                        <md-chip class="product" md-deletable v-for="(product, index) in products" :key="product._id" @click="removeProduct(index)">{{product.name}}</md-chip>
                                    </div>
                                    <p>Select below</p>
                                    <div class="uk-margin">
                                        <ul uk-accordion>
                                            <li class="uk-open">
                                                <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Cash crops</h4></div>
                                                <div class="uk-accordion-content">
                                                    <md-chip md-clickable v-for="(cashCrop, index) in cashCrops" :key="cashCrop._id" @click="addProduct(index, cashCrops)">{{cashCrop.name}}</md-chip>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="uk-accordion-title" ><h4 class="accordion-title uk-align-left">Food Crops</h4></div>
                                                <div class="uk-accordion-content">
                                                    <md-chip md-clickable v-for="(foodCrop, index) in foodCrops" :key="foodCrop._id" @click="addProduct(index, foodCrops)">{{foodCrop.name}}</md-chip>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Fruits</h4></div>
                                                <div class="uk-accordion-content">
                                                    <md-chip md-clickable v-for="(fruit, index) in fruits" :key="fruit._id" @click="addProduct(index, fruits)">{{fruit.name}}</md-chip>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Nuts</h4></div>
                                                <div class="uk-accordion-content">
                                                    <md-chip md-clickable v-for="(nut, index) in nuts" :key="nut._id" @click="addProduct(index, nuts)">{{nut.name}}</md-chip>
                                                </div>
                                            </li>
                                        </ul>
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
                                            <button class="uk-button uk-button-default" type="submit">{{btn}}</button>
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
    import mapLocationSelector from 'vue-google-maps-location-selector';

    export default {
        components: {
            mapLocationSelector
        },
        mounted(){
            this.axios.get("products")
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
                btn: 'Submit',
                error_message: '',
                currentLat: 0.0,
                currentLong: 0.0,
                lat: '',
                lng: '',
                farmName: '',
                refresh: 0,
                farmAddress: 'Click to select your farm location',
                products: [],
                fruits: [],
                nuts: [],
                cashCrops: [],
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
            addProduct(index, cropType){
                if(!this.products.includes(cropType[index]))
                this.products.push(cropType[index]);
            },
            removeProduct(index){
                this.products.splice(index, 1)
            },
            register(){
                this.btn = 'Loading...';
                const data = {
                    name : this.name,
                    email: this.email,
                    phone: parseInt(this.phone.replace(/\s/g,'')),
                    password: this.password,
                    farmName: this.farmName,
                    farmLat: this.lat,
                    farmLng: this.lng,
                    products: this.products
                };
                this.axios.post('auth/farmer/new', data)
                    .then(res => {
                        this.btn = "Login";
                        if (res.status === 200) {
                            localStorage.setItem("auth_token", res.data.token)
                            this.$router.push('/farmer/home')
                        }
                        else {
                            this.error_message = "something went wrong! Try again later :(";
                            this.error = true;
                        }
                    })
                    .catch(err => {
                        this.btn = 'Submit';
                        this.error_message = err.response.data.reason;
                        this.error = true;
                    });
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
        width: 100% !important;
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

     .accordion-title{
         margin: 0 0 0 20px !important;
     }

     .uk-accordion-title:hover{
         cursor: pointer;
     }

     dd{
         max-height: 75px !important;
     }
    .md-chip{
        margin: 5px !important;
    }
</style>
