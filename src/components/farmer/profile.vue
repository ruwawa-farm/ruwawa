<template>
    <div class="uk-width-1-1 profile">
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
                    <button class="uk-button uk-button-default" href="#modal-profile" uk-toggle>Edit</button>
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
                            <div class="uk-margin">
                                <select class="uk-select" required v-model="delivers">
                                    <option :value=true>Can make deliveries</option>
                                    <option :value=false>Unable to make deliveries</option>
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
                        <p>Price: Ksh.{{product.price}} per {{product.unit}}</p>
                    </div>
                    <div class="uk-card-footer">
                        <a href="#modal-product" uk-toggle @click="editProductIndex(index)"><span uk-icon="icon: pencil" class="icon-black"></span></a>
                        <span uk-icon="icon: trash" class="icon-black" @click="removeProduct(index)"></span>
                    </div>
                </div>
                <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right center-vertical uk-text-center add-card" @click="addModal">
                    <div>
                        <img src="../../assets/images/add.png" alt="add" width="50px" height="50px">
                        <h3 class="uk-card-title">Add product</h3>
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
            <div id="modal-add" class="uk-flex-top" uk-modal>
                <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                    <button class="uk-modal-close-default icon-black" type="button" uk-close></button>
                    <div class="uk-margin uk-padding uk-text-center">
                        <form v-on:submit.prevent="submitNewProducts">
                            <div class="products">
                                <p>Products available in your farm</p>
                                <div class="uk-margin">
                                    <md-chip class="product" md-deletable v-for="(product, index) in newProducts" :key="product._id" @click="removeNewProduct(index)">
                                        {{product.name}}
                                    </md-chip>
                                </div>
                                <p>Select below</p>
                                <div class="uk-margin">
                                    <ul uk-accordion>
                                        <li class="uk-open" v-for="type in productTypes" :key="type">
                                            <div class="uk-accordion-title">
                                                <h4 class="accordion-title uk-align-left">{{ type | pluralize(10) }}</h4>
                                            </div>
                                            <div class="uk-accordion-content">
                                                <md-chip v-for="product in allProducts.filter(e => {return e.type === type})" :key="product._id" @click="addProduct(product)">
                                                    {{product.name}}
                                                </md-chip>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <p>If you cannot find your product in our list, please send us the details of the product via our contact form.</p>
                            </div>
                            <button class="uk-button uk-button-default" type="submit">{{btn}}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Photos section-->
        <div  v-cloak class="uk-padding-large uk-text-center" @drop="handleFileUpload">
            <h2> Farm Photos</h2>
            <carousel :per-page="1" :mouse-drag="false" v-bind:autoplay=true v-bind:loop=true v-bind:center-mode=true :space-padding=2 easing="ease-in">
                <slide v-for="(image, index) in farmPhotos " :key="index">
                    <img v-bind:src="image" id="farm-photo">
                </slide>
            </carousel>
            <div class="js-upload center-horizontal uk-placeholder uk-text-center uk-width-1-2" @click="uploadFarmImage">
                <span class="uk-text-middle">{{uploadStatus}}</span>
                <input type="file" style="display: none" @change="handleFileUpload" id="farmUpload" multiple maxlength="5">
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
            newProducts: [],
            farmPhotos: [],
            incomingFiles: [],
            allProducts: this.$store.state.allProducts,
            name: '',
            farmName: '',
            email: '',
            phone: '',
            products: [],
            productIndex: "",
            productPrice: "",
            productInStock: false,
            delivers: true,
            btn: 'Submit',
            productTypes: ['coffee', 'berry', 'cereal', 'fruit', 'legume', 'nut', 'vegetable', 'other'],
            uploadStatus: 'Drag and drop your farm images here',
            profilePicture: require('../../assets/images/profile.png'),
            loadingPicture: require('../../assets/images/loading.gif'),
        }
    },
    methods : {
        getProfile(){
            let profile = this.$store.state.farmerProfile
            this.profile = profile
            this.name = profile.name
            this.farmName = profile.farmName
            this.email = profile.email
            this.phone = "0"+profile.phone
            this.products = profile.products
            this.profilePicture = profile.profilePicture
            this.farmPhotos = profile.farmPhotos
        },
        uploadImage(){
            document.getElementById("upload").click()
        },
        uploadFarmImage(){
            document.getElementById("farmUpload").click()
        },
        upload(photos){
            if (this.farmPhotos !== undefined && this.farmPhotos.length + photos.length > 5){
                UIkit.notification({message: "A maximum of 5 images allowed!", status: 'danger'})
                return;
            }
            let data = new FormData();
            this.uploadStatus = "Uploading...";
            ([...photos]).forEach(file => {data.append("photos", file)});
            this.axios.post('farmers/photos/upload', data, this.$store.state.config)
                .then(res => {
                    if (res.status === 200){
                        this.createFarmImages(photos)
                        this.uploadStatus = "Drag and drop your farm images here"
                    }
                })
                .catch(err => {
                    if (err.message.contains("Network Error"))
                        UIkit.notification({message: "Connection timeout", status: 'danger'})
                    else
                        UIkit.notification({message: err.response.data.error, status: 'danger'})
                })
        },
        createFarmImages(files){
            ([...files]).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.farmPhotos.push(e.target.result)
                };
                reader.readAsDataURL(file);
            });
        },
        handleFileUpload(e){
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.upload(files)
        },
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            this.profilePicture = this.loadingPicture

            let data = new FormData()
            data.append('profile', files[0])

            this.axios.post('farmers/profile/picture/upload', data,this.$store.state.config)
                .then(res => {
                    if (res.status === 200) this.createImage(files[0]);
                })
                .catch(err => {
                    this.profilePicture = this.profile.profilePicture
                    if (err.message.contains("Network Error"))
                        UIkit.notification({message: "Connection timeout", status: 'danger'})
                    else
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
                farmName: this.farmName,
                delivers: this.delivers
            }
            this.axios.post("/farmers/profile/edit", data,this.$store.state.config)
                .then(res => {
                    if (res.status === 200){
                        this.$store.commit('addFarmerProfile', res.data.result)
                    }
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
            this.axios.post("/farmers/product/edit", data,this.$store.state.config)
                .then(res => {console.log(res.status)})
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})

            this.products[this.productIndex].price = this.productPrice
            this.products[this.productIndex].inStock = this.productInStock
            UIkit.modal('#modal-product').hide()
        },
        submitNewProducts(){
            let data = {
                products: this.newProducts
            }
            this.axios.post('/farmers/product/add', data,this.$store.state.config)
                .then(res => {
                    if (res.status === 200) {
                        this.products = this.products.concat(this.newProducts)
                        this.newProducts.clear()
                        this.getProducts()
                    }
                })
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            UIkit.modal('#modal-add').hide()
        },
        removeProduct(index){
            this.axios.delete(`/farmers/product/${this.products[index]._id}`,this.$store.state.config)
                .then(() => {this.products.splice(index, 1)})
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
        },
        removeNewProduct(index){
            this.newProducts.splice(index, 1)
        },
        addProduct(product){
            if(!this.newProducts.includes(product))
                this.newProducts.push(product);
        },
        addModal(){
            UIkit.modal('#modal-add').show()
        }
    }
}

</script>
<style scoped>
.uk-grid > * {
    padding-left: 0 !important;
}
.profile-image {
    border-radius: 50%;
    width: 20vw;
    height: 20vw;
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
.add-card:hover,
.md-chip:hover{
    cursor: pointer;
}
.uk-modal-close-full {
    position: relative !important;
    border: 1px solid black;
    padding: 0 20px;
}
.product{
    background-color: #0b6623 !important;
    color: white !important;
}
#farm-photo {
    width: 800px;
    height: 500px;
}
/* Responsive */
@media only screen and (max-width: 720px) {
    .profile-image {
        border-radius: 50%;
        width: 50vw;
        height: 50vw;
    }
    #farm-photo {
        width: 400px !important;
        height: 250px;
    }
    .VueCarousel-inner{
        flex-basis: 0 !important;
    }
}
</style>
