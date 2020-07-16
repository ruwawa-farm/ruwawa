<template>
    <div id="navigation" class="uk-height-1-1 bottom_footer">
        <div uk-sticky>
            <vue-navigation-bar :options="navbarOptions"  @vnb-item-clicked="vnbItemClicked"/>
        </div>
        <div>
            <div class="sticky-mic"></div>
            <component v-bind:is = "view" @contacts-active="changeFooter"></component>
        </div>
        <footer class="social-footer">
            <div class="social-footer-left">
                <h1 class="bold-text">Ruwawa</h1>
            </div>
            <div class="social-footer-icons">
                <ul class="uk-iconnav">
                    <li><a href="#" uk-icon="icon: facebook; ratio: 2"></a></li>
                    <li><a href="#" uk-icon="icon: instagram; ratio: 2"></a></li>
                    <li><a href="#" uk-icon="icon: twitter; ratio: 2"></a></li>
                    <li><a href="#" uk-icon="icon: whatsapp; ratio: 2"></a></li>
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
            let audio = new Audio(require('../../assets/audio/ruwawa.mp3'))
            audio.play()
            audio.loop = true
        },
        data() {
            return {
                view: 'home',
                isContacts: false,
                profile: {},
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
                            text: 'Contacts',
                            path: '',
                            isLinkAction: true,
                            class: 'nav-button'
                        }
                    ]
                }
            }
        },
        methods :{
            vnbItemClicked(text) {
                this.view = text.toLocaleLowerCase()
            },
            changeFooter(value){
                this.isContacts = value
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
            getProfile(){
                let profile = this.$store.state.farmerProfile
                if (Object.keys(profile).length === 0){
                    this.axios.get('/farmers/profile', this.$store.state.config)
                        .then(res => {
                            this.$store.commit("addFarmerProfile", res.data.farmer)
                            this.getProducts()
                        })
                        .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
                }
            },
            getProducts(){
                this.axios.get("products")
                    .then(res => {
                        this.$store.commit("addProducts", res.data.products)
                    })
                    .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            }
        }
    }
</script>

<style lang="scss">
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

    .bottom_footer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .social-footer {
        padding: 0 0.5rem 0 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #0b6623;

        h1 {
            margin: 0 0 0 0 !important;
        }
    }

</style>
