<template>
  <div id="app" class="uk-height-1-1" @dragover.prevent @drop.prevent>
    <vue-page-transition>
      <router-view/>
    </vue-page-transition>
  </div>
</template>

<script>
    import Uikit from 'uikit'
    import Icons from 'uikit/dist/js/uikit-icons'
    Uikit.use(Icons);

    export default {
    }
</script>

<style lang='less'>
    @import "../node_modules/uikit/src/less/uikit.less";
    @import "./assets/less/theme.less";
    @import 'https://www.w3schools.com/w3css/4/w3.css';

    html, body, h1, h2, p, h3, h4, h5{
      font-family: ProximaNova,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important;
    }

    .hidden {
        display: none;
    }

    .uk-height-1-1 {
      min-height: 100vh !important;
      background-color: white;
    }

    .bold-text {
      color: white !important;
      font-weight: 500;
      line-height: 1.25;
    }

    html {
        height: 100%;
    }

    /* Responsive footer section*/
    @media only screen and (max-width: 720px) {
      .social-footer {
        padding-top: 1rem !important;
      }
    }

    .uk-icon {
      margin: 1em;
      color: white !important;
    }

    .icon-black {
      margin: 1em;
      color: black !important;
    }

    .icon-black:hover {
        cursor: pointer;
    }

    .center-vertical {
      display: flex;
      align-items: center;
      justify-content: center;
    }

  .center-horizontal {
      margin-left: auto;
      margin-right: auto;
  }

  .uk-button-default{
    background-color: #0b6623 !important;
    color: white !important;
  }
</style>
