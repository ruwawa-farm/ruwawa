<template>
    <div class="uk-width-1-1 uk-text-center center-horizontal">

        <div>
            <h1>My Cart</h1>
            <div class="card-expansion uk-padding">
                <md-card v-for="order in orders" :key="order.product._id">
                    <md-card-media>
                        <img :src="order.product.image_url" width="200px" height="auto">
                    </md-card-media>

                    <md-card-header>
                        <div class="md-title uk-text-center">{{order.product.name}}</div>
                    </md-card-header>

                    <md-card-expand>
                        <md-card-actions md-alignment="space-between">
                            <div><md-button @click="removeFromCart(order)">Remove</md-button></div>

                            <md-card-expand-trigger>
                                <md-button>More... </md-button>
                            </md-card-expand-trigger>

                        </md-card-actions>

                        <md-card-expand-content>
                            <md-card-content style="text-align: start !important;">
                                <h4>Amount: {{order.amount}} {{order.product.unit}}s</h4>
                                <h4>From: {{order.farmer.farmName}}</h4>
                                <h4>Total: Ksh.{{order.total}}</h4>
                            </md-card-content>
                        </md-card-expand-content>
                    </md-card-expand>

                </md-card>
            </div>
            <button class="uk-button uk-button-default" @click="confirm">{{btn}}</button>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                btn: 'Next',
                step: 0,
                orders: this.$store.state.cart
            }
        },
        methods: {
            removeFromCart(order){
                let index = this.orders.indexOf(order)
                this.orders.splice(index, 1)
                this.$store.commit('removeFromCart', index)
            },
            confirm(){
                switch (this.step) {
                    case 0 :
                        break;
                    case 1 :
                        break
                }
            }
        }
    }
</script>

<style scoped>

    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }

    h4 {
        margin: 10px !important;
    }

    @media (max-width: 900px) {
        .md-card {
            width: auto;
            margin: 4px;
            display: inline-block;
            vertical-align: top;
        }
    }
</style>
