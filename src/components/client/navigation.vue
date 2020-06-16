<template>
    <div id="navigation">
        <div uk-sticky>
            <vue-navigation-bar :options="navbarOptions"  @vnb-item-clicked="vnbItemClicked"/>
        </div>
        <div>
            <component v-bind:is = "view"></component>
        </div>
        <footer class="social-footer" uk-grid>
            <div class="social-footer-left  ">
                <h1 class="bold-text">Ruwawa</h1>
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
            this.checkConfirmed()
        },
        data() {
            return {
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
            checkConfirmed(){
                if (this.$jwt.hasToken()){
                    let token = this.$jwt.getToken()
                    this.axios.get('/auth/client/confirmed', {headers: {
                        Authorization: `Bearer ${token}`
                        }
                    })
                    .then(res => {
                        if (res.status === 200)
                            return;
                    })
                    .catch(err => {
                        UIkit.notification({message: err.response.data.error, status: 'danger'})
                    })
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
