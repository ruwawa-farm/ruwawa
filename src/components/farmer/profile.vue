<template>
    <div class="uk-width-1-1">
    <!-- Profile section -->
        <div class="uk-width-1-2 center-horizontal">
            <div uk-grid>
                <div class="uk-padding-large uk-text-center">
                    <img v-bind:src="image" class="profile-image" alt="profile" @click="uploadImage">
                    <input type="file" style="display: none" @change="onFileChange" id="upload">
                </div>
                <div class="uk-padding uk-margin uk-margin-auto-left@m uk-margin-auto-right@m">
                    <h4>Name : {{this.profile.name}}</h4>
                    <h4>Email : {{this.profile.email}}</h4>
                    <h4>Farm : {{this.profile.farmName}}</h4>
                    <h4>Phone : {{this.profile.phone}}</h4>
                    <a class="uk-button uk-button-default" href="#modal-center" uk-toggle>Edit</a>
                </div>
            </div>

            <div id="modal-center" class="uk-flex-top" uk-modal>
                <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                    <button class="uk-modal-close-default icon-black" type="button" uk-close></button>
                    <div class="uk-margin uk-padding uk-text-center">
                        <form v-on:submit.prevent="submitEdit">
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
                    <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right" v-for="product in profile.products" :key="product._id">
                        <div class="uk-card-media-top">
                            <img src="https://res.cloudinary.com/ddotnl9jq/image/upload/v1592141549/Ruwawa%20Products/coffee-beans_dosu2o.jpg" alt="">
                        </div>
                        <div class="uk-card-body">
                            <p>Name: {{product.name}}</p>
                            <p>Price: {{product.price}} per {{product.unit}}</p>
                        </div>
                        <div class="uk-card-footer">
                            <span uk-icon="icon: pencil" class="icon-black"></span>
                            <span uk-icon="icon: trash" class="icon-black"></span>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            profile: {
                type: Object
            }
        },
        created() {
            console.log(this.profile)
        },
        data(){
            return {
                name: this.profile.name,
                farmName: this.profile.farmName,
                email: this.profile.email,
                phone: this.profile.phone,
                btn: 'Submit',
                image: require('../../assets/images/profile.png')
            }
        },
        methods : {
            uploadImage(){
                document.getElementById("upload").click()
            },
            onFileChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                const reader = new FileReader();
                const vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
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

    a {
        color: black !important;
    }

    a:hover {
        color: black;
        text-decoration: none;
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
