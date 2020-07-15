<template>
    <div id="navigation" class="uk-height-1-1" :class="{bottom_footer: isBottomBar}">
        <div uk-sticky>
            <vue-navigation-bar :options="navbarOptions"  @vnb-item-clicked="vnbItemClicked"/>
        </div>
        <div>
            <component v-bind:is = "view" @contacts-active="changeFooter" @products-active="changeFooter"></component>
        </div>
        <footer class="social-footer" uk-grid>
            <div class="social-footer-left  ">
                <img src="../../assets/images/ruwawa-logo.png" width="100px" height="100px">
            </div>
            <div class="social-footer-icons">
                <ul class="uk-iconnav">
                    <li><a href="#" uk-icon="icon: facebook; ratio: 1.5"></a></li>
                    <li><a href="#" uk-icon="icon: instagram; ratio: 1.5"></a></li>
                    <li><a href="#" uk-icon="icon: twitter; ratio: 1.5"></a></li>
                    <li><a href="#" uk-icon="icon: whatsapp; ratio: 1.5"></a></li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
    import homeComponent from './home.vue'
    import productsComponent from './products.vue'
    import farmersComponent from './farmers.vue'
    import ordersComponent from './orders.vue'

    import UIkit from 'uikit'

    export default {
        components: {
            'home': homeComponent,
            'products': productsComponent,
            'farmers': farmersComponent,
            'orders': ordersComponent
        },
        created() {
            if (this.$store.state.userType !== "client")
                return this.$router.push('/dashboard')
            this.checkConfirmed()
            let audio = new Audio(require('../../assets/audio/ruwawa.mp3'))
            audio.play()
            audio.loop = true
        },
        data() {
            return {
                isBottomBar: false,
                view: 'home',
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
                            text: 'Products',
                            path: '',
                            isLinkAction: true,
                            class: 'nav-button'
                        },
                        {
                            type: 'button',
                            text: 'Farmers',
                            path: '',
                            isLinkAction: true,
                            class: 'nav-button'
                        },
                        {
                            type: 'button',
                            text: 'Orders',
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
                console.log(value)
                this.isBottomBar = value
            },
            checkConfirmed(){
                if (this.$jwt.hasToken()){
                    this.axios.get('/auth/client/confirmed', this.$store.state.config)
                    .then(res => {
                        if (res.status === 200)
                            return;
                    })
                    .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
                }
                else {
                    this.$router.push('/')
                }
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
