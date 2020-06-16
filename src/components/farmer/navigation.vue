<template>
    <div>
        <vue-navigation-bar :options="navbarOptions"  @vnb-item-clicked="vnbItemClicked"/>
        <div>
            <component v-bind:is = "view"></component>
        </div>
    </div>
</template>

<script>
    import homeComponent from './home.vue'
    import productsComponent from './products.vue'
    import ordersComponent from './orders.vue'
    import profileComponent from './profile.vue'
    import UIkit from "uikit";

    export default {
        components: {
            'home': homeComponent,
            'products': productsComponent,
            'orders': ordersComponent,
            'profile': profileComponent
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
                            text: 'products',
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
            checkConfirmed(){
                if (this.$jwt.hasToken()){
                    let token = this.$jwt.getToken()
                    this.axios.get('/auth/farmer/confirmed', {headers: {
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
</style>
