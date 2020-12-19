<template>
    <div id="navigation" class="uk-height-1-1 bottom_footer">
        <div uk-sticky>
            <vue-navigation-bar :options="navbarOptions"  @vnb-item-clicked="vnbItemClicked"/>
        </div>
        <div>
            <div class="sticky-mic"></div>
            <component v-bind:is = "view"></component>
        </div>
        <footer class="ruwawa-footer" :class="{hidden: hideFooter}">
            <div uk-grid class="uk-width-2-3@m center-horizontal ruwawa-contact-footer">
                <img src="../../assets/images/ruwawa-logo.png" class="ruwawa-footer-logo" data-aos="fade-up" data-aos-duration="4000">
                <div data-aos="fade-up" data-aos-duration="4000">
                    <h5 class="ruwawa-contact">Email: <a href="mailto:ruwawafarm@gmail.com">ruwawafarm@gmail.com</a></h5>
                    <h5 class="ruwawa-contact">Phone: +254793458896 </h5>
                    <h5 class="ruwawa-contact">123-90100, Nairobi, Kenya</h5>
                </div>
                <div class="uk-text-center ruwawa-contact-form" data-aos="fade-up" data-aos-duration="4000">
                    <h5 class="form-title">Send us your feedback and queries and we will be sure to get back to you as soon as possible.</h5>
                    <form v-on:submit.prevent="sendFeedback">
                        <div class="uk-margin">
                            <input class="uk-input round-corner" type="text" placeholder="Subject" v-model="subject">
                        </div>
                        <div class="uk-margin">
                            <textarea class="uk-textarea" placeholder="Enter your message here" rows="5" required v-model="message"></textarea>
                        </div>
                        <div class="uk-alert-danger" v-bind:class="{err: !error}" uk-alert>
                            <p id="err_msg">{{error_message}} <span uk-icon="close" v-on:click="close"></span></p>
                        </div>
                        <div>
                            <button class="uk-button contact-btn uk-width-1-2" type="submit">{{btn}}</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="social-footer-icons" data-aos="fade-up" data-aos-duration="4000">
                <ul class="uk-iconnav uk-width-1-2@m center-horizontal ruwawa-socials">
                    <li class="bold-text">&#9400; Ruwawa 2020, </li>
                    <li><a href="https://www.facebook.com/ruwawa.coffee.7" uk-icon="icon: facebook; ratio: 1.5"></a></li>
                    <li><a href="https://www.instagram.com/ruwawagram/" uk-icon="icon: instagram; ratio: 1.5"></a></li>
                    <li><a href="https://twitter.com/ruwawacoffee" uk-icon="icon: twitter; ratio: 1.5"></a></li>
                    <li><a href="https://wa.me/254793458896" uk-icon="icon: whatsapp; ratio: 1.5"></a></li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
    import homeComponent from './home.vue'
    import ordersComponent from './orders.vue'
    import profileComponent from './profile.vue'
    import UIkit from "uikit";

    export default {
        components: {
            'home': homeComponent,
            'orders': ordersComponent,
            'profile': profileComponent
        },
        created() {
            if (this.$store.state.userType !== "farmer")
                return this.$router.push('/home')
            this.checkConfirmed()
            this.getOrders()
            this.getSubscriptions()
            this.getProducts()
            let audio = new Audio(require('../../assets/audio/ruwawa.mp3'))
            audio.play()
            audio.loop = true
        },
        data() {
            return {
                view: 'home',
                hideFooter: false,
                profile: {},
                btn: 'Submit',
                error_message: '',
                error: false,
                subject: '',
                message: '',
                navbarOptions: {
                    mobileBreakpoint: 992,
                    tooltipAnimationType: 'shift-away',
                    collapseButtonImageOpen: require('../../assets/images/collapse-menu-light.png'),
                    menuOptionsRight: [
                        {
                            type: 'button',
                            text: 'Home',
                            path: '',
                            isLinkAction: true,
                            class: 'nav-button'
                        },
                        {
                            type: 'button',
                            text: 'orders',
                            path: '',
                            isLinkAction: true,
                            class: 'nav-button'
                        },
                        {
                            type: 'button',
                            text: 'Profile',
                            path: '',
                            isLinkAction: true,
                            class: 'nav-button'
                        },
                        {
                            type: 'button',
                            text: 'Logout',
                            path: '',
                            isLinkAction: true,
                            class: 'nav-button',
                        }
                    ]
                }
            }
        },
        methods :{
            vnbItemClicked(text) {
                if (text.toLocaleLowerCase() === "logout"){
                    this.$store.commit('logout')
                    this.$router.push('/')
                }
                else {
                    this.view = text.toLocaleLowerCase()
                    this.hideFooter = this.view !== "home";
                }
            },
            checkConfirmed(){
                if (this.$store.state.userType !== ""){
                    this.axios.get('/auth/farmer/confirmed', this.$store.state.config)
                        .then(res => {
                            if (res.status === 200)
                                this.getProfile();
                        })
                        .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
                }
                else {
                    this.$router.push('/')
                }
            },
            getOrders(){
                this.$store.commit('clearOrders')
                this.axios.get('/orders/farmer', this.$store.state.config)
                    .then(res => {
                        this.$store.commit("addOrders", res.data.orders)
                        this.$store.commit("ordersChanged", false)
                    })
                    .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            },
            getProfile(){
                let profile = this.$store.state.farmerProfile
                if (Object.keys(profile).length === 0){
                    this.axios.get('/farmers/profile', this.$store.state.config)
                        .then(res => {
                            this.$store.commit("addFarmerProfile", res.data.farmer)
                        })
                        .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
                }
            },
            getProducts(){
                this.axios.get("products")
                    .then(res => {this.$store.commit("addProducts", res.data.products)})
                    .catch(err => {
                        if (err.message.contains("Network Error"))
                            UIkit.notification({message: "Connection timeout", status: 'danger'})
                        else UIkit.notification({message: err.response.data.error, status: 'danger'})
                    })
            },
            getSubscriptions(){
                this.axios.get('/subscriptions/farmer', this.$store.state.config)
                    .then(res => {
                        if (res.status === 200){
                            this.$store.commit('addSubscriptions', res.data.subscriptions)
                        }
                    })
                    .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            },
            sendFeedback(){
                this.btn = 'sending...'
                let tokenData = this.$jwt.decode(this.$store.state.token)
                console.log(tokenData)
                let user = Object.values(tokenData)[0]
                let data = { subject: this.subject, message: this.message, name: user.name, email: user.email }
                this.axios.post('/admin/feedback', data, this.$store.state.config)
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

<style lang="scss">
.form-title {
    color: white !important;
}

.vnb {
    background: #0b6623;
    .nav-button{
        background: none;

        &:hover {
            background: darken(#0b6623, 10%);
            cursor: pointer;
        }
    }
    .vnb__collapse-button{
        color: white;
    }
}

input[type=text]{
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    border: 1px solid #2d9fd9;
    padding-left: 10px;
}

input[type=text]:focus {
    outline: none;
    border: 1px solid #a0d18c;
}

.contact-btn {
    border-radius: 20px;
}

.uk-textarea {
    -webkit-border-radius: 15px !important;
    -moz-border-radius: 15px !important;
    border-radius: 15px !important;
}

.ruwawa-footer {
    background: #0b6623;
    padding: 3rem 0.5rem;
}

.ruwawa-socials{
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 768px) {
    .ruwawa-contact-form {
        margin: 5em 0 !important;
    }
    .ruwawa-contact {
        margin-top: 0px !important;
    }
}

.ruwawa-contact {
    margin-top: 20px !important;
    color: white !important;

    a {
        color: white !important;
    }
}

.ruwawa-contact-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.ruwawa-footer-logo {
    width: 150px !important;
    height: auto;
}

.err{
    display: none;
}

.social-footer-icons {
    padding-top: 2rem;
}

</style>
