<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    import Uikit from 'uikit'
    import Icons from 'uikit/dist/js/uikit-icons'

    Uikit.use(Icons)
    export default {

    }
</script>

<style lang='less'>
    @import '../node_modules/uikit/src/less/uikit.less';
    @import '/assets/css/styles.css';
    body,
    #app {
        min-height: 100vh;
    }
    html {
        height: 100%;
    }
</style>
