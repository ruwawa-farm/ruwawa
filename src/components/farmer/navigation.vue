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

    export default {
        components: {
            'home': homeComponent,
            'products': productsComponent,
            'orders': ordersComponent,
            'profile': profileComponent
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
