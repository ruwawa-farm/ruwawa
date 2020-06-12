<template>
    <div>
        <vue-navigation-bar :options="navbarOptions"  @vnb-item-clicked="vnbItemClicked"/>
        <div>
            <component v-bind:is = "view"></component>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                view: 'Home',
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
                            text: 'My orders',
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
                this.view = text
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
