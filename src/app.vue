<template>
  <div id="app" class="uk-height-1-1">
    <vue-page-transition name="fade">
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
    body,
    #app {
        min-height: 100vh;
    }
    html {
        height: 100%;
    }
</style>
