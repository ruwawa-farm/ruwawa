<template>
    <div id="clientHome" class="uk-height-1-1">

        <!-- The introduction section -->
        <div class="uk-height-1-1 uk-background-cover ruwawa-intro animated-img">
            <div class="uk-position-center uk-text-center">
                <h2 id="intro-text">Supporting the local farmers <br> Made in kenya by kenyans</h2>
            </div>
        </div>

        <!-- About us section -->
        <div class="uk-margin uk-container uk-container-expand ruwawa-about">
            <div class="uk-card uk-card-default uk-width-1-2 ruwawa-about-card">
                <div class="uk-grid-divider uk-child-width-expand@s uk-card-body" uk-grid >
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                    <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                </div>
            </div>
        </div>

        <!-- Our Goal section -->

        <!-- Our services section -->

        <!-- The footer section-->
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

    /* Intro section styling */
    .ruwawa-intro {
        background:url("../../assets/images/landing.jpg") center center rgba(4, 8, 29, 0.5);
        background-size: cover;
        background-blend-mode: multiply;
    }

    #intro-text {
        color: white !important;
        font-weight: 500;
        line-height: 1.25;
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
    .ruwawa-about-card {
        margin-left: auto;
        margin-right: auto;
    }

</style>
