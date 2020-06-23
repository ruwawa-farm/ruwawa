<template>
    <div class="uk-width-1-1">
    <!-- Profile section -->
        <div class="uk-width-2-3@m uk-padding-large center-horizontal">
            <div uk-grid>
                <div>
                    <h2>Name : {{this.profile.name}}</h2>
                    <h3>Farm : {{this.profile.farmName}}</h3>
                    <h3>Phone : {{this.profile.phone}}</h3>
                </div>
            </div>
        </div>
    <!-- Products section -->
        <div class="uk-text-center center-horizontal uk-padding-large">
            <div uk-grid>
                    <div class="uk-card uk-card-default uk-width-1-6@m uk-margin-left uk-margin-right" v-for="product in profile.products" :key="product._id">
                        <div class="uk-card-media-top">
                            <img src="https://res.cloudinary.com/ddotnl9jq/image/upload/v1592141549/Ruwawa%20Products/coffee-beans_dosu2o.jpg" alt="">
                        </div>
                        <div class="uk-card-body">
                            {{product.name}}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            profile: {
                type: Object
            }
        },
        created() {
            console.log(this.profile)
        },
        data(){
            return {

            }
        }
    }
</script>

<style scoped>
        .uk-grid > * {
             padding-left: 0 !important;
        }
</style>
