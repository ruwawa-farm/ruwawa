<template>
    <div class="uk-width-1-1">
    <!-- Profile section -->
        <div class="uk-width-1-2 center-horizontal">
            <div uk-grid>
                <div class="uk-padding-large uk-text-center">
                    <img v-bind:src="profilePicture" class="profile-image" alt="profile" @click="uploadImage">
                    <input type="file" style="display: none" @change="onFileChange" id="upload">
                </div>
                <div class="uk-padding uk-margin uk-margin-auto-left@m uk-margin-auto-right@m">
                    <h4>Name : {{this.name}}</h4>
                    <h4>Email : {{this.email}}</h4>
                    <h4>Farm : {{this.farmName}}</h4>
                    <h4>Phone : {{this.phone}}</h4>
                    <a class="uk-button uk-button-default" href="#modal-profile" uk-toggle>Edit</a>
                </div>
            </div>

            <div id="modal-profile" class="uk-flex-top" uk-modal>
                <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                    <button class="uk-modal-close-default icon-black" type="button" uk-close></button>
                    <div class="uk-margin uk-padding uk-text-center">
                        <form v-on:submit.prevent="submitProfileEdit">
                            <div class="uk-margin">
                                <input class="uk-input" placeholder="Enter your full names" type="text" v-model="name" required>
                            </div>
                            <div class="uk-margin">
                                <input class="uk-input" placeholder="Enter your farm's name" type="text" v-model="farmName" required>
                            </div>
                            <div class="uk-margin">
                                <input class="uk-input" type="email" placeholder="Enter your email" v-model="email" required>
                            </div>
                            <div class="uk-margin">
                                <vue-tel-input v-model="phone"></vue-tel-input>
                            </div>
                            <div>
                                <button class="uk-button" type="submit">{{btn}}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    <!-- Products section -->
        <div class="center-horizontal uk-padding-large">
            <h2 class="uk-padding-large uk-text-center">My Products</h2>
            <div uk-grid>
                    <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right" v-for="(product, index) in products" :key="product._id">
                        <div class="uk-card-media-top">
                            <div class="uk-card-badge uk-label" v-bind:class="[product.inStock? 'uk-label-success' : 'uk-label-danger']">{{product.inStock? "In stock" : "Out of Stock"}}</div>
                            <img v-bind:src="product.image_url" alt="product" height="auto">
                        </div>
                        <div class="uk-card-body">
                            <p>Name: {{product.name}}</p>
                            <p>Price: {{product.price}} per {{product.unit}}</p>
                        </div>
                        <div class="uk-card-footer">
                            <a href="#modal-product" uk-toggle @click="editProductIndex(index)"><span uk-icon="icon: pencil" class="icon-black"></span></a>
                            <span uk-icon="icon: trash" class="icon-black" @click="removeProduct(index)"></span>
                        </div>
                    </div>
            </div>

            <div id="modal-product" class="uk-flex-top" uk-modal>
                <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                    <button class="uk-modal-close-default icon-black" type="button" uk-close></button>
                    <div class="uk-margin uk-padding uk-text-center">
                        <form v-on:submit.prevent="submitProductEdit">
                                <div class="uk-margin">
                                    <input class="uk-input" placeholder="Enter your price" type="Number" v-model="productPrice" required>
                                </div>
                            <div class="uk-margin">
                                <select class="uk-select" required v-model="productInStock">
                                    <option v-bind:value="true">In stock</option>
                                    <option v-bind:value="false">Out of stock</option>
                                </select>
                            </div>
                            <div>
                                <button class="uk-button" type="submit">{{btn}}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UIkit from 'uikit'

    export default {
        created() {
            this.getProfile()
        },
        data(){
            return {
                profile: {},
                name: '',
                farmName: '',
                email: '',
                phone: '',
                products: '',
                productIndex: "",
                productPrice: "",
                productInStock: false,
                btn: 'Submit',
                profilePicture: require('../../assets/images/profile.png'),
                loadingPicture: require('../../assets/images/loading.gif'),
                config: {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.getToken()}`
                    }
                },
            }
        },
        methods : {
            getProfile(){
                console.log(this.config.headers)
                this.axios.get('/farmers/profile', this.config)
                    .then(res => {
                        let profile = res.data.farmer
                        this.profile = profile
                        this.name = profile.name
                        this.farmName = profile.farmName
                        this.email = profile.email
                        this.phone = "0"+profile.phone
                        this.products = profile.products
                        this.profilePicture = profile.profilePicture
                    })
                    .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            },
            uploadImage(){
                document.getElementById("upload").click()
            },
            onFileChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;

                this.profilePicture = this.loadingPicture

                let data = new FormData()
                data.append('profile', files[0])

                this.axios.post('/farmers/profile/picture/upload', data, this.config)
                .then(res => {
                    if (res.status === 200)
                        this.createImage(files[0]);
                })
                .catch(err => {
                    this.profilePicture = this.profile.profilePicture
                    UIkit.notification({message: err.response.data.error, status: 'danger'})
                })
            },
            createImage(file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.profilePicture = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            editProductIndex(index){
                this.productIndex = index
            },
            submitProfileEdit(){
                const data = {
                    name: this.name,
                    email: this.email,
                    phone: parseInt(this.phone.replace(/\s/g,'')),
                    farmName: this.farmName
                }
                this.axios.post("/farmers/profile/edit", data, this.config)
                .then(res => {
                    if (res.status === 200)
                        UIkit.notification({message: "Updated profile successfully", status: 'success'})
                })
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
                UIkit.modal('#modal-profile').hide()
            },
            submitProductEdit(){
                let data = {
                    product_id: this.products[this.productIndex]._id,
                    price: this.productPrice,
                    inStock: this.productInStock
                }
                this.axios.post("/farmers/product/edit", data, this.config)
                .then(res => {
                    if (res.status === 200)
                        UIkit.notification({message: "Updated product successfully", status: 'success'})
                })
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})

                this.products[this.productIndex].price = this.productPrice
                this.products[this.productIndex].inStock = this.productInStock
                UIkit.modal('#modal-product').hide()
            },
            removeProduct(index){
                this.products.splice(index, 1)
            },
        }
    }
</script>

<style scoped>
    .uk-grid > * {
         padding-left: 0 !important;
    }

    .profile-image {
        border-radius: 50%;
        width: 50vw;
        height: 50vw;
    }

    .profile-image:hover {
        cursor: pointer;
    }

    a {
        color: black !important;
    }

    a:hover {
        color: black;
        text-decoration: none;
    }

    .uk-modal-close-full {
        position: relative !important;
        border: 1px solid black;
        padding: 0 20px;
    }

    /* Responsive */
    @media only screen and (min-width: 720px) {
        .profile-image {
            border-radius: 50%;
            width: 20vw;
            height: 20vw;
        }
    }
</style>
