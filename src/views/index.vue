<template>
    <div id="index">
        <div class="uk-child-width-expand@s uk-text-center" uk-grid>
            <div>
                <img src="../assets/images/ruwawa-logo.png" alt="logo" width="50%" height="50%">
                <h3>Welcome to Ruwawa. <br> First log into your account or create a new one.</h3>
            </div>
            <div>
                <div class="uk-card uk-card-default uk-card-hover uk-width-1-2@m">
                    <div class="uk-card-header">
                        <h3 class="uk-card-title">Login</h3>
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
                            <div class="uk-flex uk-flex-around">
                                <div>
                                    <button class="uk-button" type="submit">{{btn}}</button>
                                </div>
                                <div>
                                    <router-link to="/signup"><button class="uk-button">Sign up</button></router-link>
                                </div>
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
    data (){
        return {
            email: '',
            password:'',
            error_message: '',
            btn:'Login',
            error:false,
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
                this.$http.get(`https://ruwawa-db.herokuapp.com/auth/${this.email}/${this.password}`)
                    .then(res => {
                        this.btn = "Login";
                        if (res.status === 200) {
                            this.$toasted.show("Credentials are correct :)", {
                                theme: "outline",
                                position: "top-center",
                                duration: 2000
                            });
                        }
                        else {
                            this.error_message = "something went wrong! Try again later :(";
                            this.error = true;
                        }
                    })
                    .catch(err => {
                        this.btn = "Login";
                        switch (err.status) {
                            case 403:
                                this.error_message = err.body.reason;
                                this.error = true;
                                break;
                            case 404:
                                this.error_message = err.body.reason;
                                this.error = true;
                                break;
                            default:
                                this.error_message = "something went wrong! Try again later :(";
                                this.error = true;
                                break;
                        }
                    })
            }
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
