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
                            <span class="uk-margin-left uk-margin-right step-active">Personal details</span>
                            <span class="uk-margin-left uk-margin-right">Farm details</span>
                        </div>
                        <div id="step-one" class="uk-margin">
                            <form v-on:submit.prevent="storePersonal">
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
                                <button class="uk-button uk-button-default uk-align-right" @click="submit">Next</button>
                            </form>
                        </div>
                        <div id="step-two" v-bind:class="{hidden: !stepOneDone}">
                            <button class="uk-button uk-button-default uk-align-left">Back</button>
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
                stepOneDone: false,
            }
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
    .steps{
        margin-left: auto;
        margin-right: auto;
    }

    .step-active{
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
</style>
