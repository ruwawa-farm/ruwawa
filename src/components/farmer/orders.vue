<template>
    <div></div>
</template>

<script>
    import UIkit from "uikit";

    export default {
        mounted() {
            this.getOrders()
        },
        data() {
            return{
                orders: this.$store.orders
            }
        },
        methods: {
            getOrders(){
                this.axios.get('/orders/farmer', this.$store.state.config)
                    .then(res => {
                        this.orders = res.data.orders
                    })
                    .catch(err => {UIkit.notification({message: err.response.data.error, status: 'danger'})})
            }
        }
    }
</script>

<style scoped>

</style>
