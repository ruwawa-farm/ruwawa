<template>
    <div class="feedback uk-padding">
        <div>
            <div class="uk-card-body uk-width-1-2@m uk-text-center">
                <h5>Send us your feedback and queries and we will be sure to get back to you as soon as possible.</h5>
                <form v-on:submit.prevent="sendFeedback">
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Subject" v-model="subject">
                    </div>
                    <div class="uk-margin">
                        <textarea class="uk-textarea" placeholder="Enter your message here" rows="5" required v-model="message"></textarea>
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
</template>

<script>
    import UIkit from 'uikit'

    export default {
        created() {
            this.$emit('contacts-active', true)
        },
        data(){
            return {
                btn: 'Submit',
                error_message: '',
                error: false,
                subject: '',
                message: '',
            }
        },
        methods: {
            sendFeedback(){
                this.btn = 'sending...'
                let tokenData = this.$jwt.decode()
                let user = Object.values(tokenData)[0]
                let data = {
                    subject: this.subject,
                    message: this.message,
                    name: user.name,
                    email: user.email
                }
                this.axios.post('/admin/feedback', data, {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.getToken()}`
                    }
                })
                .then(res => {
                    this.btn = 'Submit'
                    UIkit.notification({message: res.data.reason, status: res.data.message})
                })
                .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            },
            close(){
                this.error = false
            },
        }
    }
</script>

<style scoped>
    .uk-card-body{
        margin-right: auto;
        margin-left: auto;
    }
    .err{
        display: none;
    }
    button{
        background-color: #0b6623;
        color: white;
    }
</style>
