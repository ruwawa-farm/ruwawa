<template>
    <div class="uk-margin">
        <div class="uk-padding-large uk-text-center">
            <h4> {{description}} </h4>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        switch (this.step){
            case "processing":
                this.description = "Your order is has been received and is being processed. An email will be sent to you once your order has been confirmed"
                break;
            case "packaged":
                this.description = "Your order has been packaged and ready for transportation to the pickup location"
                break;
            case "transit":
                this.description = "The order is on the way to the pickup location. You will the notified once it is ready for pickup"
                break;
            case "delivered":
                this.description = "Your order has arrived at the pickup location. An email will be sent to you with a link to the pickup location."
                break;
        }
    },
    data() {
        return {
            step: this.$store.state.step,
            description: "Processing",
        }
    }
}
</script>

<style scoped>

</style>
