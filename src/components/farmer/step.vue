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
                this.description = "You have received an order, please confirm after packing."
                break;
            case "packaged":
                this.description = "You have successfully packaged the order. confirm when the order is on transit."
                break;
            case "transit":
                this.description = "You have successfully submitted the order to transit. Confirm when the order has arrived at the pickup location."
                break;
            case "delivered":
                this.description = "The order has been completed. Please check on other orders."
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
