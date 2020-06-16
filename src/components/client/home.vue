<template>
    <div id="clientHome" class="uk-height-1-1">
        <!-- The introduction section -->
        <div class="uk-height-1-1 uk-background-cover ruwawa-intro animated-img center-vertical">
            <div class="uk-text-center">
                <h2 class="white-text bold-text">Supporting the local farmers <br> Made in kenya by kenyans</h2>
            </div>
        </div>

        <!-- Our Goal section -->
        <div class="uk-margin uk-container ruwawa-goals center-vertical uk-margin-top" data-aos="fade-up" data-aos-duration="4000">
            <div class="ruwawa-goals-section uk-width-2-3m ruwawa-about-card">
                <div class="uk-child-width-expand@s" uk-grid >
                    <div>
                        <h2>We Are A Platform  Focused on Supporting Local Produce.</h2>
                        <p>We believe in supporting the effort made by our local farmers to provide us with their best products</p>
                        <p>You can help us in our course by using more of our local products!</p>
                    </div>
                    <div>
                        <img src="../../assets/images/products.png" alt="" data-aos="fade-up" data-aos-duration="5000">
                    </div>
                </div>
            </div>
        </div>

        <!-- About us section -->
        <div class="uk-margin uk-container ruwawa-about center-vertical uk-width-1-1@m uk-margin-top" data-aos="fade-up" data-aos-duration="4000">
            <div class="uk-card uk-card-default uk-width-3-4@m ruwawa-about-card">
                <div class="uk-grid-divider uk-child-width-expand@s uk-card-body" uk-grid >
                    <div>
                        <h5 class="ruwawa-about-heading"> Reliability</h5>
                        <p>Expect fresh produce picked straight from the farm and delivered to you on time. </p>
                    </div>
                    <div>
                        <h5 class="ruwawa-about-heading"> Local</h5>
                        <p>Support the local farmers by buying and using their products. No imported products. </p>
                    </div>
                    <div>
                        <h5 class="ruwawa-about-heading"> Quality</h5>
                        <p>Get the best value for your money by having products from the best farmers in the country. </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Our services section -->
        <div class="uk-container ruwawa-services center-vertical uk-width-1-1@m uk-margin-top">
            <div class="uk-width-3-4@m ruwawa-service-section uk-text-center">
                <h2 class="white-text bold-text uk-margin">Our Services</h2>
                <div class="uk-child-width-expand@m uk-margin" uk-grid>
                    <div class="small-section-padding" data-aos="fade-up" data-aos-duration="4000">
                        <h3 class="white-text bold-text">Connect</h3>
                        <p class="white-text">Ruwawa connects different consumers to various farmers for their supply of farm products.</p>
                    </div>
                    <div class="small-section-padding" data-aos="fade-up" data-aos-duration="4000">
                        <h3 class="white-text bold-text">Advertise</h3>
                        <p class="white-text">Farmers are able to reach a wider market and clientele through our platform.</p>
                    </div>
                    <div class="small-section-padding" data-aos="fade-up" data-aos-duration="4000">
                        <h3 class="white-text bold-text">Support </h3>
                        <p class="white-text">We are always available to help our customers with any help they may need.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    }
</script>
<style scoped>
    .white-text {
        color: white;
    }

    .uk-container {
        padding-top: 50px;
    }

    .small-section-padding {
        padding-top: 30px;
    }

    .ruwawa-goals,
    .ruwawa-about{
        min-height: 50vh !important;
    }

    .center-vertical {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* Intro section styling */
    .ruwawa-intro {
        background:url("../../assets/images/landing.jpg") rgba(4, 8, 29, 0.5);
        background-size: cover;
        background-blend-mode: multiply;
    }

    .animated-img {
        -webkit-animation: animated-image 20s ease infinite;
        animation: animated-image 20s ease infinite;
    }
    @-webkit-keyframes animated-image {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 20%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    @keyframes animated-image {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 20%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    /* About section styling */
    .ruwawa-about-card,
    .ruwawa-goals-section{
        margin-left: auto;
        margin-right: auto;
    }
    .ruwawa-about-heading {
        font-weight: 500 !important;
    }
    /* Goal section styling */
    img {
        max-width: 100%;
        height: auto;
    }

    /* Services section styling*/
    .ruwawa-services {
        background-size: cover;
        background: rgba(4, 8, 29, 0.7) url("../../assets/images/farm.jpg") no-repeat;
        background-blend-mode: multiply;
    }

    .ruwawa-services h2 h5 p {
        color: white !important;
    }

    /* Responsive */
    @media only screen and (min-width: 720px) {
        .ruwawa-services {
            background: url("../../assets/images/farm.jpg") center center rgba(4, 8, 29, 0.7);
            background-size: cover;
            background-blend-mode: multiply;
            min-height: 50vh;
        }
    }

</style>
