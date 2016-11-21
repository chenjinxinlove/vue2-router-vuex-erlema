<template>
  <div id="app" class="app">
    <v-header></v-header>
    <div class="tab">
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评价 </router-link></div>
        <div class="tab-item"><router-link to="/seller">商家 </router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header';
  export default {
    components: {
        vHeader: header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      font-size: 14px
      .tab-item
        flex: 1
        text-align: center
</style>
