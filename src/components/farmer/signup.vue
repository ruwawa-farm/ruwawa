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
                                <div class="uk-margin">
                                    <input class="uk-input" placeholder="Enter your farm address" v-gmaps-searchbox:location.name.geometry=vm>
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
                                                <div class="uk-accordion-title"><h4 class="accordion-title uk-align-left">Cereals</h4></div>
                                                <div class="uk-accordion-content">
                                                    <md-chip md-clickable v-for="(crop, index) in cereals" :key="crop._id" @click="addProduct(index, cereals)">{{crop.name}}</md-chip>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="uk-accordion-title" ><h4 class="accordion-title uk-align-left">Legumes</h4></div>
                                                <div class="uk-accordion-content">
                                                    <md-chip md-clickable v-for="(crop, index) in legumes" :key="crop._id" @click="addProduct(index, legumes)">{{crop.name}}</md-chip>
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
    import UIkit from 'uikit'

    export default {
        mounted(){
            this.axios.get("products")
                .then(res => {
                    this.$store.commit("addProducts", res.data.products)
                    res.data.products.forEach((item) => {
                        switch (item.type) {
                            case "nut":
                                this.nuts.unshift(item);
                                break;
                            case "fruit":
                                this.fruits.unshift(item);
                                break;
                            case "legume":
                                this.legumes.unshift(item);
                                break;
                            case "cereal":
                                this.cereals.unshift(item);
                                break;
                        }
                    });
                })
                .catch(err => {
                    if (err.message.contains("Network Error"))
                        UIkit.notification({message: "Connection timeout", status: 'danger'})
                    else UIkit.notification({message: err.response.data.error, status: 'danger'})
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
                lat: '',
                lng: '',
                vm: {},
                location: {lat: this.lat, lng: this.lng},
                farmName: '',
                farmAddress: 'Click to select your farm location',
                products: [],
                fruits: [],
                nuts: [],
                cereals: [],
                legumes: [],
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
            locationUpdated(latlng) {
                this.lat = latlng.lat;
                this.lng = latlng.lng;
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
                            this.$store.commit("createConfig", res.data.token)
                            this.$store.commit("addUserType", "farmer")
                            this.$router.push('/dashboard')
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
            },
            "vm.location"(value){
                let lat = value.geometry.location.lat()
                let lng = value.geometry.location.lng()
                this.lat = lat
                this.lng = lng
            },
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
