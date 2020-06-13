<template>
  <div id="app" class="uk-height-1-1">
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
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    .uk-height-1-1 {
      min-height: 100vh !important;
      background-color: white;
    }

    html {
        height: 100%;
    }
</style>
