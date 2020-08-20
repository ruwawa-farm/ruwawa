<template>
    <div id="index">
        <div class="uk-child-width-expand@s uk-text-center uk-padding" uk-grid>
            <div>
                <img src="../assets/images/ruwawa-logo.png" alt="logo" width="50%" height="50%">
                <h3>Welcome to Ruwawa. <br> First log into your account or create a new one.</h3>
            </div>
            <div>
                <transition name="fade" mode="out-in">
                    <div v-if="show" key="1" class="login-form uk-card uk-card-small uk-card-default uk-card-hover uk-width-1-2@m">
                        <div class="uk-card-header">
                            <div class="uk-grid-small uk-flex-middle" uk-grid>
                                <div class="uk-width-expand">
                                    <h3 class="uk-card-title uk-margin-remove-bottom">Login</h3>
                                </div>
                            </div>
                        </div>
                        <div class="uk-card-body">
                            <p>Enter the correct details to login</p>
                            <form v-on:submit.prevent="getAuth">
                                <div class="uk-margin">
                                    <input class="uk-input" type="email" placeholder="Enter your email" v-model="email" required>
                                </div>
                                <div class="uk-margin">
                                    <input class="uk-input" type="password" placeholder="Enter your password" v-model="password" required>
                                </div>
                                <div class="uk-alert-danger" v-bind:class="{err: !error}" uk-alert>
                                    <p id="err_msg">{{error_message}} <span uk-icon="close" v-on:click="close"></span></p>
                                </div>
                                <div class="uk-margin">
                                    <span @click="toggle">Forgot password?</span>
                                </div>
                                <div class="uk-flex uk-flex-around">
                                    <div>
                                        <button class="uk-button" type="submit">{{btn}}</button>
                                    </div>
                                    <div>
                                        <router-link to="/client/signup"><button class="uk-button">Sign up</button></router-link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div v-else key="2" class="reset-form uk-card uk-card-small uk-card-default uk-card-hover uk-width-1-2@m">
                        <div class="uk-card-header">
                            <div class="uk-grid-small uk-flex-middle" uk-grid>
                                <div class="uk-width-expand">
                                    <h3 class="uk-card-title uk-margin-remove-bottom">Reset password</h3>
                                </div>
                            </div>
                        </div>
                        <div class="uk-card-body">
                            <p>Enter your email to reset the password</p>
                            <form v-on:submit.prevent="resetPass">
                                <div class="uk-margin">
                                    <input class="uk-input" type="email" placeholder="Enter your email" v-model="email" required>
                                </div>
                                <div class="uk-alert-danger" v-bind:class="{err: !error}" uk-alert>
                                    <p id="err_msg">{{error_message}} <span uk-icon="close" v-on:click="close"></span></p>
                                </div>
                                <div class="uk-margin">
                                    <span @click="toggle">Back to login</span>
                                </div>
                                <div class="uk-flex uk-flex-around">
                                    <div>
                                        <button class="uk-button" type="submit">{{reset}}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import UIkit from "uikit";

export default {
    data (){
        return {
            email: '',
            password:'',
            error_message: '',
            btn:'Login',
            reset: 'reset',
            error:false,
            show: true
        }
    },
    methods:{
        getAuth(){
            this.btn = "Loading...";
            if (this.password.length < 8){
                this.btn = "Login";
                this.error_message = 'password is too short! At least 8 characters.';
                this.error = true;
            }
            else {
                const data = {
                    email: this.email,
                    password: this.password,
                };
                this.axios.post('auth/login', data)
                    .then(res => {
                        this.btn = "Login";
                        if (res.status === 200) {
                            this.$store.commit("createConfig", res.data.token)
                            if(res.data.type === "client"){
                                this.$store.commit("addUserType", "client")
                                this.$router.push("/home")
                            }
                            else {
                                this.$store.commit("addUserType", "farmer")
                                this.$router.push("/dashboard")
                            }
                        }
                        else {
                            this.error_message = "something went wrong! Try again later :(";
                            this.error = true;
                        }
                    })
                    .catch(err => {
                        this.btn = "Login";
                        this.error_message = err.response.data.error;
                        this.error = true;
                    })
            }
        },
        resetPass(){
            this.reset = "Sending..."
            let data = {email: this.email}
            this.axios.post('/auth/password/forgot', data)
                .then(res => {
                    this.reset = "Reset"
                    if (res.status === 200){
                        UIkit.notification({message: "Reset email sent successfully", status: 'success'})
                    }
                })
                .catch(err => {
                    this.reset = "Reset"
                    UIkit.notification({message: err.response.data.error, status: 'danger'})
                })
        },
        toggle(){
            this.show = !this.show
        },
        close(){
            this.error = false
        }
    }
}
</script>

<style scoped>
    #index{
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        background-color: white;
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

</style>
