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
                    menuOptionsRight: [
                        {
                            type: 'link',
                            text: 'Home',
                            path: '',
                            isLinkAction: true
                        },
                        {
                            type: 'link',
                            text: 'Products',
                            path: '',
                            isLinkAction: true
                        },
                        {
                            type: 'link',
                            text: 'Farmers',
                            path: '',
                            isLinkAction: true
                        },
                        {
                            type: 'link',
                            text: 'My orders',
                            path: '',
                            isLinkAction: true
                        },
                        {
                            type: 'link',
                            text: 'Contacts',
                            path: '',
                            isLinkAction: true
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

<style scoped>

</style>
