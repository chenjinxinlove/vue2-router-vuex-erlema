<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    .cart-decrease
      display inline-block
      padding 6px
      transition all .4s linear
      &.move-transition
        opacity 1
        transform translate3D(0,0,0)
      .inner
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
        transition all .4s linear
        transform rotate(0)
    &.move-enter,&.move-leave
      opacity 0
      transform transition3D(24px, 0, 0)
      .inner
        transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147,153,159)
    .cart-add
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
</style>
<script>
  import Vue from 'vue';
  export default{
    data() {
      return {};
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart() {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
      },
      decreaseCart() {
        if (this.food.count) {
          this.food.count --;
        };
      }
    }
  };
</script>
