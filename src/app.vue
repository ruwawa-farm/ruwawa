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
      data(){
        return {
          config: {
            headers: {
              Authorization: `Bearer ${this.$jwt.getToken()}`
            }
          }
        }
      }
    }
</script>

<style lang='less'>
    @import "../node_modules/uikit/src/less/uikit.less";
    @import "./assets/less/theme.less";

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

    .center-vertical {
      display: flex;
      align-items: center;
      justify-content: center;
    }

  .center-horizontal {
      margin-left: auto;
      margin-right: auto;
  }
</style>
