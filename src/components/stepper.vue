<template>
    <div class="uk-margin">
        <div class="uk-width-1-1 uk-padding-large uk-text-center">
            <div class="uk-width-1-1 uk-flex uk-flex-around uk-margin-top">
                <md-icon class="md-size-2x" :class="[order.status === 'processing'? 'complete' : '']">
                    {{status >= 1? 'check': 'loop'}}
                </md-icon>
                <md-icon class="md-size-2x" :class="[order.status === 'packaged'? 'complete' : '']">
                    {{status >= 2? 'check' : 'shopping_basket'}}
                </md-icon>
                <md-icon class="md-size-2x" :class="[order.status === 'transit'? 'complete' : '']">
                    {{status >= 3? 'check' : 'local_shipping'}}
                </md-icon>
                <md-icon class="md-size-2x" :class="[order.status === 'delivered'? 'complete' : '']">
                    {{status >= 4? 'check' : 'place'}}
                </md-icon>
            </div>
            <div class="uk-padding">
                <hr>
                <h4>{{description}}</h4>
            </div>
            <div class="uk-width-1-1 uk-padding-small" :class="{hidden: !editable}">
                <button class="uk-button uk-button-default uk-align-right" @click="update">{{btn}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import UIkit from "uikit";

export default {
    props: ['order', 'index', 'editable'],
    data() {
        return {
            description: "Stepper",
            btn: 'Next',
            steps: ['processing', 'packaged', 'transit', 'delivered'],
            status: 0,
        }
    },
    methods: {
        update(){
            const next = this.steps[this.status]
            this.axios.post(`/orders/update/${this.order._id}/${next === undefined ? 'complete' : next}`, {}, this.$store.state.config)
                .then(res => {
                    if (res.status === 200){
                        this.order.status = next
                        this.$store.commit('updateOrderStatus', {index: this.index, order: this.order})
                    }
                })
                .catch(err => { UIkit.notification({message: err.response.data.error, status: 'danger'})})
        }
    },
    watch: {
        'order.status'(value){
            switch (value){
                case 'processing':
                    if (this.editable)
                        this.description = "Confirm the order by clicking the 'Next' button below"
                    else
                        this.description = "Your order has been received and is being processed. An email will be sent to you once your order has been confirmed"
                    this.status = 1
                    break;
                case "packaged":
                    if (this.editable)
                        this.description = "Proceed if you have safely packaged the product and it is ready for transport"
                    else
                        this.description = "Your order has been packaged and ready for transportation to the pickup location"
                    this.status = 2
                    break;
                case "transit":
                    if (this.editable)
                        this.description = "Please proceed to transport the order to the pickup location."
                    else
                        this.description = "The order is on the way to the pickup location. We will notify you once it is ready for pickup"
                    this.status = 3
                    break;
                case "delivered":
                    if (this.editable)
                        this.description = "Confirm that the order has arrived and click 'Complete' below"
                    else
                        this.description = "Your order has arrived at the pickup location. An email will be sent to you with a link to the pickup location."
                    this.btn = 'Complete'
                    this.status = 4
                    break;
            }
        }
    }
}
</script>

<style scoped>
    .complete {
        color: #0b6623 !important;
    }
</style>
