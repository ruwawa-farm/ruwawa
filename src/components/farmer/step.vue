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
        this.$emit('can-continue', {value: true});
    },
    data() {
        return {
            step: this.$store.state.step,
            description: "Confirm the order by clicking the 'Next' button below",
        }
    },
    watch: {
        '$store.state.step'(value){
            this.$emit('can-continue', {value: true});
            switch (value){
                case "packaged":
                    this.description = "Proceed if you have safely packaged the product and it is ready for transport"
                    break;
                case "transit":
                    this.description = "Please proceed to transport the order to the pickup location."
                    break;
                case "delivered":
                    this.description = "Confirm that the order has arrived and click 'Finish' below"
                    break;
            }
        }
    }
}
</script>

<style scoped>

</style>
