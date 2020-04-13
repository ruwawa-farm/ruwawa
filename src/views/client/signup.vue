<template>
        <div id="signup">
            <div class="uk-child-width-expand@s uk-text-center" uk-grid>
                <div>
                    <img src="../../assets/logo.png" alt="logo">
                    <h3>Create an account to start using our services. <br>Are you a farmer? Join us through <router-link to="/farmer">here</router-link> instead</h3>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-hover uk-width-1-2@m">
                        <div class="uk-card-header">
                            <h3 class="uk-card-title">Signup</h3>
                        </div>
                        <div class="uk-card-body">
                            <p>Fill in the details below.</p>
                            <form v-on:submit.prevent="registerUser">
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
                                    <p id="err_msg">{{error_message}} <span uk-icon="close" v-on:click="close"></span></p>
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
export default {
    data(){
        return {
            name: '',
            email: '',
            phone: '',
            password: '',
            password_rpt: '',
            btn: 'Signup',
            error_message: '',
            error: false,
            confirm: true
        }
    },
    methods:{
        close(){
            this.error = false
        },
        registerUser(){
            this.$toasted.show("All fields are filled! Thanks :)", {
                theme: "outline",
                position: "top-center",
                duration : 2000
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
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 100vw;
    }
    .err{
        display: none;
    }
    #err_msg{
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
</style>
